usernameArray = ["zefquaavius", "ahm2dsadiq", "rosborn", "lijahrobinson", "ligitelem", "lightninlad", "lightning_warrior", "lightningx",
"lightningsnoop", "lhandroval", "lfialkowski", "legionsforward", "legionowianin", "kverliesaltijd", "kverhenn", "jpskulason", "egaga", "egagoofy", "charder", "binarymelon"];

usernameCollabo = ["zefquaavius", "ahm2dsadiq", "rosborn", "ghost10k", "maya10k", "ahm2d10k", "DeadlySin10k"]

let nameofuser = "";
const username = document.getElementById("UserName");
const message = document.getElementById("message");
new URLSearchParams(window.location.search).forEach((value, name) => {
     username.append(`Your Username : ${value}`);
     nameofuser = `${value}`;  
})
 

loadData(nameofuser);


async function loadData(name) {
    fetch ('https://boardgamegeek.com/xmlapi2/user?name='+name)
    .then (function (response) {
     return response.text();
    })
    .then (function (data) {
    let parser = new DOMParser (),
        xmlDoc = parser.parseFromString (data, 'text/xml');
        // ##########################################################-USER DONT HAS AN ACCOUNT-###############################################################################
        if (xmlDoc.getElementsByTagName("user")[0].id == "") {
            document.getElementById("message").innerHTML = "Sorry we could not find your profile, please go back to the Homepage check your username and try again";
        } 
        // ##########################################################-USER HAS AN ACCOUNT-###############################################################################
        else {
        // display User Informations
        document.getElementById("informationID").className = "container p-3 my-3 bg-dark text-white";
        document.getElementById("info").innerHTML = "Your information: ";
        document.getElementById("fNamelName").innerHTML = "Name : "+ xmlDoc.getElementsByTagName("user")[0].children[0].attributes.value.textContent +" "+ xmlDoc.getElementsByTagName("user")[0].children[1].attributes.value.textContent;
        document.getElementById("userid").innerHTML = "ID : "+ xmlDoc.getElementsByTagName("user")[0].id;
        document.getElementById("lastLOG").innerHTML = "Last-Login : "+ xmlDoc.getElementsByTagName("user")[0].children[4].attributes.value.textContent;
        document.getElementById("yearR").innerHTML = "Yearregistered : "+ xmlDoc.getElementsByTagName("user")[0].children[3].attributes.value.textContent;
        document.getElementById("provinceCOUNTRY").innerHTML = "Location : "+ xmlDoc.getElementsByTagName("user")[0].children[5].attributes.value.textContent+", "+xmlDoc.getElementsByTagName("user")[0].children[6].attributes.value.textContent;  
        top10= [];
        picTop10 = [];
        top10Id = [];
        getTop10List(name);
    }
    }).catch (function (error) {
        console.log ("Fehler: please check the function loadData IN3 :) " + error);
       });
    }


