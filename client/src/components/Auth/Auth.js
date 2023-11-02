import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Input from "./Input"
import { useGoogleLogin } from '@react-oauth/google'
import Icon from './Icon'
import axios from 'axios'

import useStyles from './styles'

const Auth = () => {
	const classes = useStyles()
	const [isSignup, setIsSignUp] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const handleSubmit = () => {

	}
	const handleChange = () => {

	}

	const handleShowPassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword)
	}

	const switchMode = () => {
		setIsSignUp((prevIsSignUp) => !prevIsSignUp)
		setShowPassword(false)
	}

	const googleSuccess = async (tokenResponse) => {
		const result = await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
		
		console.log(result.data)
	}

	const googleFailure = (error) => {
		console.log(error)
		console.log("Google Sign In unsuccessful. Try Again Later")
	}

	const login = useGoogleLogin({
		onSuccess: googleSuccess,
		onFailure: googleFailure,
	})

	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{
							isSignup && (
								<>
									<Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
									<Input name="lastName" label="Last Name" handleChange={handleChange} half />
								</>
							)
						}
						<Input name="email" label="Email Address" handleChange={handleChange} autoFocus={!isSignup ? true : false} type="email" />
						{/* 
						autofocuses the first time, after button switch stops autofocusing
						"changing the value of autoFocus during the component lifecycle won't influence the focus state"
						-possibly need to rerender whole input component
					*/}
						<Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
						{isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
					</Grid>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
						{isSignup ? 'Sign Up' : 'Sign In'}
					</Button>
					<Button 
						className={classes.googleButton} 
						color="primary" 
						fullWidth 
						onClick={login}
						startIcon={<Icon />} 
						variant="contained">
							Google Sign In
					</Button>
					<Grid container justifyContent="flex-end">
						<Button onClick={switchMode}>
							{isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
						</Button>
					</Grid>
				</form>
			</Paper>
		</Container>
	)
}

export default Auth