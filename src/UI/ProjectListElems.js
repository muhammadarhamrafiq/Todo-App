import deleteIcon from '../assets/delete.svg';

function createElement(project, setProject){
    // Container for project item (handles both title click and delete)
    const projectElem = document.createElement('div')
    projectElem.className = 'flex items-center justify-between p-2 rounded-md hover:bg-gray-300 data-[active=true]:bg-red-300/20'
    projectElem.setAttribute('data-active', 'false')
    projectElem.setAttribute('data-id', project.id)

    // Title button
    const titleBtn = document.createElement('button')
    titleBtn.className = 'flex-1 text-left'
    titleBtn.textContent = project.title
    titleBtn.addEventListener('click', function(){
        setProject(project.id)
    })

    // Delete button
    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'delete-project ml-2 text-red-500 hover:text-red-700 cursor-pointer'
    deleteBtn.innerHTML = deleteIcon

    projectElem.append(titleBtn, deleteBtn)
    return projectElem
}

function ProjectListElements(projects, projectList, setProject) {
    projectList.innerHTML = ''; // Clear existing elements

    projects.forEach((project,index) => {
        const projectElem = createElement(project, setProject)
        if(index === 0) {
            projectElem.setAttribute('data-active', 'true'); // Set first project as active
        }
        
        projectList.appendChild(projectElem);
    });   
}

export default ProjectListElements;

