import { useAuth } from "../auth/AuthProvider"
import { deleteUserQuiz } from "../api/QuizApi.js";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteUserQuiz = () => {
    const { api } = useAuth();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (quizId) => deleteUserQuiz(api, quizId),
        onSuccess: (data) => {
            console.log("Quiz został usunięty:", data);
            queryClient.invalidateQueries(['userQuizzes']);   
        },
        onError: (error) => {
            console.error("Błąd przy usuwaniu quizu:", error.response?.data || error.message);
        },
    });
    return  mutation.mutate;
    }
