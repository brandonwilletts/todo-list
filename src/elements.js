import { format, compareAsc } from "date-fns";
import { getProjects } from "./projects";
import { de } from "date-fns/locale";

export const createElement = (function() {

    function text(text) {
        const textElement = document.createElement("p");
        textElement.textContent = `${text}`;
        return textElement
    };

    function formSaveButton() {
        const saveButton = document.createElement("button");
        saveButton.classList.add("btn-red");
        saveButton.setAttribute("type", "submit");
        saveButton.textContent = "Save";
        
        return saveButton
    };

    function formCancelButton() {
        const cancelButton = document.createElement("button");
        cancelButton.classList.add("btn-grey");
        cancelButton.setAttribute("id", "cancel");
        cancelButton.setAttribute("type", "button");
        cancelButton.textContent = "Cancel";

        return cancelButton
    };

    function inputLabel(forText, labelText) {
        const label = document.createElement("label");
        label.setAttribute("for", forText);
        label.textContent = labelText;

        return label
    };

    function inputElement(type, nameAndIdText) {
        const input = document.createElement("input");
        input.setAttribute("type", type);
        input.setAttribute("name", nameAndIdText);
        input.setAttribute("id", nameAndIdText);
    
        return input
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
        taskContainer.setAttribute("data-key", task.key);

        const priorityButton = document.createElement("span");
        priorityButton.classList.add("material-symbols-outlined", "md-18");
        priorityButton.classList.add("btn-priority");

        if (task.complete === true) {
            priorityButton.textContent = "close";
        } else {
            priorityButton.textContent = "";
        }
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
        task.complete ? taskTitle.style.cssText = "text-decoration: line-through;" : null;
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
        dueDate.textContent = format(task.dueDate, "yyyy-MM-dd");
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
        };

        const editDiv = document.createElement("div");
        taskContainer.appendChild(editDiv);
        
            const editButton = document.createElement("span");
            editButton.classList.add("material-symbols-outlined", "md-18", "btn-edit-task");
            editButton.setAttribute("data-key", task.key);
            editButton.textContent = "edit_square";
            editDiv.appendChild(editButton);

            const deleteButton = document.createElement("span");
            deleteButton.classList.add("material-symbols-outlined", "md-18", "btn-delete-task");
            deleteButton.setAttribute("data-key", task.key);
            deleteButton.textContent = "delete";
            editDiv.appendChild(deleteButton);

        return taskContainer
    }

    function addProjectForm() {
        const form = document.createElement("form");
        form.setAttribute("id", "add-project-form");

        const h2 = document.createElement("h2");
        h2.textContent = "Add Project";
        form.appendChild(h2);

        const inputDiv = document.createElement("div");
        form.appendChild(inputDiv);

            const label = inputLabel("projectName", "Name");
            inputDiv.appendChild(label);

            const input = inputElement("text", "projectName");
            input.setAttribute("required", true);
            inputDiv.appendChild(input);

        const buttonsDiv = document.createElement("div");
        form.appendChild(buttonsDiv);

            const cancelButton = formCancelButton();
            buttonsDiv.appendChild(cancelButton);

            const saveButton = formSaveButton();
            buttonsDiv.appendChild(saveButton);

        return form
    };

    function addTaskForm(taskToEdit) {
        const form = document.createElement("form");
        form.setAttribute("id", "add-task-form");

        const h2 = document.createElement("h2");
        h2.textContent = "Add Task";
        form.appendChild(h2);

        const inputDiv = document.createElement("div");
        form.appendChild(inputDiv);

            const labelTitle = inputLabel("taskTitle", "Title");
            inputDiv.appendChild(labelTitle);

            const inputTitle = inputElement("text", "taskTitle");
            inputTitle.setAttribute("required", true);
            inputDiv.appendChild(inputTitle);

            const labelNotes = inputLabel("taskNotes", "Notes");
            inputDiv.appendChild(labelNotes);

            const inputNotes = document.createElement("textarea");
            inputNotes.setAttribute("name", "taskNotes");
            inputNotes.setAttribute("id", "taskNotes");
            inputNotes.setAttribute("rows", "4");
            inputDiv.appendChild(inputNotes);

            const labelDueDate = inputLabel("taskDueDate", "Due Date");
            inputDiv.appendChild(labelDueDate);

            const inputDueDate = inputElement("date", "taskDueDate");
            inputDueDate.setAttribute("required", true);
            inputDiv.appendChild(inputDueDate);

            const labelPriority = inputLabel("taskPriority", "Priority");
            inputDiv.appendChild(labelPriority);

            const inputPriority = document.createElement("select");
            inputPriority.setAttribute("name", "taskPriority");
            inputPriority.setAttribute("id", "taskPriority");
            const priorityValues = ["", "Low", "Medium", "High"];
            for (let i = 0; i < priorityValues.length; i++) {
                const value = document.createElement("option");
                value.setAttribute("value", priorityValues[i]);
                value.textContent = priorityValues[i];
                inputPriority.appendChild(value);
            }
            inputDiv.appendChild(inputPriority);

            const labelProject = inputLabel("taskProject", "Project");
            inputDiv.appendChild(labelProject);

            const inputProject = document.createElement("select");
            inputProject.setAttribute("name", "taskProject");
            inputProject.setAttribute("id", "taskProject");
            
            const blankOption = document.createElement("option");
            inputProject.appendChild(blankOption);
            const projectValues = getProjects();
            for (let i = 0; i < projectValues.length; i++) {
                const value = document.createElement("option");
                value.setAttribute("value", projectValues[i].key);
                value.textContent = projectValues[i].name;
                inputProject.appendChild(value);
            }
            inputDiv.appendChild(inputProject);

        const buttonsDiv = document.createElement("div");
        form.appendChild(buttonsDiv);

            const cancelButton = formCancelButton();
            buttonsDiv.appendChild(cancelButton);

            const saveButton = formSaveButton();
            buttonsDiv.appendChild(saveButton);
        
        if(taskToEdit) {
            h2.textContent = "Edit Task";
            inputTitle.value = taskToEdit.title;
            inputNotes.value = taskToEdit.notes;
            inputDueDate.value = format(taskToEdit.dueDate, "yyyy-MM-dd");
            inputPriority.value = taskToEdit.priority;
            inputProject.value = taskToEdit.project.key;
        }

        return form
    };

    return {
        text,
        projectButton,
        taskDisplay,
        addProjectForm,
        addTaskForm
    };    
})();