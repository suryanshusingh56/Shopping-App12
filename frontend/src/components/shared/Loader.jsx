import Spinner from 'react-bootstrap/Spinner';


function Loader() {
    return <Spinner animation="grow" style={{
        width: '120px',
        height: '120px',
        margin: 'auto',
        display: 'block',
        marginTop: '50px',
    }} />;
}



export default Loader; 