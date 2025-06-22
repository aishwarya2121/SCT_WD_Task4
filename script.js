window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const dateTimeInput = document.querySelector("#new-task-datetime");
  const list_el = document.querySelector("#tasks");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskText = input.value.trim();
    const taskDateTime = dateTimeInput.value;

    if (taskText === "") {
      alert("Please enter a task");
      return;
    }

    // Task wrapper
    const task_el = document.createElement("div");
    task_el.classList.add("task");

    // Content wrapper
    const content_el = document.createElement("div");
    content_el.classList.add("content");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = taskText;
    task_input_el.setAttribute("readonly", "readonly");

    content_el.appendChild(checkbox);
    content_el.appendChild(task_input_el);

    // DateTime display
    if (taskDateTime) {
      const timeSpan = document.createElement("span");
      timeSpan.classList.add("text");
      timeSpan.style.fontSize = "0.85rem";
      timeSpan.style.color = "#aaa";
      timeSpan.innerText = `🕒 Due : ${new Date(taskDateTime).toLocaleString()}`;
      content_el.appendChild(timeSpan);
    }

    // Actions
    const actions_el = document.createElement("div");
    actions_el.classList.add("actions");

    const edit_btn = document.createElement("button");
    edit_btn.classList.add("edit");
    edit_btn.innerText = "Edit";

    const delete_btn = document.createElement("button");
    delete_btn.classList.add("delete");
    delete_btn.innerText = "Delete";

    actions_el.appendChild(edit_btn);
    actions_el.appendChild(delete_btn);

    task_el.appendChild(content_el);
    task_el.appendChild(actions_el);

    list_el.appendChild(task_el);

    input.value = "";
    dateTimeInput.value = "";

    // Completed toggle
    checkbox.addEventListener("change", () => {
      task_el.classList.toggle("completed", checkbox.checked);
    });

    //  Edit
    edit_btn.addEventListener("click", () => {
      if (edit_btn.innerText.toLowerCase() === "edit") {
        edit_btn.innerText = "Save";
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
      } else {
        edit_btn.innerText = "Edit";
        task_input_el.setAttribute("readonly", "readonly");
      }
    });

    //  Delete
    delete_btn.addEventListener("click", () => {
      list_el.removeChild(task_el);
    });
  });
});

   
