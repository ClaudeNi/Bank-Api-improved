import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [text, setText] = useState();
    const [input1, setInput1] = useState();
    const [input2, setInput2] = useState();
    const [input3, setInput3] = useState();
    const [input4, setInput4] = useState();
    const [select, setSelect] = useState("Select");

    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();
    const inputRef4 = useRef();
    const selectRef = useRef();

    useEffect(() => {
        selectRef.current.addEventListener("change", () => {
            const tempSelect = selectRef.current.selectedOptions[0].text;
            setSelect(tempSelect);
            switch (tempSelect) {
                case "Get all users":
                    disableInputs([inputRef1, inputRef2, inputRef3, inputRef4]);
                    break;
                case "Get specific user":
                    disableInputs([inputRef2, inputRef3, inputRef4]);
                    break;
                case "Add a user":
                    disableInputs([inputRef2]);
                    break;
                case "Delete a user":
                    disableInputs([inputRef2, inputRef3, inputRef4]);
                    break;
                case "Withdraw cash":
                    disableInputs([inputRef2, inputRef4]);
                    break;
                case "Deposit cash":
                    disableInputs([inputRef2, inputRef4]);
                    break;
                case "Transfer cash":
                    disableInputs([inputRef4]);
                    break;
                default:
                    break;
            }
        });
    });

    const handleSend = (e) => {
        e.preventDefault();
        switch (select) {
            case "Get all users":
                fetchData("");
                break;
            case "Get specific user":
                if (inputRef1.current.value.length === 0) {
                    setText("Please fill in the ID in input ID 1");
                } else {
                    fetchData(`/${inputRef1.current.value}`);
                }
                break;
            case "Add a user":
                if (inputRef1.current.value.length === 0) {
                    setText("Please fill in the ID in input ID 1");
                } else {
                    updateData();
                }
                break;
            case "Delete a user":
                break;
            case "Withdraw cash":
                break;
            case "Deposit cash":
                break;
            case "Transfer cash":
                break;
            default:
                setText("Please select the action you want to make.");
                break;
        }
    };

    const fetchData = async (id) => {
        const fetchedData = await axios.get(`/users${id}`);
    };

    const updateData = async () => {};

    const deleteData = async () => {};

    const disableInputs = (inputs) => {
        inputs.forEach((input) => {
            input.current.disabled = true;
        });
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
                        disabled
                    ></input>
                    <label>ID 2: </label>
                    <input
                        type={"text"}
                        ref={inputRef2}
                        onChange={(e) => setInput2(e.target.value)}
                        value={input2}
                        disabled
                    ></input>
                    <label>Cash: </label>
                    <input
                        type={"number"}
                        ref={inputRef3}
                        onChange={(e) => setInput3(e.target.value)}
                        value={input3}
                        disabled
                    ></input>
                    <label>Credit: </label>
                    <input
                        type={"number"}
                        ref={inputRef4}
                        onChange={(e) => setInput4(e.target.value)}
                        value={input4}
                        disabled
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
