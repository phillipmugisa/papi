import React from 'react';
import PropTypes from 'prop-types';

const NewsCard = ({title, url, description, img_url, category, source}) => {
    return (
        <div className="newscard boxSolid">
            {img_url && 
                <a href={ url } target="_blank" rel="noopener noreferrer">
                    <div className="card-image">
                        <img src={ img_url } alt="" />
                    </div>
                </a>
            }
            <div className="card-body">
                <div className="card-head">
                    <a href={ url } target="_blank" rel="noopener noreferrer">
                        <h3>{ `${title.slice(0,50)}${ title.length > 50 ? " ..." : ''}` }</h3>
                    </a>
                </div>
                {description && <p className="description">{ `${description.slice(0,125)}${ description.length > 125 ? " ..." : ''}` }</p>}
                <div className="card-body-sub">
                    <span>{ source }</span>
                    <span>-</span>
                    <span>{ category }</span>
                </div>
                {/* <div className="card-icons center">
                    <button className="card-icon">
                        <i className="ti-share"></i>
                    </button>
                </div> */}
            </div>
        </div>
    );
}

NewsCard.propTypes = {
    url: PropTypes.string,
    img_url: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    source: PropTypes.string,
}
 
export default NewsCard;