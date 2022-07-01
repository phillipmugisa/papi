import { useRef, useState, useEffect, useContext } from 'react';
import { SelectorProvider } from './selectorContext'

const useFetchNews = (url) => {

    const visitedRoutes = useRef([]);
    const [pageNum, setPageNum] = useState(1);
    const [news, setNews] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState(false);
    // const urlQueryParams = useRef({category: null, source: null});
    
    const {
        catToShow, sourceToShow,
    } = useContext(SelectorProvider)

    const BACKEND_URL = 'http://localhost:8000';

    const getNews = async () => {
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
	
		console.log(visitedRoutes.current.includes(url))
		if (visitedRoutes.current.includes(url))
		{
			return;
		}
		else
		{
//			visitedRoutes.push(url)
		}

            const response = await fetch(url, {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
            })
            if (!response.ok) {
                window.scrollTo(0, 0);
            }
            return response
            
        } catch (err) {
            throw new Error(err);
        }
    }

    const loadMore = () => {
        if ((window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100))
        {  
            // console.log("loading")
            setPageNum(pageNum => (pageNum + 1));
            updateNews()
        }
      //  else
    //    {
  //          setPageNum(1);
//        }
        
    }

    const updateNews = () => {
        getNews()
        .then((response) => {
            response.json()
            .then((jsonData) => {
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
                    return [...news, ...jsonData['results']].filter(obj => {
			for (let a of news)
			    {
				if (a.id === obj.id) {return false;}
				    else {return true};
			    }
		    });
                }) : setNews(() => [...jsonData['results']])
                setIsLoading(false);
            })
        })
        .catch((err) => {
            // console.error(err)
            setErr(true)
        })
    }

    useEffect(() => {
        updateNews()
        window.addEventListener("scroll", loadMore)
        return () => window.removeEventListener("scroll", loadMore);
    },[catToShow, sourceToShow, news])

    return { news, isLoading, err };

}

export default useFetchNews
