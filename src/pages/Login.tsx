import useAuthProvider from "@/service/useAuthProviders";

const Login = () => {
  const { logInAuthProvider, signOut } = useAuthProvider();

  return (
    <div>
      <button onClick={() => logInAuthProvider("github")}>github</button>
      <button onClick={() => signOut()}>signout</button>
    </div>
  );
};

export default Login;
