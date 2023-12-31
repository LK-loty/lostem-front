import { PiUserCircleLight } from "react-icons/pi";

const Profile = ({ size, imageUrl }) => {
  return (
    <div className="profile">
      {imageUrl && (
        <img
          className="profile_img"
          alt="profile"
          src={imageUrl}
          width={size}
          height={size}
        />
      )}
      {!imageUrl && <PiUserCircleLight size={40} />}
    </div>
  );
};

export default Profile;
