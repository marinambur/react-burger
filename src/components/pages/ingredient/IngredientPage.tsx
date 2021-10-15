import React, {useEffect} from 'react';
import IngredientDetails from "../../IngredientDetails/IngredientDetails";
import {useParams} from "react-router-dom";

function IngredientPage() {
    // @ts-ignore
    let { id } = useParams();
    console.log(id);
    // let image = IMAGES[parseInt(id, 10)];

    // if (!image) return <div>Image not found</div>;
    return (
        <IngredientDetails></IngredientDetails>
    );
}

export default IngredientPage;