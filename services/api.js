import axios from 'axios'

export function createAPiInstance(){
    return axios.create({
        baseURL: 'https://github-languages.vercel.app/api'
        // baseURL: 'localhost:3005'
    })
}
export function createGitInstance(){
    return axios.create({
        baseURL: 'https://api.github.com'
    })
}
