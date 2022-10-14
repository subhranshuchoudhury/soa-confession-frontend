import axios from "axios";
import Toast from "../components/Toast";
import React, { useState } from "react";
import LoaderSpinner from "../components/LoaderSpinner";
const CreatePost = () => {
  // form
  const [inputs, setInputs] = useState({});
  const [Sent, setSent] = useState(false);
  const [Sending, setSending] = useState(false);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs.postTitle);
    if (
      inputs.postTitle === "" ||
      inputs.postMessage === "" ||
      inputs.postMessage === undefined ||
      inputs.postTitle === undefined
    ) {
      alert("fill your thoughts before submit.");
      return;
    } else {
      sendAPost();
    }
  };

  // sending post
  const sendAPost = async () => {
    if (inputs.postTitle === "" || inputs.postMessage === "") {
      alert("fill form before submit.");
      return;
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${
        window.location.protocol === "http:"
          ? "https://link-server-proxy-mode.herokuapp.com/"
          : ""
      }https://soa-confession-backend.vercel.app/244688/posts`,
      data: {
        username: localStorage.getItem("userName"),
        message: inputs.postMessage,
        secret: false, // for now, in future we will add the secret feature.
        userid: localStorage.getItem("userID"),
        title: inputs.postTitle,
        imgsrc: inputs.postImage,
        timestamp: `${new Date().toLocaleTimeString()} | ${new Date().toLocaleDateString()}`,
      },
    };

    try {
      setSending(true);
      setSent(false);
      const { data } = await axios.request(options);
      if (data.message === "ok") {
        setSent(true);
        setSending(false);
      } else if (data.message === "not ok") {
        alert("Something went wrong! Try again..");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <center>
      <div className="pageTitle">Submit a Post!</div>
      {Sending ? <LoaderSpinner /> : null}
      <form onSubmit={handleSubmit}>
        <label>Enter post title:</label>
        <input
          type="text"
          name="postTitle"
          value={inputs.postTitle || ""}
          onChange={handleChange}
        />
        <br></br>
        <label>Enter image source if available :</label>
        <input
          type="text"
          name="postImage"
          value={inputs.postImage || ""}
          onChange={handleChange}
        />
        <br></br>
        <label>Enter your message:</label>

        <textarea
          type="text"
          name="postMessage"
          value={inputs.postMessage || ""}
          onChange={handleChange}
          rows="4"
          cols="50"
        />
        <br></br>
        <input type="submit" />
      </form>
      {Sent ? (
        <Toast
          toastTitle={"Posted!"}
          toastColor={"success"}
          toastMessage={"Visit the posts section to view post."}
        />
      ) : null}
    </center>
  );
};

export default CreatePost;
