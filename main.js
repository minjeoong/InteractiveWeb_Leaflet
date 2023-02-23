(() => {
	const leaflet = document.querySelector('.leaflet');
	const pageElems = document.querySelectorAll('.page');
	let pageCount = 0;
	


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
		}
	});

})();