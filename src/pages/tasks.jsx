import { useEffect } from 'react';
import TaskCard from '../components/tasks/taskCard';
import useFetchTasks from '../utils/useFetchTasks';

const Tasks = () => {

    const {
        tasks, noTasksFound,
        isLoading, completeTask,
        deleteTask
    } = useFetchTasks();

    useEffect(() => {

    }, [])

    return ( 
        <div className="tasks">
            { !tasks && isLoading && <h3 className="msg">Loading Tasks...</h3> }
            { tasks && tasks.length < 0 && <h3 className="msg">No Tasks Found☹..</h3> }
            { noTasksFound && <h3 className="msg">Opps!! No Tasks Found...</h3> }
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