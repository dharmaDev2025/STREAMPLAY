import { useAppContext } from "../context/AppContext";

const Dashboard = () => {
  const { users = [] } = useAppContext();

  return (
    <div className="p-6 w-full bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center md:text-left">
        Users Dashboard
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 bg-white rounded-xl shadow-lg">
          <thead className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-xl">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Expiry
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500 font-medium">
                  No users found
                </td>
              </tr>
            )}

            {users.map((u, idx) => (
              <tr
                key={u._id}
                className={`transition transform hover:scale-105 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                  {u.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {u.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {u.subscription?.plan ? (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        u.subscription.plan === "premium"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {u.subscription.plan}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-200 text-green-800">
                      Free
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {u.subscription?.expireDate
                    ? new Date(u.subscription.expireDate).toDateString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;