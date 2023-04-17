export const setAllSongs = (songs) => {
	return (dispatch) => {
		dispatch({
			type: "SET_ALL_SONGS",
			payload: songs,
		});
	};
};

export const setActiveSong_global = (song) => {
	return (dispatch) => {
		dispatch({
			type: "SET_ACTIVE_SONGS",
			payload: song,
		});
	};
};

export const setIsPlaying_global = (boolval) => {
	return (dispatch) => {
		dispatch({
			type: "SET_IS_PLAYING",
			payload: boolval,
		});
	};
};

//playlist

export const setActivePlaylist_global = (song) => {
	return (dispatch) => {
		dispatch({
			type: "SET_ACTIVE_PLAYLIST",
			payload: song,
		});
	};
};

export const setIsPlayingPlaylist_global = (boolval) => {
	return (dispatch) => {
		dispatch({
			type: "SET_IS_PLAYING_PLAYLIST",
			payload: boolval,
		});
	};
};

export const setIsPlayingMusicOrPlaylist_global = (val) => {
	return (dispatch) => {
		dispatch({
			type: "SET_IS_PLAYING_MUSIC_OR_PLAYLIST",
			payload: val,
		});
	};
};
