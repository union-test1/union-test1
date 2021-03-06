/*
 * App URI: example/plugin/treetable
 * Source Location: example/plugin/treetable.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("example/plugin/treetable", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
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
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds_treetable");
			dataSet_1.parseData({
				"columns": [
					{
						"name": "id",
						"displayOnly": true
					},
					{
						"name": "parent-id",
						"displayOnly": true
					},
					{"name": "Tree column"},
					{"name": "Additional data"},
					{
						"name": "branch",
						"dataType": "string",
						"displayOnly": true
					},
					{
						"name": "icon class",
						"displayOnly": true
					}
				],
				"rows": [
					{"id": "1", "parent-id": "", "Tree column": "1: column 1", "Additional data": "1: column 2", "branch": "true", "icon class": "folder"},
					{"id": "1.1", "parent-id": "1", "Tree column": "1.1: column1", "Additional data": "1.1: column 2", "branch": "true", "icon class": "folder"},
					{"id": "1.1.1", "parent-id": "1.1", "Tree column": "1.1.1: file column 1", "Additional data": "1.1.1: column 2", "branch": "", "icon class": "file"},
					{"id": "1.1.2", "parent-id": "1.1", "Tree column": "1.1.2: file column 2", "Additional data": "1.1.2: column 2", "branch": "", "icon class": "file"},
					{"id": "1.2", "parent-id": "1", "Tree column": "1.2: column 1", "Additional data": "1.2: column 2", "branch": "", "icon class": "folder"},
					{"id": "1.3", "parent-id": "1", "Tree column": "1.3: column 1", "Additional data": "1.3: column 2", "branch": "", "icon class": "folder"},
					{"id": "2", "parent-id": "", "Tree column": "2: column 1", "Additional data": "2: column", "branch": "true", "icon class": "folder"},
					{"id": "2.1", "parent-id": "2", "Tree column": "2.1: column 1", "Additional data": "2.1: column 2", "branch": "", "icon class": "folder"},
					{"id": "2.2", "parent-id": "2", "Tree column": "2.2: column 1", "Additional data": "2.2: column 2", "branch": "", "icon class": "folder"},
					{"id": "2.3", "parent-id": "2", "Tree column": "2.3: column 1", "Additional data": "2.3: column 2", "branch": "", "icon class": "folder"},
					{"id": "3", "parent-id": "", "Tree column": "3: column 1", "Additional data": "3: column 2", "branch": "true", "icon class": "folder"},
					{"id": "3.1", "parent-id": "3", "Tree column": "3.1: column 1", "Additional data": "3.1: column 2", "branch": "", "icon class": "folder"},
					{"id": "3.2", "parent-id": "3", "Tree column": "3.2: column 1", "Additional data": "3.2: column 2", "branch": "", "icon class": "folder"},
					{"id": "3.3", "parent-id": "3", "Tree column": "3.3: column 1", "Additional data": "3.3: column 2", "branch": "", "icon class": "folder"}
				]
			});
			app.register(dataSet_1);
			
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"top" : "0px",
				"height" : "100%",
				"left" : "0px"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var uIControlShell_1 = new cpr.controls.UIControlShell("shell");
			if(typeof onShellLoad == "function") {
				uIControlShell_1.addEventListener("load", onShellLoad);
			}
			container.addChild(uIControlShell_1, {
				"top": "80px",
				"right": "20px",
				"bottom": "20px",
				"left": "20px"
			});
			
			var button_1 = new cpr.controls.Button();
			button_1.value = "펼치기";
			if(typeof onButtonClick == "function") {
				button_1.addEventListener("click", onButtonClick);
			}
			container.addChild(button_1, {
				"top": "20px",
				"right": "130px",
				"width": "100px",
				"height": "30px"
			});
			
			var button_2 = new cpr.controls.Button();
			button_2.value = "접기";
			if(typeof onButtonClick2 == "function") {
				button_2.addEventListener("click", onButtonClick2);
			}
			container.addChild(button_2, {
				"top": "20px",
				"right": "20px",
				"width": "100px",
				"height": "30px"
			});
		}
	});
	app.title = "treetable";
	cpr.core.Platform.INSTANCE.register(app);
})();
