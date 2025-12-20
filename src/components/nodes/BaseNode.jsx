import { Handle, Position } from "reactflow";
import { cn } from "../../lib/utils";

const BaseNode = ({
  label,
  icon: Icon,
  selected,
  isStart = false,
  isCondition = false,
}) => {
  return (
    <div
      className={cn(
        "min-w-50 bg-white rounded-lg shadow-sm border-2 transition-all duration-200",
        selected ? "border-blue-500 shadow-lg" : "border-gray-200",
        isStart && "border-green-500"
      )}
    >
      {!isStart && (
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 bg-gray-400 border-2 border-white"
        />
      )}

      <div className="flex items-center gap-3 p-3">
        <div
          className={cn(
            "p-2 rounded-md",
            isStart
              ? "bg-green-100 text-green-600"
              : isCondition
              ? "bg-purple-100 text-purple-600"
              : "bg-blue-100 text-blue-600"
          )}
        >
          <Icon size={18} />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-800">{label}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-wide">
            {isStart ? "Trigger" : isCondition ? "Logic" : "Action"}
          </p>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
    </div>
  );
};

export default BaseNode;
