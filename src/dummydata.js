import { createProject } from "./projects";
import { createTask } from "./tasks";

export function createDummyData() {
    const projectWork = createProject("Work");
    const projectSchool = createProject("School");
    const projectPersonal = createProject("Personal");
    const projectOther = createProject("Other");

    const date = new Date();
    
    const taskOne = createTask(
        "Finish TPS report",
        "Submit to both Bobs",
        date,
        "High",
        projectWork
    );
    const taskTwo = createTask(
        "Study for mid-term",
        "Make sure to review Chapters 4 and 5",
        date,
        "Medium",
        projectSchool
    );
    const taskThree = createTask(
        "Buy groceries",
        "Milk, bread, cheese, eggs",
        date,
        "Low",
        projectPersonal
    );
    const taskFour = createTask(
        "Get car serviced",
        "Fairview Auto",
        date,
        "Medium",
        projectOther
    );
    const taskFive = createTask(
        "See if Inception is playing",
        "Invite Steve",
        date,
        "Low"
    );
};