import React from 'react';
import PropTypes from 'prop-types';

const NewsCard = ({article_title, article_link, article_img_src, article_category, article_source}) => {
    return (
        <div className="newscard boxSolid">
            {article_img_src && 
                <a href={ article_link } target="_blank" rel="noopener noreferrer">
                    <div className="card-image">
                        <img src={ article_img_src } alt="" />
                    </div>
                </a>
            }
            <div className="card-body">
                <div className="card-head">
                    <a href={ article_link } target="_blank" rel="noopener noreferrer">
                        <h3>{ article_title }</h3>
                    </a>
                </div>
                <div className="card-body-sub">
                    <span>{ article_source }</span>
                    <span>-</span>
                    <span>{ article_category }</span>
                </div>
                <div className="card-icons center">
                    <button className="card-icon">
                        <i className="ti-share"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

NewsCard.propTypes = {
    article_link: PropTypes.string.isRequired,
    article_img_src: PropTypes.string,
    article_title: PropTypes.string.isRequired,
    article_category: PropTypes.string.isRequired,
    article_source: PropTypes.string.isRequired,
}
 
export default NewsCard;