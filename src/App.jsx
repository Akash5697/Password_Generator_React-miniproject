import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  //define usestate hooks for state managemant
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  //function for generate password
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMONPQRSTUVWXYZabcdefghijklmonpqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*()_+{}?[]";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    
    setPassword(pass);

  }, [length, numberAllowed, charAllowed])

  //function for copy button
  const handleCopy = useCallback(() => {
    passwordRef.current?.select();
  navigator.clipboard.writeText(password);
  },[password])

  // calling the passwordGenerator function
  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])

  // Genetrating password manually
  const generatePassword = () => {
    passwordGenerator(); // Call function only when button is clicked
};


  return (
    <>
      <div className='container'>
        <h1>Password Generator</h1>
        <div className='content-holder1'>
          <div className='fild'>
          <input type="text"
            placeholder='Generate Password'
            value={password}
            readOnly
            ref={passwordRef}
            className='input1' />
          <button onClick={generatePassword}>Change</button>
          <button onClick={handleCopy}>copy</button>
          </div>
        </div>

        <div className='fild2'>
          <input type="range"
            min={0}
            max={20}
            value={length}
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label>Length: {length}</label>

          <input type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}/>
          <label>Number</label>

          <input type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}/>
          <label>Character</label>
        </div>
      </div>
    </>
  )
}

export default App
