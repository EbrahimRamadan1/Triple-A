import { ThreeDots } from "react-loader-spinner";

export default function Loader2() {
  return (
    <div className="h-auto bg-blue-100 flex justify-center align-middle items-center">
      <ThreeDots
        visible={true}
        height="40"
        width="40"
        color="#374464"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
