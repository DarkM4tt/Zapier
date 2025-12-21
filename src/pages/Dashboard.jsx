import { useEffect, useState } from "react";
import { Plus, FileJson, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [savedWorkflow, setSavedWorkflow] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("workflow-draft");
    if (data) {
      setSavedWorkflow(JSON.parse(data));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Automations</h1>
          <Link
            to="/builder"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
          >
            <Plus size={20} />
            Create Workflow
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedWorkflow ? (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                  <FileJson size={24} />
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  Active
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {savedWorkflow.name}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {new Date(savedWorkflow.savedAt).toLocaleDateString()}
                </span>
                <span>{savedWorkflow.nodes.length} Nodes</span>
              </div>
              <Link
                to="/builder"
                className="block text-center w-full py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Edit Workflow
              </Link>
            </div>
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">No workflows saved yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
