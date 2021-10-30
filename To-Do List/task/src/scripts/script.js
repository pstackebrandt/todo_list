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
    createTask(taskText, false);

    // clear content of input-task
    inputTask.value = "";
    saveAllTasks();
}

/* create task, add to page
   text: task description, done: */
function createTask(text = "no description", done = false) {
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
function addTasks() {
    // get tasks from store
    // loop over all tasks
    //  add task to page
}

function saveAllTasks() {
    console.log("saveAllTasks()");
    // get task list
    let taskList = extractAllTasksFromPage("task-list");
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

/* return: array with all task objects */
function extractAllTasksFromPage(targetId) {  // string
    // get task-list by Id
    let taskList = document.getElementById(targetId);
    // let labelCollection = taskList.getElementsByTagName("label");

    // get all label entries
    let taskListString = taskList.outerHTML;

    let labelRegEx = /<label[\s\S]*?<\/label>/mg;
    let labelResult;
    while (labelResult = labelRegEx.exec(taskListString)) {
        console.log(labelResult, labelRegEx.lastIndex);

        // extract values for new object
        let isDone = getDone(labelResult);
        let descriptionElementString = getDescriptionElementString(labelResult[0]);

        let description = getDescription(descriptionElementString);

        console.log(`isDone: ${isDone}`);
    }

    console.log(`task list element as string: ${taskListString}`);

    // create array
    let tasks = [];
    let task = {description: "first task to do", done: false};
    tasks.push(task);
    tasks.push({description: "second task to do", done: false});

    // loop over all matches

    //   create task entry { checked = bool, description = string }
    //   checked: bool: = check whether match contains "checked"
    //   description: text = get text of span element

    return (tasks)
}

/* Get the element string containing the description. */
function getDescriptionElementString(labelString) {
    console.log(`getDescriptionElementString(): labelString ${labelString}`);

    let result = /<span[\s\S]*?<\/span>/.exec(labelString);
    let descriptionElementString = result[0];

    console.log(`getDescriptionElementString(): descriptionElementString ${descriptionElementString}`);

    return descriptionElementString;
}

/* Get description from single element containing the description. */
function getDescription(descriptionElementText) {
    console.log(`getDescription(): descriptionElementText ${descriptionElementText}`);

    let result = /(?<=>)[\s\S]*?(?=<\/)/.exec(descriptionElementText);
    let description = result[0];
    console.log(`getDescription(): description ${description}`);

    return description;
}

function getTasksFromStore() {
    console.log("getTasksFromStore()");
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    return taskList;
    console.log(`tasks from store: ${taskList}`);
}

function saveTasksToStore(tasks) {
    console.log("saveTasksToStore()");
    console.log(`tasks to store: ${taskList}`);
}