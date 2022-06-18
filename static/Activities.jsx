// function ActivityCard(props) {
//   let activityFormTitle = "New Activity";
//   let activityFormButtonName = "Add Activity";

//   const handleClick = () => {
//     // evt.preventDefault();
//     props.setEditMode(true);
//     props.setEditMode((state) => {
//       activityFormTitle = "Edit Activity";
//       activityFormButtonName = "Save";
//       props.setModalContent(
//         <AddActivityForm
//           userId={props.userId}
//           editMode={props.editMode}
//           setEditMode={props.setEditMode}
//           activityId={props.activityId}
//           activities={props.actitivies}
//           setActivities={props.setActivities}
//           modalError={props.modalError}
//           setModalError={props.setModalError}
//           setModalContent={props.setModalContent}
//           showModal={props.showModal}
//           setShowModal={props.setShowModal}
//           activityFormTitle={activityFormTitle}
//           activityFormButtonName={activityFormButtonName}
//           activityName={props.activityName}
//           activityDate={props.activityDate}
//           activityType={props.activityType}
//           duration={props.duration}
//           distance={props.distance}
//           sufferScore={props.sufferScore}
//           activityNotes={props.activityNotes}
//         />
//       );
//       props.setShowModal(true);
//       console.log("editMode: ", state);
//     });
//   };

//   return (
//     <div className="card">
//       <p>Name: {props.activityName}</p>
//       <p>Date: {props.activityDate} </p>
//       <p>Type: {props.activityType}</p>
//       <p>Duration: {props.duration}</p>
//       <p>Distance: {props.distance} miles</p>
//       <p>Suffer Score: {props.sufferScore}</p>
//       <p>Notes: {props.activityNotes}</p>
//       <div></div>
//       <button onClick={handleClick}>Edit</button>
//     </div>
//   );
// }

// function AddActivityButton(props) {
//   const activityFormButtonName = "Add Activity";
//   const activityFormTitle = "New Activity";

//   const handleClick = (evt) => {
//     evt.preventDefault();
//     props.setShowModal(true);
//     props.setModalContent(
//       <AddActivityForm
//         userId={props.userId}
//         editMode={props.editMode}
//         setEditMode={props.setEditMode}
//         activities={props.actitivies}
//         setActivities={props.setActivities}
//         modalError={props.modalError}
//         setModalError={props.setModalError}
//         setModalContent={props.setModalContent}
//         showModal={props.showModal}
//         setShowModal={props.setShowModal}
//         activityFormTitle={activityFormTitle}
//         activityFormButtonName={activityFormButtonName}
//       />
//     );
//     return (
//       <Modal
//         userId={props.userId}
//         editMode={props.editMode}
//         setEditMode={props.setEditMode}
//         onClose={props.closeModal}
//         showModal={props.showModal}
//         setModalContent={props.setModalContent}
//         modalContent={props.modalContent}
//         modalError={props.modalError}
//         setModalError={props.setModalError}
//       />
//     );
//   };
//   return <button onClick={handleClick}>Add Activity</button>;
// }

// function AddActivityForm(props) {
//   const [activityId, setActivityId] = React.useState(props.activityId);
//   const [activityName, setActivityName] = React.useState(props.activityName);
//   const [activityDate, setActivityDate] = React.useState(props.activityDate);
//   const [activityType, setActivityType] = React.useState(props.activityType);
//   const [duration, setDuration] = React.useState(props.duration);
//   const [distance, setDistance] = React.useState(props.distance);
//   const [sufferScore, setSufferScore] = React.useState(props.sufferScore);
//   const [activityNotes, setActivityNotes] = React.useState(props.activityNotes);

//   const handleEditActivity = () => {
//     // evt.preventDefault();
//     console.log("editActivity");

