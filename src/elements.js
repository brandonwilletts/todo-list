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

    return {
        text,
        projectButton
    };    
})();