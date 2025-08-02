import { format, parseISO } from "date-fns";
import eyeIcon from "../assets/eye.svg";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";

function closeAndResetModal(modal) {
  modal.modal.classList.add("hidden");
  modal.form.reset();
  modal.title.textContent = "";
  modal.modal.setAttribute("data-hidden", "true");

  modal.taskTitle.classList.remove("hidden");
  modal.submit.classList.remove("hidden");
}

function addTask(modal, addTaskEvent) {
  modal.modal.classList.remove("hidden");
  modal.title.textContent = "Add Task";
  modal.modal.setAttribute("data-hidden", "false");
  modal.close.textContent = "Cancel";

  modal.form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const formData = new FormData(modal.form);
    const {title, dueDate, priority, description, note} = Object.fromEntries(formData.entries());
    addTaskEvent({
      title,
      dueDate,
      priority,
      description,
      note,
    });
    closeAndResetModal(modal);
  }, { once: true });
}

function editTask(modal, editTaskEvent, task) {
  modal.modal.classList.remove("hidden");
  modal.title.textContent = "Edit Task";
  modal.modal.setAttribute("data-hidden", "false");
  modal.close.textContent = "Cancel";
  modal.submit.textContent = "Edit"

  modal.taskTitle.value = task.title;
  modal.description.value = task.description;
  modal.dueDate.value = task.dueDate;
  modal.priority.value = task.priority;
  modal.note.value = task.note;

  modal.form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const formData = new FormData(modal.form);
    const {title, dueDate, priority, description, note} = Object.fromEntries(formData.entries());
    editTaskEvent(task.id, {
      title,
      dueDate,
      priority,
      description,
      note,
    });
    closeAndResetModal(modal);
  }, { once: true });
}

function viewTask(modal, task){
  modal.modal.classList.remove("hidden");
  modal.title.textContent = task.title;
  modal.modal.setAttribute("data-hidden", "false");
  modal.close.textContent = "Close";
  modal.taskTitle.classList.add("hidden");
  modal.submit.classList.add("hidden");

  modal.taskTitle.value = task.title;
  modal.description.value = task.description;
  modal.dueDate.value = task.dueDate;
  modal.priority.value = task.priority;
  modal.note.value = task.note;
}

function SetupControls(elem, task, modal, events) {
  const controlsContainer = document.createElement("div");
  controlsContainer.className = "flex items-center gap-2 ml-4";

  // View Button
  const viewBtn = document.createElement("button");
  viewBtn.className = "text-gray-500 hover:text-gray-700 cursor-pointer";
  viewBtn.setAttribute("aria-label", "View Task");
  viewBtn.innerHTML = eyeIcon;
  viewBtn.addEventListener("click", ()=>{
    const taskToView = events.getTask(task.id);
    viewTask(modal, taskToView);
  })
  controlsContainer.appendChild(viewBtn);

  // edit Button
  const editBtn = document.createElement("button");
  editBtn.className = "text-gray-500 hover:text-gray-700 cursor-pointer";
  editBtn.setAttribute("aria-label", "Edit Task");
  editBtn.innerHTML = editIcon;
  editBtn.addEventListener("click", () => {
    const taskToEdit = events.getTask(task.id);
    editTask(modal, events.editTask, taskToEdit);
  });
  controlsContainer.appendChild(editBtn);

  // delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "text-red-500 hover:text-red-700 cursor-pointer";
  deleteBtn.setAttribute("aria-label", "Delete Task");
  deleteBtn.innerHTML = deleteIcon;
  deleteBtn.addEventListener("click", ()=>{
    if(confirm("Are you sure you want to delete this task?")){
      events.deleteTask(task.id);
    }
  })
  controlsContainer.appendChild(deleteBtn);
  elem.appendChild(controlsContainer);
}

function createTaskElem(task, onComplete) {
  const elem = document.createElement("div");
  elem.className = "task flex items-center p-4";
  // set Complete Button
  const completeBtn = document.createElement("button");
  completeBtn.className = "complete-btn";
  completeBtn.setAttribute("data-completed", task.completed);
  completeBtn.setAttribute("data-priority", task.priority);
  completeBtn.setAttribute("aria-label", "Complete Task");
  completeBtn.addEventListener("click", () => {
    onComplete(task.id);
    completeBtn.setAttribute("data-completed", task.completed);
    completeBtn.setAttribute("data-priority", task.priority);
  });
  elem.appendChild(completeBtn);

  // detail container
  const details = document.createElement("div");
  details.className = "task-details flex-1";
  details.innerHTML = `
          <h4 class="text-lg">${task.title}</h4>
          <time class="text-sm text-gray-500 flex items-center" datetime="${
            task.dueDate
          }">
              ${format(parseISO(task.dueDate), "PPPP")}
          </time>
      `;
  elem.appendChild(details);
  return elem;
}

function TasksElement(container, tasks, events, modal) {
  container.innerHTML = " ";

  tasks.forEach((task) => {
    const elem = createTaskElem(task, events.completeTask);
    SetupControls(elem, task, modal, events);
    container.appendChild(elem);
  });

  // Add Add Task Button
  const addTaskButton = document.createElement("button");
  addTaskButton.className =
    "px-4 py-2 border w-fit border-gray-300 rounded cursor-pointer hover:bg-gray-100 addTaskButton";
  addTaskButton.textContent = "Add Task +";
  addTaskButton.addEventListener("click", () => {
    addTask(modal, events.addTask);
  });

  // Close Button Handling
  modal.close.addEventListener("click", () => {
    closeAndResetModal(modal);
  });

  container.appendChild(addTaskButton);
}

export default TasksElement;
