import { useAuth } from "../auth/AuthProvider"
import { useQuery } from "@tanstack/react-query";
import { getQuizzezOptions } from "../api/QuizApi.js";

export const useGetAllQuizzesOptions = () => {
    const { api } = useAuth();

    const mapper = (options) => {
        return options.map((option) => ({
            value: option.name,
            label: option.name,
        }));
    }

    const query = useQuery({
        queryKey: ["quizzezOptions"],
        queryFn: () => getQuizzezOptions(api),
    });
    
    return { ...query , mapper };
}