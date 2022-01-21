import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
    const [text, setText] = useState();
    const [input1, setInput1] = useState();
    const [input2, setInput2] = useState();
    const [input3, setInput3] = useState();

    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();
    const selectRef = useRef();

    useEffect(() => {
        selectRef.current.addEventListener("change", () => {
            console.log(selectRef);
        });
    });

    const handleSend = (e) => {
        e.preventDefault();
    };

    return (
        <div className="App">
            <div>
                Action:
                <select ref={selectRef}>
                    <option>Select</option>
                    <option>Get all users</option>
                    <option>Get specific user</option>
                    <option>Add a user</option>
                    <option>Delete a user</option>
                    <option>Withdraw cash</option>
                    <option>Deposit cash</option>
                    <option>Transfer cash</option>
                </select>
            </div>
            <div>
                <form>
                    <label>ID 1: </label>
                    <input
                        type={"text"}
                        ref={inputRef1}
                        onChange={(e) => setInput1(e.target.value)}
                        value={input1}
                    ></input>
                    <label>ID 2: </label>
                    <input
                        type={"text"}
                        ref={inputRef2}
                        onChange={(e) => setInput2(e.target.value)}
                        value={input2}
                    ></input>
                    <label>Money: </label>
                    <input
                        type={"number"}
                        ref={inputRef3}
                        onChange={(e) => setInput3(e.target.value)}
                        value={input3}
                    ></input>
                    <input
                        type={"button"}
                        value={"Send"}
                        onClick={handleSend}
                    ></input>
                </form>
            </div>
            <div>{text}</div>
        </div>
    );
}

export default App;
