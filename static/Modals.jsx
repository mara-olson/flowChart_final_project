function SignUpModal(props) {
  if (!props.showSignUpModal) {
    return null;
  }
  return (
    <div>
      <div>
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
    localStorage.setItem("selectedActivity", null);
    props.setModalError(null);
    props.setSelectedActivityId(null);
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
          showDeleteActModal={props.showDeleteActModal}
          setShowDeleteActModal={props.setShowDeleteActModal}
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
  const closeModal = () => {
    props.setShowAddActModal(false);
    localStorage.setItem("selectedActivity", null);
    props.setModalError(null);
    props.setSelectedActivityId(null);
  };

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
          selectedDate={props.selectedDate}
          setSelectedDate={props.setSelectedDate}
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

function PeriodModal(props) {
  const closeModal = () => {
    props.setShowPeriodModal(false);
    props.setModalError(null);
  };

  if (!props.showPeriodModal) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <SelectedPeriodContainer
          userId={props.userId}
          setUserId={props.setUserId}
          isLoggedIn={props.isLoggedIn}
          setIsLoggedIn={props.setIsLoggedIn}
          modalError={props.modalError}
          setModalError={props.setModalError}
          error={props.error}
          setError={props.setError}
          showPeriodModal={props.showPeriodModal}
          setShowPeriodModal={props.setShowPeriodModal}
          showAddPeriodModal={props.showAddPeriodModal}
          setShowAddPeriodModal={props.setShowAddPeriodModal}
          showDeletePeriodModal={props.showDeletePeriodModal}
          setShowDeletePeriodModal={props.setShowDeletePeriodModal}
          periods={props.periods}
          setPeriods={props.setPeriods}
          selectedPeriodId={props.selectedPeriodId}
          setSelectedPeriodId={props.setSelectedPeriodId}
          selectedDate={props.selectedDate}
          setSelectedDate={props.setSelectedDate}
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

function AddPeriodModal(props) {
  const closeModal = () => {
    props.setShowAddPeriodModal(false);
    localStorage.setItem("selectedPeriod", null);
    props.setModalError(null);
  };

  if (!props.showAddPeriodModal || props.showPeriodModal) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <AddPeriodForm
          userId={props.userId}
          error={props.error}
          setError={props.setError}
          modalError={props.modalError}
          setModalError={props.setModalError}
          showPeriodModal={props.showPeriodModal}
          setShowPeriodModal={props.setShowPeriodModal}
          showAddPeriodModal={props.showAddPeriodModal}
          setShowAddPeriodModal={props.setShowAddPeriodModal}
          periods={props.periods}
          setPeriods={props.setPeriods}
          selectedDate={props.selectedDate}
          setSelectedDate={props.setSelectedDate}
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

function EntryChoice(props) {
  const closeModal = () => {
    props.setShowEntryChoiceModal(false);
    props.setModalError(null);
  };

  const goToAddActivity = (evt) => {
    evt.preventDefault();
    props.setShowEntryChoiceModal(false);
    props.setShowAddActModal(true);
  };

  const goToAddPeriod = (evt) => {
    evt.preventDefault();
    props.setShowEntryChoiceModal(false);
    props.setShowAddPeriodModal(true);
  };

  if (!props.showEntryChoiceModal) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={goToAddActivity}>Add Activity</button>
        <button onClick={goToAddPeriod}>Add Period</button>
      </div>
      <div className="modal-footer">
        {props.modalError && <p className="error">{props.modalError}</p>}
        <button className="modal-button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}
