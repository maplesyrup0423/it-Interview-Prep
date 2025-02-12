// src/components/LoadingSpinner.js
import { ClipLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center  h-screen  mt-10">
      <ClipLoader color="#2563eb" size={50} />
    </div>
  );
};

export default LoadingSpinner;
