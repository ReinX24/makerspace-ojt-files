import { useTheme } from "./providers/theme/ThemeContext";
import ProposalView from "./views/ProposalView";

function App() {
  const { darkMode, toggleDarkMode } = useTheme(); // Add toggleDarkMode here

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <div className="max-w-screen-xl m-auto pt-16">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold">Simple Proposal App</h1>

            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>

          <ProposalView />
        </div>
      </div>
    </div>
  );
}

export default App;
