
import './App.css';
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function App() {
  const classes = useStyles();

  const [state, setState] = useState({
    email: true,
    phone: false,

  });
  const [drag, setDrag] = useState([
    {

      order: 1,
      id: "email",
      draggable: true,

      element: (<> <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"

      // autoFocus
      />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        /></>),
    },
    { order: 2, id: "or", draggable: false, element: (<Typography align="center" >Or</Typography>) }
    ,
    {
      order: 3,
      id: "phone",
      draggable: true,

      element: (<TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="phone"
        label="Phone number"
        name="phone"
        autoComplete="phone"
      />)
    }



  ]);
  const handleDrop = (ev) => {
    if (ev.currentTarget.id !== "or") {
      const dragBox = drag.find((box) => box.id === dragId);
      const dropBox = drag.find((box) => box.id === ev.currentTarget.id);

      const dragBoxOrder = dragBox.order;
      const dropBoxOrder = dropBox.order;

      const newDragState = drag.map((box) => {
        if (box.id === dragId) {
          box.order = dropBoxOrder;
        }
        if (box.id === ev.currentTarget.id) {
          box.order = dragBoxOrder;
        }
        return box;
      });

      setDrag(newDragState)
    }


  }
  const [dragId, setDragId] = useState();

  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id);

  };
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });


  }
  const handleDisplay = (d) => {
    let display = false;
    if (d === "email") {
      display = state.email

    }
    else if (d === "phone") {
      display = state.phone
    }
    else {
      display = state.email && state.phone
    }

    if (display) {
      return "block"
    }
    else {
      return "none"
    }

  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <FormGroup row>

          <FormControlLabel
            control={
              <Checkbox
                checked={state.email}
                onChange={handleChange}
                name="email"
                color="primary"
              />
            }
            label="Email"
          />
          <FormControlLabel
            control={<Checkbox checked={state.phone} onChange={handleChange} name="phone" />}
            label="Phone"
          />
        </FormGroup>
        <form className={classes.form} noValidate>


          {drag
            .sort((a, b) => a.order - b.order)
            .map((item) => (
              <div
                className={item.id === "or" ? "or" : state.email && state.phone ? "div" : ""}
                draggable={item.draggable}
                id={item.id}
                style={{ display: handleDisplay(item.id) }}
                onDragOver={(e) =>
                  e.preventDefault()

                }
                onDragStart={handleDrag}

                onDrop={handleDrop}

                key={item.id}
              >{item.element}</div>

            ))}


          {state.email || state.phone ? (<Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>) : null}



        </form>
      </div>

    </Container>
  );
}

