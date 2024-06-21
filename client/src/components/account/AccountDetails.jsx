import { Input, FormGroup } from "reactstrap";
import { useState } from "react";
import { updateUserProfile } from "../../managers/userProfileManager";

export const AccountDetails = ({ loggedInUser }) => {
  const [editForm, setEditForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(loggedInUser.phoneNumber);
  const [email, setEmail] = useState(loggedInUser.email);
  const [firstName, setFirstName] = useState(loggedInUser.firstName);
  const [lastName, setLastName] = useState(loggedInUser.lastName);

  const handleCancel = () => {
    setPhoneNumber(loggedInUser.phoneNumber);
    setEmail(loggedInUser.email);
    setFirstName(loggedInUser.firstName);
    setLastName(loggedInUser.lastName);
    setEditForm(false);
  };

  const handleProfileUpdate = (id) => {
    debugger;
    const userProfile = {
      id: parseInt(id),
      phoneNumber: phoneNumber,
      email: email,
      firstName: firstName,
      lastName: lastName,
    };
    updateUserProfile(userProfile).then(() => {
      setEditForm(false);
    });
  };
  return (
    <>
      <div className="edit-btn-container">
        {editForm != true ? (
          <i
            className="fas fa-edit edit-btn"
            onClick={() => {
              setEditForm(true);
            }}
          ></i>
        ) : null}
      </div>
      <FormGroup>
        <Input
          readOnly={editForm !== true}
          type="text"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          placeholder="Phone Number"
          className="form-input"
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          readOnly={editForm !== true}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email Address"
          className="form-input"
        />
      </FormGroup>
      <FormGroup className="name-input">
        <Input
          type="text"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          readOnly={editForm !== true}
          value={firstName}
          placeholder="First Name"
          className="form-input block-input"
        />

        <Input
          type="text"
          readOnly={editForm !== true}
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          placeholder="Last Name"
          className="form-input block-input"
        />
      </FormGroup>
      {editForm ? (
        <div className="controls-container">
          <button
            className="account-btn-controls primary-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="account-btn-controls primary-btn"
            onClick={() => {
              handleProfileUpdate(parseInt(loggedInUser.id));
            }}
          >
            Save
          </button>
        </div>
      ) : null}
    </>
  );
};
