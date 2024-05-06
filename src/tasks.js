import { createElement } from "./elements";
import { format, compareAsc } from "date-fns";

class Task {
    constructor(title, notes, dueDate, priority, project) {
        this.title = title;
        this.notes = notes;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }
}

let tasks = [];
const tasksContainer = document.querySelector("#tasks");

export function createTask(title, notes, dueDate, priority, project) {
    const task = new Task (title, notes, dueDate, priority, project);
    tasks.push(task);
    return task
}

export const getTasks = (function() {
    const todaysDateFormatted = format(new Date(), "yyyy-mm-dd");

    const all = () => tasks;
    const filterByToday = () => tasks.filter(task => format(task.dueDate, "yyyy-mm-dd") == todaysDateFormatted);
    const filterByOverdue = () => tasks.filter(task => format(task.dueDate, "yyyy-mm-dd") < todaysDateFormatted);
    const filterByProject = (project) => tasks.filter(task => task.project === project);

    return { all, filterByToday, filterByOverdue, filterByProject };
})();

export function renderTasks(tasksArray, heading) {
    const h2 = document.querySelector("h2");
    h2.textContent = heading;
    for (let i = 0; i < tasksArray.length; i++) {
        const taskTitle = createElement.text(tasksArray[i].title);
        tasksContainer.appendChild(taskTitle);
    };
};

export function clearTasks() {
    tasksContainer.textContent = "";
};