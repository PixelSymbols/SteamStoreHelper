//temp variables
let CFVariables = {}

console.log("startup.js is active")

if(window.location.pathname=='/search/'){
	//styles
    localStorage.getItem('CFGameCards')==null ? localStorage.setItem('CFGameCards','{}') : 0
	CFVariables = {
		checkbox_active: [],
		checkbox_func: [],
		steam_checkboxes_active: [],
		scrolling: document.body.scrollHeight,
		custom_filter_index: 0,
	}
	let cardBS = document.createElement('style');
    cardBS.type = 'text/css';
    cardBS.innerHTML = `
    .card_block {
        height: 45px;transition: height 0.25s, margin 0.25s;
        border: 1px solid rgba( 139, 185, 224, 0 );
        background-color: #16202D;
        margin-bottom: 5px;
        display: block;
        text-align: center;
    }
    .search_results.hide_negative .negative_r, .search_results.hide_mixed .mixed_r , .search_results.hide_incart .ds_incart, .search_cards.hide_negative .cards_negative,.search_cards.hide_incart .cards_incart,.search_cards.hide_mixed .cards_mixed,.search_cards.hide_owned .cards_owned,.search_cards.hide_wishlist .cards_wishlist,.search_cards.hide_ignored .cards_ignored {height: 0;margin: 0;border: none;overflow: hidden;}`;
    document.getElementsByTagName('head')[0].appendChild(cardBS);

    //main block for cards
    StoreHelper_ = document.createElement("div")
    StoreHelper_.setAttribute("data-gpnav","rows")
    StoreHelper_.setAttribute("id","CardRows")
    StoreHelper_.style = "float: left;width: 80px;"
    document.getElementsByClassName("page_content")[1].insertAdjacentElement("afterbegin",StoreHelper_)

    //block imitating steam search block
    temp = document.createElement("div")
    temp.style = "height: 37px;position: relative;background: #101822;margin-bottom: 5px;display: block;border: 1px solid rgba( 139, 185, 224, 0 );"
    temp.className = "CF"
    temp.insertAdjacentHTML("beforeend",'<div id="total_CardPrice" style="padding: 10px;text-align: center;">101$</div>')
    StoreHelper_.insertAdjacentElement("beforeend",temp)

    //card rows container
    StoreHelper_.insertAdjacentHTML("beforeend",'<div id="search_cards" style="padding: 10px;background-color: #ffa324ba;text-align: center;">cards</div>')

    //card rows
    StoreHelper_.insertAdjacentHTML("beforeend",'<div id="search_cards_container" style="max-width: 80px;" class="search_cards"><div id="search_cardsRows"></div>')

    //to move filters to the right , or they dissappear
    document.getElementById("additional_search_options").style = "margin-right: -78px;margin-left: 0px; float: right;"

    //blyat naxyi
    temp = document.getElementsByClassName("block_content block_content_inner")[1].children //dont ask me why
    for(let i=1;i<temp.length;i++){
    	CFVariables['steam_checkboxes_active'].push(Number(temp[i].classList.value.split(' ').includes("checked")))
    	temp[i].onclick = function(){CFVariables['steam_checkboxes_active'][i-1] = Number(!CFVariables['steam_checkboxes_active'][i-1]);classlistParams(steam_params[i-1],CFVariables['steam_checkboxes_active'][i-1]);console.log(i-1)}
    }
    //variables
    card_block = document.createElement("a")
    card_block.className = 'card_block';
    card_block.insertAdjacentHTML("beforeend",'<div style="margin-top: 15px;">0<div>')

    cards_row = document.getElementById("search_cardsRows")
    cards_container = document.getElementById("search_cards_container")
    url_params = ["BadReviews","InCart"]
    steam_params = ["hide_ignored","hide_owned","hide_wishlist"]
}
/*
currencies : {
    "USD": 1, //United States dollar
    "GBP": 2, //British pound sterling
    "EUR": 3, //The euro
    "CHF": 4, //Swiss franc
    "RUB": 5, //Russian ruble
    "PLN": 6, //Polish złoty
    "BRL": 7, //Brazilian real
    "JPY": 8, //Japanese yen
    "SEK": 9, //Swedish krona
    "IDR": 10, //Indonesian rupiah
    "MYR": 11, //Malaysian ringgit
    "BWP": 12, //Botswana pula
    "SGD": 13, //Singapore dollar
    "THB": 14, //Thai baht
    "VND": 15, //Vietnamese dong
    "KRW": 16, //South Korean won
    "TRY": 17, //Turkish lira
    "UAH": 18, //Ukrainian hryvnia
    "MXN": 19, //Mexican Peso
    "CAD": 20, //Canadian dollar
    "AUD": 21, //Australian dollar
    "NZD": 22, //New Zealand dollar
    "CNY": 23, //Chinese yuan
    "INR": 24, //Indian rupee
    "CLP": 25, //Chilean peso
    "PEN": 26, //Peruvian sol
    "COP": 27, //Colombian peso
    "ZAR": 28, //South African rand
    "HKD": 29, //Hong Kong dollar
    "TWD": 30, //New Taiwan dollar
    "SAR": 31, //Saudi riyal
    "AED": 32, //United Arab Emirates dirham
    "ARS": 34, //Argentine Peso
    "ILS": 35, //Israeli New
    "BYN": 36, //Belarusian Ruble
    "KZT": 37, //Kazakhstani Tenge
    "KWD": 38, //Kuwaiti Dinar
    "QAR": 39, //Qatari Riyal
    "CRC": 40, //Costa Rican
    "UYU": 41, //Uruguayan Peso
    "BGN": 42, //Bulgarian Lev
    "HRK": 43, //Croatian Kuna
    "CZK": 44, //Czech Koruna
    "DKK": 45, //Danish Krone
    "HUF": 46, //Hungarian Forint
    "RON": 47, //Romanian Leu
},
proxies: [
    '12.151.56.30:80',
    '206.226.226.3:3128',
    '64.235.204.107:3128',
    '51.77.159.133:80',
    '107.151.182.247:80',
    '187.130.139.197:8080',
    '51.195.76.214:3128',
    '176.31.129.223:8080',
    '12.3.243.178:8080',
    '103.80.1.2:80',
    '223.29.214.6:80']//0-10
*/