import { createElement } from "./elements";

class Project {
    constructor(name) {
        this.name = name;
    }
}

let projects = [];

export function createProject(name) {
    const project = new Project(name);
    projects.push(project);
    return project
}

export function renderProjectButtons() {
    const projectButtonsContainer = document.querySelector("#projects");
    for (let i = 0; i < projects.length; i++) {
        const button = createElement.projectButton(projects[i]);
        projectButtonsContainer.appendChild(button);
    };
}