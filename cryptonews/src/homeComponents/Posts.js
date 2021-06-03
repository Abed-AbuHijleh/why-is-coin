import React from "react";

const Posts = ({ posts, loading, openSidePage }) => {
  if (loading) {
    return (
      <tbody>
        <tr>
          <td>Loading...</td>
        </tr>
      </tbody>
    );
  }

  function circSuppCalc(post) {
    if (post.max_supply > 0) {
      return (
        Math.floor((post.circulating_supply / post.max_supply) * 100) + "%"
      );
    } else {
      return null;
    }
  }

  function numberWithCommas(x) {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  function returnSigFigs(value, sigFigs) {
    if (sigFigs === 4) {
      if (value < 1 && value > -1) {
        return Math.round(value * 10000) / 10000;
      } else {
        return Math.round(value * 100) / 100;
      }
    } else if (sigFigs === 2) {
      if (value > 0) {
        return "+" + Math.round(value * 100) / 100;
      } else {
        return Math.round(value * 100) / 100;
      }
    } else {
      return Math.round(value);
    }
  }

  return (
    <tbody className="post-body">
      {posts.map(post => (
        <tr key={post.id} className="post-body-row">
          <td>{post.cmc_rank}</td>
          <td>
            <ul className="inline-table-data">
              <img
                alt="img"
                className="crypto-icon"
                src={
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/" +
                  post.id +
                  ".png"
                }
              />
              <li>
                <a
                  className="table-select-ticker"
                  href="!#"
                  onClick={() => openSidePage(post.symbol)}
                >
                  {post.name}
                </a>
              </li>
              <li className="inline-table-extra">{post.symbol}</li>
            </ul>
          </td>
          <td>
            {"$" + numberWithCommas(returnSigFigs(post.quote.USD.price, 4))}
          </td>
          <td id={post.quote.USD.percent_change_1h < 0 ? "red" : "green"}>
            {returnSigFigs(post.quote.USD.percent_change_1h, 2) + "%"}
          </td>
          <td id={post.quote.USD.percent_change_24h < 0 ? "red" : "green"}>
            {returnSigFigs(post.quote.USD.percent_change_24h, 2) + "%"}
          </td>
          <td id={post.quote.USD.percent_change_7d < 0 ? "red" : "green"}>
            {returnSigFigs(post.quote.USD.percent_change_7d, 2) + "%"}
          </td>
          <td>
            <ul className="inline-table-data">
              <li>
                {numberWithCommas(returnSigFigs(post.circulating_supply, 4))}
              </li>
              <li className="inline-table-extra">{circSuppCalc(post)}</li>
            </ul>
          </td>
          <td>
            <img
              alt={post.name + " Graph"}
              id={
                post.quote.USD.percent_change_7d < 0 ? "redGraph" : "greenGraph"
              }
              className="graph"
              src={
                "https://s3.coinmarketcap.com/generated/sparklines/web/7d/usd/" +
                post.id +
                ".png"
              }
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default Posts;
