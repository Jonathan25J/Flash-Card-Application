import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { configurationService, ioService, pathService } from '../../services/data/dataServices.js';
const router = Router({ mergeParams: true })

router.get('/', (req, res) => {
    res.render('cards.html')
})

router.post('/', (req, res) => {
    const uuid = req.params.uuid
    const path = pathService.getCardsPath(uuid)
    ioService.readData(path, (err, dataToBeParsed) => {
        if (err) {
            res.status(400).send('Error reading data');
            return;
        }
        let data = JSON.parse(dataToBeParsed)

        let cardId = uuidv4().split('-')[0]
        let questionImage = req.body.questionImage
        let answerImage = req.body.answerImage
        let newCard = {
            id: cardId,
            name: req.body.name,
            question: req.body.question,
            answer: req.body.answer,
            questionImage: questionImage,
            answerImage: answerImage
        }

        configurationService.createCardConfig(uuid, cardId)

        if (questionImage.trim().length != 0) newCard['questionImage'] = ioService.writeImage(uuid, cardId, 'question', questionImage)
        if (answerImage.trim().length != 0) newCard['answerImage'] = ioService.writeImage(uuid, cardId, 'answer', answerImage)

        data.cards.push(newCard)
        ioService.writeData(path, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                res.status(400).send('Error writing data');
                return;
            }

            res.status(200).send('Card is successfully added');
        })
    })
})

router.patch('/', (req, res) => {
    const uuid = req.params.uuid
    const path = pathService.getCardsPath(uuid)

    ioService.readData(path, (err, dataToBeParsed) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        const updatedCard = req.body
        const cardId = updatedCard.id
        const questionImage = updatedCard.questionImage
        const answerImage = updatedCard.answerImage

        if (questionImage.startsWith('data:')) updatedCard['questionImage'] = ioService.writeImage(uuid, cardId, 'question', questionImage)
        if (answerImage.startsWith('data:')) updatedCard['answerImage'] = ioService.writeImage(uuid, cardId, 'answer', answerImage)

        const data = JSON.parse(dataToBeParsed)
        const index = data.cards.findIndex(card => card.id === updatedCard.id);

        if (index !== -1) {
            data.cards[index] = updatedCard

            ioService.writeData(path, JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Error writing data');
                    return;
                }
                res.status(200).send('Card is updated successfully');
            })

        } else {
            res.status(402).send('Card not found');
        }

    })
})

router.delete('/:cardId', (req, res) => {
    const uuid = req.params.uuid
    const cardId = req.params.cardId;
    const path = pathService.getCardsPath(uuid)

    ioService.readData(path, (err, dataToBeParsed) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }

        const data = JSON.parse(dataToBeParsed)
        const index = data.cards.findIndex(card => card.id === cardId);

        if (index !== -1) {
            data.cards.splice(index, 1);

            ioService.writeData(path, JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Error writing data');
                    return;
                }

                configurationService.removeCardConfig(uuid, cardId)
                res.status(200).send('Card is successfully removed');
            })

        } else {
            res.status(402).send('Card not found');
        }

    })
})

export default router