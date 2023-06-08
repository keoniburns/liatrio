import { Octokit } from "octokit";
require('dotenv').config();

const octokit = new Octokit({
    auth: process.env.MY_TOKEN,
});
await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner: "keoniburns",
    repo: "liatrio",
});

