import { NextApiRequest, NextApiResponse } from 'next';
import { createInstance, getRateLimit, getRepoLanguages,  getRepos, getAuthRepos } from '../services/api';
import calcAllReposLanguages from './calcAllReposLanguages';

    export async function getAuthUserRepos(req: NextApiRequest, res: NextApiResponse) {
        const user = req.query.user as string;
        const token = req.query.token as string;
        const api = createInstance(token);
        const repos = await getAuthRepos(api);
        if ("response" in repos) {
            return res.json(repos.response.data)
        }
        const response = await calcAllReposLanguages(api, repos, user);
        return res.json(response);
    }
    export async function getUserRepos(req: NextApiRequest, res: NextApiResponse) {
        const user = req.query.user as string;
        const token = req.query.token as string;
        const api = createInstance(token);
        const repos = await getRepos(api, user);
        if ("response" in repos) {
            //será chamado caso retorne o erro
            const limit = await getRateLimit(api);
            return res.json({
                message: repos.response.data.message,
                limit: limit.rate.limit,
                remaining: limit.rate.remaining,
                used: limit.rate.used
            })
        }
        const response = await calcAllReposLanguages(api, repos, user);
        return res.json(response);
    }
    export async function getLimit(req: NextApiRequest, res: NextApiResponse){
        const api = createInstance();
        const limit = await getRateLimit(api);
            return res.json({
                limit: limit.rate.limit,
                remaining: limit.rate.remaining,
                used: limit.rate.used
            })
    }
