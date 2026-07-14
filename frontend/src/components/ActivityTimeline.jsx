function ActivityTimeline() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      <h2 className="text-2xl font-bold mb-5">
        Recent Activity
      </h2>

      <ul className="space-y-4">

        <li>✅ Logged in</li>

        <li>✈ Created a trip</li>

        <li>❤️ Added Favorite</li>

      </ul>

    </div>
  );
}

export default ActivityTimeline;