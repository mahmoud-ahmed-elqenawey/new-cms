import { get } from "@/api";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

export const useCustomQuery = (
  queryKey: QueryKey,
  endpoint: string,
  config?: AxiosRequestConfig,
  enabled?: boolean
) => {
  return useQuery({
    queryKey,
    queryFn: () => get(endpoint, config),
    enabled,
  });
};
