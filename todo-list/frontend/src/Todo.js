import { useEffect, useState } from "react";

export default function Todo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const appUrl = "http://localhost:8000"
    const [error, setError] = useState(" ")
    const [success, setSuccess] = useState(" ")
    const [editId, setEditId] = useState(-1);
    // edit states
    const [editTitle, seteditTitle] = useState("")
    const [editDescription, seteditDescription] = useState("")



    function handleSumbit() {
        setError("");
        //check input items
        if (title.trim() !== '' && description.trim() !== '') {
            fetch(appUrl + "/todos", {
                method: "POST",
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description })
            }).then((res) => {
                if (res.ok) {
                    //input items to list
                    setTodos([...todos, { title, description }])
                    setTitle("");
                    setDescription("");
                    setSuccess("Item added Successfully")
                    setTimeout(() => {
                        setSuccess("");
                    }, 3000)
                } else {
                    //seterror
                    setError("unable to create Todo item");
                }
            }).catch(() => {
                setError("unable to create Todo item")
            })
        }
    }
    useEffect(() => {
        getitems()
    }, [])

    const getitems = () => {
        fetch(appUrl + "/todos")
            .then((res) => res.json())
            .then((res) => { setTodos(res) })
    }

    const handleedit = (item) => {
        setEditId(item._id);
        seteditTitle(item.title);
        seteditDescription(item.description);
    }
    const handleeditCancel = () => {
        setEditId(-1)

    }

    function handleUpdate() {
        setError("");
        //check input items
        if (editTitle.trim() !== '' && editDescription.trim() !== '') {
            fetch(appUrl + "/todos/" + editId, {
                method: "PUT",
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({ title: editTitle, description: editDescription })
            }).then((res) => {
                if (res.ok) {
                    //update  items to list
                    const UpdatedItems = todos.map((item) => {
                        if (item._id === editId) {
                            item.title = editTitle;
                            item.description = editDescription;
                        }
                        return item;
                    })
                    setTodos(UpdatedItems)
                    seteditTitle("");
                    seteditDescription("");
                    setSuccess("Item Updated Successfully")
                    setTimeout(() => {
                        setSuccess("");
                    }, 3000)
                    setEditId(-1);
                } else {
                    //seterror
                    setError("unable to create Todo item");
                }
            }).catch(() => {
                setError("unable to create Todo item")
            })
        }
    }
    const handledelte = (id) => {
        if (window.confirm("Are You Sure  want to delete ")) {
            fetch(appUrl + "/todos/" + id, {
                method: "DELETE"
            })
                .then(() => {
                    const Updatedtodos = todos.filter((item) => item._id !== id)
                    setTodos(Updatedtodos)
                })
        }
    }

    return <> <div className="row p-3 bg-success text-light">
        <h1>ToDo List Project</h1>
    </div>
        <div className="row">
            <h3>Add items</h3>
            {success && <p className="text-success">{success}</p>}
            <div className="form-group d-flex gap-2">
                <input placeholder="Title" className="form-control" onChange={(e) => setTitle(e.target.value)} value={title} />
                <input placeholder="Decription" onChange={(e) => setDescription(e.target.value)} value={description} className="form-control" />
                <button className="btn btn-dark" onClick={handleSumbit}>Submit</button>
            </div>
            {error && <p className="text-danger">{error}</p>}
        </div>
        <div className="row mt-3">
            <h3>Tasks</h3>
            <div className="col-md-6">
            <ul className="list-group">
                {
                    todos.map((item) =>
                        <li className="list-group-item bg-info d-flex justify-content-between  align-items-center my-2">
                            <div className="  d-flex justify-content-between gap-4 me-5">
                                {
                                    editId === -1 || editId !== item._id ? <>
                                        <span className="fw-bold">{item.title}</span>
                                        <span>{item.description}</span>
                                    </> : <>
                                        <div className="form-group d-flex justify-content-between gap-2">
                                            <input placeholder="Title" className="form-control" onChange={(e) => seteditTitle(e.target.value)} value={editTitle} />
                                            <input placeholder="Decription" onChange={(e) => seteditDescription(e.target.value)} value={editDescription} className="form-control" />

                                        </div>
                                    </>
                                }

                            </div>

                            <div className="d-flex gap-2">
                                {editId === -1 ? <button className="btn btn-warning" onClick={() => handleedit(item)}>Edit</button> : <button className="btn btn-warning" onClick={handleUpdate}>Update</button>}
                                {editId === -1 ? <button className="btn btn-danger" onClick={() => handledelte(item._id)}>Delete</button> :
                                    <button className="btn btn-danger" onClick={handleeditCancel}>Cancel</button>}
                            </div>

                        </li>
                    )
                }


            </ul>
            </div>
            
        </div>
    </>
}