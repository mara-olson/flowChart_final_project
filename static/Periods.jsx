function Periods(props) {
  const [periods, setPeriods] = React.useState([]);

  React.useEffect(() => {
    if (props.userId) {
      fetch(`/api/users/${props.userId}/periods`)
        .then((response) => response.json())
        .then((data) => setPeriods(data.periods));
    }
  }, [props.userId]);

  const periodDetails = [];

  for (const period of periods) {
    const symptoms = [];
    if (period.mood) {
      symptoms.push("Moodiness");
    }
    if (period.cramps) {
      symptoms.push("Cramps");
    }
    if (period.bloating) {
      symptoms.push("Bloating");
    }
    if (period.fatigue) {
      symptoms.push("Fatigue");
    }
    // console.log(symptoms);
    periodDetails.push(
      <PeriodCard
        userId={props.userId}
        key={period.mense_id}
        volume={period.flow_volume}
        date={period.created_at}
        symptoms={symptoms}
      />
    );
  }
  return (
    <div>
      <div>{periodDetails}</div>
    </div>
  );
}

function PeriodCard(props) {
  const sxToDisplay = [];
  for (const symptom of props.symptoms) {
    // console.log(symptom);
    sxToDisplay.push(
      <ul>
        <li>{symptom}</li>
      </ul>
    );
  }

  return (
    <div className="card">
      <p>Flow: {props.volume}</p>
      <div>Symptoms: {sxToDisplay}</div>
      <p>Date: {props.date}</p>
    </div>
  );
}

function PeriodForm(props) {
  const [flowVolume, setFlowVolume] = React.useState(null);
  const [mood, setMood] = React.useState(false);
  const [cramps, setCramps] = React.useState(false);
  const [bloating, setBloating] = React.useState(false);
  const [fatigue, setFatigue] = React.useState(false);
  const [periodDate, setPeriodDate] = React.useState(null);
  const [notes, setNotes] = React.useState(null);

  const handleAddPeriod = (evt) => {
    // console.log(evt);
    evt.preventDefault();

    const userId = props.userId;

    fetch("/api/add-period", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        user_id: userId,
        flow_volume: flowVolume,
        mood: mood,
        cramps: cramps,
        bloating: bloating,
        fatigue: fatigue,
        notes: notes,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // if (data.success) {
        console.log(data.flow_volume);
        // } else {
        // console.log("error");
        // props.setError(data.error);
      });
  };
  return (
    <div>
      <form id="period-form" onSubmit={handleAddPeriod}>
        <label htmlFor="date">Date of event</label>
        <input
          type="text"
          name="date"
          onChange={(evt) => setPeriodDate(evt.currentTarget.value)}
        />

        <br></br>
        <fieldset name="flow-form" id="period-form" disabled={false}>
          <legend>What's your flow?</legend>
          <select
            name="flow-volume"
            onChange={(evt) => setFlowVolume(evt.currentTarget.value)}
          >
            <option value="No Flow">No Flow</option>
            <option value="Light">Light</option>
            <option value="Moderate">Moderate</option>
            <option value="Heavy">Heavy</option>
          </select>
        </fieldset>
        <br></br>
        <fieldset name="sx-form" id="period-form" disabled={false}>
          <legend>What symptoms are you experiencing?</legend>
          <input
            type="checkbox"
            name="mood"
            onChange={(evt) => setMood(evt.currentTarget.checked)}
          />
          <label htmlFor="mood">Moodiness</label>
          <br></br>

          <input
            type="checkbox"
            name="cramps"
            onChange={(evt) => setCramps(evt.currentTarget.checked)}
          />
          <label htmlFor="cramps">Cramps</label>
          <br></br>

          <input
            type="checkbox"
            name="bloating"
            onChange={(evt) => setBloating(evt.currentTarget.checked)}
          />
          <label htmlFor="bloating">Bloating</label>
          <br></br>

          <input
            type="checkbox"
            name="fatigue"
            onChange={(evt) => setFatigue(evt.currentTarget.checked)}
          />
          <label htmlFor="fatigue">Fatigue</label>
        </fieldset>
        <br></br>

        <label htmlFor="notes">Notes</label>
        <br></br>

        <textarea
          id="notes"
          name="periodNotes"
          onChange={(evt) => setNotes(evt.currentTarget.value)}
        />
        <br></br>
        <button type="submit">Add Period</button>
      </form>
    </div>
  );
}
