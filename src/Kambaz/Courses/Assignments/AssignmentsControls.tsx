import { Button, Col, FormControl, InputGroup, Row } from "react-bootstrap";
import { BsPlus, BsSearch } from "react-icons/bs";
import "../../styles.css"

export default function AssignmentsControls() {
  return (
    <Row id="wd-assignments-controls" className="text-nowrap">
      <Col>
        <InputGroup id="wd-search-assignment" size="lg">
          <Button variant="secondary"><BsSearch /></Button>
          <FormControl placeholder="Search for Assignments" />
        </InputGroup>
      </Col>
      <Col className="float-end me-2">
        <Button id="wd-add-assignment-group" size="lg" variant="secondary" className="wd-assgn-control-button">
          <BsPlus className="position-relative fs-2" />
          Group
        </Button>
        <Button id="wd-add-assignment" size="lg" variant="danger" className="wd-assgn-control-button">
          <BsPlus className="position-relative fs-2" />
          Assignment
        </Button>
      </Col>
    </Row>
);}