'use client'

const {useState, useContext, createContext} = require("react");

const AppContext  = createContext();

export const AppContextProvider = ({ children }) => {
    const [data, setData] = useState({
        user: null,
        properties: [],
        bookings: []
    });

    const [Luser, setLuser] = useState({
        _id: "",
        username: "",
        email: "",
        role: ""
    });

    const [b_reValidateLogin, setb_reValidateLogin] = useState(false);

    // Method to update state
    const updateData = (newData) => {
        setData(prevData => ({ ...prevData, ...newData }));
    };

    return (
        <AppContext.Provider value={{ data, updateData, Luser, setLuser, b_reValidateLogin, setb_reValidateLogin }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

//module.exports = {AppWrapper, useAppContext}