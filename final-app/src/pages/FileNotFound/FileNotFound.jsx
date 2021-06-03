import React from "react";
import HeaderImg from "../../assets/img/Page-Not-Found.png"
import "./FileNotFound.css"

const FileNotFound = () => {
    return (
        <div className="file-not-found-div">
            <img className="file-not-found-img" alt="404 Page Not Found" src={HeaderImg} />
        </div>
    );
}

export default FileNotFound