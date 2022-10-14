import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../components/LoaderSpinner";
const Settings = () => {
  const [Creating, setCreating] = useState(false);
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const userCreator = async () => {
    try {
      setCreating(true);
      const { data } = await axios.get(
        "https://soa-confession-backend.vercel.app/244688/create-user"
      );
      localStorage.setItem("userName", data.username);
      localStorage.setItem("userID", data.userid);
      setCreating(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      inputs.adminKey === "" ||
      inputs.postID === "" ||
      inputs.postID === undefined ||
      inputs.adminKey === undefined
    ) {
      alert("fill your thoughts before submit.");
      return;
    } else {
      try {
        const { data } = await axios.get(
          `https://soa-confession-backend.vercel.app/admin/delete/${inputs.adminKey}/${inputs.secretKey}/${inputs.postID}`
        );

        if (data.message === "ok") {
          alert("Post Deleted!");
        } else {
          alert("Error! Deleting post.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div style={{ textAlign: "center" }} className="pageTitle">
        Settings
      </div>
      <div className="settingsPage">
        <p>
          Anonymous Name: <br />
          <b className="settingsPageUserDetails">
            {localStorage.getItem("userName")}
          </b>
        </p>
        <p>
          Anonymous ID: <br />
          <b className="settingsPageUserDetails">
            {localStorage.getItem("userID")}
          </b>
        </p>
        <p>New Anonymous Identity:</p>
        {Creating ? <LoaderSpinner /> : null}
        <img
          onClick={() => userCreator()}
          className="send-icon navIcon"
          style={{ cursor: "pointer" }}
          title="click to reset user."
          alt="reset user."
          src="https://img.icons8.com/bubbles/100/000000/recurring-appointment.png"
        />
        <ol style={{ color: "white" }}>
          <li>This website is under development.</li>
          <li>
            faq: Am i anonymous?: not completely but i can guarantee no one of
            your friend can catch you.
          </li>
          <li>Rest your ID anytime.</li>
          <li>Creator: Butcher</li>
          <li>Don't miss use!</li>
          <li>Many features yet to come.</li>
        </ol>
        <hr />
        <hr />
        <div className="adminSection">
          <form onSubmit={handleSubmit}>
            <label>Enter Admin Key:</label>
            <input
              type="text"
              name="adminKey"
              value={inputs.adminKey || ""}
              onChange={handleChange}
            />
            <br></br>
            <label>Enter Secret Key :</label>
            <input
              type="text"
              name="secretKey"
              value={inputs.secretKey || ""}
              onChange={handleChange}
            />
            <br></br>
            <label>Enter Post ID:</label>

            <input
              type="text"
              name="postID"
              value={inputs.postID || ""}
              onChange={handleChange}
            />
            <br></br>
            <input type="submit" />
          </form>
        </div>
        <br></br>
      </div>
    </>
  );
};

export default Settings;