//     fetch(`/api/${props.userId}/activities/${activityId}`, {
//       method: "PUT",
//       credentials: "include",
//       body: JSON.stringify({
//         user_id: props.userId,
//         activity_id: activityId,
//         activity_date: activityDate,
//         activity_type: activityType,
//         activity_name: activityName,
//         duration: duration,
//         distance: distance,
//         suffer_score: sufferScore,
//         activity_notes: activityNotes,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           setActivityName(data.activityName);
//           setActivityDate(data.activityDate);
//           setActivityType(data.activityType);
//           setDuration(data.duration);
//           setDistance(data.distance);
//           setSufferScore(data.sufferScore);
//           setActivityNotes(data.activityNotes);
//           console.log("successful edit", activityName);
//           props.setShowModal(false);
//           props.setEditMode(false);

//           fetch(`/api/${props.userId}/activities`)
//             .then((response) => response.json())
//             .then((data) => {
//               props.setActivities(data.activities);
//             });
//         } else {
//           console.log("boo", data.error);
//           props.setModalError(data.error);
//         }
//       });
//   };

//   const handleAddActivity = () => {
//     // evt.preventDefault();
//     console.log("addActivity");
//     setActivityDate(props.activityDate);
//     fetch(`/api/${props.userId}/activities`, {
//       method: "POST",
//       credentials: "include",
//       body: JSON.stringify({
//         user_id: props.userId,
//         activity_id: activityId,
//         activity_date: activityDate,
//         activity_type: activityType,
//         activity_name: activityName,
//         duration: duration,
//         distance: distance,
//         suffer_score: sufferScore,
//         activity_notes: activityNotes,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           setActivityId(data.activityId);
//           setActivityName(data.activityName);
//           setActivityDate(data.activityDate);
//           setActivityType(data.activityType);
//           setDuration(data.duration);
//           setDistance(data.distance);
//           setSufferScore(data.sufferScore);
//           setActivityNotes(data.activityNotes);
//           console.log(activityId, activityName);

//           fetch(`/api/${props.userId}/activities`)
//             .then((response) => response.json())
//             .then((data) => {
//               props.setActivities(data.activities);
//               props.setShowModal(false);
//             });
//         } else {
//           console.log("error");
//           props.setModalError(data.error);
//         }
//       });
//   };

// const handleSubmit = (evt) => {
//   evt.preventDefault();
//   if (props.editMode) {
//     handleEditActivity();
//   } else {
//     handleAddActivity();
//   }
// };

//   return (
//     <div>
//       <h2>{props.activityFormTitle}</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           Activity Date
//           <input
//             type="date"
//             name="date"
//             value={activityDate}
//             onChange={(evt) => setActivityDate(evt.currentTarget.value)}
//           />{" "}
//         </div>
//         <br></br>
//         <div>
//           Activity Type
//           <select
//             name="activity-types"
//             value={activityType}
//             onChange={(evt) => setActivityType(evt.currentTarget.value)}
//           >
//             <option value="Run">Run</option>
//             <option value="Bike">Bike</option>
//             <option value="Swim">Swim</option>
//             <option value="Climb">Climb</option>
//             <option value="Elliptical">Elliptical</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>
//         <br></br>
//         <div>
//           Activity Name
//           <input
//             type="text"
//             value={activityName}
//             onChange={(evt) => {
//               if ({ activityName }) {
//                 setActivityName(evt.currentTarget.value);
//               }
//             }}
//           />
//         </div>
//         <br></br>
//         <div>
//           Duration
//           <input
//             type="text"
//             value={duration}
//             onChange={(evt) => {
//               if ({ duration }) {
//                 setDuration(evt.currentTarget.value);
//               }
//             }}
//           />
//         </div>
//         <br></br>
//         <div>
//           Distance
//           <input
//             type="text"
//             value={distance}
//             onChange={(evt) => {
//               if ({ distance }) {
//                 setDistance(evt.currentTarget.value);
//               }
//             }}
//           />
//         </div>
//         <div>
//           Suffer Score
//           <select
//             name="suffer-score"
//             value={sufferScore}
//             onChange={(evt) => setSufferScore(evt.currentTarget.value)}
//           >
//             <option value="NA">NA</option>
//             <option value="1">1, minimal discomfort</option>
//             <option value="2">2</option>
//             <option value="3">3</option>
//             <option value="4">4</option>
//             <option value="5">5, maximum discomfort</option>
//           </select>
//         </div>
//         <div>
//           Notes
//           <input
//             type="text"
//             value={activityNotes}
//             onChange={(evt) => {
//               if ({ activityNotes }) {
//                 setActivityNotes(evt.currentTarget.value);
//               }
//             }}
//           />
//         </div>
//         <button type="submit">{props.activityFormButtonName}</button>
//       </form>
//     </div>
//   );
// }

