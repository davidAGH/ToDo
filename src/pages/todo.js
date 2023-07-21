import { useState } from "react"

export function ToDo() {
    const [newValue, setnewValue] = useState('')

    const [list, setList] = useState([
        {title: 'Learn Html', id: 1},
        {title: 'Learn Css', id: 2},
        {title: 'Learn Js', id: 3},
        {title: 'Learn React', id: 4},
        {title: 'Learn Redux', id: 5},
    ])

    const handleChange = (e) => {
        setnewValue(e.target.value)
    }
  
    const handleCreate = () => {
        setList([...list, { title: newValue, id: list?.length +1 }])
        setnewValue('')
    }

    const handleDelete = () => {

    }

    return (
        <div className="container">
            <h1>TodoInput</h1>
            <div className="addTask">
                <div className="input">
                    <i className="fas fa-book todo-icon"></i>
                    <input type="text" placeholder="New ToDo"
                        onChange={(e) => handleChange(e)}
                        value={newValue}
                    /> <br/>
                </div>
                <button className="addButton" onClick={handleCreate}>Add new task</button>
            </div>

            <h1>TodoList</h1>
            <div className="ToDoListButtons">
                <button>All</button>
                <button>Done</button>
                <button>Todo</button>
            </div>

            <div className="ToDo-List">
                {list?.map((i) => (
                    <div key={i?.id} className="task-value">
                        
                        <p className="content-P">
                        {i?.id}. {i?.title}
                            <div className="create-P">
                                <input type="checkbox"/>
                                <button>
                                    <i className="fas fa-pencil-alt" style={{ color: "#FFD700" }}></i>
                                </button>
                                <button className="" onClick={() => handleDelete(i.id)}>
                                    <i className="fas fa-trash" style={{ color: "#FF0000" }}></i>
                                </button>
                            </div>
                        </p>
                    </div>
                ))}

                <div className="contDelete">
                    <button className="deleteButtons">Delete done tasks</button>
                    <button className="deleteButtons">Delete all tasks</button>
                </div>
            </div>
        </div>
    )
}