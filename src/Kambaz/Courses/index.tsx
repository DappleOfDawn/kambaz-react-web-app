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
  // const [assignments, setAssignments] = useState<any[]>([]);
  // const [assignment, setAssignment] = useState<any>({});
  /*
  const findAssignmentById = async (assignmentId: string) => {
    try {
      const assignmentById = await courseClient.findAssignmentById(cid!, assignmentId);
      setAssignment(assignmentById);
    } catch (error) {
      console.error(error);
    }
  };
  const addNewAssignment = async () => {
    try {
      const newAssignment = await courseClient.createAssignment(cid!);
      setAssignment(newAssignment);
    } catch (error) {
      console.error(error);
    }
  };
  const updateAssignment = async () => {
    try {
      await courseClient.updateAssignment(cid!, assignment);
      setAssignments(assignments.map((a) => {
        if (a._id === assignment._id) { return assignment; }
        else { return a; }
      }));
    } catch (error) {
      console.error(error);
    }
  }
  const deleteAssignment = async (assignmentId: string) => {
    const status = await courseClient.deleteAssignment(cid!, assignmentId);
    setAssignments(assignments.filter((a) => a._id !== assignmentId));
  }
  */

  useEffect(() => {
    const findUsersForCourse = async () => {
      try {
        const usersForCourse = await courseClient.findUsersForCourse(course._id);
        setUsers(usersForCourse);
      } catch (error) {
        console.error(error);
      }
    }
    // const findAssignmentsForCourse = async () => {
    //   try {
    //     const assignmentsForCourse = await courseClient.findAssignmentsForCourse(course._id);
    //     setAssignments(assignmentsForCourse);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }

    if (cid) {
      findUsersForCourse();
      // findAssignmentsForCourse();
    }
  }, [cid, course]);

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
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
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
