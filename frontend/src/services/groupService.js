import { supabase } from "../lib/supabase";

const groupService = {
  async getGroups() {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!userData.user) throw new Error("Authentication required");

    const { data, error } = await supabase
      .from("group_members")
      .select("role, groups(*)")
      .eq("user_id", userData.user.id);

    if (error) throw error;
    return (data || []).map(({ groups, role }) => ({ ...groups, role }));
  },

  async createGroup(groupData) {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!userData.user) throw new Error("Authentication required");

    const { data: group, error: groupError } = await supabase
      .from("groups")
      .insert({
        owner_id: userData.user.id,
        name: groupData.name.trim(),
        description: groupData.description?.trim() || null,
        destination: groupData.destination?.trim() || null,
        start_date: groupData.start_date || null,
        end_date: groupData.end_date || null,
        cover_image: groupData.cover_image?.trim() || null,
      })
      .select()
      .single();

    if (groupError) throw groupError;

    const { error: memberError } = await supabase.from("group_members").insert({
      group_id: group.id,
      user_id: userData.user.id,
      role: "owner",
    });

    if (memberError) throw memberError;

    const { error: activityError } = await supabase.from("group_activity").insert({
      group_id: group.id,
      user_id: userData.user.id,
      activity: "Created group",
    });

    if (activityError) throw activityError;
    return group;
  },

  async getGroupDetails(groupId) {
    const { data, error } = await supabase.from("groups").select("*").eq("id", groupId).single();
    if (error) throw error;
    return data;
  },

  async getGroupActivity(groupId) {
    const { data, error } = await supabase
      .from("group_activity")
      .select("id, activity, created_at")
      .eq("group_id", groupId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  },
};

export default groupService;
