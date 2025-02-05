import { Button, Card, Col, Form, Row } from "react-bootstrap";
import "../../styles.css"

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <Form>
        <Form.Group as={Col} className="m-3">
          <Form.Label row htmlFor="wd-name">
            Assignment Name
          </Form.Label>
          <Row className="mb-3"><Form.Control /></Row>
          <Row className="mb-4"><Form.Control as="textarea" /></Row>
        </Form.Group>
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right" className="wd-assgn-editor-fl">
            Points
          </Form.Label>
          <Col sm={8}><Form.Control /></Col>
        </Form.Group>
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right" className="wd-assgn-editor-fl">
            Assignment Group
          </Form.Label>
          <Col sm={8}>
            <Form.Select>
              <option selected>Assignements</option>
              <option>Quizzes</option>
              <option>Exams</option>
              <option>Projects</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right" className="wd-assgn-editor-fl">
            Display Grade as
          </Form.Label>
          <Col sm={8}>
            <Form.Select>
              <option selected>Percentage</option>
              <option>Letter</option>
              <option>Points</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right" className="wd-assgn-editor-fl">
            Submission Type
          </Form.Label>
          <Col sm={8}>
            <Card>
              <Col className="m-3">
                <Form.Select className="mb-3">
                  <option selected>Online</option>
                </Form.Select>
                <Form.Label>Online Entry Options</Form.Label>
                <Form.Check type="checkbox" label="Text Entry" />
                <Form.Check type="checkbox" label="Website URL" />
                <Form.Check type="checkbox" label="Media Recordings" />
                <Form.Check type="checkbox" label="Student Annotation" />
                <Form.Check type="checkbox" label="File Uploads" />
              </Col>
            </Card>
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
                <Form.Select multiple className="mb-3">
                  <option selected>Everyone</option>
                  <option>Just That Guy</option>
                  <option>Also The Other Guy</option>
                </Form.Select>
                <Form.Label>Assign To</Form.Label>
                <Form.Control type="date" className="mb-3" />
                <Row>
                  <Col>
                    <Form.Label>Available From</Form.Label>
                    <Form.Control type="date" />
                  </Col>
                  <Col>
                    <Form.Label>Until</Form.Label>
                    <Form.Control type="date" />
                  </Col>
                </Row>
              </Col>
            </Card>
          </Col>
        </Form.Group>
        <hr />
        <Form.Group className="wd-assgn-editor-fg float-end">
          <Button variant="secondary" size="lg" className="me-1">Cancel</Button>
          <Button variant="danger" size="lg" className="ms-1">Save</Button>
        </Form.Group>
      </Form>
    </div>
);}
