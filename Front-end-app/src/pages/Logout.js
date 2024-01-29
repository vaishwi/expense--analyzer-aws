
import UserPool from '../UserPool';
const Logout = () => {
    

        const user = UserPool.getCurrentUser();
        user.signOut();
        window.location.href = '/';
    
    
   
    
}
export default Logout;
