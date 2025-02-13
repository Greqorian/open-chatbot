import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  // We store and update the responses we get from the API with this state
  // I've added a default value to the 'response' state that we should see
  // when the page initially loads
  const [response, setResponse] = useState<string>("Hi there! How can I assist you?");
  // We also store the input we get from the user in the 'value' state and
  // update it everytime the user types into the input field we have added below
  const [value, setValue] = useState<string>("");

  // We use this function in the newly added 'input' in the return statement.
  // Each time the user types into the input, this function ensures that the
  // 'value' state is updated
  // We also add a type to the event that we pass in
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  // This function runs when the user presses the button we have added below
  // This function takes the contents of 'value' (the input from the user)
  // and then sends this value to our server, which then sends a new request
  // to the API
  // The function then waits for the new response and updates the 'response'
  // value which we then display on the page
  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:3005/open-chat", {
      question: value,
    });
    setResponse(response.data);
  };

  // In our return statement, we add an input field so that the user can ask
  // questions to the API
  // We also add a button so that the user can submit their question which then
  // updates the response from the API
  // We show the updated response on our page
  return (
    <div className="container">
      <div>
        <input type="text" value={value} onChange={onChange}></input>
      </div>
      <div>
        <button onClick={handleSubmit}>Click me for answers!</button>
      </div>
      <div>
        <p>Chatbot: {response}</p>
      </div>
    </div>
  );
}

export default App;
