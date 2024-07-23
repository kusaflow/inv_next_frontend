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



    const Update_Admin_AllProperty = async (filters) =>{
        const queryParams = new URLSearchParams(filters).toString();
        const url = `${BaseUrl}/admin?${queryParams}`;
        const jwtToken = localStorage.getItem('con_token'); // Retrieve token from local storage

        try{
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                },
            })
            

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

    //delete a property
    const DeleteProperty_ID = async (id) =>{
        const url = `${BaseUrl}/admin/${id}`;
        const jwtToken = localStorage.getItem('con_token'); // Retrieve token from local storage
        
        try{
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                },
            })
            setAllProperties(currentProperties => currentProperties.filter(property => property._id !== id));
            //console.log(data)

        }catch(err){
            console.log(err);
        }

    }

    //add property:
    const addProperty = async (property) => {
        const url = `${BaseUrl}/admin`;
        const jwtToken = localStorage.getItem('con_token'); // Retrieve token from local storage
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        };
    
        try {
            // Check if a username is provided in assignedTo
            let assignedUserId = Luser.user._id; // Default to current user's ID
            if (property.assignedTo) {
                const usersResponse = await fetch(`${BaseUrl}/users/all`, {
                    headers: headers
                });
                if (usersResponse.ok) {
                    const users = await usersResponse.json();
                    //console.log("all users : ")
                    //console.log(users)

                    const foundUser = users.find(user => user.username === property.assignedTo);
                    assignedUserId = foundUser ? foundUser._id : Luser.user._id;
                }
            }

            //console.log("==aa=======")
            //console.log(assignedUserId);
            //return;

    
            // Append 'assignedTo' field with the correct user ID
            const newProperty = {
                ...property,
                assignedTo: assignedUserId,
                images: property.images.filter(image => image) // Filter out empty strings
            };

            //console.log("=========")
            //console.log(newProperty);
            //return;
    
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(newProperty)
            });
    
            if (!response.ok) {
                throw new Error('Failed to create property');
            }
            const addedProperty = await response.json();
            //setAllProperties(prevProperties => [...prevProperties, addedProperty]);
        } catch (error) {
            console.error('Error creating property:', error.message);
        }
    };

    const UpdateProperty = async (property, propId) => {
        const url = `${BaseUrl}/admin/${propId}`;
        const jwtToken = localStorage.getItem('con_token'); // Retrieve token from local storage
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        };
    
        try {
            // Check if a username is provided in assignedTo
            let assignedUserId = Luser.user._id; // Default to current user's ID
            if (property.assignedTo) {
                const usersResponse = await fetch(`${BaseUrl}/users/all`, {
                    headers: headers
                });
                if (usersResponse.ok) {
                    const users = await usersResponse.json();
                    //console.log("all users : ")
                    //console.log(users)

                    const foundUser = users.find(user => user.username === property.assignedTo);
                    assignedUserId = foundUser ? foundUser._id : Luser.user._id;
                }
            }

            //console.log("==aa=======")
            //console.log(assignedUserId);
            //return;

    
            // Append 'assignedTo' field with the correct user ID
            const newProperty = {
                ...property,
                assignedTo: assignedUserId,
                images: property.images.filter(image => image) // Filter out empty strings
            };

            //console.log("=========")
            //console.log(newProperty);
            //return;
    
            const response = await fetch(url, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(newProperty)
            });
    
            if (!response.ok) {
                throw new Error('Failed to create property');
            }
            const addedProperty = await response.json();
            //setAllProperties(prevProperties => [...prevProperties, addedProperty]);
        } catch (error) {
            console.error('Error creating property:', error.message);
        }
    };

    const [b_reValidateLogin, setb_reValidateLogin] = useState(false);

    // Method to update state
    const updateData = (newData) => {
        setAllProperties(prevData => ({ ...prevData, ...newData }));
    };

    return (
        <AppContext.Provider value={{ 
            AllProperties, updateData, UpdateAllProperty,Update_Admin_AllProperty,DeleteProperty_ID,addProperty,UpdateProperty,
            Luser, setLuser,
            b_reValidateLogin, setb_reValidateLogin
         }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

//module.exports = {AppWrapper, useAppContext}