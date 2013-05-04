/// <reference path="..\jquery.d.ts" />
/// <reference path="..\knockout-2.2.d.ts" />
/// <reference path="todo.todoitem.ts" />

module Todo {
    export module Model {

        export interface TodoListData {
            TodoListId: string;
            UserId: string;
            Title: string;
            Todos: TodoItemData[];
        }

        export class TodoList {
            public ErrorMessage: KnockoutObservableString;
            public IsEditingListTitle: KnockoutObservableBool;
            public NewTodoTitle: KnockoutObservableString;
            public Title: KnockoutObservableString;
            public Todos: KnockoutObservableArray;
            public deleteTodo: Function;

            public TodoListId: string;
            public UserId: string;

            private datacontext: Todo.IDatacontext;  
            private save:  (newValue: string) => void;

            constructor (datacontext: Todo.IDatacontext, data?: TodoListData) {
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

                this.deleteTodo = (todoItem: Todo.Model.TodoItem): JQueryPromise => {
                    var self = this;
                    return this.datacontext.deleteTodoItem(todoItem)
                        .done(function () { self.Todos.remove(todoItem); });
                };
                this.save = (newValue: string): void => { this.datacontext.saveChangedTodoList(this); };
                
                // Auto-save when these properties change
                this.Title.subscribe(this.save);
                this.Todos = ko.observableArray(this.importTodoItems(data.Todos));

            }

            private defaultTodoListData(): TodoListData {
                return {
                    TodoListId: "0",
                    UserId: "",
                    Title: "",
                    Todos: []
                };
            }

            // convert raw todoItem data objects into array of TodoItems
            private importTodoItems(todoItems) {
                var self = this;
                return $.map(todoItems || [],
                    function (todoItemData) {
                        return self.datacontext.createTodoItem(todoItemData);
                });
            }
    
            addTodo() {
                if (this.NewTodoTitle()) { // need a title to save
                    var todoItem = this.datacontext.createTodoItem(
                    {
                        TodoItemId: "0",
                        Title: this.NewTodoTitle(),
                        IsDone: false,
                        TodoListId: this.TodoListId
                    });
                    this.Todos.push(todoItem);
                    this.datacontext.saveNewTodoItem(todoItem);
                    this.NewTodoTitle("");
                }
            }
        }
    }
}
