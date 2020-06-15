import { API_PAGE_SIZE, NEWS_API_KEY_BING } from '../../constants';
import * as actionTypes from './actionTypes';
import { RootState } from 'index';
import axios from 'axios'

export interface setShouldLoadAction {
    type: typeof actionTypes.SET_SHOULD_LOAD;
    val: boolean;
};
export interface countryChangeHandlerAction {
    type: typeof actionTypes.COUNTRY_CHANGE;
    newcnt: string;
};
export interface categoryChangeHandlerAction {
    type: typeof actionTypes.CATEGORY_CHANGE;
    newcat: string;
};
export interface setInitialLoadingAction {
    type: typeof actionTypes.SET_INITIAL_LOADING;
    val: boolean;
};
export interface setNewsArticlesAction {
    type: typeof actionTypes.SET_NEWS_ARTICLES;
    val: any;
};
export interface setEndofArticleAction {
    type: typeof actionTypes.SET_END_OF_ARTICLE;
    val: boolean;
};
export interface setCurrPageAction {
    type: typeof actionTypes.SET_CURR_PAGE;
    val: number;
};
export interface setErrorFoundAction {
    type: typeof actionTypes.SET_ERROR_FOUND;
    val: boolean;
};

export const setShouldLoad = (newVal: boolean) => {
    return {
        type: actionTypes.SET_SHOULD_LOAD,
        val: newVal
    };
}
export const countryChangeHandler = (newCountry: string) => {
    return {
        type: actionTypes.COUNTRY_CHANGE,
        newcnt: newCountry
    };
}
export const categoryChangeHandler = (newCategory: string) => {
    return {
        type: actionTypes.CATEGORY_CHANGE,
        newcat: newCategory
    };
}

export const setInitialLoading = (newVal: boolean) => {
    return {
        type: actionTypes.SET_INITIAL_LOADING,
        val: newVal
    };
}

export const setNewsArticles = (newVal: Array<Object>) => {
    return {
        type: actionTypes.SET_NEWS_ARTICLES,
        val: newVal
    };
}

export const setEndOfArticle = (newVal: boolean) => {
    return {
        type: actionTypes.SET_END_OF_ARTICLE,
        val: newVal
    };
}

export const setCurrPage = (newVal: number) => {
    return {
        type: actionTypes.SET_CURR_PAGE,
        val: newVal
    };
}

export const setErrorFound = (newVal: boolean) => {
    return {
        type: actionTypes.SET_ERROR_FOUND,
        val: newVal
    };
};

export const newsHandler = () => {
    return (dispatch: any, getState: () => RootState) => {
        if (!getState().newsFetchReducer.end_of_article) {
            dispatch(setShouldLoad(false));
            const url = `https://api.cognitive.microsoft.com/bing/v7.0/news?cc=${getState().newsFetchReducer.countrycode}&category=${getState().newsFetchReducer.newscategory}&count=${API_PAGE_SIZE}&offset=${getState().newsFetchReducer.currpage}&mkt=en-us HTTP/1.1`;
            axios.get(url, { headers: { 'Ocp-Apim-Subscription-Key': NEWS_API_KEY_BING } })
                .then(response => {
                    return response.data.value;
                })
                .then(fin => {
                    dispatch(setInitialLoading(false));
                    const articles = fin.map((obj: any) => {
                        return (
                            {
                                urlToImage: obj.image.thumbnail.contentUrl,
                                url: obj.url,
                                title: obj.name,
                                description: obj.description
                            });

                    })
                    dispatch(setNewsArticles([...getState().newsFetchReducer.newsarticles, ...articles]));
                    dispatch(setShouldLoad(true));
                    if (fin.length < API_PAGE_SIZE) {
                        dispatch(setEndOfArticle(true));
                    } else {
                        dispatch(setCurrPage(getState().newsFetchReducer.currpage + API_PAGE_SIZE));
                    }
                })
                .catch(err => {
                    dispatch(setErrorFound(true));
                })
        }
    }
}

export type newsFetchAction = setInitialLoadingAction | setShouldLoadAction | setCurrPageAction | setEndofArticleAction |
    setErrorFoundAction | setNewsArticlesAction | countryChangeHandlerAction | categoryChangeHandlerAction;