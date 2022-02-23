import { Link } from "remix";
import styles from "~/styles/home.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export default function Home() {
  return (
    <div className="home-page">
      <h1>
        Focused on cooking <span className="blue">fundamentals</span> and <span className="green">modern</span>{" "}
        techniques, you are simply going to <span className="yellow">create better dishes.</span>
      </h1>

      <Link to="/recipes" className="btn btn-start">
        Get started
      </Link>
    </div>
  );
}
