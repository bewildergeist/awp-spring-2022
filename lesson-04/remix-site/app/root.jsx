import { Link, Outlet, LiveReload, Links, Meta, Scripts } from "remix";
import globalStylesUrl from "~/styles/global.css";
import styles from "~/tailwind.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  {
    rel: "stylesheet",
    href: globalStylesUrl,
  },
];

export const meta = () => ({
  description: "A collection of great recipes",
  keywords: "cooking, food, recipes",
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
    <html lang="en">
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
      <nav className="flex justify-between py-5 px-7">
        <Link to="/" className="font-extrabold text-2xl text-white">
          Remixed Recipes
        </Link>
        <div>
          <Link to="/recipes" className="font-bold text-lg text-gray-400">
            Recipes
          </Link>
        </div>
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
