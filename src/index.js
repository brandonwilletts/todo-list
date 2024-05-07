import "./style.css";
import { format, compareAsc } from "date-fns";
import { createTask, getTasks } from "./tasks";
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
        const taskTitle = document.querySelectorAll("h3");

        for (let i = 0; i < priorityButtons.length; i++) {
            priorityButtons[i].addEventListener("click", function(){
                const projectKey = priorityButtons[i].parentNode.dataset.key;
                const task = getTasks.all().find(item => item.project.key == projectKey);
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

    addEventListenersToProjectLinks();
    addEventListenersToPriorityButtons();
};

function sidebarNav() {
    const dialog = document.querySelector("dialog");
    
    const addProjectButton = document.querySelector("#add-project");
    addProjectButton.addEventListener("click", function() {
        const form = createElement.addProjectForm();
        dialog.textContent = "";
        dialog.appendChild(form);
        
        const cancelButton = document.querySelector("#cancel");
        cancelButton.addEventListener("click", () => dialog.close());

        const addProjectForm = document.querySelector("#add-project-form");
        addProjectForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const newProject = createProject(projectName.value);
            renderProjectButtons();
            dialog.close();
        })

        dialog.showModal();
    });

    const addTaskButton = document.querySelector("#add-task");
    addTaskButton.addEventListener("click", function() {
        dialog.showModal();
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

}

initializePage();