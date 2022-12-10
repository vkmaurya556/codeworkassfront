<script>

import Api from '../Api';
import TodoNew from './TodoNew.vue'
export default {
    name: "TodoShow`",
    data() {
        return {
            todos: []
        }
    },
    components: {
        TodoNew,
    },
    mounted() {
        Api.get('/display')
            .then((res) => {
                //Perform Success Action
                let response = (res.data);
                console.log(response);
                if (response.status) {
                    this.todos = response.data;
                }
            })
            .catch((error) => {
                // error.response.status Check status code
            }).finally(() => {
                //Perform action in always
            });
    },
    methods: {
        newTodo() {
            // this.todos = [];
            if (this.todos[0].id == 0 && this.todos[0].deleted_at == null) {
                alert("Please Fill Previous Todo");
                return;
            }
            this.todos = [{ todo: "", id: 0, deleted_at: null, invisible: true }].concat(this.todos);
            console.log(this.todos);
        },
        removeTodo(index) {
            this.todos[index].deleted_at = 1;
        },
        updateTodo(index, updateTodo) {
            this.todos[index] = updateTodo;
        }
    }

}
</script>
<template>
    <div>
        <div class="bg-sky-500 text-white mb-4">
            <div class="container mx-auto py-2">
                <div class="flex justify-between">
                    <h1 class="text-4xl text-center">
                        My Todo
                    </h1>
                    <div>
                        <button to="/new" @click="newTodo" class="btn-primary">Add New</button>
                    </div>

                </div>
            </div>
        </div>
        <div class="container mx-auto">
            <div class="py-2">
                <div v-for="(todo, index) in todos" v-bind:key="todo.id">
                    <TodoNew :data="todo" :index="index" :deletefunc="removeTodo" :updateTodo="updateTodo"
                        v-if="todo.deleted_at == null">
                    </TodoNew>
                </div>
            </div>
        </div>
    </div>
</template>
