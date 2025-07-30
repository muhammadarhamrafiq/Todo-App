import Project from "./project.js";

class Todo{
    #projects = [];
    static #instance = null;

    constructor(){
        if(Todo.#instance) return Todo.#instance;
        Todo.#instance = this;
        this.#projects = [];

        // Default Project, Section and Tasks
        const defaultProject = new Project({
            title: "Welcome Project",
            description: "This is your first project. You can add sections and tasks to it.",
        })

        defaultProject.addSection({
            title: "Welcome Section",
            description: "This is your first section. You can add tasks to it.",
        })

        const defaultSection = defaultProject.sections[0];
        defaultSection.addTask({
            title: "Welcome Task",
            description: "This is your first task in the welcome section. You can edit or delete it.",
            dueDate: new Date().toISOString(),
        })

        defaultProject.addTask({
            title: "Welcome Task",
            description: "This is your first task. You can edit or delete it.",
            dueDate: new Date().toISOString(),
        })

        this.#projects.push(defaultProject);
    }

    /**
     * @typedef {Object} ProjectData
     * @property {string} title
     * @property {string} description 
    */

    /**
     * @param {ProjectData} projectData 
    */
    addProject(projectData){
        let newProject = new Project(projectData);
        this.#projects.push(newProject);
    }

    #findProjectIndex(projectId){
        return this.#projects.findIndex(project => project.id === projectId);
    }

    getAllProjects(){
        return this.#projects.map(({id, title, description}) => ({id, title, description}));
    }

    getProject(id){
        return this.#projects[this.#findProjectIndex(id)] || null;
    }

    deleteProject(id){
        const index = this.#findProjectIndex(id);
        if (index !== -1){
            this.#projects.splice(index, 1);
        }
    }

    // --- Getters ---
    get projects(){
        return this.getAllProjects();
    }
    
}


export default Todo;