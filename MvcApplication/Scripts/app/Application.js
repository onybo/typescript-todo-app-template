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
    new Main().run();
})(Todo || (Todo = {}));
