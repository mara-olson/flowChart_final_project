function Periods(props) {
  return (
    <div>
      <AddPeriodButton
        userId={props.userId}
        editMode={props.editMode}
        setEditMode={props.setEditMode}
        periods={props.periods}
        setPeriods={props.setPeriods}
        error={props.error}
        setError={props.setError}
        modalError={props.modalError}
        setModalError={props.setModalError}
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        modalContent={props.modalContent}
        setModalContent={props.setModalContent}
      />
      <PeriodContainer
        userId={props.userId}
        editMode={props.editMode}
        setEditMode={props.setEditMode}
        periods={props.periods}
        setPeriods={props.setPeriods}
        error={props.error}
        setError={props.setError}
        modalError={props.modalError}
        setModalError={props.setModalError}
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        modalContent={props.modalContent}
        setModalContent={props.setModalContent}
      />
    </div>
  );
}

function PeriodContainer(props) {
  const periodDetails = [];

  for (const period of props.periods) {
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
        editMode={props.editMode}
        setEditMode={props.setEditMode}
        key={period.mense_id}
        flowVolume={period.flow}
        periodDate={period.date}
        createdAt={period.created_at}
        notes={period.notes}
        symptoms={symptoms}
        periods={props.periods}
        setPeriods={props.setPeriods}
        setShowModal={props.setShowModal}
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

  const handleClick = (evt) => {
    evt.preventDefault();
    props.setEditMode(true);
    // showPeriodForm();
    periodFormTitle = "Edit Period";
    periodFormButtonName = "Save";

    props.setModalContent(<PeriodForm />);
    props.setShowModal(true);
    console.log("editMode: ", props.editMode);
  };

  return (
    <div className="card">
      <p>Flow: {props.flowVolume}</p>
      <div>Symptoms: {sxToDisplay}</div>
      <p>Date: {props.periodDate}</p>
      {props.notes && <p>{props.notes}</p>}
      <button onClick={handleClick}>Edit</button>
    </div>
  );
}

function AddPeriodButton(props) {
  const periodFormButtonName = "Add Period";
  const periodFormTitle = "New Period";

  const handleClick = () => {
    // evt.preventDefault();
    props.setShowModal(true);
    props.setModalContent(
      <PeriodForm
        userId={props.userId}
        editMode={props.editMode}
        setEditMode={props.setEditMode}
        periods={props.periods}
        setPeriods={props.setPeriods}
        setError={props.setError}
        modalError={props.modalError}
        setModalError={props.setModalError}
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        modalContent={props.modalContent}
        setModalContent={props.setModalContent}
        periodId={props.periodId}
        periodFormButtonName={periodFormButtonName}
        periodFormTitle={periodFormTitle}
      />
    );
    // return (
    //   <Modal
    //     userId={props.userId}
    //     editMode={props.editMode}
    //     setEditMode={props.setEditMode}
    //     onClose={props.closeModal}
    //     showModal={props.showModal}
    //     setModalContent={props.setModalContent}
    //     modalContent={props.modalContent}
    //     modalError={props.modalError}
    //     setModalError={props.setModalError}
    //   />
    // );
  };
  return <button onClick={handleClick}>Add Period</button>;
}

function PeriodForm(props) {
  const [periodId, setPeriodId] = React.useState(props.periodId);
  const [flowVolume, setFlowVolume] = React.useState(null);
  const [mood, setMood] = React.useState(false);
  const [cramps, setCramps] = React.useState(false);
  const [bloating, setBloating] = React.useState(false);
  const [fatigue, setFatigue] = React.useState(false);
  const [periodDate, setPeriodDate] = React.useState(props.selectedDate);
  const [notes, setNotes] = React.useState(null);

  const handleEditPeriod = (evt) => {
    console.log("editPeriod");
    evt.preventDefault();

    fetch(`/api/${props.userId}/periods/${periodId}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        user_id: props.userId,
        period_id: periodId,
        flow_volume: flowVolume,
        mood: mood,
        cramps: cramps,
        bloating: bloating,
        fatigue: fatigue,
        mense_date: periodDate,
        notes: notes,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setFlowVolume(data.flowVolume);
          setMood(data.mood);
          setBloating(data.bloating);
          setCramps(data.cramps);
          setFatigue(data.fatigue);
          setPeriodDate(data.periodDate);
          setNotes(data.notes);
          console.log("successful edit", flowVolume);

          fetch(`/api/${props.userId}/periods`)
            .then((response) => response.json())
            .then((data) => {
              props.setPeriods(data.periods);
              props.setShowModal(false);
              props.setEditMode(false);
            });
        } else {
          console.log(data.error);
          props.setModalError(data.error);
        }
      });
  };

  const handleAddPeriod = (evt) => {
    evt.preventDefault();

    fetch(`/api/${props.userId}/periods`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        user_id: props.userId,
        flow_volume: flowVolume,
        mood: mood,
        cramps: cramps,
        bloating: bloating,
        fatigue: fatigue,
        mense_date: periodDate,
        notes: notes,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPeriodId(data.mense_id);
          setFlowVolume(data.flowVolume);
          setMood(data.mood);
          setBloating(data.bloating);
          setCramps(data.cramps);
          setFatigue(data.fatigue);
          setPeriodDate(data.periodDate);
          setNotes(data.notes);
          console.log("successful add", flowVolume);

          fetch(`/api/${props.userId}/periods`)
            .then((response) => response.json())
            .then((data) => {
              props.setPeriods(data.periods);
              props.setShowModal(false);
            });
        } else {
          console.log(data.error);
          props.setModalError(data.error);
        }
      });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (props.editMode) {
      handleEditPeriod();
    } else {
      handleAddPeriod();
    }
  };

  return (
    <div>
      <form id="period-form" onSubmit={handleSubmit}>
        <label htmlFor="date">Date of event</label>
        <input
          type="date"
          name="mense_date"
          value={periodDate}
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
