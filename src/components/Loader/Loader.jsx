import { Circles } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="h-screen bg-blue-100 flex justify-center align-middle items-center w-full">
      <Circles
        height="40"
        width="40"
        color="#374464"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
