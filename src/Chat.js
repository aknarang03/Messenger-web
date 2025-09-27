import React, { useState, useEffect } from "react";
// React is the main react library
    // useState is a React Hook that lets you add a state to a component. for re rendering?
    // useEffect is a React Hook that lets you react (lol) to side effects (ie outside of rendering)

import { io } from "socket.io-client";
// connects to the socket server as a client

const socket = io("http://localhost:3000");
// same port as I use in server.js

function Chat() {
    // this is a component
    // they return JSX (HTML-like thing)
    // represents a piece of UI

    const [messages, setMessages] = useState([]); // useState: when the data changes, React automatically re-renders the whole component
        // messages = current value of the state (here it holds all chat msgs)
        // setMessages = a function to update messages
        // useState([]) inits messages as an empty array
    const [input, setInput] = useState("");
        // input = current value of the message typed in box
        // setInput = function to update input whenever user types
        // useState("") inits as empty string

    // when you call useState("")
    // it returns ["currentValue", "updateFunction"]
    // so youre setting input to curerntValue and setInput to updateFunction?
    
    useEffect(() => {
        // listen for chat-message event from server
        // this callback runs when we emit on the server
        // msg argument is the data coming back from the server
        socket.on("chat", (msg) => { 
            setMessages((prev) => [...prev, msg]); // update messages state in component
            // prev is the previous state value and we pass it in to look at it
            // [...prev, msg] is new array with prev messages plus new one on the end
        });

        socket.on("connect", () => console.log("Connected to server! Socket ID:", socket.id));
        socket.on("connect_error", (err) => console.log("Connection error:", err));
    
        // calls this when component unmounts ie is removed from UI
        return () => {
            socket.off("chat"); // remove listener for now
        };
    }, []); // [] means run this code when the component mounts

    const sendMessage = () => { // assign function to a variable
        if (input.trim() !== "") { // input is what the user typed; trim leading whitespace
            socket.emit("chat", input); // send to server over websocket
            setInput(""); // reset the state of the input box to be empty
        }
    };

    return ( // im not gonna bother with this ill learn syntax later
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
          <h2>Chat Room</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {messages.map((msg, i) => (
                <li key={i} style={{ marginBottom: 5 }}>{msg}</li>
            ))}
          </ul>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            style={{ width: "80%" }}
          />
          <button onClick={sendMessage} style={{ width: "20%" }}>Send</button>
        </div>
    );

}

export default Chat; 