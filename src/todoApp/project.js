import Section from './section.js';
import Task from './task.js';

class Project{
    #id;
    #title;
    #description;
    #tasks;
    #sections;

    constructor({id = crypto.randomUUID(), title, description, tasks = [], sections = []}){
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#tasks = tasks.map(task => new Task(task));
        this.#sections = sections.map(section => new Section(section));
    }


    // --- Project Management ---
    updateProject({title, description}){
        if(title) this.#title = title;
        if(description) this.#description = description;
    }


    // --- Section Management ---
    /**
     * @typedef {Object} SectionData
     * @property {string} title
     * @property {string} description
     */

    /**
     * @param {SectionData} sectionData
     */
    addSection(sectionData) {
        let newSection = new Section(sectionData);
        this.#sections.push(newSection);
    }

    deleteSection(id){
        let index = this.#sections.findIndex(section => section.id === id);
        if (index !== -1)
            this.#sections.splice(index, 1);
    }

    // --- Tasks Management ---
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
    addTask(taskData){
        let newTask = new Task(taskData);
        this.#tasks.push(newTask);
    }

    getAllTasks(){
        return this.#tasks.map(({id, title, dueDate, priority, completed}) => ({id, title, dueDate, priority, completed}));
    }

    #findTaskIndex(taskId){
        return this.#tasks.findIndex(task => task.id === taskId);
    }

    getTask(id) {
        const index = this.#findTaskIndex(id);
        if (index === -1) return null;
        return this.#tasks[index];
    }
    
    completeTask(id){
        const index = this.#findTaskIndex(id);
        if (index !== -1) {
            this.#tasks[index].markAsComplete();
        }
    }

    deleteTask(id) {
        const index = this.#findTaskIndex(id);
        if (index !== -1) {
            this.#tasks.splice(index, 1);
        }
    }

    getSection(id){
        return this.#sections.find(section => section.id === id) || null;
    }

    // --- Getters ---
    get id(){
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }
    
    get tasks(){
        return this.getAllTasks();
    }

    get sections(){
        return this.#sections;
    }

    // --- Serialization --
    toJSON(){
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            tasks: this.#tasks.map(task => task.toJSON()),
            sections: this.#sections.map(section => section.toJSON()),
        }
    }

}

export default Project;