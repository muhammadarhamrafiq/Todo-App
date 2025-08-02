import makeInlineEditable from "../modules/makeInlineEditable";

function projectPanel(project, projectPanelElem, updateProject){



    projectPanelElem.projectPanel.setAttribute("data-id", project.id);

    projectPanelElem.heading.textContent = project.title;
    makeInlineEditable(projectPanelElem.heading, (newTitle)=>{
       updateProject({title: newTitle}); 
    })

    projectPanelElem.description.textContent = project.description;
    makeInlineEditable(projectPanelElem.description, (newDescription)=>{
        updateProject({description: newDescription});
    })
}

export default projectPanel;