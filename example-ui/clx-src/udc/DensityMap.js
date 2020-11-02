/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onUIControlShellLoad( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var uIControlShell = e.control;

	/** @type HTMLDivElement */
	var rootDiv = e.content;

	whenStyleComputed(rootDiv, function() {

		var margin = {
			top: 25,
			right: 25,
			bottom: 25,
			left: 30
		};

		var xColName = app.getAppProperty("xColumn");
		var yColName = app.getAppProperty("yColumn");

		var width = parseInt(window.getComputedStyle(rootDiv).width);
		var height = parseInt(window.getComputedStyle(rootDiv).height);

		var x = d3.scaleLinear()
			.rangeRound([margin.left, width - margin.right]);

		var y = d3.scaleLinear()
			.rangeRound([height - margin.bottom, margin.top]);

		var svg = d3.select(rootDiv).append("svg");
		svg.style("position", "absolute");
		svg.attr("width", width);
		svg.attr("height", height);

		var faithful = getDataSet().getRowDataRanged().map(function(d) {
			return {
				x: +d[xColName],
				y: +d[yColName],
			}
		});

		x.domain(d3.extent(faithful, function(d) {
			return d.x;
		})).nice();
		y.domain(d3.extent(faithful, function(d) {
			return d.y;
		})).nice();

		svg.insert("g", "g")
			.attr("fill", "none")
			.attr("stroke", "steelblue")
			.attr("stroke-linejoin", "round")
			.selectAll("path")
			.data(d3.contourDensity()
				.x(function(d) {
					return x(d.x);
				})
				.y(function(d) {
					return y(d.y);
				})
				.size([width, height])
				.bandwidth(40)
				(faithful))
			.enter().append("path")
			.attr("d", d3.geoPath());

		svg.append("g")
			.attr("stroke", "white")
			.selectAll("circle")
			.data(faithful)
			.enter().append("circle")
			.attr("cx", function(d) {
				return x(d.x);
			})
			.attr("cy", function(d) {
				return y(d.y);
			})
			.attr("r", 2);

		svg.append("g")
			.attr("transform", "translate(0," + (height - margin.bottom) + ")")
			.call(d3.axisBottom(x))
			.select(".tick:last-of-type text")
			.select(function() {
				return this.parentNode.appendChild(this.cloneNode());
			})
			.attr("y", -3)
			.attr("dy", null)
			.attr("font-weight", "bold")
			.text(app.getAppProperty("xTitle"));

		svg.append("g")
			.attr("transform", "translate(" + margin.left + ",0)")
			.call(d3.axisLeft(y))
			.select(".tick:last-of-type text")
			.select(function() {
				return this.parentNode.appendChild(this.cloneNode());
			})
			.attr("x", 3)
			.attr("text-anchor", "start")
			.attr("font-weight", "bold")
			.text(app.getAppProperty("yTitle"));
	});

}

/**
 * @return {cpr.data.DataSet}
 */
function getDataSet() {
	return app.getAppProperty("dataSet") || app.lookup("density");
}

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange( /* cpr.events.CPropertyChangeEvent */ e) {
	app.getContainer().redraw();
}