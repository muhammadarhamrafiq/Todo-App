import Project from "./project.js";

class Todo {
  #projects = [];
  static #instance = null;

  constructor() {
    if (Todo.#instance) return Todo.#instance;

    // Default Project, Section and Tasks
    const data = localStorage.getItem("todoApp");
    if (data) {
      this.fromJSON(data);
    } else {
      const defaultProject = new Project({
        title: "Welcome Project",
        description:
          "This is your first project. You can add sections and tasks to it.",
      });

      defaultProject.addSection({
        title: "Welcome Section",
        description: "This is your first section. You can add tasks to it.",
      });

      const defaultSection = defaultProject.sections[0];
      defaultSection.addTask({
        title: "Welcome Task",
        description:
          "This is your first task in the welcome section. You can edit or delete it.",
        dueDate: new Date().toISOString(),
      });

      defaultProject.addTask({
        title: "Welcome Task",
        description: "This is your first task. You can edit or delete it.",
        dueDate: new Date().toISOString(),
      });

      this.#projects.push(defaultProject);
    }

    Todo.#instance = this;
  }

  /**
   * @typedef {Object} ProjectData
   * @property {string} title
   * @property {string} description
   */

  /**
   * @param {ProjectData} projectData
   */
  addProject(projectData) {
    let newProject = new Project(projectData);
    this.#projects.push(newProject);
  }

  #findProjectIndex(projectId) {
    return this.#projects.findIndex((project) => project.id === projectId);
  }

  getAllProjects() {
    return this.#projects.map(({ id, title, description }) => ({
      id,
      title,
      description,
    }));
  }

  getProject(id) {
    return this.#projects[this.#findProjectIndex(id)] || null;
  }

  deleteProject(id) {
    const index = this.#findProjectIndex(id);
    if (index !== -1) {
      this.#projects.splice(index, 1);
    }
  }

  // --- Getters ---
  get projects() {
    return this.getAllProjects();
  }

  // --- Serialization ---
  toJSON() {
    return {
      projects: this.#projects.map((project) => project.toJSON()),
    };
  }

  storeToLocalStorage() {
    localStorage.setItem("todoApp", JSON.stringify(this.toJSON(), null, 2));
  }

  fromJSON(data) {
    const object = JSON.parse(data);
    this.#projects = object.projects.map((project) =>
        new Project(project)
    );
  }
}

export default Todo;
