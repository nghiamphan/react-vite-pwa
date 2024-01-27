import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    List,
    ListItem,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { getTodos, addTodo, updateTodo, removeTodo } from './db'

const PrioritySelect = ({ todo }) => {
    const [priority, setPriority] = useState(todo.priority)

    const handleUpdateTodo = (event) => {
        setPriority(event.target.value)
        updateTodo(todo.id, { priority: event.target.value })
    }

    return (
        <Select sx={{ width: 100 }} value={priority} onChange={handleUpdateTodo}>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="high">High</MenuItem>
        </Select>
    )
}

const CompletedCheckbox = ({ todo }) => {
    const [completed, setCompleted] = useState(todo.completed)

    const handleUpdateTodo = (event) => {
        setCompleted(event.target.checked)
        updateTodo(todo.id, { completed: event.target.checked })
    }

    return (
        <FormControlLabel
            sx={{ marginLeft: 1, marginRight: 1, alignSelf: 'center' }}
            label="Completed"
            labelPlacement="start"
            control={<Checkbox checked={completed} onChange={handleUpdateTodo} />}
        />
    )
}

const App = () => {
    const [todos, setTodos] = useState([])
    const [todoContent, setTodoContent] = useState('')

    useEffect(() => {
        getTodos().then((todos) => setTodos(todos))
    }, [])

    const handleAddTodo = async (event) => {
        event.preventDefault()

        const newId = await addTodo(todoContent)

        setTodos([...todos, { id: newId, content: todoContent, priority: 'normal', completed: false }])
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
                            <Typography sx={{ width: 560, marginRight: 1 }}>{todo.content}</Typography>
                            <PrioritySelect todo={todo} />
                            <CompletedCheckbox todo={todo} />
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
