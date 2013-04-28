var Todo;
(function (Todo) {
    var TodoListViewModel = (function () {
        function TodoListViewModel(ko, datacontext) {
            var _this = this;
            this.todoLists = ko.observableArray();
            this.error = ko.observable();
            this.addTodoList = function () {
                var todoList = datacontext.createTodoList();
                todoList.IsEditingListTitle(true);
                datacontext.saveNewTodoList(todoList).then(addSucceeded, addFailed);
                function addSucceeded() {
                    showTodoList(todoList);
                }
                var addFailed = function () {
                    _this.error("Save of new TodoList failed");
                };
            };
            var showTodoList = function (todoList) {
                _this.todoLists.unshift(todoList);
            };
            this.deleteTodoList = function (todoList) {
                _this.todoLists.remove(todoList);
                datacontext.deleteTodoList(todoList).fail(deleteFailed);
                function deleteFailed() {
                    showTodoList(todoList);
                }
            };
            datacontext.getTodoLists(this.todoLists, this.error);
        }
        return TodoListViewModel;
    })();
    Todo.TodoListViewModel = TodoListViewModel;    
})(Todo || (Todo = {}));
