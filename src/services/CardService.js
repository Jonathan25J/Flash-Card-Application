import { requestManager } from './RequestManager';

class CardService {

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

export const cardService = new CardService();
