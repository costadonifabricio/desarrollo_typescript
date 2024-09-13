import React, { useState } from "react";
import Register from "../src/components/register";
import Login from "../src/components/login";
import "../public/app.css"; 

function App() {
  const [isRegistering, setIsRegistering] = useState(true);

  const toggleAuthForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="App">
      <div className="container">
        {isRegistering ? (
          <Register onLoginClick={toggleAuthForm} />
        ) : (
          <Login onRegisterClick={toggleAuthForm} />
        )}
      </div>
    </div>
  );
}

export default App;
