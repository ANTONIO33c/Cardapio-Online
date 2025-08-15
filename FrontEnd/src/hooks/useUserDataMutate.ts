import axios, { type AxiosPromise } from "axios";
import type { UserData } from '../interface/UserData';
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const postData = async (data: UserData): AxiosPromise<any> => {
  const token = localStorage.getItem('token');

  const response = axios.post(API_URL + '/auth/register', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export function useUserDataMutate() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: postData,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-data'] });
    },
    onError: (error: any) => {
  console.error("Erro ao criar usuário:", error.response?.data || error.message);
  alert("Erro ao criar usuário: " + (error.response?.data?.message || error.message));
}
  });

  return mutate;
}
