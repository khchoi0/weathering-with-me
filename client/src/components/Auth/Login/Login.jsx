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
import { useContext, useRef, useState } from 'react';
import { loginCall } from '../../../api/auth';
import { AuthContext } from '../../../context/AuthContext';
import { useForm } from 'react-hook-form';

export const Login = () => {
	// Get input field values
	const username = useRef();
	const password = useRef();

	const [validationFail, setValidationFail] = useState(false);

	const { dispatch } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleClick = async () => {
		const response = await loginCall(
			{ username: username.current.value, password: password.current.value },
			dispatch
		);

		// Validation fail
		if (response) {
			setValidationFail(true);
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
					Sign in
				</Typography>
				<Box component='form' sx={{ mt: 1 }} onSubmit={handleSubmit(handleClick)}>
					{validationFail ? (
						<Alert severity='error'>Username or password is incorrect</Alert>
					) : null}
					<TextField
						margin='normal'
						fullWidth
						label='Username'
						autoFocus
						inputRef={username}
						{...register('username', {
							required: 'Required field',
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
						})}
						error={!!errors?.password}
						helperText={errors?.password ? errors.password.message : null}
					/>
					<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
						Sign In
					</Button>
					<Grid container alignItems='center' justifyContent='center'>
						<Grid item>
							<Link variant='body2' component={RouterLink} to='/register'>
								Don't have an account? Sign Up
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};
