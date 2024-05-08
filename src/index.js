import "./style.css";
import { format, compareAsc } from "date-fns";
import { clearTasksArray, createTask, getTasks } from "./tasks";
import { createDummyData } from "./dummydata";
import { createProject, getProjects } from "./projects";
import { createElement } from "./elements";

let visibleTasks = []; 
let heading = "";

function initializePage() {
    createDummyData();
    setVisibleTasks(getTasks.all(), "All Tasks");
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
            projectButtons[i].addEventListener("click", function() {
                setVisibleTasks(getTasks.filterByProject(project), `${project.name}`);
                renderTasks();
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
            const task = getTasks.all().find(item => item.key == taskKey);
            deleteTaskButtons[i].addEventListener("click", function() {
                const index = getTasks.all().indexOf(task);
                getTasks.all().splice(index, 1);
                renderTasks();
            });
        };
    };

    function addEventListenersToTaskEditButtons() {
        const editTaskButtons = document.querySelectorAll(".btn-edit-task");
        for (let i = 0; i < editTaskButtons.length; i++) {
            const taskKey = editTaskButtons[i].dataset.key;
            const task = getTasks.all().find(item => item.key == taskKey);
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
                setVisibleTasks(getTasks.filterByProject(project), `${project.name}`);
                renderTasks();
            });
        };
    };

    function addEventListenersToPriorityButtons() {
        const priorityButtons = document.querySelectorAll(".btn-priority");

        for (let i = 0; i < priorityButtons.length; i++) {
            priorityButtons[i].addEventListener("click", function(){
                const taskKey = priorityButtons[i].parentNode.dataset.key;
                const task = getTasks.all().find(item => item.key == taskKey);
                if(!task.complete) {
                    task.complete = true;
                    renderTasks();
                } else {
                    task.complete = false;
                    renderTasks();
                }
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
        setVisibleTasks(getTasks.filterByProject(newProject), `${newProject.name}`);
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
            taskToEdit.title = taskTitle.value;
            taskToEdit.notes = taskNotes.value;
            taskToEdit.dueDate = taskDueDate.value;
            taskToEdit.priority = taskPriority.value;
            taskToEdit.project = getProjects().find(project => project.key == taskProject.value);
            console.table(taskToEdit);
        } else {
            const newTask = createTask(taskTitle.value, taskNotes.value, taskDueDate.value, taskPriority.value, taskProject.value);
            newTask.project ? setVisibleTasks(getTasks.filterByProject(newTask.project), `${newTask.project.name}`) : null;
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
        setVisibleTasks(getTasks.all(), "All Tasks");
        renderTasks();
    });

    const todayButton = document.querySelector("#today");
    todayButton.addEventListener("click", function() {
        setVisibleTasks(getTasks.filterByToday(), "Today");
        renderTasks();
    });

    const overdueButton = document.querySelector("#overdue");
    overdueButton.addEventListener("click", function() {
        setVisibleTasks(getTasks.filterByOverdue(), "Overdue");
        renderTasks();
    });

    const resetDemoDataButton = document.querySelector("#reset-demo-data");
    resetDemoDataButton.addEventListener("click", function() {
        getTasks.all().splice(0, getTasks.all().length);
        getProjects().splice(0, getProjects().length);
        createDummyData();
        setVisibleTasks(getTasks.all(), "All Tasks");
        renderProjectButtons();
        renderTasks();
    });
}

initializePage();