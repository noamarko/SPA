import React, { useState } from "react";
import api from "../../api";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
} from "@material-ui/core";

function InputDetails(props) {
  const [amountOfUsers, setAmountOfUsers] = useState(0);
  const [msg, setMsg] = useState("");
  const [countryName, setCountryName] = useState("");

  const validateCountrySubmit = (country, users) => {
    if (users <= 0) {
      return {
        isValid: false,
        message: "Error: Users must be greate than 0...",
      };
    }
    if (country === "") {
      return { isValid: false, message: "Error: Must select a country..." };
    }
    return { isValid: true };
  };

  const sendCountryDetailsToServer = async (event) => {
    event.preventDefault();
    const { isValid, message } = validateCountrySubmit(
      countryName,
      amountOfUsers
    );
    if (isValid) {
      const countryDetails = {
        country: countryName,
        users: amountOfUsers,
      };
      return api
        .post("/", countryDetails)
        .then((response) => {
          setMsg("Details posted successfuly!");
          setAmountOfUsers(null);
          setCountryName("");
          setAmountOfUsers(0);
          props.getCountryListFromServer();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setAmountOfUsers(0);
    setCountryName("");
    setMsg(message);
  };

  const changeCountrySelect = (event) => {
    setMsg("");
    setCountryName(event.target.value);
  };

  const handleUsers = (event) => {
    setAmountOfUsers(parseInt(event.target.value));
  };

  const paperStyle = {
    width: "250px",
    height: "fit-content",
    borderRadius: "20px",
    padding: "20px",
  };

  const buttonStyle = {
    position: "relative",
    color: "black",
    backgroundColor: "turquoise",
    width: "100%",
  };

  return (
    <div style={{ padding: "20px" }}>
      <Paper elevation={4} style={paperStyle}>
        <h2 style={{ color: "black" }}>Input Details</h2>
        <div>
          <form id="example-form">
            <FormControl style={{ width: "100%", marginBottom: "16px" }}>
              <InputLabel id="Select-country">Select country</InputLabel>
              <Select
                labelId="Select-country"
                value={countryName}
                onChange={changeCountrySelect}
                variant="filled"
              >
                {props.data.map((country) => {
                  return (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <br />
            <TextField
              variant="filled"
              type="number"
              onChange={handleUsers}
              value={amountOfUsers}
              placeholder="Amount of users..."
              label="Users Amount"
            />
            <br />
            <br />
            <Button
              disabled={countryName === ""}
              value="Submit"
              onClick={sendCountryDetailsToServer}
              style={buttonStyle}
            >
              Send
            </Button>
          </form>
          {msg.includes("Error") ? (
            <div style={{ textAlign: "left", color: "red" }}>{msg}</div>
          ) : (
            <div style={{ textAlign: "left", color: "blue" }}>{msg}</div>
          )}
          <h6 style={{ fontSize: "12px", color: "lightgray" }}>
            * If country exists - new value will
            <br />
            be added to the old value.
          </h6>
        </div>
      </Paper>
    </div>
  );
}

export default withRouter(InputDetails);
