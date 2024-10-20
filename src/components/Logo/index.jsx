// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap";
import "./index.scss";
import logo from "../../assets/images/logo.svg";

export default function Logo() {
  return (
    <div className="logo gap-3">
      <div className="imageContainer">
        <img src={logo} alt="Triple-A" />
      </div>
      <h3 className="logoTittle text-nowrap"> TRIPLE A</h3>
    </div>
  );
}
