import "./style.css";
import { format, compareAsc } from "date-fns";
import { clearTasks, createTask, getTasks, renderTasks } from "./tasks";
import { createDummyData } from "./dummydata";
import { renderProjectButtons, getProjects } from "./projects";

function renderInitialPage() {
    
    createDummyData();
    renderTasks(getTasks.all(), "All Tasks");
    renderProjectButtons();
}

function sidebarNav() {
    
    const allTasksButton = document.querySelector("#all-tasks");
    allTasksButton.addEventListener("click", function() {
        clearTasks();
        renderTasks(getTasks.all(), "All Tasks");
    });

    const todayButton = document.querySelector("#today");
    todayButton.addEventListener("click", function() {
        clearTasks();
        renderTasks(getTasks.filterByToday(), "Today");
    });

    const overdueButton = document.querySelector("#overdue");
    overdueButton.addEventListener("click", function() {
        clearTasks();
        renderTasks(getTasks.filterByOverdue(), "Overdue");
    });

    function addEventListenersToProjectButtons() {
        const projectButtons = document.querySelectorAll(".btn-project");
        
        for (let i = 0; i < projectButtons.length; i++) {
            const project = getProjects().find(item => item.key == projectButtons[i].dataset.key);
            projectButtons[i].addEventListener("click", function() {
                clearTasks();
                renderTasks(getTasks.filterByProject(project), `${project.name}`);
            });
        };
    };
    
    addEventListenersToProjectButtons();
}

renderInitialPage();
sidebarNav();