import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-full flex justify-center items-center mt-4">
      <InfinitySpin
        visible={true}
        width="200"
        color="black"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default Loader;
