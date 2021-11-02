/* Add new task from user input to list at page.
* Return: undefined */
function addTaskFromUserInput() {
    console.log("addTaskFromUserInput()");

    // get data from #input-task
    const inputTaskElement = document.getElementById("input-task");
    const newTaskText = inputTaskElement.value;

    addTaskToPage(newTaskText, false); // create new task
    inputTaskElement.value = "new task"; // clear content of input-task
    saveAllTasks();
}

/* Create a task and add it to task list at page.
   Expects: text (string): task description, done (bool): true: task is done, false: task is to-do
   Return: undefined
   */
function addTaskToPage(description = "no description", done = false) {
    console.log("addTaskToPage()");

    let checked = "";
    if (done === true) checked = "checked";

    const htmlToAdd = `<li>
                        <label>
                            <input type = "checkbox" oninput="taskChange(this)" ${checked}>
                            <span class="task">${description}</span>
                            <button class="delete-btn" onclick="deleteTaskFromTaskListAtPage(this);"><i class="fas fa-times-circle"></i></button>
                        </label>
                    </li>`;

    // create task
    // get list
    const taskList = document.getElementById("task-list");
    const lastChild = taskList.lastElementChild;
    // add task to list
    if (lastChild != null) {
        lastChild.insertAdjacentHTML('afterend', htmlToAdd);
    } else {
        taskList.insertAdjacentHTML('beforeend', htmlToAdd);
    }
    // console.log("createTask() end");
}

/* Delete task from task list at page. Save remaining tasks.
*   Return: undefined */
function deleteTaskFromTaskListAtPage(button) {
    console.log("deleteTaskFromTaskListAtPage()");
    if (button instanceof HTMLButtonElement) {
        button.parentNode.parentNode.remove();
    }
    saveAllTasks();
}

/* State of task checkbox was changed. Change the state of according task.
    Save all tasks.
    Return: undefined */
function taskChange(inputCheckbox) {
    if (inputCheckbox.checked) {
        // add done class
        inputCheckbox.parentNode.getElementsByClassName("task")[0].classList.add("done");
    } else {
        // remove done class
        inputCheckbox.parentNode.getElementsByClassName("task")[0].classList.remove("done");
    }

    saveAllTasks();
}

/* Add tasks from local storage to page.
*   Return: undefined */
function addTasksFromLocalStorageToPage() {
    // get tasks from store
    const tasks = getTasksFromStore()
    console.log(`tasks from store: ${tasks}`);

    //  add all tasks to page
    for (const i in tasks) {
        const task = tasks[i];
        addTaskToPage(task.description, task.done)
    }
}

/* Get all tasks from store.
* Returns task objects in an array. */
function getTasksFromStore() {
    console.log("getTasksFromStore()");
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

/* Save all tasks to local storage.
*   Return: undefined*/
function saveAllTasks() {
    console.log("saveAllTasks()");
    // get task list
    const taskList = getAllTasksDataFromPage("task-list");
    console.log(`taskList: ${taskList.toString()}`);

    // store list
    const taskListString = JSON.stringify(taskList);
    localStorage.setItem("tasks", taskListString);
    console.log(`taskListString: ${taskListString}`);
}

/* Get task data of all task from pages task list.
    Expects id of pages task list. targetId: string,
    return: array with task objects. Objects are new and contain data from pages task list.*/
function getAllTasksDataFromPage(targetId) {
    // get task list
    const taskList = document.getElementById(targetId);

    // get all label entries
    const labelElements = taskList.getElementsByTagName("label");
    console.log(`labelElements count: ${labelElements.length}`);

    let tasks = [];

    // loop over all labels
    for (let i = 0; i < labelElements.length; i++) {
        // extract values for task object
        let currentLabel = labelElements[i];
        let description = currentLabel.getElementsByTagName("span")[0].innerHTML;
        let isDone = currentLabel.getElementsByTagName("input")[0].checked;
        // console.log(`isDone: ${isDone}`);

        tasks.push(taskFactory(description, isDone)); // add task to task list
    }

    return (tasks);
}

/* Get task object. Expects description (string) of task, done: done state of task
   Return: object with: description (string), done (bool) */
let taskFactory = (description, done) => {
    return {
        description: description,
        done: done
    }
}
