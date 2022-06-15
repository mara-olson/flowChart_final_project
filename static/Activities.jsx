function ActivityCard(props) {
  const activityFormTitle = "New Activity";
  const activityFormButtonName = "Add Activity";

  const showActivityForm = () => {
    const activityFormTitle = "Edit Activity";
    const activityFormButtonName = "Save";

    props.setModalContent(
      <AddActivityForm
        userId={props.userId}
        acrtivityId={props.activityId}
        activities={props.actitivies}
        setActivities={props.setActivities}
        modalError={props.modalError}
        setModalError={props.setModalError}
        setModalContent={props.setModalContent}
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        activityFormTitle={activityFormTitle}
        activityFormButtonName={activityFormButtonName}
        name={props.name}
        date={props.date}
        type={props.type}
        duration={props.duration}
        distance={props.distance}
        suffer={props.suffer}
        notes={props.notes}
      />
    );
  };

  const handleClick = (evt) => {
    evt.preventDefault();
    showActivityForm();
    props.setShowModal(true);
  };

  return (
    <div className="card">
      <p>Name: {props.name}</p>
      <p>Date: {props.date} </p>
      <p>Type: {props.type}</p>
      <p>Duration: {props.duration}</p>
      <p>Distance: {props.distance} miles</p>
      <p>Suffer Score: {props.sufferScore}</p>
      <p>Notes: {props.notes}</p>
      <div></div>
      <button onClick={handleClick}>Edit</button>
    </div>
  );
}

function AddActivityButton(props) {
  const userId = props.userId;
  const activityFormButtonName = "Add Activity";

  const handleClick = (evt) => {
    evt.preventDefault();
    props.setShowModal(true);
    props.setModalContent(
      <AddActivityForm
        userId={props.userId}
        activities={props.actitivies}
        setActivities={props.setActivities}
        modalError={props.modalError}
        setModalError={props.setModalError}
        setModalContent={props.setModalContent}
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        activityFormTitle={activityFormTitle}
        activityFormButtonName={activityFormButtonName}
      />
    );
    return (
      <Modal
        userId={props.userId}
        onClose={props.closeModal}
        showModal={props.showModal}
        setModalContent={props.setModalContent}
        modalContent={props.modalContent}
        modalError={props.modalError}
        setModalError={props.setModalError}
      />
    );
  };
  return <button onClick={handleClick}>Add Activity</button>;
}

function AddActivityForm(props) {
  const [activityId, setActivityId] = React.useState(props.activityId);
  const [activityName, setActivityName] = React.useState(props.name);
  const [activityDate, setActivityDate] = React.useState(props.selectedDate);
  const [activityType, setActivityType] = React.useState(props.type);
  const [duration, setDuration] = React.useState(props.duration);
  const [distance, setDistance] = React.useState(props.distance);
  const [sufferScore, setSufferScore] = React.useState(props.suffer_score);
  const [activityNotes, setActivityNotes] = React.useState(props.notes);
  // edit vs. add mode
  // handleSubmit function, pass handleAdd vs Edit function in this function when certain
  const handleEditActivity = (evt) => {};

  const handleAddActivity = (evt) => {
    // console.log(evt);
    evt.preventDefault();
    const userId = props.userId;
    fetch("/api/activity", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        user_id: userId,
        activity_id: activityId,
        activity_date: activityDate,
        activity_type: activityType,
        activity_name: activityName,
        duration: duration,
        distance: distance,
        suffer_score: sufferScore,
        activity_notes: activityNotes,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          fetch(`/api/users/${props.userId}/activities`)
            .then((response) => response.json())
            .then((data) => {
              // props.setActivities(data.activities);
              props.setActivityId(data.activityId);
              // console.log(data.actitivies);
              props.setShowModal(false);
            });
        } else {
          console.log("error");
          props.setModalError(data.error);
        }
      });
  };

  return (
    <div>
      <h2>{props.activityFormTitle}</h2>
      <form onSubmit={handleAddActivity}>
        <div>
          Activity Date
          <input
            type="date"
            name="date"
            value={activityDate}
            onChange={(evt) => setActivityDate(evt.currentTarget.value)}
          />{" "}
        </div>
        <br></br>
        <div>
          Activity Type
          <select
            name="activity-types"
            value={activityType}
            onChange={(evt) => setActivityType(evt.currentTarget.value)}
          >
            <option value="Run">Run</option>
            <option value="Bike">Bike</option>
            <option value="Swim">Swim</option>
            <option value="Climb">Climb</option>
            <option value="Elliptical">Elliptical</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <br></br>
        <div>
          Activity Name
          <input
            type="text"
            value={activityName}
            onChange={(evt) => {
              if ({ activityName }) {
                setActivityName(evt.currentTarget.value);
              }
            }}
          />
        </div>
        <br></br>
        <div>
          Duration
          <input
            type="text"
            value={duration}
            onChange={(evt) => {
              if ({ duration }) {
                setDuration(evt.currentTarget.value);
              }
            }}
          />
        </div>
        <br></br>
        <div>
          Distance
          <input
            type="text"
            value={distance}
            onChange={(evt) => {
              if ({ distance }) {
                setDistance(evt.currentTarget.value);
              }
            }}
          />
        </div>
        <div>
          Suffer Score
          <select
            name="suffer-score"
            value={sufferScore}
            onChange={(evt) => setSufferScore(evt.currentTarget.value)}
          >
            <option value="NA">NA</option>
            <option value="1">1, minimal discomfort</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5, maximum discomfort</option>
          </select>
        </div>
        <div>
          Notes
          <input
            type="text"
            value={activityNotes}
            onChange={(evt) => {
              if ({ activityNotes }) {
                setActivityNotes(evt.currentTarget.value);
              }
            }}
          />
        </div>
        <button type="submit">{props.activityFormButtonName}</button>
      </form>
    </div>
  );
}

function Activities(props) {
  return (
    <div>
      <AddActivityButton
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
      />
      <ActivitiesContainer
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

function ActivitiesContainer(props) {
  const { activities, setActivities } = props;

  const activityDetails = [];

  for (const activity of activities) {
    activityDetails.push(
      <ActivityCard
        userId={props.userId}
        key={activity.activity_id}
        act_id={activity.activity_id}
        name={activity.name}
        date={activity.date}
        distance={activity.distance}
        duration={activity.duration}
        suffer_score={activity.sufferScore}
        notes={activity.notes}
        type={activity.type}
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        modalContent={props.modalContent}
        setModalContent={props.setModalContent}
        modalError={props.modalError}
        setModalError={props.setModalError}
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
