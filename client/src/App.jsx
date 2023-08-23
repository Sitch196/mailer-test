import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const [emailData, setEmailData] = useState({
    to: "",
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
      await axios.post("/send-email", emailData);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email", error);
    }
  };

  return (
    <div className="container">
      <h1>Email Sending Example</h1>
      <div className="form-group">
        <label>To:</label>
        <input
          type="email"
          name="to"
          value={emailData.to}
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
