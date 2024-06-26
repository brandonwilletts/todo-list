import "./style.css";
import { format, compareAsc } from "date-fns";
import { createTask, getTaskId, getTasks, getTasksByProject, getTasksOverdue, getTasksToday, removeTask, updateTask } from "./tasks";
import { createDummyData } from "./dummydata";
import { createProject, getProjects, removeProject, getProjectId } from "./projects";
import { createElement } from "./elements";

let visibleTasks = []; 
let heading = "";

function initializePage() {
    if (getProjectId() == 0 && getTaskId() == 0) {
        createDummyData();
    }
    setVisibleTasks(getTasks(), "All Tasks");
    renderTasks();
    renderProjectButtons();
    sidebarNav();
};

function setVisibleTasks(tasksArray, headingString) {
    visibleTasks = tasksArray;
    heading = headingString;
};

function renderProjectButtons() {
    const projectButtonsContainer = document.querySelector("#projects");
    
    function clearProjectButtons() {
        projectButtonsContainer.textContent = "";
    }
    
    function addEventListenersToProjectButtons() {
        const projectButtons = document.querySelectorAll(".btn-project");
        
        for (let i = 0; i < projectButtons.length; i++) {
            const project = getProjects().find(item => item.key == projectButtons[i].dataset.key);
            const projectKey = projectButtons[i].dataset.key;
            
            projectButtons[i].addEventListener("click", function() {
                setVisibleTasks(getTasksByProject(projectKey), `${project.name}`);
                renderTasks();
            });
        };
    };

    function addEventListenersToProjectDeleteButtons(){
        const deleteProjectButtons = document.querySelectorAll(".btn-delete-project");
        
        for (let i = 0; i < deleteProjectButtons.length; i++) {
            const projectKey = deleteProjectButtons[i].parentNode.dataset.key;
            const tasks = getTasksByProject(projectKey);

            deleteProjectButtons[i].addEventListener("click", function() {
                removeProject(projectKey);
                for(let i = 0; i < tasks.length; i++) {
                    removeTask(tasks[i].key);
                    renderTasks();
                }
                renderProjectButtons();
            });
        };
    };    

    clearProjectButtons();
    
    const projects = getProjects();
    for (let i = 0; i < projects.length; i++) {
        const button = createElement.projectButton(projects[i]);
        projectButtonsContainer.appendChild(button);
    };

    addEventListenersToProjectButtons();
    addEventListenersToProjectDeleteButtons();
};

function renderTasks() {
    const tasksContainer = document.querySelector("#tasks");

    function clearTasks() {
        tasksContainer.textContent = "";
    };
    
    function addEventListenersToTaskDeleteButtons() {
        const deleteTaskButtons = document.querySelectorAll(".btn-delete-task");
        for (let i = 0; i < deleteTaskButtons.length; i++) {
            const taskKey = deleteTaskButtons[i].dataset.key;
            const task = getTasks().find(item => item.key == taskKey);
            deleteTaskButtons[i].addEventListener("click", function() {
                removeTask(taskKey);
                visibleTasks = visibleTasks.filter(item => item.key != taskKey);
                renderTasks();
            });
        };
    };

    function addEventListenersToTaskEditButtons() {
        const editTaskButtons = document.querySelectorAll(".btn-edit-task");
        for (let i = 0; i < editTaskButtons.length; i++) {
            const taskKey = editTaskButtons[i].dataset.key;
            const task = getTasks().find(item => item.key == taskKey);
            editTaskButtons[i].addEventListener("click", function() {
                renderAddTaskFormModal(task);
            });
        };
    }

    function addEventListenersToProjectLinks() {
        const projectLinks = document.querySelectorAll(".project-link");
        
        for (let i = 0; i < projectLinks.length; i++) {
            const project = getProjects().find(item => item.key == projectLinks[i].dataset.key);
            projectLinks[i].addEventListener("click", function() {
                setVisibleTasks(getTasksByProject(projectLinks[i].dataset.key), `${project.name}`);
                renderTasks();
            });
        };
    };

    function addEventListenersToPriorityButtons() {
        const priorityButtons = document.querySelectorAll(".btn-priority");

        for (let i = 0; i < priorityButtons.length; i++) {
            priorityButtons[i].addEventListener("click", function(){
                const taskKey = priorityButtons[i].parentNode.dataset.key;
                const task = getTasks().find(item => item.key == taskKey);
                const taskIndex = visibleTasks.findIndex(item => item.key == taskKey);
                let taskProjectKey = "";
                task.project ? taskProjectKey = task.project.key : null;
                if(!task.complete) {
                    removeTask(task.key);
                    const newTask = updateTask(task.title, task.notes, task.dueDate, task.priority, taskProjectKey, true, task.key);
                    visibleTasks.splice(taskIndex, 1, newTask);
                } else {
                    removeTask(task.key);
                    const newTask = updateTask(task.title, task.notes, task.dueDate, task.priority, taskProjectKey, false, task.key);
                    visibleTasks.splice(taskIndex, 1, newTask);
                }
                renderTasks();
            });
        };
    };

    clearTasks();

    const h2 = document.querySelector("h2");
    h2.textContent = `${heading} (${visibleTasks.length})`;

    for (let i = 0; i < visibleTasks.length; i++) {
        const task = createElement.taskDisplay(visibleTasks[i]);
        tasksContainer.appendChild(task);
    };

    addEventListenersToTaskDeleteButtons();
    addEventListenersToProjectLinks();
    addEventListenersToPriorityButtons();
    addEventListenersToTaskEditButtons();
};

