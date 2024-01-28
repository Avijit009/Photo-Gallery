import React, { Component } from "react";
import { Formik } from "formik";
import "../../../App.css";
import { ListGroup, ListGroupItem } from "reactstrap";
import {
  getDatabase,
  ref,
  set,
  get,
  query,
  orderByChild,
} from "firebase/database";

class FeedbackForm extends Component {
  state = {
    feedbackDataArray: [], // Store feedback data along with IDs
    loading: true,
    refresh_screen: false,
  };
  //====================== post feedback to firebase =====================//
  feedbackToDatabase(feedback, photo_id, username) {
    const db = getDatabase();
    console.log(db);
    var seconds = new Date().getTime();
    set(ref(db, "Feedback/" + seconds), {
      photo_id: photo_id,
      username: username,
      dateTime: Date(seconds),
      feedbackText: feedback,
    });
  }
  // ==================== refresh =====================//
  async refresh() {
    this.setState({ refresh_screen: true });
    const { photo_id } = this.props;

    try {
      const feedbackDataArray = await this.fetchFeedback(photo_id);

      this.setState({
        feedbackDataArray,
        loading: false,
        refresh_screen: true,
      });
    } catch (error) {
      console.error("Error fetching feedback:", error);
      this.setState({
        loading: false,
      });
    }
  }

  // ============== fetch feedbacks ==================//
  fetchFeedback = async (photo_id) => {
    const db = getDatabase();
    const Ref = ref(db, "Feedback");

    try {
      const allRecordsSnapshot = await get(
        query(Ref, orderByChild("photo_id"))
      );

      const feedbackDataArray = [];
      if (allRecordsSnapshot.exists()) {
        allRecordsSnapshot.forEach((childSnapshot) => {
          const feedbackData = {
            id: childSnapshot.key, // Store the unique ID
            ...childSnapshot.val(),
          };

          if (feedbackData.photo_id === photo_id) {
            feedbackDataArray.push(feedbackData);
          }
        });
      }
      return feedbackDataArray;
    } catch (error) {
      throw error;
    }
  };

  // ==========================  render ===================================//
  render() {
    // ===================== props =======================//
    const { photo_id, username } = this.props;

    if (this.state.refresh_screen === false) {
      this.refresh();
    }
    // console.log("text");

    //========================= feedback form =======================//
    const form = (
      <Formik
        initialValues={
          // j field gulo thakbe auth page e
          {
            feedback: "",
          }
        }
        onSubmit={(values, { resetForm }) => {
          // console.log(values.feedback);
          this.feedbackToDatabase(values.feedback, photo_id, username);
          resetForm();
        }}
        //==================== validation ==================//
        // for validation, built in props
        // validation check failed hole r shamne agabe na
        validate={(values) => {
          const errors = {};
          // empty kina
          if (!values.feedback) {
            errors.feedback = "Required";
          }

          //console.log("Errors",errors);
          return errors;
        }}
      >
        {/* ei fn er vitor form render kora hbe */}
        {/* handleChange built in formik fn, er maddhome field er value auto form e upate hy */}
        {/* handleSubmit o built in fn */}
        {/* errors => to show errors under field input */}
        {({ values, handleChange, handleSubmit, errors }) => (
          <div
            style={{
              border: "1px grey solid",
              padding: "30px",
              borderRadius: "7px",
            }}
          >
            <br />
            <form onSubmit={handleSubmit}>
              {/* field "name" will be same as initialValues field_names */}
              <p style={{ color: "#001a13" }}>
                <strong>Write your feedback about the photo.</strong>
              </p>
              <br />
              <input
                name="feedback"
                placeholder="Write your feedback"
                className="form-control"
                value={values.feedback}
                onChange={handleChange}
              />
              <span style={{ color: "red" }}>{errors.feedback}</span>

              <br />

              <button type="submit" className="btn btn-info">
                Submit Feedback
              </button>
            </form>
          </div>
        )}
      </Formik>
    );
    //========================== return ========================//
    return (
      <div>
        <ListGroup>
          {this.state.feedbackDataArray.map((feedbackData) => (
            <ListGroupItem
              href="#"
              tag="a"
              style={{ textAlign: "left" }}
            >
              <h5 style={{ color: "blue" }}>{feedbackData.username}</h5>
              <p>{feedbackData.feedbackText}</p>
            </ListGroupItem>
          ))}
        </ListGroup>
        {form}
        <br />
      </div>
    );
  }
}

export default FeedbackForm;
