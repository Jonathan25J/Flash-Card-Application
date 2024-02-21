import { PORT } from '../../../../src/utils/port.js';
const backendURL = `http://localhost:${PORT}`
class ProfileService {

    fetchProfiles = async () => {
        try {
            const response = await fetch(`${backendURL}/profile`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            throw error;
        }

    }


    addProfile = async (body) => {
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

            return response.json();
        } catch (error) {
            throw error;
        }

    }

    getProfile = async (uuid) => {
        try {
            const response = await fetch(`${backendURL}/profile/${uuid}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }


    updateProfile = async (body) => {
        try {
            const response = await fetch(`${backendURL}/profile`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response;
        } catch (error) {
            throw error;
        }

    }

    deleteProfile = async (uuid) => {
        try {
            const response = await fetch(`${backendURL}/profile/${uuid}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        } catch (error) {
            throw error;
        }
    }



};



export const profileService = new ProfileService()