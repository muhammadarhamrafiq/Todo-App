import SectionElement from "../UI/sectionElem.js";
import TaskController from "./TaskController.js";

class SectionController {
  constructor(parent, saveCurrentState) {
    this.parent = parent;
    this.saveCurrentState = saveCurrentState;
  }

  #getTaskController(section) {
    return new TaskController(
      {
        tasks: section.tasks,
        addTask: section.addTask.bind(section),
        getTask: section.getTask.bind(section),
        deleteTask: section.deleteTask.bind(section),
        completeTask: section.completeTask.bind(section),
      },
      this.saveCurrentState,
      this.renderSections
    );
  }

  renderSections(container) {
    this.sections = this.parent.sections;
    container.innerHTML = "";
    this.sections.forEach((section) => {
      const taskContainer = SectionElement(container, section);
      const taskController = this.#getTaskController(section);
      taskController.renderTasks(taskContainer);
    });


    const addSectionButton = document.createElement("button");
    addSectionButton.className =
      "px-4 py-2 border w-fit border-gray-300 rounded cursor-pointer hover:bg-gray-100";
    addSectionButton.textContent = "Add Section +";
    container.appendChild(addSectionButton);

  }
}

export default SectionController;
