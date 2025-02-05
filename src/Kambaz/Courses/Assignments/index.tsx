import { Button, Col, ListGroup, Row } from "react-bootstrap";
import AssignmentsControls from "./AssignmentsControls";
import { BsGripVertical } from "react-icons/bs";
import AssignCatControlButtons from "./AssignCatControlButtons";
import AssgnControlButtons from "./AssgnControlButtons";
import { LuNotebookPen } from "react-icons/lu";

export default function Assignments() {
  return (
    <div>
      <AssignmentsControls /><br />
      <ListGroup className="rounded-0"  id="wd-assignments">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS
            <AssignCatControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <Row className="align-items-center">
                <Col xs={2}>
                  <BsGripVertical className="me-2 fs-3" />
                  <Button size="lg" variant="tertiary" href="#/Kambaz/Courses/1234/Assignments/123"><LuNotebookPen /></Button>
                </Col>
                <Col xs={8}>
                  <h3>A1 - ENV + HTML</h3>
                  Multiple Modules | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100pts
                </Col>
                <Col xs={2}><AssgnControlButtons /></Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <Row className="align-items-center">
                <Col xs={2}>
                  <BsGripVertical className="me-2 fs-3" />
                  <Button size="lg" variant="tertiary" href="#/Kambaz/Courses/1234/Assignments/124"><LuNotebookPen /></Button>
                </Col>
                <Col xs={8}>
                  <h3>A2 - CSS + BOOTSTRAP</h3>
                  Multiple Modules | <b>Not available until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100pts
                </Col>
                <Col xs={2}><AssgnControlButtons /></Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <Row className="align-items-center">
                <Col xs={2}>
                  <BsGripVertical className="me-2 fs-3" />
                  <Button size="lg" variant="tertiary" href="#/Kambaz/Courses/1234/Assignments/125"><LuNotebookPen /></Button>
                </Col>
                <Col xs={8}>
                  <h3>A3 - JAVASCRIPT + REACT</h3>
                  Multiple Modules | <b>Not available until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100pts
                </Col>
                <Col xs={2}><AssgnControlButtons /></Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            QUIZZES
            <AssignCatControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <Row className="align-items-center">
                <Col xs={2}>
                  <BsGripVertical className="me-2 fs-3" />
                  <Button size="lg" variant="tertiary" href="#/Kambaz/Courses/1234/Assignments/133"><LuNotebookPen /></Button>
                </Col>
                <Col xs={8}>
                  <h3>Q1 - ENV + HTML</h3>
                  <b>Not available until</b> May 7 at 12:00am | <b>Due</b> May 14 at 11:59pm | 25pts
                </Col>
                <Col xs={2}><AssgnControlButtons /></Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <Row className="align-items-center">
                <Col xs={2}>
                  <BsGripVertical className="me-2 fs-3" />
                  <Button size="lg" variant="tertiary" href="#/Kambaz/Courses/1234/Assignments/134"><LuNotebookPen /></Button>
                </Col>
                <Col xs={8}>
                  <h3>Q2 - CSS + BOOTSTRAP</h3>
                  <b>Not available until</b> May 14 at 12:00am | <b>Due</b> May 21 at 11:59pm | 25pts
                </Col>
                <Col xs={2}><AssgnControlButtons /></Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <Row className="align-items-center">
                <Col xs={2}>
                  <BsGripVertical className="me-2 fs-3" />
                  <Button size="lg" variant="tertiary" href="#/Kambaz/Courses/1234/Assignments/135"><LuNotebookPen /></Button>
                </Col>
                <Col xs={8}>
                  <h3>Q3 - JAVASCRIPT + REACT</h3>
                  <b>Not available until</b> May 21 at 12:00am | <b>Due</b> May 28 at 11:59pm | 25pts
                </Col>
                <Col xs={2}><AssgnControlButtons /></Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            EXAMS
            <AssignCatControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <Row className="align-items-center">
                <Col xs={2}>
                  <BsGripVertical className="me-2 fs-3" />
                  <Button size="lg" variant="tertiary" href="#/Kambaz/Courses/1234/Assignments/143"><LuNotebookPen /></Button>
                </Col>
                <Col xs={8}>
                  <h3>MIDTERM</h3>
                  <b>Not available until</b> May 8 at 12:00am | <b>Due</b> May 15 at 11:59pm | 25pts
                </Col>
                <Col xs={2}><AssgnControlButtons /></Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <Row className="align-items-center">
                <Col xs={2}>
                  <BsGripVertical className="me-2 fs-3" />
                  <Button size="lg" variant="tertiary" href="#/Kambaz/Courses/1234/Assignments/144"><LuNotebookPen /></Button>
                </Col>
                <Col xs={8}>
                  <h3>FINAL</h3>
                  <b>Not available until</b> May 15 at 12:00am | <b>Due</b> May 22 at 11:59pm | 25pts
                </Col>
                <Col xs={2}><AssgnControlButtons /></Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            PROJECT
            <AssignCatControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <Row className="align-items-center">
                <Col xs={2}>
                  <BsGripVertical className="me-2 fs-3" />
                  <Button size="lg" variant="tertiary" href="#/Kambaz/Courses/1234/Assignments/153"><LuNotebookPen /></Button>
                </Col>
                <Col xs={8}>
                  <h3>SEMESTER PROJECT</h3>
                  Multiple Modules | <b>Not available until</b> May 9 at 12:00am | <b>Due</b> May 16 at 11:59pm | 100pts
                </Col>
                <Col xs={2}><AssgnControlButtons /></Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
);}
