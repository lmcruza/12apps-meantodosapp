import { Component, OnInit } from '@angular/core';

import { Todo } from '../Todo';
import { TodoService } from '../services/todo.service';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    moduleId: module.id,
    selector: 'todos',
    templateUrl: 'todos.component.html'
})
export class TodosComponent implements OnInit {

    todos: Todo[];

    constructor(private _todoService: TodoService) {

    }

    ngOnInit() {
        this.todos = [];
        this._todoService.getTodos()
            .map(res => res.json())
            .subscribe(todos => this.todos = todos);
    }

    addTodo($event, todoText) {
        if ($event.which === 1) {
            var result;
            var newTodo = {
                text: todoText.value;
                isCompleted: false;
            };

            result = this._todoService.saveTodo(newTodo);
            result.subscribe(x => {
                this.todos.push(newTodo);
                todoText.value = '';
            });
        }
    }

    updateStatus(todo: Todo) {
        var _todo = {
            _id: todo._id,
            text: todo.text,
            isCompleted: !todo.isCompleted
        };

        this._todoService.updateTodo(_todo)
            .map(res => res.json())
            .subscribe(data => {
                todo.isCompleted = !todo.isCompleted;
            });
    }

    setEditState(todo: Todo, state) {
        if (state) {
            todo.isEditMode = state;
        } else {
            delete todo.isEditMode;
        }
    }

    updateTodoText($event, todo: Todo) {
        if ($event.which === 13) {
            todo.text = $event.target.value;
            var _todo = {
                _id: todo._id,
                text: todo.text,
                isCompleted: todo.isCompleted
            };

            this._todoService.updateTodo(_todo)
                .map(res => res.json())
                .subscribe(data => {
                    this.setEditState(todo, false);
                });
        }
    }

}