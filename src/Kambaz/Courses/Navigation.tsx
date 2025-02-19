import { Link, useParams, useLocation } from "react-router-dom";

export default function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const { cid } = useParams();
  const { pathname } = useLocation();

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0 me-2">
      {links.map(link => (
        <Link to={`/Kambaz/Courses/${cid}/${link}`}
              id={`wd-course-${link.toLowerCase()}-link`}
              className={`list-group-item border border-0 ${pathname === `/Kambaz/Courses/${cid}/${link}` ? 'active' : 'text-danger'}`}
              key={link}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
