import { Link } from "remix";

export default function LinkButton({ to, destructive = false, children }) {
    let className = "button";
    if(destructive){
        className += "button-destructive";
    }
        return(
            <Link className={className} to={to}>
                {children}
            </Link>
        );

}