async function getTop10List(name) {
    const respone_hot = await fetch(`/top/${name}`);
    const data = await respone_hot.json();
    let parser = new DOMParser (),
    xmlDoc = parser.parseFromString (data, 'text/xml');
    // new user
    if (xmlDoc.getElementsByTagName("item").length == 0) {
        document.getElementById("message").innerHTML = "You might be a new user because you dont have a list of your top10 games. We offer you the Hot50 games, please press on continue to get the list of the hot 50 games, HAVE FUN :) ";
        var hotitem = '<form action="/public/views/index3.html" method="GET" style="padding: 15px;" source="custom" name="form">'+
        '<a href="/public/views/index3.html" class="u-border-none u-btn u-btn-submit u-button-style u-custom-font u-palette-1-base u-btn-10">Continue</a>'+
      '</form>';
        
        document.querySelector('#formHOT').innerHTML = hotitem;

    }else {

        let users = []
        for (let i = 0; i < usernameCollabo.length; i++) {
            if(usernameCollabo[i] != name) {
                users.push(usernameCollabo[i])
            }
        }

        let target_user_games = [];
        let target_user= [];
        console.log(name)
        for (let i = 0; i < xmlDoc.getElementsByTagName("item").length; i++) {
            target_user.push([xmlDoc.getElementsByTagName('item')[i].attributes.name.textContent, xmlDoc.getElementsByTagName('item')[i].attributes.rank.textContent])
            target_user_games.push(xmlDoc.getElementsByTagName('item')[i].attributes.name.textContent)
            console.log(target_user[i])
        }

        hotId = [];
        var domain = xmlDoc.getElementsByTagName('top')[0].attributes.domain.textContent;
        let idLength = xmlDoc.getElementsByTagName('item').length;
        let countINFO = 0;
        let id = 0;
        while (countINFO < idLength) {
            get_Top10Pic(xmlDoc.getElementsByTagName('item')[countINFO].attributes.id.textContent);
            top10Id.push(xmlDoc.getElementsByTagName('item')[countINFO].attributes.id.textContent);
            countINFO++;
        }

        fetch('https://boardgamegeek.com/xmlapi2/user?name='+name+'&hot=1').then (function (response) {
            return response.text();
        }).then (function (data) {
            let parser = new DOMParser (),
            xmlDoc2 = parser.parseFromString (data, 'text/xml');
            //console.log (xmlDoc2.getElementsByTagName('item'));
            let gameslength = xmlDoc.getElementsByTagName('item').length;
            let idLength2 = xmlDoc2.getElementsByTagName('item').length;
            let countINFO2 = 0;
            //get the id of the hot games from profile
            while (countINFO2 < idLength2) {
                hotId.push(xmlDoc.getElementsByTagName('item')[countINFO2].attributes.id.textContent);
                countINFO2++;
            }

            // ##########################################################-USER HAS TOP10 GMAES LIST AND HOT GAMES LIST-###############################################################################
            if (xmlDoc2.getElementsByTagName('hot')[0] != null) {
                document.getElementById("message").innerHTML = "Your top10 games domain is "+domain+", hier is your top10 and Hot games list: ";
                gamearray = ['<td class="u-align-left u-first-column u-palette-2-base u-table-cell">Rank</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-1-base u-table-cell u-table-cell-2">Picture</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-4-base u-table-cell u-table-cell-2">TopGame</td><td class="u-align-left u-first-column u-palette-2-base u-table-cell">Rank</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-4-base u-table-cell u-table-cell-2">HotGame</td>'];
                let gameslength2 = xmlDoc2.getElementsByTagName('item').length;
                let counter = 0;
                top10= [];
                let def = gameslength - gameslength2;
                if (def != 0) {
                    while (counter < gameslength) {
                            if (counter < gameslength2) {
                                    top10.push([xmlDoc.getElementsByTagName('item')[counter].attributes.rank.textContent,picTop10[counter], xmlDoc.getElementsByTagName('item')[counter].attributes.name.textContent, xmlDoc2.getElementsByTagName('item')[counter].attributes.rank.textContent, xmlDoc2.getElementsByTagName('item')[counter].attributes.name.textContent]);
                                } else {
                                    top10.push([xmlDoc.getElementsByTagName('item')[counter].attributes.rank.textContent,picTop10[counter], xmlDoc.getElementsByTagName('item')[counter].attributes.name.textContent, "       ", "         "]);
                                }
                                counter++;
                            }
                } else {
                    while (counter < gameslength2) {
                        top10.push([xmlDoc.getElementsByTagName('item')[counter].attributes.rank.textContent,picTop10[counter], xmlDoc.getElementsByTagName('item')[counter].attributes.name.textContent, xmlDoc2.getElementsByTagName('item')[counter].attributes.rank.textContent, xmlDoc2.getElementsByTagName('item')[counter].attributes.name.textContent]);
                        counter++;
                        }
                }
                let count = 0;
                while (count < top10.length) { //onclick="location.href='yourpage.html'"
                        // '<td onclick="location.href=\'https://boardgamegeek.com/boardgame/'+top10Id[count]+'\'" style="cursor:pointer" target="_blank" rel="noopener noreferrer">'
                    gamearray.push('<td>'+top10[count][0]+'</td><td>'+'<img src='+top10[count][1]+' style="width:250px;height:180px;"></img>'+'</td>'+'<td onclick="location.href=\'https://boardgamegeek.com/boardgame/'+top10Id[count]+'\'" style="cursor:pointer" target="_blank" rel="noopener noreferrer">'+top10[count][2]+'</td>'+'<td>'+top10[count][3]+'</td>'+'<td onclick="location.href=\'https://boardgamegeek.com/boardgame/'+hotId[count]+'\'" style="cursor:pointer" target="_blank" rel="noopener noreferrer">'+top10[count][4]+'</td>');
                    count++;        
                }
                var html = '<table class="u-table-entity"><colgroup><col width="5.2%"><col width="35.5%"><col width="26.6%"><col width="5.2%"><col width="46.6%"><tbody class="u-align-center u-palette-5-dark-3 u-table-body u-table-body-1"></colgroup><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">' +
                gamearray.join('</tr><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">') + '</tr></table>';
                document.querySelector('#mytablemustcomehere').innerHTML = html;
                document.getElementById("message_loading").innerHTML = "It might take some time, please wait until we find the best recommendation for you :)"
            }
            // ##########################################################-USER HAS ONLY ONE TOP10 GMAES LIST-###############################################################################
            else{
                document.getElementById("message").innerHTML = "Your top10 games domain is "+domain+", hier is your top10 games list: ";

                gamearray = ['<td class="u-align-left u-first-column u-palette-2-base u-table-cell">Rank</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-1-base u-table-cell u-table-cell-2">Picture</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-4-base u-table-cell u-table-cell-2">TopGame</td>'];
                let counter = 0;
                top10= [];
                while (counter < gameslength) {
                    top10.push([xmlDoc.getElementsByTagName('item')[counter].attributes.rank.textContent,picTop10[counter], xmlDoc.getElementsByTagName('item')[counter].attributes.name.textContent]);
                    counter++;
                }
                let count = 0;
                while (count < top10.length) {
                    gamearray.push('<td>'+top10[count][0]+'</td><td>'+'<img src='+top10[count][1]+' style="width:250px;height:200px;"></img>'+'</td>'+'<td onclick="location.href=\'https://boardgamegeek.com/boardgame/'+top10Id[count]+'\'" style="cursor:pointer" target="_blank" rel="noopener noreferrer">'+top10[count][2]+'</td>');
                    count++;
                }
                var html = '<table class="u-table-entity"><colgroup><col width="5.2%"><col width="25.5%"><col width="25.5%"><tbody class="u-align-center u-palette-5-dark-3 u-table-body u-table-body-1"></colgroup><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">' +
                gamearray.join('</tr><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">') + '</tr></table>';
                document.querySelector('#mytablemustcomehere').innerHTML = html;
                document.getElementById("message_loading").innerHTML = "It might take some time, please wait until we find the best recommendation for you :)"

            }
            displayHotGames();
            collaborativ_filltering(users, target_user_games, target_user, name);
                        
        }).catch (function (error) {
            console.log ("Fehler: please check the function getTop10List :) " + error);
        });
    }
}

