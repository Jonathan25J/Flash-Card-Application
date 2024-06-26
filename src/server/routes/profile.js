import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { dataManagement } from '../../utils/datamanagement.js';
const router = Router()

router.post('/', (req, res) => {
    const path = dataManagement.getProfilesPath()
    dataManagement.readData(path, (err, dataToBeParsed) => {
        if (err) {
            res.status(400).send('Error reading data');
            return;
        }
        let data = JSON.parse(dataToBeParsed)
        let uuid = uuidv4()
        let newProfile = {
            id: uuid,
            title: req.body.title,
            description: req.body.description

        }
        data.profiles.push(newProfile)
        dataManagement.writeData(path, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                res.status(400).send('Error writing data');
                return;
            }
            dataManagement.createProfileConfig(uuid)
            res.json(uuid);
        })
    })
})

router.get('/:uuid', (req, res) => {
    const profilesPath = dataManagement.getProfilesPath();
    const uuid = req.params.uuid;

    dataManagement.readData(profilesPath, (err, dataToBeParsed) => {
        if (err) {
            return res.status(400).send('Error reading data');
        }

        const profileData = JSON.parse(dataToBeParsed);
        const profile = profileData.profiles.find(profile => profile.id === uuid);

        if (!profile) {
            return res.status(402).send('Profile not found');
        }

        dataManagement.readData(dataManagement.getCardsPath(uuid), (err, cardsData) => {
            if (err) {
                return res.status(400).send('Error reading data');
            }

            try {
                const cards = JSON.parse(cardsData).cards;
                const user = {
                    id: profile.id,
                    title: profile.title,
                    description: profile.description,
                    cards: cards
                };
                res.json(user);
            } catch (parseError) {
                res.status(400).send('Error parsing JSON data');
            }


        });
    });
})

router.get('/', (req, res) => {
    const path = dataManagement.getProfilesPath()

    dataManagement.readData(path, (err, data) => {
        if (err) {
            res.status(400).send('Error reading data');
            return;
        }

        const parsedData = JSON.parse(data)
        res.json(parsedData);
    })
})

router.get('/:uuid/cards', (req, res) => {
    res.render('cards.html')
})

router.get('/:uuid/practice', (req, res) => {
    res.render('practice.html')
})

router.post('/:uuid/cards', (req, res) => {
    const uuid = req.params.uuid
    const path = dataManagement.getCardsPath(uuid)
    dataManagement.readData(path, (err, dataToBeParsed) => {
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

        dataManagement.createCardConfig(uuid, cardId)

        if (questionImage.trim().length != 0) newCard['questionImage'] = dataManagement.writeImage(uuid, cardId, 'question', questionImage)
        if (answerImage.trim().length != 0) newCard['answerImage'] = dataManagement.writeImage(uuid, cardId, 'answer', answerImage)

        data.cards.push(newCard)
        dataManagement.writeData(path, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                res.status(400).send('Error writing data');
                return;
            }

            res.status(200).send('Card is successfully added');
        })
    })
})

router.patch('/', (req, res) => {
    const path = dataManagement.getProfilesPath()

    dataManagement.readData(path, (err, dataToBeParsed) => {
        if (err) {
            res.status(400).send('Error reading data');
            return;
        }
        const updatedProfile = req.body
        const data = JSON.parse(dataToBeParsed)
        const index = data.profiles.findIndex(profile => profile.id === updatedProfile.id);

        if (index !== -1) {
            data.profiles[index] = updatedProfile

            dataManagement.writeData(path, JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    res.status(400).send('Error writing data');
                    return;
                }
                res.status(200).send('Profile is updated successfully');
            })

        } else {
            res.status(402).send('Profile not found');
        }

    })
})

router.patch('/:uuid/cards', (req, res) => {
    const uuid = req.params.uuid
    const path = dataManagement.getCardsPath(uuid)

    dataManagement.readData(path, (err, dataToBeParsed) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        const updatedCard = req.body
        const cardId = updatedCard.id
        const questionImage = updatedCard.questionImage
        const answerImage = updatedCard.answerImage

        if (questionImage.startsWith('data:')) updatedCard['questionImage'] = dataManagement.writeImage(uuid, cardId, 'question', questionImage)
        if (answerImage.startsWith('data:')) updatedCard['answerImage'] = dataManagement.writeImage(uuid, cardId, 'answer', answerImage)

        const data = JSON.parse(dataToBeParsed)
        const index = data.cards.findIndex(card => card.id === updatedCard.id);

        if (index !== -1) {
            data.cards[index] = updatedCard

            dataManagement.writeData(path, JSON.stringify(data, null, 2), (err) => {
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

router.delete('/:uuid', (req, res) => {
    const path = dataManagement.getProfilesPath()

    dataManagement.readData(path, (err, dataToBeParsed) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        const uuid = req.params.uuid;
        const data = JSON.parse(dataToBeParsed)
        const index = data.profiles.findIndex(profile => profile.id === uuid);

        if (index !== -1) {
            data.profiles.splice(index, 1);

            dataManagement.writeData(path, JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Error writing data');
                    return;
                }

                dataManagement.removeProfileConfig(uuid)
                res.status(200).send('Profile is successfully removed');
            })

        } else {
            res.status(402).send('Profile not found');
        }

    })
})

router.delete('/:uuid/cards/:cardId', (req, res) => {
    const uuid = req.params.uuid
    const cardId = req.params.cardId;
    const path = dataManagement.getCardsPath(uuid)

    dataManagement.readData(path, (err, dataToBeParsed) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }

        const data = JSON.parse(dataToBeParsed)
        const index = data.cards.findIndex(card => card.id === cardId);

        if (index !== -1) {
            data.cards.splice(index, 1);

            dataManagement.writeData(path, JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Error writing data');
                    return;
                }

                dataManagement.removeCardConfig(uuid, cardId)
                res.status(200).send('Card is successfully removed');
            })

        } else {
            res.status(402).send('Card not found');
        }

    })
})



export default router