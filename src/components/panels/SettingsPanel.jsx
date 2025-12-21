import { X, MessageSquare } from "lucide-react";
import useFlowStore from "../../store/flowStore";
import { NODE_TYPES } from "../../constants/workflow";

const SettingsPanel = () => {
  const selectedNode = useFlowStore((state) => state.selectedNode);
  const setSelectedNode = useFlowStore((state) => state.setSelectedNode);
  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  if (!selectedNode) {
    return (
      <aside className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col items-center justify-center text-center h-full">
        <div className="bg-gray-50 p-4 rounded-full mb-4">
          <MessageSquare size={24} className="text-gray-400" />
        </div>
        <h3 className="text-gray-900 font-medium mb-1">Configuration Panel</h3>
        <p className="text-gray-500 text-sm">
          Click on a node to edit its properties.
        </p>
      </aside>
    );
  }

  const handleChange = (field, value) => {
    updateNodeData(selectedNode.id, { [field]: value });
  };

  return (
    <aside className="w-80 bg-white border-l border-gray-200 flex flex-col h-full shadow-xl z-20">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            {selectedNode.type.replace("_", " ")}
          </span>
          <span className="text-xs text-gray-400">
            ID: {selectedNode.id.slice(-4)}
          </span>
        </div>
        <button
          onClick={() => setSelectedNode(null)}
          className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Node Name
          </label>
          <input
            type="text"
            value={selectedNode.data.label || ""}
            onChange={(e) => handleChange("label", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {selectedNode.type === NODE_TYPES.ACTION_MESSAGE && (
          <>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Phone Number / ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="+1 234 567 890"
                value={selectedNode.data.username || ""}
                onChange={(e) => handleChange("username", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Message Text <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Type your message here..."
                value={selectedNode.data.message || ""}
                onChange={(e) => handleChange("message", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}

        {selectedNode.type === NODE_TYPES.WAIT && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Hours
              </label>
              <input
                type="number"
                min="0"
                value={selectedNode.data.hours || 0}
                onChange={(e) => handleChange("hours", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Minutes
              </label>
              <input
                type="number"
                min="0"
                max="59"
                value={selectedNode.data.minutes || 0}
                onChange={(e) => handleChange("minutes", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
        )}

        {selectedNode.type === NODE_TYPES.CONDITION && (
          <>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Condition Type
              </label>
              <select
                value={selectedNode.data.conditionType || "equals"}
                onChange={(e) => handleChange("conditionType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
              >
                <option value="equals">Equals To</option>
                <option value="contains">Contains</option>
                <option value="greater">Greater Than</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Value
              </label>
              <input
                type="text"
                value={selectedNode.data.conditionValue || ""}
                onChange={(e) => handleChange("conditionValue", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          Changes are auto-saved
        </p>
      </div>
    </aside>
  );
};

export default SettingsPanel;
