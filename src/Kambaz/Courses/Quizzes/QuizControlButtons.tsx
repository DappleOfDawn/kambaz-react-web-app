import { Button, Col, Modal, Row } from "react-bootstrap";
import { Quiz } from "../../types";
import { FaBan, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router";

export default function QuizControlButtons({ quiz, deleteQuiz, handlePublish }: { quiz: Quiz, deleteQuiz: (quizId: string) => Promise<void>, handlePublish: (quiz: Quiz) => Promise<void> }) {
  const [showContext, setShowContext] = useState<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Row>
      <Col>
        {quiz.published
        ? <FaCheckCircle className="text-success" />
        : <FaBan className="text-danger" />}
      </Col>
      <Col>
        <Button onClick={() => setShowContext(!showContext)}><IoEllipsisVertical /></Button>
      </Col>
      <Modal show={showContext}>
        <Modal.Body>
          <Row>
            <Col>
              {quiz.published
              ? <Button variant="warning" onClick={() => {
                handlePublish(quiz);
                setShowContext(false);
              }}>Unpublish</Button>
              : <Button variant="primary" onClick={() => {
                handlePublish(quiz);
                setShowContext(false);
              }}>Publish</Button>}
            </Col>
            <Col>
              <Button variant="success" onClick={() => {
                setShowContext(false);
                navigate(`${pathname}/${quiz._id}/editing`);
              }}>Edit</Button>
            </Col>
            <Col>
              <Button variant="danger" onClick={async () => {
                setShowContext(false);
                await deleteQuiz(quiz._id!);
              }}>Delete</Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Row>
  );
}