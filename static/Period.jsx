function AddPeriodForm(props) {
  const [periodId, setPeriodId] = React.useState(props.periodId);
  const [flowVolume, setFlowVolume] = React.useState(props.flowVolume);
  const [mood, setMood] = React.useState(props.mood);
  const [cramps, setCramps] = React.useState(props.cramps);
  const [bloating, setBloating] = React.useState(props.bloating);
  const [fatigue, setFatigue] = React.useState(props.fatigue);
  const [periodDate, setPeriodDate] = React.useState(props.selectedDate);
  const [periodNotes, setPeriodNotes] = React.useState(props.periodNotes);

  const handleAddAPeriod = (evt) => {
    evt.preventDefault();

    fetch(`/api/${props.userId}/periods`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        user_id: props.userId,
        mense_id: periodId,
        flow_volume: flowVolume,
        mood: mood,
        cramps: cramps,
        bloating: bloating,
        fatigue: fatigue,
        mense_date: periodDate,
        mense_notes: periodNotes,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPeriodId(data.mense_id);
          setFlowVolume(data.flow_volume);
          setMood(data.mood);
          setBloating(data.bloating);
          setCramps(data.cramps);
          setFatigue(data.fatigue);
          setPeriodDate(data.mense_date);
          setPeriodNotes(data.mense_notes);
          console.log("successful edit", flowVolume);

          props.setModalError(null);
          props.setShowAddPeriodModal(false);
        } else {
          console.log("error");
          props.setModalError(data.error);
        }
      });
  };
  console.log("SUCCESS");
  return (
    <div>
      <form id="period-form" onSubmit={handleAddAPeriod}>
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
            <option></option>
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
          onChange={(evt) => setPeriodNotes(evt.currentTarget.value)}
        />
        <br></br>
        <button type="submit">Add Period</button>
      </form>
    </div>
  );
}

function SelectedPeriodContainer(props) {
  const [periodDate, setPeriodDate] = React.useState(null);
  const [flowVolume, setFlowVolume] = React.useState(null);
  const [mood, setMood] = React.useState(null);
  const [cramps, setCramps] = React.useState(null);
  const [bloating, setBloating] = React.useState(null);
  const [fatigue, setFatigue] = React.useState(null);
  const [periodNotes, setPeriodNotes] = React.useState(null);
  const [symptoms, setSymptoms] = React.useState(null);

  React.useEffect(() => {
    fetch(
      `/api/${props.userId}/periods/${localStorage.getItem("selectedPeriod")}`
    )
      .then((response) => response.json())
      .then((data) => {
        const symptoms = [];
        if (data.mood) {
          symptoms.push("Moodiness");
        }
        if (data.cramps) {
          symptoms.push("Cramps");
        }
        if (data.bloating) {
          symptoms.push("Bloating");
        }
        if (data.fatigue) {
          symptoms.push("Fatigue");
        }
        setCramps(data.cramps);
        setBloating(data.bloating);
        setMood(data.mood);
        setFatigue(data.fatigue);
        setSymptoms(symptoms);
        setPeriodDate(data.mense_date);
        setFlowVolume(data.flow_volume);
        setPeriodNotes(data.mense_notes);
      });
  }, [props.selectedPeriodId]);

  if (!flowVolume) {
    return null;
  }
  return (
    <PeriodCard
      userId={props.userId}
      key={props.selectedPeriodId}
      periodId={props.selectedPeriodId}
      periodDate={periodDate}
      setPeriodDate={setPeriodDate}
      flowVolume={flowVolume}
      setFlowVolume={setFlowVolume}
      symptoms={symptoms}
      setSymptoms={setSymptoms}
      cramps={cramps}
      setCramps={setCramps}
      bloating={bloating}
      setBloating={setBloating}
      mood={mood}
      setMood={setMood}
      fatigue={fatigue}
      setFatigue={setFatigue}
      periodNotes={periodNotes}
      setPeriodNotes={setPeriodNotes}
      showPeriodModal={props.showPeriodModal}
      setShowPeriodModal={props.setShowPeriodModal}
      showAddPeriodModal={props.showAddPeriodModal}
      setShowAddPeriodModal={props.setShowAddPeriodModal}
      modalError={props.modalError}
      setModalError={props.setModalError}
      showDeletePeriodModal={props.showDeletePeriodModal}
      setShowDeletePeriodModal={props.setShowDeletePeriodModal}
      periods={props.periods}
      setPeriods={props.setPeriods}
    />
  );
}

