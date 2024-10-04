function BottomPopUP(props) {
  return (
    <div className="bottom-popup">
      <p
        style={
          props.status == 200
            ? { background: '#21b247' }
            : props.status == 400
            ? { background: '#ff5050' }
            : { background: 'orange' }
        }
      >
        {props.status == 200 ? (
          <i class="fa fa-check" aria-hidden="true"></i>
        ) : props.status == 400 ? (
          <i style={{ fontSize: '21px' }} class="fa fa-times" aria-hidden="true"></i>
        ) : (
          <i style={{ padding: ' 3px 1px ' }} class="fa fa-exclamation" aria-hidden="true"></i>
        )}
      </p>
      <h3>{props.message}</h3>
    </div>
  );
}

export default BottomPopUP;
