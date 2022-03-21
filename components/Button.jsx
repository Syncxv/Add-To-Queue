const { post } = require("powercord/http");
const { React, getModule, getModuleByDisplayName } = require("powercord/webpack");

const { icon } = getModule(["icon", "isHeader"], false);
const Tooltip = getModuleByDisplayName("Tooltip", false);
const { SPOTIFY_PLAYER_URL } = require("../../pc-spotify/constants");

const AddToQueueButton = ({ listenAlong, addToQueue }) => {
    return (
        <div style={{ display: "flex", gap: "8px" }}>
            <Tooltip color="black" position="top" text="Add To Queue">
                {({ onMouseLeave, onMouseEnter }) => (
                    <button
                        className={`${listenAlong.props.className} ${listenAlong.props.size} ${listenAlong.props.look} ${listenAlong.props.color}`}
                        onClick={() => addToQueue(listenAlong.props.activity.sync_id)}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fefefe" viewBox="0 0 256 256" className={icon}>
                            <rect width="256" height="256" fill="none"></rect>
                            <line
                                x1="40"
                                y1="64"
                                x2="216"
                                y2="64"
                                fill="none"
                                stroke="#fefefe"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="16"
                            ></line>
                            <line
                                x1="40"
                                y1="128"
                                x2="136"
                                y2="128"
                                fill="none"
                                stroke="#fefefe"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="16"
                            ></line>
                            <line
                                x1="40"
                                y1="192"
                                x2="136"
                                y2="192"
                                fill="none"
                                stroke="#fefefe"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="16"
                            ></line>
                            <polygon
                                points="240 160 176 200 176 120 240 160"
                                fill="none"
                                stroke="#fefefe"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="16"
                            ></polygon>
                        </svg>
                    </button>
                )}
            </Tooltip>
            {listenAlong}
        </div>
    );
};

module.exports = AddToQueueButton;
