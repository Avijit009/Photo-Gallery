// src\Components\BodyComponent\EachGallery.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../../App.css";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

import AddPhotoToGallery from './singleGallery/AddPhotoToGallery';
import GalleryView from './singleGallery/GalleryView';

const EachGallery = () => {
    // ==========modal state and function ===========//
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    // =========== dynamic parameters from url ==============//
    const params = useParams();
    const { categoryName } = params;

    return (
        <div>
            {/* ========== modal ============= */}
            <Modal isOpen={modalOpen}>
                <ModalBody>
                    <p style={{ color: "blue" }}>
                        <strong>
                            Note: You need to refresh after adding photos to the category.
                        </strong>
                    </p>
                    <AddPhotoToGallery categoryName={categoryName} /> {/* Changed component name */}
                </ModalBody>

                {/* close button */}
                <ModalFooter>
                    <button className="btn btn-primary" onClick={toggleModal}>
                        Close
                    </button>
                </ModalFooter>
            </Modal>

            {/* ================== gallery ============ */}
            <center>
                <h2>Gallery: {categoryName}</h2> {/* Changed text */}
                <br />
                <GalleryView categoryName={categoryName} /> {/* Changed component name */}
            </center>

            {/* ===================== modal open button ================ */}
            <button
                className="btn btn-secondary"s
                color="info"
                onClick={toggleModal}
            >
                Add Photos to this Gallery {/* Changed text */}
            </button>
        </div>
    );
};

export default EachGallery;