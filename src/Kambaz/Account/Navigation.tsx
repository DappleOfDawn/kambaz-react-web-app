import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const active = (path: string) => (pathname.includes(path) ? "active" : "text-danger");

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0 me-2">
      {links.map(a =>
        <Link to={`/Kambaz/Account/${a}`} key={a}
              id={`wd-${a.toLowerCase()}-link`}
              className={`list-group-item ${active(a)} border border-0`}>
          {a}
        </Link>)}
      {currentUser && currentUser.role === "ADMIN" && (
        <Link to={`/Kambaz/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link> )}
    </div>
);}
