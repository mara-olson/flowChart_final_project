function AddPeriodForm(props) {
  const [periodId, setPeriodId] = React.useState(props.periodId);
  const [flowVolume, setFlowVolume] = React.useState(props.flowVolume);
  const [mood, setMood] = React.useState(props.mood);
  const [cramps, setCramps] = React.useState(props.cramps);
  const [bloating, setBloating] = React.useState(props.bloating);
  const [fatigue, setFatigue] = React.useState(props.fatigue);
  const [periodDate, setPeriodDate] = React.useState(props.selectedDate);
  const [periodNotes, setPeriodNotes] = React.useState(props.periodNotes);

  const closeModal = () => {
    props.setShowAddPeriodModal(false);
    props.setModalError(null);
  };

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
      <form className="add-form" onSubmit={handleAddAPeriod}>
        <div className="add-field" htmlFor="mense_date">
          Date of event
        </div>
        <input
          type="date"
          name="mense_date"
          className="add-input"
          value={periodDate}
          onChange={(evt) => setPeriodDate(evt.currentTarget.value)}
        />
        {/* <div> */}
        <div className="add-field">What's your flow?</div>
        <select
          name="flow-volume"
          className="add-input"
          onChange={(evt) => setFlowVolume(evt.currentTarget.value)}
        >
          <option></option>
          <option value="No Flow">No Flow</option>
          <option value="Light">Light</option>
          <option value="Moderate">Moderate</option>
          <option value="Heavy">Heavy</option>
        </select>
        {/* </fieldset> */}
        <fieldset>
          <div className="add-field">What symptoms are you experiencing?</div>
          <input
            type="checkbox"
            name="mood"
            className="checkbox"
            onChange={(evt) => setMood(evt.currentTarget.checked)}
          />
          <label className="add-input" htmlFor="mood">
            Moodiness
          </label>
          <br></br>

          <input
            type="checkbox"
            name="cramps"
            className="checkbox"
            onChange={(evt) => setCramps(evt.currentTarget.checked)}
          />
          <label className="add-input" htmlFor="cramps">
            Cramps
          </label>
          <br></br>

          <input
            type="checkbox"
            name="bloating"
            className="checkbox"
            onChange={(evt) => setBloating(evt.currentTarget.checked)}
          />
          <label className="add-input" htmlFor="bloating">
            Bloating
          </label>
          <br></br>

          <input
            type="checkbox"
            className="checkbox"
            name="fatigue"
            onChange={(evt) => setFatigue(evt.currentTarget.checked)}
          />
          <label className="add-input " htmlFor="fatigue">
            Fatigue
          </label>
        </fieldset>

        <label className="add-field" htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          className="add-input notes"
          onChange={(evt) => setPeriodNotes(evt.currentTarget.value)}
        />
        <div className="edit-act-modal-footer">
          {props.modalError && <p className="error">{props.modalError}</p>}
        </div>

        <button className="btn add-period-button" type="submit">
          Add Period
        </button>

        <button
          className="btn inconspicuous close-add-period"
          onClick={closeModal}
        >
          Close
        </button>
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

  // if (!flowVolume) {
  //   return null;
  // }
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
    const handleClick = () => {
      props.setSelectedPeriodId(period.mense_id);
      localStorage.setItem("selectedPeriod", period.mense_id);
      props.setShowPeriodModal(true);
    };

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

    const sxToDisplay = [];
    const symptomList = [];
    if (period.mood) {
      symptomList.push("Moodiness");
    }
    if (period.cramps) {
      symptomList.push("Cramps");
    }
    if (period.bloating) {
      symptomList.push("Bloating");
    }
    if (period.fatigue) {
      symptomList.push("Fatigue");
    }

    for (const symptom of symptomList) {
      sxToDisplay.push(<li className="sx-item-in-table">{symptom}</li>);
    }
    periodDetails.push(
      <tr className="period-row" onClick={handleClick}>
        <td className="period-cell-date">{period.mense_date}</td>

        <td className="period-cell-flow">{period.flow_volume}</td>

        <td className="period-cell-sx">
          <ul className="sx-cell">{sxToDisplay}</ul>
        </td>

        <td className="period-cell-notes">{period.mense_notes}</td>
      </tr>
    );
  }

  // <PeriodCard
  //   userId={props.userId}
  //   key={period.mense_id}
  //   periodId={period.mense_id}
  //   periodDate={period.mense_date}
  //   flowVolume={period.flow_volume}
  //   periodNotes={period.mense_notes}
  //   showPeriodModal={props.showPeriodModal}
  //   symptoms={symptoms}
  //   setShowPeriodModal={props.setShowPeriodModal}
  //   modalError={props.modalError}
  //   setModalError={props.setModalError}
  //   showDeletePeriodModal={props.showDeletePeriodModal}
  //   setShowDeletePeriodModal={props.setShowDeletePeriodModal}
  //   showAddPeriodModal={props.showAddPeriodModal}
  //   setShowAddPeriodModal={props.setShowAddPeriodModal}
  //   periods={props.periods}
  //   setPeriods={props.setPeriods}
  // />;

  return (
    <div>
      <table className="activity-table">
        <tr className="period-row activity-header-row">
          <th className="period-cell-date">Date</th>
          <th className="period-cell-flow">Flow</th>
          <th className="period-cell-sx">Symptoms</th>
          <th className="period-cell-notes">Notes</th>
        </tr>
      </table>
      <table className="activity-table">{periodDetails}</table>
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
          bloating: props.bloating,
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
          setPeriodEdit("non-edit");
          props.setModalError(null);
          props.setShowAddPeriodModal(false);
          props.setShowPeriodModal(false);
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
  console.log(periodEdit);
  return (
    <div className="period-details">
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
    <div className="edit-field bold">
      <label htmlFor="per-date">Date: </label>
      <input
        id="per-date"
        type="date"
        className="edit-input"
        value={props.periodDate}
        onChange={(evt) => props.setPeriodDate(evt.currentTarget.value)}
      />
    </div>
  );
}

