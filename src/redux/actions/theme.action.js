import {THEME_CHANGE_MODE, THEME_COLLAPSE} from "@moonlay/src/redux/constants";

export function ChangeTheme(mode = String){
    return {
        type: THEME_CHANGE_MODE,
        mode
    }
}

export function ThemeCollapse(){
    return {
        type: THEME_COLLAPSE
    }
}