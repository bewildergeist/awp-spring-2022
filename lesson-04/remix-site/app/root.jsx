import { Link, Outlet, LiveReload, Links, Meta, Scripts } from "remix";
import styles from "~/tailwind.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const meta = () => ({
  description: "A website blog to find delicious recipes.",
  keywords: "food, recipe, blog, 🍪",
});

export default function App() {
  return (
    <Document title="Remixed Recipes">
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({ children, title }) {
  return (
    <html lang="en" className="bg-stone-900 text-white">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>{title}</title>
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
        <Scripts />
      </body>
    </html>
  );
}

function Layout({ children }) {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          <h1 className="text-white text-2xl font-extrabold text-center p-8 hover:text-red-300">
            Remixed Recipes
          </h1>
        </Link>
      </nav>
      <div>{children}</div>
    </>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <Document>
      <Layout>
        <h1>Error</h1>
        <p>{error.message}</p>
      </Layout>
    </Document>
  );
}
