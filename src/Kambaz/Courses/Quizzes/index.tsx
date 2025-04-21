import { Col, ListGroup, Row } from "react-bootstrap";
import { Quiz } from "../../types";
import { BsCaretDownFill } from "react-icons/bs";
import { RxRocket } from "react-icons/rx";
import * as quizClient from "./client";
import { useSelector } from "react-redux";
import QuizControls from "./QuizControls";
import QuizControlButtons from "./QuizControlButtons";
import { useLocation, useNavigate } from "react-router";

export default function Quizzes({ quizzes, setQuizzes }: { quizzes: Quiz[], setQuizzes: (quizzes: Quiz[]) => void }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const availibility = (quiz: Quiz) => {
    const today = new Date().getTime();
    if (new Date(quiz.availableDate).getTime() <= today) {
      if (today >= new Date(quiz.untilDate).getTime()) {
        return 'Closed';
      }
      return 'Available';
    }
    return `Not available until ${new Date(quiz.availableDate).toDateString()}`;
  };

  const getNumberOfQuestions = async (qid: string): Promise<Number> => {
    const questions = await quizClient.findQuestionsForQuiz(qid);
    return questions.length;
  };
  const getRecentScore = async (qid: string): Promise<Number> => {
    const score = await quizClient.findMostRecentScore(qid, currentUser._id);
    return score;
  };
  const deleteQuiz = async (qid: string): Promise<void> => {
    await quizClient.deleteQuiz(qid);
  };
  const handlePublish = async (quiz: Quiz): Promise<void> => {
    try {
      const updatedQuiz = {...quiz, published: !quiz.published};
      await quizClient.updateQuiz(updatedQuiz);
      setQuizzes(quizzes.map((q) => {
        if (q._id === updatedQuiz._id) return updatedQuiz;
        return q;
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Col>
      <QuizControls />
      <hr />
      {quizzes
      ? <ListGroup className="rounded-0" id="wd-quizzes">
          <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsCaretDownFill className="me-2 fs-3" />
              QUIZZES
            </div>
            <ListGroup className="wd-lessons rounded-0">
              {quizzes.map((q: Quiz) => (
                <ListGroup.Item className="wd-lesson p-3 ps-1" key={q._id}>
                  <Row className="align-items-center">
                    <Col xs={1} className="align-items-center">
                      <RxRocket className="me-2 fs-3" />
                    </Col>
                    <Col xs={10}>
                      <Row><h4 onClick={() => navigate(`${pathname}/${q._id}`)}>{q.title}</h4></Row>
                      <Row><p>
                        {`${availibility(q)}`}
                        {` | Due ${new Date(q.dueDate).toDateString()}`}
                        {` | ${q.points} pts`}
                        {` | ${getNumberOfQuestions(q._id!)} Questions`}
                        {currentUser.role === "STUDENT" && q.completed ? ` | ${getRecentScore(q._id!)}/${q.points} pts` : ''}</p></Row>
                    </Col>
                    <Col xs={1} className="align-items-center">
                      <QuizControlButtons quiz={q} deleteQuiz={deleteQuiz} handlePublish={handlePublish}/>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </ListGroup.Item>
        </ListGroup>
      : <div>{'No quizzes found. Please press "+ Quiz" to create a quiz.'}</div>}
    </Col>
  );
}