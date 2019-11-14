import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Formik, Field } from "formik";
import * as yup from "yup";

import { addUser } from "../../../API/";
import Button from "../Button";
import { ResponseLabel } from "../../ResponseLabel";
import { StyledContainer, StyledFieldContainer } from "./styled";
import validation from "../../../util/validation";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generateData = values => {
    const { email, firstName, lastName } = values;
    return {
      email,
      namefirst: firstName,
      namelast: lastName
    };
  };

  const submitValues = async values => {
    const data = generateData(values);
    const userAdded = await addUser(data);

    if (userAdded !== undefined) {
      handleClose();
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: ""
      }}
      onSubmit={values => submitValues(values)}
      validationSchema={yup.object().shape({
        firstName: validation.firstName,
        lastName: validation.lastName,
        email: validation.email
      })}
    >
      {({ values, handleChange, handleSubmit, errors, touched }) => {
        return (
          <>
            <div>
              <Button
                type="button"
                title={"Add User"}
                onClick={handleOpen}
                fill={"primary"}
              >
                Add User
              </Button>
              <Modal open={open} onClose={handleClose}>
                <div style={modalStyle} className={classes.paper}>
                  <StyledFieldContainer>
                    <h1 style={{ fontSize: 12 }}>First Name</h1>
                    <Field
                      values={values.firstName}
                      onChange={handleChange("firstName")}
                      type="name"
                      name="firstName"
                      placeholder="First Name"
                    />
                    {errors.firstName && touched.firstName && (
                      <ResponseLabel style={"red"} message={errors.firstName} />
                    )}

                    <h1 style={{ fontSize: 12 }}>Last Name</h1>
                    <Field
                      values={values.lastName}
                      onChange={handleChange("lastName")}
                      type="name"
                      name="lastName"
                      placeholder="Last Name"
                    />
                    {errors.lastName && touched.lastName && (
                      <ResponseLabel
                        style={"red"}
                        message={errors.lastName}
                      ></ResponseLabel>
                    )}
                    <h1 style={{ fontSize: 12 }}> Email</h1>
                    <Field
                      values={values.email}
                      onChange={handleChange("email")}
                      type="email"
                      name="email"
                      placeholder="email"
                    />
                    {errors.email && touched.email && (
                      <ResponseLabel style={"red"} message={errors.email} />
                    )}
                  </StyledFieldContainer>

                  <StyledContainer>
                    <Button
                      onClick={handleClose}
                      fill={"secondary"}
                      title="Cancel"
                    ></Button>
                    <Button
                      onClick={handleSubmit}
                      fill={"primary"}
                      title="Save"
                    ></Button>
                  </StyledContainer>
                </div>
              </Modal>
            </div>
          </>
        );
      }}
    </Formik>
  );
}
