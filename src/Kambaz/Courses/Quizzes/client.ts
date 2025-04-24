import axios from "axios";
import { Quiz } from "../../types";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const findQuizById = async (id: string): Promise<Quiz> => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${id}`);
  return data;
};
export const createQuiz = async (quiz: Quiz): Promise<Quiz> => {
  const { data } = await axiosWithCredentials.post(QUIZZES_API, quiz);
  return data;
 }; 
export const deleteQuiz = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${QUIZZES_API}/${id}`);
  return data;
};
export const updateQuiz = async (quiz: Quiz): Promise<Quiz> => {
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
};