function DashboardCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div
      className="
      bg-white/70
      backdrop-blur-xl
      rounded-3xl
      shadow-xl
      border
      p-6
      hover:scale-105
      duration-300
    "
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div
          className={`${color}
          w-16
          h-16
          rounded-2xl
          flex
          items-center
          justify-center
          text-white`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

export default DashboardCard;