import axios from 'axios'

export function createAPiInstance(){
    return axios.create({
        baseURL: 'https://git-languages.herokuapp.com'
        // baseURL: 'localhost:3005'
    })
}
export function createGitInstance(){
    return axios.create({
        baseURL: 'https://api.github.com'
    })
}
