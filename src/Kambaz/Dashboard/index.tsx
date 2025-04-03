import { Link } from "react-router-dom";
import { addCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { addEnrollment, deleteEnrollment } from "./enrollmentReducer";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description", imgSrc: "/images/reactjs.jpg", credits: 0, department: "New Course Department"
  });
  const [showAllCourses, setShowAllCourses] = useState<boolean>(false);

  const protectCourse = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, courseId: string) => {
    if (enrollments.some((enrollment: any) => enrollment.user === currentUser._id && enrollment.course === courseId)) {
      return;
    }
    event.preventDefault();
  }

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <h5>New Course
        <button className="btn btn-primary float-end"
                id="wd-add-new-course-click"
                onClick={() => dispatch(addCourse(course))} > Add </button>
        <button className="btn btn-warning float-end me-2"
                onClick={() => dispatch(updateCourse(course))} id="wd-update-course-click">
          Update
        </button>
      </h5><br />
      <input value={course.name} className="form-control mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <textarea value={course.description} className="form-control" onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})
        <button className="btn btn-primary float-end" onClick={() => setShowAllCourses(!showAllCourses)}> Enrollments </button>
      </h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
      <div className="row row-cols-1 row-cols-md-5 g-4">
        {courses.map((course: any) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }} key={course._id}>
              <div className="card rounded-3 overflow-hidden">
                <Link onClick={(e) => protectCourse(e, course._id)} to={`/Kambaz/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <img src={course.imgSrc} width="100%" height={160} />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name} </h5>
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description} </p>
                    <button className="btn btn-primary"> Go </button>
                    {(enrollments.some((enrollment: any) =>
                      enrollment.user === currentUser._id &&
                      enrollment.course === course._id
                    ))
                    ? <button className="btn btn-primary" onClick={(e) => {
                      e.preventDefault();
                      dispatch(deleteEnrollment(enrollments.find((enrollment: any) => enrollment.user === currentUser._id && enrollment.course === course._id)._id));
                    }}>Unenroll</button>
                    : <button className="btn btn-danger" onClick={(e) => {
                      e.preventDefault();
                      dispatch(addEnrollment({
                        _id: "newEnrollement",
                        user: currentUser._id,
                        course: course._id,
                      }));
                    }}>Enroll</button>}
                    <button onClick={(event) => {
                      event.preventDefault();
                      dispatch(deleteCourse(course._id));
                    }} className="btn btn-danger float-end"
                    id="wd-delete-course-click">
                      Delete
                    </button>
                    <button id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end" >
                      Edit
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
);}
