/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShellLoad(/* cpr.events.CUIEvent */ e){
	/**
	 * @type cpr.controls.UIControlShell
	 */
	var shell = e.control;
	var shellDiv = e.content;
	if(!shellDiv){
		return;
	}
	
	var shape = 
		"<table id=\"example-basic\">"
			+"<thead>"
				+"<tr>"
					+"<th>Tree column</th>"
					+"<th>Additional data</th>"
				+"</tr>"
			+"</thead>"
			
			+"<tbody>"
				+"<tr data-tt-id=\"1\" data-tt-branch=\'true\'>"
			      +"<td><span  class='folder'>1: column 1</td>"
			      +"<td>1: column 2</td>"
			    +"</tr>"
			    
			    +"<tr data-tt-id=\"1.1\" data-tt-branch='true' data-tt-parent-id=\"1\">"
			      +"<td><span  class='folder'>1.1: column 1</td>"
			      +"<td>1.1: column 2</td>"
			    +"</tr>"
			    
			    +"<tr data-tt-id=\"1.1.1\" data-tt-parent-id=\"1.1\">"
			      +"<td><span  class='file'>1.1.1: file column 1</td>"
			      +"<td>1.1.1: column 2</td>"
			    +"</tr>"
			    
			    +"<tr data-tt-id=\"1.1.2\" data-tt-parent-id=\"1.1\">"
			      +"<td><span  class='file'>1.1.2: file column 1</td>"
			      +"<td>1.1.2: column 2</td>"
			    +"</tr>"

			    +"<tr data-tt-id=\"1.2\" data-tt-parent-id=\"1\">"
			      +"<td><span  class='folder'>1.2: column 1</td>"
			      +"<td>1.2: column 2</td>"
			    +"</tr>"
						
			    +"<tr data-tt-id=\"1.3\" data-tt-parent-id=\"1\">"
			      +"<td><span  class='folder'>1.3: column 1</td>"
			      +"<td>1.3: column 2</td>"
			    +"</tr>"
			    
			    +"<tr data-tt-id=\"2\" data-tt-branch=\'true\'>"
					+"<td><span  class='folder'>2: column 1</td>"
					+"<td>2: column 2</td>"
				+"</tr>"
				
				 +"<tr data-tt-id=\"2.1\" data-tt-parent-id=\"2\">"
			      +"<td><span  class='folder'>2.1: column 1</td>"
			      +"<td>2.1: column 2</td>"
			    +"</tr>"
			    
			    +"<tr data-tt-id=\"2.2\" data-tt-parent-id=\"2\">"
			      +"<td><span  class='folder'>2.2: column 1</td>"
			      +"<td>2.2: column 2</td>"
			    +"</tr>"
			    
			    +"<tr data-tt-id=\"2.3\" data-tt-parent-id=\"2\">"
			      +"<td><span  class='folder'>2.3: column 1</td>"
			      +"<td>2.3: column 2</td>"
			    +"</tr>"
			    
			    +"<tr data-tt-id=\"3\" data-tt-branch=\'true\'>"
					+"<td><span  class='folder'>3: column 1</td>"
					+"<td>3: column 2</td>"
				+"</tr>"
				
				+"<tr data-tt-id=\"3.1\" data-tt-parent-id=\"3\">"
					+"<td><span  class='folder'>3.1: column 1</td>"
					+"<td>3.1: column 2</td>"
				+"</tr>"
			
				+"<tr data-tt-id=\"3.2\" data-tt-parent-id=\"3\">"
					+"<td><span  class='folder'>3.2: column 1</td>"
					+"<td>3.2: column 2</td>"
				+"</tr>"
		
				+"<tr data-tt-id=\"3.3\" data-tt-parent-id=\"3\">"
					+"<td><span  class='folder'>3.3: column 1</td>"
					+"<td>3.3: column 2</td>"
				+"</tr>"
				
			+"</tbody>"
			
		+"</table>"
  
	shellDiv.innerHTML = shape;
	
	// Tree expand, collapse image
	$("#example-basic").treetable({ expandable: true });
	
//	$("#example-basic").treetable("reveal", '1');
//	$("#example-basic").treetable("reveal", '1.1');
//	$("#example-basic").treetable("expandAll");
	
	// Highlight selected row
	$("#example-basic tbody").on("mousedown", "tr", function() {
		$(".selected").not(this).removeClass("selected");
		$(this).toggleClass("selected");
	});
	
}



/*
 * "펼치기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	$("#example-basic").treetable("expandAll");
}

/*
 * "접기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	$("#example-basic").treetable("collapseAll");
}
