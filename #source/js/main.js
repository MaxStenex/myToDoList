let todoWorkInput = document.querySelector('.todo-work__input');
let todoAddButton = document.querySelector('.todo-work__add-but');
let todoWorkList = document.querySelector('.todo-list');
let todoSelector = document.querySelector('.todo-work__selector');


todoAddButton.addEventListener('click', todoAdd);
todoSelector.addEventListener('change', todoSelectChange);


function todoAdd(evt) {
   evt.preventDefault();

   //Check for input value emptiness 
   if ((todoWorkInput.value).trim() == '') {
      todoWorkInput.value = '';
      return;
   }

   let todoItem = document.createElement('li');
   let todoItemText = document.createElement('p');
   let todoDeleteBut = document.createElement('button');
   let todoDeleteButImg = document.createElement('img');
   todoDeleteButImg.src = "img/delete.png";

   todoItem.classList.add('todo-list__item');
   todoItemText.classList.add('todo-list__text');
   todoItemText.innerText = todoWorkInput.value;
   todoDeleteBut.classList.add('todo-list__del-but');
   todoDeleteBut.appendChild(todoDeleteButImg);

   todoItem.appendChild(todoItemText);
   todoItem.appendChild(todoDeleteBut);

   todoDeleteBut.addEventListener('click', () => {
      todoDeleteBut.parentElement.remove();
   });
   todoItem.addEventListener('click', (evt) => {
      if (evt.target != todoDeleteBut) {
         todoItemText.classList.toggle('todo-list__text--completed');
      }
   });

   todoWorkList.appendChild(todoItem);
   todoWorkInput.value = '';
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


