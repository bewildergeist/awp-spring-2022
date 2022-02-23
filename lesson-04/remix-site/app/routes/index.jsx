import styles from "~/styles/Home.css";

export const links = () => [
  { rel: "stylesheet", href: styles },  
]

export default function Home() {
  return (
    <div className="mt-40">
        <div className="space-y-10">
          <h1 className="text-7xl font-sans">Focused on cooking <br />
          <span className="text-blue-500"> fundamentals</span> and <br />
          <span className="text-green-500"> modern</span> techniques,<br /> you are simply going to <br />
          <span className="text-yellow-500"> create better dishes</span></h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Started</button>
      </div>
    </div>
  );
}
