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
                        <label><input type = "checkbox" value = taskText oninput="taskChange(this)"></label>
                        <span class="task">${taskText}</span>
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
