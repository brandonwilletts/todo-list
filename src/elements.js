import { format, compareAsc } from "date-fns";

export const createElement = (function() {

    function text(text) {
        const textElement = document.createElement("p");
        textElement.textContent = `${text}`;
        return textElement
    };

    function projectButton(project) {
        const button = document.createElement("button");
        button.classList.add("btn-sidebar", "btn-project");
        button.setAttribute("data-key", project.key);

        const icon = document.createElement("span");
        icon.classList.add("material-symbols-outlined", "md-18");
        icon.textContent = "tag"

        const text = document.createElement("div");
        text.textContent = project.name;

        button.appendChild(icon);
        button.appendChild(text);

        return button
    };

    function taskDisplay(task) {
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("div-task");

        const priorityButton = document.createElement("button");
        priorityButton.classList.add("btn-priority");
        switch(task.priority) {
            case "High":
                priorityButton.classList.add("priority-high");
                break;
            case "Medium":
                priorityButton.classList.add("priority-medium");
                break;
            case "Low":
                priorityButton.classList.add("priority-low");
                break;
            default:
                priorityButton.classList.add("priority-none");
                break;
        }
        taskContainer.appendChild(priorityButton);

        const taskInfo = document.createElement("div");
        taskInfo.classList.add("div-col");
        taskContainer.appendChild(taskInfo);

        const taskTitle = document.createElement("h3");
        taskTitle.classList.add("task-title")
        taskTitle.textContent = task.title;
        taskInfo.appendChild(taskTitle);

        const taskNotes = document.createElement("p");
        taskNotes.textContent = task.notes;
        taskInfo.appendChild(taskNotes);

        const span = document.createElement("span");
        span.classList.add("span-row")
        taskInfo.appendChild(span);

        const calendarIcon = document.createElement("span");
        calendarIcon.classList.add("material-symbols-outlined", "md-12");
        calendarIcon.textContent = "calendar_today";
        span.appendChild(calendarIcon);

        const dueDate = document.createElement("span");
        dueDate.classList.add("red-text");
        dueDate.textContent = `${format(task.dueDate, "yyyy-mm-dd")}`;
        span.appendChild(dueDate);

        if(task.project) {
            const divider = document.createElement("span");
            divider.textContent = " | ";
            span.appendChild(divider);

            const projectSymbol = document.createElement("span");
            projectSymbol.classList.add("material-symbols-outlined", "md-12");
            projectSymbol.textContent = "tag";
            span.appendChild(projectSymbol);

            const projectLink = document.createElement("button");
            projectLink.classList.add("project-link");
            projectLink.setAttribute("data-key", task.project.key);
            projectLink.textContent = task.project.name;
            span.appendChild(projectLink);
        }

        return taskContainer
    }

    return {
        text,
        projectButton,
        taskDisplay
    };    
})();