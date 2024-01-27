import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import "../../App.css";

const CurrentGallery = () => {
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase();
                const starCountRef = ref(db, "Categories/");
                const snapshot = await onValue(starCountRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const categoryNames = Object.keys(data);
                        setDataList(categoryNames);
                    }
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <div className="custom_container">
            <center>
                {dataList.map((categoryName, index) => (
                    <Link to={`/each-gallery/${categoryName}`} key={index}>
                        <Button className="gallery_list_btn">
                            {categoryName}
                        </Button>
                    </Link>
                ))}
            </center>
        </div>
    );
};

export default CurrentGallery;