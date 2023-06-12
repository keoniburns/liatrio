const { Octokit, App } = require("octokit");
require('dotenv').config();
const token = process.env.MY_TOKEN;
const octokit = new Octokit({
    auth: token
});


const createRepo = async function(){
    let userDat = await octokit.graphql({
        query: `query{
            repository(owner: "keoniburns", name: "graphqlRepo"){
                id
            }
        },
        mutation{
            createRepository(input: {
                name: "graphqlRepo",
                visibility: PRIVATE,
            }){
                repository{
                    name
                    url
                }
            }
        }`
    });
    console.log(userDat);
}


const createPull = async function(){

    let res = await octokit.graphql({
        query: `query{
            repository(owner: "keoniburns", name: "graphqlRepo"){
                id
            }
        }`
    });

    let pullReq = await octokit.graphql({
        query: `mutation{
            createPullRequest(input:{
                repositoryId: "${res.repository.id}"
                baseRefName: "main"
                headRefName: "demo"
                title: "demo pull request creation"
            }){
                pullRequest{
                    url
                }
            }
        }`
    });
    console.log(res.repository.id);
    console.log(pullReq);
}

const createIssue = async function(){

    let res = await octokit.graphql({
        query: `query{
            repository(owner: "keoniburns", name: "graphqlRepo"){
                id
            }
        }`
    });

    let Req = await octokit.graphql({
        query: `mutation{
            createIssue(input:{
                repositoryId: "${res.repository.id}"
                title: "demo issue creation"
                body: "this should be created from graohql"
            }){
                issue{
                    url
                }
            }
            
        }`
    });
    console.log(res.repository.id);
    console.log(Req);
}

const createProject = async function(){
    let req = await octokit.graphql({
        query: `query{
            user(login: "keoniburns"){
                id
                repository(owner: "keoniburns", name: "graphqlRepo"){
                    id
                }
            }
        }`,
        headers: {
            'Authorization': `token ${token}`
        }
    });

    let make = await octokit.graphql({
        query: `mutation{
            cretProjectV2(input:{ownerId: "${req.user.id}", title: "graphQL demo", repositoryID: "${req.user.repository.id}"}){
                projectV2{
                    id
                    url
                }
            }
        }`,
        headers: {
            'Authorization': `token ${token}`
        }
    });
    console.log(make);
}


const getRepo = async function(){
    let repoRes = await octokit.graphql({
        query: `query{
            user(login: "keoniburns"){
                repository(name: "graphqlRepo"){
                    hasProjectsEnabled
                }
                login
            }
        }`
    });
    // console.log(repoRes);
    console.log(repoRes.user.login);
    // console.log(repoRes.user.repository);
    // console.log(repoRes.user.repository.issues.edges);
    // console.log(repoRes.user.repository.issues.edges.node.body);
}

// getOrgAndProject(token)
// createRepo();
// createPull();
// createIssue();
// createProject();
getRepo();