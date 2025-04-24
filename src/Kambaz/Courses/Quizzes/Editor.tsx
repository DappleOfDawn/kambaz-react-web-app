import { useEffect, useState } from "react";
import { Answer, AssignmentGroup, Question, QuestionType, Quiz, QuizType, ShowCorrectAnswersOptions } from "../../types";
import { useLocation, useNavigate, useParams } from "react-router";
import * as quizClient from "./client";
import { Button, Col, Form, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

export default function QuizEditor({
  quiz,
  setQuiz,
  quizzes,
  setQuizzes,
  defaultQuiz,
}: {
  quiz: Quiz,
  setQuiz: (quiz: Quiz) => void,
  quizzes: Quiz[],
  setQuizzes: (quizzes: Quiz[]) => void,
  defaultQuiz: Quiz,
}) {
  const { qid } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const unsavedQuiz = quiz;
  const [onDetailsPage, setOnDetailsPage] = useState<boolean>(true);
  const [editingQuestion, setEditingQuestion] = useState<boolean>();
  const defaultQuestion = {
    _id: '',
    title: 'New Question',
    questionText: '',
    questionType: 'MULTIPLE CHOICE',
    points: 0,
    answers: [],
  } as Question;
  const [question, setQuestion] = useState<Question>(defaultQuestion);
  const [unsavedQuestion, setUnsavedQuestion] = useState<Question>(defaultQuestion);
  const [newQuestion, setNewQuestion] = useState<boolean>(true);

  // utility
  const formatDate = (date: Date) => {
    const splitDate = date.toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/');
    return `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`;
  };
  const backToQuizzes = () => {
    const pathArray = pathname.split('/');
    const quizzesIndex = pathArray.indexOf('Quizzes');
    return pathArray.slice(0, quizzesIndex+1).join('/');
  };

  // quiz CRUD
  const cancelQuiz = () => {
    setQuiz(unsavedQuiz);
    setQuestion(defaultQuestion);
    navigate(backToQuizzes());
  };
  const addNewQuiz = async (quizToAdd: Quiz) => {
    try {
      const newQuiz = await quizClient.createQuiz(quizToAdd);
      setQuiz(newQuiz);
      setQuizzes([...quizzes, newQuiz]);
    } catch (error) {
      console.error(error);
    }
  };
  const updateQuiz = async (quizToUpdate: Quiz) => {
    try {
      const updatedQuiz = await quizClient.updateQuiz(quizToUpdate);
      setQuiz(updatedQuiz)
      setQuizzes(quizzes.map((q: Quiz) => {
        if (q._id === updatedQuiz._id) { return updatedQuiz; }
        else { return q; }
      }));
    } catch (error) {
      console.error(error);
    }
  };
  const saveQuiz = async (publish: boolean) => {
    const updatedQuiz = {...quiz, published: publish ? true : quiz.published};
    if (qid === 'newQuiz') {
      await addNewQuiz(updatedQuiz);
    } else {
      await updateQuiz(updatedQuiz);
    }
    navigate(backToQuizzes());
  };

  // questions
  const openQuestion = (question: Question, newQuestion: boolean) => {
    const newId = uuidv4();
    setNewQuestion(newQuestion);
    setQuestion(newQuestion ? {...question, _id: newId} : question);
    setEditingQuestion(true);
    setUnsavedQuestion(newQuestion ? {...question, _id: newId} : question);
  };
  const cancelQuestion = () => {
    setQuestion(unsavedQuestion);
    setEditingQuestion(false);
  };
  const saveQuestion = () => {
    if (newQuestion) {
      setQuiz({...quiz, questions: [...quiz.questions, question]});
    } else {
      setQuiz({...quiz, questions: quiz.questions.map((q: Question) => {
        if (q._id === question._id) { return question; }
        else { return q; }
      })});
    }
    setEditingQuestion(undefined);
  };
  const deleteQuestion = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, question: Question) => {
    setQuiz({...quiz, questions: quiz.questions.filter((q: Question) => q._id !== question._id)});
    event.preventDefault();
  };
  const addAnswer = () => {
    setQuestion({...question, answers: [...question.answers, {
      _id: uuidv4(),
      question: question._id,
      answer: '',
      correct: false,
    }]});
  };
  const deleteAnswer = (answerId: string) => {
    setQuestion({...question, answers: question.answers.filter((a: Answer) => a._id !== answerId)});
  };
  const updateAnswerText = (answerId: string, answerText: string) => {
    setQuestion({...question, answers: question.answers.map((a: Answer) => {
      if (a._id === answerId) return {...a, answer: answerText};
      return a;
    })});
  };
  const toggleAnswerCorrect = (answer: Answer, questionType: QuestionType) => {
    setQuestion({...question, answers: question.answers.map((a: Answer) => {
      if (a._id === answer._id) return {...a, correct: !answer.correct};
      if (questionType !== "FILL IN THE BLANK" && a._id !== answer._id) return {...a, correct: false};
      return a;
    })});
  };


  useEffect(() => {
    const findQuizById = async () => {
      const foundQuiz = await quizClient.findQuizById(qid!);
      if (foundQuiz) {
        setQuiz(foundQuiz);
      }
    };

    if (qid !== 'newQuiz') {
      findQuizById();
    } else {
      setQuiz(defaultQuiz);
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
            onChange={(e) => setQuiz({...quiz, dueDate: new Date(`${e.target.value}T00:00:00`)})}/></Col>
        </Form.Group>
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right">Available From Date</Form.Label>
          <Col sm={8}><Form.Control
            type="date"
            defaultValue={formatDate(new Date(quiz.availableDate))}
            onChange={(e) => setQuiz({...quiz, availableDate: new Date(`${e.target.value}T00:00:00`)})}/></Col>
        </Form.Group>
        <Form.Group as={Row} className="m-3">
          <Form.Label column sm={4} align="right">Available Until Date</Form.Label>
          <Col sm={8}><Form.Control
            type="date"
            defaultValue={formatDate(new Date(quiz.untilDate))}
            onChange={(e) => setQuiz({...quiz, untilDate: new Date(`${e.target.value}T00:00:00`)})}/></Col>
        </Form.Group>
      </Form>
      : <Form>
        <ListGroup>
          {quiz.questions.map((question) => (
            <ListGroupItem key={question._id} onClick={() => openQuestion(question, false)}>
              {question.title}
              <Button variant="danger" className="float-end" onClick={(e) => deleteQuestion(e, question)}>Delete</Button>
            </ListGroupItem>
          ))}
        </ListGroup>
        <Modal show={editingQuestion ? true : false}>
          <ModalHeader>
            <Form.Group as={Row}>
              <Col><Form.Control
                defaultValue={question.title}
                onChange={(e) => setQuestion({...question, title: e.target.value})} /></Col>
              <Col><Form.Select
                defaultValue={question.questionType}
                onChange={(e) => setQuestion({...question, questionType: (e.target.value as QuestionType), answers: []})}>
                <option value={"MULTIPLE CHOICE"}>MULTIPLE CHOICE</option>
                <option value={"TRUE FALSE"}>TRUE FALSE</option>
                <option value={"FILL IN THE BLANK"}>FILL IN THE BLANK</option>
              </Form.Select></Col>
              <Col><Row><Col><Form.Label>Points:</Form.Label></Col>
              <Col><Form.Control
                defaultValue={question.points}
                onChange={(e) => setQuestion({...question, points: Number(e.target.value)})}/></Col></Row></Col>
            </Form.Group>
          </ModalHeader>
          <ModalBody>
            <Form.Group as={Col}>
              Question:
              <Form.Control
                defaultValue={question.questionText}
                onChange={(e) => setQuestion({...question, questionText: e.target.value})}/>
              Answers:
              {question.answers.map((a: Answer) => (
                <Row key={a._id}>
                  <Col xs={1}>
                    <Form.Check
                      checked={a.correct}
                      onChange={() => toggleAnswerCorrect(a, question.questionType)}/>
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      defaultValue={a.answer}
                      onChange={(e) => updateAnswerText(a._id, e.target.value)}/>
                  </Col>
                  <Col xs={1}>
                    <Button variant="danger" onClick={() => deleteAnswer(a._id)}>Delete</Button>
                  </Col>
                </Row>
              ))}
              <br />
              <Button variant="secondary" onClick={() => addAnswer()}>
                <FaPlus /> Answer
              </Button>
            </Form.Group>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => cancelQuestion()}>Cancel</Button>
            <Button variant="danger" onClick={() => saveQuestion()}>Save</Button>
          </ModalFooter>
        </Modal>
        <br />
        <Form.Group as={Col}>
          <Button variant="secondary" size="lg" onClick={() => openQuestion(defaultQuestion, true)}>
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
            onClick={() => saveQuiz(false)}>
            Save
          </Button>
          <Button
            variant="danger"
            size="lg"
            className="me-1"
            onClick={() => saveQuiz(true)}>
            Save & Publish
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}