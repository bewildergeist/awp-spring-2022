import styles from "~/styles/index.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export default function Home() {
  return (
    <div className="containerHome">
      <h1>
        Focues on cooking <span className="blue">fundamentals</span> and{" "}
        <span className="green">modern</span> techniques, you are simply going
        to <span className="yellow">create better dishes</span>
      </h1>
      <a href="/recipes" className="blue">
        Get started
      </a>
    </div>
  );
}
