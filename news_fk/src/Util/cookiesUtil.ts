/* eslint-disable indent */
import { Cookies } from "react-cookie";

interface NewsArticle {
    urlToImage: string;
    url: string;
    title: string;
    description: string;
}
export const initializeLike = (cookies: Cookies) => {
    if (cookies.get('Like') === null || cookies.get('Like') === undefined) {
        cookies.set('Like', [], { path: '/' });
    }
};
export const getLikeArray = (cookies: Cookies) => {
    initializeLike(cookies);
    return (cookies).get('Like');
};
export const addLike = (cookies: Cookies, newsItem: NewsArticle) => {
    var LikedArray = getLikeArray(cookies);
    cookies.set('Like', [...LikedArray, newsItem.url]);
};
export const removeLike = (cookies: Cookies, newsItem: NewsArticle) => {
    var LikedArray = getLikeArray(cookies);
    const index = LikedArray.indexOf(newsItem.url);
    if (index > -1) {
        LikedArray.splice(index, 1);
    }
    cookies.set('Like', LikedArray);
};


export const getUser = (cookies: Cookies) => {
    return cookies.get('PrevUser');
};
export const checkSignIn = (cookies: Cookies, authSuccess: any) => {
    if (getUser(cookies) !== null ||
        getUser(cookies) !== undefined ||
        getUser(cookies) !== '') {
        authSuccess(getUser(cookies));
    }
};
export const signInHandler = (cookies: Cookies, userId: string) => {
    cookies.set('PrevUser', userId, { path: '/' });
};
export const signOutHandler = (cookies: Cookies) => {
    cookies.set('PrevUser', '', { path: '/' });
};




export const initializeDarkMode = (cookies: Cookies) => {
    if (cookies.get('DarkMode') === null ||
        cookies.get('DarkMode') === undefined) {
        cookies.set('DarkMode', false, { path: '/' });
    }
};
export const getDarkMode = (cookies: Cookies) => {
    return cookies.get('DarkMode');
};
export const setDarkMode = (cookies: Cookies, mode: boolean) => {
    cookies.set('DarkMode', mode, { path: '/' });
};