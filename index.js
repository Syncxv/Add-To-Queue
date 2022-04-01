/** @type {import('../../../fake_node_modules/powercord/entities/').default} */
const { Plugin } = require("powercord/entities");
const { React, getModule } = require("powercord/webpack");
const { inject, uninject } = require("powercord/injector");
const { post } = require("powercord/http");

const AddToQueueButton = require("./components/Button");
const SpotifyAPI = require("../pc-spotify/SpotifyAPI");
const { SPOTIFY_PLAYER_URL } = require("../pc-spotify/constants");
class AddToQueuePlugin extends Plugin {
    startPlugin() {
        this.patchUserPopout();
        this.patchFriendsSection();
    }
    patchUserPopout() {
        const SpotifyActivitySyncButton = getModule((m) => m?.default?.displayName === "SpotifyActivitySyncButton", false);
        inject("add-to-queue", SpotifyActivitySyncButton, "default", (_, res) =>
            res === null ? null : AddToQueueButton({ listenAlong: res, addToQueue: this.addToQueue.bind(this) })
        );
    }
    patchFriendsSection() {
        const nowPlaying = getModule((m) => m?.default?.displayName === "NowPlayingCardMenu", false);
        const { MenuItem } = getModule(["MenuGroup", "MenuItem"], false);
        inject("add-to-queue-context-menu", nowPlaying, "default", ([stuff], res) => {
            if (!stuff.party.id.includes("spotify")) return res;
            const spotifySection = res.props.children[2];
            spotifySection.props.children.splice(
                1,
                0,
                React.createElement(MenuItem, {
                    action: () => this.addToQueue(stuff.party.currentActivities[0].activity.sync_id),
                    id: "bruh",
                    label: "Add To Queue",
                })
            );
            return res;
        });
    }
    addToQueue(sync_id) {
        SpotifyAPI.genericRequest(post(`${SPOTIFY_PLAYER_URL}/queue`).query("uri", `spotify:track:${sync_id}`), true)
            .then(() => this.notify(`Queued`))
            .catch((err) => {
                console.error("[QUEUE-SPOTIFY]", err);
                this.notify("AYE is yo spotify on?", false);
            });
    }
    notify(content, success = true) {
        powercord.api.notices.sendToast(`bru-momentum`, {
            type: "info",
            header: "Add To Queue",
            content,
            buttons: [
                {
                    text: "Dismiss",
                    color: success ? "green" : "red",
                    look: "outlined",
                    onClick: () => powercord.api.notices.closeToast("bru-momentum"),
                },
            ],
            timeout: 3e3,
        });
    }
    pluginWillUnload() {
        uninject("add-to-queue");
        uninject("add-to-queue-context-menu");
    }
}

module.exports = AddToQueuePlugin;