function Activities(props) {
  return (
    <div>
      {/* <AddActivityButton
        editMode={props.editMode}
        setEditMode={props.setEditMode}
        activities={props.activities}
        setActivities={props.setActivities}
        modalError={props.modalError}
        setModalError={props.setModalError}
        userId={props.userId}
        modalContent={props.modalContent}
        setModalContent={props.setModalContent}
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        activityDate={props.activityDate}
        setActivityDate={props.setActivityDate}
      /> */}
      <AllActivitiesContainer
        editMode={props.editMode}
        setEditMode={props.setEditMode}
        activities={props.activities}
        setActivities={props.setActivities}
        userId={props.userId}
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        modalContent={props.modalContent}
        setModalContent={props.setModalContent}
        modalError={props.modalError}
        setModalError={props.setModalError}
      />
    </div>
  );
}

function SelectedActivityContainer(props) {
  // const [activityId, setActivityId] = React.useState(null);
  const [activityName, setActivityName] = React.useState(null);
  const [activityDate, setActivityDate] = React.useState(null);
  const [activityType, setActivityType] = React.useState(null);
  const [distance, setDistance] = React.useState(null);
  const [duration, setDuration] = React.useState(null);
  const [sufferScore, setSufferScore] = React.useState(null);
  const [activityNotes, setActivityNotes] = React.useState(null);

  console.log("SelectedActivityContainer component is rendering");
  React.useEffect(() => {
    console.log("use effect running");
    fetch(`/api/${props.userId}/activities/${props.selectedActivityId}`)
      .then((response) => response.json())
      .then((data) => {
        // setActivityId(data.activityId);
        setActivityName(data.activityName);
        setActivityDate(data.activityDate);
        setActivityType(data.type);
        setDuration(data.duration);
        setDistance(data.distance);
        setSufferScore(data.sufferScore);
        setActivityNotes(data.activityNotes);

        console.log(props.selectedActivityId);
      });
  }, [props.selectedActivityId]);

  if (!activityName) {
    return null;
  }

  return (
    <ActivityCard
      userId={props.userId}
      // editMode={props.editMode}
      // setEditMode={props.setEditMode}
      key={props.selectedActivityId}
      activityId={props.selectedActivityId}
      activityName={activityName}
      setActivityName={setActivityName}
      activityDate={activityDate}
      setActivityDate={setActivityDate}
      activityType={activityType}
      setActivityType={setActivityType}
      distance={distance}
      setDistance={setDistance}
      duration={duration}
      setDuration={setDuration}
      sufferScore={sufferScore}
      setSufferScore={setSufferScore}
      ativityNotes={activityNotes}
      setActivityNotes={setActivityNotes}
      showModal={props.showModal}
      setShowModal={props.setShowModal}
      modalContent={props.modalContent}
      setModalContent={props.setModalContent}
      modalError={props.modalError}
      setModalError={props.setModalError}
      activities={props.activities}
      setActivities={props.setActivities}
    />
  );
}

