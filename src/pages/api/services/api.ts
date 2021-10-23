/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { IGitError, IRateLimit } from "../interfaces";
require("dotenv").config();

export async function getAuthRepos(
    api: AxiosInstance
): Promise<Array<any> | IGitError> {
    return await api
        .get("/user/repos")
        .then((res: AxiosResponse<any>) => {
            return res.data;
        })
        .catch((err: IGitError) => {
            return err;
        });
}
export async function getRepos(
    api: AxiosInstance,
    user: string
): Promise<Array<any> | IGitError> {
    return await api
        .get("/users/" + user + "/repos")
        .then((res: AxiosResponse<any>) => {
            return res.data;
        })
        .catch((err: AxiosError) => {
            return err;
        });
}
export async function getRepoLanguages(
    api: AxiosInstance,
    user: string,
    repo: any
): Promise<{ [key: string]: any }> {
    return await api
        .get("/repos/" + user + "/" + repo + "/languages")
        .then((res: AxiosResponse<any>) => {
            return res.data;
        })
        .catch((err: AxiosError) => {
            return err;
        });
}
export async function getRateLimit(
    api: AxiosInstance
): Promise<IRateLimit> {
    return await api
        .get("/rate_limit")
        .then((res: AxiosResponse<any>) => {
            return res.data;
        })
        .catch((err: AxiosError) => {
            return err;
        });
}
export function createInstance(token = "") {
    let getToken = token !== "" ? token : process.env.GIT_TOKEN;
    if (token !== "" && !process.env.GIT_TOKEN) {
        return axios.create({
            baseURL: "https://api.github.com",
        });
    } else {
        return axios.create({
            baseURL: "https://api.github.com",
            headers: {
                Authorization: `token ${getToken}`,
                "X-OAuth-Scopes": "repos, user",
                "X-Accepted-OAuth-Scopes": "user",
            },
        });
    }
}
