export default function Home() {
  return (
    <div className="mx-auto w-6/12 my-6">
      <h1 className="font-sans text-5xl font-extrabold my-6">
        Focues on cooking{" "}
        <span className="text-blue-400/100">fundamentals</span> and{" "}
        <span className="text-green-400/100">modern</span> techniques, you are
        simply going to{" "}
        <span className="text-yellow-400/100">create better dishes</span>
      </h1>
      <a
        href="/recipes"
        className="px-6 py-2 font-semibold rounded-md bg-black bg-blue-600/100"
      >
        Get started
      </a>
    </div>
  );
}
