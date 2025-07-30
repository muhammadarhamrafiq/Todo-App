import './styles/style.css';
import Todo from './todoApp/Todo.js';
import ProjectListElements from "./UI/ProjectListElems.js"

const todo = new Todo();
let project = todo.getProject(todo.projects[0].id);


// DOM Elements
const projectList = document.getElementById("projectList");


// Methods
const setProject = function (projectId){
    project = todo.getProject(projectId);
}


// Render the Elements
ProjectListElements(todo.projects, projectList, setProject);