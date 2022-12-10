<template>
    <div @dblclick="this.invisible = true;" class="shadow-md my-5 hover:shadow-lg hover:shadow-gray-400 p-3 border">
        <div v-if="invisible == false" class="flex justify-between">
            <div>
                <!-- {{ index + 1 }} -->
                {{ form.todo }}
            </div>
            <div>
                <button class="btn-danger p-2" @click="deleteTodo">
                    <Trash></Trash>
                </button>
            </div>
        </div>
        <form v-on:submit.prevent="submitForm" v-if="invisible == true">
            <input type="hidden" v-model="form.id">
            <label class="block">
                <textarea type="text" name="todo" v-model="form.todo" autofocus></textarea>
            </label>
            <div class="text-center">
                <button type='submit' class="btn-primary mt-4">{{ form.id == 0 ? "Add" : "Update" }}</button>
                <button class="btn-danger" @click="deleteTodo">
                    Delete
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import swal from 'sweetalert';
import Api from '../Api.ts';
import Trash from '../components/icons/trash.vue'
export default {
    data() {
        return {
            invisible: false,
            form: {
                id: 0,
                todo: '',
            }
        }
    },
    components: {
        Trash
    },
    props: ['data', "index", "deletefunc", "updateTodo"],
    mounted() {
        console.log(this.data);
        if (this.data !== undefined) {
            this.form.id = this.data.id;
            this.form.todo = this.data.todo;

            this.invisible = this.data.invisible || false;

        }
    },
    methods: {
        submitForm() {
            if (this.form.todo == "") {
                swal("Pleae Fill Something", "", "error");
                return;
            }
            Api.post('/addtodo', this.form)
                .then((res) => {
                    //Perform Success Action
                    let response = (res.data);
                    console.log(response);
                    swal(response.message, "", "success");
                    if (response.status) {
                        this.invisible = false;
                        this.form.id = response.todo.id
                        this.updateTodo(this.index, response.todo)
                    }
                })
                .catch((error) => {
                    // error.response.status Check status code
                }).finally(() => {
                    //Perform action in always
                });
        },
        deleteTodo() {

            if (this.form.id == 0) {
                this.deletefunc(this.index)
                return;
            }

            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this todo",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        Api.post('/deletetodo', { id: this.form.id })
                            .then((res) => {
                                //Perform Success Action
                                let response = (res.data);
                                console.log(response);
                                swal(response.message, "", "success");
                                if (response.status) {
                                    this.deletefunc(this.index)
                                }
                            })
                            .catch((error) => {
                                // error.response.status Check status code
                            }).finally(() => {
                                //Perform action in always
                            });
                    }
                });




        }
    }
}
</script>