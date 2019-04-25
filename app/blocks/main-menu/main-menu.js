(function (){
	let dropdownToggle;
	let container = document.querySelector('.main-menu');
	let itemsHasChildren = container.querySelectorAll('.menu-item-has-children > a:first-of-type, .page-item-has-children > a:first-of-type');
	console.log(itemsHasChildren);
	for (let i = 0; i < itemsHasChildren.length; i++) {
		dropdownToggle = document.createElement('button');
		dropdownToggle.classList.add('dropdown-toggle');
		itemsHasChildren[i].parentNode.insertBefore(dropdownToggle, itemsHasChildren[i].nextSibling);
	}
})();
