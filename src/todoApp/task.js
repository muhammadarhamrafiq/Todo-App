class Task {
  #id;
  #title;
  #description;
  #dueDate;
  #priority;
  #note;
  #completed;

  constructor({
    id = crypto.randomUUID(),
    title,
    description,
    dueDate,
    priority = 0,
    note = "",
    completed = false,
  }) {
    this.#id = id;
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#note = note;
    this.#completed = completed;
  }

  markAsComplete() {
    this.#completed = true;
  }

  updateTask({ title, description, dueDate, priority, note }) {
    if (title !== undefined) this.#title = title;
    if (description !== undefined) this.#description = description;
    if (dueDate !== undefined) this.#dueDate = dueDate;
    if (priority !== undefined) this.#priority = priority;
    if (note !== undefined) this.#note = note;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get description() {
    return this.#description;
  }

  get dueDate() {
    return this.#dueDate;
  }

  get priority() {
    return this.#priority;
  }

  get note() {
    return this.#note;
  }

  get completed() {
    return this.#completed;
  }
}

export default Task;
