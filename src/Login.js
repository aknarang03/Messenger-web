import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
    
	const [username, setUsername] = useState("");
  	const [password, setPassword] = useState("");

  	const navigate = useNavigate();

	// redirect if already logged in
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
		navigate("/chat");
		}
	});

  	async function handleLogin(e) { // called when form is submitted

		e.preventDefault();

		try {

			const res = await fetch("http://localhost:3000/login", {
				method: "POST",
				headers: {
				"Content-Type": "application/json",
				},
				body: JSON.stringify({
				username,
				password,
				}),
			});

			const data = await res.json();

			if (res.ok) {
				console.log("Logged in:", data);
				localStorage.setItem("token", data.token); // save the JWT
				navigate("/chat");
			} else {
				if (data.error) {alert(data.error || "Login failed");}
				else {alert("Something went wrong");}
			}
		
		} catch (err) {
			console.error("Error logging in:", err);
			alert("Network error — make sure your server is running.");
		}

  	}

  	return (
		<div style={{maxWidth: 300, margin: "50px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8}}>
		
			<h2>Login</h2>

			<form onSubmit={handleLogin}>
				<div style={{marginBottom: 10}}>
					<input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "100%", padding: 8 }}/>
				</div>
				<div style={{ marginBottom: 10 }}>
					<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: 8 }}/>
				</div>
				<button type="submit" style={{width: "100%", padding: 10, backgroundColor: "#007bff", color: "white", border: "none", borderRadius: 4, cursor: "pointer"}}>Log In</button>
			</form>

			<button onClick={() => navigate("/register")} style={{width: "100%", padding: 10, marginTop: 10, backgroundColor: "#28a745", color: "white", border: "none", borderRadius: 4, cursor: "pointer",}}>Go to Register</button>
		
		</div>
  	);
}

export default Login;