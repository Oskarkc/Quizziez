import { useAuth } from "../auth/AuthProvider";
import { getQuizAttempts } from "../api/QuizApi.js";
import { useQuery } from "@tanstack/react-query";

export const useGetQuizAttempts = () => {
    const {api} = useAuth();
    return useQuery(
        {
            queryKey: ['quizAttempts'],
            queryFn: () => getQuizAttempts(api),
        }
    );
}