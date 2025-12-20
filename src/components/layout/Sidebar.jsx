import { MessageSquare, UserPlus, GitBranch, Clock } from "lucide-react";
import { NODE_TYPES } from "../../constants/workflow";

const DraggableNode = ({ type, label, icon: Icon }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="flex items-center gap-3 p-3 mb-3 bg-white border border-gray-200 rounded-lg cursor-grab hover:shadow-md hover:border-blue-500 transition-all"
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <div className="p-2 bg-blue-50 rounded-md text-blue-600">
        <Icon size={16} />
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-64 h-full bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-bold text-gray-800">Workflow Nodes</h2>
        <p className="text-xs text-gray-500 mt-1">Drag nodes to the canvas</p>
      </div>

      <div className="p-4 overflow-y-auto flex-1">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Actions
          </h3>
          <DraggableNode
            type={NODE_TYPES.ACTION_MESSAGE}
            label="Send Message"
            icon={MessageSquare}
          />
          <DraggableNode
            type={NODE_TYPES.ACTION_FOLLOW}
            label="Follow User"
            icon={UserPlus}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Logic
          </h3>
          <DraggableNode
            type={NODE_TYPES.CONDITION}
            label="Condition"
            icon={GitBranch}
          />
          <DraggableNode
            type={NODE_TYPES.WAIT}
            label="Wait Timer"
            icon={Clock}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
