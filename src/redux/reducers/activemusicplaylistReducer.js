const isplayingplaylistormusic = (state = "", action) => {
	switch (action.type) {
		case "SET_IS_PLAYING_MUSIC_OR_PLAYLIST":
			return action.payload;
		default:
			return state;
	}
};

export { isplayingplaylistormusic };
