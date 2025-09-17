import {environment} from "../../environments/environment";

export interface AppSettings {
    dir: 'ltr' | 'rtl';
    theme: string;
    sidenavOpened: boolean;
    sidenavCollapsed: boolean;
    boxed: boolean;
    horizontal: boolean;
    activeTheme: string;
    language: string;
    cardBorder: boolean;
    navPos: 'side' | 'top';
}

export const defaults: AppSettings = {
    dir: 'ltr',
    theme: environment.theme,
    sidenavOpened: false,
    sidenavCollapsed: false,
    boxed: false,
    horizontal: true,
    cardBorder: false,
    activeTheme: 'blue_theme',
    language: 'en-us',
    navPos: 'side',
};
