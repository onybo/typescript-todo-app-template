/// <reference path="todo.todolist.ts" />
/// <reference path="todo.viewmodel.ts" />
var Todo;
(function (Todo) {
    var Main = (function () {
        function Main() { }
        Main.prototype.run = function () {
            todoApp = {
            };
            todoApp.datacontext = new Todo.Datacontext();
            todoApp.datacontext.TodoItem = Todo.Model.TodoItem;
            todoApp.datacontext.TodoList = Todo.Model.TodoList;
            todoApp.todoListViewModel = new Todo.TodoListViewModel(ko, todoApp.datacontext);
            ko.applyBindings(todoApp.todoListViewModel);
        };
        return Main;
    })();
    Todo.Main = Main;    
})(Todo || (Todo = {}));
//@ sourceMappingURL=Application.js.map
