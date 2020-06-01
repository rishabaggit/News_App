import {API_PAGE_SIZE} from '../constants';

export const SET_INITIAL_LOADING = 'SET_INITIAL_LOADING';
export const SET_SHOULD_LOAD = 'SET_SHOULD_LOAD';
export const SET_CURR_PAGE = 'SET_CURR_PAGE';
export const SET_COUNTRY_CODE = 'SET_COUNTRY_CODE';
export const SET_NEWS_CATEGORY = 'SET_NEWS_CATEGORY';
export const SET_NEWS_ARTICLES = 'SET_NEWS_ARTICLES';
export const SET_END_OF_ARTICLE = 'SET_END_OF_ARTICLE';
export const SET_ERROR_FOUND = 'SET_ERROR_FOUND';
export const COUNTRY_CHANGE = 'COUNTRY_CHANGE';
export const CATEGORY_CHANGE = 'CATEGORY_CHANGE';

export const setShouldLoad = ( newVal ) => {
    return {
        type: SET_SHOULD_LOAD,
        val : newVal
    };
}
export const countryChangeHandler = ( newCountry ) => {
    return {
        type: COUNTRY_CHANGE,
        newcnt : newCountry
    };
}
export const categoryChangeHandler = (newCategory) => {
    return {
        type: CATEGORY_CHANGE,
        newcat : newCategory
    };
}

export const setInitialLoading = ( newVal ) => {
    return {
        type: SET_INITIAL_LOADING,
        val : newVal
    };
}

export const setNewsArticles= ( newVal ) => {
    return {
        type: SET_NEWS_ARTICLES,
        val : newVal
    };
}

export const setEndOfArticle = ( newVal ) => {
    return {
        type: SET_END_OF_ARTICLE,
        val : newVal
    };
}

export const setCurrPage = ( newVal ) => {
    return {
        type: SET_CURR_PAGE,
        val : newVal
    };
}

export const setErrorFound = ( newVal ) => {
    return {
        type: SET_ERROR_FOUND,
        val : newVal
    };
};

export const newsHandler = () => {
    return (dispatch, getState) => {
            //getState() = getState();
            if(!getState().end_of_article) {
            dispatch(setShouldLoad(false));
              const url = `http://newsapi.org/v2/top-headlines?country=${getState().countrycode}&category=${getState().newscategory}&pageSize=${API_PAGE_SIZE}&page=${getState().currpage}&apiKey=8115e82c195f445ebba7f0beeeb524e2`;
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