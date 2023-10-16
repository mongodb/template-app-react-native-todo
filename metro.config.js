const path = require('path');
const WORKSPACE_ROOT = path.resolve(process.cwd(), '../../');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  watchFolders: [WORKSPACE_ROOT],
};
