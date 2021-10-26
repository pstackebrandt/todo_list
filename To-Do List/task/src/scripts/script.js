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
}

/* create task, add to page
   text: task description, done: */
function createTask(text = "no description", done = false) {
    console.log("createTask()");

    let checked = "";
    if (done === true) checked = "checked";

    // create task
    let htmlToAdd = `<li>
                        <label>
                            <input type = "checkbox" oninput="taskChange(this)" ${checked}>
                        </label>
                        <span class="task">${text}</span>
                        <button class="delete-btn" onclick="deleteTask(this);"><i class="fas fa-times-circle"></i></button>
                    </li>`;

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
    button.parentNode.remove();
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
        inputCheckbox.parentNode.parentNode.getElementsByClassName("task")[0].classList.add("done");
    } else {
        // remove done class
        // console.log("remove done class");
        // inputCheckbox.classList.remove("done");
        inputCheckbox.parentNode.parentNode.getElementsByClassName("task")[0].classList.remove("done");
    }
}

/* Add tasks to page  */
function addTasks() {
    // get tasks from store
    // loop over all tasks
    //  add task to page
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