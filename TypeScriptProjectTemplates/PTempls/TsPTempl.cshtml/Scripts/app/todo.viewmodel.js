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
                _this.todoLists.unshift(todoList)// Insert new TodoList at the front
                ;
            };
            this.deleteTodoList = function (todoList) {
                _this.todoLists.remove(todoList);
                datacontext.deleteTodoList(todoList).fail(deleteFailed);
                function deleteFailed() {
                    showTodoList(todoList)// re-show the restored list
                    ;
                }
            };
            datacontext.getTodoLists(this.todoLists, this.error)// load TodoLists
            ;
        }
        return TodoListViewModel;
    })();
    Todo.TodoListViewModel = TodoListViewModel;    
})(Todo || (Todo = {}));
//@ sourceMappingURL=todo.viewmodel.js.map
