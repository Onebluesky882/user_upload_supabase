import supabase from "@/utils/supabase";

const authProvider = async (provider: "google" | "github") => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider, // Ensure it's in lowercase
    });

    if (error) {
      console.error("Error:", error.message);
    } else {
      console.log("Redirect URL:", data?.url);
    }
  } catch (err) {
    console.error("Unexpected Error:", err);
  }
};

export default authProvider;
