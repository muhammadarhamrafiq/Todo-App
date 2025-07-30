import Task from "./task";

class Section {
    #id;
    #title;
    #description;
    #tasks;

    constructor({ id = crypto.randomUUID(), title, description, tasks = [] }) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#tasks = tasks.map(task => new Task(task));
    }

    // --- Task Management ---

    /**
     * @typedef {Object} TaskData
     * @property {string} title
     * @property {string} description
     * @property {string} dueDate
     * @property {0 | 1 | 2 | 3} [ priority ]
     * @property {String} [ note ]
     */

    /**
     * @param {TaskData} taskData
     */
    addTask(taskData) {
        let newTask = new Task(taskData);
        this.#tasks.push(newTask);
    }

    deleteTask(id) {
        const index = this.#findTaskIndex(id);
        if (index !== -1) {
            this.#tasks.splice(index, 1);
        }
    }

    getTask(id) {
        const index = this.#findTaskIndex(id);
        if (index === -1) return null;
        return this.#tasks[index];
    }

    getAllTasks() {
        return this.#tasks.map(({ id, title, dueDate }) => ({ id, title, dueDate }));
    }

    completeTask(id) {
        const index = this.#findTaskIndex(id);
        if (index !== -1) {
            this.#tasks[index].markAsComplete();
        }
    }

    // --- Section Management ---

    updateSection({ title, description }) {
        if (title) this.#title = title;
        if (description) this.#description = description;
    }

    // --- Helpers ---

    #findTaskIndex(id) {
        return this.#tasks.findIndex((task) => task.id === id);
    }

    // --- Getters ---
    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get id(){
        return this.#id;
    }

    toJSON(){
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            tasks: this.#tasks.map(task => task.toJSON()),
        }
    }
}

export default Section;
