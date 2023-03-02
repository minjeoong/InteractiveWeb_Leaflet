
(() => {
	
	const leaflet = document.querySelector('.leaflet');
	const pageElems = document.querySelectorAll('.page');
	let pageCount = 0;
	
	let currentMenu;

	function getTarget(elem, className) {
		
		// 타겟이 페이지 클래스를 갖고있지 않으면, 부모노드를 넣어주세요
		while (!elem.classList.contains(className)) {
			elem = elem.parentNode;
			// 노드 이름이 바디라면 페이지 엘림 값을 비워주고 함수를 종료
			if (elem.nodeName == 'BODY'){
				elem = null;
				return;
			}
		}
		return elem;
	}
	// 페이지를 닫는 함수
	function closeLeaflet() {
		pageCount = 0;
		document.body.classList.remove('leaflet-opend');
		pageElems[2].classList.remove('page-flipped')
		setTimeout(() => {
			pageElems[0].classList.remove('page-flipped');
		}, 500);
	}

	function zoomIn(elem) {
		const rect = elem.getBoundingClientRect();
		const dx = window.innerWidth/2 - (rect.x + rect.width/2);
		const dy = window.innerHeight/2 - (rect.y + rect.height/2);
		let angle;
		// *1 한 이유는 문자열을 숫자로 바꾸기위해
		switch(elem.parentNode.parentNode.parentNode.dataset.page*1) {
			case 1:
				angle = -30;
				break;
			case 2:
				angle = 0;
				break;
			case 3:
				angle = 30;
				break;
		}
		console.log(elem.parentNode.parentNode.parentNode.dataset.page)
		// 줌인을 브라우저 폭의 절반정도 : 50 vw
		document.body.classList.add('zoom-in');
		leaflet.style.transform = `translate3d(${dx}px, ${dy}px, 50vw) rotateY(${angle}deg)`;

		currentMenu = elem;
		currentMenu.classList.add('current-menu');
		

	}

	function zoomOut() {
		leaflet.style.transform = 'translate3d(0,0,0)';
		if (currentMenu) {
			document.body.classList.remove('zoom-in');
			currentMenu.classList.remove('current-menu');
			currentMenu = null;
		}
	}

	/* 클릭 했을 때 이벤트가 전달하도록 */
	leaflet.addEventListener('click', e => {
		let pageElem = getTarget(e.target, 'page');
		/* 페이지 엘림이 있으면 */
		if (pageElem) {
			pageElem.classList.add('page-flipped')
			pageCount++;
			// 페이지가 열릴 때마다 1씩 더해줌.

			if (pageCount == 2){ 
				// 페이지가 2번 열리면, leaflet-opened 클래스를 추가해줌으로써 그 페이지에 close 버튼이 생기도록 만들어줌. 
				document.body.classList.add('leaflet-opend');
			}
		}

		// 페이지 닫기
		let closeBtnElem = getTarget(e.target, 'close-btn');
		if (closeBtnElem) {
			closeLeaflet()
			zoomOut();
		}

		let menuItemElem = getTarget(e.target, 'menu-item');
		if (menuItemElem) {
			zoomIn(menuItemElem);

		}
		// 백버튼 눌렀을 때 나오기
		let backbtn = getTarget(e.target, 'back-btn');
		if (backbtn) {
			zoomOut()
		}
	});

})();