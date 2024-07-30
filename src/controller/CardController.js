import { cardService } from '../services/CardService.js'

class CardController {

    addCard(uuid, body) {
        return cardService.addCard(uuid, body)
    }

    deleteCard(uuid, cardId) {
        return cardService.deleteCard(uuid, cardId)
    }

    updateCard(uuid, body) {
        return cardService.updateCard(uuid, body)
    }

}

export const cardController = new CardController()