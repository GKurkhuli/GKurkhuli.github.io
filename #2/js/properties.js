$(document).ready(function(){

    /*---Toggle Buttons---*/
    $('header input').click(function () {
        $('.js-transfer').hide("slow");
        $('.js-TransferButton').show("slow");
    });
    
    $('.js-TransferButton').click(function() {
        document.querySelector("#searchbox_main").value = "";
        for(var i = 0; i < agents; i++)
        {
            document.querySelector("#row_" + i).style.display = "block";
        }
        /*in case if there was something in searchBar it will be cleared*/
        $('.js-TransferButton').hide("slow");
        $('.js-transfer').show("slow");
    });

    /*---Insert Agents in Table---*/

    /*create array and input from array images, names, positions into table*/

function agentTable(){
    var fName,lName,status;
    fName = ["Aaren","Alisun","Bobbee","Carolin","Nika","Giga","Giorgi","Mariam","Tazo","Eka"];
    lName = ["Kurkhuli","Gochitashvili","Chaduneli","Gotsorodze","Gabunia","Kartlelishvili","Julakidze","Hill","Hamilton","Wagner"];

    var departments = [
        'Customer service',
        'Sales',
        'HR department'
    ];
    var tbody = document.querySelector('tbody');
    for(let i = 0; i < agents; i++)
    {
        status = Math.round(Math.random())?"offline":"online";//resultes 0/1 => if(0)offline;else online;
        var tr = 
            '<td><img class="avatar" src="https://picsum.photos/200?' + Math.floor(Math.random()*200)+'"></td>'+//insert icon
            '<td class="name">'+fName[Math.floor(Math.random()*fName.length)]+' '+lName[Math.floor(Math.random()*lName.length)]+'</td>'+//get random name
            '<td class="status"></td>'+
            '<td class="department">'+ departments[Math.floor(Math.random()*departments.length)] +'</td>';               

        var tdButton = '<button class="transferB" id = "row_' + i + '_B">Transfer</button>';
                        //each button has an id so it will be easier for back developer to connect users (it can be changed easy)
        if(status === "offline"){


            tr +=  '<td id = "row_'+i+'_"> <div class="serving-not">Not serving</div>' + tdButton + '</td>';   
            tbody.innerHTML += "<tr id='row_"+ i + "'>" + tr + "</tr>";
        }else{
            tr+=  '<td id = "row_'+i+'_"> <div class="serving-not" >Serving '+ Math.floor(Math.random()*10) +'</div>' + tdButton + '</td>';  
            tbody.innerHTML += "<tr class='online' id='row_"+ i + "'>" + tr + "</tr>";
        }
    }

}

////////////////////////////////////////////////////
    /*---Random Agent Status---*/
function randomStatus()
{
    var tr,service,transferB;
    var tdButton = '<button class="transferB">Transfer</button>';
    for(var i = 0; i < agents;  i++)
    {
        tr = document.querySelector('#row_'+i);
        service = document.querySelector('#row_'+i+'_ .serving-not'); //get to specific row,column
    //    transferB = document.querySelector('#row_'+i+' .transferB')

        if(Math.round(Math.random())){//if 1
            tr.setAttribute("class","online");
            service.innerText = 'Serving '+ Math.floor(Math.random()*10);
        }
        else{//if 0
            tr.removeAttribute("class","online");
            service.innerHTML = 'Not serving</div>';
            /*
            transferB.style.display = "none";
            service.style.display = "block";
            */
           $('#row_'+i+'_B').hide("fast");
           $('#row_'+i+'_ div').show("fast");
        }

    }
    CheckStatus(); ///////////////////////REMOVE AFTER UNDERSTANDING WHAT TO DO
}    
    
///////////////////////////////////////////////
    /*---SEARCH AGENTS---*/

searchBox = document.querySelector('#searchbox_main');

searchBox.oninput = function(){
    var value = searchBox.value.toLowerCase();
    for(i = 0; i < agents; i++)
    {
        var row = document.querySelector('#row_' + i);
        var name = document.querySelector('#row_' + i + ' .name');
        if(name.innerText.toLowerCase().includes(value))
           // row.style.display = 'block';
            $('#row_' + i).show("fast");
        else
           // row.style.display = 'none';
            $('#row_' + i).hide("fast");
    }
}


//////////////////////////////////////////////
    /*---Online/Offline/All---*/
$('#checkAttend').click(function(){     //change button colors according to requirements
    if(button.style.backgroundColor === 'rgb(255, 255, 255)')       button.style.backgroundColor = "rgb(46, 202, 23)";
    else if(button.style.backgroundColor === "rgb(46, 202, 23)")    button.style.backgroundColor = "rgb(186, 196, 222)";
    else                                                            button.style.backgroundColor = "rgb(255, 255, 255)";
 
    CheckStatus();
});

/////////////////////////////////////////////////////////////////////////////////

/*---IMPORTANT!!!  --  FIND OUT HOW TO CONTROL tr class changed---*/

///////////////////////////////////////////////////////////////////////////////

function CheckStatus()//hide and show table rows according to requirements
{
    if(button.style.backgroundColor === 'rgb(255, 255, 255)')//show all
    {
        for(var i = 0; i < agents; i++)
        {
            $('#row_' + i).show("fast");
        }
    }
    else if(button.style.backgroundColor === "rgb(46, 202, 23)")//show online only
    {
        for(var i = 0; i < agents; i++)
        {
            if(document.querySelector('#row_' + i).classList.contains("online"))
                $('#row_' + i).show(300);
            else
                $('#row_' + i).hide(300);
        }
    }
    else//show offline only
    {
        for(var i = 0; i < agents; i++)
        {
            if(document.querySelector('#row_' + i).classList.contains("online"))
                $('#row_' + i).hide(300);
            else
                $('#row_' + i).show(300);
        }
    }
}
/*All #ffffff rgb(255, 255, 255)Offline #bac4de rgb(186, 196, 222)Online #2eca17 rgb(46, 202, 23)*/
///////////////////////////////////////////
/*--- Main function and Code---*/

var statusUpdateTime = 30;//update user status every 30 sec;
var agents = Math.floor(Math.random()*16)+5; //agent number varies from 5 to 20
var elemntID,searchBox;

var button = document.querySelector("#checkAttend");
button.style.backgroundColor = 'rgb(255, 255, 255)';


agentTable();
setInterval(randomStatus,statusUpdateTime*1000);

/*---Toggle Text/Button---*/
$('tr').hover(
    function(){
        elemntID ="#" + this.id + "_";//tr id is row_i when last td id is row_i_
        if(document.querySelector("#"+this.id).classList.contains("online")){
           // document.querySelector(elemntID +" .transferB").style.display = "block";
            //document.querySelector(elemntID +" .serving-not").style.display="none";
            $(elemntID +" .transferB").show("fast");
            $(elemntID +" .serving-not").hide("fast");

        }
    },
    function(){
        if(document.querySelector("#"+this.id).classList.contains("online")){
           // document.querySelector(elemntID +" .transferB").style.display="none";
            //document.querySelector(elemntID +" .serving-not").style.display="block";
            $(elemntID +" .transferB").hide("fast");
            $(elemntID +" .serving-not").show("fast");
        }
    }
);

                                /*---PROBLEM---*/
    /*With .hide() and .show(), instead of style.display = "none"/"block",
        when hovering directly under button, staying on border toggles
        between cursor in/out effects automatically
    */
});