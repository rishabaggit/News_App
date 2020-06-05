import {API_PAGE_SIZE , NEWS_API_KEY_1} from '../../constants';
import * as actionTypes from './actionTypes';

export const setShouldLoad = ( newVal ) => {
    return {
        type: actionTypes.SET_SHOULD_LOAD,
        val : newVal
    };
}
export const countryChangeHandler = ( newCountry ) => {
    return {
        type: actionTypes.COUNTRY_CHANGE,
        newcnt : newCountry
    };
}
export const categoryChangeHandler = (newCategory) => {
    return {
        type: actionTypes.CATEGORY_CHANGE,
        newcat : newCategory
    };
}

export const setInitialLoading = ( newVal ) => {
    return {
        type: actionTypes.SET_INITIAL_LOADING,
        val : newVal
    };
}

export const setNewsArticles= ( newVal ) => {
    return {
        type: actionTypes.SET_NEWS_ARTICLES,
        val : newVal
    };
}

export const setEndOfArticle = ( newVal ) => {
    return {
        type: actionTypes.SET_END_OF_ARTICLE,
        val : newVal
    };
}

export const setCurrPage = ( newVal ) => {
    return {
        type: actionTypes.SET_CURR_PAGE,
        val : newVal
    };
}

export const setErrorFound = ( newVal ) => {
    return {
        type: actionTypes.SET_ERROR_FOUND,
        val : newVal
    };
};

export const newsHandler = () => {
    return (dispatch, getState) => {
            //getState() = getState();
            if(!getState().end_of_article) {
            dispatch(setShouldLoad(false));
            const url = `http://newsapi.org/v2/top-headlines?country=${getState().countrycode}&category=${getState().newscategory}&pageSize=${API_PAGE_SIZE}&page=${getState().currpage}&apiKey=${NEWS_API_KEY_1}`;  
            fetch(url)
              .then(response => {
                return response.json();
              })
              .then(fin => {
                dispatch(setInitialLoading(false));
                dispatch(setNewsArticles([...getState().newsarticles , ...fin.articles]));
                dispatch(setShouldLoad(true));
                if(fin.articles.length < API_PAGE_SIZE) {
                    dispatch(setEndOfArticle(true));
                    console.log("triggered");
                }else{
                    dispatch(setCurrPage(getState().currpage + 1));
                }
              })
              .catch(err => {
                    dispatch(setErrorFound(true));
              })
            }
    }
}