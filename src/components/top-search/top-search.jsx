import React, { useState, useEffect } from "react";
import "./top-search.css";

import TextTransition, { presets } from "react-text-transition";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Coins from "./coins.json";

const Component = info => {
  const useStyles = makeStyles(theme => ({
    root: {
      "& > *": {
        margin: theme.spacing(3)
      },
      // Labels
      "& label": {
        color: info.colors[5]
      },
      "& label.Mui-focused": {
        color: info.colors[2]
      },
      // Outline
      "& .MuiInput-underline:after": {
        borderBottomColor: info.colors[2]
      },
      // Label Focused
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: info.colors[2]
        },
        // Hover Outline
        "&:hover fieldset": {
          borderColor: "RGB(153, 153, 153)"
        },
        // Focused Label
        "&.Mui-focused fieldset": {
          borderColor: info.colors[5]
        },
        // Responsive Width
        width: "min(max(200px, 80vw), 600px)",
        color: info.colors[2]
      }
    }
  }));
  const classes = useStyles();

  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (info.home) {
      const intervalId = setInterval(
        () => setIndex(index => index + 1),
        3000 // every 3 seconds
      );
      return () => clearTimeout(intervalId);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="top-search"
      style={{
        backgroundColor: info.colors[0],
        color: info.colors[2],
        borderBottom: "2px solid " + info.colors[1]
      }}
    >
      {info.loading ? (
        <h4>Why is Crypto Changing?</h4>
      ) : (
        <React.Fragment>
          {info.home ? (
            <h4>
              Why is{" "}
              <span style={{ color: info.colors[5] }}>
                <TextTransition
                  text={
                    info.data[1].data[index % info.data[1].data.length].name +
                    "'s"
                  }
                  springConfig={presets.stiff}
                  inline={true}
                />
              </span>{" "}
              price going{" "}
              <span
                id={
                  info.data[1].data[index % info.data[1].data.length].pc_day < 0
                    ? "red"
                    : "green"
                }
              >
                <TextTransition
                  text={
                    info.data[1].data[index % info.data[1].data.length].pc_day <
                    0
                      ? "down"
                      : "up"
                  }
                  springConfig={presets.stiff}
                  inline={true}
                />
              </span>
              ?
            </h4>
          ) : (
            <h4>
              Why is{" "}
              <span style={{ color: info.colors[5] }}>{info.data.name}'s</span>{" "}
              price going{" "}
              <span id={info.data.pc_day < 0 ? "red" : "green"}>
                {info.data.pc_day < 0 ? "down" : "up"}
              </span>
              ?
            </h4>
          )}
        </React.Fragment>
      )}
      <Autocomplete
        id="combo-box-demo"
        options={Coins}
        onChange={(event, value) => {
          console.log(value);
          window.location.href = "/ticker/" + value.symbol;
        }}
        getOptionLabel={option => {
          return option.symbol + " " + option.name;
        }}
        renderInput={params => (
          <TextField
            {...params}
            className={classes.root}
            variant="outlined"
            type="search"
            id="standard-basic"
            label="Search Ticker"
            size="small"
            onKeyPress={event => {
              if (event.key === "Enter") {
                if (document.querySelector("#combo-box-demo").value !== "") {
                  window.location.href =
                    "/ticker/" +
                    document.querySelector("#combo-box-demo").value;
                } else {
                }
              }
            }}
          />
        )}
      />
    </div>
  );
};

export default Component;
