"use client"

import { useAppContext } from '@mycontext/AppContext';
//import { useContext } from 'react';

const HomePage = () => {
    const context =useAppContext();  
    
    return (
        <>
        <button onClick={()=>{context.setText((prev)=>"sss")}}>ss</button>
        <div>{context.test}</div>  
        
        </>
    );
}

export default HomePage;
