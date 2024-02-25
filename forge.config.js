import path from 'path';

export const packagerConfig = {
  asar: true,
  extraResource: path.join(path.resolve(), 'resources/website'),
  icon: path.join(path.resolve(), 'icon.ico')
};

export const rebuildConfig = {};

export const makers = [
  {
    name: '@electron-forge/maker-squirrel',
    config: {
      setupIcon: path.join(path.resolve(), 'icon.ico')
    },
  },
  {
    name: '@electron-forge/maker-zip',
    platforms: ['darwin'],
  },
  {
    name: '@electron-forge/maker-deb',
    config: { icon: path.join(path.resolve(), 'icon.ico') },
  },
  {
    name: '@electron-forge/maker-rpm',
    config: { icon: path.join(path.resolve(), 'icon.ico') },
  },
];

export const plugins = [
  {
    name: '@electron-forge/plugin-auto-unpack-natives',
    config: {},
  },
];
