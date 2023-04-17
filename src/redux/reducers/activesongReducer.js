const activesongReducer = (state = [], action) => {
	switch (action.type) {
		case "SET_ACTIVE_SONGS":
			return action.payload;
		default:
			return state;
	}
};

const isplayingReducer = (state = false, action) => {
	switch (action.type) {
		case "SET_IS_PLAYING":
			return action.payload;
		default:
			return state;
	}
};
export { activesongReducer, isplayingReducer };
