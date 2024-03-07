import os from 'os';
import path from 'path';

// eslint-disable-next-line no-undef
export const USERDATAPATH = path.join(process.env.APPDATA || (process.platform === 'darwin' ? path.join(os.homedir(), 'Library', 'Application Support') : path.join(os.homedir(), '.config')), 'flash-cards-application')