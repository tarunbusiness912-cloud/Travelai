import { Link } from "react-router-dom";

function GroupCard({ group }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition">

      <img
        src={
          group.cover_image ||
          "https://placehold.co/600x300?text=Travel+Group"
        }
        alt=""
        className="w-full h-48 object-cover"
      />

      <div className="p-6">

        <h2 className="text-2xl font-bold">
          {group.name}
        </h2>

        <p className="text-gray-500 mt-2">
          {group.description}
        </p>

        <div className="mt-5 space-y-2">

          <p>
            📍
            <span className="ml-2">
              {group.destination}
            </span>
          </p>

          <p>
            📅
            <span className="ml-2">
              {group.start_date}
            </span>
          </p>

          <p>
            🏁
            <span className="ml-2">
              {group.end_date}
            </span>
          </p>

        </div>

        <Link
          to={`/dashboard/groups/${group.id}`}
          className="block mt-6 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl"
        >
          Open Group
        </Link>

      </div>

    </div>
  );
}

export default GroupCard;
