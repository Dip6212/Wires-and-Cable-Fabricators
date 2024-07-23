

import { useFirebase } from '../../context/firebase';
import { Button } from 'react-bootstrap';


const EmailButton = () => {
    const firebase=useFirebase();
    const handleEmailClick=async ()=>{
        await firebase.sendMail();
    }

 

    return (
        
            <Button variant="outline-success" style={{width:"fit-content"}} onClick={handleEmailClick}>
                Send Email 
            </Button>
     
    );
};

export default EmailButton;
