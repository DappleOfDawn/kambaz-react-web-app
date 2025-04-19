import { Button, Card, Col, Form, Row } from "react-bootstrap";
import "../../styles.css"
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import * as courseClient from "../client";

export default function AssignmentEditor({
  assignment,
  setAssignment,
  assignments,
  setAssignments,
}: {
  assignment: any,
  setAssignment: (assignment: any) => void,
  assignments: any[],
  setAssignments: (assignments: any[]) => void,
}) {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const unsavedAssignment = assignment;

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
  };

  const saveAssignment = async () => {
    if (aid === 'newAssignment') {
      await addNewAssignment();
    } else {
      await updateAssignment();
    }
    navigate(-1);
  }

  const cancelAssignment = () => {
    setAssignment(unsavedAssignment);
    navigate(-1);
  }

  useEffect(() => {
    const findAssignmentById = async (assignmentId: string) => {
      try {
        const assignmentById = await courseClient.findAssignmentById(cid!, assignmentId);
        setAssignment(assignmentById);
      } catch (error) {
        console.error(error);
      }
    };

    if (aid !== 'newAssignment') {
      findAssignmentById(aid!);
    } else {
      setAssignment({ title: 'New Assignment' });
    }
  }, [aid, cid, setAssignment]);

  return (
    <div id="wd-assignments-editor">
      {assignment && aid ?
        <Form>
          <Form.Group as={Col} className="m-3">
            <Row><Form.Label htmlFor="wd-name">
              Assignment Name
            </Form.Label></Row>
            <Row className="mb-3">
              <Form.Control
                defaultValue={assignment.title}
                placeholder={'Assignment Title'}
                onChange={(e) => setAssignment({...assignment, title: e.target.value})}/>
            </Row>
            <Row className="mb-4">
              <Form.Control
                defaultValue={assignment.description}
                placeholder={'Assignment Description'}
                as="textarea"
                onChange={(e) => setAssignment({...assignment, description: e.target.value})}/>
            </Row>
          </Form.Group>
          <Form.Group as={Row} className="m-3">
            <Form.Label column sm={4} align="right" className="wd-assgn-editor-fl">
              Points
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                defaultValue={assignment.points}
                onChange={(e) => setAssignment({...assignment, points: Number(e.target.value)})}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-3">
            <Form.Label column sm={4} align="right" className="wd-assgn-editor-fl">
              Assign
            </Form.Label>
            <Col sm={8}>
              <Card>
                <Col className="m-3">
                  <Form.Label>Assign To</Form.Label>
                  <Form.Control
                    type="date"
                    className="mb-3"
                    defaultValue={assignment.dueDate}
                    onChange={(e) => setAssignment({...assignment, dueDate: e.target.value})}/>
                  <Row>
                    <Col>
                      <Form.Label>Available From</Form.Label>
                      <Form.Control
                        type="date"
                        defaultValue={assignment.availableDate}
                        onChange={(e) => setAssignment({...assignment, availableDate: e.target.value})}/>
                    </Col>
                    <Col>
                      <Form.Label>Until</Form.Label>
                      <Form.Control
                        type="date"
                        defaultValue={assignment.untilDate}
                        onChange={(e) => setAssignment({...assignment, untilDate: e.target.value})}/>
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
