import { PORT } from '../../../../src/utils/port.js';
const backendURL = `http://localhost:${PORT}`
class ProfileService {

    fetchProfiles = () => {
        try {
            return fetch(`${backendURL}/profile`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .catch(error => {
                    throw error;
                });
        } catch (error) {
            throw error; 
        }
    }


    updateProfiles = async (body) => {
        try {
            const response = await fetch(`${backendURL}/profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response;
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error updating profiles:', error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    };

};



export const profileService = new ProfileService()