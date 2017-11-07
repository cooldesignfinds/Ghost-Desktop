const {app} = require('electron');
const fs = require('fs-extra');
const path = require('path');
const debug = require('debug')('ghost-desktop:main:preferences');

/**
 * From the window, we'll save preferences to disk (to a file called ghost.json).
 * The data isn't guarunteed to be accurate, but it's a solid source when the
 * main process needs to know about user config.
 *
 * @returns {Object} preferences
 */
function getPreferences() {
    const userData = app.getPath('userData');
    const configPath = path.join(userData, 'ghost.json');

    if (fs.existsSync(configPath)) {
        try {
            const data = fs.readJSONSync(configPath);

            debug(`Read configuration data`, data);
            return data;
        } catch (error) {
            debug(`Failed to read configuration data, assuming default`, error);
        }
    }

    // This is supposed to the be the same as in
    // ../../app/storages/prefercences.js
    return {
        isNotificationsEnabled: true,
        spellcheckLanguage: 'en',
        isQuickSwitcherMinimized: false,
        isVibrancyEnabled: process.platform === 'darwin'
    };
}

module.exports = {getPreferences};