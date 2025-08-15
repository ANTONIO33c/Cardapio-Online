import axios, { type AxiosPromise } from "axios";
import type {UserData} from '../interface/UserData';
import { useQuery } from "@tanstack/react-query";


const API_URL = "http://localhost:8080";

const fetchData = async (): AxiosPromise<UserData[]> => {
    const response = axios.get(API_URL + '/auth/users');
    return response;
}

export function UseUserData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['user-data'],
        retry: 2
    })
    return {
        ...query,
        data: query.data?.data
    }
}