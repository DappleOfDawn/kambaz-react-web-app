import axios from "axios";
import { Assignment, Course, Module, Quiz, User } from "../types";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchAllCourses = async (): Promise<Course[]> => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};
export const createCourse = async (course: Course): Promise<Course> => {
  const { data } = await axiosWithCredentials.post(COURSES_API, course);
  return data;
 }; 
export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};
export const updateCourse = async (course: Course): Promise<Course> => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};
export const findModulesForCourse = async (courseId: string): Promise<Module[]> => {
  const response = await axiosWithCredentials
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};
export const createModuleForCourse = async (courseId: string, module: Module): Promise<Module> => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};
export const findUsersForCourse = async (courseId: string): Promise<User[]> => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
};
export const findAssignmentsForCourse = async (courseId: string): Promise<Assignment[]> => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};
export const findAssignmentById = async (courseId: string, assignmentId: string): Promise<Assignment> => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/assignments/${assignmentId}`);
  return response.data;
};
export const createAssignment = async (courseId: string): Promise<Assignment> => {
  const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};
export const deleteAssignment = async (courseId: string, assignmentId: string) => {
  const response = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}/assignments/${assignmentId}`);
  return response.data;
};
export const updateAssignment = async (courseId: string, assignment: Assignment): Promise<Assignment> => {
  const response = await axiosWithCredentials.put(`${COURSES_API}/${courseId}/assignments/${assignment._id}`, assignment);
  return response.data;
};
export const findQuizzesForCourse = async (courseId: string): Promise<Quiz[]> => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};
