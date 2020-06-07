import {
    SET_INITIAL_LOADING,
    SET_SHOULD_LOAD,
    SET_CURR_PAGE,
    SET_COUNTRY_CODE,
    SET_NEWS_CATEGORY,
    SET_NEWS_ARTICLES,
    SET_END_OF_ARTICLE,
    SET_ERROR_FOUND,
    COUNTRY_CHANGE,
    CATEGORY_CHANGE,
    NewsFetchAction
} from './types';

export const setShouldLoad = ( newVal : boolean ) : NewsFetchAction => {
    return {
        type: SET_SHOULD_LOAD,
        val : newVal
    };
}
export const countryChangeHandler = ( newCountry:string ):NewsFetchAction => {
    return {
        type: COUNTRY_CHANGE,
        newcnt : newCountry
    };
}
export const categoryChangeHandler = (newCategory:string):NewsFetchAction => {
    return {
        type: CATEGORY_CHANGE,
        newcat : newCategory
    };
}

export const setInitialLoading = ( newVal:boolean ):NewsFetchAction => {
    return {
        type: SET_INITIAL_LOADING,
        val : newVal
    };
}

export const setNewsArticles= ( newVal:any[] ):NewsFetchAction => {
    return {
        type: SET_NEWS_ARTICLES,
        val : newVal
    };
}

export const setEndOfArticle = ( newVal:boolean ):NewsFetchAction => {
    return {
        type: SET_END_OF_ARTICLE,
        val : newVal
    };
}

export const setCurrPage = ( newVal:number ):NewsFetchAction => {
    return {
        type: SET_CURR_PAGE,
        val : newVal
    };
}

export const setErrorFound = ( newVal:boolean ):NewsFetchAction => {
    return {
        type: SET_ERROR_FOUND,
        val : newVal
    };
};