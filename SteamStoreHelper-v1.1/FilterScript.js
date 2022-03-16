let id_list = TgetData("SCFGameList") || []
if(window.location.pathname=='/search/'){//search page
    search = window.location.search
    TsaveData("SCFGameList",[]) //clear id game list array
    if (search.length <= 15){ //add links to the page
        e = document.createElement("h2")
        e.innerText = "better use one of these links"
        t = document.getElementById("termsnone")
        t.appendChild(e)
        e.insertAdjacentHTML("afterend",`<ul>
            <li style="cursor: pointer; font-size: 15px;"><a>All: </a></li>
            <li style="cursor: pointer; font-size: 15px;"><a>NSFW (Hentai/Yiff/etc.): </a></li>
            </ul>`)
        t.children[2].children[0].onclick = function(){openGamePage("https://store.steampowered.com/search/?sort_by=Price_ASC&category1=998&category2=29&specials=1")}
        t.children[2].children[1].onclick = function(){openGamePage("https://store.steampowered.com/search/?sort_by=Price_ASC&category1=998&category1=&tags=6650%2C12095%2C5611&category2=29&specials=1")}
    }
    let search_ = document.getElementById("additional_search_options")
    search_.insertAdjacentHTML('afterbegin',`<div class="block search_collapse_block" data-collapse-name="category1" data-collapse-default="true" data-gpnav="rows" data-gpfocus="group">
            <div data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}" class="block_header"><div>Steam Store Helper</div></div>
            <div class="block_content block_content_inner" id="narrow_category1" style="">
                <input type="hidden" id="category1" name="category1" value="998">
                before price:
                <input data-panel="{&quot;autoFocus&quot;:true}" type="text" class="text" id="term" name="displayterm" data-gpnav="item" onfocus="if(this.value=='enter price before'){this.value=''}" onchange="$('realterm').value= (this.value=='enter price before') ? '' : this.value" onblur="if(this.value==''){this.value='enter price before';}" value="enter price before" maxlength="64" autocomplete="off">
      <div id="AddToCart_btn" class="tab_filter_control tab_filter_control_include" style="">
                            <span>Add To Card</span>
                        </div>
          </div>`)//Store helper main block
    //user checkboxes
    document.getElementById("AddToCart_btn").onclick = function(){searchUnBoughtGames()}

    //checkboxes: original and custom
    let search_results = document.getElementById("search_resultsRows")
    timerId = setInterval(()=>{
        if(search_results.children.length>=50){
            addCardBlock(search_results.children.length);
            clearInterval(timerId)
            analize()
            newCheckBox("hide bad reviews",showBadReviews,hideBadReviews)
            newCheckBox("hide in cart",showInCart,hideInCart)
            setTimeout(() => {for(let i=0;i<CFVariables['steam_checkboxes_active'].length;i++){classlistParams(steam_params[i],CFVariables['steam_checkboxes_active'][i])}},100)
            search = search.split('&')
            for(let i=0;i<url_params.length;i++){
                setTimeout(()=>{search.includes(url_params[i]) ? document.getElementById("checkboxesRows").children[i].click() : false},500)
            }
        } },200)
}
if(window.location.pathname.split('/')[1] =='app' && id_list.length){//game page
    if (id_list[id_list.length-1]==window.location.pathname.match(/\d+/)[0]){
        id_list.splice(-1)
        TsaveData("SCFGameList",id_list)
        setTimeout(() => {document.getElementsByClassName("game_area_purchase_game")[0].children[0].submit()},3000);
    }
}
if(window.location.pathname == '/cart/'){//cart page
    items = document.getElementsByClassName("cart_item_list")[0].children
    total_price = document.getElementById("cart_estimated_total")
    total_price.innerText = items.length + ' games | ' + total_price.innerText
    if(id_list.length){setTimeout(() => {openGamePage("https://store.steampowered.com/app/"+id_list[id_list.length-1])},3000)}}
if(window.location.pathname=='/'){
    //TsaveData("test",0)
    Gaben();
    document.getElementById("Gabe").onclick = function(){GabeIMG()};
}