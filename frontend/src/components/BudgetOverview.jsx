function BudgetOverview() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Budget Overview
      </h2>

      <div className="space-y-5">

        <div>
          <div className="flex justify-between mb-2">
            <span>Total Budget</span>
            <span>₹0</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-green-500 h-3 rounded-full w-0"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span>Spent</span>
            <span>₹0</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-red-500 h-3 rounded-full w-0"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span>Remaining</span>
            <span>₹0</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-blue-500 h-3 rounded-full w-0"></div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default BudgetOverview;