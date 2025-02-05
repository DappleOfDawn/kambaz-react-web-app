import { Navigate, Route, Routes } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import Quizzes from "./Quizzes";
import Zoom from "./Zoom";
import Piazza from "./Piazza";
import { FaAlignJustify } from "react-icons/fa6";
import PeopleTable from "./People/table";

export default function Courses() {
  return (
    <div id="wd-courses">
      <h2 className="text-danger">Course 1234</h2>
      <FaAlignJustify className="me-4 fs-4 mb-1" />
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable />} />
            <Route path="Grades" element={<Grades />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Zoom" element={<Zoom />} />
            <Route path="Piazza" element={<Piazza />} />
          </Routes>
        </div>
      </div>
    </div>
);}
