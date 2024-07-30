import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { configurationService, ioService, pathService } from '../../services/data/dataServices.js';
import cardsRouter from './cards.js';
import practiceRouter from './practice.js';
const router = Router()

router.use('/:uuid/cards', cardsRouter)
router.use('/:uuid/practice', practiceRouter)

router.post('/', (req, res) => {
    const path = pathService.getProfilesPath()
    ioService.readData(path, (err, dataToBeParsed) => {
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
        ioService.writeData(path, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                res.status(400).send('Error writing data');
                return;
            }
            configurationService.createProfileConfig(uuid)
            res.json(uuid);
        })
    })
})

router.get('/:uuid', (req, res) => {
    const profilesPath = pathService.getProfilesPath();
    const uuid = req.params.uuid;

    ioService.readData(profilesPath, (err, dataToBeParsed) => {
        if (err) {
            return res.status(400).send('Error reading data');
        }

        const profileData = JSON.parse(dataToBeParsed);
        const profile = profileData.profiles.find(profile => profile.id === uuid);

        if (!profile) {
            return res.status(402).send('Profile not found');
        }

        ioService.readData(pathService.getCardsPath(uuid), (err, cardsData) => {
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
    const path = pathService.getProfilesPath()

    ioService.readData(path, (err, data) => {
        if (err) {
            res.status(400).send('Error reading data');
            return;
        }

        const parsedData = JSON.parse(data)
        res.json(parsedData);
    })
})


router.patch('/', (req, res) => {
    const path = pathService.getProfilesPath()

    ioService.readData(path, (err, dataToBeParsed) => {
        if (err) {
            res.status(400).send('Error reading data');
            return;
        }
        const updatedProfile = req.body
        const data = JSON.parse(dataToBeParsed)
        const index = data.profiles.findIndex(profile => profile.id === updatedProfile.id);

        if (index !== -1) {
            data.profiles[index] = updatedProfile

            ioService.writeData(path, JSON.stringify(data, null, 2), (err) => {
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


router.delete('/:uuid', (req, res) => {
    const path = pathService.getProfilesPath()

    ioService.readData(path, (err, dataToBeParsed) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        const uuid = req.params.uuid;
        const data = JSON.parse(dataToBeParsed)
        const index = data.profiles.findIndex(profile => profile.id === uuid);

        if (index !== -1) {
            data.profiles.splice(index, 1);

            ioService.writeData(path, JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Error writing data');
                    return;
                }

                configurationService.removeProfileConfig(uuid)
                res.status(200).send('Profile is successfully removed');
            })

        } else {
            res.status(402).send('Profile not found');
        }

    })
})

export default router