//----------------------------------------------------------------------------------------------------
//PURPOSE: A separate js file used to Store Constants to Improve Readability and Maintainibility of Code

// countryList used in Header/NavItems/CountryNavItem.js to display list of Available Countries in the Navbar.

export const countryList =[
    {country:"Australia" ,code:"au"},
    {country:"Argentina" ,code:"ar"},
    {country:"Belgium" ,code:"be"},
    {country:"Canada" ,code:"ca"},
    {country:"China" ,code:"cn"},
    {country:"Egypt" ,code:"eg"},
    {country:"France" ,code:"fr"},
    {country:"Germany" ,code:"de"},
    {country:"Italy" ,code:"it"},
    {country:"India" ,code:"in"},
    {country:"Japan" ,code:"jp"},
    {country:"Malaysia" ,code:"my"},
    {country:"Mexico" ,code:"mx"},
    {country:"Russia" ,code:"ru"},
    {country:"Sweden" ,code:"se"},
    {country:"Switzerland" ,code:"ch"},
    {country:"UK" ,code:"gb"},
    {country:"USA" ,code:"us"}
]

//----------------------------------------------------------------------------------------------------

// countryList used in Header/NavItems/CategoryNavItems.js to display list of Available Category of news in the Navbar.

export const newsCategories = [
    "Business" ,
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Sports",
    "Technology"
]

//----------------------------------------------------------------------------------------------------

// API_PAGE_SIZE is used to set maximum no of news articles render at a page loading at a time, Also used to check for reaching end of all available news articles.
export const API_PAGE_SIZE = 6;
export const FIREBASE_API_KEY = "AIzaSyAGXfGQY_m2XuciUzqBagMyc7OsbSGwr0Y";
export const NEWS_API_KEY_1 = '8115e82c195f445ebba7f0beeeb524e2';
export const NEWS_API_KEY_2 = 'e004421173114bd5b890eb56590a9a12';
//----------------------------------------------------------------------------------------------------