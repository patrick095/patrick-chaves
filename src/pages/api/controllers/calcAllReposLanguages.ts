import { AxiosInstance } from 'axios';
import { getRepoLanguages } from '../services/api';

export default async function calcAllReposLanguages(api: AxiosInstance, repos: Array<any>, user: string){
    let languagesUser: { [key: string]: any } = {};
    let index = 0;
    const response = await new Promise(
        async function(resolve, reject){
            for await (const repo of repos){
                if (repo.owner.login !== user) {
                    index++;
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
                    .catch((err: string) => reject(err));
                }
            };
        }
    );
    return response;
}