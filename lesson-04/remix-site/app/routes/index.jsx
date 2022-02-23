import { Link } from "remix";
import styles from "~/styles/Home.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function Home() {
  return (
    <div className="welcome">
      <h1>Welcome</h1>
      <p>This site is full of <span className="highlight">great recipes</span>. Enjoy!</p>
      <Link to="/recipes" className="btn btn-start">
      Get start
      </Link> 
    </div>
    
  );
}
