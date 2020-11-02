/*
 * "클리어" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	// 서브미션 클리어합니다.
	app.lookup("main").clear();
	app.lookup("sub1").clear();
	app.lookup("sub2").clear();
	app.lookup("sub3").clear();
	
	// 그리드 컨트롤 redraw합니다.
	app.lookup("grd_main").redraw();
	app.lookup("grd_sub1").redraw();
	app.lookup("grd_sub2").redraw();
	app.lookup("grd_sub3").redraw();
}

/*
 * "조회" 버튼에서 click 이벤트 발생 시 호출. 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */e) {
	/**
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	/* Workflow 예제 */
	// AppInstance의 컨트롤에 접근할 수 있는 Workflow 객체 생성
	var workflow = app.createWorkflow(true);
	workflow.exec(function() {

	}).send("subMain") // Submission(subMain) Send
	.exec(function() {

		// Submission(subMain) 성공처리
		app.lookup("grd_main").redraw();

	}).send("subSub1", "subSub2") // Submission(subSub1, subSub2) Send
	.exec(function() {

		// Submission(subSub1, subSub2) 성공처리
		app.lookup("grd_sub1").redraw();
		app.lookup("grd_sub2").redraw();

	}).send("subSub3").exec(function() {

		app.lookup("grd_sub3").redraw();

	}).err(function(error) {

		// Error 처리
		console.error("catched error :: " + error);

	}).exec(function() {

		// console.log(JSON.stringify(workflow.getReport()));

	});

}
