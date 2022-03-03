if(window.location.pathname=='/search/'){
window.addEventListener('scroll', function() {
    t = document.body.scrollHeight
    if(CFVariables['scrolling']+208 <= t){
        CFVariables['scrolling'] = t
        g_count = document.getElementById("search_resultsRows").children.length
        b_count = cards_row.children.length
        addCardBlock(g_count-b_count)
        analize()
    }
});//NOTE: to know when games added to the page
}
to_num = (x) => Number(x.replace('.','').replace(',','.'))

//game id temp saving
TsaveData = (key,value) => {chrome.storage.local.set({key: value}, () => {console.log('Value of', key,'is: ',value);});}
TgetData = (key) => {return chrome.storage.local.get({key}, (result) => {console.log('Value of',key,'is: ',result.key);});}
TclearData = (key) => chrome.storage.local.remove(key,() => {console.log("Data was removed")})

//balance
getBalance = () => to_num(document.getElementById("header_wallet_balance").innerText.split(' ')[1])
getBalance_id = () => document.getElementById("header_wallet_balance")

//url
openGamePage = (link) => window.location.replace(link);
URLParams = (p_i,v=0) => {
    ps = window.location.search;t = ps.split('&').includes(url_params[p_i])
    v==0 ? ps = ps.replace('&'+url_params[p_i],'') : !t ? ps+='&'+url_params[p_i] : 0
    window.history.replaceState(null,null,ps)
}

//changing classes of both games list and card list
classlistdo = (el,value,v=0) => {v==0 ? el = el.replace(` ${value}`,'') : !el.split(' ').includes(value) ? el += ` ${value}` : 0;return el}
classlistParams = (b,v=0) => {cards_container.classList.value = classlistdo(cards_container.classList.value,b,v)}
gamelistParams = (g_l,v=0) => {l = document.getElementById("search_results").classList;l.value = classlistdo(l.value,g_l,v)}

//checkboxes and user settings
checkboxIsActive = (id) => checkboxV(id)[1] 
checkboxesUpdate = () => {for(let i=0;i<CFVariables['checkbox_active'].length;i++){CFVariables['checkbox_func'][i][CFVariables['checkbox_active'][i]]()}}

newCheckBox = (name='test',func = function(){console.log("Testing button...active")},func2 = function(){console.log("Testing button...deactive")},args=0) => {
    !document.getElementById("checkboxesRows") ? document.getElementById("narrow_category1").insertAdjacentHTML('beforeend','<div id="checkboxesRows"></div>') : 0

    e = document.querySelector("#additional_search_options > div:nth-child(2) > div.block_content.block_content_inner > div.tab_filter_control_row").outerHTML //get reference (mb rewrite it later)
    checkboxes = document.getElementById("checkboxesRows")
    checkboxes_text = document.getElementsByClassName("tab_filter_control_label")
    checkboxes.insertAdjacentHTML("beforeend",e)
    let id = checkboxes.children.length-1
    checkboxes_text[id].innerText = name
    checkboxes.children[id].classList.value = 'tab_filter_control_row'
    checkboxes.children[id].children[0].classList.value = 'tab_filter_control tab_filter_control_include'
    CFVariables['checkbox_func'].push([func,func2])
    CFVariables['checkbox_active'].push(0)
    checkboxes.children[id].onclick = function(){clickAble(id,func,func2,args)}
}
function clickAble(id,func,func2,args){
    checkboxes = document.getElementById("checkboxesRows").children[id]
    cl = 'tab_filter_control tab_filter_control_include'
    active = 0
    if(checkboxes.children[0].classList.value.split(' ').includes("checked")){
        checkboxes.children[0].classList.value = cl
        checkboxes.classList.value = "tab_filter_control_row"
        func(args)
    }
    else{
        checkboxes.children[0].classList.value = cl + " checked";
        checkboxes.classList.value = "tab_filter_control_row checked"
        active = 1
        func2(args)
    }
    CFVariables['checkbox_active'][id]=active
    //console.log(id-2,active)
}


// function cardRowUpdateInfo(index=0){
//     //todo: loop over all games avalible
//     //add to every element every class on the right
//     //save index
//     //also remove this shit from GameWithBadReviews bcz its no needed anymore
//     //proud
//     //end.
// }

