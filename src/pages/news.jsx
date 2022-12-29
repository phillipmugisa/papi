import { useEffect, useState, useRef } from 'react';
import NewsCard from '../components/newsCard';
import useFetchNews from '../utils/useFetchNews';

const News = () => {

    const [pageNum, setPageNum] = useState(1);
    const { 
        news, isLoading, 
        err, hasNext,
        maxPages
    } = useFetchNews(pageNum);
    
    const observer = useRef();
    const lastArticle = useRef();

    useEffect(() => {
        observer.current = new IntersectionObserver((entries, observer) => {                
                if (!isLoading && (entries[0].isIntersecting && hasNext) && prevPageNumber < maxPages) {
                    setTimeout(
                        setPageNum(prevPageNumber => prevPageNumber + 1),
                        10000
                    )
                }
            }
        );
        if (lastArticle.current.lastChild) observer.current.observe(lastArticle.current.lastChild);

        // return () => observer.current.disconnect();
    },[pageNum, hasNext, isLoading, maxPages])

    return (
        <>
            <div className="msg-area">
                { !news && !err && isLoading && <h3 className="msg">Loading News...</h3> }
                { news && news.length === 0 && <h3 className="msg">No News Articles Found ☹</h3> }
                { !news && err && <h3 className="msg">Problem reaching server ☹</h3> }
            </div>
            <div className="news" ref={lastArticle}>
                { news && 
                    news.map(
                        (article, index) => <NewsCard key={article.id} {...article}/>
                    )
                }
            </div>
        </>
    );
}


export default News;