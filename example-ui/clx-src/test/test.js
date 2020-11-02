/************************************************
 * test.js
 * Created at 2019. 5. 29. 오후 1:43:15.
 *
 * @author joymrk
 ************************************************/




/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	var arr = new Array("11","11","23");
	var blob = new Blob(arr, { type: 'text/plain' });
 
    var objURL = URL.createObjectURL(blob);
              	
    // 이전에 생성된 메모리 해제
    if (window.__Xr_objURL_forCreatingFile__) {
        window.URL.revokeObjectURL(window.__Xr_objURL_forCreatingFile__);
    }
    window.__Xr_objURL_forCreatingFile__ = objURL;
 
    var a = document.createElement('a');
 
    a.download = "test.dat";
    a.href = objURL;
    a.click();
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	console.log("init Data"); 
	console.log(app.lookup("dm1").getValue("test")); // 처음 데이터
	
	app.lookup("dm1").setValue("test", "hellow world"); // 데이터 입력
	console.log(app.lookup("dm1").getValue("test")); 
	
	app.lookup("dm1").reset(); // 리셋 처리
	
	console.log("reset Data : " + app.lookup("dm1").getValue("test")); // 리셋 후 데이터
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	var test = 1;
	test = test << 4;
	console.log(test);
	
	var test2 = 17;
	if ((test2 & test) == 1) {
		console.log("맞음");
	}
	 
}
