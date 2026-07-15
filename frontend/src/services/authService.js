import { supabase } from "../lib/supabase";

// Register
export const registerUser = async (email, password) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

// Login
export const loginUser = async (email, password) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

// Logout
export const logoutUser = async () => {
  return await supabase.auth.signOut();
};

// Forgot Password
export const forgotPassword = async (email) => {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo:
      window.location.origin + "/reset-password",
  });
};

// Reset Password
export const updatePassword = async (
  newPassword
) => {
  return await supabase.auth.updateUser({
    password: newPassword,
  });
};

// Current User
export const getCurrentUser = async () => {
  return await supabase.auth.getUser();
};