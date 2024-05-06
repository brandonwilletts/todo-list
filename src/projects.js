import { createElement } from "./elements";

class Project {
    constructor(name) {
        this.name = name;
        this.key = Math.floor(Math.random() * 1000000);
    }
}

let projects = [];
const projectButtonsContainer = document.querySelector("#projects");

export function createProject(name) {
    const project = new Project(name);
    projects.push(project);
    return project
}

export function getProjects() {
    return projects
}

export function renderProjectButtons() {
    for (let i = 0; i < projects.length; i++) {
        const button = createElement.projectButton(projects[i]);
        projectButtonsContainer.appendChild(button);
    };
};