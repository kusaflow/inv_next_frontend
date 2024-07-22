'use client'

const {useState, useContext, createContext} = require("react");

const AppContext  = createContext();

export const AppContextProvider = ({ children }) => {
    const BaseUrl = process.env.NEXT_PUBLIC_BaseUrl;
   
    const [AllProperties, setAllProperties] = useState([]);

    const [Luser, setLuser] = useState({
        user: {
            _id: "",
            username: "",
            email: "",
            role: ""
        }
    });

    const UpdateAllProperty = async (filters) =>{
        const queryParams = new URLSearchParams(filters).toString();
        const url = `${BaseUrl}/properties?${queryParams}`;

        try{
            const response = await fetch(url);
            

            if (!response.ok) {
                throw new Error('Failed to fetch properties');
            }
            const data = await response.json();
            setAllProperties(data);
            //console.log(data)

        }catch(err){
            console.log(err);
        }

    }

    const [b_reValidateLogin, setb_reValidateLogin] = useState(false);

    // Method to update state
    const updateData = (newData) => {
        setAllProperties(prevData => ({ ...prevData, ...newData }));
    };

    return (
        <AppContext.Provider value={{ 
            AllProperties, updateData, UpdateAllProperty,
            Luser, setLuser,
            b_reValidateLogin, setb_reValidateLogin
         }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

//module.exports = {AppWrapper, useAppContext}