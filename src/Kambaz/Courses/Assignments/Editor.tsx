import { Button, Card, Col, Form, Row } from "react-bootstrap";
import "../../styles.css"
import { useLocation, useNavigate, useParams } from "react-router";
// import * as db from "../../Database";
import { addAssignment, updateAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const [assignment, setAssignment] = useState<any>(aid !== 'newAssignment' ? assignments.find(a => a.course === cid && a._id === aid) : {
    _id: "newAssignment",
    title: "New Assignment",
    course: cid,
    description: "New Assignment Description",
    points: 100,
    dueDate: new Date().toDateString(),
    anvailableDate: new Date().toDateString(),
    untilDate: new Date().toDateString(),
  });
  const unsavedAssignment = assignment;

  const saveAssignment = () => {
    if (aid === 'newAssignment') {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment(assignment));
    }
    navigate(-1);
  }

  const cancelAssignment = () => {
    setAssignment(unsavedAssignment);
    navigate(-1);
  }

  return (
    <div id="wd-assignments-editor">
      {assignment && aid ?
        <Form>
          <Form.Group as={Col} className="m-3">
            <Row><Form.Label htmlFor="wd-name">
              Assignment Name
            </Form.Label></Row>
            <Row className="mb-3"><Form.Control defaultValue={assignment.title} onChange={(e) => setAssignment({...assignment, title: e.target.value})}/></Row>
            <Row className="mb-4"><Form.Control defaultValue={assignment.description} as="textarea" onChange={(e) => setAssignment({...assignment, description: e.target.value})}/></Row>
          </Form.Group>
          <Form.Group as={Row} className="m-3">
            <Form.Label column sm={4} align="right" className="wd-assgn-editor-fl">
              Points
            </Form.Label>
            <Col sm={8}><Form.Control defaultValue={assignment.points} onChange={(e) => setAssignment({...assignment, points: Number(e.target.value)})}/></Col>
          </Form.Group>
          <Form.Group as={Row} className="m-3">
            <Form.Label column sm={4} align="right" className="wd-assgn-editor-fl">
              Assign
            </Form.Label>
            <Col sm={8}>
              <Card>
                <Col className="m-3">
                  <Form.Label>Assign To</Form.Label>
                  <Form.Control type="date" className="mb-3" defaultValue={assignment.dueDate} onChange={(e) => setAssignment({...assignment, dueDate: e.target.value})}/>
                  <Row>
                    <Col>
                      <Form.Label>Available From</Form.Label>
                      <Form.Control type="date" defaultValue={assignment.availableDate} onChange={(e) => setAssignment({...assignment, availableDate: e.target.value})}/>
                    </Col>
                    <Col>
                      <Form.Label>Until</Form.Label>
                      <Form.Control type="date" defaultValue={assignment.untilDate} onChange={(e) => setAssignment({...assignment, untilDate: e.target.value})}/>
                    </Col>
                  </Row>
                </Col>
              </Card>
            </Col>
          </Form.Group>
          <hr />
          <Form.Group className="wd-assgn-editor-fg float-end">
            <Button variant="secondary" size="lg" className="me-1" onClick={() => cancelAssignment()}>
              Cancel</Button>
            <Button variant="danger" size="lg" className="ms-1" onClick={() => saveAssignment()}>
              Save</Button>
          </Form.Group>
        </Form>
      : <div>404: Assignment not found</div>}
    </div>
);}
