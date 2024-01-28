// src\Components\BodyComponent\Gallery.js
import React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

import CurrentGallery from "./CurrentGallery";
import NewGalleryAditionForm from './NewGalleryAditionForm';
import "../../App.css";

class Gallery extends React.Component {
    // class component e useState() use kora jayna
    state = {
        // comments and dishes ekhn redux e
        modalOpen: false,
    };

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen,
        });
    };

    render() {
        return (
            <div>
                <div>
                    <Modal isOpen={this.state.modalOpen}>
                        <ModalBody>{<NewGalleryAditionForm />}</ModalBody> {/* Changed component name */}
                        {/* close Button */}
                        <ModalFooter>
                            <Button
                                className="btn btn-primary"
                                onClick={this.toggleModal}
                            >
                                Close
                            </Button>
                        </ModalFooter>
                    </Modal>

                    <center>
                        <h2>Current Photo Categories</h2> {/* Changed text */}
                        <br />
                        <hr/>
                        <CurrentGallery /> 
                        <hr/>
                    </center>

                    {/* upload Button */}
                    <Button
                        className="btn btn-primary"
                        active
                        color="info"
                        onClick={this.toggleModal}
                    >
                        Add New Photo Category {/* Changed text */}
                    </Button>
                </div>
            </div>
        );
    }
}

export default Gallery;