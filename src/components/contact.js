import { Alert, Box, Button, Container, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const StyledContactForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

// function formValidation(e) {
//     e.preventDefault()

//     if() {

//     } else {

//     }
// }

export function MUIContact() {
  const [fullNameMessage, setFullNameMessage] = useState("");
  const [subjectMessage, setSubjectMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [bodyMessage, setBodyMessage] = useState("");
  let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const [open, setOpen] = useState(false);

  const initialFormData = {
    fullName: "",
    email: "",
    subject: "",
    body: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.fullName.length < 3) {
      setFullNameMessage("Name must be at least 3 characters");
    } else if (formData.fullName.length >= 3) {
      setFullNameMessage("");
    }

    if (formData.subject.length < 3) {
      setSubjectMessage("Name must be at least 3 characters");
    } else if (formData.subject.length >= 3) {
      setSubjectMessage("");
    }

    if (!emailRegex.test(formData.email)) {
      setEmailMessage("Must be a valid email");
    } else if (emailRegex.test(formData.email)) {
      setEmailMessage("");
    }

    if (formData.body.length < 3) {
      setBodyMessage("Name must be at least 3 characters");
    } else if (formData.body.length >= 3) {
      setBodyMessage("");
    }

    if (formData.fullName.length > 3 && formData.subject.length > 3 && emailRegex.test(formData.email) && formData.body.length > 3) {
      setOpen(true);
      console.log("Message sent");
      setFormData(initialFormData);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <main>
      <Container sx={{ marginY: "50px" }}>
        <Box maxWidth={700} margin="0 auto">
          <Typography align="center" component="h1" variant="h4" marginBottom={2}>
            Contact us
          </Typography>
          <StyledContactForm noValidate action="./" onSubmit={handleSubmit}>
            <TextField value={formData.fullName} onChange={handleChange} name="fullName" id="fullName" autoFocus required label="Full name" error={fullNameMessage !== ""} helperText={fullNameMessage}></TextField>
            <TextField value={formData.subject} onChange={handleChange} name="subject" id="subject" required label="Subject" error={subjectMessage !== ""} helperText={subjectMessage}></TextField>
            <TextField type="email" value={formData.email} onChange={handleChange} name="email" id="email" required label="Email" error={emailMessage !== ""} helperText={emailMessage}></TextField>
            <TextField value={formData.body} onChange={handleChange} name="body" id="body" required rows="4" placeholder="Wrte your message here..." multiline label="Message" error={bodyMessage !== ""} helperText={bodyMessage}></TextField>
            <Button type="submit" variant="contained">
              Send
            </Button>
          </StyledContactForm>
        </Box>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} action={action}>
          <Alert severity="success" onClose={handleClose} sx={{ width: "100%" }}>
            Message successfully sent 📨
          </Alert>
        </Snackbar>
      </Container>
    </main>
  );
}
