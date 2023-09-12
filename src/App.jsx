import { useState, useCallback, useEffect, useRef } from 'react'
import "./App.css";

function App() {

  const [length,setlength] = useState(8);
  const [numberallowed,setnumberallowed] = useState(false);
  const [characterallowed,setcharacterallowed] = useState(false);
  const [password,setpassword] = useState("");

  const passwordref = useRef(null);

  const passwordgenerator = useCallback(() => {
    
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberallowed) str += "0123456789"
    if (characterallowed) str+= "!@#$%^&*-_+=[]{}~`"

    for(let i = 1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setpassword(pass)

  },[length,numberallowed,characterallowed,setpassword])

  const copyPasswordToClipboard = useCallback(() => {

    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0, 12);
    window.navigator.clipboard.writeText(password);

  },[password])

  useEffect(() => {
    passwordgenerator()
  },[length,numberallowed,characterallowed,passwordgenerator])

  return (
    <div className="container">
      <h2>Password Generator</h2>
      <div className="result-container">
        <input type="text" value={password} readOnly ref={passwordref} id="result" />
        <button onClick={copyPasswordToClipboard} className="copy-result" id="copy">
          Copy
        </button>
      </div>
      <div className="settings">
        <div className="input-group">
          <label>Password length (6-20)</label>
          <input type="range" id="length" value={length} min={6} max={20} onChange={(e) => {setlength(e.target.value)}} />
          <span id="length-result">{length}</span>
        </div>
        <div className="input-group">
          <label>Include numbers</label>
          <input type="checkbox" defaultChecked={numberallowed} onChange={() => {setnumberallowed((prev) => !prev);}} id="numbers" />
        </div>
        <div className="input-group">
          <label>Include symbols</label>
          <input type="checkbox" defaultChecked={characterallowed} onChange={() => {setcharacterallowed((prev) => !prev);}} id="symbols" />
        </div>
      </div>
      <button className="generate-btn" id="generate">
        Your Password
      </button>
    </div>
  );
}

export default App;
