import { Link, Outlet, LiveReload, Links, Meta, Scripts } from "remix";
import globalStylesUrl from "~/styles/global.css";
import recipiesStyleUrl from "~/styles/recipies.css";
import styles from "~/tailwind.css";
export const links = () => [
  {
    rel: "stylesheet",
    href: globalStylesUrl,
  },
  {
    rel: "stylesheet",
    href: recipiesStyleUrl,
  },
  { rel: "stylesheet", href: styles },
];

export const meta = () => ({
  description: "An example blog",
  keywords: "remix, javascript",
});

export default function App() {
  return (
    <Document title="Recipie site">
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({ children, title }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={true}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
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
      <nav className="navbar flex items-center h-16 justify-between px-4">
        <Link to="/" className="logo" className=" text-white ">
          Remixed Recipes
        </Link>
        <ul className="nav">
          <Link className="text-white" to="/recipies">
            Recipies
          </Link>
        </ul>
      </nav>
      <div className="container mt-6 mx-11 text-white">{children}</div>
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
