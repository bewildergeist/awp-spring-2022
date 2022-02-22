import { Link } from "remix";

export default function Button({ to, type, destructive = false, children }) {
  let className = "button";
  if (destructive) {
    className += " button-destructive";
  }
  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className={className} type={type}>
        {children}
      </button>
    );
  }
}
