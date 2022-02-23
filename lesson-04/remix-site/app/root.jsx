import { Link, Outlet, LiveReload, Links, Meta, Scripts } from "remix";
// import globalStylesUrl from "~/styles/global.css";
import styles from "./tailwind.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

// export const links = () => [
//   {
//     rel: "stylesheet",
//     href: globalStylesUrl,
//   },
// ];

export const meta = () => ({
  description: "An example recipe site",
  keywords: "remix, javascript",
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
      <body className="bg-gray-800 text-white">
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
      <nav className="flex justify-between p-6">
        <Link to="/" className="text-3xl">
          Remixed Recipes
        </Link>
        <ul className="">
          <Link to="/recipes">Recipes</Link>
        </ul>
      </nav>
      <div className="flex justify-center h-full">{children}</div>
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
