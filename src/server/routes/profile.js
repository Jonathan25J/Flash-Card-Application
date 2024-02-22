import { Router } from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { dataManageMent } from '../../utils/datamanagement.js';
const router = Router()

router.get('/:uuid', (req, res) => {
    const path = dataManageMent.getProfilesPath()

    fs.readFile(path, (err, dataToBeParsed) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }

        const data = JSON.parse(dataToBeParsed)

        for (let profile in data.profiles) {
            if (data.profiles.hasOwnProperty(profile)) {
                if (data.profiles[profile].id === req.params.uuid) {
                    let user = {
                        id: data.profiles[profile].id,
                        title: data.profiles[profile].title,
                        description: data.profiles[profile].description

                    }
                    res.json(user)
                    return
                }
            }
        }
        res.status(402).send('Profile not found');
    })
})

router.get('/', (req, res) => {
    const path = dataManageMent.getProfilesPath()

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
    res.render('index.html')
})

router.post('/', (req, res) => {
    const path = dataManageMent.getProfilesPath()
    fs.readFile(path, (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        let jsonData = JSON.parse(data)
        let uuid = uuidv4()
        let newProfile = {
            id: uuid,
            title: req.body.title,
            description: req.body.description

        }
        jsonData.profiles.push(newProfile)
        fs.writeFile(path, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing data');
                return;
            }
            dataManageMent.createProfileConfig(uuid)
            res.json(uuid);
        })
    })
})

router.patch('/', (req, res) => {
    const path = dataManageMent.getProfilesPath()

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
    const path = dataManageMent.getProfilesPath()

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

                dataManageMent.removeProfileConfig(uuid)
                res.status(200).send('Profile is successfully removed');
            })

        } else {
            res.status(402).send('Profile not found');
        }
        
    })
})



export default router