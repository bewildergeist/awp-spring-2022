import { Link, Outlet, LiveReload, Links, Meta, Scripts } from "remix";
import styles from "~/styles/global.css";
import navStyles from "~/styles/Nav.css";

// export function links() {
//   return [{ rel: "stylesheet", href: styles }];
// }


// export const links = () => [
//   {
//     rel: "stylesheet",
//     href: globalStylesUrl,
//   },
// ];

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css",
    },
    {
      rel: "stylesheet",
      href: styles
    },
    {
      rel: "stylesheet",
      href: navStyles
    }
  ];
}

export const meta = () => ({
  description: "An example blog",
  keywords: "remix, javascript",
});

export default function App() {
  return (
    <Document title="Remix Blog">
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
      <nav className="navbar">
        <Link to="/" className="logo">
          Remix Blog
        </Link>
        <ul className="nav nav-recipe">
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
