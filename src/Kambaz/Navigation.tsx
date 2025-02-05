import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { useState } from "react";

export default function KambazNavigation() {
  const unselectedName = "list-group-item text-center border-0 bg-black text-white";
  const selectedName = "list-group-item text-center border-0 bg-white text-danger";
  const [selected, setSelected] = useState<string>("wd-dashboard-link");

  function getClassName(id: string) {
    return id === selected ? selectedName : unselectedName;
  }

  function handleSelect(id: string) {
    console.log(id)
    setSelected(id)
  }

  return (
    <div id="wd-kambaz-navigation" style={{ width: 110 }}
        className="list-group rounded-0 position-fixed
        bottom-0 top-0 d-none d-md-block bg-black z-2">
      <a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank" className="list-group-item bg-black border-0 text-center">
        <img src="/images/NEU.png" width="75px" />
      </a>
      <Link to="/Kambaz/Account" id="wd-account-link" className={getClassName("wd-account-link")} onClick={() => handleSelect("wd-account-link")}>
        <FaRegCircleUser className={selected === "wd-account-link" ? "fs-1 text text-danger" : "fs-1 text text-white"} /><br />
        Account
      </Link>
      <Link to="/Kambaz/Dashboard" id="wd-dashboard-link" className={getClassName("wd-dashboard-link")} onClick={() => handleSelect("wd-dashboard-link")}>
        <AiOutlineDashboard className="fs-1 text-danger" /><br />
        Dashboard
      </Link>
      <Link to="/Kambaz/Dashboard" id="wd-course-link" className={getClassName("wd-course-link")} onClick={() => handleSelect("wd-course-link")}>
        <LiaBookSolid className="fs-1 text-danger" /><br />
        Courses
      </Link>
      <Link to="/Kambaz/Calendar" id="wd-calendar-link" className={getClassName("wd-calendar-link")} onClick={() => handleSelect("wd-calendar-link")}>
        <IoCalendarOutline className="fs-1 text-danger" /><br />
        Calendar
      </Link>
      <Link to="/Kambaz/Inbox" id="wd-inbox-link" className={getClassName("wd-inbox-link")} onClick={() => handleSelect("wd-inbox-link")}>
        <FaInbox className="fs-1 text-danger" /><br />
        Inbox
      </Link>
      <Link to="/Labs" id="wd-labs-link" className={getClassName("wd-labs-link")} onClick={() => handleSelect("wd-labs-link")}>
        <LiaCogSolid className="fs-1 text-danger" /><br />
        Labs
      </Link>
    </div>
);}
