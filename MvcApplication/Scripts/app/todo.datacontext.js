/// <reference path="..\jquery-1.8.d.ts" />
/// <reference path="..\jquery.validation-1.10.d.ts" />
/// <reference path="..\knockout-2.2.d.ts" />
/// <reference path="todo.todolist.ts" />
/// <reference path="todo.todoitem.ts" />
var Todo;
(function (Todo) {
    var Datacontext = (function () {
        function Datacontext() { }
        Datacontext.prototype.getTodoLists = function (todoListObservable, errorObservable) {
            var self = this;
            return this.ajaxRequest("get", this.todoListUrl()).done(getSucceeded).fail(getFailed);
            function getSucceeded(data) {
                var mappedTodoLists = $.map(data, function (list) {
                    return self.createTodoList(list);
                });
                todoListObservable(mappedTodoLists);
            }
            function getFailed() {
                errorObservable("Error retrieving todo lists.");
            }
        };
        Datacontext.prototype.createTodoItem = function (data) {
            return new Todo.Model.TodoItem(this, data);// TodoItem is injected by model.js
            
        };
        Datacontext.prototype.createTodoList = function (data) {
            return new Todo.Model.TodoList(this, data);// TodoList is injected by model.js
            
        };
        Datacontext.prototype.saveNewTodoItem = function (todoItem) {
            this.clearErrorMessage(todoItem);
            return this.ajaxRequest("post", this.todoItemUrl(), todoItem).done(function (result) {
                todoItem.TodoItemId = result.TodoItemId;
            }).fail(function () {
                todoItem.ErrorMessage("Error adding a new todo item.");
            });
        };
        Datacontext.prototype.saveNewTodoList = function (todoList) {
            this.clearErrorMessage(todoList);
            return this.ajaxRequest("post", this.todoListUrl(), todoList).done(function (result) {
                todoList.TodoListId = result.TodoListId;
                todoList.UserId = result.UserId;
            }).fail(function () {
                todoList.ErrorMessage("Error adding a new todo list.");
            });
        };
        Datacontext.prototype.deleteTodoItem = function (todoItem) {
            return this.ajaxRequest("delete", this.todoItemUrl(todoItem.TodoItemId)).fail(function () {
                todoItem.ErrorMessage("Error removing todo item.");
            });
        };
        Datacontext.prototype.deleteTodoList = function (todoList) {
            return this.ajaxRequest("delete", this.todoListUrl(todoList.TodoListId)).fail(function () {
                todoList.ErrorMessage("Error removing todo list.");
            });
        };
        Datacontext.prototype.saveChangedTodoItem = function (todoItem) {
            this.clearErrorMessage(todoItem);
            return this.ajaxRequest("put", this.todoItemUrl(todoItem.TodoItemId), todoItem).fail(function () {
                todoItem.ErrorMessage("Error updating todo item.");
            });
        };
        Datacontext.prototype.saveChangedTodoList = function (todoList) {
            this.clearErrorMessage(todoList);
            return this.ajaxRequest("put", this.todoListUrl(todoList.TodoListId), todoList).fail(function () {
                todoList.ErrorMessage("Error updating the todo list title. Please make sure it is non-empty.");
            });
        };
        Datacontext.prototype.clearErrorMessage = function (entity) {
            if(entity.ErrorMessage != null) {
                entity.ErrorMessage(null);
            }
        };
        Datacontext.prototype.ajaxRequest = function (type, url, data) {
            // Ajax helper
            var options = {
                dataType: "json",
                contentType: "application/json",
                cache: false,
                type: type,
                data: ko.toJSON(data)
            };
            return $.ajax(url, options);
        };
        Datacontext.prototype.todoListUrl = // routes
        function (id) {
            return "/api/todolist/" + (id || "");
        };
        Datacontext.prototype.todoItemUrl = function (id) {
            return "/api/todo/" + (id || "");
        };
        return Datacontext;
    })();
    Todo.Datacontext = Datacontext;    
})(Todo || (Todo = {}));
//@ sourceMappingURL=todo.datacontext.js.map
