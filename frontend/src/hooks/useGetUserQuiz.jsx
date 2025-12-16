import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthProvider"
import { getUserQuizzes } from "../api/QuizApi.js";

export const useGetUserQuiz = () => {
    const { api } = useAuth();
    return useQuery(
        {
            queryKey: ['userQuizzes'],
            queryFn: () => getUserQuizzes(api),
            onSuccess: (data) => {
                console.log("Pobrano quizy użytkownika:", data);
        },
            onError: (error) => {
                console.error("Błąd przy pobieraniu quizów użytkownika:", error.response?.data || error.message);
            },
        }
    );
}