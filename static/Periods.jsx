// function Periods(props) {
//   return (
//     <div>
//       <AddPeriodButton
//         userId={props.userId}
//         editMode={props.editMode}
//         setEditMode={props.setEditMode}
//         periods={props.periods}
//         setPeriods={props.setPeriods}
//         error={props.error}
//         setError={props.setError}
//         modalError={props.modalError}
//         setModalError={props.setModalError}
//         showPeriodModal={props.showPeriodModal}
//         setShowPeriodModal={props.setShowPeriodModal}
//       />
//       <PeriodContainer
//         userId={props.userId}
//         editMode={props.editMode}
//         setEditMode={props.setEditMode}
//         periods={props.periods}
//         setPeriods={props.setPeriods}
//         error={props.error}
//         setError={props.setError}
//         modalError={props.modalError}
//         setModalError={props.setModalError}
//         showPeriodModal={props.showPeriodModal}
//         setShowPeriodModal={props.setShowPeriodModal}
//       />
//     </div>
//   );
// }

// function PeriodContainer(props) {
//   const periodDetails = [];

//   for (const period of props.periods) {
//     const symptoms = [];
//     if (period.mood) {
//       symptoms.push("Moodiness");
//     }
//     if (period.cramps) {
//       symptoms.push("Cramps");
//     }
//     if (period.bloating) {
//       symptoms.push("Bloating");
//     }
//     if (period.fatigue) {
//       symptoms.push("Fatigue");
//     }
//     // console.log(symptoms);
//     periodDetails.push(
//       <PeriodCard
//         userId={props.userId}
//         editMode={props.editMode}
//         setEditMode={props.setEditMode}
//         key={period.mense_id}
//         flowVolume={period.flow}
//         periodDate={period.date}
//         createdAt={period.created_at}
//         notes={period.notes}
//         symptoms={symptoms}
//         periods={props.periods}
//         setPeriods={props.setPeriods}
//         setShowPeriodModal={props.setShowPeriodModal}
//       />
//     );
//   }
//   return (
//     <div>
//       <div>{periodDetails}</div>
//     </div>
//   );
// }

// // function PeriodCard(props) {
// //   const sxToDisplay = [];
// //   for (const symptom of props.symptoms) {
// //     // console.log(symptom);
// //     sxToDisplay.push(
// //       <ul>
// //         <li>{symptom}</li>
// //       </ul>
// //     );
// //   }

// //   const handleClick = (evt) => {
// //     evt.preventDefault();
// //     // props.setEditMode(true);
// //     // showPeriodForm();
// //     periodFormTitle = "Edit Period";
// //     periodFormButtonName = "Save";

// //     // props.setModalContent(<PeriodForm />);
// //     props.setShowAddPeriodModal(true);
// //     console.log("editMode: ", props.editMode);
// //   };

// //   return (
// //     <div className="card">
// //       <p>Flow: {props.flowVolume}</p>
// //       <div>Symptoms: {sxToDisplay}</div>
// //       <p>Date: {props.periodDate}</p>
// //       {props.notes && <p>{props.notes}</p>}
// //       <button onClick={handleClick}>Edit</button>
// //     </div>
// //   );
// // }

// // function AddPeriodButton(props) {
// //   const periodFormButtonName = "Add Period";
// //   const periodFormTitle = "New Period";

// //   const handleClick = () => {
// //     // evt.preventDefault();
// //     props.setShowPeriodModal(true);
// //     //
// //   };
// //   return <button onClick={handleClick}>Add Period</button>;
// // }

// function AddPeriodForm(props) {
//   const [periodId, setPeriodId] = React.useState(props.periodId);
//   const [flowVolume, setFlowVolume] = React.useState(props.flowVolume);
//   const [mood, setMood] = React.useState(props.mood);
//   const [cramps, setCramps] = React.useState(props.cramps);
//   const [bloating, setBloating] = React.useState(props.bloating);
//   const [fatigue, setFatigue] = React.useState(props.fatigue);
//   const [periodDate, setPeriodDate] = React.useState(props.selectedDate);
//   const [periodNotes, setPeriodNotes] = React.useState(props.periodNotes);

