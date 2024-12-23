import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";

// export type User = {
//   name: string;
// };

const useAuthProvider = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    getUser();
  });
  const logInAuthProvider = async (provider: "google" | "github") => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: provider, // Ensure it's in lowercase
      });
    } catch (err) {
      console.error("Unexpected Error:", err);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);

      console.log("data user : ", data);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return { user, logInAuthProvider, signOut };
};
export default useAuthProvider;
