import { useState } from "react"

export default function Todo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const appUrl = "http://localhost:8000"
    const [error, setError] = useState(" ")
    const [success,setSuccess]= useState(" ")

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
                    setTimeout(()=>{
                        setSuccess("");
                    },3000)
                } else {
                    //seterror
                    setError("unable to create Todo item");
                }
            })
        }
    }

    return <> <div className="row p-3 bg-success text-light">
        <h1>Grace Mercy Do List</h1>
    </div>
        <div className="row">
            <h3>Add items</h3>
         {success  && <p className="text-success">{success}</p>}   
            <div className="form-group d-flex gap-2">
                <input placeholder="Title" className="form-control" onChange={(e) => setTitle(e.target.value)} value={title} />
                <input placeholder="Decription" onChange={(e) => setDescription(e.target.value)} value={description} className="form-control" />
                <button className="btn btn-dark" onClick={handleSumbit}>Submit</button>
            </div>
          {error && <p className="text-danger">{error}</p>}  
        </div>
    </>
}