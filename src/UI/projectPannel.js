function projectPanel(project, projectPanelElem){

    projectPanelElem.projectPanel.setAttribute("data-id", project.id);

    projectPanelElem.heading.textContent = project.title;
    projectPanelElem.description.textContent = project.description;
}

export default projectPanel;