import { useState } from "react";

export function ToDo() {
    const [newValue, setnewValue] = useState("");
    const [editId, setEditId] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [list, setList] = useState([
        { title: "Learn Html", id: 1 },
        { title: "Learn Css", id: 2 },
        { title: "Learn Js", id: 3 },
        { title: "Learn React", id: 4 },
        { title: "Learn Redux", id: 5 },
    ]);

    const [showDone, setShowDone] = useState(true);
    const [showTodo, setShowTodo] = useState(true);

    const handleChange = (e) => {
        setnewValue(e.target.value);
    };

    const handleCreate = () => {
        setList([...list, { title: newValue, id: list?.length + 1 }]);
        setnewValue("");
    };

    const handleEdit = (taskId) => {
        setEditId(taskId);
        const taskToEdit = list.find((item) => item.id === taskId);
        setEditedTitle(taskToEdit.title);
    };

    const handleSaveEdit = (taskId) => {
        setList(
            list.map((item) =>
                item.id === taskId ? { ...item, title: editedTitle } : item
            )
        );
        setEditId(null);
    };

    const handleCancelEdit = () => {
        setEditId(null);
    };

    const handleTaskDone = (taskId) => {
        setList(
            list.map((item) =>
                item.id === taskId ? { ...item, done: !item.done } : item
            )
        );
    };

    const handleDelete = (taskId) => {
        setList(list.filter((item) => item.id !== taskId));
    };

    const handleDeleteDoneTasks = () => {
        setList(list.filter((item) => !item.done));
    };

    const handleDeleteAllTasks = () => {
        setList([]);
    };

    const filterDone = () => {
        setShowDone(true);
        setShowTodo(false);
    };

    const filterTodo = () => {
        setShowDone(false);
        setShowTodo(true);
    };

    const filterAll = () => {
        setShowDone(true);
        setShowTodo(true);
    };

    return (
        <div className="container">
            <h1>TodoInput</h1>
            <div className="addTask">
                <div className="input">
                    <i className="fas fa-book todo-icon"></i>
                    <input
                        type="text"
                        placeholder="New ToDo"
                        onChange={(e) => handleChange(e)}
                        value={newValue}
                    />
                    <br />
                </div>
                <button className="addButton" onClick={handleCreate}>
                    Add new task
                </button>
            </div>

            <h1>TodoList</h1>
            <div className="ToDoListButtons">
                <button onClick={filterAll}>All</button>
                <button onClick={filterDone}>Done</button>
                <button onClick={filterTodo}>Todo</button>
            </div>

            <div className="ToDo-List">
                {list.map((i) => {
                    if ((i.done && !showDone) || (!i.done && !showTodo)) {
                        return null;
                    }
                    return (
                        <div key={i?.id} className={`task-value ${i.done ? "done" : ""}`}>
                            <p className="content-P">
                                {editId === i.id ? (
                                    <input
                                        type="text"
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                    />
                                ) : (
                                    i.done ? <del>{i.title}</del> : i.title
                                )}
                                <div className="create-P">
                                    <input
                                        className="checkbox"
                                        type="checkbox"
                                        checked={i.done}
                                        onChange={() => handleTaskDone(i.id)}
                                    />
                                    {editId === i.id ? (
                                        <>
                                            <button className="save" onClick={() => handleSaveEdit(i.id)}>
                                                Save
                                            </button>
                                            <button className="cancel" onClick={handleCancelEdit}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button className="buttonForID" onClick={() => handleEdit(i.id)}>
                                            <i className="fas fa-pencil-alt" style={{ color: "#FFD700" }}></i>
                                        </button>
                                    )}
                                    <button className="buttonForID" onClick={() => handleDelete(i.id)}>
                                        <i className="fas fa-trash" style={{ color: "#FF0000" }}></i>
                                    </button>
                                </div>
                            </p>
                        </div>
                    );
                })}

                <div className="contDelete">
                    <button className="deleteButtons" onClick={handleDeleteDoneTasks}>
                        Delete done tasks
                    </button>
                    <button className="deleteButtons" onClick={handleDeleteAllTasks}>
                        Delete all tasks
                    </button>
                </div>
            </div>
        </div>
    );
}

