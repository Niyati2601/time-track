const themeReducer = (state,action) => {

    switch(action.type){
        case "Dark":
            return {darkMode: true}
        case "Light":
            return {darkMode: false}
        case "Toggle":
            return {darkMode: !state.darkMode}
        default:
            return state
    }
};

export default themeReducer;