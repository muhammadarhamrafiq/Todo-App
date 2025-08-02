import SectionElement, {addSectionHandler} from "../UI/sectionElem.js";
import TaskController from "./TaskController.js";

class SectionController {
  constructor(parent, saveCurrentState, renderProject, taskDOM, container, addSectionDOM) {
    this.parent = parent;
    this.saveCurrentState = saveCurrentState;
    this.renderProject = renderProject;
    this.taskDOM = taskDOM;
    this.container = container;
    this.addSectionDOM = addSectionDOM;
  }

  #getTaskController(section, taskContainer) {
    return new TaskController(
      {
        tasks: section.tasks,
        addTask: section.addTask.bind(section),
        getTask: section.getTask.bind(section),
        getAllTasks: section.getAllTasks.bind(section),
        deleteTask: section.deleteTask.bind(section),
        completeTask: section.completeTask.bind(section),
      },
      this.saveCurrentState,
      this.renderSections.bind(this),
      this.taskDOM,
      taskContainer
    );
  }


  deleteSection(sectionId){
    this.parent.deleteSection(sectionId);
    this.saveCurrentState();
    this.renderProject();
  }

  addSection(taskData){
    this.parent.addSection(taskData);
    this.saveCurrentState();
    this.renderProject();
  }

  renderSections() {
    this.sections = this.parent.sections;
    this.container.innerHTML = "";
    this.sections.forEach((section) => {
      const taskContainer = SectionElement(this.container, section, this.deleteSection.bind(this));
      const taskController = this.#getTaskController(section, taskContainer);
      taskController.renderTasks();
    });


    const addSectionButton = document.createElement("button");
    addSectionButton.className =
      "px-4 py-2 border w-fit border-gray-300 rounded cursor-pointer hover:bg-gray-100";
    addSectionButton.textContent = "Add Section +";
    addSectionButton.addEventListener("click", () => {
      addSectionHandler(this.addSectionDOM, this.addSection.bind(this));
    });
    this.container.appendChild(addSectionButton);

  }
}

export default SectionController;
