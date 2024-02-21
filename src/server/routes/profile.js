import { Router } from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { dataManageMent } from '../../utils/datamanagement.js';
const router = Router()

router.get('/', (req, res) => {
    const path = dataManageMent.getProfilesPath()

    fs.readFile(path, (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }

        const parsedData = JSON.parse(data)
        res.json(parsedData);
    })
})

router.post('/', (req, res) => {
    const path = dataManageMent.getProfilesPath()
    fs.readFile(path, (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        let jsonData = JSON.parse(data)
        let newProfile = {
            id: uuidv4(),
            title: req.body.title,
            description: req.body.description

        }
        jsonData.profiles.push(newProfile)
        fs.writeFile(path, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing file');
                return;
            }
            res.status(200).send('Data added successfully');
        });
    })
})


export default router