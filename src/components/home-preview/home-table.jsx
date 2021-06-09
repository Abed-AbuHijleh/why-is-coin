import React from "react";
import "./home-table.css";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const numberWithCommas = num => {
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

const returnSigFigs = (value, sigFigs) => {
  if (sigFigs === 4) {
    if (value < 1 && value > -1) {
      if (value < 0.001 && value > -0.001) {
        return Math.round(value * 10000000) / 10000000;
      } else {
        return Math.round(value * 10000) / 10000;
      }
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
};

const Component = info => {
  const useStyles = makeStyles({
    table: {
      background: info.colors[3]
    }
  });
  function createData(post) {
    try {
      const name = (
        <a
          href={"/ticker/" + post.symbol}
          className="table-atag"
          style={{
            textDecoration: "none",
            color: info.colors[2]
          }}
        >
          <span>
            <img
              alt="img"
              className="crypto-icon"
              src={
                "https://s2.coinmarketcap.com/static/img/coins/64x64/" +
                post.id +
                ".png"
              }
            />
          </span>
          <span>
            <ul style={{ margin: "0", listStyleType: "none" }}>
              <li>
                <h4 style={{ color: info.colors[2], fontWeight: "420" }}>
                  {" "}
                  {post.name}
                </h4>
              </li>
              <li>
                <span>
                  <div
                    style={{
                      padding: "3px",
                      display: "inline",
                      backgroundColor: info.colors[0],
                      borderRadius: "4px",
                      marginRight: "5px"
                    }}
                  >
                    {post.rank}
                  </div>
                </span>
                <span style={{ color: info.colors[2] }}>{post.symbol}</span>
              </li>
            </ul>
          </span>
        </a>
      );

      const price = (
        <h4 style={{ color: info.colors[2], fontWeight: "400" }}>
          {"$" + numberWithCommas(returnSigFigs(post.price, 4))}
        </h4>
      );

      const pc_hour = (
        <h4
          id={post.pc_hour < 0 ? "red" : "green"}
          style={{ fontWeight: "400" }}
        >
          {returnSigFigs(post.pc_hour, 2) + "%"}
        </h4>
      );

      const pc_day = (
        <h4
          id={post.pc_day < 0 ? "red" : "green"}
          style={{ fontWeight: "400" }}
        >
          {returnSigFigs(post.pc_day, 2) + "%"}
        </h4>
      );

      const graph = (
        <img
          alt="img"
          className="crypto-graph"
          id={post.pc_week < 0 ? "red-crypto-graph" : "green-crypto-graph"}
          src={
            "https://s3.coinmarketcap.com/generated/sparklines/web/7d/usd/" +
            post.id +
            ".png"
          }
        />
      );

      return {
        name,
        price,
        pc_hour,
        pc_day,
        graph
      };
    } catch (e) {
      console.log(e);
      const name = <h3>Error</h3>;
      const price = <h3> </h3>;
      const pc_hour = <h3> </h3>;
      const pc_day = <h3> </h3>;
      const graph = <h3> </h3>;
      return {
        name,
        price,
        pc_hour,
        pc_day,
        graph
      };
    }
  }
  const classes = useStyles();
  // Warning each child should have a unique key...
  const rows = [info.data[1].data.map(post => createData(post))][0];

  const columns = [
    { id: "name", label: "Name" },
    {
      id: "price",
      label: "Price",
      align: "right"
    },
    {
      id: "pc_hour",
      label: "1h%",
      align: "right"
    },
    {
      id: "pc_day",
      label: "24h%",
      align: "right"
    },
    {
      id: "graph",
      label: "7 Day Graph",
      minWidth: 170,
      align: "right"
    }
  ];

  return (
    <div style={{ overflowY: "hidden" }}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={column.id}
                align={column.align}
                style={
                  column.label === "Name"
                    ? {
                        minWidth: column.minWidth,
                        backgroundColor: info.colors[3]
                      }
                    : { minWidth: column.minWidth }
                }
              >
                <h3 style={{ margin: 0, color: info.colors[2] }}>
                  {column.label}
                </h3>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                style={{ backgroundColor: info.colors[3] }}
              >
                {row.name}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.pc_hour}</TableCell>
              <TableCell align="right">{row.pc_day}</TableCell>
              <TableCell align="right">{row.graph}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Component;
