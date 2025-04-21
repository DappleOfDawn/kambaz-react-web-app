import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";

export default function QuizControls() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Button
      variant="danger"
      onClick={() => navigate(`${pathname}/newQuiz`)}>
      <FaPlus /> Quiz
    </Button>
  );
}