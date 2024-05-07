import "./style.css";
import { format, compareAsc } from "date-fns";
import { createTask, getTasks } from "./tasks";
import { createDummyData } from "./dummydata";
import { getProjects } from "./projects";
import { createElement } from "./elements";

function initializePage() {
    createDummyData();
    renderTasks(getTasks.all(), "All Tasks");
    renderProjectButtons();
    sidebarNav();
}

function renderProjectButtons() {
    const projectButtonsContainer = document.querySelector("#projects");
    const projects = getProjects();
    for (let i = 0; i < projects.length; i++) {
        const button = createElement.projectButton(projects[i]);
        projectButtonsContainer.appendChild(button);
    };
};

function renderTasks(tasksArray, heading) {
    const tasksContainer = document.querySelector("#tasks");

    function clearTasks() {
        tasksContainer.textContent = "";
    };
    
    function addEventListenersToProjectLinks() {
        const projectLinks = document.querySelectorAll(".project-link");
        
        for (let i = 0; i < projectLinks.length; i++) {
            const project = getProjects().find(item => item.key == projectLinks[i].dataset.key);
            projectLinks[i].addEventListener("click", function() {
                renderTasks(getTasks.filterByProject(project), `${project.name}`);
            });
        };
    };

    clearTasks();

    const h2 = document.querySelector("h2");
    h2.textContent = `${heading} (${tasksArray.length})`;

    for (let i = 0; i < tasksArray.length; i++) {
        const task = createElement.taskDisplay(tasksArray[i]);
        tasksContainer.appendChild(task);
    };

    addEventListenersToProjectLinks();
};

function sidebarNav() {
    const allTasksButton = document.querySelector("#all-tasks");
    allTasksButton.addEventListener("click", function() {
        renderTasks(getTasks.all(), "All Tasks");
    });

    const todayButton = document.querySelector("#today");
    todayButton.addEventListener("click", function() {
        renderTasks(getTasks.filterByToday(), "Today");
    });

    const overdueButton = document.querySelector("#overdue");
    overdueButton.addEventListener("click", function() {
        renderTasks(getTasks.filterByOverdue(), "Overdue");
    });

    function addEventListenersToProjectButtons() {
        const projectButtons = document.querySelectorAll(".btn-project");
        
        for (let i = 0; i < projectButtons.length; i++) {
            const project = getProjects().find(item => item.key == projectButtons[i].dataset.key);
            projectButtons[i].addEventListener("click", function() {
                renderTasks(getTasks.filterByProject(project), `${project.name}`);
            });
        };
    };

    addEventListenersToProjectButtons();
}

initializePage();