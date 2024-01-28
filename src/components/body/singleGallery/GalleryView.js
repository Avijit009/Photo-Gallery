// src\Components\BodyComponent\EachGallery_Subfolders\ViewGallery.js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, query, orderByChild, get } from "firebase/database";
import "../../../App.css";

export default class GalleryView extends Component {
  state = {
    categoryName: null,
    photoDataArray: [], // Store photo data along with IDs
    loading: true,
    refresh_screen: false,
  };

  async refresh() {
    this.setState({ refresh_screen: true });
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

  // ============== fetch photos ==================//
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

          if (photoData.category === categoryName) {
            photoDataArray.push(photoData);
          }
        });
      }
      return photoDataArray;
    } catch (error) {
      throw error;
    }
  };

  // ============================ render ==============================//

  render() {
    if (this.state.refresh_screen === false) {
      this.refresh();
    }
    // console.log("s");
    const { photoDataArray, loading } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <center>
          <div className="img_div">
            {photoDataArray.map((photoData, index) => (
              <Link
                to={`/feedback/${this.state.categoryName}/${photoData.id} `}
                key={index} // Changed URL path and alt text
              >
                <img
                  className="img_view"
                  src={photoData.url}
                  alt={`${photoData.id}`}
                />
              </Link>
            ))}
          </div>
        </center>
      </div>
    );
  }
}
