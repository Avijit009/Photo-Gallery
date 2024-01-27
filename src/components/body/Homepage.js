import React, { Component } from "react";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
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
            pictureDataArray: [],
            loading: false,

            // refresh_2
            refresh2: true,
        };
        this.imageListRef = ref(storage, "images/");
    }

    //firebase
    // post to firebase
    photoUrlToFirebase(pic_Url) {
        // seconds as unique id
        var seconds = new Date().getTime();
        const db = getDatabase();
        set(ref_data(db, "Photos/" + seconds), {
            url: pic_Url,
            category: "All",
        });
        this.setState({ galleryAddedAlert: true });
    }

    //================== modal======================//
    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen,
        });

        if (this.state.modalOpen) {
            window.location.reload();
        }
    };

    //Image or not
    if_image(name) {
        var imageType = "";
        for (let i = name.length - 1; i >= 0; i--) {
            if (name[i] === ".") break;
            imageType = name[i] + imageType;
        }
        return imageType === "jpg" || imageType === "png" || imageType === "jpeg";
    }

    // upload image
    uploadImage = () => {
        // const { imageUpload, imageList } = this.state;
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

    // Fetching photos
    fetchPictures = async () => {
        const db = getDatabase();
        const picturesRef = ref_data(db, "Pictures");

        try {
            const allRecordsSnapshot = await get(
                query(picturesRef, orderByChild("url"))
            );

            const pictureDataArray = [];

            if (allRecordsSnapshot.exists()) {
                allRecordsSnapshot.forEach((childSnapshot) => {
                    const pictureData = {
                        id: childSnapshot.key, // Store the unique ID
                        ...childSnapshot.val(),
                    };

                    pictureDataArray.push(pictureData);
                });
            }
            return pictureDataArray;
        } catch (error) {
            throw error;
        }
    };

    // component did mount
    componentDidMount = () => {
        this.refresh_2();
    };
    async refresh_2() {
        try {
            const pictureDataArray = await this.fetchPictures();

            this.setState({
                pictureDataArray: pictureDataArray,
                loading: false,
                // refresh2
                refresh2: false,
            });
        } catch (error) {
            console.error("Error fetching pictures:", error);
            this.setState({
                loading: false,
            });
        }
    }

    // ======================== component did update =======================//

    render() {

        const { imageList } = this.state;
        var i = 0;
        console.log(i);

        // setImageList to set
        const ListsOfImageList = new Set(imageList);
        // Convert the Set to an array and sort it
        const sortedImgArray = Array.from(ListsOfImageList);

        return (
            <div className="App">
                <h2>All Pictures</h2>
                <div className="img_div">
                    {this.state.pictureDataArray.map((pictureData, index) => (
                        <Link
                            to={`/feedback/${"Homepage"}/${pictureData.id} `}
                            key={index}
                        >
                            <img
                                className="img_view"
                                src={pictureData.url}
                                alt={`${pictureData.id}`}
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
                        <button
                            onClick={this.uploadImage}
                            className="btn btn-primary"
                        >
                            Upload Photo
                        </button>
                    </ModalBody>

                    {/* close button */}
                    <ModalFooter>
                        <button
                            className="btn btn-primary"
                            onClick={this.toggleModal}
                        >
                            Close
                        </button>
                    </ModalFooter>
                </Modal>
                <button
                    className="btn btn-secondary"
                    active
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