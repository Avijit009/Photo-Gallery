import React, { Component } from "react";
import { Button, Form, Input, UncontrolledAlert } from "reactstrap";
import { getDatabase, ref, set, onValue} from "firebase/database";


export default class NewGalleryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataExistsAlert: false,
            galleryAddedAlert: false,
            errorAlert: false,
        };
    }
    // post to firebase
    writeUserData(newGallery) {
        const db = getDatabase();
        set(ref(db, "Categories/" + newGallery), {
            category_name: newGallery,
        });
        this.setState({ galleryAddedAlert: true });
    }

    // read if value already exists or not
    ifDataExists(newGallery) {
        let data = null;
        const db = getDatabase();
        const starCountRef = ref(db, "Categories/" + newGallery);
        onValue(starCountRef, (snapshot) => {
            data = snapshot.val();
            console.log(data);
        });

        if (data != null) return true;
        return false;
    }
    //Submit handler
    
    handleSubmit = (event) => {
        event.preventDefault();
        
        const newGallery = event.target.elements.newGallery.value;
        var x=this.ifDataExists(newGallery);
        
         
        //check if exists or not
        if (x === true) {
            this.setState({ dataExistsAlert: true });

            setTimeout(() => {
                this.setState({ dataExistsAlert: false });
            }, 2000);
        }
        
        else {
            this.writeUserData(newGallery);
            setTimeout(() => {
                this.setState({ galleryAddedAlert: false });
            }, 2000);
        }
       
    };


    render() {
        return (
            <div className="container" style={{ padding: "2rem" }}>
                {/* error */}
                {this.state.errorAlert && (
                    <UncontrolledAlert color="danger">
                        Something went wrong
                    </UncontrolledAlert>
                )}

                {/* data exists alert */}
                {this.state.dataExistsAlert && (
                    <UncontrolledAlert color="danger">
                        Album already exists! Enter a new Name
                    </UncontrolledAlert>
                )}

                {/* add album alert */}
                {this.state.galleryAddedAlert && (
                    <UncontrolledAlert color="success">
                        Album added successfully
                    </UncontrolledAlert>
                )}
                <Form onSubmit={this.handleSubmit}>
                    <Input
                        placeholder="Enter Gallery Name:"
                        type="text"
                        name="newGallery"
                    />
                    <br />
                    <br />
                    <Button type="submit" className="btn btn-success">
                        Add Gallery
                    </Button>
                </Form>
            </div>
        );
    }
}