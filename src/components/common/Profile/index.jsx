const Profile = ({ width, height, src, username }) => {
  return (
    <div className="profile" style={{ width: width, height: height }}>
      <img className="profile_img" alt={username} src={src} />
    </div>
  );
};

export default Profile;
