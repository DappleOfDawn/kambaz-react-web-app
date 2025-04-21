import { useLocation, useNavigate, useParams } from "react-router";
import { Quiz } from "../../types";
import { useEffect } from "react";
import * as quizClient from "./client";
import { Button, Col, Row } from "react-bootstrap";

export default function QuizDetails({ quiz, setQuiz }: { quiz: Quiz, setQuiz: (quiz: Quiz) => void }) {
  const { qid } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const boolToYesNo = (bool?: boolean) => bool ? 'Yes' : 'No';

  const infoRow = (label: string, value: any) => {
    return (
      <Row>
        <Col sm={4} align="right"><b>{label}</b></Col>
        <Col sm={8} align="left">{value}</Col>
      </Row>
    );
  };

  useEffect(() => {
    const findQuizById = async () => {
      const foundQuiz = await quizClient.findQuizById(qid!);
      if (foundQuiz) setQuiz(foundQuiz);
    }

    if (qid !== 'newQuiz') {
      findQuizById();
    } else {
      navigate(`${pathname}/editing`);
    }
  }, [qid]);

  return (quiz &&
    <Col>
      <Row>
        <h2>{quiz.title}
        <Button variant="danger" className="float-end" onClick={() => navigate(`${pathname}/editing`)}>
          Edit
          </Button>
        </h2>
      </Row>
      {infoRow('Quiz Type', quiz.quizType)}
      {infoRow('Points', quiz.points)}
      {infoRow('Assignment Group', quiz.assignmentGroup)}
      {infoRow('Shuffle Answers', boolToYesNo(quiz.shuffleAnswers))}
      {infoRow('Time Limit', quiz.timeLimit)}
      {infoRow('Multiple Attempts', boolToYesNo(quiz.multipleAttempts))}
      {quiz.multipleAttempts && infoRow('Number Of Attempts', quiz.numberOfAttempts)}
      {infoRow('Show Correct Answers', quiz.showCorrectAnswers)}
      {infoRow('Access Code', quiz.accessCode)}
      {infoRow('One Question at a Time', boolToYesNo(quiz.oneQuestionAtATime))}
      {infoRow('Webcam Required', boolToYesNo(quiz.webcamRequired))}
      {infoRow('Lock Questions After Answering', boolToYesNo(quiz.lockQuestionsAfterAnswering))}
      <br />
      <Row>
        <Col sm={4} align="left"><b>Due</b></Col>
        <Col sm={4} align="left"><b>Available From</b></Col>
        <Col sm={4} align="left"><b>Until</b></Col>
      </Row>
      <hr />
      <Row>
        <Col sm={4} align="left">{new Date(quiz.dueDate).toDateString()}</Col>
        <Col sm={4} align="left">{new Date(quiz.availableDate).toDateString()}</Col>
        <Col sm={4} align="left">{new Date(quiz.untilDate).toDateString()}</Col>
      </Row>
      <hr />
    </Col>
  );
}