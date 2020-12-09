import React from 'react';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Image from 'material-ui-image'
 
import * as Yup from 'yup';

import history from '../Utilities/history';
import { useLogin } from '../Services/authenticationService';


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = props => {
    const login = useLogin();
    const classes = useStyles();

    return (
        <div className={classes.paper}>
            <Grid container>
                <Grid item>
                <Image color = "#BBFF83"
                        src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/c-alphanumeric-chat-app-icon-logo-design-template-ae25d5c301d9139be2c7c713b8db21bf_screen.jpg?ts=1600189572"
                    />
                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                        }}
                        validationSchema={Yup.object().shape({
                            username: Yup.string()
                                .required('Username is required')
                                .max(40, 'Username is too long'),
                            password: Yup.string()
                                .required('Password is required')
                                .max(100, 'Password is too long')
                                .min(6, 'Password too short'),
                        })}
                        onSubmit={(
                            { username, password },
                            { setStatus, setSubmitting }
                        ) => {
                            setStatus();
                            login(username, password).then(
                                () => {
                                    const { from } = history.location.state || {
                                        from: { pathname: '/chat' },
                                    };
                                    history.push(from);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                        }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            touched,
                            errors,
                        }) => (
                            <form
                                onSubmit={handleSubmit}
                                className={classes.form}
                            >
                                <TextField
                                    id="username"
                                    className={classes.textField}
                                    name="username"
                                    label="Username"
                                    fullWidth={true}
                                    variant="outlined"
                                    margin="normal"
                                    required={true}
                                    helperText={
                                        touched.username ? errors.username : ''
                                    }
                                    error={
                                        touched.username &&
                                        Boolean(errors.username)
                                    }
                                    value={values.username}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <AccountCircle />
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                                <TextField
                                    id="password"
                                    className={classes.textField}
                                    name="password"
                                    label="Password"
                                    fullWidth={true}
                                    variant="outlined"
                                    margin="normal"
                                    required={true}
                                    helperText={
                                        touched.password ? errors.password : ''
                                    }
                                    error={
                                        touched.password &&
                                        Boolean(errors.password)
                                    }
                                    value={values.password}
                                    onChange={handleChange}
                                    type="password"
                                />
                                <Button 
                                    variant="contained"
                                    type="submit"
                                    fullWidth={true}
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Login
                                </Button>
                            </form>
                        )}
                    </Formik>
                </Grid>
                <Grid item xs={9}>
                    <Typography>
                        <Link 
                            onClick={() => props.handleClick('register')}
                            href="#"
                        >
                            Don't have an account?
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;
