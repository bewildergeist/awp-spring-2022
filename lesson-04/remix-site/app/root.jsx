import { Link, Outlet, LiveReload, Links, Meta, Scripts } from "remix";
import styles from "./tailwind.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta = () => ({
  description: "Recipes going wild",
  keywords: "Recipes, recipe",
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
    <html class="dark" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>{title}</title>
      </head>
      <body class="bg-black text-white">
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
      <nav className="flex justify-between m-5">
        <Link to="/" className="font-bold">
          Remixed Recipes
        </Link>
        <ul className="font-medium">
          <Link to="/recipes">Recipes</Link>
        </ul>
      </nav>
      <div className="container">{children}</div>
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