//functions for custom checkboxes/buttons:
hideBadReviews = () => {
    classlistParams("hide_mixed",true);
    classlistParams("hide_negative",true);
    gamelistParams("hide_mixed",true);
    gamelistParams("hide_negative",true);
    URLParams(0,v=1)
}

showBadReviews = () => {
    classlistParams("hide_mixed",false);
    classlistParams("hide_negative",false);
    gamelistParams("hide_mixed",false);
    gamelistParams("hide_negative",false);
    URLParams(0,v=0)
}

hideInCart = () => {
    classlistParams("hide_incart",true);
    gamelistParams("hide_incart",true);
    URLParams(1,v=1)
}

showInCart = () => {
    classlistParams("hide_incart",false);
    gamelistParams("hide_incart",false);
    URLParams(1,v=0)
}

//adding blocks
function addCardBlock(count=1){
    for(i=0;i<count;i++){cards_row.insertAdjacentElement("beforeend",card_block.cloneNode(true))}
}

//update info for both card colomn and games colomn
function analize(){
    g = document.getElementById("search_resultsRows").children;
    review_a = document.getElementsByClassName("col search_reviewscore responsive_secondrow")
    st = hide ? "border: none; margin: 0; height: 0;" : "";

    for(let i=CFVariables['custom_filter_index'];i<cards_row.children.length;i++){
        block = cards_row.children[i].classList
        review = review_a[i].children[0]
        review ? review = review.classList.value.split(' ') : review = [' ']
        games_options_orig = g[i].classList
        games_options = games_options_orig.value.split(' ')

        if(review.includes("negative")){
            block.value = classlistdo(block.value,"cards_negative",true)
            games_options_orig.value = classlistdo(games_options_orig.value,"negative_r",true)
        }
        if(review.includes("mixed")){
            block.value = classlistdo(block.value,"cards_mixed",true)
            games_options_orig.value = classlistdo(games_options_orig.value,"mixed_r",true)
        }
        games_options.includes("ds_owned") ? block.value = classlistdo(block.value,"cards_owned",true) : 0
        games_options.includes("ds_wishlist") ? block.value = classlistdo(block.value,"cards_wishlist",true) : 0
        games_options.includes("ds_incart") ? block.value = classlistdo(block.value,"cards_incart",true) : 0
        games_options.includes("ds_ignored") ? block.value = classlistdo(block.value,"cards_ignored",true) : 0
    }
    CFVariables['custom_filter_index'] = cards_row.children.length
}

//custom search button
function searchUnBoughtGames(){
    const filters = {
        "hide_owned":"ds_owned",
        "hide_ignored":"ds_ignored",
        "hide_wishlist":"ds_wishlist",
        "hide_mixed":"mixed_r",
        "hide_negative": "negative_r"
    };
    const
    balance = getBalance(),
    g_p = document.getElementsByClassName("col search_price discounted responsive_secondrow"),
    g = document.getElementById("search_resultsRows").children,
    review_a = document.getElementsByClassName("col search_reviewscore responsive_secondrow")
    applied_classes = document.getElementById("search_results").classList.value.split(' ')

    let c=0;
    temp_id_list = []
    for (let i=0;i<g.length;i++){
        game_classes = g[i].classList.value.split(' ')
        p = to_num(g_p[i].innerText.split('\n')[1].split(' ')[1])
        review = review_a[i].children[0]
        review = review ? review.classList.value.split(' ') : [' ']
        v = 1
        if(c+p<=balance && !(game_classes.includes("ds_incart") || game_classes.includes("ds_owned"))){
            for(let j=1;j<applied_classes.length;j++){//applied classes = сверху хуйня
                //game_classes классы игры определенной
                if(game_classes.includes(filters[applied_classes[j]])){
                    v = 0
                    break;
                }
            }
            if(v==1){
                temp_id_list.push(g[i].getAttribute("data-ds-appid"))
                c+=p
            }
        }
    }
    TsaveData("SCFGameList",temp_id_list)
    //openGamePage("https://store.steampowered.com/app/"+temp_id_list[temp_id_list.length-1])
}
/*
function createDebugPanel(visible = true){
    bl = document.createElement("a")
    visible ? bl.style = "transition: height 0.25s ease 0s, margin 0.25s ease 0s;height: auto;border: 1px solid rgba(139, 185, 224, 0);position: relative;background: rgba(0, 0, 0, 0.2);margin-bottom: 5px;display: block;padding: 10px;text-align: center;" : 0
    bl.className = "CFDebug"
    document.getElementsByClassName("leftcol large")[0].insertAdjacentElement("afterbegin",bl)
    document.getElementById("CardRows").insertAdjacentElement("afterbegin",bl.cloneNode(true))
    document.getElementsByClassName("CFDebug")[0].innerText = "checkbox_active:"
    document.getElementsByClassName("CFDebug")[1].innerText = "[]"
}*/

