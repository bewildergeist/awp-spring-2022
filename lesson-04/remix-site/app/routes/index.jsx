import Button from "~/components/Button.jsx";
import styles from "~/styles/Home.css";

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
    <section>
      <h1>
        Focused on cooking <span className="fundamentals">fundamentals</span>{" "}
        and <span className="modern">modern</span> techniques, you are simply
        going to <span className="create">create better dishes</span>
      </h1>
      <Button to="/recipes">Get Started</Button>
    </section>
  );
}
