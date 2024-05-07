import { createElement } from "./elements";

class Project {
    constructor(name) {
        this.name = name;
        this.key = Math.floor(Math.random() * 1000000);
    }
}

let projects = [];

export function createProject(name) {
    const project = new Project(name);
    projects.push(project);
    return project
}

export function getProjects() {
    return projects
}

