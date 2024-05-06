import { createElement } from "./elements";

class Task {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }
}

let tasks = [];

export function createTask(title, description, dueDate, priority, project) {
    const task = new Task (title, description, dueDate, priority, project);
    tasks.push(task);
    return task
}

export const getTasks = (function() {
    const all = () => tasks;
    const today = () => tasks;
    const overdue = () => tasks;
    const project = (projectName) => tasks;
    return { all, today, overdue, project };
})();

export function renderTasks(tasksArray) {
    const tasksContainer = document.querySelector("#tasks");
    for (let i = 0; i < tasksArray.length; i++) {
        const taskTitle = createElement.text(tasksArray[i].title);
        tasksContainer.appendChild(taskTitle);
    };
}