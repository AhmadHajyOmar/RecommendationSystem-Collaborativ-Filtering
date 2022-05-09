getRecommendationsType();

async function getRecommendationsType() {
    fetch ('https://boardgamegeek.com/xmlapi2/hot?type=boardgame')
    .then (function (response) {
     return response.text();
    })
    .then (function (data) {            
    let parser = new DOMParser (),
        xmlDoc = parser.parseFromString (data, 'text/xml');
        gamearray = ['<td class="u-align-left u-first-column u-palette-2-base u-table-cell">Rank</td><td class="u-align-left u-first-column u-palette-3-base u-table-cell">Picture</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-4-base u-table-cell u-table-cell-2">Game</td><td class="u-align-left u-first-column u-palette-2-base u-table-cell">Rank</td><td class="u-align-left u-first-column u-palette-3-base u-table-cell">Picture</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-4-base u-table-cell u-table-cell-2">Game</td><td class="u-align-left u-first-column u-palette-2-base u-table-cell">Rank</td><td class="u-align-left u-first-column u-palette-3-base u-table-cell">Picture</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-4-base u-table-cell u-table-cell-2">Game</td><td class="u-align-left u-first-column u-palette-2-base u-table-cell">Rank</td><td class="u-align-left u-first-column u-palette-3-base u-table-cell">Picture</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-4-base u-table-cell u-table-cell-2">Game</td><td class="u-align-left u-first-column u-palette-2-base u-table-cell">Rank</td><td class="u-align-left u-first-column u-palette-3-base u-table-cell">Picture</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-4-base u-table-cell u-table-cell-2">Game</td>'];
        let gameslength = xmlDoc.getElementsByTagName('item').length;
        let counter = 0;
        hotgames= [];
        while (counter < gameslength) {
            hotgames.push([xmlDoc.getElementsByTagName('item')[counter].attributes.rank.textContent, xmlDoc.getElementsByTagName('item')[counter].childNodes[3].attributes.value.textContent, xmlDoc.getElementsByTagName('thumbnail')[counter].attributes.value.textContent, xmlDoc.getElementsByTagName('item')[counter].attributes.id.textContent]);
            counter++;
        }
        let count = 0;
        while (count < (hotgames.length/5)) {
            gamearray.push('<td>'+hotgames[count][0]+'</td><td>'+'<img src='+hotgames[count][2]+' style="width:100px;height:75px;"></img>'+'</td><td onclick="location.href=\'https://boardgamegeek.com/boardgame/'+hotgames[count][3]+'\'" style="cursor:pointer" target="_blank" rel="noopener noreferrer">'+hotgames[count][1]+'</td>'+'<td>'+hotgames[count+10][0]+'</td><td>'+'<img src='+hotgames[count+10][2]+' style="width:100px;height:75px;"></img>'+'</td><td onclick="location.href=\'https://boardgamegeek.com/boardgame/'+hotgames[count+10][3]+'\'" style="cursor:pointer" target="_blank" rel="noopener noreferrer">'+hotgames[count+10][1]+'</td>'+'<td>'+hotgames[count+20][0]+'</td><td>'+'<img src='+hotgames[count+20][2]+' style="width:100px;height:75px;"></img>'+'</td><td onclick="location.href=\'https://boardgamegeek.com/boardgame/'+hotgames[count+20][3]+'\'" style="cursor:pointer" target="_blank" rel="noopener noreferrer">'+hotgames[count+20][1]+'</td>'+
            '<td>'+hotgames[count+30][0]+'</td><td>'+'<img src='+hotgames[count+30][2]+' style="width:100px;height:75px;"></img>'+'</td><td onclick="location.href=\'https://boardgamegeek.com/boardgame/'+hotgames[count+30][3]+'\'" style="cursor:pointer" target="_blank" rel="noopener noreferrer">'+hotgames[count+30][1]+'</td>'+'<td>'+hotgames[count+40][0]+'</td><td>'+'<img src='+hotgames[count+40][2]+' style="width:100px;height:75px;"></img>'+'</td><td onclick="location.href=\'https://boardgamegeek.com/boardgame/'+hotgames[count+40][3]+'\'" style="cursor:pointer" target="_blank" rel="noopener noreferrer">'+hotgames[count+40][1]+'</td>');
            count++;
        }
        var html = '<table class="u-table-entity"><colgroup><col width="2.2%"><col width="5.5%"><col width="10.6%"><col width="5.2%"><col width="12.5%"><col width="22.6%"><col width="5.2%"><col width="12.5%"><col width="22.6%"><col width="5.2%"><col width="12.5%"><col width="22.6%"><col width="5.2%"><col width="12.5%"><col width="22.6%"><tbody class="u-align-center u-palette-5-dark-3 u-table-body u-table-body-1"></colgroup><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">' +
        gamearray.join('</tr><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">') + '</tr></table>';
        document.querySelector('#mytablemustcomehere').innerHTML = html;

    }).catch (function (error) {
        console.log ("Fehler: please check the code 1 :) " + error);
       });
    }
