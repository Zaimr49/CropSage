import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';

const HomePage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const handleSend = async () => {

        if (input.trim()) {
            const userMessage = { sender: 'user', text: input };
            setMessages([...messages, userMessage]);

            // Simulating an API response
            const apiResponse = await mockApiResponse(input);
            const botMessage = { sender: 'bot', text: apiResponse };
            setMessages((prevMessages) => [...prevMessages, botMessage]);

            
        }
        setInput('');
    };

    const mockApiResponse = async (message) => {
        // Simulating a delay for the API response
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Response to: ${message}`);
            }, 1000);
        });
    };

    useEffect(() => {
        // Scroll to the bottom of the messages container whenever messages change
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="home-page">
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default HomePage;
