import styles from "~/styles/Home.css";

export const links = () => [
  { rel: "stylesheet", href: styles },  
]

export default function Home() {
  return (
    <div className="landingPage">
        <div>
          <h1 >Focused on cooking <br />
          <span className="highlight-1"> fundamentals</span> and <br />
          <span className="highlight-2"> modern</span> techniques,<br /> you are simply going to <br />
          <span className="highlight-3"> create better dishes</span></h1>
          <button className="button">Get Started</button>
      </div>
    </div>
  );
}
