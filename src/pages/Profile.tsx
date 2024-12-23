import useAuthProvider from "@/service/useAuthProviders";

const Profile = () => {
  const { user } = useAuthProvider();

  if (!user) {
    return "not found";
  }

  return (
    <div>
      <h1>{user.user_metadata.name}</h1>
      <p>{user.email}</p>
      <p>{user.name}</p>
    </div>
  );
};

export default Profile;
