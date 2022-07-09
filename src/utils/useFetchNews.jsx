import { useState, useEffect, useContext } from 'react';
import { SelectorProvider } from './selectorContext'

const useFetchNews = (pageNum) => {
    const [news, setNews] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState(false);
    const [hasNext, setHasNext] = useState(true);
    const [maxPages, setMaxPages] = useState(2);
    
    const {
        catToShow, sourceToShow,
    } = useContext(SelectorProvider)

    const BACKEND_URL = 'http://localhost:8000';

    const getNews = async (pageNum) => {
        try{
            let url = '';
            if (catToShow !== "All" && sourceToShow !== "All")
            {
                url = `${BACKEND_URL}/news/?category=${catToShow}&page=${pageNum}&source=${sourceToShow}`;
            }
            else if (catToShow !== "All")
            {
                url = `${BACKEND_URL}/news/?category=${catToShow}&?page=${pageNum}`;
            }
            else if (sourceToShow !== "All")
            {
                url = `${BACKEND_URL}/news/?source=${sourceToShow}&?page=${pageNum}`;
            }
            else
            {
                url = `${BACKEND_URL}/news/?page=${pageNum}`;
            }

            const response = await fetch(url, {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
            })
            return response;
            
        } catch (err) {
            throw new Error(err);
        }
    }

    const updateNews = (pageNum) => {
        if (!hasNext) return;
        if (pageNum > maxPages) return;

        getNews(pageNum)
        .then((response) => {
            response.json()
            .then((jsonData) => {
                setHasNext(jsonData['next']);
                setMaxPages(jsonData['total_pages'])
                news ? setNews(data => {
                    data = data.filter(obj => {
                        if (catToShow !== "All" && sourceToShow !== "All")
                        {
                            return obj.category === catToShow && obj.source === sourceToShow;
                        }
                        else if (catToShow !== 'All')
                        {
                            return obj.category === catToShow;
                        }
                        else if (sourceToShow !== 'All')
                        {
                            return obj.source === sourceToShow;
                        }
                        return true;
                    })
                    return [...data, ...jsonData['results']];
                }) : setNews(() => [...jsonData['results']])
                setIsLoading(false);
            })
        })
        .catch((err) => {
            setErr(true)
        })
    }

    useEffect(() => {
        updateNews(pageNum);
    }, [catToShow, sourceToShow, pageNum])

    return { news, isLoading, err, hasNext };

}

export default useFetchNews
