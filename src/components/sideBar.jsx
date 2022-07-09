import React, { useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { SelectorProvider } from "../utils/selectorContext";

const SideBar = () => {

    const {
        catToShow, setCatToShow,
        sourceToShow, setSourceToShow
    } = useContext(SelectorProvider)

    const categories = ["All", "Technology", "Sports", "Finance"];
    const sources = ["All", "Google News", "Yahoo News", "New York Times"];

    const togglebtn = useRef("togglebtn")

    const toggleTheme =() => {
        const theme = localStorage.getItem('theme');
        togglebtn.current.classList.remove(theme)
        document.body.classList = theme
        if (theme === 'dark')
        {
            localStorage.setItem('theme', 'light')
        }
        else
        {
            localStorage.setItem('theme', 'dark')
        }
        // togglebtn.current.classList.add(theme.current)
        document.body.classList = localStorage.getItem('theme')
        togglebtn.current.classList.add(localStorage.getItem('theme'))
    }

    useEffect(() => {

        // get theme
        if (!localStorage.getItem('theme'))
        {
            localStorage.setItem('theme', 'light')
        }

        togglebtn.current.classList.add(localStorage.getItem('theme'))
        document.body.classList = localStorage.getItem('theme')
        
        togglebtn.current.addEventListener('click', toggleTheme)

        // return () => {
        //     togglebtn.current.removeEventListener('click', toggleTheme);
        // }

    }, [catToShow, sourceToShow])

    return (
        <div className="sidebar boxSolid">
            <div className="theme-change">
                <span>Light</span>
                <div className="theme-change-switch" ref={togglebtn}>
                    <div className="theme-change-switch-ball"></div>
                </div>
                <span>Dark</span>
            </div>
            <div className="category-select-field">
                <div className="field-head">
                    <h3 className="field-heading">News Categories</h3>
                </div>
                <div className="categories">
                    <form>
                        <CategoryFields selected={catToShow}  dataArr={categories} setFunc={setCatToShow}/>
                    </form>
                </div>
            </div>
            <div className="category-select-field">
                <div className="field-head">
                    <h3 className="field-heading">News Source</h3>
                </div>
                <div className="categories">
                    <form>
                        <CategoryFields selected={sourceToShow} dataArr={sources}  setFunc={setSourceToShow}/>
                    </form>
                </div>
                <div className="sidebar-logout-section">
                    <Link to="/logout">
                        <button className="logout-button btn-primary">Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}


const CategoryFields = ({selected, dataArr, setFunc}) => {
    
    return (
        <>
            { 
                dataArr.map(data => {
                    return (
                        <div className="category" key={data}>
                            <input type="radio" name='source' 
                                value={data} id={data}
                                checked = { selected === data ? true : false }
                                onChange={() => {setFunc(data)}}
                            />
                            <label htmlFor={data}>{data}</label>
                        </div>
                    )
                }) 
            }
        </>
    );

}
 
export default SideBar;