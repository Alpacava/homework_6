$(document).ready(function() {
	if(localStorage.getItem("selectedItem") == null) {
			alert("Your cart is empty!");
	}

	else {
			alert("Item in your cart!");
	}
	
});