async function collaborativ_filltering(users, target_user_games, target_user, name) {
     
    let similar_users = [];
    let similar_users_process = [];
    let to_recommend_process = [];
    let to_recommend = [];
    let to_recommend_games = [];
    for (let i = 0; i < users.length; i++) {
        let name_2 = users[i];
        console.log(name_2)
        //console.log(name_2)
        const respone_top10 = await fetch(`/top/${name_2}`);
        const data_top10 = await respone_top10.json();
        //console.log(data_top10)
        let parser_top10 = new DOMParser (),
            xmlDoc_top10 = parser_top10.parseFromString (data_top10, 'text/xml');
        //console.log(xmlDoc_top10.getElementsByTagName("item"))
        //console.log(xmlDoc_top10.getElementsByTagName("item").length)

        let count = 0;
        let count2 = 0;
        for (let j = 1; j <  xmlDoc_top10.getElementsByTagName("item").length ; j++) {
            //console.log(xmlDoc_top10.getElementsByTagName('item')[j].attributes.name.textContent)

            if (target_user_games.includes(xmlDoc_top10.getElementsByTagName('item')[j].attributes.name.textContent)) {
                count++;
                similar_users_process.push(xmlDoc_top10.getElementsByTagName('item')[j].attributes.name.textContent, xmlDoc_top10.getElementsByTagName('item')[j].attributes.rank.textContent)
                //console.log(name_2)
                //console.log(xmlDoc_top10.getElementsByTagName('item')[i].attributes.name.textContent)
            } else {
                count2++;
                to_recommend_process.push(xmlDoc_top10.getElementsByTagName('item')[j].attributes.name.textContent, xmlDoc_top10.getElementsByTagName('item')[j].attributes.rank.textContent, xmlDoc_top10.getElementsByTagName('item')[j].attributes.id.textContent)
             
            }
            //console.log(count)
            //console.log(xmlDoc_top10.getElementsByTagName('item')[i].attributes.name.textContent)
            //console.log(xmlDoc_top10.getElementsByTagName('item')[i].attributes.rank.textContent)
           
        }

        if ((count2 > 0) && (count > 0)) {
            console.log("NO MAYA")
            to_recommend.push([name_2, to_recommend_process]);
            for ( let n = 0; n <to_recommend_process.length; n++) {
                if (isGame(to_recommend_process[n])){
                    to_recommend_games.push(to_recommend_process[n])
                }
            }
        }

        if(count > 0) {
            similar_users.push([name_2, count, similar_users_process])
            similar_users_process = [];
        }
        to_recommend_process = [];
    }
    
    for ( let i = 0; i < similar_users.length; i++){
        console.log("hhhhhhhhhhmmmmmmmmmmmmmm")
        console.log(similar_users[i])
    }
    
    let similarity_arr = [];
   

    // SIMILARITY CALCULATION
    for ( let i = 0; i < similar_users.length; i++) {
        console.log("user "+ similar_users[i][0])
        let similarity_z = 0;
        let similarity_n_user_similar = 0;
        let similarity_n_user_target = 0;
        let sim = 0;

        let arr = similar_users[i][2];
        for (let j = 0; j < arr.length; j++) {
            for ( let u = 0; u < target_user.length; u++) {
                if ( arr[j] == target_user [u][0]) {
                    similarity_z +=  arr[j+1] * target_user [u][1];
                    similarity_n_user_similar += (arr[j+1]*arr[j+1]);
                    similarity_n_user_target +=  (target_user [u][1] * target_user [u][1]);
                    //console.log(arr[j])
                    //console.log(arr[j+1])
                    //console.log(target_user [u][0])
                    //console.log(target_user [u][1])
                }
            }
            //console.log("calculation")
            //console.log(similarity_z)
            //console.log(similarity_n_user_similar)
            //console.log(similarity_n_user_target)
        }
        sim = similarity_z / (Math.sqrt(similarity_n_user_target) * Math.sqrt(similarity_n_user_similar));
        similarity_arr.push([similar_users[i][0], sim]);
    }
    for (let i = 0; i < similarity_arr.length; i++) {
        console.log(similarity_arr[i])
    }

    let estimatet_rating = [];
    let estimatet_rating_secondary = [];
    let estimatet_rating_value = 0;
    let check = [];
    for ( let i = 0; i < to_recommend_games.length; i++) {
        if (!check.includes(to_recommend_games[i])) {
            let arr = [];
            for (let j = 0; j < to_recommend.length; j++) {
                let arr2 = to_recommend[j][1];
                //console.log(arr2)
                for( let n = 0; n < arr2.length; n++) {
                    //console.log(arr2[n])
                    //console.log(isGame(arr2[n]))
                    //console.log(to_recommend_games[i])
                    if (isGame(arr2[n])) {
                        if (!estimatet_rating.includes(arr2[n])) {
                            if (to_recommend_games[i] == arr2[n]) {
                                check.push(to_recommend_games[i])
                                console.log(arr2[n])
                                console.log(isGame(arr2[n]))
                                arr.push([to_recommend[j][0], arr2[n], arr2[n+1]])
                            }
                        }
                       
                    }
                }                
            }
            if (arr.length > 1) {
                estimatet_rating.push(arr);
            } else {
                estimatet_rating_secondary.push(arr);
            }
        }
       
    }

    // in case there is only one similar user
    if (estimatet_rating.length == 0) {
        estimatet_rating = estimatet_rating_secondary;
    }
    

    let recommendation_arr = [];
    let rating_arr = [];

    for ( let m = 0; m < estimatet_rating.length; m++) {
        let estimatet_rating_value_n =0;
        let estimatet_rating_value_z =0;
        let game_name;
        console.log(estimatet_rating[m])
        let arr = estimatet_rating[m];
        for ( let n = 0; n < arr.length; n++) {
            console.log(arr[n])
            game_name = arr[n][1];
           for ( let b = 0; b < similarity_arr.length; b++) {
               if (arr[n][0] == similarity_arr[b][0]) {
                    estimatet_rating_value_z += similarity_arr[b][1] * arr[n][2];
                    estimatet_rating_value_n += similarity_arr[b][1];
               }
           }
        }
        estimatet_rating_value = estimatet_rating_value_z / estimatet_rating_value_n;
        recommendation_arr.push([game_name, estimatet_rating_value]);
        rating_arr.push(estimatet_rating_value)
    }

    for (let i = 0; i < recommendation_arr.length; i++) {
        console.log(recommendation_arr[i])
    }
    let name_of_recommendation;
    let rank;
    let id_of_recommendation;
    if (rating_arr.length > 0) {
        rating_arr.sort(function(a, b){return a-b});
        rank = rating_arr[0];
        console.log("tttttttttttttttttttttttttttttttt")
        console.log(rank)            
        for( let y = 0; y < recommendation_arr.length; y++) {
            if (recommendation_arr[y][1] == rank) {
                name_of_recommendation = recommendation_arr[y][0];
            }
        }
        console.log(name_of_recommendation);
        
        for (let h = 0; h < to_recommend.length; h++) {
            let arr = to_recommend[h][1];
            for ( let i = 0; i <arr.length; i++) {
                if (arr[i] == name_of_recommendation) {
                    id_of_recommendation = arr[i+2]
                }
            }
        }
        console.log(id_of_recommendation)
        displayRecommendation(id_of_recommendation, name, name_of_recommendation, rank);
    } else {
        //TODO
    }
}

