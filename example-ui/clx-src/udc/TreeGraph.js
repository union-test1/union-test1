/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShellLoad( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shell = e.control;
	
	whenStyleComputed(e.content, function(){
		render(e.content);
	});
}

function render(parent) {
	var comptued = window.getComputedStyle(parent);
	var width = parseInt(comptued.width);
	var height = parseInt(comptued.height);

	var data = getTreeData()[0];
	var root = d3.hierarchy(data);
	var tree = d3.tree()
		.size([height, width]);

	tree(root);

	var svg = d3.select(parent).append("svg");
	svg.style("position", "absolute");
	svg.attr("width", width);
	svg.attr("height", height);
	svg.attr("class", "tree-graph");

	var margin = {
		top: 0,
		right: 150,
		bottom: 0,
		left: 150
	};

	var xScale = d3.scaleLinear().domain([0, width]).range([margin.left, width - margin.right]);
	var yScale = d3.scaleLinear().domain([0, height]).range([margin.top, height - margin.bottom]);
	
	var g = svg.append("g");
	var link = g.selectAll(".link")
		.data(root.descendants().slice(1))
		.enter()
		.append("path")
		.attr("class", "link")
		.attr("d", function(d) {
			return "M" + xScale(d.y) + "," + yScale(d.x) +
				"C" + xScale(d.parent.y + 100) + "," + yScale(d.x) +
				" " + xScale(d.parent.y + 100) + "," + yScale(d.parent.x) +
				" " + xScale(d.parent.y) + "," + yScale(d.parent.x);
		});

	var node = g.selectAll(".node")
		.data(root.descendants())
		.enter()
		.append("g")
		.attr("class", "node")
		.attr("transform", function(d) {
			return "translate(" + xScale(d.y) + "," + yScale(d.x) + ")";
		})

	node.append("circle")
		.attr("r", 8)
		.attr("fill", "#999");

	node.append("text")
		.attr("dy", 3)
		.attr("x", function(d) {
			return d.children ? -12 : 12;
		})
		.style("text-anchor", function(d) {
			return d.children ? "end" : "start";
		})
		.attr("font-size", "100%")
		.text(function(d) {
			return d.data.name;
		});
}

function getTreeData() {
	/** @type cpr.data.DataSet */
	var ds = app.getAppProperty("dataSet") || app.lookup("dataSet");
	var labelColumn = app.getAppProperty("labelColumn");
	var valueColumn = app.getAppProperty("valueColumn");
	var parentColumn = app.getAppProperty("parentColumn");

	var data = ds.getRowDataRanged().map(function(each) {
		return {
			name: each[labelColumn],
			value: each[valueColumn],
			parent: each[parentColumn]
		};
	});

	var result = [];

	data.forEach(function( /* cpr.data.RowConfigInfo */ each) {
		var parentValue = each["parent"];
		if (!parentValue) {
			result.push(each);
		} else {
			var foundParent = data.some(function( /* cpr.data.RowConfigInfo */ it) {
				if (it["value"] == parentValue) {
					it.children = it.children || [];
					it.children.push(each);
					return true;
				}
				return false;
			});
			if (!foundParent) {
				result.push(each);
			}
		}
	});

	return result;
}

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	app.lookup("shell").redraw();
}
