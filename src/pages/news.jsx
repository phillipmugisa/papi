import { useEffect, useContext, useState } from 'react';
import NewsCard from '../components/newsCard';
import useFetchNews from '../utils/useFetchNews';
import { SelectorProvider } from "../utils/selectorContext";

const News = () => {

    const { 
        news, isLoading, 
        err
    } = useFetchNews();    
    const {
        catToShow, sourceToShow,
    } = useContext(SelectorProvider)
    const [newsToShow, setNewsToShow] = useState(null)

 
    const filterNews = (categoryToShow, sourceToShow) => {
        const newsfiltered = news.filter((article) => {
            return (
                (sourceToShow === "All" ? true : article.article_source_platform.toUpperCase() === sourceToShow.toUpperCase())
                && 
                (categoryToShow === "All" ? true : article.article_category.toUpperCase() === categoryToShow.toUpperCase()) 
            );
        })
        return newsfiltered;
    }
    

    useEffect(() => {
    
        if (catToShow !== "All") {
            setNewsToShow(filterNews(catToShow, sourceToShow))
        }
        else if (sourceToShow !== "All") {
            setNewsToShow(filterNews(catToShow, sourceToShow))
        } 
        else {
            setNewsToShow(news)
        }

    }, [catToShow, sourceToShow, news])

    return (
        <div className="news">
            { isLoading && <h3>Loading News...</h3> }
            { err && <h3>Opps!! Error occured...</h3> }
            { newsToShow && 
                newsToShow.map(
                    article => <NewsCard key={article.article_title} {...article}/>
                )
            }
        </div>
    );
}


export default News;