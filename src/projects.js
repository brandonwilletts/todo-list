import { createElement } from "./elements";

let projects = [];
let projectId = 0;

class Project {
    constructor(name) {
        this.name = name;
        this.key = projectId;
    }
}

export function createProject(name) {
    const project = new Project(name);
    projects.push(project);
    projectId++;
    return project
}

export function getProjects() {
    return projects
}