import React, {useState} from "react";
import "./styling/Body.css";

import Header from "./Header";
import BodyAbout from "./aboutComponents/BodyAbout";
import BodyHome from "./homeComponents/BodyHome";
import BodyTicker from "./tickerComponents/BodyTicker";

const Body = () => {

    // Keep track of window dimensions
    // For responsiveness

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }


    // Makes app too laggy
    //    
    // function handleResize() {
    //     setWindowDimensions(getWindowDimensions());
    // }
    // window.addEventListener("resize", handleResize);



    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [currentPage, setCurentPage] = useState("BodyHome");
    const [currentTicker, setCurrentTicker] = useState("null");
    const changePage = (page, ticker) => {
        setCurentPage(page); 
        setCurrentTicker(ticker);
    }

    if (currentPage === "BodyHome") {
        return(
            <React.StrictMode>
                <Header changePage={changePage} displayPortrait={windowDimensions.width<windowDimensions.height?"true":"false"} />
                <BodyHome changePage={changePage} displayPortrait={windowDimensions.width<windowDimensions.height?"true":"false"} />
            </React.StrictMode>
        );
    } else if (currentPage === "BodyTicker") {
        return(
            <React.StrictMode>
                <Header changePage={changePage} displayPortrait={windowDimensions.width<windowDimensions.height?"true":"false"} />
                <BodyTicker ticker={currentTicker} displayPortrait={windowDimensions.width<windowDimensions.height?"true":"false"} />
            </React.StrictMode>
        );
    } else if (currentPage === "BodyAbout") {
        return(
            <React.StrictMode>
                <Header changePage={changePage} displayPortrait={windowDimensions.width<windowDimensions.height?"true":"false"} />
                <BodyAbout />
            </React.StrictMode>
        );  
    }
}

export default Body;
    