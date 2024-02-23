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
        let imagesPath = path.join(path.resolve(), `resources/data/profiles/${uuid}/images`)
        fse.ensureFile(profilePath).then(() => {
            const defaultJson = {
                "cards": []
            }
            fs.writeFileSync(profilePath, JSON.stringify(defaultJson, null, 2))
        })
        fse.ensureDir(imagesPath)
    }

    removeProfileConfig(uuid) {
        let profilePath = path.join(path.resolve(), `resources/data/profiles/${uuid}`)
        fse.ensureDir(profilePath).then(() => {
            rimraf(profilePath)
        })
    }

    getCardsPath(uuid) {
        return path.join(path.resolve(), `resources/data/profiles/${uuid}/cards.json`);
    }

    writeImage(uuid, cardUuid, name, image) {
        const type = image.split(';')[0].split(':')[1].split('/')[1]
        let imagePath = path.join(path.resolve(), `resources/data/profiles/${uuid}/images/${name}-${cardUuid}.${type}`)
        const buffer = Buffer.from(image.split('base64')[1], 'base64')
        fs.writeFileSync(imagePath, buffer)
        return imagePath
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
