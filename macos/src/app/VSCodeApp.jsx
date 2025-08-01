export default function VSCodeApp() {
  return (
    <div className="flex h-full bg-gray-900 text-gray-300 font-mono text-sm">
      {/* Sidebar */}
      <div className="w-48 bg-gray-800 p-2">
        <h2 className="text-xs text-gray-400 uppercase tracking-wide">Explorer</h2>
        <ul className="mt-2 space-y-1 text-gray-300">
          <li className="px-2 py-1 bg-gray-700 rounded">index.js</li>
          <li className="px-2 py-1 hover:bg-gray-700 rounded cursor-pointer">app.jsx</li>
          <li className="px-2 py-1 hover:bg-gray-700 rounded cursor-pointer">styles.css</li>
        </ul>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Tabs */}
        <div className="flex items-center bg-gray-800 text-gray-400 border-b border-gray-700">
          <div className="px-4 py-2 text-gray-100 bg-gray-900 border-r border-gray-700">index.js</div>
        </div>

        {/* Editor */}
        <div className="flex-1 p-4 bg-gray-900 text-gray-300">
          <pre className="text-green-400">
{`
function HelloWorld() {
  console.log("Hello, world!");
}
`}
          </pre>
        </div>
      </div>
    </div>
  );
}
