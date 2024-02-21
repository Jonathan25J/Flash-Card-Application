import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';

class DataManageMent {
    constructor() {
        this.#checkPaths()
    }

    getProfilesPath() {
        return path.join(path.resolve(), 'resources/data/profiles.json');
    }

    #checkPaths() {
        let path = this.getProfilesPath();
        if (!fs.existsSync(path))
        fse.ensureFile(path).then( () => {
            const defaultJson = {
                "profiles": []
            }
            fs.writeFileSync(path, JSON.stringify(defaultJson))
        })
    }
}
const dataManageMent = new DataManageMent();
export { dataManageMent };
