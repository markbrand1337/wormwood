//set date default today

$(document).ready(function() {
 document.getElementById('adate').valueAsDate = new Date();


});

$('#submit2').click(function(){
event.preventDefault();
 //get property type
 var propertytype = document.getElementById("propertytype").value;
 //bedroom
var bedroom = document.getElementById("bedroom").value;

//get date from adate picker

  var date = new Date($('#adate').val());
  
  d = date.getDate();
  m = date.getMonth() + 1;
  y = date.getFullYear();
 
  var adate =[d, m, y].join('/');
  
// get furniture
var ftype = document.getElementById("furniturestype");
var furniturestype =ftype.options[ftype.selectedIndex].value;
// get price
var rprice = document.getElementById("rprice").value;
//notes
var notes = document.getElementById("notes").value;
//rname
var reportername = document.getElementById("reportername").value;

//alert
alert(propertytype+", "+bedroom+", "+adate+", "+ furniturestype+", "+ rprice+", "+notes+", "+ reportername+".");

create(propertytype, bedroom,adate,furniturestype,rprice,notes,reportername);

});

// $('#submit2notinused').click(function(){
// event.preventDefault();
//  //get property type
//  var propertytype = document.getElementById("propertytype").value;
//  //bedroom
// var bedroom = document.getElementById("bedroom").value;

// //get date from adate picker

//   var date = new Date($('#adate').val());
  
//   d = date.getDate();
//   m = date.getMonth() + 1;
//   y = date.getFullYear();
 
//   var adate =[d, m, y].join('/');
  
// // get furniture
// var ftype = document.getElementById("furniturestype");
// var furniturestype =ftype.options[ftype.selectedIndex].value;
// // get price
// var rprice = document.getElementById("rprice").value;
// //notes
// var notes = document.getElementById("notes").value;
// //rname
// var reportername = document.getElementById("reportername").value;

// //alert
// alert(propertytype+", "+bedroom+", "+adate+", "+ furniturestype+", "+ rprice+", "+notes+", "+ reportername+".");

// create(propertytype, bedroom,adate,furniturestype,rprice,notes,reportername);

// });



function create(propertytype, bedroom,adate,furniturestype,rprice,notes,reportername){
  var db = openDatabase('mydb', '1.0', 'RentalZ DB', 2 * 1024 * 1024);
  db.transaction(function (tx) {
    var sql ="insert into property(propertytype,bedroom,date,furnituretype,price,notes,reportername) values(?,?,?,?,?,?,?)";
    tx.executeSql(sql,[propertytype, bedroom,adate,furniturestype,rprice,notes,reportername]);
  });
}
function update(id,propertytype, bedroom,adate,furniturestype,rprice,notes,reportername){
  var db = openDatabase('mydb', '1.0', 'RentalZ DB', 2 * 1024 * 1024);
  db.transaction(function (tx) {
    
    var sql ="update property set propertytype = ?, bedroom = ?, date = ?, furnituretype = ?, price = ?, notes = ?, reportername = ? where id =  ? ";
    tx.executeSql(sql,[propertytype, bedroom,adate,furniturestype,rprice,notes,reportername,id]);
  });
}

