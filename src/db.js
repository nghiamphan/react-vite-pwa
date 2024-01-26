import Dexie from 'dexie'

const db = new Dexie('MyDatabase')

db.version(1).stores({
    todos: '++id, content',
})

const getTodos = async () => {
    const todos = await db.todos.toArray()
    return todos
}

const addTodo = async (content) => {
    const newId = await db.todos.add({ content })
    return newId
}

const removeTodo = async (id) => {
    await db.todos.delete(id)
}

export { getTodos, addTodo, removeTodo }
