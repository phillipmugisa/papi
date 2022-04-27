import React from 'react';
import { Link } from 'react-router-dom'

const TaskCard = (props) => {
    const  {task, index, handleTaskDelete, handleCompleteTask} = props
    console.log(props)

    return (
        <div className="taskcard boxSolid">            
            <div className="taskcard-head">
                <div className="task-cat-head">
                    <h4>{task.taskCategory}</h4>
                </div>
                <div className="taskbar-date">
                    <h4>{task.setDate}</h4>
                </div>
            </div>
            <div className="taskcard-body">
                <div className="task-name">
                    <h3>{task.taskName}</h3>
                </div>
                <div className="task-notes">
                    <p className="notes">
                        {task.taskNotes}
                    </p>
                    <p className="task-due-date">                        
                        { 
                            task.iscomplete ? 
                            <span className="complete">Complete</span>
                            :
                            <>
                                <span>Due:</span>
                                <span>{task.taskDueDate}</span>
                            </>
                        }
                    </p>
                </div>
            </div>
            <div className="card-icons center">
                <button className="card-icon" onClick={() => handleCompleteTask(index)}>
                    <i className="ti-check"></i>
                </button>
                    <button className="card-icon">
                        <Link to={`/editTask/${index}`}>
                            <i className="ti-pencil"></i>
                        </Link>
                    </button>
                <button className="card-icon" onClick={() => handleTaskDelete(index)}>
                    <i className="ti-close"></i>
                </button>
            </div>
        </div>
    );
}
 
export default TaskCard;