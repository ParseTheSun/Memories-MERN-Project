import React from 'react';
import { Container } from '@material-ui/core'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google'
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
	

	return (
		<BrowserRouter>
			<Container maxWidth="lg">
				<Navbar />
				<GoogleOAuthProvider clientId="924672652721-o9nbp16vdjvu56eqv84earrtcjpfiugj.apps.googleusercontent.com">
				<Routes>
					<Route path="/" exact element={<Home />}/>
					<Route path="/auth" exact element={<Auth />}/>	
				</Routes>
				</GoogleOAuthProvider>
			</Container>
		</BrowserRouter>
	)
}

export default App;