import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import lockfile from 'proper-lockfile';
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

    readData(filePath, callback) {
        lockfile.lock(filePath, { retries: { retries: 5, minTimeout: 100 } })
            .then((release) => {
                fs.readFile(filePath, (err, data) => {
                    release((releaseErr) => {
                        if (releaseErr) {
                            console.error('Failed to release the lock:', releaseErr);
                            return callback(releaseErr);
                        }
                    });

                    if (err) {
                        console.error('Failed to read file:', err);
                        return callback(err);
                    }

                    try {
                        JSON.parse(data);
                    } catch (err) {
                        console.error('Failed to read file:', err);
                        this.#fixJsonFile(filePath)
                        return callback(err);
                    }

                    callback(null, data);
                });
            })
            .catch((err) => {
                console.error('Failed to acquire the lock:', err);
                callback(err);
            });
    }

    writeData(filePath, data, callback) {
        lockfile.lock(filePath, { retries: { retries: 5, minTimeout: 100 } })
            .then((release) => {
                fs.writeFile(filePath, data, (err) => {
                    release((releaseErr) => {
                        if (releaseErr) {
                            console.error('Failed to release the lock:', releaseErr);
                            return callback(releaseErr);
                        }
                    });

                    if (err) {
                        console.error('Failed to write file:', err);
                        return callback(err);
                    }

                    callback(null);
                });
            })
            .catch((err) => {
                console.error('Failed to acquire the lock:', err);
                callback(err);
            });
    }

    getFolderFromFilePath(filePath) {
        let pathSplit = filePath.split('\\')
        return filePath.replace(pathSplit[pathSplit.length - 1], "")
    }

    getDirectoriesFromFolder(folder) {
        return fs.readdirSync(folder, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
    }


    #fixJsonFile(filePath) {
        let pathSplit = filePath.split('\\')
        let jsonName = pathSplit[pathSplit.length - 1].replace(".json", "")
        let jsonToWrite = {}
        jsonToWrite[jsonName] = []
        if (jsonName == "profiles") {
            this.getDirectoriesFromFolder(this.getFolderFromFilePath(filePath)).forEach(directory => {
                jsonToWrite.profiles.push({
                    id: directory.name,
                    title: "undefined",
                    description: "undefined"
        
                })
            })
        }
        fs.writeFileSync(filePath, JSON.stringify(jsonToWrite, null, 2))
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

