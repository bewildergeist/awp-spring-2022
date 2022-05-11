import styles from "~/styles/home.css";
import { Link } from "remix";


export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export default function Home() {
  return (
<<<<<<< Updated upstream
    <div>
      <h1>Welcome</h1>
      <p>This site is full of great posts. Enjoy!</p>
    </div>
=======
    <div className="container">
    
      <h1>Focused on cooking fundamentals and modern techniques, you are simply going to create better dishes</h1>
      <Link to="/recipes" className="rLink">Recipes</Link>
     </div>
>>>>>>> Stashed changes
  );
}
