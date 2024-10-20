import { Circles } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="h-screen bg-blue-100 flex justify-center align-middle items-center">
      <Circles
        height="80"
        width="80"
        color="#374464"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
