import {useParams} from "react-router-dom"; // use URL params
import {useEffect, useState} from "react";

function Profile() {

	const {username} = useParams();
	const [user, setUser] = useState(null);

	useEffect(() => { // runs upon rendering
		fetch(`http://localhost:3000/user/getUserData/${username}`) // I didn't necessarily have to make the route match. I could call it getUserData
			.then(res => res.json()) // parses the response body, which is the user data
			.then(userData => setUser(userData)) // userData is the result of the previous .then
			.catch(err => console.error(err));
  	}, [username]); // re run this effect every time user changes

	if (!user) return <div>Loading...</div>; // will update when user loads because of useState

    return (
		<div style={{maxWidth: 300, margin: "50px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8}}>
		
			<h2>{user.username}</h2>
			<img src={user.avatar}/>
			
		</div>
  	);

}

export default Profile; 