import { observable, runInAction } from 'mobx'

import { Slots } from "./Slots";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

const options = observable.object({
  name: "Javascript",
  sessions: 10,
  day: "Wednesday"
});


const onChange = (e) => {
  runInAction(() => {
    options.sessions = Number(e.target.value);
  });
};

const onDayChange = (day) => {
  runInAction(() => {
    options.day = String(day);
  });
};

function App() {
  return (
    <div className="container">
      <h1> Next Javascript training</h1>
      <div className="form-floating">
        <select
          className="form-select"
          id="floatingSelect"
          onChange={(e) => {
            onDayChange(e.target.value);
          }}
          aria-label="Floating label select example"
          defaultValue={options.day}>
          {days.map((day, index) => (
            <option key={index}>{day}</option>
          ))}
        </select>
        <label htmlFor="floatingSelect">Day</label>
      </div>
      <input
        {...{ onChange }}
        min="2"
        max="30"
        defaultValue={options.sessions}
        step="1"
        type="range"
        className="form-range"
        id="customRange1"
      />
      <Slots {...{ options }} />
    </div >
  )
}

export default App
