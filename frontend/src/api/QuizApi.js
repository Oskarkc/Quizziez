export const createQuiz = async (api, quizData) => {
  const response = await api.post("/api/quiz", quizData);
  return response.data;
};
export const getUserQuizzes = async (api) => {
  const response = await api.get("/api/quiz");
  return response.data;
}