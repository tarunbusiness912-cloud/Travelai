import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import groupService from "../../services/groupService";

function GroupDetails() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGroup = async () => {
      try {
        const [groupData, activityData] = await Promise.all([groupService.getGroupDetails(id), groupService.getGroupActivity(id)]);
        setGroup(groupData);
        setActivities(activityData);
      } catch (loadError) {
        setError(loadError.message || "Unable to load this group.");
      }
    };
    loadGroup();
  }, [id]);

  if (error) return <div className="rounded-xl bg-red-50 p-6 text-red-700">{error}</div>;
  if (!group) return <div className="p-6 text-slate-500">Loading group...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link to="/dashboard/groups" className="text-sm font-semibold text-indigo-600">Back to groups</Link>
      <section className="overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100">
        {group.cover_image && <img src={group.cover_image} alt="" className="h-64 w-full object-cover" />}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-slate-900">{group.name}</h1>
          <p className="mt-3 text-slate-600">{group.description || "No description added yet."}</p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3 text-sm">
            <div><dt className="text-slate-400">Destination</dt><dd className="font-semibold">{group.destination || "Not set"}</dd></div>
            <div><dt className="text-slate-400">Start date</dt><dd className="font-semibold">{group.start_date || "Not set"}</dd></div>
            <div><dt className="text-slate-400">End date</dt><dd className="font-semibold">{group.end_date || "Not set"}</dd></div>
          </dl>
        </div>
      </section>
      <section className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-900">Activity</h2>
        {activities.length === 0 ? <p className="mt-4 text-slate-500">No activity yet.</p> : <ul className="mt-4 space-y-3">{activities.map((activity) => <li key={activity.id} className="border-b border-slate-100 pb-3 text-slate-700">{activity.activity}<span className="ml-2 text-xs text-slate-400">{new Date(activity.created_at).toLocaleString()}</span></li>)}</ul>}
      </section>
    </div>
  );
}

export default GroupDetails;
