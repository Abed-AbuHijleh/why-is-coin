import React from "react";

const TickerData = ({ loading, displayPortrait, tickerData, tickerPriceStats }) => {

    const months = [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function circSuppCalc (post) {
        if (post.max_supply > 0) {
        return (
            Math.floor(post.circulating_supply/post.max_supply*100)+"%"
        );
        } else {
            return (null);
        }
    }

    function numberWithCommas(x) {
        const parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    function returnSigFigs (value, sigFigs) {
        if (sigFigs === 4) {
            if (value < 1 && value > (-1)) {
                return (Math.round(value*10000)/10000);
            } else {
                return (Math.round(value*100)/100);
            }
        } else if (sigFigs === 2) {
            if (value > 0) {
                return ("+" + Math.round(value*100)/100);
            } else {
                return (Math.round(value*100)/100);
            }
        } else {
            return (Math.round(value));
        }
    }

    function checkPlatform () {
        if (tickerData.platform === null) {
            return tickerData.name;
        } else {
            return tickerData.platform;
        }
    }
    
    function returnDate () {
        try {
            const splitDate = tickerData.date_added.split("");
            return (
                months[parseInt(splitDate[5] + splitDate[6])] + " " + splitDate[8] + splitDate[9] + ", " + splitDate[0] + splitDate[1] + splitDate[2] + splitDate[3]
            );
        } catch (e) {
            return ("");
        }
    }

    if (loading) {
        return <h4>Loading...</h4>
    } else if (loading === null) {
        return (
            <div>
                DNE
            </div>
        );
    } else {
        return (
            <div className={displayPortrait==="true"?"portrait-data":"landscape-data"}>
            <table>
                <thead>
                    <tr>
                        <td colSpan="2">
                            <h4>
                                {tickerData.symbol} Stats
                            </h4>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Circulating Supply
                        </td>
                        <td>
                            <ul className="inline-table-data">
                                <li>
                                    {numberWithCommas(returnSigFigs(tickerData.circulating_supply, 4))}
                                </li>
                                <li className="inline-table-extra">
                                    {circSuppCalc(tickerData)}
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Date Created
                        </td>
                        <td>
                            {returnDate()}
                        </td>
                    </tr>     
                    <tr>
                        <td>
                            Platform
                        </td>
                        <td>
                            {checkPlatform()}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Market Cap
                        </td>
                        <td>
                            ${numberWithCommas(returnSigFigs(tickerPriceStats.market_cap, 4))}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            24h Volume
                        </td>
                        <td>
                            ${numberWithCommas(returnSigFigs(tickerPriceStats.volume_24h, 4))}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            1h% Change
                        </td>
                        <td id={tickerPriceStats.percent_change_1h<0?"red":"green"}>
                            {(returnSigFigs(tickerPriceStats.percent_change_1h, 2)) + "%"}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            24h% Change
                        </td>
                        <td id={tickerPriceStats.percent_change_24h<0?"red":"green"}>
                            {(returnSigFigs(tickerPriceStats.percent_change_24h, 2)) + "%"}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            7d% Change
                        </td>
                        <td id={tickerPriceStats.percent_change_7d<0?"red":"green"}>
                            {(returnSigFigs(tickerPriceStats.percent_change_7d, 2)) + "%"}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            30d% Change
                        </td>
                        <td id={tickerPriceStats.percent_change_30d<0?"red":"green"}>
                            {(returnSigFigs(tickerPriceStats.percent_change_30d, 2)) + "%"}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            90d% Change
                        </td>
                        <td id={tickerPriceStats.percent_change_90d<0?"red":"green"}>
                            {(returnSigFigs(tickerPriceStats.percent_change_90d, 2)) + "%"}
                        </td>
                    </tr>
                </tbody>
            </table>
    </div>
        );
    }
}

export default TickerData