import React, { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "1234567890";
    if (characters) str += "!@#$%^&*{}[]()?><_-+=";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, characters, setPassword]);

  useEffect(() => {
    //useEffect- to avoid side effects in the project
    passwordGenerator();
  }, [length, number, characters, passwordGenerator]);

  const copyToClipboard = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password)
    alert("copied to clipboard")
    // window.navigator.clipboard.writeText(number)
  }, [password]);

  return (
    <div className="w-full p-6 max-w-md mx-auto shadow-md rounded-xl px-4 my-8 text-orange-500 bg-gray-800">
      <h1 className="text-center text-white mb-3 my-3">PASSWORD GENERATOR</h1>
      <div className="flex shadow rounded-xl overflow-hidden mb-5">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          readOnly
          ref={passRef}
        />
        <button
          className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 hover:bg-blue-800"
          onClick={copyToClipboard}
        >
          COPY
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>LENGTH: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={number}
            id="numberInput"
            onChange={() => {
              setNumber((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">NUMBERS</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={characters}
            id="charactersInput"
            onChange={() => {
              setCharacters((prev) => !prev);
            }}
          />
          <label htmlFor="charactersInput">CHARACTERS</label>
        </div>
      </div>
    </div>
  );
}

export default App;
