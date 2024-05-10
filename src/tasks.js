import { format, compareAsc } from "date-fns";
import { getProjects } from "./projects";

export function getTaskId() {
    if (!localStorage.getItem("taskId")) {
        localStorage.setItem("taskId", 0);
    }
    return localStorage.getItem("taskId");
};

function incrementTaskId() {
    let taskId = localStorage.getItem("taskId");
    taskId++
    localStorage.setItem("taskId", taskId);
};

class Task {
    constructor(title, notes, dueDate, priority, projectKey) {
        this.title = title;
        this.notes = notes;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = getProjects().find(project => project.key == projectKey);
        this.complete = false;
        this.key = getTaskId();
    }
};

export function createTask(title, notes, dueDate, priority, projectKey) {
    const task = new Task (title, notes, dueDate, priority, projectKey);
    localStorage.setItem(`task-${getTaskId()}`, JSON.stringify(task));
    incrementTaskId();
    return task
};

export function getTasks() {
    const tasks = [];
    for (let i = 0; i <= getTaskId(); i++) {
        localStorage.getItem(`task-${i}`) ? tasks.push(JSON.parse(localStorage.getItem(`task-${i}`))) : null;
    }
    return tasks
};

export function getTasksToday() {
    const todaysDateFormatted = format(new Date(), "yyyy-MM-dd");
    let tasks = getTasks();
    tasks = tasks.filter(task => format(task.dueDate, "yyyy-MM-dd") == todaysDateFormatted);
    return tasks
};

export function getTasksOverdue() {
    const todaysDateFormatted = format(new Date(), "yyyy-MM-dd");
    let tasks = getTasks();
    tasks = tasks.filter(task => format(task.dueDate, "yyyy-MM-dd") < todaysDateFormatted);
    return tasks
};

export function getTasksByProject(projectKey) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.project && task.project.key == projectKey);
    return tasks
};

export function removeTask(taskKey) {
    localStorage.removeItem(`task-${taskKey}`);
}