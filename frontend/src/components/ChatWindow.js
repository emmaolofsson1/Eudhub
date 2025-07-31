import React, { useState } from "react";
import axios from "axios";

const ChatWindow = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/api/chat/ask", { question });
    setResponse(res.data.answer);
  };

  return (
    <div>
      <textarea value={question} onChange={(e) => setQuestion(e.target.value)} />
      <button onClick={handleSubmit}>Ask</button>
      <div><strong>AI:</strong> {response}</div>
    </div>
  );
};

export default ChatWindow;
