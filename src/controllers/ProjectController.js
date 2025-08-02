import ProjectListElements from "../UI/ProjectListElems.js";
import projectPanel from "../UI/projectPannel.js";
import TaskController from "./TaskController.js";
import SectionController from "./SectionsController.js";

class ProjectController {
  constructor(todoApp, domManager) {
    this.todoApp = todoApp;
    this.domManager = domManager;
    this.currentProject = null;
    
    this.taskController = null;
    this.taskModal = this.domManager.getElement("taskModal");
    
    
    this.projectPanelElem = this.domManager.getElement("projectPanel");
    this.taskContainer = this.projectPanelElem.tasksContainer;
    this.sectionContainer = this.projectPanelElem.sectionsContainer;

    // Initialize with first project
    if (this.todoApp.projects.length > 0) {
      this.currentProject = this.todoApp.getProject(
        this.todoApp.projects[0].id
      );
      this.taskController = this.#getTaskController();
      this.sectionController = this.#getSectionController();
    }
  }

  #getTaskController() {
    return new TaskController(
      {
        tasks: this.currentProject.tasks,
        addTask: this.currentProject.addTask.bind(this.currentProject),
        getAllTasks: this.currentProject.getAllTasks.bind(this.currentProject),
        getTask: this.currentProject.getTask.bind(this.currentProject),
        completeTask: this.currentProject.completeTask.bind(
          this.currentProject
        ),
        deleteTask: this.currentProject.deleteTask.bind(this.currentProject),
      },
      this.saveCurrentState,
      this.renderProject.bind(this),
      this.taskModal,
      this.taskContainer
    );
  }

  #getSectionController() {
    return new SectionController(
      {
        sections: this.currentProject.sections,
        addSection: this.currentProject.addSection.bind(this.currentProject),
        deleteSection: this.currentProject.deleteSection.bind(
          this.currentProject
        ),
      },
      this.saveCurrentState,
      this.renderProject.bind(this),
      this.taskModal,
      this.sectionContainer,
      this.domManager.getElement("addSection")
    );
  }

  saveCurrentState = () => {
    return this.todoApp.storeToLocalStorage();
  };

  setProject(projectId) {
    this.currentProject = this.todoApp.getProject(projectId);
    this.taskController = this.#getTaskController();
    this.sectionController = this.#getSectionController();

    this.updateActiveProjectUI(projectId);
    this.renderProject();
  }

  updateActiveProjectUI(projectId) {
    const projectList = this.domManager.getElement("projectList");
    const targetElement = projectList.querySelector(`[data-id="${projectId}"]`);

    if (targetElement) {
      // Remove active state from all projects
      projectList.querySelectorAll('[data-active="true"]').forEach((elem) => {
        elem.setAttribute("data-active", "false");
      });

      // Set active state on target element
      targetElement.setAttribute("data-active", "true");
    }
  }

  addProject(projectName, projectDescription) {
    if (projectName.trim() === "") {
      alert("Project name cannot be empty");
      return false;
    }

    this.todoApp.addProject({
      title: projectName,
      description: projectDescription,
    });

    this.renderProjectList();

    // Set the newly added project as active
    const newProject = this.todoApp.projects[this.todoApp.projects.length - 1];
    this.setProject(newProject.id);
    this.saveCurrentState();

    return true;
  }

  deleteProject(projectId){
    this.todoApp.deleteProject(projectId);
    this.saveCurrentState();
    this.renderProjectList();
  }


  renderProjectList() {
    const projectList = this.domManager.getElement("projectList");
    ProjectListElements(
      this.todoApp.projects, 
      projectList,
      (projectId) => this.setProject(projectId),
      this.deleteProject.bind(this)
    );
  }

  renderProject() {
    projectPanel(this.currentProject, this.projectPanelElem);
    this.taskController.renderTasks();
    this.sectionController.renderSections();
  }

  getCurrentProject() {
    return this.currentProject;
  }
}

export default ProjectController;
