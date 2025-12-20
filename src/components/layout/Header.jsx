import { Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ onSave }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10 relative">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-800">New Automation</h1>
          <p className="text-xs text-gray-500">Draft - Unsaved changes</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onSave}
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
