// var db = openDatabase('mydb', '1.0', 'RentalZ DB', 2 * 1024 * 1024);
// db.transaction(function (tx) {
// 	 tx.executeSql('SELECT * FROM property', [], function (tx, results) {
//   	var len = results.rows.length, i;
//   	var table = document.getElementById("table");
//     for (i = 0; i < len; i++) {		
// 		//insert new row at the bottom
// 		var row = table.insertRow(-1);
// 		var idCell = row.insertCell(0);
// 		var propertyCell = row.insertCell(1);
// 		var bedCell = row.insertCell(2);
// 		var dateCell = row.insertCell(3);
// 		var furnitureCell = row.insertCell(4);
// 		var priceCell = row.insertCell(5);
// 		var noteCell = row.insertCell(6);
// 		var reporterCell = row.insertCell(7);
		

// 	    idCell.innerHTML = results.rows.item(i).id;
// 	    propertyCell.innerHTML = results.rows.item(i).propertytype;
// 	    bedCell.innerHTML = results.rows.item(i).bedroom;
// 	    dateCell.innerHTML = results.rows.item(i).date;
// 	    furnitureCell.innerHTML = results.rows.item(i).furnituretype;
// 	    priceCell.innerHTML = results.rows.item(i).price;
// 	    noteCell.innerHTML = results.rows.item(i).notes;
// 	    reporterCell.innerHTML = results.rows.item(i).reportername;
	    
//  	}

//  });
// });
$(document).ready(function() {
	loadAll();
  $("#txtSearch").on("keyup",function(){
    var propSearch = $(this).val();
    var db = openDatabase('mydb', '1.0', 'RentalZ DB', 2 * 1024 * 1024);
    db.transaction(function(tx){
      tx.executeSql('SELECT * FROM property where propertytype like ?', 
        ['%' + propSearch +'%'],
           function (tx, results) {
            loadToTable(results);
          
          });
    });
  });
	
});
function loadToTable(results){
  var len = results.rows.length, i;
    var table = document.getElementById("table");

    $(function()
    {
      $('#table tr').not(':nth-child(1)').remove()
    });

    for (i = 0; i < len; i++) {
    //insert new row at the bottom
    var row = table.insertRow(-1);
	var idCell = row.insertCell(0);
	var propertyCell = row.insertCell(1);
	var bedCell = row.insertCell(2);
	var dateCell = row.insertCell(3);
	var furnitureCell = row.insertCell(4);
	var priceCell = row.insertCell(5);
	var noteCell = row.insertCell(6);
	var reporterCell = row.insertCell(7);
    var removeCell = row.insertCell(8);
    var actionCell = row.insertCell(9);
      
    idCell.innerHTML = results.rows.item(i).id;
	propertyCell.innerHTML = results.rows.item(i).propertytype;
	bedCell.innerHTML = results.rows.item(i).bedroom;
	dateCell.innerHTML = results.rows.item(i).date;
	furnitureCell.innerHTML = results.rows.item(i).furnituretype;
	priceCell.innerHTML = results.rows.item(i).price;
	noteCell.innerHTML = results.rows.item(i).notes;
	reporterCell.innerHTML = results.rows.item(i).reportername;
    removeCell.innerHTML = "<button onclick='deleteRow(this)' propertyId='" +  
                          results.rows.item(i).id + "'>Delete</button>";
   actionCell.innerHTML = "<a href='edit.html?propId="+results.rows.item(i).id+"' data-ajax='false' rel='external' propertyId='" +  
                          results.rows.item(i).id + "'>Delete</button>";                      
  }
}
function deleteRow(row){
  var id = row.getAttribute("propertyId");
 
  alert("Going to remove: " + id);
  var action = confirm("Do you want to delete this row?");
  if(action){
    deleteFromDB(id);
  loadAll();
  }
  else{
    alert("Deletetion fail.");
  }
 
  var action = confirm("Are you 100% sure?");
  if (action) {
    deleteFromDB(id);
    loadAll();
  }else {
    alert("Deletetion fail");
  }
 function actionPopUp(row){
 	var id = row.getAttribute("propertyId");

 }
 

}
function deleteFromDB(id){
  var db = openDatabase('mydb', '1.0', 'RentalZ DB', 2 * 1024 * 1024);
  db.transaction(function (tx) {
    var sql = "delete from property where id = ?";
    tx.executeSql(sql,[id]);
  });
}
function loadAll(){
  var db = openDatabase('mydb', '1.0', 'RentalZ DB', 2 * 1024 * 1024);
  db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM property', [], function (tx, results) {
     loadToTable(results);
    });
  });
}