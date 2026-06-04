import React, { useState, useEffect, useRef } from "react";

function GPSWithIframeLogin() {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const iframeRef = useRef(null);
 
  const injectCredentialsIntoIframe = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) { 
      iframe.contentWindow.postMessage({
        type: 'CREDENTIALS',
        username: username,
        password: password
      }, '*');
       
      try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const usernameField = iframeDocument.querySelector('input[name="username"]') || 
                             iframeDocument.querySelector('input[type="text"]');
        const passwordField = iframeDocument.querySelector('input[name="password"]') || 
                             iframeDocument.querySelector('input[type="password"]');
        const submitButton = iframeDocument.querySelector('input[type="submit"]') || 
                            iframeDocument.querySelector('button[type="submit"]');
        
        if (usernameField && passwordField && submitButton) {
          usernameField.value = username;
          passwordField.value = password;
          submitButton.click();
          setShowLogin(false);
        }
      } catch (error) {
        console.log("Cannot access iframe DOM due to cross-origin policy");
      }
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {showLogin && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.8)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            background: "white",
            padding: "30px",
            borderRadius: "10px",
            width: "300px"
          }}>
            <h3>GPS Login</h3>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            />
            <button onClick={injectCredentialsIntoIframe} style={{ width: "100%", padding: "10px" }}>
              Login
            </button>
          </div>
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        src="https://gps.trackmycar.lk/index.php?au=17D49774E905C0B2484BCD68401BCA34&m=true"
        style={{ flex: 1, border: "none" }}
        title="GPS Tracking"
      />
    </div>
  );
}

export default GPSWithIframeLogin;