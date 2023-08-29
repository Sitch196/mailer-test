import React, { useState } from "react";
import "./styles.css";

function App() {
  const [emailData, setEmailData] = useState({
    sender: "",
    subject: "",
    text: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendEmail = async () => {
    try {
      const email = await fetch("http://127.0.0.1:5000/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });
      await email.json();
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email", error);
    }
  };

  return (
    <div className="container">
      <h1>Email Sending Example</h1>
      <div className="form-group">
        <label>Sender:</label>
        <input
          type="email"
          name="sender"
          value={emailData.sender}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Subject:</label>
        <input
          type="text"
          name="subject"
          value={emailData.subject}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Text:</label>
        <textarea
          name="text"
          value={emailData.text}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="button-container">
        <button className="button" onClick={sendEmail}>
          Send Email
        </button>
      </div>
    </div>
  );
}

export default App;
