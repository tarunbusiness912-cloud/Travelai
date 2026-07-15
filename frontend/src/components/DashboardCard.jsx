function DashboardCard({
  title,
  value,
  color,
  icon,
}) {
  return (
    <div
      className={`${color} rounded-2xl shadow-lg p-6 text-white transition hover:scale-105 duration-300`}
    >
      <div className="flex justify-between items-center">

        <div>

          <h3 className="text-lg font-medium opacity-90">
            {title}
          </h3>

          <h1 className="text-4xl font-bold mt-3">
            {value}
          </h1>

        </div>

        <div className="text-5xl opacity-70">
          {icon}
        </div>

      </div>
    </div>
  );
}

export default DashboardCard;