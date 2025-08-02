import TasksElement from "../UI/TasksElem.js";

class TaskController{
    constructor(parent, saveCurrentState, renderParent, DOM, container){
        this.parent = parent;
        this.saveCurrentState = saveCurrentState;
        this.renderParent = renderParent;
        this.DOM = DOM;
        this.container = container;
    }

    setParent(parent){
        this.parent = parent;
    }

    addTask({
        title, description, dueDate, priority, note
    }){
        debugger;
        this.parent.addTask({title, description, dueDate, priority, note});
        this.saveCurrentState();
        this.renderParent();
    }

    deleteTask(id){
        this.parent.deleteTask(id);
        this.saveCurrentState();
        this.renderParent()
    }

    editTask(id , taskData){
        const task =  this.getTask(id);
        task.updateTask(taskData)
        this.saveCurrentState()
        this.renderParent();
    }

    completeTask(id){
        this.parent.completeTask(id);
        this.saveCurrentState();
        this.renderParent();
    }

    getTask(id){
        return this.parent.getTask(id);
    }
    
    renderTasks(){
        this.tasks = this.parent.getAllTasks();
        TasksElement(this.container, this.tasks, {
            addTask: this.addTask.bind(this),
            deleteTask: this.deleteTask.bind(this),
            editTask: this.editTask.bind(this),
            completeTask: this.completeTask.bind(this),
            getTask: this.getTask.bind(this)
        }, this.DOM);
    }
}

export default TaskController;