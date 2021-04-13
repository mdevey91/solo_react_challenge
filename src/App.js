import { useReducer, useState } from "react"
import './App.css';
import SenatorService from "./services/SenatorService"
import RepresentativeService from "./services/RepresentativeService"

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value
  }
 }

function App() {
  const [currentSenators, setCurrentSenators] = useState(null)
  const [formData, setFormData] = useReducer(formReducer, {})
  const [currentState, setCurrentState] = useState("")

  const handleFiltersSubmit = event => {
    event.preventDefault();
    console.log(formData)
      setCurrentSenators(currentSenators.filter(senator => {
        for (const [key, value] of Object.entries(formData)) {
          console.log("key: ", key, "value: ", value)
          if (!senator[key].toLowerCase().includes(value.toLowerCase())) {
            return false
          }
      }
      return true
    }))
  }

  const handleSeachSubmit = async event => {
    event.preventDefault()
    console.log("currentState: ", currentState)
    const senators = await SenatorService.getSenators(currentState)
    console.log("senators: ", senators)
    if (senators) {
      setCurrentSenators(senators)
    } else {
      return <h2>There was an error! Please refresh the page.</h2>
    }

  }
  console.log("currentSenators: ", currentSenators)
  
  return (
    <div className="App">
      <h1>Who's My Senator?</h1>
      {!currentSenators ? (
        <div> 
          <form onSubmit={handleSeachSubmit}>
            <input 
              name="state" 
              placeholder="UT"
              value={currentState}
              onChange={(event) => setCurrentState(event.target.value)} 
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div> 
          <div className="filters">
            <h2>filters</h2>
            <form onSubmit={handleFiltersSubmit}>
              <fieldset>
                <label>Name: </label>
                <input name="name" onChange={setFormData}/>
                <label>District: </label>
                <input name="district" onChange={setFormData}/>
                <label>Phone: </label>
                <input name="phone" onChange={setFormData}/>
                <label>Party: </label>
                <input name="party" onChange={setFormData}/>
              </fieldset>
              <button type="submit">Submit</button>
            </form>
          </div>
          {currentSenators.length < 1 ? (<h1>No matches</h1>) : (
            <table>
              <tr key={"header"}>
                {Object.keys(currentSenators[0]).map((key) => (
                  <th>{key}</th>
                ))}
              </tr>
              {currentSenators.map((item) => (
              <tr key={item.id}>
                {Object.values(item).map((val) => (
                  <td>{val}</td>
                ))}
              </tr>
            ))}
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
