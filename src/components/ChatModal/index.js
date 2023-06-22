import React, {useState, useEffect, useRef} from "react";
import Loader from '../Loader';
import './style.css'

const ChatModal = ({ handleClose, isSmallDoc = false }) => {
    
  const [ loading, setLoading ] = useState(false); 
  const [ chatInputText, setChatInputText ] = useState('')
  const [ chatMessages, setChatMessages ] = useState([{role: 'Vision', message: 'Hi, I am your personal assistant. I have read the document that was uploaded. Please feel free to ask me any questions about it! '}])
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat messages container when chatMessages change
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const callChatAPI = async () => {
    setLoading(true)
    const chat = [...chatMessages]
    chat.push({ role: 'Human', message: chatInputText})
    try {
      if(isSmallDoc){
        const response = await fetch(`${process.env.REACT_APP_API_DEFAULT_URL}/smallChat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ chat: chatInputText, count: chat.length }),
        });
        const data = await response.json();
        chat.push({ role: 'Vision', message: data.chatResult.response})
        setChatMessages(chat)
        console.log('Chat successful');
        setLoading(false)
      } else {
        const response = await fetch(`${process.env.REACT_APP_API_DEFAULT_URL}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ chat: chatInputText }),
        });
        const data = await response.json();
        chat.push({ role: 'Vision', message: data.chatResult.text})
        setChatMessages(chat)
        console.log('Chat successful');
        setLoading(false)
      }
    } catch (error) {
      console.log('Error:', error);
      setLoading(false)
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      callChatAPI();
    }
  };

  return (
    <div className="chat-modal-container">
      <div className="chat-modal-content">
        <div className="chat-modal-header">
          <span className="close-icon" onClick={handleClose}>&times;</span>
        </div>
        <div className="chat-modal-body" ref={messagesContainerRef}>
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.role === 'Vision' ? 'bot-message' : 'human-message'}`}
            >
              <span className="role">{`${message.role} : `}</span>
              <span className="message-text">{message.message}</span>
            </div>
          ))}
        </div>
        <div className="chat-modal-footer">
          <input
            type="text"
            value={chatInputText}
            onChange={(e) => setChatInputText(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Type your message..."
          />
          <button onClick={callChatAPI}>Send</button>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default ChatModal;