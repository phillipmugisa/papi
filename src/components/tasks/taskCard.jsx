import React from 'react';
import { Link } from 'react-router-dom'

import { FaTrash, FaCheck, FaEdit } from "react-icons/fa";

const TaskCard = (props) => {
    const  {task, handleTaskDelete, handleCompleteTask} = props

    return (
        <div className="taskcard boxSolid">            
            <div className="taskcard-head">
                <div className="task-cat-head">
                    <h4>{task['taskCategory']}</h4>
                </div>
                <div className="taskbar-date">
                    <h4>{task['created_on']}</h4>
                </div>
            </div>
            <div className="taskcard-body">
                <div className="task-name">
                    <h3>{task['taskName']}</h3>
                </div>
                <div className="task-notes">
                    <p className="notes">
                        {task['taskNotes']}
                    </p>
                    <p className="task-due-date">                        
                        { 
                            task.is_complete ? 
                            <span className="complete">Complete</span>
                            :
                            <>
                                <span>Due: </span>
                                <span>{task['taskDueDate']}</span>
                            </>
                        }
                    </p>
                </div>
            </div>
            <div className="card-icons center">
                <button className="card-icon" onClick={() => handleCompleteTask(task.id)}>
                    <FaCheck />
                </button>
                    <button className="card-icon">
                        <Link to={`/editTask/${task['id']}`}>
                            <FaEdit />
                        </Link>
                    </button>
                <button className="card-icon" onClick={() => handleTaskDelete(task.id)}>
                    <FaTrash />
                </button>
            </div>
        </div>
    );
}
 
export default TaskCard;