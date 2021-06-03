import React from "react";
import ReactTooltip from "react-tooltip";

const NewsPosts = ({loading, data}) => {

    const months = [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    if (loading) {
        return <h4>Loading...</h4>
    } else if (loading === null) {
        return (
            <div>
                .
            </div>
        );
    } else {
        if (data.length === 0) {
            return (
                <div>
                    Select a date and click search!
                </div>
            );
        } else {
            console.log(data.articles)
            return (
                <div className="news-outer-div">
                    {data.articles.map(articleData => (
                        <div className="article" key={articleData.title} >
                            <a href={articleData.url} target="_blank" className="article-a" rel="noreferrer" data-tip data-for={articleData.title}>
                                <div className="leftside-div">
                                    <img alt="Headline Unavailable" className="news-header" src={articleData.urlToImage} />
                                    <h4 className="article-title">
                                        {
                                            months[parseInt(articleData.publishedAt.split("")[5] + 
                                            articleData.publishedAt.split("")[6])] + " " + 
                                            articleData.publishedAt.split("")[8] + articleData.publishedAt.split("")[9] + ", " + 
                                            articleData.publishedAt.split("")[0] + articleData.publishedAt.split("")[1] + 
                                            articleData.publishedAt.split("")[2] + articleData.publishedAt.split("")[3]
                                        }
                                    </h4>
                                </div>
                                <div className="rightside-div">
                                    <ul className="rightside-list">
                                        <li>
                                            <b>
                                                {articleData.title}
                                            </b>
                                        </li>
                                        <li>
                                            <p className="author">{articleData.author}, </p><p className="source">{articleData.source.name}</p>
                                        </li>
                                        <li className="article-desc">
                                            {articleData.description}
                                        </li>
                                    </ul>
                                </div>
                            </a>
                            <ReactTooltip id={articleData.title} place="right" type="light" effect="solid" multiline={true} html={true}>
                                {articleData.content}
                            </ReactTooltip>
                        </div>
                    ))}
                </div>
            );
        }
    }
}

export default NewsPosts