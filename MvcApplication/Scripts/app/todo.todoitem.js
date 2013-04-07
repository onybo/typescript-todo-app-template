//// <reference path="..\jquery-1.8.d.ts" />
/// <reference path="..\knockout-2.2.d.ts" />
/// <reference path="todo.datacontext.ts" />
var Todo;
(function (Todo) {
    (function (Model) {
        var TodoItem = (function () {
            function TodoItem(datacontext, data) {
                var _this = this;
                data = data || this.defaultTodoItemData();
                // Persisted properties
                this.TodoItemId = data.TodoItemId;
                this.Title = ko.observable(data.Title);
                this.IsDone = ko.observable(data.IsDone);
                this.TodoListId = data.TodoListId;
                // Non-persisted properties
                this.ErrorMessage = ko.observable();
                this.datacontext = datacontext;
                this.save = function (newValue) {
                    _this.datacontext.saveChangedTodoItem(_this);
                };
                // Auto-save when these properties change
                this.IsDone.subscribe(this.save);
                this.Title.subscribe(this.save);
            }
            TodoItem.prototype.defaultTodoItemData = function () {
                return {
                    TodoItemId: "0",
                    Title: "",
                    IsDone: false,
                    TodoListId: "0"
                };
            };
            return TodoItem;
        })();
        Model.TodoItem = TodoItem;        
    })(Todo.Model || (Todo.Model = {}));
    var Model = Todo.Model;
})(Todo || (Todo = {}));
//@ sourceMappingURL=todo.todoitem.js.map
