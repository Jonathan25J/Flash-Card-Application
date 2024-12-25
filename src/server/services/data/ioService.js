import fs from 'fs';
import path from 'path';
import lockfile from 'proper-lockfile';
import { USERDATAPATH } from '../../../utils/electron.js';
import { pathService } from './pathService.js';
class IOService {

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
                        this.#repairJsonFile(filePath)
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


    #repairJsonFile(filePath) {
        let pathSplit = filePath.split('\\')
        let jsonName = pathSplit[pathSplit.length - 1].replace(".json", "")
        let jsonToWrite = {}
        jsonToWrite[jsonName] = []
        if (jsonName == "profiles") {
            pathService.getDirectoriesFromFolder(pathService.getFolderFromFilePath(filePath)).forEach(directory => {
                jsonToWrite.profiles.push({
                    id: directory.name,
                    title: "undefined",
                    description: "undefined"

                })
            })
        }
        fs.writeFileSync(filePath, JSON.stringify(jsonToWrite, null, 2))
    }

}
const ioService = new IOService();
export { ioService };

