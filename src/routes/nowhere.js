import { useNavigate } from 'react-router-dom';
function PageNotFound() {
  const navigate = useNavigate();

  return (
    <>
      {' '}
      <div style={{ margin: '19px auto' }} className="NoWare_foundd">
        <main style={mainStyle}>
          <section style={{ display: 'flex', justifyContent: 'center' }} class="section--image">
            <img
              style={{ width: '100%' }}
              src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg?w=2000"
              alt=""
            />
          </section>
          <section style={{ display: 'flex', flexDirection: 'column', rowGap: '30px' }} class="section--content">
            <h4 style={{ fontSize: '30px' }}>404 not found</h4>
            <h5 style={{ fontSize: '50px', lineHeight: '50px' }}> oops !! you came far away </h5>
            <p style={{ fontSize: '18px', width: '80%', lineHeight: '25px' }}>
              {' '}
              The page you are looking for might be removed or is temporarily unavailable
            </p>
            <button
              onClick={() => {
                navigate('/');
              }}
              style={buttonStyle}
            >
              back to homepage
            </button>
          </section>
        </main>
      </div>
    </>
  );
}

export default PageNotFound;

const mainStyle = {
  height: '90%',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: '50px',
  alignItems: 'center',
};
const buttonStyle = {
  width: 'fit-content',
  padding: '12px 20px',
  backgroundColor: '#333333',
  color: '#fff',
  textTransform: ' uppercase',
  fontSize: '15px',
  border: ' 0',
  cursor: ' pointer',
};