//   const handleEditPeriod = (evt) => {
//     console.log("editPeriod");
//     evt.preventDefault();

//     fetch(`/api/${props.userId}/periods/${periodId}`, {
//       method: "PUT",
//       credentials: "include",
//       body: JSON.stringify({
//         user_id: props.userId,
//         period_id: periodId,
//         flow_volume: flowVolume,
//         mood: mood,
//         cramps: cramps,
//         bloating: bloating,
//         fatigue: fatigue,
//         mense_date: periodDate,
//         notes: notes,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           setFlowVolume(data.flowVolume);
//           setMood(data.mood);
//           setBloating(data.bloating);
//           setCramps(data.cramps);
//           setFatigue(data.fatigue);
//           setPeriodDate(data.periodDate);
//           setNotes(data.notes);
//           console.log("successful edit", flowVolume);

//           fetch(`/api/${props.userId}/periods`)
//             .then((response) => response.json())
//             .then((data) => {
//               props.setPeriods(data.periods);
//               props.setShowPeriodModal(false);
//               // props.setEditMode(false);
//             });
//         } else {
//           console.log(data.error);
//           props.setModalError(data.error);
//         }
//       });
//   };

//   const handleAddPeriod = (evt) => {
//     evt.preventDefault();

//     fetch(`/api/${props.userId}/periods`, {
//       method: "POST",
//       credentials: "include",
//       body: JSON.stringify({
//         user_id: props.userId,
//         flow_volume: flowVolume,
//         mood: mood,
//         cramps: cramps,
//         bloating: bloating,
//         fatigue: fatigue,
//         mense_date: periodDate,
//         notes: notes,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           setPeriodId(data.mense_id);
//           setFlowVolume(data.flowVolume);
//           setMood(data.mood);
//           setBloating(data.bloating);
//           setCramps(data.cramps);
//           setFatigue(data.fatigue);
//           setPeriodDate(data.periodDate);
//           setNotes(data.notes);
//           console.log("successful add", flowVolume);

//           fetch(`/api/${props.userId}/periods`)
//             .then((response) => response.json())
//             .then((data) => {
//               props.setPeriods(data.periods);
//               props.setShowModal(false);
//             });
//         } else {
//           console.log(data.error);
//           props.setModalError(data.error);
//         }
//       });
//   };

//   const handleSubmit = (evt) => {
//     evt.preventDefault();
//     if (props.editMode) {
//       handleEditPeriod();
//     } else {
//       handleAddPeriod();
//     }
//   };

//   return (
//     <div>
//       <form id="period-form" onSubmit={handleSubmit}>
//         <label htmlFor="date">Date of event</label>
//         <input
//           type="date"
//           name="mense_date"
//           value={periodDate}
//           onChange={(evt) => setPeriodDate(evt.currentTarget.value)}
//         />

//         <br></br>
//         <fieldset name="flow-form" id="period-form" disabled={false}>
//           <legend>What's your flow?</legend>
//           <select
//             name="flow-volume"
//             onChange={(evt) => setFlowVolume(evt.currentTarget.value)}
//           >
//             <option value="No Flow">No Flow</option>
//             <option value="Light">Light</option>
//             <option value="Moderate">Moderate</option>
//             <option value="Heavy">Heavy</option>
//           </select>
//         </fieldset>
//         <br></br>
//         <fieldset name="sx-form" id="period-form" disabled={false}>
//           <legend>What symptoms are you experiencing?</legend>
//           <input
//             type="checkbox"
//             name="mood"
//             onChange={(evt) => setMood(evt.currentTarget.checked)}
//           />
//           <label htmlFor="mood">Moodiness</label>
//           <br></br>

//           <input
//             type="checkbox"
//             name="cramps"
//             onChange={(evt) => setCramps(evt.currentTarget.checked)}
//           />
//           <label htmlFor="cramps">Cramps</label>
//           <br></br>

