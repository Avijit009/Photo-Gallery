import React, {Component} from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import "../../App.css";

import CurrentAlbum from "./CurrentAlbum";
import NewAlbumForm from "./NewAlbumForm";


class Gallery extends Component {
    state = {
  
        modalOpen: false,
    };

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen,
        });
    };

    // onClickHandler = () => {
    //     return (
    //         <div>
    //             <Modal isOpen={this.state.modalOpen}>
    //                 <ModalBody></ModalBody>

    //                 {/* close button */}
    //                 <ModalFooter>
    //                     <button
    //                         className="btn btn-primary"
    //                         onClick={this.toggleModal}
    //                     >
    //                         Close
    //                     </button>
    //                 </ModalFooter>
    //             </Modal>
    //         </div>
    //     );
    // };
    render() {
        return (
            <div>
                <div>
                    <Modal isOpen={this.state.modalOpen}>
                        <ModalBody>{<NewAlbumForm />}</ModalBody>

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
                        <h2>Current Albums</h2>
                        <br />
                        <CurrentAlbum />
                    </center>

                    {/* upload button */}
                    <Button
                        className="addNewAlbumButton"
                        active
                        color="info"
                        onClick={this.toggleModal}
                    >
                        Add New Album
                    </Button>
                </div>
            </div>
        );
    }
}

export default Gallery;