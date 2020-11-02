
/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onUIControlShellInit(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var uIControlShell = e.control;
	
	// chart가 새로 그려지기 전에 기존에 echart 관련 객체가 있으면 삭제한다.
	var shellDiv = e.content;
	if(shellDiv){
		var instance = echarts.getInstanceByDom(shellDiv);
		if(instance){
			instance.dispose();
		}
	}
}

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onUIControlShellLoad(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var uIControlShell = e.control;
	
	// div에 echart를 입히는 코드
	var shellDiv = e.content;
	if(!shellDiv){
		return;
	}
	var myChart = echarts.init(shellDiv);
	var option = {
		title : {
			text : 'ECharts 연동 예제'
		},
		tooltip : {},
		legend : {
			data : [ 'Sales' , 'Marketing', "R&D"]
		},
		xAxis : {
			data : [ "shirt", "cardign", "chiffon shirt", "pants", "heels", "socks" ]
		},
		yAxis : {},
		series : [ {
			name : 'Sales',
			type : 'bar',
			data : [ 5, 20, 36, 10, 10, 20 ]
		},
		{
			name : 'Marketing',
			type : 'line',
			data : [ 15, 25, 20, 25, 24, 40 ]
		},
		{
			name : 'R&D',
			type : 'bar',
			data : [ 15, 20, 35, 33, 40, 35 ]
		}]
	};
	myChart.setOption(option);
}
