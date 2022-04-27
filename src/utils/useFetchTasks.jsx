import { useState, useEffect } from 'react';

const useFetchTasks = () => {

    const [ tasks, setTasks ] = useState(null)
    const [ noTasksFound, setNoTasksFound ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(true)

    const completeTask = id => {
        
        // implement confirm message

        fetch(`/completeTask/${id}`, {
            method: "PATCH",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({'iscomplete': !tasks[id].iscomplete })
        })
        .then(() => {
            console.log(`Task ${id} completed`)
            fetchTasks()
        })
        .catch(err => console.error(err))
    }

    const deleteTask = id => {
        
        // implement confirm message

        fetch(`/deleteTask/${id}`, {method: "DELETE"})
        .then(() => {
            console.log(`Task ${id} deleted`)
            fetchTasks()
        })
        .catch(err => console.error(err))
    }

    const fetchTasks = async () => {

        try {
            const response = await fetch("/getTasks")
            if( 200 <= response.status <= 299 ){
                const jsonData = await response.json()

                if (jsonData.length === 0 || jsonData === null) {
                    setNoTasksFound(true)
                } else {
                    setTasks(jsonData)
                }
                setIsLoading(false)
            }
        } catch (err) {
            console.error(err)
        }
        
    }

    useEffect(()=>{

        fetchTasks()

    }, [])

    return {tasks, noTasksFound, isLoading, completeTask, deleteTask};
}

export default useFetchTasks;