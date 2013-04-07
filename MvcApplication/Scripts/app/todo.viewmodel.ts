/// <reference path="..\knockout-2.2.d.ts" />
/// <reference path="todo.datacontext.ts" />

declare var todoApp;

module Todo {
    export class TodoListViewModel {
        public todoLists: KnockoutObservableArray;
        public error: KnockoutObservableString;

        public addTodoList: () => void;
        public deleteTodoList: (todoList: Todo.Model.TodoList) => void;

        private ko: KnockoutStatic;
        private datacontext: IDatacontext;
        
        constructor(ko: KnockoutStatic, datacontext: Todo.IDatacontext) {
            this.todoLists = ko.observableArray();
            this.error = ko.observable();

            this.addTodoList = () => {
                var todoList = datacontext.createTodoList();
                todoList.IsEditingListTitle(true);
                datacontext.saveNewTodoList(todoList)
                    .then(addSucceeded, addFailed);

                function addSucceeded() {
                    showTodoList(todoList);
                }
                var addFailed = () => {
                    this.error("Save of new TodoList failed");
                }
            }

            var showTodoList = (todoList: Todo.Model.TodoList) => {
                this.todoLists.unshift(todoList); // Insert new TodoList at the front
            }

            this.deleteTodoList = (todoList: Todo.Model.TodoList) => {
                this.todoLists.remove(todoList);
                datacontext.deleteTodoList(todoList)
                    .fail(deleteFailed);

                function deleteFailed() {
                    showTodoList(todoList); // re-show the restored list
                }
            };

            datacontext.getTodoLists(this.todoLists, this.error); // load TodoLists
        }
    }
}