function AllPeriodsContainer(props) {
  console.log(props.periods);

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
    periodDetails.push(
      <PeriodCard
        userId={props.userId}
        key={period.mense_id}
        periodId={period.mense_id}
        periodDate={period.mense_date}
        flowVolume={period.flow_volume}
        periodNotes={period.mense_notes}
        showPeriodModal={props.showPeriodModal}
        symptoms={symptoms}
        setShowPeriodModal={props.setShowPeriodModal}
        modalError={props.modalError}
        setModalError={props.setModalError}
        showDeletePeriodModal={props.showDeletePeriodModal}
        setShowDeletePeriodModal={props.setShowDeletePeriodModal}
        showAddPeriodModal={props.showAddPeriodModal}
        setShowAddPeriodModal={props.setShowAddPeriodModal}
        periods={props.periods}
        setPeriods={props.setPeriods}
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
  const [periodEdit, setPeriodEdit] = React.useState("non-edit");
  console.log(periodEdit);
  const handleSubmit = (evt) => {
    evt.preventDefault();

    fetch(
      `/api/${props.userId}/periods/${localStorage.getItem("selectedPeriod")}`,
      {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({
          mense_id: localStorage.getItem("selectedPeriod"),
          mense_date: props.periodDate,
          mood: props.mood,
          boating: props.bloating,
          cramps: props.cramps,
          fatigue: props.fatigue,
          flow_volume: props.flowVolume,
          mense_notes: props.periodNotes,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.success);
        // console.log(data);
        if (data.success) {
          props.setPeriodDate(data.mense_date);
          props.setFlowVolume(data.flow_volume);
          props.setCramps(data.cramps);
          props.setBloating(data.bloating);
          props.setFatigue(data.fatigue);
          props.setMood(data.mood);
          props.setPeriodNotes(data.mense_notes);
          const dataSymptoms = [];
          if (data.mood) {
            dataSymptoms.push("Moodiness");
          }
          if (data.cramps) {
            dataSymptoms.push("Cramps");
          }
          if (data.bloating) {
            dataSymptoms.push("Bloating");
          }
          if (data.fatigue) {
            dataSymptoms.push("Fatigue");
          }
          props.setSymptoms(dataSymptoms);
          console.log(dataSymptoms);

          props.setModalError(null);
          props.setShowAddPeriodModal(false);
          props.setShowPeriodModal(false);
          setPeriodEdit("non-edit");
        } else {
          console.log(data.error);
          props.setModalError(data.error);
        }
      });
  };

  const handleDelete = (evt) => {
    evt.preventDefault();
    setPeriodEdit("delete");

    const periodId = localStorage.getItem("selectedPeriod");

    fetch(
      `/api/${props.userId}/periods/${localStorage.getItem("selectedPeriod")}`,
      {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify({
          mense_id: periodId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.reponse);
        localStorage.setItem("selectedPeriod", null);
        props.setShowDeletePeriodModal(false);
        props.setShowPeriodModal(false);
        setPeriodEdit("non-edit");
        props.setModalError(null);
        props.setShowDeletePeriodModal(false);
      });
  };

  return (
    <div>
      {periodEdit === "delete" && (
        <DeletePeriod
          handleDelete={handleDelete}
          setPeriodEdit={setPeriodEdit}
          showPeriodModal={props.showPeriodModal}
          setShowPeriodModal={props.setShowPeriodModal}
          showDeletePeriodModal={props.showDeletePeriodModal}
          setShowDeletePeriodModal={props.setShowDeletePeriodModal}
          showAddPeriodModal={props.showAddPeriodModal}
          setShowAddPeriodModal={props.setShowAddPeriodModal}
        />
      )}
      {periodEdit === "edit" && (
        <EditPeriod
          handleSubmit={handleSubmit}
          setPeriodEdit={setPeriodEdit}
          userId={props.userId}
        >
          <PeriodDate
            setPeriodDate={props.setPeriodDate}
            periodDate={props.periodDate}
          />
          <Symptoms
            setSymptoms={props.setSymptoms}
            symptoms={props.symptoms}
            bloating={props.bloating}
            setBloating={props.setBloating}
            cramps={props.cramps}
            setCramps={props.setCramps}
            fatigue={props.fatigue}
            setFatigue={props.setFatigue}
            mood={props.mood}
            setMood={props.setMood}
          />
          <PeriodNotes
            setPeriodNotes={props.setPeriodNotes}
            periodNotes={props.periodNotes}
          />
        </EditPeriod>
      )}
      {periodEdit === "non-edit" && (
        <PeriodForm
          userId={props.userId}
          error={props.error}
          setError={props.setError}
          modalError={props.modalError}
          setModalError={props.setModalError}
          showPeriodModal={props.showPeriodModal}
          setShowPeriodModal={props.setShowPeriodModal}
          showAddPeriodModal={props.showAddPeriodModal}
          setShowAddPeriodModal={props.setShowAddPeriodModal}
          showDeletePeriodModal={props.showDeletePeriodModal}
          setShowDeletePeriodModal={props.setShowDeletePeriodModal}
          periods={props.periods}
          setPeriods={props.setPeriods}
          symptoms={props.symptoms}
          selectedPeriodId={props.selectedPeriodId}
          setSelectedPeriodId={props.setSelectedPeriodId}
          periodDate={props.periodDate}
          flowVolume={props.flowVolume}
          setSymptoms={props.setSymptoms}
          bloating={props.bloating}
          setBloating={props.setBloating}
          cramps={props.cramps}
          setCramps={props.setCramps}
          fatigue={props.fatigue}
          setFatigue={props.setFatigue}
          mood={props.mood}
          setMood={props.setMood}
          periodNotes={props.periodNotes}
          periodEdit={periodEdit}
          setPeriodEdit={setPeriodEdit}
          selectedDate={props.selectedDate}
          setSelectedDate={props.setSelectedDate}
        />
      )}
    </div>
  );
}

function PeriodDate(props) {
  return (
    <div className="field">
      <label htmlFor="per-date">Date: </label>
      <input
        id="per-date"
        type="date"
        value={props.periodDate}
        onChange={(evt) => props.setPeriodDate(evt.currentTarget.value)}
      />
    </div>
  );
}

function Symptoms(props) {
  return (
    <div className="field">
      <fieldset id="sx-list">
        <legend>Symptoms: </legend>
        <input
          type="checkbox"
          id="mood"
          value={props.mood}
          checked={props.mood}
          onChange={(evt) => props.setMood(evt.currentTarget.checked)}
        />
        <label htmlFor="mood">Moodiness</label>
        <br></br>

        <input
          type="checkbox"
          id="cramps"
          value={props.cramps}
          checked={props.cramps}
          onChange={(evt) => props.setCramps(evt.currentTarget.checked)}
        />
        <label htmlFor="cramps">Cramps</label>
        <br></br>

        <input
          type="checkbox"
          id="bloating"
          value={props.bloating}
          checked={props.bloating}
          onChange={(evt) => props.setBloating(evt.currentTarget.checked)}
        />
        <label htmlFor="bloating">Bloating</label>
        <br></br>

        <input
          type="checkbox"
          id="fatigue"
          value={props.fatigue}
          checked={props.fatigue}
          onChange={(evt) => props.setFatigue(evt.currentTarget.checked)}
        />
        <label htmlFor="fatigue">Fatigue</label>
      </fieldset>
    </div>
  );
}

function PeriodNotes(props) {
  return (
    <div className="field">
      <label htmlFor="per-notes">Notes: </label>
      <textarea
        id="per-notes"
        type="text"
        value={props.periodNotes}
        onChange={(evt) => props.setPeriodNotes(evt.currentTarget.value)}
        placeholder="Write notes here"
      ></textarea>
    </div>
  );
}

function EditPeriod(props) {
  const closeEdit = (evt) => {
    evt.preventDefault();

    props.setPeriodEdit("non-edit");
  };

  return (
    <div className="card">
      <form onSubmit={props.handleSubmit}>
        <h2>Period</h2>
        {props.children}
        <button type="submit">Save</button>
        <button onClick={closeEdit}>Cancel</button>
      </form>
    </div>
  );
}

function DeletePeriod(props) {
  const closeEdit = (evt) => {
    evt.preventDefault();
    props.setPeriodEdit("non-edit");
  };

  if (!props.showDeletePeriodModal) {
    return null;
  }

  return (
    <div className="card">
      <form onSubmit={props.handleDelete}>
        <h2>Are you sure you'd like to delete?</h2>
        <button type="submit">Yes</button>
        <button onClick={closeEdit}>No</button>
      </form>
    </div>
  );
}

function PeriodForm(props) {
  const handleClick = (evt) => {
    evt.preventDefault();
    const formEdit = props.periodEdit === "edit" ? "non-edit" : "edit";
    props.setPeriodEdit(formEdit);
    // return <SelectedActivityContainer />;
  };

  const handleDeleteClick = (evt) => {
    evt.preventDefault();
    const formDelete = props.periodEdit === "delete" ? "edit" : "delete";
    props.setPeriodEdit(formDelete);
    props.setShowDeletePeriodModal(true);
    // return <SelectedActivityContainer />;
  };
  const sxToDisplay = [];
  const symptomList = [];
  if (props.mood) {
    symptomList.push("Moodiness");
  }
  if (props.cramps) {
    symptomList.push("Cramps");
  }
  if (props.bloating) {
    symptomList.push("Bloating");
  }
  if (props.fatigue) {
    symptomList.push("Fatigue");
  }

  for (const symptom of symptomList) {
    sxToDisplay.push(
      <ul>
        <li>{symptom}</li>
      </ul>
    );
  }

  return (
    <div className="card">
      <form>
        <p>Date: {props.periodDate} </p>
        <p>Flow: {props.flowVolume}</p>
        {props.symptoms && <div>Symptoms: {sxToDisplay}</div>}
        {props.periodNotes && <p>Notes: {props.periodNotes}</p>}
        <div></div>
        <button className="edit" onClick={handleClick}>
          Edit
        </button>
        <button className="delete" onClick={handleDeleteClick}>
          Delete
        </button>
      </form>
    </div>
  );
}
