import deleteIcon from "../assets/delete.svg"

function SectionElement(container, section) {
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

    const description = document.createElement('p');
    description.className = 'text-sm text-gray-600';
    description.textContent = section.description;
    contentContainer.appendChild(description);

    summary.appendChild(contentContainer);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-section text-red-500 hover:text-red-700 cursor-pointer';
    deleteBtn.innerHTML = deleteIcon
    summary.appendChild(deleteBtn);

    const tasksContainer = document.createElement("div");
    tasksContainer.className = "flex flex-col gap-1 pl-16";
    tasksContainer.setAttribute("id", `sectionTasksContainer-${section.id}`);

    sectionElem.appendChild(tasksContainer);
    container.appendChild(sectionElem);

    return tasksContainer;
}



export default SectionElement;
