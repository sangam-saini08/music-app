import { combineReducers } from "redux";
import { isplayingplaylistormusic } from "./activemusicplaylistReducer";
import { activesongReducer, isplayingReducer } from "./activesongReducer";
import allSongsReducer from "./allSongsReducer";
import {
	activeplaylistReducer,
	isplayingPlaylistReducer,
} from "./playlistReducer";

const roootReducers = combineReducers({
	allsongs: allSongsReducer,
	activesong_global: activesongReducer,
	isplaying_gloabal: isplayingReducer,
	aciveplaylist_global: activeplaylistReducer,
	isplayingplaylist_global: isplayingPlaylistReducer,
	isplayingmusicorplaylist: isplayingplaylistormusic,
});

export default roootReducers;
