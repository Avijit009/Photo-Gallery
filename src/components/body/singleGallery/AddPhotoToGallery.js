import React, { Component } from "react";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  get,
  set,
} from "firebase/database";
import "../../../App.css";

export default class AddPhotoToGallery extends Component {
  state = {
    categoryName: null,
    photoDataArray: [], // Store photo data along with IDs
    loading: true,
  };

  async componentDidMount() {
    const { categoryName } = this.props;

    try {
      const photoDataArray = await this.fetchPhotos(categoryName);

      this.setState({
        categoryName,
        photoDataArray,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching photos:", error);
      this.setState({
        loading: false,
      });
    }
  }

  fetchPhotos = async (categoryName) => {
    const db = getDatabase();
    const photosRef = ref(db, "Photos"); // Changed reference name to "Photos"

    try {
      const allRecordsSnapshot = await get(
        query(photosRef, orderByChild("category"))
      );

      const photoDataArray = [];
      if (allRecordsSnapshot.exists()) {
        allRecordsSnapshot.forEach((childSnapshot) => {
          const photoData = {
            id: childSnapshot.key, // Store the unique ID
            ...childSnapshot.val(),
          };

          if (photoData.category !== categoryName) {
            photoDataArray.push(photoData);
          }
        });
      }
      return photoDataArray;
    } catch (error) {
      throw error;
    }
  };

  // ========================= update category =========================//
  handlePhotoClick = async (photoData) => {
    const { categoryName } = this.state;
    const db = getDatabase();
    const photosRef = ref(db, "Photos");
    console.log(photosRef);
    // console.log(photoData.url);
    try {
      await set(ref(db, "Photos/" + photoData.id), {
        category: this.state.categoryName,
        url: photoData.url,
      });

      // Fetch updated photos after the category change
      const photoDataArray = await this.fetchPhotos(categoryName);

      this.setState({
        photoDataArray,
      });
    } catch (error) {
      console.error("Error updating photo category:", error);
    }
  };

  // ========================= render ================================//
  render() {
    const { photoDataArray, loading } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <center>
          <h3>Click Photos to Add</h3> {/* Changed text */}
          <div className="img_div">
            {photoDataArray.map((photoData) => (
              <button
                key={photoData.id} // Use the unique ID as the key
                onClick={
                  () => this.handlePhotoClick(photoData) // Changed function name
                }
                style={{ border: "none" }}
              >
                <img
                  className="img_view_modal"
                  src={photoData.url}
                  alt={`${photoData.id}`}
                />
              </button>
            ))}
          </div>
        </center>
      </div>
    );
  }
}
