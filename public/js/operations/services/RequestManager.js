import { PORT } from '../../../../src/utils/port.js';
const backendURL = `http://localhost:${PORT}`

class RequestManager {

    async doFetch(path, method = 'GET',body, feedback=true) {
        let bodyIsPresent = !["GET", "HEAD"].includes(method)
        try {
            const response = await fetch(`${backendURL}${path}`, {
                method: method,
                headers: {
                    'Content-Type': bodyIsPresent ? 'application/json;charset=utf-8' : undefined
                },
                body: bodyIsPresent ? JSON.stringify(body) : undefined
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return feedback ? response.json() : response;
        } catch (error) {
            throw error;
        }

    }

}

export const requestManager = new RequestManager()