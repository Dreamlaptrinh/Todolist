import storage from "./until/storage.js"

const init = {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed,
    },
    editIndex: null,
}

const actions = {
    add({todos},tittle){
    if (tittle){
        todos.push({tittle, completed:false})
        storage.set(todos) 
    }
    },
    toggle({todos}, index){
        const todo = todos[index]
        todo.completed = !todo.completed
        storage.set(todos) 
    },
    toggleAll({todos}, completed){
        todos.forEach(todo=> todo.completed = completed)
        storage.set(todos) 
    },
    destroy({todos}, index){
        todos.splice(index ,1)
        storage.set(todos) 
    },
    switchFilter(state, filter){
        state.filter = filter
    },
    clearCompleted(state){
        state.todos = state.todos.filter(state.filters.active)
        storage.set(state.todos) 
    },
    startEdit(state,index){
        state.editIndex = index
    },
    endEdit(state, tittle){
        if(state.editIndex !=null){
            if(tittle){
                state.todos[state.editIndex].tittle = tittle
                storage.set(state.todos) 
            } else {
                this.destroy(state, state.editIndex)
            }
            state.editIndex = null
        }
    },
    cancelEdit(state){
        state.editIndex = null
    }
}

export default function reducer(state = init, action, args){
    actions[action] && actions[action](state, ...args)
    return state
}