import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "./LoaderSpinner";
import Toast from "./Toast";

const Card = ({ post }) => {
  const [Deleted, setDeleted] = useState(false);
  const [Deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const toPagePost = () => {
    navigate("/post", { state: post });
  };

  const deleteThePost = async () => {
    const options = {
      method: "DELETE",
      url: `${
        window.location.protocol === "http:"
          ? "https://link-server-proxy-mode.herokuapp.com/"
          : ""
      }https://soa-confession-backend.vercel.app/244688/posts`,
      data: { id: post._id, userid: localStorage.getItem("userID") },
    };

    try {
      setDeleting(true);
      const { data } = await axios.request(options);
      if (data.message === "ok") {
        setDeleted(true);
        setDeleting(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="confessionCard">
      <div className="postTitle">{post.title}</div>
      {post.imgsrc === undefined || post.imgsrc === "" ? null : (
        <img src={post.imgsrc} class="img-fluid" alt="user_image"></img>
      )}

      <div className="postMessage">
        {post.message.slice(0, 100)}
        <b
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => toPagePost()}
        >
          {" "}
          Read more..
        </b>
      </div>
      <div style={{ marginTop: "10px" }}>
        <img
          className="openLogo"
          style={{ cursor: "pointer" }}
          onClick={() => toPagePost()}
          alt="open"
          src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-open-web-store-flaticons-lineal-color-flat-icons.png"
        />
      </div>
      <div className="moreInfo">
        <b title="posted by" className="userNameCard">
          {post.username === localStorage.getItem("userName")
            ? "🔴 You"
            : "🟢 " + post.username}
        </b>
        <b title="posted at">⌚:{post.timestamp}</b>
      </div>
      <b className="postIDonPost" title="encryption key">
        🔐:{post._id}
      </b>
      <div className="deletePost">
        {post.username === localStorage.getItem("userName") ? (
          <img
            onClick={() => deleteThePost()}
            alt="delete post"
            title="delete the post."
            src="https://img.icons8.com/plasticine/100/000000/filled-trash.png"
          />
        ) : null}
      </div>
      {Deleting ? <LoaderSpinner /> : null}
      {Deleted ? (
        <Toast
          toastTitle={"Post Deleted!"}
          toastColor={"danger"}
          toastMessage={" The post has been deleted."}
        />
      ) : null}
    </div>
  );
};

export default Card;
