import axios, { AxiosResponse } from 'axios'
import { IGitLanguagesResponse } from '../interfaces/services.interfaces';

export function getGitLanuages(): Promise<IGitLanguagesResponse> {
    return axios.get("/api/gitlanguage?user=patrick095").then((res: AxiosResponse<any>) => {
        let keys = Object.keys(res.data);
        return {
            codingLanguages: res.data,
            languagesList: keys
        }
    });
}

export function createGitInstance(){
    return axios.create({
        baseURL: 'https://api.github.com'
    })
}
