import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1235/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/celebi.jpg" width={200} />
            <div>
              <h5> CS1235 Time Travel </h5>
              <p className="wd-dashboard-course-title">
                Time Travel With Celebi  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1236/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/flowers.png" width={200} />
            <div>
              <h5> CS1236 Interpreting Textures </h5>
              <p className="wd-dashboard-course-title">
                Who took my flower texture?!  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1237/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/graph.png" width={200} />
            <div>
              <h5> CS1237 Graphing Pain </h5>
              <p className="wd-dashboard-course-title">
                Representing your pain with graphs  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1238/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/progress.png" width={200} />
            <div>
              <h5> CS1238 Intro to BGDC </h5>
              <p className="wd-dashboard-course-title">
                Introduction to Being Gay and Doing Crime  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1239/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/ravenclaw.png" width={200} />
            <div>
              <h5> CS1239 Ravenclawing </h5>
              <p className="wd-dashboard-course-title">
                How to Raven your Claws  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1240/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/tfmlogo.png" width={200} />
            <div>
              <h5> CS1240 TFM </h5>
              <p className="wd-dashboard-course-title">
                Transformation, Fitness, and Movement  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}
