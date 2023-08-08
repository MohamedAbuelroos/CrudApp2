// function to validata form
function validateForm() {
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let adress = document.getElementById("adress").value;
  let email = document.getElementById("email").value;

  if (name == "") {
    swal("Name Is Required!", {
      icon: "error",
    });
    return false;
  }

  if (age == "" || age < 10) {
    swal("Age Is Required And Must Be Larger Than 10 Years Old", {
      icon: "error",
    });
    return false;
  }

  if (adress == "") {
    swal("Adress Is Required!", {
      icon: "error",
    });
    return false;
  }

  if (email == "") {
    swal("email Is Required", {
      icon: "error",
    });
    return false;
  } else if (!email.includes("@")) {
    swal("Invalid Email It Must Be Contain a '@' and '.' ", {
      icon: "error",
    });
    return false;
  }
  return true;
}
// get data from local storage or return an impty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// functin to show data

function showData() {
  let taskList = document.getElementById("tbody");

  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    let listItem = document.createElement("tr");
    listItem.innerHTML = `
      <td> ${task[0].toUpperCase()} </td>
      <td> ${task[1]} </td>
      <td> ${task[2].toUpperCase()} </td>
      <td> ${task[3]} </td>
      <td> <button class="edit" onclick="editTask(${index})">Edit</button>
      <button class="delete" onclick="deleteTask(${index})">Delete</button>
      </td>
    `;
    taskList.appendChild(listItem);
  });
}
window.onload = showData();

//function to add data or update
function addTask() {
  let name = document.getElementById("name");
  let age = document.getElementById("age");
  let adress = document.getElementById("adress");
  let email = document.getElementById("email");

  if (validateForm() == true) {
    let newTask = [name.value, age.value, adress.value, email.value];
    if (newTask !== "") {
      const editIndex = document.getElementById("editIndex").value;
      if (editIndex !== "") {
        tasks[editIndex] = newTask;
      } else {
        tasks.push(newTask);
      }
      localStorage.setItem("tasks", JSON.stringify(tasks));
      showData();
      name.value = "";
      age.value = "";
      adress.value = "";
      email.value = "";
      document.getElementById("editIndex").value = "";
    }
  }
  document.querySelector(".update").style.display = "none";
}

// function to edit task

function editTask(index) {
  let name = document.getElementById("name");
  let age = document.getElementById("age");
  let adress = document.getElementById("adress");
  let email = document.getElementById("email");

  name.value = tasks[index][0];
  age.value = tasks[index][1];
  adress.value = tasks[index][2];
  email.value = tasks[index][3];
  document.getElementById("editIndex").value = index;
  document.querySelector(".update").style.display = "inline-block";
}

// function to delete task

function deleteTask(index) {
  swal({
    title: `Are You Sure You Want To Delete ${tasks[index][0]}`,
    text: "Cancell If You Want",
    icon: "warning",
    button: true,
  });

  swal({
    title: `Are You Sure You Want To Delete ${tasks[index][0]}`,
    text: "Cancell If You Want",
    icon: "warning",
    buttons: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Your file has been deleted!", {
        icon: "success",
      });
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      showData();
    } else {
      swal("Your file is safe!", {
        icon: "success",
      });
    }
  });
}

// function to delete all tasks

function deleteAll() {
  tasks = []
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showData()
}
