class DOMManager {
    constructor() {
        this.elements = {};
        this.initializeElements();
    }

    initializeElements() {
        this.elements = {

            projectList: document.getElementById('projectList'),
            addProjectButton: document.getElementById('addProjectButton'),
            projectForm: document.getElementById('projectForm'),

            projectPanel: {
                projectPanel: document.getElementById("projectPannel"),
                heading: document.getElementById("currentProjectTitle"),
                description: document.getElementById("currentProjectDescription"),
                tasksContainer: document.getElementById("projectTasksContainer"),
                sectionsContainer: document.getElementById("projectSectionsContainer"),
            },


            taskModal: document.getElementById("addTaskModal"),
            taskForm: document.getElementById("addTaskForm"),
            taskFormFields:{
                title: document.getElementById("taskTitle"),
                dueDate: document.getElementById("taskDueDate"),
                priority: document.getElementById("taskPriority"),
                description: document.getElementById("taskDescription"),
                note: document.getElementById("taskNote"),
                cancel: document.getElementById("cancelTaskButton"),
                submit: document.getElementById("submitTask")
            }
        };
    }

    getElement(elementName) {
        return this.elements[elementName];
    }

    getAllElements() {
        return this.elements;
    }
}

export default DOMManager;