function AllActivitiesContainer(props) {
  const activityDetails = [];
  for (const activity of props.activities) {
    // const [activityName, setActivityName] = React.useState(activity.name);
    // const [activityDate, setActivityDate] = React.useState(activity.date);
    // const [activityType, setActivityType] = React.useState(activity.type);
    // const [distance, setDistance] = React.useState(activity.distance);
    // const [duration, setDuration] = React.useState(activity.duration);
    // const [sufferScore, setSufferScore] = React.useState(activity.suffer_score);
    // const [activityNotes, setActivityNotes] = React.useState(activity.notes);

    activityDetails.push(
      <ActivityCard
        userId={props.userId}
        // editMode={props.editMode}
        // setEditMode={props.setEditMode}
        key={activity.activity_id}
        activityId={activity.activity_id}
        activityName={activity.activityName}
        // setActivityName={setActivityName}
        activityDate={activity.activityDate}
        // setActivityDate={setActivityDate}
        activityType={activity.type}
        // setActivityType={setActivityType}
        distance={activity.distance}
        // setDistance={setDistance}
        duration={activity.duration}
        // setDuration={setDuration}
        sufferScore={activity.suffer_score}
        // setSufferScore={setSufferScore}
        ativityNotes={activity.notes}
        // setActivityNotes={setActivityNotes}
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        modalContent={props.modalContent}
        setModalContent={props.setModalContent}
        modalError={props.modalError}
        setModalError={props.setModalError}
        activities={props.activities}
        setActivities={props.setActivities}
      />
    );
  }

  return (
    <div>
      <div>{activityDetails}</div>
    </div>
  );
}

// function ProfileFirstName(props) {
//   console.log(props.firstName);
//   return (
//     <div className="field">
//       <label htmlFor="first-name">First Name: </label>
//       <input
//         id="first-name"
//         type="text"
//         onChange={props.setFirstName}
//         value={props.firstName}
//         placeholder="Enter your first name"
//       />
//     </div>
//   );
// }

// function ProfileLastName(props) {
//   return (
//     <div className="field">
//       <label htmlFor="last-name">Last Name: </label>
//       <input
//         id="last-name"
//         type="text"
//         onChange={props.setLastName}
//         value={props.lastName}
//         placeholder="Enter your last name"
//       />
//     </div>
//   );
// }

// function ProfileBio(props) {
//   return (
//     <div className="field">
//       <label htmlFor="bio">Bio: </label>
//       <input
//         id="bio"
//         type="text"
//         onChange={props.editBio}
//         value={props.bio}
//         placeholder="Enter a brief bio"
//       />
//     </div>
//   );
// }

// function ProfileEmail(props) {
//   return (
//     <div className="field">
//       <label htmlFor="email">Email: </label>
//       <input
//         id="email"
//         type="text"
//         onChange={props.setEmail}
//         value={props.email}
//       />
//     </div>
//   );
// }

// function ActivityDistance(props) {
//   return (
//     <div className="field">
//       <label htmlFor="distance">Distance: </label>
//       <input
//         id="distance"
//         type="text"
//         onChange={props.setTeamName}
//         value={props.teamName}
//         placeholder="Enter your team's name"
//       />
//     </div>
//   );
// }

// function EditActivity(props) {
//   const closeEdit = (evt) => {
//     evt.preventDefault();
//     props.setActive("activity");
//   };

//   return (
//     <div>
//       <form onSubmit={props.handleSubmit}>
//         <h2>Edit Activity</h2>
//         {props.children}
//         <button type="submit">Save</button>
//         <button onClick={closeEdit}>Cancel</button>
//       </form>
//     </div>
//   );
// }

