//// <reference path="..\jquery-1.8.d.ts" />
/// <reference path="..\knockout-2.2.d.ts" />
/// <reference path="todo.datacontext.ts" />

module Todo {
    export module Model {
        export interface TodoItemData {
            TodoItemId: string;
            Title: string;
            IsDone: bool;
            TodoListId: string;
        }

        export class TodoItem {
            public ErrorMessage: KnockoutObservableString;
            public IsDone: KnockoutObservableBool;
            public Title: KnockoutObservableString;

            public TodoItemId: string;

            private TodoListId: string;
            private datacontext: Todo.IDatacontext; //datacontext.saveChangedTodoItem(self)
            save: (newValue: any) => void;

            constructor (datacontext: Todo.IDatacontext, data?: TodoItemData) {
                data = data || this.defaultTodoItemData();

                // Persisted properties
                this.TodoItemId = data.TodoItemId;
                this.Title = ko.observable(data.Title);
                this.IsDone = ko.observable(data.IsDone);
                this.TodoListId = data.TodoListId;

                // Non-persisted properties
                this.ErrorMessage = ko.observable();

                this.datacontext = datacontext;

                this.save = (newValue: any): void => { this.datacontext.saveChangedTodoItem(this) };

                // Auto-save when these properties change
                this.IsDone.subscribe(this.save);
                this.Title.subscribe(this.save);
            }

            private defaultTodoItemData(): TodoItemData {
                return {
                    TodoItemId: "0",
                    Title: "",
                    IsDone: false,
                    TodoListId: "0"
                };
            }
        }
    }
}