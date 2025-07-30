function createElement(project, setProject){
    const projectElem = document.createElement('button');
    projectElem.className = 'data-[active=true]:bg-red-300/20 p-2 rounded-md cursor-pointer hover:bg-gray-300';
    projectElem.setAttribute('data-active', 'false');
    projectElem.setAttribute('data-id', project.id);
    projectElem.textContent = project.title;

    projectElem.addEventListener("click", function(){
        setProject(project.id);
        projectElem.setAttribute('data-active', 'true');
        projectList.querySelectorAll('[data-active="true"]').forEach(elem => {
            if (elem !== projectElem) {
                elem.setAttribute('data-active', 'false');
            }
        });
    });

    return projectElem;
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

