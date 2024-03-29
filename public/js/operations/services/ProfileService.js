import { requestManager } from './RequestManager';

class ProfileService {

    fetchProfiles = async () => {
        return await requestManager.doFetch('/profile')

    }

    addProfile = async (body) => {
        return await requestManager.doFetch('/profile', 'POST', body)

    }

    getProfile = async (uuid) => {
        return await requestManager.doFetch(`/profile/${uuid}`)
    }

    updateProfile = async (body) => {
        return await requestManager.doFetch('/profile', 'PATCH', body, false)

    }

    deleteProfile = async (uuid) => {
        return await requestManager.doFetch(`/profile/${uuid}`, 'DELETE', undefined, false)
    }

    addCard = async (uuid, body) => {
        return await requestManager.doFetch(`/profile/${uuid}/cards`, 'POST', body, false)

    }

    deleteCard = async (uuid, cardId) => {
        return await requestManager.doFetch(`/profile/${uuid}/cards/${cardId}`, 'DELETE', undefined, false)
    }

    updateCard = async (uuid, body) => {
        return await requestManager.doFetch(`/profile/${uuid}/cards`, 'PATCH', body, false)

    }

}

export const profileService = new ProfileService();
