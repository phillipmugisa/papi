import TaskCard from '../components/tasks/taskCard';
import useFetchTasks from '../utils/useFetchTasks';
import { Link } from 'react-router-dom';

const Tasks = () => {

    const {
        tasks,
        isLoading, completeTask,
        deleteTask
    } = useFetchTasks();


    return ( 
        <div className="tasks">
            { !tasks && isLoading && <h3 className="msg">Loading Tasks...</h3> }
            { tasks && tasks.length <= 0 && <h3 className="msg" style={{border: "none",justifySelf: "center"}}>
                <Link to="/createTask">
                    <button className="logout-button btn-primary">Create a Task</button>
                </Link>
            </h3> }
            {
                tasks && tasks.map(task => {
                    return (
                        <TaskCard 
                            task={task}
                            handleCompleteTask={ completeTask }
                            handleTaskDelete={ deleteTask } 
                            index = {tasks.indexOf(task)} 
                            key={tasks.indexOf(task)}
                        />
                    )
                })
            }
        </div>
    );
}
 
export default Tasks;