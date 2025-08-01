import Todo from '../todoApp/Todo.js';
import DOMManager from '../modules/DOMManager.js';
import ProjectController from '../controllers/ProjectController.js';
import UIController from '../controllers/UIController.js';

class App {
    constructor() {
        this.todoApp = null;
        this.domManager = null;
        this.projectController = null;
        this.uiController = null;
    }s

    init() {
        // Initialize core modules
        this.todoApp = new Todo();
        this.domManager = new DOMManager();
        
        // Initialize controllers
        this.projectController = new ProjectController(this.todoApp, this.domManager);
        this.uiController = new UIController(this.domManager, this.projectController);
        
        // Initial render
        this.render();
    }

    render() {
        // Render the initial project list
        this.projectController.renderProjectList();
        
        // Set first project as active if exists (this will call renderProject internally)
        if (this.todoApp.projects.length > 0) {
            this.projectController.setProject(this.todoApp.projects[0].id);
        }
    }

    // Getter methods for accessing controllers (if needed elsewhere)
    getProjectController() {
        return this.projectController;
    }

    getUIController() {
        return this.uiController;
    }

    getTodoApp() {
        return this.todoApp;
    }
}

export default App;
