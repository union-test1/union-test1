/**
 * 그리드 팝 아웃 모듈.
 * @param {cpr.controls.Grid} grid
 */
function PopOutGrid(grid) {
	/**
	 * 그리드 컨트롤.
	 */
	this._grid = grid;
	
	/**
	 * 그리드가 속한 앱 인스턴스.
	 */
	this._app = grid.getAppInstance();

	/** 
	 * 그리드의 원래 부모.
	 * @type cpr.controls.Container 
	 */
	this._originalParent = null;

	/** 
	 * 그리드가 팝아웃 되었을 때 부모역할을 할 래퍼.
	 * @type cpr.controls.Container 
	 */
	this._wrapper = null;

	/**
	 * 원래 부모에 속해 있었을 때의 레이아웃 컨스트레인트.
	 */
	this._originalConstraint = null;
	
	/**
	 * 그리드가 팝 아웃 되어있는지 여부.
	 */
	this._poppedOut = false;
}

/**
 * 팝아웃된 그리드를 원상 복귀 합니다.
 */
PopOutGrid.prototype.close = function() {
	if (this._poppedOut === false) {
		return;
	}
	this._poppedOut = false;
	
	// 래퍼로 부터 그리드 제거.
	this._wrapper.removeChild(this._grid);
	
	// 원래 부모에 그리드를 다시 추가.
	this._originalParent.addChild(this._grid, this._originalConstraint);
	
	// 플롯된 래퍼를 제거.
	this._wrapper.getParent().removeChild(this._wrapper);
	this._wrapper = null;
	
	// 그리드에 애니메이션 추가.
	this._grid.style.animateFrom({
		"transform" : "translateZ(100px)",
		"opacity" : "0"
	});
}

/**
 * 그리드를 팝아웃 시킵니다.
 */
PopOutGrid.prototype.popout = function() {
	if (this._poppedOut) {
		return;
	}
	this._poppedOut = true;
	
	// 팝 아웃 시키기전 필요한 상태들을 백업 함.
	this._app = this._grid.getAppInstance();	
	this._originalParent = this._grid.getParent();
	this._originalConstraint = this._originalParent.getConstraint(this._grid);

	// 원래 부모로 부터 그리드 제거.
	this._originalParent.removeChild(this._grid);

	// 플로팅 시킬 그룹
	this._wrapper = new cpr.controls.Container();
	this._wrapper.style.css({
		position: "fixed",
		top: "5px",
		right: "5px",
		bottom: "5px",
		left: "5px",
		background: "white" // 배경을 가려 줘야 함.
	});
	
	// 닫기 버튼 생성 및 추가.
	var closeButton = new cpr.controls.Button();
	closeButton.value = "닫기";
	closeButton.addEventListenerOnce("click", (function() {
		this.close();
	}).bind(this));

	this._wrapper.addChild(closeButton, {
		right: "20px",
		top: "20px",
		width: "100px",
		height: "25px"
	});

	// 플로팅 될 그룹에 그리드 추가.
	this._wrapper.addChild(this._grid, {
		top: "50px",
		right: "20px",
		bottom: "20px",
		left: "20px"
	});

	// 그룹을 플로팅 시킴.
	this._app.getRootAppInstance().floatControl(this._wrapper);

	// 플로팅 된 그룹에 애니메이션 재생.
	this._wrapper.style.animateFrom({
		"transform": "translateZ(-300px)"
	}, 0.3, cpr.animation.TimingFunction.EASE_OUT_BACK);
};

/** @type PopOutGrid */
cpr.controls.Grid.prototype._popkit = null;

cpr.controls.Grid.prototype.getPopOutKit = function() {
	if (this._popkit == null) {
		this._popkit = new PopOutGrid(this);
	}
	return this._popkit;
}