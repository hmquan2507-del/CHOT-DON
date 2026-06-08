export type CurrentUserForTopbar = {
  displayName: string;
  email: string;
  plan: "free" | "pro" | "admin";
  avatarUrl: string | null;
  initials: string;
};

export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  plan: "free" | "pro" | "admin";
};
