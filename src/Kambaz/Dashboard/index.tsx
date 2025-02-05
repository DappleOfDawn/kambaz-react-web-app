import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1234/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width={270} />
                <Card.Body>
                  <Card.Title> CS1234 React JS </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Full Stack software developer  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1235/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/celebi.jpg" width={270} />
                <Card.Body>
                  <Card.Title> CS1235 Time Travel </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Time Travel With Celebi  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1236/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/flowers.png" width={270} />
                <Card.Body>
                  <Card.Title> CS1236 Interpreting Textures </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Who took my flower texture?!  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1237/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/graph.png" width={270} />
                <Card.Body>
                  <Card.Title> CS1237 Graphing Pain </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Representing your pain with graphs  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1238/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/progress.png" width={270} />
                <Card.Body>
                  <Card.Title> CS1238 Intro to BGDC </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Introduction to Being Gay and Doing Crime  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1239/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/ravenclaw.png" width={270} />
                <Card.Body>
                  <Card.Title> CS1239 Ravenclawing </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    How to Raven your Claws  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1240/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/tfmlogo.png" width={270} />
                <Card.Body>
                  <Card.Title> CS1240 TFM </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Transformation, Fitness, and Movement  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
);}
