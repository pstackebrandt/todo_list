// document.getElementById("add-task-button").addEventListener("onclick", function() {
//     console.log("addTask()");
//     addTask();
// });

let nextTaskNumber = 3;

function addTask() {
    console.log("addTask()");

    // get data from #input-task
    let taskText = document.getElementById("input-task").value;
    console.log(`task text: ${taskText}`);

    // create new task
    createTask(taskText);
    // clear content of input-task
}

// create task, add to list
function createTask(taskText) {
    console.log("createTask()");

    // create task
    let htmlToAdd = `<li>
                        <label><input type = "checkbox" value = taskText></label>
                        <span className="task">${taskText}</span>
                        <button className="delete-btn">Delete</button>
                    </li>`;

    // get list
    let list = document.getElementById("task-list");
    list.lastElementChild.insertAdjacentHTML('afterend', htmlToAdd);

    // add task to list
    console.log("createTask() end");
}

function test() {
    console.log("test()");
}
