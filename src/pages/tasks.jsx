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
            { isLoading && <h3>Loading Tasks...</h3> }
            { noTasksFound && <h3>Opps!! No Tasks Found...</h3> }
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