import { Save, ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { validateWorkflow } from "../../lib/validation";
import useFlowStore from "../../store/flowStore";

const Header = () => {
  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);

  const handleSave = () => {
    const errors = validateWorkflow(nodes, edges);

    if (errors.length > 0) {
      alert(`Cannot Save:\n- ${errors.join("\n- ")}`);
      return;
    }

    const workflowData = {
      name: "My Automation Workflow",
      nodes,
      edges,
      savedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("workflow-draft", JSON.stringify(workflowData));
      alert("Success! Workflow saved to Local Storage.");
    } catch (err) {
      console.error(err);
      alert("Failed to save to local storage.");
    }
  };

  const handleExport = () => {
    const errors = validateWorkflow(nodes, edges);
    if (errors.length > 0) {
      const proceed = window.confirm(
        `Workflow has errors:\n- ${errors.join(
          "\n- "
        )}\n\nDo you want to export anyway?`
      );
      if (!proceed) return;
    }

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify({ nodes, edges }, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "workflow.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10 relative shadow-sm">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Automation Builder
          </h1>
          <p className="text-xs text-gray-500">React Flow Assignment</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
        >
          <Download size={16} />
          Export JSON
        </button>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm"
        >
          <Save size={16} />
          Save Workflow
        </button>
      </div>
    </header>
  );
};

export default Header;
