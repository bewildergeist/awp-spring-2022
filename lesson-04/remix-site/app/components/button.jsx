import { Link } from "remix";

export default function Button( { type, destructive = false, children }){
    let className = "button";
    if(destructive){
        className += "button-destructive";
    }

    return (
        <button className={className} type={type}>
        {children}
        </button>
    )
}