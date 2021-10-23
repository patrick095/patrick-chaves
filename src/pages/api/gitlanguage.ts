import { createInstance, getAuthRepos } from './services/api';
import calcAllReposLanguages from './controllers/calcAllReposLanguages';
import { NextApiRequest, NextApiResponse } from 'next';
require('dotenv').config();

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
    const user= req.query.user as string;
    const api = createInstance(process.env.GIT_TOKEN);
    const repos = await getAuthRepos(api);
    if ("response" in repos) {
        return res.json(repos.response.data)
    }
    const response = await calcAllReposLanguages(api, repos, user);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86000');
    return res.json(response);
};