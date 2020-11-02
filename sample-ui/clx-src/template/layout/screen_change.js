/************************************************
 * screen_change.js
 * Created at 2018. 8. 13. 오후 3:05:08.
 * 
 * @author leeds
 ************************************************/



/*
 * Body에서 screen-change 이벤트 발생 시 호출.
 * 스크린 크기 변경 시 호출되는 이벤트.
 */
function onBodyScreenChange(/* cpr.events.CScreenChangeEvent */ e){
	var group = app.lookup("group");
	/** 
	 * @type cpr.controls.layouts.FormLayout
	 */
	var layout = group.getLayout();
	
	// 컨트롤들
	var opt_Lname   = app.lookup("opt_Lname");
	var Lname 	    = app.lookup("Lname");
	var opt_birth   = app.lookup("opt_birth");
	var birth       = app.lookup("birth");
	var opt_address = app.lookup("opt_address");
	var udc_address = app.lookup("udc_address");
	var opt_note    = app.lookup("opt_note");
	var note        = app.lookup("note");
	
	if(e.screen.name != "default"){
		layout.setRows(["40px","40px","40px","40px","40px","1fr"]);
		layout.setColumns(["100px", "1fr"]);
		
		// Last Name
		group.updateConstraint(opt_Lname, {
			"colIndex": 0,
			"rowIndex": 2
		});
		group.updateConstraint(Lname, {
			"colIndex": 1,
			"rowIndex": 2
		});
		
		// Birth
		group.updateConstraint(opt_birth, {
			"colIndex": 0,
			"rowIndex": 3
		});
		group.updateConstraint(birth, {
			"colIndex": 1,
			"rowIndex": 3
		});
		
		// Address
		group.updateConstraint(opt_address, {
			"colIndex": 0,
			"rowIndex": 4
		});
		group.updateConstraint(udc_address, {
			"colIndex": 1,
			"rowIndex": 4,
			"colSpan" : 1
		});
		
		// Note
		group.updateConstraint(opt_note, {
			"colIndex": 0,
			"rowIndex": 5
		});
		group.updateConstraint(note, {
			"colIndex": 1,
			"rowIndex": 5,
			"colSpan" : 1
		});
		
		// 음영 사용여부.
		layout.setUseColumnShade(0, true);
		
	}else{
		layout.setRows(["40px","40px","40px","1fr"]);
		layout.setColumns(["100px", "1fr","100px", "1fr"]);
		
		// Last Name
		group.updateConstraint(opt_Lname, {
			"colIndex": 2,
			"rowIndex": 0
		});
		group.updateConstraint(Lname, {
			"colIndex": 3,
			"rowIndex": 0
		});
		
		// Birth
		group.updateConstraint(opt_birth, {
			"colIndex": 2,
			"rowIndex": 1
		});
		group.updateConstraint(birth, {
			"colIndex": 3,
			"rowIndex": 1
		});
		
		// Address
		group.updateConstraint(opt_address, {
			"colIndex": 0,
			"rowIndex": 2
		});
		group.updateConstraint(udc_address, {
			"colIndex": 1,
			"rowIndex": 2,
			"colSpan" : 3
		});
		
		// Note
		group.updateConstraint(opt_note, {
			"colIndex": 0,
			"rowIndex": 3
		});
		group.updateConstraint(note, {
			"colIndex": 1,
			"rowIndex": 3,
			"colSpan" : 3
		});
		
		// 음영 사용여부.
		layout.setUseColumnShade(0, true);
		layout.setUseColumnShade(2, true);
	}
	
}
