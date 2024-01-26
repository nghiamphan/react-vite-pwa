import { Box, Button, Container, List, ListItem, TextField, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getTodos, addTodo, removeTodo } from './db'

const App = () => {
    const [todos, setTodos] = useState([])
    const [todoContent, setTodoContent] = useState('')

    useEffect(() => {
        getTodos().then((todos) => setTodos(todos))
    }, [])

    const handleAddTodo = async (event) => {
        event.preventDefault()

        const newId = await addTodo(todoContent)

        setTodos([...todos, { id: newId, content: todoContent }])
        setTodoContent('')
    }

    const handleRemoveTodo = (event, todo) => {
        event.preventDefault()
        setTodos(todos.filter((t) => t !== todo))

        removeTodo(todo.id)
    }

    return (
        <Container sx={{ marginTop: 10 }}>
            <form>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TextField
                        sx={{ width: 600 }}
                        label="Todo"
                        value={todoContent}
                        onChange={(e) => setTodoContent(e.target.value)}
                    />
                    <Tooltip title={todoContent === '' ? 'Content cannot be empty' : ''}>
                        <Box>
                            <Button
                                sx={{ alignSelf: 'center', margin: 1 }}
                                variant="contained"
                                color="primary"
                                onClick={handleAddTodo}
                                disabled={todoContent === ''}
                            >
                                Add
                            </Button>
                        </Box>
                    </Tooltip>
                </Box>
            </form>

            <br />
            <Typography variant="h4">Todo List</Typography>
            <List sx={{ listStyleType: 'disc', marginLeft: 3 }}>
                {todos.map((todo) => (
                    <ListItem sx={{ display: 'list-item' }} key={todo.id}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Typography sx={{ width: 550, marginRight: 1 }}>{todo.content}</Typography>
                            <Button
                                sx={{ alignSelf: 'center' }}
                                variant="contained"
                                color="error"
                                onClick={(event) => handleRemoveTodo(event, todo)}
                            >
                                Remove
                            </Button>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Container>
    )
}

export default App
