import "./style.css";
import { format, compareAsc } from "date-fns";
import { createTask, getTasks, renderTasks } from "./tasks";
import { createDummyData } from "./dummydata";
import { renderProjectButtons } from "./projects";

createDummyData();

renderTasks(getTasks.all());
renderProjectButtons();