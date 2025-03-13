import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0 me-2">
      {links.map(a =>
        <Link to={`/Kambaz/Account/${a}`} key={a}
              id={`wd-${a.toLowerCase()}-link`}
              className={`list-group-item ${pathname === `/Kambaz/Account/${a}` ? 'active' : 'text-danger'} border border-0`}>
          {a}
        </Link>)}
      {/* <Link to={`/Kambaz/Account/Signin`} id="wd-signin-link" className="list-group-item active border border-0">
        Signin
      </Link>
      <Link to={`/Kambaz/Account/Signup`} id="wd-signup-link" className="list-group-item text-danger border border-0">
        Signup
      </Link>
      <Link to={`/Kambaz/Account/Profile`} id="wd-profile-link" className="list-group-item text-danger border border-0">
        Profile
      </Link> */}
    </div>
);}
