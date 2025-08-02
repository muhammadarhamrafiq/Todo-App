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

            addSection:{
                container: document.getElementById("addSectionFormContainer"),
                form: document.getElementById("addSectionForm"),
                title: document.getElementById("sectionTitle"),
                description: document.getElementById("sectionDescription"),
                close: document.getElementById("cancelSectionButton"),
                submit: document.getElementById("sectionSubmit")
            },

            taskModal:{
                modal: document.getElementById("addTaskModal"),
                form: document.getElementById("addTaskForm"),
                title: document.getElementById("modalTitle"),
                taskTitle: document.getElementById("taskTitle"),
                dueDate: document.getElementById("taskDueDate"),
                priority: document.getElementById("taskPriority"),
                description: document.getElementById("taskDescription"),
                note: document.getElementById("taskNote"),
                close: document.getElementById("cancelTaskButton"),
                submit: document.getElementById("taskSubmit")
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
