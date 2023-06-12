// import {Octokit,App} from "octokit";
const { Octokit, App } = require("octokit");
require('dotenv').config();
const octokit = new Octokit({
    auth: process.env.MY_TOKEN,
});

const createRepo = async function(){
    await octokit.request('POST /user/repos',{
        name: 'created_using_rest',
        description: 'this is a test to see if i can create repo using restAPI',
        has_issues: true,
        'private': true,
        has_projects: true,

    });

}
const createPull = async function(){

    await octokit.request('POST /repos/{owner}/{repo}/pulls', {
        owner: 'keoniburns',
        repo: 'created_using_rest',
        title: 'test to see if i can create pull requests',
        body: 'blah blah blah',
        head: 'demo',
        base: 'main'
    })
}

const createIssue = async function(){
    await octokit.request('POST /repos/{owner}/{repo}/issues', {
        owner: 'keoniburns',
        repo: 'created_using_rest',
        title: 'issue creation',
        body: 'testing out issue creation with rest',
        assignees: ['keoniburns'],
        labels: ['bug']
    })
} 

const displayRepoDetails = async function(){

    let repoRes = await octokit.request('GET /repos/{owner}/{repo}', {
        owner: 'keoniburns',
        repo: 'created_using_rest'
    })
    console.log("repo info: ", repoRes.data.full_name);

    let pullRes = await octokit.request('GET /repos/{owner}/{repo}/pulls',{
        owner: 'keoniburns',
        repo: 'created_using_rest'
    })
    console.log("pull info:", pullRes.data);

    let issueRes = await octokit.request('GET /repos/{owner}/{repo}/issues',{
        owner: 'keoniburns',
        repo: 'created_using_rest'
    })
    console.log("issue info:", issueRes.data);
}

function driver(){

    // createRepo();
    // createPull();
    // createIssue();
    displayRepoDetails();
}

driver();