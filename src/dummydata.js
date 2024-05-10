import { clearProjects, createProject } from "./projects";
import { createTask } from "./tasks";

export function createDummyData() { 
    const projectWork = createProject("Work");
    const projectSchool = createProject("School");
    const projectPersonal = createProject("Personal");
    const projectOther = createProject("Other");
    
    const taskOne = createTask(
        "Finish TPS report",
        "Submit to both Bobs",
        new Date(),
        "High",
        projectWork.key,
    );

    const taskTwo = createTask(
        "Study for mid-term",
        "Make sure to review Chapters 4 and 5",
        new Date(2024, 12, 31),
        "Medium",
        projectSchool.key
    );
    const taskThree = createTask(
        "Buy groceries",
        "Milk, bread, cheese, eggs",
        new Date(2024, 3, 15),
        "Low",
        projectPersonal.key
    );
    const taskFour = createTask(
        "Get car serviced",
        "Fairview Auto",
        new Date(),
        "Medium",
        projectOther.key,
    );
    const taskFive = createTask(
        "See if Inception is playing",
        "Invite Steve",
        new Date()
    );
};