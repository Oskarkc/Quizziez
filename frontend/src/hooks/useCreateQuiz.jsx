import { useMutation} from "@tanstack/react-query";
import { useAuth } from "../auth/AuthProvider.jsx";
import { createQuiz } from "../api/QuizApi.js";

export const useCreateQuiz = () => {
  const { api } = useAuth(); 

  return useMutation(
    {
      mutationFn: (quizData) => createQuiz(api, quizData),
      onSuccess: (data) => {
        console.log("Quiz został utworzony:", data);
      },
      onError: (error) => {
        console.error("Błąd przy tworzeniu quizu:", error.response?.data || error.message);
      },
    }
  );
};