async function displayRecommendation(id, username, gamename, rank) {
    console.log(rank)
    rank = rank | 0;
    const respone = await fetch(`/ExpansionsAndImplementation/${id}`);
    const data = await respone.json();
    let parser = new DOMParser (),
    xmlDoc = parser.parseFromString (data, 'text/xml');
    let pic = xmlDoc.getElementsByTagName('image')[0].innerHTML;
        document.getElementById("message_loading").innerHTML = "thank you for waiting :)"
        document.getElementById("loading").className ="#"
        document.getElementById("recommededgameMessage").innerHTML = "Hey "+ username+ " we recommend the following game for you, and it should takes the following rank for you, HAVE FUN: ";
        tablerec = ['<td class="u-align-left u-first-column u-palette-2-base u-table-cell">Rank</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-3-base u-table-cell u-table-cell-2">Picture</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-4-base u-table-cell u-table-cell-2">Recommended</td>'];
    //<img src="C:\Pics\H.gif" alt="" border=3 height=100 width=100></img>
        tablerec.push('<td>'+rank+'</td>'+'<td>'+'<img src='+pic+' style="width:350px;height:300px;"></img>'+'</td>'+'<td onclick="location.href=\'https://boardgamegeek.com/boardgame/'+id+'\'" style="cursor:pointer" target="_blank" rel="noopener noreferrer">'+gamename+'</td>');
        var html = '<table class="u-table-entity"><colgroup><col width="5.2%"><col width="35.5%"><col width="26.6%"><tbody class="u-align-center u-palette-5-dark-3 u-table-body u-table-body-1"></colgroup><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">' +
        tablerec.join('</tr><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">') + '</tr></table>';
        document.querySelector('#recommededgame').innerHTML = html;

}
       
