import React, {Component} from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import "../../App.css";

import CurrentGallery from "./CurrentGallery";
import NewGalleryForm from "./NewGalleryForm";

class Gallery extends Component {
    state = {
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
                        <ModalBody>{<NewGalleryForm />}</ModalBody>

                        {/* close button */}
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
                        <h2>Current Gallery</h2>
                        <br />
                        <CurrentGallery />
                    </center>

                    {/* upload button */}
                    <Button
                        className="addNewGalleryButton"
                        active
                        color="info"
                        onClick={this.toggleModal}
                    >
                        Add New Gallery
                    </Button>
                </div>
            </div>
        );
    }
}

export default Gallery;