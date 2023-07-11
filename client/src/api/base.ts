import axios, { AxiosRequestConfig, Method } from "axios";
import { config } from "process";

export const getUrl = (): string => {
  return window.location.protocol + '//' + window.location.host;
}

export function requestPayload(method: Method, data: any) {
  if (method == 'GET' || method == 'get') {
    return {
      params: data,
    }
  } else if (method == 'POST' || method == 'post' || method == 'PATCH' || method || 'patch') {
    return {
      data: data,
    }
  }
}

export function createAxios<T = any>(axiosConfig: AxiosRequestConfig, external? : string): Promise<any> {
  const Axios = axios.create({
    baseURL: external || getUrl(),
    timeout: 1000 * 10,
    headers: {
      server: true,
    },
    responseType: 'json',
    ...requestPayload(axiosConfig.method as Method, axiosConfig.data),
  })

  Axios.interceptors.request.use(
    (config) => {
      console.info(`Request ${axiosConfig.url} :: `, {request: config})
      return config;
    },
    (error) => {
      console.error(`Request Error ${axiosConfig.url} :: `, {error})
      return Promise.reject(error)
    }
  )
  Axios.interceptors.response.use(
    (response) => {
      console.info(`Response ${axiosConfig.url} :: `, {response})
      return response.data;
    },
    (error) => {
      console.error(`Response Error ${axiosConfig.url} :: `, {error})
      return Promise.reject(error)
    }
  )

  return Axios(axiosConfig);
}