function mix_games(arr) {
    arr.sort(() => Math.random() - 0.5);
}

function isGame(string_obj) {
    let match_str = false;
    if (string_obj.match(/[a-z]/i)) {
        match_str = true;
    }
  return  match_str  
}



async function get_Top10Pic(id) {

    fetch('https://boardgamegeek.com/xmlapi2/thing?id='+id).then (function (response) {
        return response.text();
        })
        .then (function (data) {

            let parser = new DOMParser (),
            xmlDoc = parser.parseFromString (data, 'text/xml');
            picTop10.push(xmlDoc.getElementsByTagName('image')[0].innerHTML)

        }).catch (function (error) {
            console.log ("Fehler: please check the function get_Top10Pic :) " + error);
           });
}


async function displayHotGames() {
    //hotgames
    const respone = await fetch(`/hotgames`);
    const data = await respone.json();
    let parser = new DOMParser (),
    xmlDoc = parser.parseFromString (data, 'text/xml');
    hotgamearray = [];
    let gameslength = xmlDoc.getElementsByTagName('item').length;
    let counter = 0;
    hotgames= [];
    while (counter < gameslength) {
        hotgames.push([xmlDoc.getElementsByTagName('item')[counter].attributes.rank.textContent, xmlDoc.getElementsByTagName('item')[counter].attributes.id.textContent, xmlDoc.getElementsByTagName('thumbnail')[counter].attributes.value.textContent]);
        counter++;
    }
    let count = 0;
    while (count < gameslength) {
        hotgamearray.push('<div onclick="location.href=\'https://boardgamegeek.com/boardgame/'+hotgames[count][1]+'\'" style="cursor:pointer" target="_blank" rel="noopener noreferrer">'+'<img src='+hotgames[count][2]+' style="width:350px;height:300px;"></img>' +'</div>');
        count++; 
    }
    document.getElementById("loading").className ="loading_Recommendation"
    document.getElementById("enjoyHotGames").innerHTML ="See our list of the Hot-50 board games";
    document.getElementById("Hot").className ="hotgamesList"    
    document.querySelector('#Hot').innerHTML = hotgamearray;
}

