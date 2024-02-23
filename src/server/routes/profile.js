import { Router } from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { dataManagement } from '../../utils/datamanagement.js';
const router = Router()

router.get('/:uuid', (req, res) => {
    const profilesPath = dataManagement.getProfilesPath();
    const uuid = req.params.uuid;

    fs.readFile(profilesPath, (err, dataToBeParsed) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }

        const profileData = JSON.parse(dataToBeParsed);
        const profile = profileData.profiles.find(profile => profile.id === uuid);

        if (!profile) {
            return res.status(402).send('Profile not found');
        }

        fs.readFile(dataManagement.getCardsPath(uuid), (err, cardsData) => {
            if (err) {
                return res.status(500).send('Error reading data');
            }

            const cards = JSON.parse(cardsData).cards;
            const user = {
                id: profile.id,
                title: profile.title,
                description: profile.description,
                cards: cards
            };

            res.json(user);
        });
    });
})

router.get('/', (req, res) => {
    const path = dataManagement.getProfilesPath()

    fs.readFile(path, (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }

        const parsedData = JSON.parse(data)
        res.json(parsedData);
    })
})

router.get('/:uuid/cards', (req, res) => {
    res.render('cards.html')
})

router.post('/', (req, res) => {
    const path = dataManagement.getProfilesPath()
    fs.readFile(path, (err, dataToBeParsed) => {
        if (err) {
            res.status(500).send('Error reading data');
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
        fs.writeFile(path, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing data');
                return;
            }
            dataManagement.createProfileConfig(uuid)
            res.json(uuid);
        })
    })
})

router.post('/:uuid/cards', (req, res) => {
    const path = dataManagement.getCardsPath(req.params.uuid)
    fs.readFile(path, (err, dataToBeParsed) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        let data = JSON.parse(dataToBeParsed)
        let newCard = {
            id: uuidv4().split('-')[0],
            name: req.body.name,
            question: req.body.question,
            answer: req.body.answer,
            question_image: req.body.question_image,
            answer_image: req.body.answer_image
        }
        data.cards.push(newCard)
        fs.writeFile(path, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing data');
                return;
            }

            res.status(200).send('Card is successfully added');
        })
    })
})

router.patch('/', (req, res) => {
    const path = dataManagement.getProfilesPath()

    fs.readFile(path, (err, dataToBeParsed) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        const updatedProfile = req.body
        const data = JSON.parse(dataToBeParsed)
        const index = data.profiles.findIndex(profile => profile.id === updatedProfile.id);

        if (index !== -1) {
            data.profiles[index] = updatedProfile

            fs.writeFile(path, JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Error writing data');
                    return;
                }
                res.status(200).send('Profile is updated successfully');
            })

        } else {
            res.status(402).send('Profile not found');
        }

    })
})

router.delete('/:uuid', (req, res) => {
    const path = dataManagement.getProfilesPath()

    fs.readFile(path, (err, dataToBeParsed) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        const uuid = req.params.uuid;
        const data = JSON.parse(dataToBeParsed)
        const index = data.profiles.findIndex(profile => profile.id === uuid);

        if (index !== -1) {
            data.profiles.splice(index, 1);

            fs.writeFile(path, JSON.stringify(data, null, 2), (err) => {
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



export default router