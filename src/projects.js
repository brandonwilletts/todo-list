export function getProjectId() {
    if (!localStorage.getItem("projectId")) {
        localStorage.setItem("projectId", 0);
    }
    return localStorage.getItem("projectId");
};

function incrementProjectId() {
    let projectId = localStorage.getItem("projectId");
    projectId++
    localStorage.setItem("projectId", projectId);
};

class Project {
    constructor(name) {
        this.name = name;
        this.key = getProjectId();
    }
};

export function createProject(name) {
    const project = new Project(name);
    localStorage.setItem(`project-${getProjectId()}`, JSON.stringify(project));
    incrementProjectId();
    return project
};

export function getProjects() {
    let projects = [];
    for (let i = 0; i <= getProjectId(); i++) {
        localStorage.getItem(`project-${i}`) ? projects.push(JSON.parse(localStorage.getItem(`project-${i}`))) : null;
    }
    return projects
};

export function removeProject(projectKey) {
    localStorage.removeItem(`project-${projectKey}`);
};