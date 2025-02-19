import { Button, Col, ListGroup, Row } from "react-bootstrap";
import AssignmentsControls from "./AssignmentsControls";
import { BsGripVertical } from "react-icons/bs";
import AssignCatControlButtons from "./AssignCatControlButtons";
import AssgnControlButtons from "./AssgnControlButtons";
import { LuNotebookPen } from "react-icons/lu";
import { useLocation, useParams } from "react-router";
import * as db from "../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const assignments = db.assignments;

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
            {assignments.filter(a => a.course === cid).map(a => (
              <ListGroup.Item className="wd-lesson p-3 ps-1" key={a._id}>
                <Row className="align-items-center">
                  <Col xs={2}>
                    <BsGripVertical className="me-2 fs-3" />
                    <Button size="lg" variant="tertiary" href={`#${pathname}/${a._id}`}><LuNotebookPen /></Button>
                  </Col>
                  <Col xs={8}><h3>{a.title}</h3></Col>
                  <Col xs={2}><AssgnControlButtons /></Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
);}
