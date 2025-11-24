import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
		navigate("/chat");
		}
	});

	async function handleRegister(e) {

		e.preventDefault(); // stops browser's default behavior for this event

		const res = await fetch("http://localhost:3000/register", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({username, password}),
		});

		const data = await res.json();

		if (res.ok) {
			console.log("Registered successfully:", data);
			localStorage.setItem("token", data.token); // store JWT
			alert("Account created! You are now logged in.");
			navigate("/chat");
		} else {
			if (data.error) {alert(data.error);}
			else {alert("Something went wrong");}
		}

	}

	return (
		<div style={{ maxWidth: 400, margin: "2rem auto" }}>
			<h2>Create Account</h2>
			<form onSubmit={handleRegister}>
				<input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ display: "block", marginBottom: "1rem", width: "100%" }}/>
				<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ display: "block", marginBottom: "1rem", width: "100%" }}/>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default Register;
