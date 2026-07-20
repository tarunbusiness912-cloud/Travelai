import { supabase } from "../lib/supabase";

const toAppUser = (user, session) => ({
  id: user.id,
  name: user.user_metadata?.full_name || user.user_metadata?.name || "Travel Companion",
  email: user.email,
  token: session?.access_token,
});

// Register
export const registerUser = async (name, email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: window.location.origin + "/dashboard",
    },
  });

  if (error) {
    throw error;
  }

  return {
    user: data.user ? toAppUser(data.user, data.session) : null,
    session: data.session,
  };
};

// Login
export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return {
    user: toAppUser(data.user, data.session),
    session: data.session,
  };
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

export const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
};

export { toAppUser };
