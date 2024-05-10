import { createElement } from "./elements";

let projectId = 0;

class Project {
    constructor(name) {
        this.name = name;
        this.key = projectId;
    }
}

export function createProject(name) {
    const project = new Project(name);
    localStorage.setItem(`project-${projectId}`, JSON.stringify(project));
    projectId++;
    return project
}

export function getProjects() {
    let projects = [];
    for (let i = 0; i <= projectId; i++) {
        localStorage.getItem(`project-${i}`) ? projects.push(JSON.parse(localStorage.getItem(`project-${i}`))) : null;
    }
    return projects
}

export function clearProjects() {
    let projects = getProjects();
    for (let i = 0; i < projects.length; i++) {
        localStorage.removeItem(`project-${projects[i].key}`);
    };
};