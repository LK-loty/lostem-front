const Profile = ({ size, imageUrl }) => {
  return (
    <div className="profile">
      <img
        className="profile_img"
        alt="profile"
        src={imageUrl}
        width={size}
        height={size}
      />
    </div>
  );
};

export default Profile;
