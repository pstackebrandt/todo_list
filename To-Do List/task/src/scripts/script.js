// document.getElementById("add-task-button").addEventListener("onclick", function() {
//     console.log("addTask()");
//     addTask();
// });

function addTask() {
    console.log("addTask()");

    // get data from #input-task
    let inputTask = document.getElementById("input-task");
    let taskText = inputTask.value;
    // console.log(`task text: ${taskText}`);

    // create new task
    createTask(taskText);

    // clear content of input-task
    inputTask.value = "";
}

// create task, add to list
function createTask(taskText) {
    console.log("createTask()");

    // create task
    let htmlToAdd = `<li>
                        <label><input type = "checkbox" value = taskText></label>
                        <span class="task">${taskText}</span>
                        <button class="delete-btn" onclick="deleteTask(this);">Delete</button>
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
