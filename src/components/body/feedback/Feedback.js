import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getDatabase,
  ref,
  onValue,
  query,
  get,
  orderByChild,
} from "firebase/database";
import FeedbackForm from "./FeedbackForm";

// fetching username 
async function fetchUN(user_name) {
  const db = getDatabase();
  const Ref = ref(db, "Credentials");

  try {
    const allRecordsSnapshot = await get(query(Ref, orderByChild("email")));

    let username = null;
    if (allRecordsSnapshot.exists()) {
      allRecordsSnapshot.forEach((childSnapshot) => {
        const usernameData = {
          id: childSnapshot.key, // Store the unique ID
          ...childSnapshot.val(),
        };

        if (usernameData.email === user_name) {
          username = usernameData.username;
          return username;
        }
      });
    }
    return username;
  } catch (error) {
    throw error;
  }
}

// ======================== main feedback function 

const Feedback = () => {
  const [userName, setUserName] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load props from URL
  const params = useParams();
  const { photo_id } = params;

  // Load photo from Firebase
  useEffect(() => {
    const db = getDatabase();
    const photoRef = ref(db, "Photos/" + photo_id);

    const fetchData = async () => {
      try {
        // Listen for changes in the data
        onValue(photoRef, (snapshot) => {
          const photoData = snapshot.val();
          setPhoto(photoData);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching photo:", error);
        setLoading(false);
      }
    };

    fetchData();

  }, [photo_id]);

  // get auth email from local storage 

  const email = localStorage.getItem("email");
  fetchUN(email)
    .then((username) => {
      setUserName(username);
    })
    .catch((error) => {
      console.error("Error fetching username:", error);
    });

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : photo ? (
        <center>
          <img
            style={{
              height: "27rem",
              width: "40rem",
            }}
            src={photo.url}
            alt=""
          />

          <br />
          <h3>
            Category: <strong>{photo.category}</strong>
          </h3>
        </center>
      ) : (
        <p>Photo not found</p>
      )}
      <br />
      <br />
      <h2>Feedback</h2>
      <br />

      <FeedbackForm photo_id={photo_id} username={userName} />
    </div>  
  );
};

export default Feedback;
