class UIController {
    constructor(domManager, projectController) {
        this.projectController = projectController;
        this.domManager = domManager;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.setupProjectFormHandler();
        this.setupToggleFormHandler();
    }

    setupProjectFormHandler() {
        const projectForm = this.domManager.getElement('projectForm');
        
        projectForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const formData = new FormData(projectForm);
            const projectName = formData.get('projectName');
            const projectDescription = formData.get('projectDescription');

            const success = this.projectController.addProject(projectName, projectDescription);
            
            if (success) {s
                projectForm.reset();
                this.hideProjectForm();
            }
        });
    }

    setupToggleFormHandler() {
        const addProjectButton = this.domManager.getElement('addProjectButton');
        const projectForm = this.domManager.getElement('projectForm');
        
        addProjectButton.addEventListener('click', () => {
            projectForm.classList.toggle('hidden');
        });
    }

    hideProjectForm() {
        const projectForm = this.domManager.getElement('projectForm');
        projectForm.classList.add('hidden');
    }

    showProjectForm() {
        const projectForm = this.domManager.getElement('projectForm');
        projectForm.classList.remove('hidden');
    }
s
}

export default UIController;
