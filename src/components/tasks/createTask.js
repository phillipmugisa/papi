import React, { useState } from 'react';
import { useNavigate } from 'react-router';


const CreateTask = () => {

    const navigate = useNavigate()

    const [ taskData, setTaskdata ] = useState({
        taskName: "",
        taskNotes: "",
        taskCategory: "",
        taskDueDate: null,
    })

    const [ nameErr, setNameErr ] = useState(false)
    const [ notesErr, setNotesErr ] = useState(false)
    const [ catErr, setCatErr ] = useState(false)
    const [ dueDateErr, setDueDateErr ] = useState(false)

    const handleChange = e => {
        setTaskdata(taskData => {
            return {...taskData, [e.target.name]: e.target.value}
        })
    }

    const createTask = (e) => {
        console.log({...taskData})

        e.preventDefault()
        setNameErr(false)
        setNotesErr(false)
        setCatErr(false)
        setDueDateErr(false)
        
        // check that data was entered
        if (taskData.taskName === "" || taskData.taskName === null) setNameErr(true)
        if (taskData.taskNotes === "" || taskData.taskNotes === null) setNotesErr(true)
        if (taskData.taskCategory === "" || taskData.taskCategory === null) setCatErr(true)
        if (taskData.taskDueDate === "" || taskData.taskDueDate === null) setDueDateErr(true)

        // submit data
        fetch("/createTask", {
            method: 'POST',
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify({...taskData})
        })
        .then(() => navigate("/tasks"))
        .catch(err => console.log(err))

    }

    return (

        <div className="edit-profile boxSolid">
            <form autoComplete='off' onSubmit={createTask}>
                <div className="form-fields">
                    <label htmlFor="taskName">Task Name</label>
                    <input id="taskName" name="taskName" className={ nameErr ? "err" : null} type="text" onChange={e => handleChange(e) }/>
                </div>
                <div className="form-fields">
                    <label htmlFor="taskNotes">Task Notes</label>
                    <textarea id="taskNotes" name="taskNotes" className={ notesErr ? "err" : null} rows='3' onChange={e => handleChange(e) }></textarea>
                </div>
                <div className="form-fields">
                    <label htmlFor="taskCategory">Category</label>
                    <input id="taskCategory" name="taskCategory" className={ catErr ? "err" : null} type="text" onChange={e => handleChange(e) }/>
                </div>
                <div className="form-fields">
                    <label htmlFor="taskDueDate">Due Date</label>
                    <input id="taskDueDate" name="taskDueDate" className={ dueDateErr ? "err" : null} type="date" onChange={e => handleChange(e) }/>
                </div>
                <div className="form-fields">
                    <input className="btn-primary" type="submit" value="Submit" />
                </div>
            </form>
        </div>

    );
}
 
export default CreateTask;