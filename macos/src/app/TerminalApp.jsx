export default function TerminalApp() {
  return (
    <div className="p-4 bg-black text-green-400 font-mono text-xs h-full">
      <p>$ whoami</p>
      <p>user@fake-os</p>
      <br />
      <p>$ ls -la</p>
      <p>-rw-r--r--  index.js</p>
      <p>-rw-r--r--  README.md</p>
      <p>drwxr-xr-x  /projects</p>
    </div>
  );
}
