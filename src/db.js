import Dexie from 'dexie'

const db = new Dexie('MyDatabase')

db.version(3).stores({
    todos: '++id, content, priority, completed',
})

const getTodos = async () => {
    const todos = await db.todos.toArray()
    return todos
}

const addTodo = async (content) => {
    const newId = await db.todos.add({ content, priority: 'normal', completed: false })
    return newId
}

const updateTodo = async (id, { priority = null, completed = null }) => {
    if (priority && completed) {
        await db.todos.update(id, { priority, completed })
    } else if (priority) {
        await db.todos.update(id, { priority })
    } else if (completed) {
        await db.todos.update(id, { completed })
    }

    // Get and return the updated todo
    const updatedTodo = await db.todos.get(id)
    return updatedTodo
}

const removeTodo = async (id) => {
    await db.todos.delete(id)
}

export { getTodos, addTodo, updateTodo, removeTodo }
