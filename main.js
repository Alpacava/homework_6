
//update pillow picture according to cover color

//Get value of dropdown in jQuery from stackoverflow: https://stackoverflow.com/questions/8978328/get-the-value-of-a-dropdown-in-jquery
//picture sources: https://www.crateandbarrel.com/trevino-nickel-grey-20-pillow/f66692
//make pillow-cover carry multiple values: https://stackoverflow.com/questions/3245967/can-an-option-in-a-select-tag-carry-multiple-values
function changePicture() {
	var pic = $('#pillow-cover').find('option:selected').attr('data-pic');
	$("#pillow-img").attr("src", pic);
};


$(document).ready(function() {

	//upon opening the page, show how many items in local storage
	updateCartCount();


	//when click to add to cart, save choices and update shopping cart count
	$("#add-to-cart").click(function() {
	//save the choices customer makes and reflect in shopping cart
		saveChoicesLocally();
		updateCartCount();
	});


		//save quantity,cover,fill selected
		function saveChoicesLocally() {

			var nameToSave = $("#item-name").text();
			var quantityToSave = $("#item-quantity").val();
			var coverToSave = $("#pillow-cover").val();
			var fillToSave = $("#pillow-fill").val();
			var priceToSave = $("#unit-price").text();
			var pic = $('#pillow-cover').find('option:selected').attr('data-pic');
			var idToSave = uniqueId();

			//create unique id for items saved; reference: https://gist.github.com/gordonbrander/2230317	
			function uniqueId () {
				return '_' + Math.random().toString(36).substr(2, 9);
			};

			//create an object to save
			var itemToSave = 
				{itemPic: pic,
				itemName: nameToSave, 
				itemQty: quantityToSave, 
				itemCover: coverToSave, 
				itemFill:fillToSave,
				itemPrice: priceToSave,
				itemID:idToSave};

			//save objects in array	
			var allItems = getFromStorage();
			allItems.push(itemToSave);
			localStorage.setItem("selectedItem",JSON.stringify(allItems));

			console.log(JSON.stringify(allItems));
		};	

		//code to streamline parsing strings (got from Asit's tutor session)
		function getFromStorage() {
			var storage = localStorage.getItem("selectedItem");
			if(storage) {
				return JSON.parse(storage);
			}
			else {
				return [];	
			}
		};

		//update how many items are in the cart
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
