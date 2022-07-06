function Profile(props) {
  return (
    <div className="account-page-container">
      <div className="account-page-card card">
        <h2 className="account-page-header">Account Information</h2>
        <div className="account-card-content">
          <br></br>
          <div className="account-field ">
            <span className="bolder">First Name: </span> {props.firstName}
          </div>
          <br></br>
          <div className="account-field ">
            <span className="bolder">Last Name: </span> {props.lastName}
          </div>
          <br></br>
          <div className="account-field ">
            <span className="bolder">Email:</span> {props.email}
          </div>
          <br></br>
          <div className="account-field ">
            <span className="bolder">Password:</span> *****
          </div>
          <div className="account-field ">
            <span className="bolder">Team Name:</span> {props.teamName}
          </div>
          <br></br>
          <div className="account-field ">
            <span className="bolder">Member Since:</span> {props.sinceDate}
          </div>
          <div className="account-field ">
            <span className="bolder">Bio:</span> {props.profileBio}
          </div>
        </div>
      </div>
    </div>
  );
}

//   return (
//     <div>
//       <div className="strava-connect-card card">
//         <div className="signup-success-message">
//           Thank you for creating an account!
//         </div>
//         <div className="strava-connect-message1">
//           Want to see all your activities in one place?
//         </div>
//         <div className="strava-connect-message2">Connect to Strava now!</div>
//         <div className="modal-footer">
//           {props.modalError && <p className="error">{props.modalError}</p>}
//           <button
//             className="btn btn-primary connect-button"
//             onClick={authenticate}
//           >
//             Connect
//           </button>
//           <br></br>

//           <button
//             className="btn no-thanks"
//             onClick={() => {
//               history.push(`users/${props.userId}/home`);
//               setShowModal(false);
//             }}
//           >
//             {/* <div className="no-thanks-message">No thanks!</div> */}
//             {/* <br></br> */}
//             Continue to homepage
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

function ProfileCard(props) {
  const [profilePicSrc, setProfilePicSrc] = React.useState(
    "/static/static/FlowLogo.png"
  );
  const [profilePic, setProfilePic] = React.useState(profilePicSrc);
  const [photoPreviewUrl, setPhotoPreviewUrl] = React.useState(
    "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"
  );

  const [active, setActive] = React.useState("profile");

  const handlePhotoUpload = (evt) => {
    evt.preventDefault();
    const reader = new FileReader();
    const photo = evt.target.files[0];
    const source = URL.createObjectURL(photo);

    reader.onloadend = () => {
      setProfilePic(photo);
      setProfilePicSrc(source);
      setPhotoPreviewUrl(reader.result);
    };
    reader.readAsDataURL(photo);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch("/api/profile", {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        first_name: props.firstName,
        last_name: props.lastName,
        team_name: props.teamName,
        email: props.email,
        password: props.password,
        bio: props.profileBio,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.success);
        // console.log(data);
        if (data.success) {
          props.setFirstName(data.first_name);
          props.setLastName(data.last_name);
          props.setTeamName(data.team_name);
          props.setEmail(data.email);
          props.setPassword(data.password);
          props.setProfileBio(data.bio);

          props.setShowProfileModal(false);
          const activeProfile = active === "edit" ? "profile" : "edit";
          setActive(activeProfile);
        } else {
          props.setError(data.error_msg);
        }
      });
  };

  return (
    <div>
      {active === "edit" ? (
        <div className="profile-card">
          <EditProfile
            active={active}
            setActive={setActive}
            handleSubmit={handleSubmit}
            userId={props.userId}
            firstName={props.firstName}
            setFirstName={props.setFirstName}
            lastName={props.lastName}
            setLastName={props.setLastName}
            teamName={props.teamName}
            setTeamName={props.setTeamName}
            email={props.email}
            setEmail={props.setEmail}
            password={props.password}
            setPassword={props.setPassword}
            profileBio={props.profileBio}
            setProfileBio={props.setProfileBio}
            sinc
            eDate={props.sinceDate}
          >
            <PhotoUploader
              profilePicSrc={profilePicSrc}
              handlePhotoUpload={handlePhotoUpload}
            />
            <ProfileEmail setEmail={props.setEmail} email={props.email} />
            <ProfilePassword
              password={props.password}
              setPassword={props.setPassword}
            />
            <ProfileFirstName
              setFirstName={props.setFirstName}
              firstName={props.firstName}
            />
            <ProfileLastName
              setLastName={props.setLastName}
              lastName={props.lastName}
            />
            <ProfileBio
              profileBio={props.profileBio}
              setProfileBio={props.setProfileBio}
            />
            <ProfileTeam
              setTeamName={props.setTeamName}
              teamName={props.teamName}
            />
          </EditProfile>
        </div>
      ) : (
        <ProfileForm
          active={active}
          setActive={setActive}
          handleSubmit={handleSubmit}
          showModal={props.showModal}
          setShowModal={props.setShowModal}
          profilePicSrc={profilePicSrc}
          firstName={props.firstName}
          lastName={props.lastName}
          profileBio={props.profileBio}
          setProfileBio={props.setProfileBio}
          email={props.email}
          teamName={props.teamName}
          sinceDate={props.sinceDate}
        />
      )}
    </div>
  );
}

