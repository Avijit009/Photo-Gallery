import React, { Component } from "react";
import { Button, Form, Input, UncontrolledAlert } from "reactstrap";
import { getDatabase, ref, set, onValue} from "firebase/database";


export default class NewAlbumForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataExistsAlert: false,
            albumAddedAlert: false,
            errorAlert: false,
        };
    }
    // post to firebase
    writeUserData(newAlbum) {
        const db = getDatabase();
        set(ref(db, "Categories/" + newAlbum), {
            category_name: newAlbum,
        });
        this.setState({ albumAddedAlert: true });
    }

    // read if value already exists or not
    ifDataExists(newAlbum) {
        let data = null;
        const db = getDatabase();
        const starCountRef = ref(db, "Categories/" + newAlbum);
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
        
        const newAlbum = event.target.elements.newAlbum.value;
        var x=this.ifDataExists(newAlbum);
        
         
        //check if exists or not
        if (x === true) {
            
            this.setState({ dataExistsAlert: true });

            setTimeout(() => {
                this.setState({ dataExistsAlert: false });
            }, 2000);
        }
        
        else {
            this.writeUserData(newAlbum);
            setTimeout(() => {
                this.setState({ albumAddedAlert: false });
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
                {this.state.ALert_album_added && (
                    <UncontrolledAlert color="success">
                        Album added successfully
                    </UncontrolledAlert>
                )}
                <Form onSubmit={this.handleSubmit}>
                    <Input
                        placeholder="Enter Album Name:"
                        type="text"
                        name="newAlbum"
                    />
                    <br />
                    <br />
                    <Button type="submit" className="btn btn-success">
                        Add Album
                    </Button>
                </Form>
            </div>
        );
    }
}