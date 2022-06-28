import styles from "~/styles/Home.css";
import Top from "~/Views/Home/Top";
import { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

const Home = () => {
  return (
    <div className="container">
      <Top />
      <div className="blueLineContainer">
        <img
          alt=""
          src="https://res.cloudinary.com/desfs11x6/image/upload/v1656408745/kathmandu/home/blue-line_jjlcrk.webp"
          className="blueLine"
        />
        <div className="blueLineText">This Week Only</div>
        <div className="blueLinesub">Ends 28 June</div>
        <div className="blueLineButton">
          Shop deals
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="#fff"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
          </svg>
        </div>
      </div>
      <div className="firstImageContainer">
        <img
          alt=""
          src="https://res.cloudinary.com/desfs11x6/image/upload/v1656408753/kathmandu/home/home-first_dqzxo5.webp"
          className="firstImage"
        />
        <div className="firstImageText">This Week Only</div>
      </div>
      Home Page
    </div>
  );
};

export default Home;
