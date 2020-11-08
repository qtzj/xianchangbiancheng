function showDiv(divName1, divName2) {
    var divName1 = document.getElementById(divName1);
    var divName2 = document.getElementById(divName2);
    divName1.style.display = 'block';
    divName2.style.display = 'none';
    console.log("showIDV");
}

function exitDiv(divName) {
    console.log("exitDIV");
    var divName = document.getElementById(divName);
    divName.style.display = 'none';
}

//添加选项
function addVote() {
    var i = document.getElementById('voteCount').value;
    var addVote = document.getElementById('addVote');
    var newDiv = document.getElementById('newDiv');
    var div;
    if (i < 1) {
        i = 1;
        document.getElementById('voteCount').value = 1;
    }
    if (newDiv) {
        newDiv.remove();
        div = document.createElement('div');
        div.id = 'newDiv';
    } else {
        div = document.createElement('div');
        div.id = 'newDiv';
    }
    var addHtml = '<table>';
    for (var j = 1; j <= i; j++) {
        addHtml = addHtml + ' <tr><td>  第' + j + '个选项</td><td>：<input type="text" name="' + j + '" size="20"/></td></tr>';
    }
    addHtml = addHtml + '</table>';
    div.innerHTML = addHtml;
    addVote.appendChild(div);
}