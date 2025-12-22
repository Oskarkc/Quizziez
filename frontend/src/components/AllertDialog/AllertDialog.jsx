import "./AllertDialog.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
export default function AllertDialog({ message, onYes, onNo }) {
  return (
    <div className="alert-dialog-backdrop">
      <div className="alert-dialog">
        <p>{message}</p>
        <div className="btndiv">
          <ButtonComponent
            style={{ width: "50px", height: "30px", backgroundColor: "red" }}
            onClick={onYes}
          >
            YES
          </ButtonComponent>
          <ButtonComponent
            style={{ width: "50px", height: "30px" , backgroundColor: "black"}}
            onClick={onNo}
          >
            NO
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
}