//other FUNctions
function Gaben(){
    x = document.createElement("a")
    x.classList = "tab  "
    x.id = "Gabe"
    x.innerHTML = "<span>Gaben</span>"
    list = document.getElementsByClassName("store_nav")[0]
    list.insertBefore(x,list.childNodes[21])
}
function GabeIMG(){
    let b_t = 0
    balance = getBalance_id()
    cur_bal = balance.innerText.split(' ')
    balance_up = setInterval(() => {balance.innerText = [cur_bal[0],to_num(cur_bal[1])+b_t].join(' ');b_t++;b_t > 10000 ? b_t = 0 : 0},1000)
    console.log("Button active")
    let audio = new Audio(chrome.runtime.getURL('gaben.mp3'));
    audio.volume = 0.4;
    audio.play()
    document.getElementById('Gabe').remove()
    let assets = ["https://steamuserimages-a.akamaihd.net/ugc/936079302350348337/8ADD95DF80A0D6669A9BD46781A148F94C654B81/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true",
    "https://www.models-resource.com/resources/big_icons/16/15918.png",
    "https://cdn.discordapp.com/attachments/580394781474160641/942894964432584784/glados.png"]
    let x = document.createElement("img")
    x.style = "position: absolute;left: 0px;top: 0px;z-index: 50;height: 120px;width: auto;"
    //y.style = "position: absolute;left: 100px;top: -110px;z-index: 50;height: 120px;width: auto;"
    x.src = assets[0]
    document.body.append(x)
    x.animate([
        // keyframes
         { transform: 'translateX(-100px)' },
         { transform: 'translateX(0px)' },
         { transform: 'translateX(100%)' },
         { transform: 'translateX(0px)' }
        ], {
         // timing options
         duration: 5300,
        });
    el = ["store_nav_bg","carousel_container maincap","carousel_container spotlight","home_page_gutter",["home_page_content",5,6,7,8,9,11,13,14,15,16,18,19,20,23,24],"store_capsule_frame","home_ctn ","store_capsule_frame"]
    h_el = document.getElementsByTagName("h2")
    for(let i=0;i<el.length;i++){
        let t = typeof(el[i])=='string' ? document.getElementsByClassName(el[i])[0] : 0
        if (!t){
            temp = el[i][0]
            for(let j=1;j<el[i].length;j++){
                // animateRotateGG(document.getElementsByClassName(el[i][0])[el[i][j]],j);
                animateShakeGG(document.getElementsByClassName(el[i][0])[el[i][j]]);
            }
        }
        else{
            // animateRotateGG(t);
            animateShakeGG(t)
        }
    }
}
animateRotateGG = (el,num=0,dur=2000) => {
    d = num % 2 ? -1 : 1
    deg = ((el.offsetHeight*10)/862)
    el.animate([{transform: 'rotate(0deg)'},{transform: `rotate(${-deg*d}deg)`}],{duration:dur,easing: "ease-in-out"})
    setTimeout(() => {d = num % 2 ? -1 : 1;deg = ((el.offsetHeight*10)/862);el.animate([{transform: `rotate(${deg*d}deg)`},{transform: `rotate(${-deg*d}deg)`},],{duration:dur,iterations: Infinity,direction: "alternate-reverse",easing: "ease-in-out"})},dur)
}
animateShakeGG = (el,num=0,dur=580) => {
    deg = ((el.offsetHeight*10)/840)
    el.animate([{transform: 'translateY(0px)'},{transform: `translateY(${-deg}px)`}],{duration:2000,easing: "ease-in"})
    setTimeout(() => {deg = ((el.offsetHeight*10)/862);el.animate([{transform: `translateY(${-deg}px)`},{transform: `translateY(${deg}px)`},{transform: `translateY(${deg}px)`},{transform: `translateY(${-deg}px)`}],{duration:dur,iterations: Infinity,easing: "ease"})},dur+1000)

}