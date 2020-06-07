import {
    NewsFetchAction,
    NewsFetchState,
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
} from './types';

const initialState : NewsFetchState = {
    initial_loading : true,
    should_load : false,
    currpage : 1,
    countrycode : "in",
    newscategory : "General",
    newsarticles : [],
    end_of_article : false,
    error_found : false
}

const newsFetchReducer = (state = initialState, action : NewsFetchAction) : NewsFetchState => {
    switch(action.type){
        case SET_INITIAL_LOADING:
            return{
                ...state,
                initial_loading : action.val
            }
        case SET_SHOULD_LOAD:
            return{
                ...state,
                should_load : action.val
            }
        case SET_CURR_PAGE:
            return{
                ...state,
                currpage : action.val
            }    
        case SET_COUNTRY_CODE:
            return{
                ...state,
                countrycode : action.val
            } 
        case SET_NEWS_CATEGORY:
            return{
                ...state,
                newscategory : action.val
            } 
        case SET_NEWS_ARTICLES:
            return{
                ...state,
                newsarticles : action.val
            }   
        case SET_END_OF_ARTICLE:
            return{
                ...state,
                end_of_article : action.val
            }
        case SET_ERROR_FOUND:
            return{
                ...state,
                error_found : action.val
            }
        case COUNTRY_CHANGE:
            return {
                ...state,
                initial_loading : true,
                countrycode : action.newcnt,
                currpage : 1,
                newsarticles : [],
                should_load : false,
                end_of_article : false,
                error_found : false
            }
        case CATEGORY_CHANGE:
            return {
                ...state,
                initial_loading : true,
                newscategory : action.newcat,
                currpage : 1,
                newsarticles : [],
                should_load : false,
                end_of_article : false,
                error_found : false
            }
        default:
            return state;
    }
}

export default newsFetchReducer;
