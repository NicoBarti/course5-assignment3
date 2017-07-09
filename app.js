(function () {

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItems);


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

	var narrow = this;
	narrow.input = "";

	narrow.search = function() {

		searchTerm = narrow.input.toLowerCase()
		if(searchTerm == ""){narrow.empty = true; narrow.found = []}
			else {
				narrow.empty = false;
				var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

				promise.then(function (searchResult) {

					if(searchResult == 0) {narrow.empty = true}
						else {narrow.found = searchResult}
					})
					.catch(function (error) 
						{ console.log("Sorry, there´s been an error with the server");
					})
				}
	};


	narrow.remove = function(index) {
		narrow.found.splice([index], 1)
	};


	narrow.noItems = function(){
		if(narrow.found == "empty"){
			return true}
			else {return false}
		
	};

};


MenuSearchService.$inject = ['$http']
function MenuSearchService ($http) {

	var service = this;

	service.getMatchedMenuItems = function(searchTerm) {

	 	var response = $http({
	 		method: "GET",
	 		url: ("https://davids-restaurant.herokuapp.com/menu_items.json")	
	 		})

	 		.then(function ( response ) {
	 			searchResult = [];
	 			for(i = 0; i < response.data.menu_items.length; i++){
	 				if (response.data.menu_items[i].description.toLowerCase().indexOf(searchTerm) === -1 ){ 
	 					}
	 					else { 
	 						searchResult.push(response.data.menu_items[i])	
	 					}
	 				};
	 			return searchResult
	 	    });

	return response;

	};

};

function foundItems(){

items = [""]
	var ddo = {
		restrict: 'E',
		templateUrl : "listMenuItems.html",
		scope: {
			items : "<foundItems",
			onRemove : "&"
		},

		controller: NarrowItDownDirectiveController,
		controllerAs: "list",
		bindToController: true

	};

return ddo

};

NarrowItDownDirectiveController.$inject = [];
function NarrowItDownDirectiveController() {

	var list = this;

};


})();
