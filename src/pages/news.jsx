import { useEffect, useState, useRef, useCallback } from 'react';
import NewsCard from '../components/newsCard';
import useFetchNews from '../utils/useFetchNews';

const News = () => {

    const [pageNum, setPageNum] = useState(1);
    const { 
        news, isLoading, 
        err, hasNext
    } = useFetchNews(pageNum);
    
    const observer = useRef();
    const lastArticle = useRef();

    useEffect(() => {
        observer.current = new IntersectionObserver((entries, observer) => {                
                if (entries[0].isIntersecting && hasNext) {
                    setPageNum(prevPageNumber => prevPageNumber + 1);
                }
            }
        );
        // console.log(lastArticle.current.querySelector('#lastArticle'))
        if (lastArticle.current.querySelector('#lastArticle')) observer.current.observe(lastArticle.current.querySelector('#lastArticle'));

        // return () => observer.current.disconnect();
    },[pageNum, hasNext])

    return (
        <>
            <div className="msg-area">
                { !news && !err && isLoading && <h3 className="msg">Loading News...</h3> }
                { news && news.length === 0 && <h3 className="msg">No News Articles Found ☹</h3> }
                { !news && err && <h3 className="msg">Opps!! Error occured ☹</h3> }
            </div>
            <div className="news" ref={lastArticle}>
                { news && 
                    news.map(
                        (article, index) => <NewsCard key={article.id} {...article} id={news.length === index + 1 ? 'lastArticle' : ''}/>
                    )
                }
            </div>
        </>
    );
}


export default News;