function PhotoUploader(props) {
  return (
    <label
      htmlFor="photo-upload edit-profile-input"
      className="custom-file-upload"
    >
      <div className="img-wrap img-upload ">
        <img
          htmlFor="photo-upload"
          className="profile-pic"
          src={props.profilePicSrc}
        />
      </div>
      <input
        id="photo-upload"
        type="file"
        // title=" "
        className="upload-button"
        onChange={props.handlePhotoUpload}
      />
    </label>
  );
}

function ProfileFirstName(props) {
  return (
    <div className="edit-field">
      <label className="edit-label" htmlFor="first-name">
        First Name:{" "}
      </label>
      <input
        id="first-name"
        type="text"
        className="edit-profile-input"
        onChange={(evt) => props.setFirstName(evt.currentTarget.value)}
        value={props.firstName}
        placeholder="Enter your first name"
      />
    </div>
  );
}

function ProfileLastName(props) {
  return (
    <div className="edit-field">
      <label className="edit-label" htmlFor="last-name">
        Last Name:{" "}
      </label>
      <input
        id="last-name"
        type="text"
        className="edit-profile-input"
        onChange={(evt) => props.setLastName(evt.currentTarget.value)}
        value={props.lastName}
        placeholder="Enter your last name"
      />
    </div>
  );
}

function ProfilePassword(props) {
  return (
    <div className="edit-field">
      <label className="edit-label" htmlFor="password">
        Password:{" "}
      </label>
      <input
        id="password"
        type="text"
        className="edit-profile-input"
        onChange={(evt) => props.setPassword(evt.currentTarget.value)}
        value={props.password}
      />
    </div>
  );
}

function ProfileBio(props) {
  return (
    <div className="edit-field">
      <label className="edit-label" htmlFor="bio">
        Bio:{" "}
      </label>
      <input
        id="bio"
        type="text"
        className="edit-profile-input"
        onChange={(evt) => props.setProfileBio(evt.currentTarget.value)}
        value={props.profileBio}
        placeholder="Enter a brief bio"
      />
    </div>
  );
}

function ProfileEmail(props) {
  return (
    <div className="edit-field">
      <label className="edit-label" htmlFor="email">
        Email:{" "}
      </label>
      <input
        id="email"
        type="text"
        className="edit-profile-input"
        onChange={(evt) => props.setEmail(evt.currentTarget.value)}
        value={props.email}
      />
    </div>
  );
}

function ProfileTeam(props) {
  return (
    <div className="edit-field">
      <label className="edit-label" htmlFor="team">
        Team:{" "}
      </label>
      <input
        id="team"
        type="text"
        className="edit-profile-input"
        onChange={(evt) => props.setTeamName(evt.currentTarget.value)}
        value={props.teamName}
        placeholder="Enter your team's name"
      />
    </div>
  );
}

function EditProfile(props) {
  const closeEdit = (evt) => {
    evt.preventDefault();
    props.setActive("profile");
  };

  return (
    // <div className="profile-card">
    <div className="profile-details">
      <h2 className="add-header black">Edit Profile</h2>
      {/* <div className="activity-details-form"></div> */}
      <div onClick={props.handleSubmit}>
        {/* <h2>Profile</h2> */}
        {props.children}
        <div className="edit-activity-buttons-container">
          <button className="btn save-profile-button" type="submit">
            Save
          </button>
          <br></br>
          <button className="btn inconspicuous" Click={closeEdit}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileForm(props) {
  const handleEdit = (evt) => {
    evt.preventDefault();
    // props.setShowModal(true);
    const editProfile = props.active === "edit" ? "profile" : "edit";
    props.setActive(editProfile);
  };

  return (
    <div className="profile-card">
      <form onSubmit={props.handleSubmit}>
        <label className="custom-file-upload fas">
          <div>
            <img
              htmlFor="photo-upload"
              className="profile-img"
              src={props.profilePicSrc}
            />
          </div>
        </label>
        <h3 className="no-spacing">
          {props.firstName} {props.lastName}
        </h3>
        <div className="spacing">{props.email}</div>
        <h6 className="spacing">Member since {props.sinceDate}</h6>
        <div>{props.profileBio}</div>
        {props.teamName && <div>Team: {props.teamName}</div>}
        {props.active === "profile" && (
          <button
            onClick={handleEdit}
            className="btn btn-secondary edit-profile-button"
          >
            Edit Profile
          </button>
        )}
        {/* {props.active === "edit" && (
            <button type="submit" className="edit">
              Save
            </button>
          )} */}
      </form>
    </div>
  );
}
