import { Link } from "remix";

export default function Home() {
  return (
    <section className="flex items-center flex-col text-4xl text-white mt-40">
      <div className="flex items-center flex-col max-w-2xl ">
        <h1 className="mb-10">
          Focused on cooking{" "}
          <span className="text-blue-300 font-bold">fundamentals</span> and{" "}
          <span className="text-yellow-300 font-bold">modern</span> techniques,
          you are simply going to{" "}
          <span className="text-red-300 font-bold">create better dishes</span>
        </h1>
        <button className="bg-transparent border-2 border-white border-solid p-2 rounded-lg transition-all hover:bg-white hover:text-black">
          <Link to="/recipes">Get started</Link>
        </button>
      </div>
    </section>
  );
}
