import { Fade } from "react-awesome-reveal";

function AwesomeLoader() {
  return (
    <Fade cascade>
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </Fade>
  );
}
export default AwesomeLoader;
