//temp variables
let CFVariables = {}

console.log("startup.js is active")

if(window.location.pathname=='/search/'){
	//styles
	CFVariables = {
		checkbox_active: [],
		checkbox_func: [],
		steam_checkboxes_active: [],
		scrolling: document.body.scrollHeight,
		custom_filter_index: 0
	}
	let cardBS = document.createElement('style');
    cardBS.type = 'text/css';
    cardBS.innerHTML = '.card_block {height: 45px;transition: height 0.25s, margin 0.25s;border: 1px solid rgba( 139, 185, 224, 0 );background: rgba( 0, 0, 0, 0.2 );margin-bottom: 5px;display: block;text-align: center;} .search_results.hide_negative .negative_r, .search_results.hide_mixed .mixed_r , .search_results.hide_incart .ds_incart, .search_cards.hide_negative .cards_negative,.search_cards.hide_incart .cards_incart,.search_cards.hide_mixed .cards_mixed,.search_cards.hide_owned .cards_owned,.search_cards.hide_wishlist .cards_wishlist,.search_cards.hide_ignored .cards_ignored {height: 0;margin: 0;border: none;overflow: hidden;}';
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
}
if(window.location.pathname=='/search/'){
	//variables
	card_block = document.createElement("a")
	card_block.className = 'card_block';
	card_block.insertAdjacentHTML("beforeend",'<div style="margin-top: 15px;">0<div>')

	cards_row = document.getElementById("search_cardsRows")
	cards_container = document.getElementById("search_cards_container")
	url_params = ["BadReviews","InCart"]
	steam_params = ["hide_ignored","hide_owned","hide_wishlist"]
}