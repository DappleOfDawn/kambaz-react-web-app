import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";
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
import PeopleTable from "./People/Table";
import { useEffect, useState } from "react";
import * as courseClient from "./client";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const course = courses.find((course: any) => course._id === cid);
  const { pathname } = useLocation();
  const [users, setUsers] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [assignment, setAssignment] = useState<any>({});

  const deleteAssignment = async (assignmentId: string) => {
    await courseClient.deleteAssignment(cid!, assignmentId);
    setAssignments(assignments.filter((a) => a._id !== assignmentId));
  }
  

  useEffect(() => {
    const findUsersForCourse = async () => {
      try {
        const usersForCourse = await courseClient.findUsersForCourse(cid!);
        setUsers(usersForCourse);
      } catch (error) {
        console.error(error);
      }
    }
    const findAssignmentsForCourse = async () => {
      try {
        const assignmentsForCourse = await courseClient.findAssignmentsForCourse(cid!);
        setAssignments(assignmentsForCourse);
      } catch (error) {
        console.error(error);
      }
    }

    if (cid) {
      findUsersForCourse();
      findAssignmentsForCourse();
    }
  }, [cid]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split('/')[4]}
      </h2>
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
            <Route path="Assignments" element={
              <Assignments
                assignments={assignments}
                deleteAssignment={deleteAssignment}
              />} />
            <Route path="Assignments/:aid" element={
              <AssignmentEditor
                assignment={assignment}
                setAssignment={setAssignment}
                assignments={assignments}
                setAssignments={setAssignments}
              />} />
            <Route path="People" element={<PeopleTable users={users}/>} />
            <Route path="Grades" element={<Grades />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Zoom" element={<Zoom />} />
            <Route path="Piazza" element={<Piazza />} />
          </Routes>
        </div>
      </div>
    </div>
);}
