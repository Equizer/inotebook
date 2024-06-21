import react, { useContext, useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user/userContext';
import NoteContext from '../context/notes/noteContext';

const UserProfile = (props) => {
  const userContext = useContext(UserContext);
  const noteContext = useContext(NoteContext);
  const { deleteUser, loading, setLoading } = userContext;
  const { deleteAllNotes } = noteContext;
  const navigate = useNavigate();
  const refClose = useRef(null);
  const [userInfo, setUserInfo] = useState({ name: "", email: "", dob: "", dateJoined: "" });

  const handleDeleteUser = () => {
    deleteAllNotes(JSON.parse(localStorage.getItem('user'))._id);
    deleteUser(JSON.parse(localStorage.getItem('user'))._id);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signup');
    refClose.current.click();
    props.showAlert('User Deleted Successfuly', 'info');
  }

  const handleDeleteAllNotes = () => {
    deleteAllNotes(JSON.parse(localStorage.getItem('user'))._id);
    refClose.current.click();
    props.showAlert('All of your notes were deleted!', 'info');
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    props.showAlert('Logged out', 'info');
    refClose.current.click();
    // this is neccessary to set the loading to true again becuz initially it is set to true then it is changed to false when the user is stored but after that if a user logs out then log in with the same maybe or with a different account then the loading will already be false becuz we changed it already when we stored it previously so now if we set the loading to false when the user is set in the local storage it was already false so the Profile component will not re-render again and the useEffect() used in the Profile.js will not run again becuz useEffect will only run when the state of loading changes.
    setLoading(true);
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user'))) {
      setUserInfo({ name: JSON.parse(localStorage.getItem('user')).name, email: JSON.parse(localStorage.getItem('user')).email, dob: new Date(JSON.parse(localStorage.getItem('user')).dob).toGMTString(), dateJoined: new Date(JSON.parse(localStorage.getItem('user')).date).toGMTString() });
    }
    console.log(loading)
  }, [loading]);





  return (<>
    <button type="button" className="btn btn-info rounded-circle mx-2" data-bs-toggle="modal" data-bs-target="#largeModal">
      <i className="fa-solid fa-user"></i>
    </button>

    <div className="modal fade" id="largeModal" tabIndex="-1" aria-labelledby="largeModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="largeModalLabel">Your Profile</h5>
            <button type="button" ref={refClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <div className="d-flex justify-content-center align-items-center">
              <img className='mr-5 card-img-top' style={{ width: "250px", height: "300px" }} src="https://m.files.bbci.co.uk/modules/bbc-morph-news-waf-page-meta/5.3.0/bbc_news_logo.png" alt="..." />
              <div style={{ fontSize: "20px", width: "400px" }}>
                <p className='mx-5 badge text-bg-light'>Name: {userInfo.name}</p>
                <p className='mx-5 badge text-bg-light'>Email: {userInfo.email}</p>
                <p className='mx-5 badge text-bg-light'>Date of Birth: {userInfo.dob}</p>
                <p className='mx-5 badge text-bg-light'>Date joined: {userInfo.dateJoined}</p>
                <div className="d-flex my-3 mx-5 justify-content-center">
                  <button type="button" onClick={handleDeleteUser} className="btn btn-danger " data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete User"><i className="fa-solid fa-user-xmark" style={{ "color": "#ffffff" }}></i></button>
                  <button onClick={handleDeleteAllNotes} className="btn btn-warning mx-2"><i className="fa-solid fa-skull-crossbones" style={{ "color": "#fafafa" }}></i></button>
                  <button onClick={handleLogout} className="btn btn-outline-primary ">
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </>
  );
}

export default UserProfile;