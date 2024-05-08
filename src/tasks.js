import { createElement } from "./elements";
import { format, compareAsc } from "date-fns";
import { getProjects } from "./projects";

class Task {
    constructor(title, notes, dueDate, priority, projectKey) {
        this.title = title;
        this.notes = notes;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = getProjects().find(project => project.key == projectKey);
        this.complete = false;
        this.key = Math.floor(Math.random() * 1000000);
    }
}

let tasks = [];

export function createTask(title, notes, dueDate, priority, projectKey) {
    const task = new Task (title, notes, dueDate, priority, projectKey);
    tasks.push(task);
    return task
}

export const getTasks = (function() {
    const todaysDateFormatted = format(new Date(), "yyyy-MM-dd");

    const all = () => tasks;
    const filterByToday = () => tasks.filter(task => format(task.dueDate, "yyyy-MM-dd") == todaysDateFormatted);
    const filterByOverdue = () => tasks.filter(task => format(task.dueDate, "yyyy-MM-dd") < todaysDateFormatted);
    const filterByProject = (project) => tasks.filter(task => task.project === project);

    return { all, filterByToday, filterByOverdue, filterByProject };
})();