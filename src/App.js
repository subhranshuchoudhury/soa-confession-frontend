import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
// import Card from "./components/Card";
import Layout from "./Layout";
// import Home from "./pages/Home";
import Post from "./pages/Post";
import Posts from "./pages/Posts";
import NoPage from "./pages/NoPage";
import CreatePost from "./pages/CreatePost";
import axios from "axios";
import { useEffect, useState } from "react";
import Settings from "./pages/Settings";

function App() {
  // user creation.
  const [UserCreated, setUserCreated] = useState(false);
  const userCreator = async () => {
    try {
      const { data } = await axios.get(
        "https://soa-confession-backend.vercel.app/244688/create-user"
      );
      console.log(data);
      localStorage.setItem("userName", data.username);
      localStorage.setItem("userID", data.userid);
      setUserCreated(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("userName") === null ||
      localStorage.getItem("userID") === null
    ) {
      userCreator();
    } else {
      setUserCreated(true);
    }
  }, []);
  return (
    <>
      {UserCreated ? (
        <div className="userInfo">
          User: {localStorage.getItem("userName")} ID:{" "}
          {localStorage.getItem("userID")}
        </div>
      ) : null}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Posts />} />
            <Route path="post" element={<Post />} />
            <Route path="settings" element={<Settings />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
