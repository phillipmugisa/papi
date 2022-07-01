import { useEffect, useContext, useState } from 'react';
import NewsCard from '../components/newsCard';
import useFetchNews from '../utils/useFetchNews';


const News = () => {

    const { 
        news, isLoading, 
        err
    } = useFetchNews();
    

    useEffect(() => {

    }, [news])

    return (
        <div className="news">
            { !news && !err && isLoading && <h3 className="msg">Loading News...</h3> }
            { err && <h3 className="msg">Opps!! Error occured...</h3> }
            { news && 
                news.map(
                    article => <NewsCard key={article.id} {...article}/>
                )
            }
        </div>
    );
}


export default News;