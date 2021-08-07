import axios from 'axios'

export default function createGitInstance(){
    return axios.create({
        baseURL: 'https://gitlanguages.patrickchaves.com.br'
        // baseURL: 'localhost:3005'
    })
}