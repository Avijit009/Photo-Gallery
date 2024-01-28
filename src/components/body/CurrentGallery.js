// src\Components\BodyComponent\CurrentGalleryList.js
import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { Button } from "reactstrap";
import "../../App.css";
import { Link } from "react-router-dom";

const CurrentGalleryList = () => { // Changed component name
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
        <div className="myContainer">
            <center>
                {dataList.map((categoryName, index) => (
                    <Link to={`/each-gallery/${categoryName}`} key={index}> {/* Changed URL path */}
                        <Button className="gallery_list_btn"> {/* Changed class name */}
                            {categoryName}
                        </Button>
                    </Link>
                ))}
            </center>
        </div>
    );
};

export default CurrentGalleryList;
