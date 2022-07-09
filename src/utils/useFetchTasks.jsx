import { useState, useEffect } from 'react';

const BACKEND_URL = 'http://localhost:8000';

const useFetchTasks = () => {

    const [ tasks, setTasks ] = useState(null)
    const [ noTasksFound, setNoTasksFound ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(true)

    const taskDetail = async (id) => {
        // const response = await fetch(`${BACKEND_URL}/tasks/${id}`);
        // if (response.ok)
        // {
        //     const jsonData = await response.json();
        //     return jsonData;
        // }
    }

    const completeTask = async id => {

        let existigTasks = JSON.parse(localStorage.getItem('tasks'));
        let newTasks = existigTasks.map(task => {
            if (task['id'] === id)
            {
                task['is_complete'] = !task['is_complete'];
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        setTasks(newTasks);
        // fetch task
        // const task = await taskDetail(id);
      
        // fetch(`${BACKEND_URL}/tasks/${id}/`, {
        //     method: "PATCH",
        //     headers: {"content-type": "application/json"},
        //     body: JSON.stringify({'id': id, 'is_complete': !task.is_complete })
        // })
        // .then(() => {
        //     // console.log(`Task ${id} completed`)
        //     fetchTasks()
        // })
        // .catch(err => console.error(err))
    }

    const deleteTask = id => {
        
        // implement confirm message

        let existigTasks = JSON.parse(localStorage.getItem('tasks'));
        let newTasks = existigTasks.filter(task => task.id !== id ? true : false);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        setTasks(newTasks);
        
        // fetch(`${BACKEND_URL}/tasks/delete/${id}/`, {method: "DELETE"})
        // .then(() => {
        //     fetchTasks()
        // })
        // .catch(err => console.error(err))
    }

    const fetchTasks = async () => {

        if (localStorage.getItem('tasks'))
        {
            setTasks(JSON.parse(localStorage.getItem('tasks'))); }
        else
        {
            localStorage.setItem('tasks', []);
            setTasks([]);
        }

        // try {
        //     const response = await fetch(`${BACKEND_URL}/tasks`)
        //     if( 200 <= response.status <= 299 ){
        //         const jsonData = await response.json()

        //         if (jsonData.length === 0 || jsonData === null) {
        //             setNoTasksFound(true)
        //         } else {
        //             setTasks(jsonData['results'])
        //         }
        //         setIsLoading(false)
        //     }
        // } catch (err) {
        //     // console.error(err)
        // }
        
    }

    useEffect(()=>{

        fetchTasks()

    }, [])

    return {tasks, noTasksFound, isLoading, completeTask, deleteTask};
}

export default useFetchTasks;