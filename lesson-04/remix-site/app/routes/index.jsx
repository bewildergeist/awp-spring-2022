import { Link } from "remix";

export default function Home() {
  return (
    <section className="dontBreak">
      <h1>
        Focused on cooking
        <span class="fundamentals">fundamentals</span>
        and <span className="modern">modern</span> techniques, you are simply
        going to <span className="create">create better dishes</span>
      </h1>
      <button className="btn">
        <Link to="/recipes">Get started</Link>
      </button>
    </section>
  );
}
