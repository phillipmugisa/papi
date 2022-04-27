import { useState, useEffect, useRef } from 'react';

const useFetchNews = () => {

    const pageNum= useRef(6);
    const [news, setNews] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState(false);

    const getNews = async () => {
        try{
            const response = await fetch(`getNews/${pageNum.current}`)
            if (!response.ok) {
                throw new Error(response.status)
            }
            return response
            
        } catch (err) {
            throw new Error(err);
        }
    }

    const loadMore = () => {
        if ((window.scrollY + window.innerHeight >= document.documentElement.scrollHeight))
        {  
            console.log("loading")
            pageNum.current = pageNum.current + 6;
            updateNews()
        }
    }

    const updateNews = () => {
        getNews()
        .then((response) => {
            response.json()
            .then((jsonData) => {
                news ? setNews((news) => [...news, jsonData]) : setNews(jsonData)
                console.log("News:", jsonData)
                setIsLoading(false)
            })
        })
        .catch((err) => {
            console.error(err)
            setErr(true)
        })
    }

    useEffect(() => {
        updateNews()

        window.addEventListener("scroll", loadMore)
        return () => window.removeEventListener("scroll", loadMore);
    },[])

    return { news, isLoading, err };

}

export default useFetchNews