import { get } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useCustomQuery = (queryKey: string[], endpoint: string) => {
  return useQuery({
    queryKey,
    queryFn: () => get(endpoint),
  });
};
