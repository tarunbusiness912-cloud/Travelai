import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GroupCard from "../components/GroupCard";
import groupService from "../services/groupService";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGroups();
  }, []);

  useEffect(() => {
    const filtered = groups.filter((group) =>
      `${group.name} ${group.destination} ${group.description}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredGroups(filtered);
  }, [search, groups]);

  const loadGroups = async () => {
    try {
      const data = await groupService.getGroups();
      setGroups(data || []);
      setFilteredGroups(data || []);
    } catch (error) {
      alert(error.message || "Unable to load groups.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-3xl font-bold">
        Loading Groups...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

        <div>
          <h1 className="text-4xl font-bold">
            Travel Groups
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all your travel groups
          </p>
        </div>

        <Link
          to="/create-group"
          className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold"
        >
          + Create Group
        </Link>

      </div>

      {/* Search */}

      <div className="mb-8">

        <input
          type="text"
          placeholder="Search groups..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl p-4"
        />

      </div>

      {/* Empty */}

      {filteredGroups.length === 0 && (
        <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

          <div className="text-7xl">
            👥
          </div>

          <h2 className="text-3xl font-bold mt-6">
            No Groups Found
          </h2>

          <p className="text-gray-500 mt-4">
            Create your first travel group.
          </p>

          <Link
            to="/create-group"
            className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
          >
            Create Group
          </Link>

        </div>
      )}

      {/* Grid */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {filteredGroups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
          />
        ))}

      </div>

    </div>
  );
}

export default Groups;
