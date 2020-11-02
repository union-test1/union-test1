
/*
 * 그리드에서 rowgroup-click 이벤트 발생 시 호출.
 * Grid의 RowGroup 클릭시 발생하는 이벤트.
 */
function onGrd1RowgroupClick(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	// 현재 rowgroup이 펼쳐져 있는지 유무를 반환합니다. (Grid 속성인 collapsible이 true일 때만 그룹을 collapse/expand 할 수 있습니다.)
	if(e.rowgroup.expanded){
		e.rowgroup.expanded = false;
	}else{
		e.rowgroup.expanded = true;
	}
	// 다음 기본 동작을 방지합니다. 
	// rowgroup-click 이벤트에서 한번 expand가 되고 기본이벤트로 collapse가 되어 expand가 안 되는 것처럼 보이는 현상을 막기 위해서 사용합니다.
	e.preventDefault();
}
