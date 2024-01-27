import axios from "axios";
// import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
import { getDatabase, ref} from "firebase/database";

import * as actionTypes from "./actionTypes";


//for loading categoriess
export const loadCategories = (categories) => {
    return {
        type: actionTypes.LOAD_CATEGORIES,
        payload: categories,
    };
};

export const categoryLoadFailed = () => {
    return {
        type: actionTypes.CATEGORIES_LOAD_FAILED,
    };
};

// firebase auth token for secure viewing order history
export const fetchGallery= (newGallery) => (dispatch) => {
    const db = getDatabase();
    const Ref = ref(db, "Categories/" + newGallery);
    // //'&orderBy=userId' er 'userId' string firebase database er 'userId' column_name
    // const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';
    // //don't use tabnine here
    axios
        .get(
            `"https://photo-gallery-2999a-default-rtdb.firebaseio.com"/Categories/${Ref}.json`)
        .then((response) => {
            //load order to redux
            dispatch(loadCategories(response.data));
        })
        .catch((err) => {
            dispatch(categoryLoadFailed());
        });
};