
module Todo {
    export interface IDatacontext {
        getTodoLists(todoListObservable: (any) => void , errorObservable: (string) => void ): any;
        createTodoItem(data?: Todo.Model.TodoItemData): Todo.Model.TodoItem;
        createTodoList(data?: Todo.Model.TodoListData): Todo.Model.TodoList;
        saveNewTodoItem(todoItem: Todo.Model.TodoItem): JQueryPromise;
        saveNewTodoList(todoList: Todo.Model.TodoList): JQueryPromise;
        saveChangedTodoItem(todoItem: Todo.Model.TodoItem): JQueryPromise;
        saveChangedTodoList(todoList: Todo.Model.TodoList): JQueryPromise;
        deleteTodoItem(todoItem: Todo.Model.TodoItem): JQueryPromise;
        deleteTodoList(todoList: Todo.Model.TodoList): JQueryPromise;
    }

    export class Datacontext implements IDatacontext {
        getTodoLists(todoListObservable: (any) => void , errorObservable: (string) => void ): any {
            var self = this;
            return this.ajaxRequest("get", this.todoListUrl())
                .done(getSucceeded)
                .fail(getFailed);

            function getSucceeded(data) {
                var mappedTodoLists = $.map(data, function (list) { return self.createTodoList(list); });
                todoListObservable(mappedTodoLists);
            }

            function getFailed() {
                errorObservable("Error retrieving todo lists.");
            }
        }

        createTodoItem(data?: Todo.Model.TodoItemData): Todo.Model.TodoItem {
            return new Todo.Model.TodoItem(this, data); // TodoItem is injected by model.js
        }

        createTodoList(data?: Todo.Model.TodoListData): Todo.Model.TodoList {
            return new Todo.Model.TodoList(this, data); // TodoList is injected by model.js
        }

        saveNewTodoItem(todoItem: Todo.Model.TodoItem): JQueryPromise {
            this.clearErrorMessage(todoItem);
            return this.ajaxRequest("post", this.todoItemUrl(), todoItem)
                .done(function (result: Todo.Model.TodoItem) {
                    todoItem.TodoItemId = result.TodoItemId;
                })
                .fail(function () {
                    todoItem.ErrorMessage("Error adding a new todo item.");
                });
        }

        saveNewTodoList(todoList: Todo.Model.TodoList): JQueryPromise {
            this.clearErrorMessage(todoList);
            return this.ajaxRequest("post", this.todoListUrl(), todoList)
                .done(function (result: Todo.Model.TodoList) {
                    todoList.TodoListId = result.TodoListId;
                    todoList.UserId = result.UserId;
                })
                .fail(function () {
                    todoList.ErrorMessage("Error adding a new todo list.");
                });
        }

        deleteTodoItem(todoItem: Todo.Model.TodoItem): JQueryPromise {
            return this.ajaxRequest("delete", this.todoItemUrl(todoItem.TodoItemId))
                .fail(function () {
                    todoItem.ErrorMessage("Error removing todo item.");
                });
        }

        deleteTodoList(todoList: Todo.Model.TodoList): JQueryPromise {
            return this.ajaxRequest("delete", this.todoListUrl(todoList.TodoListId))
                .fail(function () {
                    todoList.ErrorMessage("Error removing todo list.");
                });
        }

        saveChangedTodoItem(todoItem: Todo.Model.TodoItem): JQueryPromise {
            this.clearErrorMessage(todoItem); 
            return this.ajaxRequest("put", this.todoItemUrl(todoItem.TodoItemId), todoItem)
                .fail(function (jqXHR, textStatus) {
                    todoItem.ErrorMessage("Error updating todo item." + textStatus);
                });
        }

        saveChangedTodoList(todoList: Todo.Model.TodoList): JQueryPromise {
            this.clearErrorMessage(todoList);
            return this.ajaxRequest("put", this.todoListUrl(todoList.TodoListId), todoList)
                .fail(function (jqXHR, textStatus) {
                    todoList.ErrorMessage("Error updating the todo list title. Please make sure it is non-empty." + textStatus);
                });
        }

        private clearErrorMessage(entity)
        {
            if (entity.ErrorMessage != null) {
                entity.ErrorMessage(null);
            }
        }

        private ajaxRequest(type: string, url: string, data?: any): JQueryPromise { // Ajax helper
            var options = {
                dataType: "json",
                contentType: "application/json",
                cache: false,
                type: type,
                data: ko.toJSON(data)
            };
            return $.ajax(url, options);
        }

        // routes
        private todoListUrl(id?: string): string { return "/api/todolist/" + (id || ""); }
        private todoItemUrl(id?: string): string { return "/api/todo/" + (id || ""); }
    }
}