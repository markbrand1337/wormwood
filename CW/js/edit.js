//set date default today
//document.getElementById('adate').valueAsDate = new Date();
//$( ".adate" ).datepicker({ dateFormat: 'dd/mm/yyyy' });
$('#submit2').click(function(){
event.preventDefault();
var id = window.location.search;
id = id.replace("?propId=","");

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
alert(id);
update(propertytype, bedroom,adate,furniturestype,rprice,notes,reportername,id);

});


$(document).ready(function() {
 var id = window.location.search;
  id = id.replace("?propId=","");

  //alert(id);
  loadOne(id);


});

function loadToForm(results){
  $("#propertytype").val(results.rows.item(0).propertytype);
  $("#bedroom").val(results.rows.item(0).bedroom);
  // date picker
  
  var date = new Date(results.rows.item(0).date);
  
  d = date.getDate();
  m = date.getMonth() + 2;
  y = date.getFullYear();
 
  var aadate =[d, m, y].join('/');
  
  document.getElementById('adate').valueAsDate = new Date(aadate);

  //$("#adate").val(results.rows.item(0).date);
  //drop down
  $("#furniturestype").val(results.rows.item(0).furniturestype);

  $("#rprice").val(results.rows.item(0).price);
  $("#notes").val(results.rows.item(0).notes);
  $("#reportername").val(results.rows.item(0).reportername);
}

function loadOne(id){
  var db = openDatabase('mydb', '1.0', 'RentalZ DB', 2 * 1024 * 1024);
  db.transaction(function (tx) {

      var sql ="SELECT * FROM property where id = ?";
      tx.executeSql(sql, [id], function (tx, results) {
     loadToForm(results);
    });
  });
}





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

