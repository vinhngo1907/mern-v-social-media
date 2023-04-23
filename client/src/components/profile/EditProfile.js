import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkImage } from "../../utils/imageUpload";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { updateProfile } from "../../redux/actions/profileAction";

const EditProfile = ({ setOnEdit }) => {
    const { auth, theme } = useSelector(state => state);
    const dispatch = useDispatch();
    const [profileData, setProfileData] = useState({
        fullname: '', mobile: '', gender: 'male', address: '', website: '', story: ''
    });
    const [avatar, setAvatar] = useState('');

    const { fullname, mobile, address, website, story, gender } = profileData;

    const handleChangeInput = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value })
    }

    const handleChangeAvatar = (e) => {
        const file = e.target.files[0];
        console.log(file)
        const err = checkImage(file);
        if (err) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
        }
        setAvatar(file);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile({avatar, profileData, auth}));
    }
    return (
        <div className="edit_profile">
            <button className="btn btn-danger btn_close"
                onClick={() => setOnEdit(false)}>
                Close
            </button>
            <form onSubmit={handleSubmit}>
                <div className="info_avatar">
                    <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                        alt="avatar" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                    <span>
                        <i className="fas fa-camera" />
                        <p>Change</p>
                        <input type="file" name="file" id="file_up"
                            accept="image/*" onChange={handleChangeAvatar} />
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <div className="position-relative">
                        <input type="text" className="form-control" id="fullname"
                            name="fullname" value={fullname} onChange={handleChangeInput} />
                        <small className="text-danger position-absolute"
                            style={{ top: '50%', right: '5px', transform: 'translateY(-50%)' }}>
                            {fullname.length}/25
                        </small>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" name="mobile" value={mobile}
                        className="form-control" onChange={handleChangeInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" value={address}
                        className="form-control" onChange={handleChangeInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input type="text" name="website" value={website}
                        className="form-control" onChange={handleChangeInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="story">Story</label>
                    <textarea name="story" value={story} cols="30" rows="4"
                        className="form-control" onChange={handleChangeInput} />

                    <small className="text-danger d-block text-right">
                        {story.length}/200
                    </small>
                </div>
                <label htmlFor="gender">Gender</label>
                <div className="input-group-prepend px-0 mb-4">
                    <select name="gender" id="gender" value={gender}
                        className="custom-select text-capitalize"
                        onChange={handleChangeInput}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <button className="btn btn-info w-100" type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditProfile;