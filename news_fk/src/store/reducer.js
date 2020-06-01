import * as actionTypes from './actions';

const initialState = {
    initial_loading : true,
    should_load : false,
    currpage : 1,
    countrycode : "in",
    newscategory : "General",
    newsarticles : [],
    end_of_article : false,
    error_found : false
}

const reducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.SET_INITIAL_LOADING:
            return{
                ...state,
                initial_loading : action.val
            }
        case actionTypes.SET_SHOULD_LOAD:
            return{
                ...state,
                should_load : action.val
            }
        case actionTypes.SET_CURR_PAGE:
            return{
                ...state,
                currpage : action.val
            }    
        case actionTypes.SET_COUNTRY_CODE:
            return{
                ...state,
                countrycode : action.val
            } 
        case actionTypes.SET_NEWS_CATEGORY:
            return{
                ...state,
                newscategory : action.val
            } 
        case actionTypes.SET_NEWS_ARTICLES:
            return{
                ...state,
                newsarticles : action.val
            }   
        case actionTypes.SET_END_OF_ARTICLE:
            return{
                ...state,
                end_of_article : action.val
            }
        case actionTypes.SET_ERROR_FOUND:
            return{
                ...state,
                error_found : action.val
            }
        case actionTypes.COUNTRY_CHANGE:
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
        case actionTypes.CATEGORY_CHANGE:
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

export default reducer;