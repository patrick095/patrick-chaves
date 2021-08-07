import axios from 'axios'

export function createGitInstance(token = ''){
    let getToken = (token !== '') ? token : process.env.TOKEN
    return axios.create({
        baseURL: 'https://api.github.com',
        headers: {
            'Authorization': `token ${getToken}`,
            'X-OAuth-Scopes': 'repos, user',
            'X-Accepted-OAuth-Scopes': 'user',
            "Access-Control-Allow-Origin": "*"
        }
    })
}
export async function getAuthRepos(api){
    return await api.get('/user/repos')
        .then(res => {return res.data})
        .catch(err => {return err});
}
export async function getRepoLanguages(api, user, repo){
    return await api.get('/repos/'+user+'/'+repo+'/languages')
    .then(res => {return res.data})
    .catch(err => {return err});
}