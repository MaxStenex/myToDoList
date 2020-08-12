let todoWorkInput = document.querySelector('.todo-work__input');
let todoAddButton = document.querySelector('.todo-work__add-but');
let todoWorkList = document.querySelector('.todo-list');
let todoSelector = document.querySelector('.todo-work__selector');
let datas = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
   completed: [],
   notCompleted: [],
};


//Rendering todoItems from localStorage
renderTodoList();


todoAddButton.addEventListener('click', function (evt) {
   evt.preventDefault();
   //Check for input value emptiness 
   let text = todoWorkInput.value;
   if ((text).trim() == '') {
      todoWorkInput.value = '';
      return;
   }
   datas.notCompleted.push(text);
   todoAdd(text);
});
todoSelector.addEventListener('change', todoSelectChange);


//Adding items in localStorage
function datasObjectUpdated() {
   localStorage.setItem('todoList', JSON.stringify(datas));
};

function renderTodoList() {
   if (!datas.completed.length && !datas.notCompleted.length) return;

   for (let i = 0; i < datas.completed.length; i++) {
      let text = datas.completed[i];
      todoAdd(text, true);
   }

   for (let j = 0; j < datas.notCompleted.length; j++) {
      let text = datas.notCompleted[j];
      todoAdd(text);
   }
};

//DOM manipulations with todoList item (adding, changing state , etc...)
function todoAdd(text, completed) {
   let todoItem = document.createElement('li');
   let todoItemText = document.createElement('p');
   let todoDeleteBut = document.createElement('button');
   let todoDeleteButImg = document.createElement('img');
   let todoCompleted = () => {
      return todoItemText.classList.contains('todo-list__text--completed') ? true : false;
   };

   if (completed) {
      todoItemText.classList.add('todo-list__text--completed')
   }
   todoDeleteButImg.src = "img/delete.png";

   todoItem.classList.add('todo-list__item');
   todoItemText.classList.add('todo-list__text');
   todoItemText.innerText = text;
   todoDeleteBut.classList.add('todo-list__del-but');
   todoDeleteBut.appendChild(todoDeleteButImg);

   todoItem.appendChild(todoItemText);
   todoItem.appendChild(todoDeleteBut);

   todoDeleteBut.addEventListener('click', () => {
      if (todoCompleted()) {
         datas.completed.splice(datas.completed.indexOf(todoItemText.innerText), 1);
      } else {
         datas.notCompleted.splice(datas.notCompleted.indexOf(todoItemText.innerText), 1);
      };
      datasObjectUpdated();
      todoDeleteBut.parentElement.remove();
   });

   todoItem.addEventListener('click', (evt) => {
      if (evt.target != todoDeleteBut) {
         if (todoCompleted()) {
            todoItemText.classList.toggle('todo-list__text--completed');
            datas.completed.splice(datas.completed.indexOf(text), 1);
            datas.notCompleted.push(text);
         } else {
            todoItemText.classList.toggle('todo-list__text--completed');
            datas.notCompleted.splice(datas.notCompleted.indexOf(text), 1);
            datas.completed.push(text);
         }
         datasObjectUpdated();
      }
   });

   todoWorkList.appendChild(todoItem);
   todoWorkInput.value = '';
   datasObjectUpdated();
};

function todoSelectChange(evt) {
   let workItemsText = todoWorkList.querySelectorAll('.todo-list__text');
   for (let i = 0; i < workItemsText.length; i++) {
      workItemsText[i].parentElement.classList.remove('todo-list__item--non-selected');
   };

   if (todoSelector.value == 'completed') {
      for (let i = 0; i < workItemsText.length; i++) {
         if (!workItemsText[i].classList.contains('todo-list__text--completed')) {
            workItemsText[i].parentElement.classList.add('todo-list__item--non-selected');
         }
      };
   };

   if (todoSelector.value == 'non-completed') {
      for (let i = 0; i < workItemsText.length; i++) {
         if (workItemsText[i].classList.contains('todo-list__text--completed')) {
            workItemsText[i].parentElement.classList.add('todo-list__item--non-selected');
         }
      };
   };
};


