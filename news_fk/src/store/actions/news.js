import {API_PAGE_SIZE} from '../../constants';
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
            if(!getState().newsFetchReducer.end_of_article) {
            dispatch(setShouldLoad(false));
            //   const url = `http://newsapi.org/v2/top-headlines?country=${getState().newsFetchReducer.countrycode}&category=${getState().newscategory}&pageSize=${API_PAGE_SIZE}&page=${getState().currpage}&apiKey=8115e82c195f445ebba7f0beeeb524e2`;
            const url = `http://newsapi.org/v2/top-headlines?country=${getState().newsFetchReducer.countrycode}&category=${getState().newsFetchReducer.newscategory}&pageSize=${API_PAGE_SIZE}&page=${getState().newsFetchReducer.currpage}&apiKey=e004421173114bd5b890eb56590a9a12`;  
            fetch(url)
              .then(response => {
                return response.json();
              })
              .then(fin => {
                dispatch(setInitialLoading(false));
                dispatch(setNewsArticles([...getState().newsFetchReducer.newsarticles , ...fin.articles]));
                dispatch(setShouldLoad(true));
                if(fin.articles.length < API_PAGE_SIZE) {
                    dispatch(setEndOfArticle(true));
                    console.log("triggered");
                }else{
                    dispatch(setCurrPage(getState().newsFetchReducer.currpage + 1));
                }
              })
              .catch(err => {
                    dispatch(setErrorFound(true));
              })
            }
    }
}