import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import { rimraf } from 'rimraf';
class DataManagement {
    constructor() {
        this.#checkPaths()
    }

    getProfilesPath() {
        return path.join(path.resolve(), 'resources/data/profiles/profiles.json');
    }

    createProfileConfig(uuid) {
        let profilePath = path.join(path.resolve(), `resources/data/profiles/${uuid}/cards.json`)
        fse.ensureFile(profilePath).then( () => {
            const defaultJson = {
                "cards": []
            }
            fs.writeFileSync(profilePath, JSON.stringify(defaultJson, null, 2))
        })
    }

    removeProfileConfig(uuid) {
        let profilePath = path.join(path.resolve(), `resources/data/profiles/${uuid}`)
        fse.ensureDir(profilePath).then( () => {
            rimraf(profilePath)
        })
    }

    getCardsPath(uuid) {
        return path.join(path.resolve(), `resources/data/profiles/${uuid}/cards.json`);
    }

    #checkPaths() {
        let path = this.getProfilesPath();
        if (!fs.existsSync(path))
        fse.ensureFile(path).then( () => {
            const defaultJson = {
                "profiles": []
            }
            fs.writeFileSync(path, JSON.stringify(defaultJson, null, 2))
        })
    }
}
const dataManagement = new DataManagement();
export { dataManagement };