function renderAddProjectFormModal() {
    const dialog = document.querySelector("dialog");

    const form = createElement.addProjectForm();
    dialog.textContent = "";
    dialog.appendChild(form);
    
    const cancelButton = document.querySelector("#cancel");
    cancelButton.addEventListener("click", () => dialog.close());

    const addProjectForm = document.querySelector("#add-project-form");
    addProjectForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newProject = createProject(projectName.value);
        setVisibleTasks(getTasksByProject(newProject.key), `${newProject.name}`);
        renderTasks();
        renderProjectButtons();
        dialog.close();
    });

    dialog.showModal();
};

function renderAddTaskFormModal(taskToEdit) {
    const dialog = document.querySelector("dialog");

    const form = createElement.addTaskForm(taskToEdit);
    dialog.textContent = "";
    dialog.appendChild(form);
    
    const cancelButton = document.querySelector("#cancel");
    cancelButton.addEventListener("click", () => dialog.close());

    const addProjectForm = document.querySelector("#add-task-form");
    addProjectForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if(taskToEdit) {
            const taskIndex = visibleTasks.findIndex(item => item.key == taskToEdit.key);
            removeTask(taskToEdit.key);
            const newTask = updateTask(taskTitle.value, taskNotes.value, taskDueDate.value, taskPriority.value, taskProject.value, taskToEdit.complete, taskToEdit.key);
            visibleTasks.splice(taskIndex, 1, newTask);
        } else {
            const newTask = createTask(taskTitle.value, taskNotes.value, taskDueDate.value, taskPriority.value, taskProject.value);
            visibleTasks.push(newTask);
            newTask.project ? setVisibleTasks(getTasksByProject(newTask.project.key), `${newTask.project.name}`) : null;
        }
        renderTasks();
        dialog.close();
    });

    dialog.showModal();
};

function sidebarNav() {  
    const addProject = document.querySelector("#add-project");
    addProject.addEventListener("click", function() {
        renderAddProjectFormModal();
    });

    const addTask = document.querySelector("#add-task");
    addTask.addEventListener("click", function() {
        renderAddTaskFormModal();
    });
    
    const allTasksButton = document.querySelector("#all-tasks");
    allTasksButton.addEventListener("click", function() {
        setVisibleTasks(getTasks(), "All Tasks");
        renderTasks();
    });

    const todayButton = document.querySelector("#today");
    todayButton.addEventListener("click", function() {
        setVisibleTasks(getTasksToday(), "Today");
        renderTasks();
    });

    const overdueButton = document.querySelector("#overdue");
    overdueButton.addEventListener("click", function() {
        setVisibleTasks(getTasksOverdue(), "Overdue");
        renderTasks();
    });

    const resetDemoDataButton = document.querySelector("#reset-demo-data");
    resetDemoDataButton.addEventListener("click", function() {
        localStorage.clear();
        createDummyData();
        setVisibleTasks(getTasks(), "All Tasks");
        renderProjectButtons();
        renderTasks();
    });
}

initializePage();