//           <input
//             type="checkbox"
//             name="bloating"
//             onChange={(evt) => setBloating(evt.currentTarget.checked)}
//           />
//           <label htmlFor="bloating">Bloating</label>
//           <br></br>

//           <input
//             type="checkbox"
//             name="fatigue"
//             onChange={(evt) => setFatigue(evt.currentTarget.checked)}
//           />
//           <label htmlFor="fatigue">Fatigue</label>
//         </fieldset>
//         <br></br>

//         <label htmlFor="notes">Notes</label>
//         <br></br>

//         <textarea
//           id="notes"
//           name="periodNotes"
//           onChange={(evt) => setNotes(evt.currentTarget.value)}
//         />
//         <br></br>
//         <button type="submit">Add Period</button>
//       </form>
//     </div>
//   );
// }

// function PeriodCard(props) {
//   const [periodEdit, setPeriodEdit] = React.useState("non-edit");

//   const handleSubmit = (evt) => {
//     evt.preventDefault();

//     fetch(
//       `/api/${props.userId}/periods/${localStorage.getItem("selectedPeriod")}`,
//       {
//         method: "PUT",
//         credentials: "include",
//         body: JSON.stringify({
//           activity_id: localStorage.getItem("selectedPeriod"),
//           period_date: props.periodDate,
//           flow_volume: props.flowVolume,
//           period_notes: props.periodNotes,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         // console.log(data.success);
//         // console.log(data);
//         if (data.success) {
//           props.setPeriodDate(data.activityDate);
//           props.setFlowVolume(data.flowVolume);
//           props.setPeriodNotes(data.periodNotes);

//           props.setModalError(null);
//           props.setShowPeriodModal(false);
//           setPeriodEdit("non-edit");
//         } else {
//           console.log(data.error);
//           props.setModalError(data.error);
//         }
//       });
//   };

//   const handleDelete = (evt) => {
//     evt.preventDefault();
//     setPeriodEdit("delete");

//     const periodId = localStorage.getItem("selectedPeriod");

//     fetch(`/api/${props.userId}/periods/${periodId}`, {
//       method: "DELETE",
//       credentials: "include",
//       body: JSON.stringify({
//         period_id: periodId,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data.reponse);
//         localStorage.setItem("selectedPeriod", null);
//         props.setShowDeletePeriodModal(false);
//         props.setShowPeriodModal(false);
//         setPeriodEdit("non-edit");
//         props.setModalError(null);
//       });
//   };

//   return (
//     <div>
//       {periodEdit === "delete" && (
//         <DeletePeriod
//           handleDelete={handleDelete}
//           setPeriodEdit={setPeriodEdit}
//           showDeletePeriodModal={props.showDeletePeriodModal}
//           setShowDeletePeriodModal={props.setShowDeletePeriodModal}
//         />
//       )}
//       {periodEdit === "edit" && (
//         <EditPeriod
//           handleSubmit={handleSubmit}
//           setPeriodEdit={setPeriodEdit}
//           userId={props.userId}
//         >
//           <PeriodDate
//             setPeriodDate={props.setPeriodDate}
//             periodDate={props.periodDate}
//           />
//           <ActivityType
//             setActivityType={props.setActivityType}
//             activityType={props.activityType}
//           />
//           <ActivityName
//             setActivityName={props.setActivityName}
//             activityName={props.activityName}
//           />
//           <ActivityDuration
//             setDuration={props.setDuration}
//             duration={props.duration}
//           />
//           <ActivityDistance
//             setDistance={props.setDistance}
//             distance={props.distance}
//           />
//           <SufferScore
//             setSufferScore={props.setSufferScore}
//             sufferScore={props.sufferScore}
//           />
//           <PeriodNotes
//             setPeriodNotes={props.setPeriodNotes}
//             periodNotes={props.periodNotes}
//           />
//         </EditPeriod>
//       )}
//       {periodEdit === "non-edit" && (
//         <PeriodForm
//           userId={props.userId}
//           error={props.error}
//           setError={props.setError}
//           modalError={props.modalError}
//           setModalError={props.setModalError}
//           showPeriodModal={props.showPeriodModal}
//           setShowPeriodModal={props.setShowPeriodModal}
//           showDeletePeriodModal={props.showDeletePeriodModal}
//           setShowDeletePeriodModal={props.setShowDeletePeriodModal}
//           periods={props.periods}
//           setPeriods={props.setPeriods}
//           selectedPeriodId={props.selectedPeriodId}
//           setSelectedPeriodId={props.setSelectedPeriodId}
//           periodDate={props.periodDate}
//           periodNotes={props.activityNotes}
//           onClose={props.closeModal}
//           periodEdit={periodEdit}
//           setPeriodEdit={setPeriodEdit}
//           selectedDate={props.selectedDate}
//           setSelectedDate={props.setSelectedDate}
//         />
//       )}
//     </div>
//   );
// }

