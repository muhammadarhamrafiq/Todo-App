import { format, parseISO } from "date-fns";
import eyeIcon from "../assets/eye.svg";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";

function SetupControls(elem, task){
  const controlsContainer = document.createElement("div");
  controlsContainer.className = "flex items-center gap-2 ml-4";

  // View Button
  const viewBtn = document.createElement("button");
  viewBtn.className = "text-gray-500 hover:text-gray-700 cursor-pointer";
  viewBtn.setAttribute("aria-label", "View Task");
  viewBtn.innerHTML = eyeIcon;
  controlsContainer.appendChild(viewBtn);

  // edit Button
  const editBtn = document.createElement("button");
  editBtn.className = "text-gray-500 hover:text-gray-700 cursor-pointer"
  editBtn.setAttribute("aria-label", "Edit Task");
  editBtn.innerHTML = editIcon;
  controlsContainer.appendChild(editBtn);


  // delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "text-red-500 hover:text-red-700 cursor-pointer";
  deleteBtn.setAttribute("aria-label", "Delete Task");
  deleteBtn.innerHTML = deleteIcon;
  controlsContainer.appendChild(deleteBtn);

  elem.appendChild(controlsContainer);
}

function createTaskElem(task) {
  const elem = document.createElement("div");
  elem.className = "task flex items-center p-4";
  // set Complete Button
  const completeBtn = document.createElement("button");
  completeBtn.className = "complete-btn";
  completeBtn.setAttribute("data-completed", task.completed);
  completeBtn.setAttribute("data-priority", task.priority);
  completeBtn.setAttribute("aria-label", "Complete Task");
  elem.appendChild(completeBtn);


  // detail container
  const details = document.createElement("div");
  details.className = "task-details flex-1";
  details.innerHTML = `
          <h4 class="text-lg">${task.title}</h4>
          <time class="text-sm text-gray-500 flex items-center" datetime="${
            task.dueDate
          }">
              ${format(parseISO(task.dueDate), "PPPPpp")}
          </time>
      `;
  elem.appendChild(details);

  return elem;
}

function TasksElement(container, tasks) {
    container.innerHTML = " ";

  tasks.forEach((task) => {
    const elem = createTaskElem(task);
    SetupControls(elem, task);
    container.appendChild(elem);
  });

  // Add Add Task Button
  const addTaskButton = document.createElement("button");
  addTaskButton.className = "px-4 py-2 border w-fit border-gray-300 rounded cursor-pointer hover:bg-gray-100 addTaskButton";
  addTaskButton.textContent = "Add Task +";

  container.appendChild(addTaskButton);
}


export default TasksElement;
