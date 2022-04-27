import React from 'react';

const EditProfile = () => {
    return ( 
        <div className="edit-profile boxSolid">
            <form autoComplete='off' encType="multipart/form-data">
                <div className="form-fields">
                    <label>Username</label>
                    <input type="text" value="phillipmugisa" />
                </div>
                <div className="form-fields">
                    <label>Full Name</label>
                    <input type="text" value="Phillip Mugisa" />
                </div>
                <div className="form-fields">
                    <label>Email</label>
                    <input type="email" value="phillipmugisa@gmail.com" />
                </div>
                <div className="form-fields">
                    <label>Tel No.</label>
                    <input type="text" value="+256757375684" />
                </div>
                <div className="form-fields">
                    <input id="img-selector" type="file" />
                </div>
                <div className="form-fields">
                    <input className="btn-primary" type="submit" value="Submit Changes" />
                </div>
            </form>
        </div>
    );
}
 
export default EditProfile;