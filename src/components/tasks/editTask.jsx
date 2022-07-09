import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';

const EditTask = () => {
    const [ isLoading, setIsLoading ] = useState(true)

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

    const { id } = useParams()

    const submitChanges = e => {
        e.preventDefault()
        setNameErr(false)
        setNotesErr(false)
        setCatErr(false)
        setDueDateErr(false)

        const parsedDate = new Date(taskData.taskDueDate);
        const currentDate = new Date();
        if (parsedDate < currentDate) setDueDateErr(true);

        // check that data was entered
        if (taskData.taskName === "" || taskData.taskName === null) setNameErr(true)
        if (taskData.taskNotes === "" || taskData.taskNotes === null) setNotesErr(true)
        if (taskData.taskCategory === "" || taskData.taskCategory === null) setCatErr(true)
        if (taskData.taskDueDate === "" || taskData.taskDueDate === null) setDueDateErr(true)

        // submit data
        // saving to local storage
        if (!nameErr && !notesErr && ! catErr && !dueDateErr){
            const initialTask = JSON.parse(localStorage.getItem('tasks')).filter(task => parseInt(task['id']) === parseInt(id))[0];
            if (localStorage.getItem('tasks'))
            {
                let tasks = [...JSON.parse(localStorage.getItem('tasks')).filter(task => parseInt(task['id']) !== parseInt(id)), {...initialTask, ...taskData}];
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
            else
            {
                navigate("/createTask");
            }
            formElem.current.reset();
        }
        // submit
        // fetch(`/editTask/${id}`, {
        //     method: 'PATCH',
        //     headers: {"Content-type" : "application/json"},
        //     body: JSON.stringify({ taskName, taskNotes, taskCategory, taskDueDate })
        // })
        // .then(() => navigate("/tasks"))
        // .catch(err => console.log(err))

    }

    useEffect(() => {

        const task = JSON.parse(localStorage.getItem('tasks')).filter(task => parseInt(task['id']) === parseInt(id))[0];
        if (task)
        {
            setTaskdata(task);
            setIsLoading(false);
        }
        // fetch(`/getTask/${id}`)
        // .then(resp => resp.json())
        // .then(task => {
        //     setTaskName(task.taskName)
        //     setTaskNotes(task.taskNotes)
        //     setTaskCategory(task.taskCategory)
        //     setTaskDueDate(task.taskDueDate)            
        //     setIsLoading(false)
        // })

    }, [id])

    return (
        <>
            { isLoading && <h3 className="msg">Loading Tasks...</h3> }
            { !isLoading && (
                <div className="edit-profile boxSolid">
                    <form autoComplete='off' onSubmit={submitChanges}  ref={formElem}>
                        <div className="form-fields">
                            <label>Task Name</label>
                            <input className={ nameErr ? "err" : null} type="text" defaultValue={taskData.taskName} onChange={e => setTaskdata(taskData => {return {...taskData, taskName: e.target.value}}) }/>
                        </div>
                        <div className="form-fields">
                            <label>Task Notes</label>
                            <textarea className={ notesErr ? "err" : null} rows='3' defaultValue={taskData.taskNotes} onChange={e => setTaskdata(taskData => {return {...taskData, taskNotes: e.target.value}}) }></textarea>
                        </div>
                        <div className="form-fields">
                            <label>Category</label>
                            <input className={ catErr ? "err" : null} type="text" defaultValue={taskData.taskCategory} onChange={e => setTaskdata(taskData => {return {...taskData, taskCategory: e.target.value}}) }/>
                        </div>
                        <div className="form-fields">
                            <label>Due Date</label>
                            <input className={ dueDateErr ? "err" : null} type="date" defaultValue={taskData.taskDueDate} onChange={e => setTaskdata(taskData => {return {...taskData, taskDueDate  : e.target.value}}) }/>
                        </div>
                        <div className="form-fields">
                            <input className="btn-primary" type="submit" value="Submit Changes" />
                        </div>
                    </form>
                </div>
            ) }
        </>
    );
}
 
export default EditTask;