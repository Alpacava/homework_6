$(document).ready(function() {

	//testing
	if(localStorage.getItem("selectedItem") == null) {
			alert("Your cart is empty!");
	}

	else {
			alert("Item in your cart!");
	}

	var cartStorage = getFromStorage();

	//get each item in local storage
	for (let i = 0; i < cartStorage.length; i++) {
		var item = cartStorage[i];
		unitPrice = parseFloat(item.itemPrice);
		totalPrice = unitPrice * item.itemQty;
		var cartSubtotal = 0;
	
	//reference for adding elements to a table row: https://stackoverflow.com/questions/171027/add-table-row-in-jquery	
		$("#cart-table").find('tbody')
		.append($("<tr>"))
		.append($('<img>').attr('src', item.itemPic).addClass("displaypic"))
		.append($("<th>" + item.itemName +"</th>"))
		.append($("<th>" + "Cover: " + item.itemCover + "<br>" + "Fill: " + item.itemFill +"</th>"))
		.append($("<th>" + item.itemQty +"</th>"))
		.append($("<th>$" + item.itemPrice +"</th>"))
		.append($("<th>$" + totalPrice + "</th>"))
		.append($("</tr>"))

	};

	function getFromStorage() {
		var storage = localStorage.getItem("selectedItem");
		if(storage) {
			return JSON.parse(storage);
		}	
		else {
			return [];	
		}
	};
});

