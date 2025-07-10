import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee, createClient } from "../../redux/action/user";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { CFormSelect } from "@coreui/react";
import { pakistanCities } from "../../constant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateUser = ({ open, setOpen, scroll, userType }) => {
  //////////////////////////////////////// VARIABLES /////////////////////////////////////
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const initialEmployeeState = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    email: "",
  }

  //////////////////////////////////////// STATES /////////////////////////////////////
  const [userData, setUserData] = useState(initialEmployeeState);
  const [errors, setErrors] = useState('');
  // const [errors, setErrors] = useState(initialEmployeeState);

  //////////////////////////////////////// USE EFFECTS /////////////////////////////////////

  //////////////////////////////////////// FUNCTIONS /////////////////////////////////////
const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, username, password, phone, email } = userData;
    if (!firstName.trim() || !lastName.trim() || !username.trim() || !password.trim() || !phone.trim()) {
      setErrors("Make sure to provide all the fields");
      return;
    }
    // if (!validate()) return;

    const action = userType === 'employee' ? createEmployee : createClient;
    dispatch(action(userData, setOpen));
    setUserData(initialEmployeeState);
    setErrors('');
  };

  const handleChange = (field, value) => {
    setUserData((prevFilters) => ({ ...prevFilters, [field]: value, }));
  };

  const handleClose = () => {
    setOpen(false);
    setUserData(initialEmployeeState);
    setErrors(initialEmployeeState);
  };

  return (
    <div>
      <Dialog
        scroll={scroll}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">{userType === 'employee' ? 'Add New Employee' : 'Add New Client'}</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>{userType === 'employee' ? 'Employee Details' : 'Client Details'}</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">First Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={userData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    error={!!errors}
                    helperText={errors}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Last Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={userData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    error={!!errors}
                    helperText={errors}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">User Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={userData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    error={!!errors}
                    helperText={errors}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Email </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    placeholder={userType === 'employee' ? "Optional" : ""}
                    value={userData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required={userType !== 'employee'}
                    error={!!errors}
                    helperText={errors}
                  />
                </td>
              </tr>
              {userType === 'employee' && (
                <tr>
                  <td className="flex items-start pt-2 text-lg">Password </td>
                  <td className="pb-4">
                    <TextField
                      type="password"
                      value={userData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      size="small"
                      fullWidth
                      error={!!errors}
                      helperText={errors}
                    />
                  </td>
                </tr>
              )}
              <tr>
                <td className="flex items-start pt-2 text-lg">Phone </td>
                <td className="pb-4">
                  <TextField
                    type="number"
                    size="small"
                    value={userData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    fullWidth
                    error={!!errors}
                    helperText={errors}
                  />
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            variant="contained"
            type="reset"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            {isFetching ? 'Submitting...' : 'Submit'}
          </button>
        </DialogActions>
      </Dialog>
    </div>

  );
};

export default CreateUser;
