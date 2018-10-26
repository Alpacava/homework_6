
//update pillow picture according to cover color

//Get value of dropdown in jQuery from stackoverflow: https://stackoverflow.com/questions/8978328/get-the-value-of-a-dropdown-in-jquery
//picture sources: https://www.crateandbarrel.com/trevino-nickel-grey-20-pillow/f66692
//make pillow-cover carry multiple values: https://stackoverflow.com/questions/3245967/can-an-option-in-a-select-tag-carry-multiple-values
function changePicture() {
	var pic = $('#pillow-cover').find('option:selected').attr('data-pic');
	$("#pillow-img").attr("src", pic);
};


$(document).ready(function() {

	showCartItem();

	//show how many items are stored locally upon open the page
	function showCartItem() {
		var itemCount = JSON.parse(localStorage.getItem("storedItem"));

		if (itemCount === null) {
			$("#item-number").text("0");
		}

		else {
			$("#item-number").text(itemCount);
		}
		localStorage.setItem("storedItem",JSON.stringify(itemCount));
	};

	$("#add-to-cart").click(function() {
	//save the choices customer makes and reflect in shopping cart
		saveChoicesLocally();
		updateCartItem();


		//save quantity,cover,fill selected
		function saveChoicesLocally() {

			var nameToSave = $("#item-name").text();
			var quantityToSave = $("#item-quantity").val();
			var coverToSave = $("#pillow-cover").val();
			var fillToSave = $("#pillow-fill").val();
			var priceToSave = $("#unit-price").text();
			var pic = $('#pillow-cover').find('option:selected').attr('data-pic');

			alert(quantityToSave + coverToSave + fillToSave);

			var itemToSave = 
				{itemPic: pic,
				itemName: nameToSave, 
				itemQty: quantityToSave, 
				itemCover: coverToSave, 
				itemFill:fillToSave,
				itemPrice: priceToSave};

			var allItems = getFromStorage();
			allItems.push(itemToSave);
			localStorage.setItem("selectedItem",JSON.stringify(allItems));

			console.log(JSON.stringify(allItems));

		};	

		//code to streamline parsing strings got from Asit's tutor session
		function getFromStorage() {
			var storage = localStorage.getItem("selectedItem");
			if(storage) {
				return JSON.parse(storage);
			}
			else {
				return [];	
			}
		};

		//save quantity,cover,fill selected
		function updateCartItem() {
			var itemCount = parseInt("item-quantity",0);
			itemCount = JSON.parse(localStorage.getItem("storedItem"));
			itemCount = itemCount + parseInt($('#item-quantity').val());

			if (itemCount === null) {
				$("#item-number").text("0");
			}

			else {
				$("#item-number").text(itemCount);
			}
			localStorage.setItem("storedItem",JSON.stringify(itemCount));
		};	
	});	
});	
