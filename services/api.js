import axios from 'axios'

export function createAPiInstance(){
    return axios.create({
        baseURL: 'https://gitlanguages.patrickchaves.com.br'
        // baseURL: 'localhost:3005'
    })
}
export function createGitInstance(){
    return axios.create({
        baseURL: 'https://api.github.com'
    })
}
