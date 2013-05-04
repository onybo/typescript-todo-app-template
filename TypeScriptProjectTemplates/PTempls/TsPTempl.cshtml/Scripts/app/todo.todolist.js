/// <reference path="..\jquery.d.ts" />
/// <reference path="..\knockout-2.2.d.ts" />
/// <reference path="todo.todoitem.ts" />
var Todo;
(function (Todo) {
    (function (Model) {
        var TodoList = (function () {
            function TodoList(datacontext, data) {
                var _this = this;
                data = data || this.defaultTodoListData();
                // Persisted properties
                this.TodoListId = data.TodoListId;
                this.UserId = data.UserId || "to be replaced";
                this.Title = ko.observable(data.Title || "My todos");
                // Non-persisted properties
                this.IsEditingListTitle = ko.observable(false);
                this.NewTodoTitle = ko.observable();
                this.ErrorMessage = ko.observable();
                this.datacontext = datacontext;
                this.deleteTodo = function (todoItem) {
                    var self = _this;
                    return _this.datacontext.deleteTodoItem(todoItem).done(function () {
                        self.Todos.remove(todoItem);
                    });
                };
                this.save = function (newValue) {
                    _this.datacontext.saveChangedTodoList(_this);
                };
                // Auto-save when these properties change
                this.Title.subscribe(this.save);
                this.Todos = ko.observableArray(this.importTodoItems(data.Todos));
            }
            TodoList.prototype.defaultTodoListData = function () {
                return {
                    TodoListId: "0",
                    UserId: "",
                    Title: "",
                    Todos: []
                };
            };
            TodoList.prototype.importTodoItems = // convert raw todoItem data objects into array of TodoItems
            function (todoItems) {
                var self = this;
                return $.map(todoItems || [], function (todoItemData) {
                    return self.datacontext.createTodoItem(todoItemData);
                });
            };
            TodoList.prototype.addTodo = function () {
                if(this.NewTodoTitle()) {
                    // need a title to save
                    var todoItem = this.datacontext.createTodoItem({
                        TodoItemId: "0",
                        Title: this.NewTodoTitle(),
                        IsDone: false,
                        TodoListId: this.TodoListId
                    });
                    this.Todos.push(todoItem);
                    this.datacontext.saveNewTodoItem(todoItem);
                    this.NewTodoTitle("");
                }
            };
            return TodoList;
        })();
        Model.TodoList = TodoList;        
    })(Todo.Model || (Todo.Model = {}));
    var Model = Todo.Model;
})(Todo || (Todo = {}));
//@ sourceMappingURL=todo.todolist.js.map
