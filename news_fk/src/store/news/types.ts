export interface NewsFetchState {
    initial_loading : boolean,
    should_load : boolean,
    currpage : number,
    countrycode : string,
    newscategory : string,
    newsarticles : any[],
    end_of_article : boolean,
    error_found : boolean
  }

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

interface SetInitialLoadingAction {
    type: typeof SET_INITIAL_LOADING,
    val: boolean
}
interface SetShouldLoadAction {
    type: typeof SET_SHOULD_LOAD,
    val: boolean
}
interface SetCurrPageAction {
    type: typeof SET_CURR_PAGE,
    val: number
}
interface SetCountryCodeAction {
    type: typeof SET_COUNTRY_CODE,
    val: string
}
interface SetNewsCategoryAction {
    type: typeof SET_NEWS_CATEGORY,
    val: string
}
interface SetNewsArticlesAction {
    type: typeof SET_NEWS_ARTICLES,
    val: any[]
}
interface SetEndOfArticleAction {
    type: typeof SET_END_OF_ARTICLE,
    val: boolean
}
interface SetErrorFoundAction {
    type: typeof SET_ERROR_FOUND,
    val: boolean
}
interface CountryChangeAction {
    type: typeof COUNTRY_CHANGE,
    newcnt: string
}
interface CategoryChangeAction {
    type: typeof CATEGORY_CHANGE,
    newcat: string
}

export type NewsFetchAction = SetInitialLoadingAction | SetShouldLoadAction | SetCurrPageAction | SetCountryCodeAction |
                            SetNewsCategoryAction | SetNewsArticlesAction | SetEndOfArticleAction |SetErrorFoundAction |
                            CountryChangeAction | CategoryChangeAction;