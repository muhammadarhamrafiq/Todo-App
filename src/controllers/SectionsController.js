import SectionElement from "../UI/sectionElem.js";
import TaskController from "./TaskController.js";

class SectionController {
  constructor(parent, saveCurrentState, renderProject, taskDOM, container) {
    this.parent = parent;
    this.saveCurrentState = saveCurrentState;
    this.renderProject = renderProject;
    this.taskDOM = taskDOM;
    this.container = container;
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

  renderSections() {
    this.sections = this.parent.sections;
    this.container.innerHTML = "";
    this.sections.forEach((section) => {
      const taskContainer = SectionElement(this.container, section);
      const taskController = this.#getTaskController(section, taskContainer);
      taskController.renderTasks();
    });


    const addSectionButton = document.createElement("button");
    addSectionButton.className =
      "px-4 py-2 border w-fit border-gray-300 rounded cursor-pointer hover:bg-gray-100";
    addSectionButton.textContent = "Add Section +";
    this.container.appendChild(addSectionButton);

  }
}

export default SectionController;
