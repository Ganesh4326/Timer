import React, { useState, useEffect, useRef } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaPaperPlane } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { BsPeople } from "react-icons/bs";
import { BsFillCircleFill } from "react-icons/bs";
import "./App.css";

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [mentionActive, setMentionActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const emojiButtonRef = useRef(null);
  const chatContainerRef = useRef(null);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        event.target !== emojiButtonRef.current
      ) {
        setShowEmojiPicker(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const formattedTime = (time) => {
    return time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const randomUser =
        user_list[Math.floor(Math.random() * user_list.length)];
      const currentTime = new Date();
      const newMessage = {
        user: randomUser,
        message: message.trim(),
        likes: 0,
        time: formattedTime(currentTime),
      };

      setChatMessages([...chatMessages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSelectEmoji = (emojiObject) => {
    const emoji = emojiObject.native;
    setMessage((prevMessage) => prevMessage + emoji);
  };

  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker((prevState) => !prevState);
  };

  const handleLike = (index) => {
    const updatedChatMessages = [...chatMessages];
    updatedChatMessages[index].likes += 1;
    setChatMessages(updatedChatMessages);
  };
  const handleMentionClick = () => {
    setMentionActive(true);
  };
  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setMessage((prevMessage) => prevMessage + `@${user}`);
    setMentionActive(false);
  };
  return (
    <div className="App">
      <div className="chat-container" ref={chatContainerRef}>
        <div className="intro">
          <div>
            <h4>Introductions</h4>
            <label>This channel is for Company wide chatter</label>
          </div>

          <p className="user-length">
            {user_list.length}|100 <BsPeople />
          </p>
        </div>
        <hr></hr>
        {chatMessages.map((chat, index) => (
          <div className="message" key={index}>
            <BsFillCircleFill style={{ width: "50px", height: "30px" }} />
            <span className="username">{chat.user}:</span>
            <span
              className="message-text"
              dangerouslySetInnerHTML={{ __html: chat.message }}
            ></span>
            <button className="like-button" onClick={() => handleLike(index)}>
              <AiFillLike className="like-btn" />
            </button>
            <span className="like-count">{chat.likes}</span>
            <br />
            <span className="message-time">{chat.time}</span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          className="item input-item"
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          ref={emojiButtonRef}
          onClick={handleToggleEmojiPicker}
          className="item emoji-button"
        >
          😀
        </button>
        {showEmojiPicker && <EmojiPicker onEmojiClick={handleSelectEmoji} />}
        {mentionActive && (
          <div className="mention-dropdown">
            {user_list.map((user, index) => (
              <div
                key={index}
                className="mention-user"
                onClick={() => handleUserSelection(user)}
              >
                {user}
              </div>
            ))}
          </div>
        )}
        <button onClick={handleSendMessage}>
          <FaPaperPlane className="send-icon" />
        </button>
      </div>
    </div>
  );
};

export default App;
