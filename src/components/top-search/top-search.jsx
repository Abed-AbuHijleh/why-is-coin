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
    },
    auto: {
      "& > *": { overflow: "hidden" }
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
      <div className="MuiAutocomplete-popper">
        <div />
      </div>
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
        className={classes.auto}
        options={Coins}
        onChange={(event, value) => {
          console.log(value);
          window.location.href = "/ticker/" + value.symbol;
        }}
        getOptionLabel={option => option.name + " " + option.symbol}
        renderOption={option => (
          <div
            style={{
              width: "min(max(200px, 80vw), 600px)",
              overflow: "hidden",
              marginTop: "-16px",
              marginLeft: "-16px",
              marginRight: "-16px",
              padding: "16px",
              height: "30px",
              backgroundColor: info.colors[6],
              color: info.colors[2]
            }}
          >
            <img
              alt="img"
              style={{ width: "20px", margin: "5px", marginBottom: "-2.5px" }}
              src={
                "https://s2.coinmarketcap.com/static/img/coins/64x64/" +
                option.id +
                ".png"
              }
            />
            {option.name}
            {"   "}
            <span
              style={{ color: "gray", marginLeft: "7px", fontSize: "14px" }}
            >
              {option.symbol}
            </span>
            <span style={{ float: "right" }}>#{option.rank}</span>
          </div>
        )}
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
