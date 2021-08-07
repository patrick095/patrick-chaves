import { getAuthRepos, getRepoLanguages, createGitInstance } from "./api";

async function calcAllReposLanguages(api, repos, user){
    var languagesUser= {};
    let index = 0;
    var response = await new Promise(
        async function(resolve, reject){
            for await (const repo of repos){
                if (repo.owner.login !== user) {
                    index++;
                    // user is not owner of this repo
                }
                else {
                    getRepoLanguages(api, user, repo.name)
                    .then(repoLanguages =>{
                        index++;
                        for (const language in repoLanguages) {
                            languagesUser[language] = (languagesUser[language] || 0 ) + repoLanguages[language];
                        };
                        if (index === repos.length) {
                            var total = 0;
                            for (const language in languagesUser){
                                total += languagesUser[language];
                            }
                            for (const language in languagesUser) {
                                languagesUser[language] = ((languagesUser[language]*100)/total).toFixed(2)+"%";
                            }
                            return resolve(languagesUser);
                        };
                    })
                    .catch(err => reject(err));
                }
            };
        }
    );
    return response;
}

export default async function getAuthUserRepos(user = 'patrick095') {
    const token = process.env.TOKEN
    const api = createGitInstance(token)
    const repos = await getAuthRepos(api)
    console.log(repos)
    if (repos.response) {
        //será chamado caso retorne o erro
        return repos.response.data
    }
    const response = await calcAllReposLanguages(api, repos, user);
    return response
}