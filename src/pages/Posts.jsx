import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import LoaderSpinner from "../components/LoaderSpinner";

const Posts = () => {
  const [Posts, setPosts] = useState([]);
  const [Loading, isLoading] = useState(true);
  const loadPosts = async () => {
    try {
      const { data } = await axios.get(
        "https://soa-confession-backend.vercel.app/244688/posts"
      );
      setPosts(data.reverse());
      isLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);
  return (
    <>
      <center>
        <div className="pageTitle">Confessor</div>
        {Loading ? <LoaderSpinner /> : null}

        {Posts.map((post, index) => {
          return <Card key={index} post={post} index={index} />;
        })}
      </center>
    </>
  );
};

export default Posts;