function ActivityCard(props) {
  const [activityEdit, setActivityEdit] = React.useState("non-edit");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const activeActivity = activityEdit === "edit" ? "non-edit" : "edit";
    setActivityEdit(activeActivity);
  };

  return (
    <div>
      {activityEdit === "edit" ? (
        <EditActivity
          handleSubmit={handleSubmit}
          setActivityEdit={setActivityEdit}
          userId={props.userId}
        >
          <ActivityDate
            setActivityDate={props.setActivityDate}
            activityDay={props.activityDate}
          />
          <ActivityType
            setActivityType={props.setActivityType}
            activityType={props.activityType}
          />
          <ActivityName
            setActivityName={props.setActivityName}
            firstName={props.firstName}
          />
          <ActivityDuration
            setDuration={props.setDuration}
            duration={props.duration}
          />
          <ActivityDistance
            setDistance={props.setDistance}
            distance={props.distance}
          />
          <SufferScore
            setSufferScore={props.setSufferScore}
            sufferScore={props.sufferScore}
          />
          <ActivityNotes
            setActivityNotes={props.setActivityNotes}
            activityNotes={props.activityNotes}
          />
        </EditActivity>
      ) : (
        <ActivityForm
          handleSubmit={handleSubmit}
          activityDate={props.activityDate}
          activityName={props.activityName}
          activityType={props.activityType}
          duration={props.duration}
          distance={props.distance}
          sufferScore={props.sufferScore}
          activityNotes={props.activityNotes}
        />
      )}
    </div>
  );
}

function ActivityType(props) {
  console.log(props.activityName);
  return (
    <div className="field">
      Activity Type
      <select
        id="act-type"
        onChange={props.setActivityType}
        value={props.activityType}
      >
        <option value="Run">Run</option>
        <option value="Bike">Bike</option>
        <option value="Swim">Swim</option>
        <option value="Climb">Climb</option>
        <option value="Elliptical">Elliptical</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
}

function ActivityDate(props) {
  return (
    <div className="field">
      <label htmlFor="act-date">Last Name: </label>
      <input
        id="act-date"
        type="date"
        onChange={props.setActivityDate}
        value={props.activityDate}
      />
    </div>
  );
}

function ActivityName(props) {
  return (
    <div className="field">
      <label htmlFor="act-name">Activity Name: </label>
      <input
        id="act-name"
        type="text"
        onChange={props.setActivityName}
        value={props.activityName}
        placeholder="Enter a name for your activity"
      />
    </div>
  );
}

function ActivityDistance(props) {
  return (
    <div className="field">
      <label htmlFor="distance">Distance: </label>
      <input
        id="distance"
        type="text"
        onChange={props.setDistance}
        value={props.distance}
      />
    </div>
  );
}

function ActivityDuration(props) {
  return (
    <div className="field">
      <label htmlFor="duration">Duration: </label>
      <input
        id="duration"
        type="text"
        onChange={props.setDuration}
        value={props.duration}
        placeholder="Enter activity duration"
      />
    </div>
  );
}

function SufferScore(props) {
  return (
    <div className="field">
      <label htmlFor="suffer-score">Suffer Score:</label>
      <select
        id="suffer-score"
        onChange={props.setSufferScore}
        value={props.sufferScore}
      >
        <option value="NA">NA</option>
        <option value="1">1 (Minimal discomfort)</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5 (Maximum discomfort)</option>
      </select>
    </div>
  );
}

function ActivityNotes(props) {
  return (
    <div className="field">
      <label htmlFor="act-notes">Notes: </label>
      <input
        id="act-notes"
        type="text"
        onChange={props.setActivityNotes}
        value={props.activityNotes}
        placeholder="Write notes here"
      />
    </div>
  );
}

function EditActivity(props) {
  const closeEdit = (evt) => {
    evt.preventDefault();
    props.setActivityEdit("non-edit");
  };

  return (
    <div className="card">
      <form onSubmit={props.handleSubmit}>
        <h2>Activity</h2>
        {props.children}
        <button type="submit">Save</button>
        <button onClick={closeEdit}>Cancel</button>
      </form>
    </div>
  );
}

function ActivityForm(props) {
  return (
    <div className="card">
      <form onSubmit={props.handleSubmit}>
        <p>Name: {props.activityName}</p>
        <p>Date: {props.activityDate} </p>
        <p>Type: {props.activityType}</p>
        <p>Duration: {props.duration}</p>
        <p>Distance: {props.distance} miles</p>
        <p>Suffer Score: {props.sufferScore}</p>
        <p>Notes: {props.activityNotes}</p>
        <div></div>
        <button type="submit" className="edit">
          Edit Activity
        </button>
      </form>
    </div>
  );
}
