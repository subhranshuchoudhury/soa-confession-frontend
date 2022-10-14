import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import LoaderSpinner from "../components/LoaderSpinner";
import Toast from "../components/Toast";

const Post = () => {
  const location = useLocation();
  const [comment, setComment] = useState("");
  const [Sending, setSending] = useState(false);
  const [Sent, setSent] = useState(false);
  const [Comments, setComments] = useState(location.state.comments);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      url: `https://link-server-proxy-mode.herokuapp.com/https://soa-confession-backend.vercel.app/244688/comments`,
      data: {
        username: localStorage.getItem("userName"),
        userid: localStorage.getItem("userID"),
        id: location.state._id,
        comment: comment,
        timestamp: `${new Date().toLocaleTimeString()} | ${new Date().toLocaleDateString()}`,
      },
    };

    try {
      setSending(true);
      const { data } = await axios.request(options);
      if (data.message === "ok") {
        setComments((prev) => [
          ...prev,
          { commenter: localStorage.getItem("userName"), comment: comment },
        ]);
        setSending(false);
        setSent(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="singlePostContainer">
        <div className="postTitle">{location.state.title}</div>
        <div style={{ minHeight: "200px" }} className="postMessage">
          {location.state.message}
        </div>
        <div style={{ textAlign: "center", color: "white", marginTop: "20px" }}>
          {location.state.username}
        </div>
        {Sending ? <LoaderSpinner /> : null}
        {/* comment box */}
        <form onSubmit={handleSubmit}>
          <label>
            Enter comment:
            <br></br>
            <input
              style={{ margin: "10px auto" }}
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <input type="submit" />
          </label>
        </form>
        {Sent ? (
          <Toast
            toastColor={"success"}
            toastTitle={"Comment added!"}
            toastMessage={"Your comment has been added."}
          />
        ) : null}
      </div>
      <div className="commentsHolder">
        {Comments.map((comment, index) => {
          return (
            <div
              key={index}
              className={`singleComment ${
                comment.commenter === localStorage.getItem("userName")
                  ? "myCommentStyle"
                  : "otherCommentStyle"
              }`}
            >
              {comment.commenter === localStorage.getItem("userName")
                ? "🔴 You"
                : "🟢 " + comment.commenter}
              ➡️ {comment.comment}
              <p>{comment.timestamp}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Post;
