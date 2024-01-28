import React, { Component } from "react";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import {
  getDatabase,
  set,
  query,
  ref as ref_data,
  get,
  orderByChild,
} from "firebase/database";
import "../../App.css";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUpload: null,
      imageList: new Set(),
      modalOpen: false,
      refresh_screen: false,
      photoDataArray: [],
      loading: false,
      refresh: true,
    };
    this.imageListRef = ref(storage, "images/");
  }

  // post to firebase
  photoUrlToFirebase(photo_Url) {
    // seconds as unique id
    var seconds = new Date().getTime();
    const db = getDatabase();
    set(ref_data(db, "Photos/" + seconds), {
      url: photo_Url,
      category: "All",
    });
    this.setState({ albumAddedAlert: true });
  }

  // modal
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });

    if (this.state.modalOpen) {
      window.location.reload();
    }
  };

  // image or not
  if_image(name) {
    var imageType = "";
    for (let i = name.length - 1; i >= 0; i--) {
      if (name[i] === ".") break;
      imageType = name[i] + imageType;
    }
    return imageType === "jpg" || imageType === "png" || imageType === "jpeg";
  }

  //  upload img
  uploadImage = () => {
    const { imageUpload } = this.state;

    if (imageUpload == null) return;

    // image or not
    if (!this.if_image(imageUpload.name)) {
      alert("Supported formats: jpg, png, and jpeg");
      return;
    }

    const random_name = imageUpload.name + v4();
    const imageRef = ref(storage, `images/${random_name}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        this.setState((prevState) => ({
          imageList: new Set([...prevState.imageList, url]),
        }));
        alert("Image Uploaded");
        this.photoUrlToFirebase(url);
      });
    });
  };

  // ============== fetch photos ==================//
  fetchPhotos = async () => {
    const db = getDatabase();
    const photosRef = ref_data(db, "Photos");

    try {
      const allRecordsSnapshot = await get(
        query(photosRef, orderByChild("url"))
      );

      const photoDataArray = [];

      if (allRecordsSnapshot.exists()) {
        allRecordsSnapshot.forEach((childSnapshot) => {
          const photoData = {
            id: childSnapshot.key, // Store the unique ID
            ...childSnapshot.val(),
          };

          photoDataArray.push(photoData);
        });
      }
      return photoDataArray;
    } catch (error) {
      throw error;
    }
  };

  // =================== component did mount =================//
  componentDidMount = () => {
    this.refresh_2();
  };
  async refresh_2() {
    try {
      const photoDataArray = await this.fetchPhotos();

      this.setState({
        photoDataArray: photoDataArray,
        loading: false,
        // refresh
        refresh: false,
      });
    } catch (error) {
      console.error("Error fetching photos:", error);
      this.setState({
        loading: false,
      });
    }
  }


  render() {
 
    const { imageList } = this.state;
    // var i = 0;
    // console.log(i);

    // setImageList to set
    const ListsOfImageList = new Set(imageList);
    // Convert the Set to an array and sort it
    const sortedImgArray = Array.from(ListsOfImageList);
    console.log(sortedImgArray);

    return (
      <div className="App">
        <h2>All Photos</h2>
        <div className="img_div">
          {this.state.photoDataArray.map((photoData, index) => (
            <Link to={`/feedback/${"Photo"}/${photoData.id}`} key={index}>
              <img
                className="img_view"
                src={photoData.url}
                alt={`${photoData.id}`}
              />
            </Link>
          ))}
        </div>

        <Modal isOpen={this.state.modalOpen}>
          <ModalBody>
            <input
              type="file"
              onChange={(event) => {
                this.setState({
                  imageUpload: event.target.files[0],
                });
              }}
            />
            <button onClick={this.uploadImage} className="btn btn-primary">
              Upload Photo
            </button>
          </ModalBody>

          <ModalFooter>
            <button className="btn btn-primary" onClick={this.toggleModal}>
              Close
            </button>
          </ModalFooter>
        </Modal>
        <button
          className="btn btn-secondary"
          color="info"
          onClick={this.toggleModal}
        >
          Upload Photo
        </button>
      </div>
    );
  }
}

export default Homepage;
