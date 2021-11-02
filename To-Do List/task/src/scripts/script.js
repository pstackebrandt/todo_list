// document.getElementById("add-task-button").addEventListener("onclick", function() {
//     console.log("addTask()");
//     addTask();
// });

function addTaskFromUserInput() {
    console.log("addTask()");

    // get data from #input-task
    let inputTask = document.getElementById("input-task");
    let taskText = inputTask.value;
    // console.log(`task text: ${taskText}`);

    // create new task
    addTaskToPage(taskText, false);

    // clear content of input-task
    inputTask.value = "";
    saveAllTasks();
}

/* Create a task and add it to page.
   Expects: text (string): task description, done (bool): true: task is done, false: task is to-do
   Return: nothing
   */
function addTaskToPage(text = "no description", done = false) {
    console.log("createTask()");

    let checked = "";
    if (done === true) checked = "checked";

    let htmlToAdd = `<li>
                        <label>
                            <input type = "checkbox" oninput="taskChange(this)" ${checked}>
                            <span class="task">${text}</span>
                            <button class="delete-btn" onclick="deleteTask(this);"><i class="fas fa-times-circle"></i></button>
                        </label>
                    </li>`;

    // create task
    // get list
    let list = document.getElementById("task-list");

    let lastChild = list.lastElementChild;
    // add task to list
    if (lastChild != null) {
        lastChild.insertAdjacentHTML('afterend', htmlToAdd);
    } else {
        list.insertAdjacentHTML('beforeend', htmlToAdd);
    }
    // console.log("createTask() end");
}

function deleteTask(button) {
    console.log("deleteTask()");
    button.parentNode.parentNode.remove();
    saveAllTasks();
}

/* Checkbox of task was changed. Check the change.  */
function taskChange(inputCheckbox) {
    // console.log(`classNames: ${inputCheckbox.className}`)
    // console.log(`span child: ${inputCheckbox.parentNode.parentNode.getElementsByTagName("span")[0]}`)
    // console.log(`task child: ${inputCheckbox.parentNode.parentNode.getElementsByClassName("task")[0]}`)

    if (inputCheckbox.checked) {
        // add done class
        // console.log("add done class");
        // inputCheckbox.classList.add("done");
        inputCheckbox.parentNode.getElementsByClassName("task")[0].classList.add("done");
    } else {
        // remove done class
        // console.log("remove done class");
        // inputCheckbox.classList.remove("done");
        inputCheckbox.parentNode.getElementsByClassName("task")[0].classList.remove("done");
    }

    saveAllTasks();
}

/* Add tasks to page  */
function addTasksFromLocalStorageToPage() {
    // get tasks from store
    const tasks = getTasksFromStore()
    console.log(`tasks from store: ${tasks}`);
    // loop over all tasks

    for (const i in tasks){
        const task = tasks[i];
        addTaskToPage(task.description, task.done)
    }

    //  add task to page
}

/* Get all tasks from store.
* Returns task objects in an array. */
function getTasksFromStore() {
    console.log("getTasksFromStore()");
    return JSON.parse(localStorage.getItem("tasks")) || [];
}


function saveAllTasks() {
    console.log("saveAllTasks()");
    // get task list
    let taskList = getAllTasksDataFromPage("task-list");


    console.log(`taskList: ${taskList.toString()}`);
    // stringify task list

    // store list
    let taskListString = JSON.stringify(taskList);
    localStorage.setItem("tasks", taskListString);
    console.log(`taskListString: ${taskListString}`);
}

/* Get task state from task label.
   Return bool: true: task is done; false: not done  */
function getDone(labelString) {
    let isDone = false;
    if (/checked/gm.test(labelString[0])) {
        isDone = true;
    }
    return isDone;
}

/* Get task data of all task from pages task list.
    Expects id of pages task list. targetId: string,
    return: array with task objects. Objects are new and contain data from pages task list.*/
function getAllTasksDataFromPage(targetId) {
    // get task-list by Id
    let taskList = document.getElementById(targetId);

    // get all label entries
    let labelElements = taskList.getElementsByTagName("label");
    console.log(`labelElements count: ${labelElements.length}`);

    let tasks = [];

    // loop over all labels
    for (let i = 0; i < labelElements.length; i++) {
        let currentLabel = labelElements[i];

        // extract values for task object
        let description = currentLabel.getElementsByTagName("span")[0].innerHTML;
        let isDone = currentLabel.getElementsByTagName("input")[0].checked;
        // console.log(`isDone: ${isDone}`);

        // add task
        tasks.push(taskFactory(description, isDone));
    }

    // tasks.push({description: "task to do", done: false});

    return (tasks);
}

/* description: string, done: bool */
let taskFactory = (description, done) => {
    return {
        description: description,
        done: done
    }
}

/* Get description from single element containing the description. */
function getDescription(descriptionElementText) {
    console.log(`getDescription(): descriptionElementText ${descriptionElementText}`);

    let result = /(?<=>)[\s\S]*?(?=<\/)/.exec(descriptionElementText);
    let description = result[0];
    console.log(`getDescription(): description ${description}`);

    return description;
}

/* Save array to local store.
* dataToStore: array of objects,
* keyName: name of the key, string */
function saveToStore(dataToStore, keyName) {
    console.log("saveTasksToStore()");

    let dataToStoreJsonString = JSON.stringify(dataToStore);
    localStorage.setItem(keyName, dataToStoreJsonString);

    console.log(`count of tasks to store: ${dataToStore.length}`);
}