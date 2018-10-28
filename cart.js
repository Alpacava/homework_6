$(document).ready(function() {

	initialize();

	function initialize() {
		//if nothing has been added or everything has been deleted
		//OR operator reference:https://stackoverflow.com/questions/40221998/using-or-operator-in-a-jquery-if-statement
		if ((localStorage.getItem("selectedItem") == null )|| (localStorage.getItem("selectedItem") == '[]')) {
			console.log ('cart empty!');
			$('#cart-table').hide();
			$('#empty-cart').text('Your cart is empty!');
			$('#empty-cart').css('padding-top','50px');
			$('#checkout').hide();
		}

		else {}
	};

	//get each item in local storage, create a table row for each
		var cartStorage = getFromStorage();
		var subTotal = 0;

		for (let i = 0; i < cartStorage.length; i++) {
			var item = cartStorage[i];
			var unitPrice = parseFloat(item.itemPrice);
			var totalPrice = unitPrice * item.itemQty;


		//reference for adding elements to a table row: https://stackoverflow.com/questions/171027/add-table-row-in-jquery	
			$("#cart-table").find('tbody')
			.append($('<tr>').addClass('rowStart'))
			.append($('<img>').attr('src', item.itemPic).addClass("displaypic"))
			.append($("<td>" + item.itemName +"</td>"))
			.append($("<td>" + "Cover: " + item.itemCover + "<br>" + "Fill: " + item.itemFill +"</td>"))
			.append($("<td>" + item.itemQty +"</td>"))
			.append($("<td>$" + item.itemPrice +"</td>"))
			.append($("<td>$" + totalPrice + "</td>").addClass("totalPrice"))
			.append($("<td>Delete Item</td>").attr('id',item.itemID).addClass('removeButton'))
			.append($("</tr>"));

		calculateTotal();

		//calculate subtotal
			function calculateTotal() {
				subTotal += totalPrice;
				$("#subtotal").html("$"+subTotal);
				console.log(subTotal);
			}
		};	
	

	//delete item from local storage
	$(".removeButton").click(function() {
		alert('Item Deleted!')

		var buttonid = $(this).attr('id');

		//match button with item
		for(let i = 0; i < cartStorage.length; i++) {
			if (cartStorage[i].itemID == buttonid) {
				cartStorage.splice(i,1);
				//remove the delete button
				$(this).hide();
				//remove the whole row
				$(this).prev().remove();
				$(this).prev().remove();
				$(this).prev().remove();
				$(this).prev().remove();
				$(this).prev().remove();
				$(this).prev().remove();

				console.log(cartStorage);
				//update local storage
				localStorage.setItem('selectedItem',JSON.stringify(cartStorage));

				//after deleting something, update cart count and page display
				updateCartCount();
				//refresh to shwo updated cart
				location.reload();
			}
		}
	});

	//print the subtotal in the last row
	

	//get localstorage
	function getFromStorage() {
		var storage = localStorage.getItem("selectedItem");
		if(storage) {
			return JSON.parse(storage);
		}	
		else {
			return [];	
		}
	};

	function updateCartCount() {
		cartItems = getFromStorage()
		//if localstorage is empty, show 0 items in cart
		if (cartItems == null) {
			$("#item-number").text("0");
		}

		//when there is something in localstorage, sum up the quantity of each object and show
		else {
			cartStorage = getFromStorage();
			var totalCount = 0;

			for (let i = 0; i < cartStorage.length; i++) {
					
				var item = cartStorage[i];
				itemCount = parseInt(item.itemQty);
				totalCount = totalCount + itemCount; 

			$("#item-number").text(totalCount);
			console.log(totalCount);}
			}
	};

});

