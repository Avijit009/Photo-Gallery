// src\Components\BodyComponent\AddNewGalleryForm.js
import React, { Component } from "react";
import { Button, Form, Input, UncontrolledAlert } from "reactstrap";
import { getDatabase, ref, set, onValue } from "firebase/database";


export default class NewGalleryAditionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataExistsAlert: false,
            galleryAddedAlert: false,
            errorAlert: false,
        };
    }

    writeUserData(newGallery) {
        const db = getDatabase();
        set(ref(db, "Categories/" + newGallery), {
            category_name: newGallery,
        });
        this.setState({ galleryAddedAlert: true });
    }

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

    handleSubmit = (event) => {
        event.preventDefault();
        
        const newGallery = event.target.elements.newGallery.value;
        var dataExists =this.ifDataExists(newGallery);
        
        if (dataExists === true) {
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
                {this.state.errorAlert && (
                    <UncontrolledAlert color="danger">
                        Something went wrong
                    </UncontrolledAlert>
                )}

                {this.state.dataExistsAlert && (
                    <UncontrolledAlert color="danger">
                        Gallery already exists! Enter a new Name
                    </UncontrolledAlert>
                )}

                {this.state.galleryAddedAlert && (
                    <UncontrolledAlert color="success">
                        Photo category added successfully
                    </UncontrolledAlert>
                )}
                <Form onSubmit={this.handleSubmit}>
                    <Input
                        placeholder="Enter Photo Category Name"
                        type="text"
                        name="newGallery"
                    />
                    <br />
                    <br />
                    <hr/>
                    <Button type="submit" className="btn btn-success">
                        Add The Category
                    </Button>
                </Form>
            </div>
        );
    }
}
