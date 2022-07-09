import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';


const CreateTask = () => {

    const navigate = useNavigate()
    const formElem = useRef();
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

    const createTask = async (e) => {
        e.preventDefault()
        setNameErr(false)
        setNotesErr(false)
        setCatErr(false)
        setDueDateErr(false)

        const parsedDate = new Date(taskData.taskDueDate);
        const currentDate = new Date();
        if (parsedDate < currentDate) {setDueDateErr(true); return;};

        // check that data was entered
        if (taskData.taskName === "" || taskData.taskName === null) {setNameErr(true); return;}
        if (taskData.taskNotes === "" || taskData.taskNotes === null) setNotesErr(true)
        if (taskData.taskCategory === "" || taskData.taskCategory === null) {setCatErr(true); return;}
        if (taskData.taskDueDate === "" || taskData.taskDueDate === null) {setDueDateErr(true); return;}

        // submit data
        // saving to local storage
        if (!nameErr && !notesErr && ! catErr && !dueDateErr){
            // const id = `${currentDate.toLocaleTimeString()}-${currentDate.toLocaleDateString()}`.replace(" ", "-").replace(":", "-");
            const id = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')).length + 1 : 1;
            const task = {...taskData, is_complete: false, id: id, created_on : new Date().toLocaleDateString()};
            if (localStorage.getItem('tasks')) 
            {
                let tasks = [...JSON.parse(localStorage.getItem('tasks')), task];
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
            else
            {
                localStorage.setItem('tasks', JSON.stringify([task]));
            }
            formElem.current.reset();
            navigate("/tasks");
        }
        


        // const response = await fetch("http://localhost:8000/tasks/", {
        //     method: 'POST',
        //     headers: {"Content-type" : "application/json"},
        //     body: JSON.stringify({...taskData})
        // })
        // if (response.ok) 
        // {
        //     formElem.current.reset();
        //     navigate("/tasks");
        // }

    }

    return (

        <div className="edit-profile boxSolid">
            <form autoComplete='off' onSubmit={createTask} ref={formElem}>
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