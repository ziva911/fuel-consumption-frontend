import axios, { AxiosResponse } from 'axios';
import { ApiConfiguration } from '../Config/api.config';
type ApiMethod = 'get' | 'post' | 'put' | 'delete';
type ApiRole = 'user' | 'administrator';
type ApiResponseStatus = 'ok' | 'error' | 'login';

export interface ApiResponse {
    status: ApiResponseStatus,
    data: any
}

export default function api(
    method: ApiMethod,
    path: string,
    role: ApiRole = 'user',
    body: any | undefined = undefined
): Promise<ApiResponse> {
    return new Promise<ApiResponse>(resolve => {
        axios(
            {
                method: method,
                baseURL: ApiConfiguration.API_URL,
                url: path,
                data: body ? JSON.stringify(body) : '',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer No token'
                }
            }
        )
            .then(res => responseHandler(res, resolve))
            .catch(err => {
                if (err?.response?.status === 401) {
                    return resolve({
                        status: 'login',
                        data: null
                    })
                }
                if (err?.response?.status === 403) {
                    return resolve({
                        status: 'login',
                        data: 'Wrong role'
                    })
                }
                return resolve({
                    status: 'error',
                    data: '' + err?.response
                })
            })
    })
}


function responseHandler(res: AxiosResponse<any>, resolve: (data: ApiResponse) => void) {
    if (res?.status < 200 || res?.status > 300) {
        return resolve({
            status: 'error',
            data: '' + res
        })
    }
    resolve({
        status: 'ok',
        data: res.data
    })
}