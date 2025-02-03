import { useEffect, useState } from "react";

export default function Todo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const appUrl = "http://localhost:8000"
    const [error, setError] = useState(" ")
    const [success, setSuccess] = useState(" ")

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

    return <> <div className="row p-3 bg-success text-light">
        <h1>Grace Mercy ToDo List</h1>
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
            <ul className="list-group">
                {
                    todos.map((item) =>
                        <li className="list-group-item bg-info d-flex justify-content-between  align-items-center my-2">
                            <div className="d-flex flex-column">
                                <span className="fw-bold">{item.title}</span>
                                <span>{item.description}</span>
                            </div>

                            <div className="d-flex gap-2">
                                <button className="btn btn-warning">Edit</button>
                                <button className="btn btn-danger">Delete</button>
                            </div>

                        </li>
                    )
                }


            </ul>
        </div>
    </>
}