import React, { useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { SelectorProvider } from "../utils/selectorContext";

const SideBar = () => {

    const {
        catToShow, setCatToShow,
        sourceToShow, setSourceToShow
    } = useContext(SelectorProvider)

    const categories = ["All", "Technology", "Sports", "World"];
    const sources = ["All", "Google News", "Bing", "New York Times"];

    const theme = useRef("light")

    useEffect(() => {
        const themeChangeSwitchBall = document.querySelector('.theme-change-switch-ball')
        themeChangeSwitchBall.classList.add(theme.current)
        document.body.classList = theme.current
        
        const script = document.createElement('script')
        script.src = './scripts/script.js'
        script.async = true
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }

    }, [catToShow, sourceToShow])

    return (
        <div className="sidebar boxSolid">
            <div className="theme-change">
                <span>Light</span>
                <div className="theme-change-switch">
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
                        <button className="logout-button btn-primary">Logout</button>
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
                                onClick={() => setFunc(data)}
                                checked = { selected === data ? true : false }
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