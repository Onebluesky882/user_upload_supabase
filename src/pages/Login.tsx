import authProvider from "@/service/authProviders";

const Login = () => {
  return (
    <div>
      <button onClick={() => authProvider("google")}>Google</button>
      <button onClick={() => authProvider("github")}>github</button>
    </div>
  );
};
export default Login;
