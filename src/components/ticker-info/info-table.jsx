import React from "react";
import "./info-table.css";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Chip from "@material-ui/core/Chip";
import { BsChevronUp } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";

function circSuppCalc(post) {
  const max = parseInt(post.data[1].value.split(",").join(""));
  const current = parseInt(post.data[0].value.split(",").join(""));
  if (max > 0) {
    return returnSigFigs((current / max) * 100, 4);
  } else {
    return "--";
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
}

const Component = info => {
  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
        color: info.colors[2]
      }
    },
    chip: {
      "& > *": {
        borderBottom: "unset",
        color: info.colors[2]
      }
    }
  });

  const Row = props => {
    const { row } = props;
    const [open, setOpen] = React.useState(true);
    const classes = useRowStyles();

    return (
      <React.Fragment>
        <TableRow className={classes.root} key={row.header}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <BsChevronUp
                  id="info-table-chevron"
                  style={{ color: info.colors[5] }}
                />
              ) : (
                <BsChevronDown
                  id="info-table-chevron"
                  style={{ color: info.colors[5] }}
                />
              )}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            <Typography variant="h6" gutterBottom component="div">
              {row.header}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                {row.index === "2" ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexWrap: "wrap"
                    }}
                  >
                    {row.data[0].map((value, index) => {
                      return (
                        <Chip
                          className={classes.chip}
                          color="primary"
                          key={index}
                          variant="outlined"
                          label={value.split("-").join(" ")}
                          style={{ margin: 2 }}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <Table size="small" aria-label="info">
                    <TableBody>
                      {row.data.map(dataRow => (
                        <TableRow key={dataRow.key}>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ color: info.colors[2] }}
                          >
                            {dataRow.key}
                          </TableCell>
                          <TableCell style={{ color: info.colors[2] }}>
                            <span id={dataRow.class}>{dataRow.value}</span>
                          </TableCell>
                        </TableRow>
                      ))}
                      {row.index === "1" ? (
                        <TableRow>
                          <TableCell>
                            <Slider
                              style={{ color: info.colors[4] }}
                              defaultValue={circSuppCalc(row)}
                              aria-labelledby="disabled-slider"
                              disabled
                            />
                          </TableCell>
                          <TableCell style={{ color: info.colors[2] }}>
                            {circSuppCalc(row)}%
                          </TableCell>
                        </TableRow>
                      ) : (
                        <TableRow />
                      )}
                    </TableBody>
                  </Table>
                )}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };
  const data = info.data;
  try {
    const rows = [
      {
        index: "0",
        header: "Percent Change",
        data: [
          {
            key: "1 Hour",
            value: returnSigFigs(data.pc_hour, 2) + "%",
            class: data.pc_hour < 0 ? "red" : "green"
          },
          {
            key: "24 Hours",
            value: returnSigFigs(data.pc_day, 2) + "%",
            class: data.pc_day < 0 ? "red" : "green"
          },
          {
            key: "7 Days",
            value: returnSigFigs(data.pc_week, 2) + "%",
            class: data.pc_week < 0 ? "red" : "green"
          },
          {
            key: "30 Days",
            value: returnSigFigs(data.pc_month, 2) + "%",
            class: data.pc_month < 0 ? "red" : "green"
          }
        ]
      },
      {
        index: "1",
        header: "Circulating Supply",
        data: [
          {
            key: "Circulating Supply",
            value: numberWithCommas(returnSigFigs(data.circulating_supply, 4)),
            class: "null"
          },
          {
            key: "Max Supply",
            value: numberWithCommas(returnSigFigs(data.max_supply, 4)),
            class: "null"
          }
        ]
      },
      {
        index: "2",
        header: "Tags",
        data: [data.tags]
      }
    ];

    return (
      <Table aria-label="collapsible table">
        <TableBody>
          <TableRow>
            <TableCell style={{ color: info.colors[2] }}>
              <Typography variant="h6" gutterBottom component="div">
                Price
              </Typography>
            </TableCell>
            <TableCell align="center" style={{ color: info.colors[2] }}>
              <Typography variant="h6" gutterBottom component="div">
                {"$" + numberWithCommas(returnSigFigs(data.price, 4))}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ color: info.colors[2] }}>
              <Typography gutterBottom component="div">
                24h Volume
              </Typography>
            </TableCell>
            <TableCell align="center" style={{ color: info.colors[2] }}>
              <Typography gutterBottom component="div">
                {"$" + numberWithCommas(returnSigFigs(data.volume_day, 4))}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ color: info.colors[2] }}>
              <Typography gutterBottom component="div">
                Platform
              </Typography>
            </TableCell>
            <TableCell align="center" style={{ color: info.colors[2] }}>
              <Typography gutterBottom component="div">
                {data.platform === null ? data.name : data.platform.name}
              </Typography>
            </TableCell>
          </TableRow>
          {rows.map(row => (
            <React.Fragment key={row.header}>
              <Row row={row} />
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    );
  } catch (e) {
    return <div>Loading</div>;
  }
};

export default Component;
