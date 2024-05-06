import { createProject } from "./projects";
import { createTask } from "./tasks";

export function createDummyData() {
    const projectWork = createProject("Work");
    const projectSchool = createProject("School");
    const projectPersonal = createProject("Personal");
    const projectOther = createProject("Other");
    
    const taskOne = createTask(
        "Title 1",
        "Description",
        "Due Date",
        "Priority",
        "Project"
    );
    const taskTwo = createTask(
        "Title 2",
        "Description",
        "Due Date",
        "Priority",
        "Project"
    );
};