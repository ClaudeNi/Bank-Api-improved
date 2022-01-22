import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [text, setText] = useState();
    const [ID1, setID1] = useState();
    const [ID2, setID2] = useState();
    const [Cash, setCash] = useState();
    const [Credit, setCredit] = useState();
    const [select, setSelect] = useState("Select");

    const id1Ref = useRef();
    const id2Ref = useRef();
    const cashRef = useRef();
    const creditRef = useRef();
    const selectRef = useRef();

    useEffect(() => {
        selectRef.current.addEventListener("change", () => {
            const tempSelect = selectRef.current.selectedOptions[0].text;
            setSelect(tempSelect);
            enableAllInputs();
            switch (tempSelect) {
                case "Get all users":
                    disableInputs([id1Ref, id2Ref, cashRef, creditRef]);
                    break;
                case "Get specific user":
                    disableInputs([id2Ref, cashRef, creditRef]);
                    break;
                case "Add a user":
                    disableInputs([id2Ref]);
                    break;
                case "Delete a user":
                    disableInputs([id2Ref, cashRef, creditRef]);
                    break;
                case "Withdraw cash":
                    disableInputs([id2Ref, creditRef]);
                    break;
                case "Deposit cash":
                    disableInputs([id2Ref, creditRef]);
                    break;
                case "Transfer cash":
                    disableInputs([creditRef]);
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
                if (id1Ref.current.value.length === 0) {
                    setText("Please fill in the ID in input ID 1");
                } else {
                    fetchData(`/${id1Ref.current.value}`);
                }
                break;
            case "Add a user":
                if (id1Ref.current.value.length === 0) {
                    setText("Please fill in the ID in input ID 1");
                } else {
                    updateData();
                }
                break;
            case "Delete a user":
                if (id1Ref.current.value.length === 0) {
                    setText("Please fill in the ID in input ID 1");
                } else {
                    deleteData();
                }
                break;
            case "Withdraw cash":
                if (
                    id1Ref.current.value.length === 0 ||
                    cashRef.current.value.length === 0
                ) {
                    setText(
                        "Please fill in the requested Data in the open Inputs"
                    );
                } else {
                    updateData();
                }
                break;
            case "Deposit cash":
                if (
                    id1Ref.current.value.length === 0 ||
                    cashRef.current.value.length === 0
                ) {
                    setText(
                        "Please fill in the requested Data in the open Inputs"
                    );
                } else {
                    updateData();
                }
                break;
            case "Transfer cash":
                if (
                    id1Ref.current.value.length === 0 ||
                    id2Ref.current.value.length === 0 ||
                    cashRef.current.value.length === 0
                ) {
                    setText(
                        "Please fill in the requested Data in the open Inputs"
                    );
                } else {
                    updateData();
                }
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

    const enableAllInputs = () => {
        id1Ref.current.disabled = false;
        id2Ref.current.disabled = false;
        cashRef.current.disabled = false;
        creditRef.current.disabled = false;
    };

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
                        ref={id1Ref}
                        onChange={(e) => setID1(e.target.value)}
                        value={ID1}
                        disabled
                    ></input>
                    <label>ID 2: </label>
                    <input
                        type={"text"}
                        ref={id2Ref}
                        onChange={(e) => setID2(e.target.value)}
                        value={ID2}
                        disabled
                    ></input>
                    <label>Cash: </label>
                    <input
                        type={"number"}
                        ref={cashRef}
                        onChange={(e) => setCash(e.target.value)}
                        value={Cash}
                        disabled
                    ></input>
                    <label>Credit: </label>
                    <input
                        type={"number"}
                        ref={creditRef}
                        onChange={(e) => setCredit(e.target.value)}
                        value={Credit}
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
