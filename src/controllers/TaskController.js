import TasksElement from "../UI/TasksElem.js";

class TaskController{
    constructor(parent, saveCurrentState, renderProject){
        this.parent = parent;
        this.saveCurrentState = saveCurrentState;
        this.renderProject = renderProject;
    }

    renderTasks(container){
        this.tasks = this.parent.tasks;
        TasksElement(container, this.tasks)
    }
}

export default TaskController;