import "./UserSettings.css";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useState } from "react";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { useNavigate } from "react-router-dom";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useEditUser } from "../../hooks/useEditUser";

export default function UserSettings() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEmailChanging, setIsEmailChanging] = useState(false);
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const { handleDeleteUser } = useDeleteUser();
  const { handleEditEmail, handleEditPassword, newEmail, setNewEmail, newPassword, setNewPassword } = useEditUser();
  const navigate = useNavigate();
  return (
    <div className="setupusersettingsdiv">
      <div className="usersettingsheader">
        <h1 className="welcomehome">Settings</h1>
      </div>
      <div className="usersettingsdiv">
        <ButtonComponent onClick={() => setIsEmailChanging(true)}>Change Email</ButtonComponent>
        <ButtonComponent onClick={() => setIsPasswordChanging(true)}>Change Password</ButtonComponent>
        <ButtonComponent
          style={{ background: "red" }}
          onClick={() => setIsDeleting(true)}
        >
          Delete Account
        </ButtonComponent>
        <ButtonComponent onClick={() => navigate("/home")}>
          Back To Home
        </ButtonComponent>
      </div>
      {isDeleting && (
        <div className="confirmationdialog">
          <h2>Are you sure you want to delete your account?</h2>
          <div className="confirmationbtndiv">
            <ButtonComponent
              style={{ background: "red", width: "100px" }}
              onClick={() => {
                handleDeleteUser();
                setIsDeleting(false);
              }}
            >
              Yes, Delete
            </ButtonComponent>
            <ButtonComponent
              style={{ width: "100px" }}
              onClick={() => setIsDeleting(false)}
            >
              Cancel
            </ButtonComponent>
          </div>
        </div>
      )}
      {isEmailChanging && (
        <div className="confirmationdialog">
          <h2>Enter new email</h2>
          <InputComponent placeholder={"Enter new Email"} value={newEmail} onChange={(e) => setNewEmail(e.target.value)}></InputComponent>
          <div className="confirmationbtndiv">
            <ButtonComponent
              style={{ background: "green", width: "100px" }}
              onClick={() => {
                handleEditEmail(newEmail);
                setIsEmailChanging(false);
              }}
            >
              Save
            </ButtonComponent>
            <ButtonComponent
              style={{ width: "100px" }}
              onClick={() => {setIsEmailChanging(false); setNewEmail("")}}
            >
              Cancel
            </ButtonComponent>
          </div>
        </div>
      )}
      {isPasswordChanging && (
        <div className="confirmationdialog">
          <h2>Enter new password</h2>
          <InputComponent placeholder={"Enter new Password"} type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></InputComponent>
          <div className="confirmationbtndiv">
            <ButtonComponent
              style={{ background: "green", width: "100px" }}
              onClick={() => {
                handleEditPassword(newPassword);
                setIsPasswordChanging(false);
              }}
            >
              Save
            </ButtonComponent>
            <ButtonComponent
              style={{ width: "100px" }}
              onClick={() => {setIsPasswordChanging(false); setNewPassword("")}}
            >
              Cancel
            </ButtonComponent>
          </div>
        </div>
      )}
    </div>
  );
}
