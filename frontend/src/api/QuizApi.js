export const createQuiz = async (api, quizData) => {
  const response = await api.post("/api/quiz", quizData);
  return response.data;
};
export const getUserQuizzes = async (api) => {
  const response = await api.get("/api/quiz");
  return response.data;
}
export const deleteUserQuiz = async (api, quizId) => {
  const response = await api.delete(`/api/quiz/${quizId}`);
  return response.data;
}
export const editUserQuiz = async (api, quizId, quizData) => {
  const response = await api.put(`/api/quiz/${quizId}`, quizData);
  return response.data;
}
export const getAllQuizzes = async (api) => {
  const response = await api.get("/api/quiz/play");
  return response.data;
}
export const getQuizzezOptions = async (api) => {
  const response = await api.get("/api/quiz/options");
  return response.data;
}
export const getQuizById = async (api, quizId) => {
  const response = await api.get(`/api/quiz/${quizId}`);
  return response.data;
}