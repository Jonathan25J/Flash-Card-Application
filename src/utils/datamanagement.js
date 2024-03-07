import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import { rimraf } from 'rimraf';
import { USERDATAPATH } from './electron.js';
class DataManagement {
    constructor() {
        this.#checkPaths()
    }

    getProfilesPath() {
        return path.join(USERDATAPATH, 'data/profiles/profiles.json');
    }

    createProfileConfig(uuid) {
        let profilePath = path.join(USERDATAPATH, `data/profiles/${uuid}/cards/cards.json`)
        fse.ensureFile(profilePath).then(() => {
            const defaultJson = {
                "cards": []
            }
            fs.writeFileSync(profilePath, JSON.stringify(defaultJson, null, 2))
        })
    }

    removeProfileConfig(uuid) {
        let profilePath = path.join(USERDATAPATH, `data/profiles/${uuid}`)
        fse.ensureDir(profilePath).then(() => {
            rimraf(profilePath)
        })
    }

    removeCardConfig(uuid, cardUuid) {
        let cardPath = path.join(USERDATAPATH, `data/profiles/${uuid}/cards/${cardUuid}`)
        fse.ensureDir(cardPath).then(() => {
            rimraf(cardPath)
        })
    }

    getCardsPath(uuid) {
        return path.join(USERDATAPATH, `data/profiles/${uuid}/cards/cards.json`);
    }

    createCardConfig(uuid, cardUuid) {
        let cardPath = path.join(USERDATAPATH, `data/profiles/${uuid}/cards/${cardUuid}/images`)
        fse.ensureDirSync(cardPath)
    }

    writeImage(uuid, cardUuid, name, image) {
        const type = image.split(';')[0].split(':')[1].split('/')[1]
        let imagePath = path.join(USERDATAPATH, `data/profiles/${uuid}/cards/${cardUuid}/images/${name}.${type}`)
        // eslint-disable-next-line no-undef
        const buffer = Buffer.from(image.split('base64')[1], 'base64')
        fs.writeFileSync(imagePath, buffer)
        return `/profiles/${uuid}/cards/${cardUuid}/images/${name}.${type}`
    }

    #checkPaths() {
        let path = this.getProfilesPath();
        if (!fs.existsSync(path))
            fse.ensureFile(path).then(() => {
                const defaultJson = {
                    "profiles": []
                }
                fs.writeFileSync(path, JSON.stringify(defaultJson, null, 2))
            })
    }
}
const dataManagement = new DataManagement();
export { dataManagement };

