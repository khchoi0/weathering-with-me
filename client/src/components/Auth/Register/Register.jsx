import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useRef, useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { registerCall } from '../../../api/auth';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';

export const Register = () => {
	// Get input field values
	const username = useRef();
	const password = useRef();
	const conPassword = useRef();

	const [userExist, setUserExist] = useState(false);
	const [signupBtnEle, setSignupBtnEle] = useState('Sign up');

	const { dispatch } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const handleClick = async () => {
		setSignupBtnEle(<CircularProgress size={25} style={{ color: 'white' }} />);

		const response = await registerCall(
			{ username: username.current.value, password: password.current.value },
			dispatch
		);

		// User exists in database
		if (response) {
			setSignupBtnEle('Sign up');
			setUserExist(true);
			return;
		}
	};

	return (
		<Container maxWidth='xs'>
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5' color='primary.main'>
					Sign up
				</Typography>
				<Box
					component='form'
					noValidate
					sx={{ mt: 1 }}
					onSubmit={handleSubmit(handleClick)}>
					{userExist ? <Alert severity='error'>User already exists</Alert> : null}
					<TextField
						margin='normal'
						fullWidth
						label='Username'
						autoFocus
						inputRef={username}
						{...register('username', {
							required: 'Required field',
							pattern: {
								value: /^[\w]{4,20}$/i,
								message: 'Username must be between 4 and 20 characters',
							},
						})}
						error={!!errors?.username}
						helperText={errors?.username ? errors.username.message : null}
					/>
					<TextField
						margin='normal'
						fullWidth
						label='Password'
						type='password'
						autoComplete='current-password'
						inputRef={password}
						{...register('password', {
							required: 'Required field',
							pattern: {
								value: /^[\w]{4,20}$/i,
								message: 'Password must be between 4 and 20 characters',
							},
						})}
						error={!!errors?.password}
						helperText={errors?.password ? errors.password.message : null}
					/>
					<TextField
						margin='normal'
						fullWidth
						label='Confirm Password'
						type='password'
						inputRef={conPassword}
						{...register('conPassword', {
							required: 'Required field',
							validate: (val) => {
								if (watch('password') !== val) {
									return 'Passwords does not match';
								}
							},
						})}
						error={!!errors?.conPassword}
						helperText={errors?.conPassword ? errors.conPassword.message : null}
					/>
					<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
						{signupBtnEle}
					</Button>
					<Grid container alignItems='center' justifyContent='center'>
						<Grid item>
							<Link variant='body2' component={RouterLink} to='/login'>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};
