import {THEME_CHANGE_MODE, THEME_COLLAPSE} from "@moonlay/src/redux/constants";

const initialState = {
    app_name: process.env.NEXT_PUBLIC_APP_NAME || 'Core@2023',
    meta: {
        title: process.env.NEXT_PUBLIC_APP_NAME || 'Core@2023',
        keywords: "Lorem ipsum dolor sit amet",
        description: "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet."
    },
    locale:'id',
    navType: "TOP",
    currentTheme :null,
    direction:'',
    navCollapsed: false,
}

export default function(state = initialState, action){
    switch (action.type){
        case THEME_CHANGE_MODE:
            if (!localStorage.getItem("theme")){
                localStorage.setItem('theme',"light")
            }
            return{
                ...state,
                currentTheme: action?.mode ? action.mode : localStorage.getItem("theme")
            }
        case THEME_COLLAPSE:
            return {
                ...state,
                navCollapsed: !state.navCollapsed
            }
        default :
            return state;
    }
}