// function PeriodDate(props) {
//   return (
//     <div className="field">
//       <label htmlFor="per-date">Date: </label>
//       <input
//         id="per-date"
//         type="date"
//         value={props.periodDate}
//         onChange={(evt) => props.setPeriodDate(evt.currentTarget.value)}
//       />
//     </div>
//   );
// }

// function PeriodNotes(props) {
//   return (
//     <div className="field">
//       <label htmlFor="per-notes">Notes: </label>
//       <textarea
//         id="per-notes"
//         type="text"
//         onChange={(evt) => props.setPeriodNotes(evt.currentTarget.value)}
//         value={props.PeriodNotes}
//         placeholder="Write notes here"
//       ></textarea>
//     </div>
//   );
// }

// function EditPeriod(props) {
//   const closeEdit = (evt) => {
//     evt.preventDefault();
//     props.setPeriodEdit("non-edit");
//   };

//   return (
//     <div className="card">
//       <form onSubmit={props.handleSubmit}>
//         <h2>Period</h2>
//         {props.children}
//         <button type="submit">Save</button>
//         <button onClick={closeEdit}>Cancel</button>
//       </form>
//     </div>
//   );
// }

// function DeletePeriod(props) {
//   const closeEdit = (evt) => {
//     evt.preventDefault();
//     props.setPeriodEdit("non-edit");
//   };

//   if (!props.showDeletePeriodModal) {
//     return null;
//   }

//   return (
//     <div className="card">
//       <form onSubmit={props.handleDelete}>
//         <h2>Are you sure you'd like to delete?</h2>
//         <button type="submit">Yes</button>
//         <button onClick={closeEdit}>No</button>
//       </form>
//     </div>
//   );
// }

// function PeriodForm(props) {
//   const handleClick = (evt) => {
//     evt.preventDefault();
//     const formEdit = props.periodEdit === "edit" ? "non-edit" : "edit";
//     props.setPeriodEdit(formEdit);
//     // return <SelectedActivityContainer />;
//   };

//   const handleDeleteClick = (evt) => {
//     evt.preventDefault();
//     const formDelete = props.periodEdit === "delete" ? "non-edit" : "delete";
//     props.setPeriodEdit(formDelete);
//     props.setShowDeletePeriodModal(true);
//     // return <SelectedActivityContainer />;
//   };

//   // const closeEdit = (evt) => {
//   //   evt.preventDefault();
//   //   props.setShowActivityModal(false);
//   // };

//   return (
//     <div className="card">
//       <form>
//         <p>Date: {props.periodDate} </p>
//         <p>Flow: {props.flowVolume}</p>
//         <p>Symptoms: {props.duration} minutes</p>
//         <p>Distance: {props.distance} miles</p>
//         <p>Suffer Score: {props.sufferScore}</p>
//         <p>Notes: {props.activityNotes}</p>
//         <div></div>
//         <button className="edit" onClick={handleClick}>
//           Edit Activity
//         </button>
//         <button className="delete" onClick={handleDeleteClick}>
//           Delete Activity
//         </button>
//       </form>
//     </div>
//   );
// }
