import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Outlet />
      <div style={{ marginTop: "100px" }} className="spacer"></div>
      <nav className="fixed-bottom">
        <div className="routeHolder">
          <Link title="View posts." to="/">
            <img
              className="send-icon navIcon"
              src="https://img.icons8.com/bubbles/100/000000/messages-mac.png"
              alt="posts"
            />
          </Link>
          <Link title="Send a post." to="/create-post">
            <img
              className="send-icon navIcon"
              src="https://img.icons8.com/fluency/96/000000/filled-sent.png"
              alt="send post"
            />
          </Link>
          <Link title="Settings." to="/settings">
            <img
              className="send-icon navIcon"
              style={{ height: "60px" }}
              src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-setting-notifications-justicon-lineal-color-justicon.png"
              alt="send post"
            />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Layout;
