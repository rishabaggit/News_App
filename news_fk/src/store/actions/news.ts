import {API_PAGE_SIZE,NEWS_API_KEY_1} from '../../constants';
import * as actionTypes from './actionTypes';
import { RootState } from 'index';

interface setShouldLoadAction{
    type: typeof actionTypes.SET_SHOULD_LOAD;
    val : boolean;
};
interface countryChangeHandlerAction{
    type: typeof actionTypes.COUNTRY_CHANGE;
    newcnt: string;
};
interface categoryChangeHandlerAction{
    type: typeof actionTypes.CATEGORY_CHANGE;
    newcat: string;
};
interface setInitialLoadingAction{
    type: typeof actionTypes.SET_INITIAL_LOADING;
    val:boolean;
};
interface setNewsArticlesAction{
    type: typeof actionTypes.SET_NEWS_ARTICLES;
    val: any;
};
interface setEndofArticleAction{
    type: typeof actionTypes.SET_END_OF_ARTICLE;
    val: boolean;
};
interface setCurrPageAction{
    type: typeof actionTypes.SET_CURR_PAGE;
    val: number;
};
interface setErrorFoundAction{
    type: typeof actionTypes.SET_ERROR_FOUND;
    val: boolean;
};

export const setShouldLoad = ( newVal:boolean ) => {
    return {
        type: actionTypes.SET_SHOULD_LOAD,
        val : newVal
    };
}
export const countryChangeHandler = ( newCountry:string ) => {
    return {
        type: actionTypes.COUNTRY_CHANGE,
        newcnt : newCountry
    };
}
export const categoryChangeHandler = (newCategory:string) => {
    return {
        type: actionTypes.CATEGORY_CHANGE,
        newcat : newCategory
    };
}

export const setInitialLoading = ( newVal:boolean ) => {
    return {
        type: actionTypes.SET_INITIAL_LOADING,
        val : newVal
    };
}

export const setNewsArticles= ( newVal: any ) => {
    return {
        type: actionTypes.SET_NEWS_ARTICLES,
        val : newVal
    };
}

export const setEndOfArticle = ( newVal:boolean ) => {
    return {
        type: actionTypes.SET_END_OF_ARTICLE,
        val : newVal
    };
}

export const setCurrPage = ( newVal:number ) => {
    return {
        type: actionTypes.SET_CURR_PAGE,
        val : newVal
    };
}

export const setErrorFound = ( newVal:boolean ) => {
    return {
        type: actionTypes.SET_ERROR_FOUND,
        val : newVal
    };
};

export const newsHandler = () => {
    return (dispatch:any, getState: () => RootState ) => {
            //getState() = getState();
            if(!getState().newsFetchReducer.end_of_article) {
            dispatch(setShouldLoad(false));
            const url = `http://newsapi.org/v2/top-headlines?country=${getState().newsFetchReducer.countrycode}&category=${getState().newsFetchReducer.newscategory}&pageSize=${API_PAGE_SIZE}&page=${getState().newsFetchReducer.currpage}&apiKey=${NEWS_API_KEY_1}`;
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

export type newsFetchAction = setInitialLoadingAction | setShouldLoadAction | setCurrPageAction | setEndofArticleAction |
                            setErrorFoundAction | setNewsArticlesAction | countryChangeHandlerAction | categoryChangeHandlerAction;