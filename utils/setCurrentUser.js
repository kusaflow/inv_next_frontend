
const setCurrentUser = (setb_isLoggedIn, setLuser) => {
    //get token if available
    const token = localStorage.getItem('jwtToken');
    
    if (!token){
        console.log("no token");
        setb_isLoggedIn(false);
        return;
    }


    console.log(token);

}

module.exports = {setCurrentUser}