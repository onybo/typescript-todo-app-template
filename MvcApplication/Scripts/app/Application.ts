/// <reference path="todo.todoitem.ts" / >
/// <reference path="todo.todolist.ts" />
/// <reference path="todo.viewmodel.ts" />

module Todo {
    todoApp = {};
    todoApp.datacontext = new Todo.Datacontext();
    todoApp.datacontext.TodoItem = Todo.Model.TodoItem;
    todoApp.datacontext.TodoList = Todo.Model.TodoList;

    todoApp.todoListViewModel = new Todo.TodoListViewModel(ko, todoApp.datacontext);
    ko.applyBindings(todoApp.todoListViewModel);
}