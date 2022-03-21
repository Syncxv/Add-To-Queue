/** @type {import('../../../fake_node_modules/powercord/entities/').default} */
const { Plugin } = require("powercord/entities");
const { getModule } = require("powercord/webpack");
const { inject, uninject } = require("powercord/injector");

const AddToQueueButton = require("./components/Button");
const SpotifyAPI = require("../pc-spotify/SpotifyAPI");
class AddToQueuePlugin extends Plugin {
    startPlugin() {
        const SpotifyActivitySyncButton = getModule((m) => m?.default?.displayName === "SpotifyActivitySyncButton", false);
        inject("add-to-queue", SpotifyActivitySyncButton, "default", (_, res) => AddToQueueButton({ listenAlong: res, SpotifyAPI }));
    }

    pluginWillUnload() {
        uninject("add-to-queue");
    }
}

module.exports = AddToQueuePlugin;
