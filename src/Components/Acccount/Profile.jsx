import {useAuth} from "../index"
import "./profile.css"
export const Profile = () => {

    const {userDetails,userId,username,useremail,SignOut} = useAuth();
      

    return (
        <> 
    
        <div className="profile-main-div">
           
        <div className="inner-main-div">
            
           <div className="profile-info">

           <div className="profile-pic">
           <i class="far fa-id-badge"></i>
           </div>

           <div className="user-info">
            <div className="username-div">
                <p className="info-name">User Name</p>
                <p>{username}</p>
            </div>
            <div className="username-div">
                <p className="info-name">User Email</p>
                <p>{useremail}</p>
            </div>
            <div className="username-div">
                <p className="info-name">User Id</p>
                <p>{userId}</p>
            </div>
            </div>
            </div>

            <div className="btn-logout-div">
                <button className="btn-logout"
                onClick={SignOut}
                >
                Log out
                </button>
            </div>
        </div>
        </div>

        </>

    )
}