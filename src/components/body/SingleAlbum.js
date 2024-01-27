import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

import "../../App.css";
import GalleryView from './singleAlbum/GalleryView';
import AddPhotoToAlbum from './singleAlbum/AddPhotoToAlbum';

const SingleAlbum = () => {
    // modal state and function 
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    // getting dynamic parameters from url 
    const params = useParams();
    const { categoryName } = params;

    return (
        <div>
            {/* modal  */}
            <Modal isOpen={modalOpen}>
                <ModalBody>
                    <p style={{ color: "red" }}>
                        <strong>
                            Note: After adding image, You'll have to refresh the
                            Album Page to view Changes
                        </strong>
                    </p>
                    <AddPhotoToAlbum categoryName={categoryName} />
                </ModalBody>

                {/* close button */}
                <ModalFooter>
                    <button className="btn btn-primary" onClick={toggleModal}>
                        Close
                    </button>
                </ModalFooter>
            </Modal>

            {/* album */}
            <center>
                <h2>Album: {categoryName}</h2>
                <br />
                <GalleryView categoryName={categoryName} />
            </center>

          {/* modal open button  */}
            <button
                active
                color="info"
                onClick={toggleModal}
            >
                Add Photo to this Album
            </button>
        </div>
    );
};

export default SingleAlbum;