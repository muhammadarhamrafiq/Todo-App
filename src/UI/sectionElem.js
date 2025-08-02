import deleteIcon from "../assets/delete.svg"
import makeInlineEditable from "../modules/makeInlineEditable.js";

export const addSectionHandler = (containerDOM, addSection) => {
  containerDOM.container.classList.remove("hidden");
  containerDOM.form.reset();

  containerDOM.close.addEventListener("click" , ()=>{
    containerDOM.container.classList.add("hidden");
  }, {once: true});

  containerDOM.submit.addEventListener("click", (e) => {
    e.preventDefault();
    const title = containerDOM.title.value.trim();
    const description = containerDOM.description.value.trim();

    if (title === "" || title.length < 3 || description === "") {
      alert("Section title and description cannot be empty.");
      return;
    }
    
    addSection({title, description});
    containerDOM.container.classList.add("hidden");
  }, {once: true});
}

function SectionElement(container, section, deleteSection, updateSection) {
    const sectionElem = document.createElement('details');
    sectionElem.className = 'flex flex-col gap-1 p-2 rounded';
    sectionElem.setAttribute('data-id', section.id);
    sectionElem.setAttribute('open', 'true');


    const summary = document.createElement('summary');
    summary.className = 'flex justify-between items-center gap-1 border-b py-4 border-gray-300';
    sectionElem.appendChild(summary);


    const contentContainer = document.createElement('div');

    const title = document.createElement('h3');
    title.className = 'text-xl font-semibold';
    title.textContent = section.title;
    contentContainer.appendChild(title);
    makeInlineEditable(title, (newTitle)=>{
      updateSection(section, {title: newTitle});
    })

    const description = document.createElement('p');
    description.className = 'text-sm text-gray-600';
    description.textContent = section.description;
    contentContainer.appendChild(description);
    makeInlineEditable(description, (newDescription)=>{
      updateSection(section, {description: newDescription});
    });

    summary.appendChild(contentContainer);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-section text-red-500 hover:text-red-700 cursor-pointer';
    deleteBtn.innerHTML = deleteIcon;
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if(confirm(`Are you sure you want to delete the ${section.title} section?`)) 
        deleteSection(section.id);
    });
    summary.appendChild(deleteBtn);

    const tasksContainer = document.createElement("div");
    tasksContainer.className = "flex flex-col gap-1 pl-16";
    tasksContainer.setAttribute("id", `sectionTasksContainer-${section.id}`);

    sectionElem.appendChild(tasksContainer);
    container.appendChild(sectionElem);

    return tasksContainer;
}



export default SectionElement;
