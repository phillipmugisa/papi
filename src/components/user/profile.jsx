import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
    return ( 
        <div className="account boxSolid">
            <div className="account-img">
                <img src="./images/img.png" alt="" />
            </div>
            <div className="account-details">
                <span className="details">
                    <span className="detail-title">Username:</span>
                    <span className="detail-infor">phillipmugisa</span>
                </span>
                <span className="details">
                    <span className="detail-title">Fullname:</span>
                    <span className="detail-infor">Phillip Mugisa</span>
                </span>
                <span className="details">
                    <span className="detail-title">Email:</span>
                    <span className="detail-infor">phillipmugisa4@gmail.com</span>
                </span>
                <span className="details">
                    <span className="detail-title">Tel No.:</span>
                    <span className="detail-infor">+256757375584</span>
                </span>
                <Link to="edit-profile">
                    <button className="btn-primary">Edit Profile</button>
                </Link>
            </div>
        </div>
    );
}
 
export default Profile;