import axios from 'axios'

// export default function createInstance(){
//     let token = process.env.TOKEN
//     return axios.create({
//         baseURL: 'https://api.github.com',
//         headers: {
//             'Authorization': `token ${getToken}`,
//             'X-OAuth-Scopes': 'repos, user',
//             'X-Accepted-OAuth-Scopes': 'user'
//         }
//     })
// }
export default function createInstance(){
    return axios.create({
        baseURL: 'https://git-languages.herokuapp.com'
    })
}
export function createGitInstance(){
    return axios.create({
        baseURL: 'https://api.github.com/'
    })
}