function Symptoms(props) {
  return (
    <div className="edit-field bold">
      Symptoms:
      <div className="sx-list">
        <input
          type="checkbox"
          id="mood"
          className="sx-checkbox "
          value={props.mood}
          checked={props.mood}
          onChange={(evt) => props.setMood(evt.currentTarget.checked)}
        />
        <label className="edit-input-checkbox" htmlFor="mood">
          Moodiness
        </label>
        <br></br>

        <input
          type="checkbox"
          id="cramps"
          className="sx-checkbox "
          value={props.cramps}
          checked={props.cramps}
          onChange={(evt) => props.setCramps(evt.currentTarget.checked)}
        />
        <label className="edit-input-checkbox" htmlFor="cramps">
          Cramps
        </label>
        <br></br>

        <input
          type="checkbox"
          id="bloating"
          className="sx-checkbox "
          value={props.bloating}
          checked={props.bloating}
          onChange={(evt) => props.setBloating(evt.currentTarget.checked)}
        />
        <label className="edit-input-checkbox" htmlFor="bloating">
          Bloating
        </label>
        <br></br>

        <input
          type="checkbox"
          id="fatigue"
          className="sx-checkbox "
          value={props.fatigue}
          checked={props.fatigue}
          onChange={(evt) => props.setFatigue(evt.currentTarget.checked)}
        />
        <label className="edit-input-checkbox" htmlFor="fatigue">
          Fatigue
        </label>
      </div>
    </div>
  );
}

function PeriodNotes(props) {
  return (
    <div className="edit-field bold">
      <label htmlFor="per-notes">Notes: </label>
      <textarea
        id="per-notes"
        type="text"
        className="edit-input"
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
    <div className="period-details">
      <form className="period-details-form" onSubmit={props.handleSubmit}>
        {props.children}
        <div className="edit-act-modal-footer">
          {props.modalError && <p className="error">{props.modalError}</p>}
        </div>
        <div className="edit-period-buttons-container">
          <button className="btn btn-primary red1" type="submit">
            Save
          </button>
          <br></br>
          <button
            className="btn inconspicuous close-period-details"
            onClick={closeEdit}
          >
            Cancel
          </button>
        </div>
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
    <div className="delete-warning">
      <form onSubmit={props.handleDelete}>
        <h4>Are you sure you'd like to delete this activity?</h4>
        <div>After deleting, this activity cannot be retrieved.</div>
        <br></br>
        <br></br>
        <br></br>
        <button className="btn btn-primary red1" type="submit">
          Delete
        </button>
        <button className="btn cancel-delete-button" onClick={closeEdit}>
          Cancel
        </button>
      </form>
    </div>
  );
}

function PeriodForm(props) {
  const closeEdit = (evt) => {
    evt.preventDefault();
    props.setShowPeriodModal(false);
  };

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
        <li className="sx-list-item">{symptom}</li>
      </ul>
    );
  }

  return (
    <div className="period-details-form">
      {/* <form> */}
      <div className="period-detail">
        <strong>Date:</strong> {props.periodDate}
      </div>
      <div className="period-detail">
        <strong>Flow:</strong> {props.flowVolume}
      </div>
      {props.symptoms && (
        <div className="period-detail">
          <strong>Symptoms:</strong> {sxToDisplay}
        </div>
      )}
      {props.periodNotes ? (
        <div className="period-detail">
          <strong>Notes:</strong> {props.periodNotes}
        </div>
      ) : (
        <div className="period-detail">
          <strong>Notes:</strong> --
        </div>
      )}
      <div className="period-buttons-container">
        <button className="btn edit-period-button" onClick={handleClick}>
          Edit
        </button>
        <button
          className="btn delete-period-button"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
        <button
          className="btn inconspicuous close-period-details-button"
          onClick={closeEdit}
        >
          Cancel
        </button>
        {/* </form> */}
      </div>
    </div>
  );
}
