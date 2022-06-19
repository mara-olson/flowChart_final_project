function SignUpModal(props) {
  if (!props.showModal) {
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

function ActivityModal(props) {
  if (!props.showModal) {
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
          showModal={props.showModal}
          setShowModal={props.setShowModal}
          activities={props.activiies}
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
