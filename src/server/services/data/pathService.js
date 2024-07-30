import fs from 'fs';
import path from 'path';
import { USERDATAPATH } from '../../../utils/electron.js';

class PathService {

    getProfilesPath() {
        return path.join(USERDATAPATH, 'data/profiles/profiles.json');
    }

    getCardsPath(uuid) {
        return path.join(USERDATAPATH, `data/profiles/${uuid}/cards/cards.json`);
    }

    getFolderFromFilePath(filePath) {
        let pathSplit = filePath.split('\\')
        return filePath.replace(pathSplit[pathSplit.length - 1], "")
    }

    getDirectoriesFromFolder(folder) {
        return fs.readdirSync(folder, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
    }

}
const pathService = new PathService();
export { pathService };

