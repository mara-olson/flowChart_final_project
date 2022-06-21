function SignUpModal(props) {
  if (!props.showSignUpModal) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <SignUp
          userId={props.userId}
          setUserId={props.setUserId}
          isLoggedIn={props.isLoggedIn}
          setIsLoggedIn={props.setIsLoggedIn}
          modalError={props.modalError}
          setError={props.setError}
          showModal={props.showModal}
          setShowModal={props.setShowModal}
        />
        <div className="modal-footer">
          {props.modalError && <p className="error">{props.modalError}</p>}
          <button className="modal-button" onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileModal(props) {
  if (!props.showProfileModal) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <ProfileCard
          userId={props.userId}
          error={props.error}
          setError={props.setError}
          modalError={props.modalError}
          setModalError={props.setModalError}
          showModal={props.showModal}
          setShowModal={props.setShowModal}
          firstName={props.firstName}
          setFirstName={props.setFirstName}
          lastName={props.lastName}
          setLastName={props.setLastName}
          teamName={props.teamName}
          setTeamName={props.setTeamName}
          email={props.email}
          setEmail={props.setEmail}
          password={props.password}
          sinceDate={props.sinceDate}
        />
        <div className="modal-footer">
          {props.modalError && <p className="error">{props.modalError}</p>}
          <button className="modal-button" onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ActivityModal(props) {
  const closeModal = () => {
    props.setShowActivityModal(false);
    props.setModalError(null);
  };

  if (!props.showActivityModal) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <SelectedActivityContainer
          userId={props.userId}
          error={props.error}
          setError={props.setError}
          modalError={props.modalError}
          setModalError={props.setModalError}
          showActivityModal={props.showActivityModal}
          setShowActivityModal={props.setShowActivityModal}
          activities={props.activities}
          setActivities={props.setActivities}
          selectedActivityId={props.selectedActivityId}
          setSelectedActivityId={props.setSelectedActivityId}
        />
        <div className="modal-footer">
          {props.modalError && <p className="error">{props.modalError}</p>}
          <button className="modal-button" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function AddActivityModal(props) {
  if (!props.showAddActModal) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <AddActivityForm
          userId={props.userId}
          error={props.error}
          setError={props.setError}
          modalError={props.modalError}
          setModalError={props.setModalError}
          showAddActModal={props.showAddActModal}
          setShowAddActModal={props.setShowAddActModal}
          activities={props.activities}
          setActivities={props.setActivities}
        />
        <div className="modal-footer">
          {props.modalError && <p className="error">{props.modalError}</p>}
          <button className="modal-button" onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function PeriodModal(props) {
  if (!props.showModal) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <Periods
          userId={props.userId}
          setUserId={props.setUserId}
          isLoggedIn={props.isLoggedIn}
          setIsLoggedIn={props.setIsLoggedIn}
          modalError={props.modalError}
          error={props.error}
          setError={props.setError}
          showModal={props.showModal}
          setShowModal={props.setShowModal}
          periods={props.periods}
          setPeriods={props.setPeriods}
        />
        <div className="modal-footer">
          {props.modalError && <p className="error">{props.modalError}</p>}
          <button className="modal-button" onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
