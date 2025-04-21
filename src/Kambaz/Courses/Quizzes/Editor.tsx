import { useEffect, useState } from "react";
import { AssignmentGroup, Question, QuestionType, Quiz, QuizType, ShowCorrectAnswersOptions } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import * as quizClient from "./client";
import { Button, Col, Form, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function QuizEditor({
  quiz,
  setQuiz,
  quizzes,
  setQuizzes,
}: {
  quiz: Quiz,
  setQuiz: (quiz: Quiz) => void,
  quizzes: Quiz[],
  setQuizzes: (quizzes: Quiz[]) => void,
}) {
  const { qid } = useParams();
  const navigate = useNavigate();
  const unsavedQuiz = quiz;
  const [onDetailsPage, setOnDetailsPage] = useState<boolean>(true);
  const [editingQuestion, setEditingQuestion] = useState<Question>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const defaultQuestion = {
    title: 'New Question',
    quiz: qid!,
    questionText: '',
    questionType: 'MULTIPLE CHOICE',
    points: 0,
    answers: [],
    correctAnswers: [],
  } as Question;
  const [question, setQuestion] = useState<Question>(defaultQuestion);
  const [unsavedQuestion, setUnsavedQuestion] = useState<Question>(defaultQuestion);

  // quiz CRUD
  const cancelQuiz = () => {
    setQuiz(unsavedQuiz);
    navigate(-1);
  };
  const addNewQuiz = async () => {
    try {
      const newQuiz = await quizClient.createQuiz(quiz);
      setQuiz(newQuiz);
      setQuizzes([...quizzes, newQuiz]);
    } catch (error) {
      console.error(error);
    }
  };
  const updateQuiz = async () => {
    try {
      await quizClient.updateQuiz(quiz);
      setQuizzes(quizzes.map((q: Quiz) => {
        if (q._id === quiz._id) { return quiz; }
        else { return q; }
      }));
    } catch (error) {
      console.error(error);
    }
  };
  const saveQuiz = async () => {
    if (qid === 'newQuiz') {
      await addNewQuiz();
    } else {
      await updateQuiz();
    }
    navigate(-1);
  };
  const saveAndPublish = async () => {
    setQuiz({...quiz, published: true});
    await saveQuiz();
  };

  const openQuestion = (question: Question) => {
    setQuestion(question);
    setEditingQuestion(question);
    setUnsavedQuestion(question);
  };
  const cancelQuestion = () => {
    setQuestion(unsavedQuestion);
    setEditingQuestion(undefined);
  };
  const saveQuestion = () => {
    setQuestions([...questions, question]);
    setEditingQuestion(undefined);
  };

  const formatDate = (date: Date) => {
    const splitDate = date.toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/');
    return `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`;
  };

  useEffect(() => {
    const findQuizById = async () => {
      const foundQuiz = await quizClient.findQuizById(qid!);
      if (foundQuiz) setQuiz(foundQuiz);
    };
    const findQuestionsForQuiz = async () => {
      const questionsForQuiz = await quizClient.findQuestionsForQuiz(qid!);
      if (questionsForQuiz) setQuestions(questionsForQuiz);
    };

    if (qid !== 'newQuiz') {
      findQuizById();
      findQuestionsForQuiz();
    }
  }, [qid]);

  return (
    <div>
      <Button variant={onDetailsPage ? 'danger' : 'secondary'} onClick={() => setOnDetailsPage(true)} className="me-2">
        Details
      </Button>
      <Button variant={!onDetailsPage ? 'danger' : 'secondary'} onClick={() => setOnDetailsPage(false)}  className="me-2">
        Questions
      </Button>
      <hr />
      {onDetailsPage
      ? <Form>
        <Form.Group as={Col} className="m-3">
          <Row><Form.Label>Quiz Name</Form.Label></Row>
          <Row className="mb-3">
            <Form.Control
              defaultValue={quiz.title}
              placeholder="Quiz Title"
              onChange={(e) => setQuiz({...quiz, title: e.target.value})}/>
          </Row>
          <Row className="mb-4">
            <Form.Control
              defaultValue={quiz.description}
              placeholder="Quiz Description"
              as="textarea"
              onChange={(e) => setQuiz({...quiz, description: e.target.value})}/>
          </Row>
        </Form.Group>
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right">Quiz Type</Form.Label>
          <Col sm={8}><Form.Select
            defaultValue={quiz.quizType}
            onChange={(e) => setQuiz({...quiz, quizType: (e.target.value as QuizType)})}>
              <option value={"GRADED QUIZ"}>GRADED QUIZ</option>
              <option value={"PRACTICE QUIZ"}>PRACTICE QUIZ</option>
              <option value={"GRADED SURVEY"}>GRADED SURVEY</option>
              <option value={"UNGRADED SURVEY"}>UNGRADED SURVEY</option>
          </Form.Select></Col>
        </Form.Group>
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right">Points</Form.Label>
          <Col sm={8}><Form.Control
            defaultValue={quiz.points}
            onChange={(e) => setQuiz({...quiz, points: Number(e.target.value)})}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right">Assignment Group</Form.Label>
          <Col sm={8}><Form.Select
            defaultValue={quiz.assignmentGroup}
            onChange={(e) => setQuiz({...quiz, assignmentGroup: (e.target.value as AssignmentGroup)})}>
              <option value={"QUIZZES"}>QUIZZES</option>
              <option value={"EXAMS"}>EXAMS</option>
              <option value={"ASSIGNMENTS"}>ASSIGNMENTS</option>
              <option value={"PROJECT"}>PROJECT</option>
          </Form.Select></Col>
        </Form.Group>
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right">Shuffle Answers</Form.Label>
          <Col sm={8}><Form.Check
            checked={quiz.shuffleAnswers}
            onChange={() => setQuiz({...quiz, shuffleAnswers: !quiz.shuffleAnswers})}/></Col>
        </Form.Group>
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right">{'Time Limit (minutes)'}</Form.Label>
          <Col sm={8}><Form.Control
            defaultValue={quiz.timeLimit}
            onChange={(e) => setQuiz({...quiz, timeLimit: Number(e.target.value)})}/></Col>
        </Form.Group>
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right">Allow Multiple Attempts</Form.Label>
          <Col sm={8}><Form.Check
            checked={quiz.multipleAttempts}
            onChange={() => setQuiz({...quiz, multipleAttempts: !quiz.multipleAttempts})}/></Col>
        </Form.Group>
        {quiz.multipleAttempts &&
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right">Number Of Attempts</Form.Label>
          <Col sm={8}><Form.Control
            defaultValue={quiz.numberOfAttempts}
            onChange={(e) => setQuiz({...quiz, numberOfAttempts: Number(e.target.value)})}/></Col>
        </Form.Group>}
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right">Show Correct Answers</Form.Label>
          <Col sm={8}><Form.Select
            defaultValue={quiz.showCorrectAnswers}
            onChange={(e) => setQuiz({...quiz, showCorrectAnswers: (e.target.value as ShowCorrectAnswersOptions)})}>
              <option value={"Immediately"}>Immediately</option>
              <option value={"No"}>No</option>
              <option value={"After Due Date"}>After Due Date</option>
          </Form.Select></Col>
        </Form.Group>
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right">Access Code</Form.Label>
          <Col sm={8}><Form.Control
            defaultValue={quiz.accessCode}
            onChange={(e) => setQuiz({...quiz, accessCode: e.target.value})}/></Col>
        </Form.Group>
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right">One Question at a Time</Form.Label>
          <Col sm={8}><Form.Check
            checked={quiz.oneQuestionAtATime}
            onChange={() => setQuiz({...quiz, oneQuestionAtATime: !quiz.oneQuestionAtATime})}/></Col>
        </Form.Group>
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right">Webcam Required</Form.Label>
          <Col sm={8}><Form.Check
            checked={quiz.webcamRequired}
            onChange={() => setQuiz({...quiz, webcamRequired: !quiz.webcamRequired})}/></Col>
        </Form.Group>
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right">Lock Questions After Answering</Form.Label>
          <Col sm={8}><Form.Check
            checked={quiz.lockQuestionsAfterAnswering}
            onChange={() => setQuiz({...quiz, lockQuestionsAfterAnswering: !quiz.lockQuestionsAfterAnswering})}/></Col>
        </Form.Group>
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right">Due Date</Form.Label>
          <Col sm={8}><Form.Control
            type="date"
            defaultValue={formatDate(new Date(quiz.dueDate))}
            onChange={(e) => setQuiz({...quiz, dueDate: new Date(e.target.value)})}/></Col>
        </Form.Group>
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right">Available From Date</Form.Label>
          <Col sm={8}><Form.Control
            type="date"
            defaultValue={formatDate(new Date(quiz.availableDate))}
            onChange={(e) => setQuiz({...quiz, availableDate: new Date(e.target.value)})}/></Col>
        </Form.Group>
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right">Available Until Date</Form.Label>
          <Col sm={8}><Form.Control
            type="date"
            defaultValue={formatDate(new Date(quiz.untilDate))}
            onChange={(e) => setQuiz({...quiz, untilDate: new Date(e.target.value)})}/></Col>
        </Form.Group>
      </Form>
      : <Form>
        <ListGroup>
          {questions.map((question) => (
            <ListGroupItem>
              {question.title}
            </ListGroupItem>
          ))}
        </ListGroup>
        <Modal show={editingQuestion ? true : false}>
          <ModalHeader>
            <Form.Group>
              <Form.Control
                defaultValue={question.title}
                onChange={(e) => setQuestion({...question, title: e.target.value})} />
              <Form.Select
                defaultValue={question.questionType}
                onChange={(e) => {
                  setQuestion({...question, questionType: (e.target.value as QuestionType)});
                  if (question.questionType === "TRUE FALSE") {
                    setQuestion({...question, answers: ['True', 'False'], correctAnswers: ['True']});
                  }
                }}>
                <option value={"MULTIPLE CHOICE"}>MULTIPLE CHOICE</option>
                <option value={"TRUE FALSE"}>TRUE FALSE</option>
                <option value={"FILL IN THE BLANK"}>FILL IN THE BLANK</option>
              </Form.Select>
              <div className="float-end">pts:<Form.Control
                defaultValue={question.points}
                onChange={(e) => setQuestion({...question, points: Number(e.target.value)})}/></div>
            </Form.Group>
          </ModalHeader>
          <ModalBody>
            <Form.Group as={Col}>
              Question:
              <Form.Control
                defaultValue={question.questionText}
                onChange={(e) => setQuestion({...question, questionText: e.target.value})}/>
              Answers:
              {question.answers.map((a: string, index: number) => (
                <Row>
                  <Col xs={4}>
                    <Form.Check
                      checked={question.correctAnswers.length > 0 && question.correctAnswers[0] === a}
                      onChange={() => {
                        if (question.correctAnswers[0] === a) { setQuestion({...question, correctAnswers: []}); }
                        else { setQuestion({...question, correctAnswers: [a]}); }
                      }}/>
                  </Col>
                  <Col xs={7}>
                    <Form.Control
                      defaultValue={a}
                      onChange={(e) => {
                        const answers = question.answers;
                        answers.splice(index, 1, e.target.value);
                        setQuestion({...question, answers: answers});
                      }}/>
                  </Col>
                  <Col xs={1}>
                    <Button variant="danger" onClick={() => setQuestion({...question,
                      answers: question.answers.filter((answer) => answer === a),
                      correctAnswers: question.correctAnswers.filter((answer) => answer === a),
                    })}>Delete</Button>
                  </Col>
                </Row>
              ))}
            </Form.Group>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => cancelQuestion()}>Cancel</Button>
            <Button variant="danger" onClick={() => saveQuestion()}>Save</Button>
          </ModalFooter>
        </Modal>
        <Form.Group as={Col}>
          <Button variant="secondary" size="lg" onClick={() => openQuestion(defaultQuestion)}>
            <FaPlus /> New Question
          </Button>
        </Form.Group>
      </Form>}
      <hr />
      <Form>
        <Form.Group className="float-end">
          <Button
            variant="secondary"
            size="lg"
            className="me-1"
            onClick={() => cancelQuiz()}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="me-1"
            onClick={() => saveQuiz()}>
            Save
          </Button>
          <Button
            variant="danger"
            size="lg"
            className="me-1"
            onClick={() => saveAndPublish()}>
            Save & Publish
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}