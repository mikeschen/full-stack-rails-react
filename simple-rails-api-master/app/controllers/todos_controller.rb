class TodosController < ApplicationController
    before_action :set_todo, only: [:show, :update, :destroy]

    def index 
        @todos = Todo.all
        json_response(@todos)
    end

    def create
        @todo = Todo.create!(todo_params)
        #  is equivalent to .new followed by .save! (throws an error if saving fails).
        json_response(@todo, :created)
    end

    def show 
        json_response(@todo)
    end

    def update
        @todo.update(todo_params)
        head :no_content 
    end

    def destroy
        @todo.destroy
        head :no_content
    end

    private

    def todo_params
        params.permit(:title, :created_by)
    end

    def set_todo
        @todo = Todo.find(params[:id])
    end
end
