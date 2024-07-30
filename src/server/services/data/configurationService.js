import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import { rimraf } from 'rimraf';
import { USERDATAPATH } from '../../../utils/electron.js';

class ConfigurationService {

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

    createCardConfig(uuid, cardUuid) {
        let cardPath = path.join(USERDATAPATH, `data/profiles/${uuid}/cards/${cardUuid}/images`)
        fse.ensureDirSync(cardPath)
    }

    removeCardConfig(uuid, cardUuid) {
        let cardPath = path.join(USERDATAPATH, `data/profiles/${uuid}/cards/${cardUuid}`)
        fse.ensureDir(cardPath).then(() => {
            rimraf(cardPath)
        })
    }
}

const configurationService = new ConfigurationService();
export { configurationService };
