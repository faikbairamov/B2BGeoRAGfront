import React from 'react'
import Navbar from '../Components/Navbar'
import "../PageStyles/chatPageCSS.css";

function ChatPage() {
  return (
    <>
    <div className="navbarContainer">
    <Navbar />
    </div>

    <div className="container">

      
      <div className="chatContainer">
        <div className="testcomponent">
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="testcomponent">
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="testcomponent">
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="testcomponent">
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="testcomponent">
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="testcomponent">
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default ChatPage