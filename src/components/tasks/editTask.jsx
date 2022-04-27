import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';

const EditTask = () => {

    const history = useHistory()

    const [ isLoading, setIsLoading ] = useState(true)

    const [ taskName, setTaskName ] = useState("")
    const [ taskNotes, setTaskNotes ] = useState("")
    const [ taskCategory, setTaskCategory ] = useState("")
    const [ taskDueDate, setTaskDueDate ] = useState("")

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
        
        // check that data was entered
        if (taskName === "" || taskName === null) setNameErr(true)
        if (taskNotes === "" || taskNotes === null) setNotesErr(true)
        if (taskCategory === "" || taskCategory === null) setCatErr(true)
        if (taskDueDate === "" || taskDueDate === null) setDueDateErr(true)

        // submit data
        fetch(`/editTask/${id}`, {
            method: 'PATCH',
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify({ taskName, taskNotes, taskCategory, taskDueDate })
        })
        .then(() => history.push("/tasks"))
        .catch(err => console.log(err))

    }

    useEffect(() => {

        fetch(`/getTask/${id}`)
        .then(resp => resp.json())
        .then(data => {
            setTaskName(data.taskName)
            setTaskNotes(data.taskNotes)
            setTaskCategory(data.taskCategory)
            setTaskDueDate(data.taskDueDate)            
            setIsLoading(false)
        })

    }, [id])

    return (
        <>
            { isLoading && <h3>Loading Task...</h3> }
            { !isLoading && (
                <div className="edit-profile boxSolid">
                    <form autoComplete='off' onSubmit={submitChanges}>
                        <div className="form-fields">
                            <label>Task Name</label>
                            <input className={ nameErr ? "err" : null} type="text" value={taskName} onChange={e => setTaskName(e.target.value) }/>
                        </div>
                        <div className="form-fields">
                            <label>Task Notes</label>
                            <textarea className={ notesErr ? "err" : null} rows='3' value={taskNotes} onChange={e => setTaskNotes(e.target.value) }></textarea>
                        </div>
                        <div className="form-fields">
                            <label>Category</label>
                            <input className={ catErr ? "err" : null} type="text" value={taskCategory} onChange={e => setTaskCategory(e.target.value) }/>
                        </div>
                        <div className="form-fields">
                            <label>Due Date</label>
                            <input className={ dueDateErr ? "err" : null} type="date" value={taskDueDate} onChange={e => setTaskDueDate(e.target.value) }/>
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