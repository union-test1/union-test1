var LoadingApp = new cpr.core.App("Loading", {
	onCreate: function( /* cpr.core.AppInstance*/ app) {
		app.getContainer().setLayout(new cpr.controls.layouts.FillLayout());
		var msg = new cpr.controls.Output("msg");
		msg.value = "Loading";
		app.getContainer().addChild(msg);
	}
});

function onBodyInit( /* cpr.events.CEvent */ e) {
	var viewPort = app.lookup("viewport");
	var layout = new cpr.controls.layouts.VerticalLayout();
	layout.distribution = "fill";
	layout.scrollable = true;
	viewPort.setLayout(layout);
}

function getDataSet() {
	/** @type cpr.data.DataSet */
	var dataSet = app.getAppProperty("dataSet");
	return dataSet;
}

function render() {
	var root = app.lookup("viewport");

	/**
	 * @type cpr.controls.EmbeddedApp[]
	 */
	var oldChildren = app.lookup("viewport").getChildren().slice(0);
	var rowHeight = app.getAppProperty("rowHeight");
	var dataSet = getDataSet();
	if (!dataSet) {
		return;
	}

	var count = dataSet.getRowCount();
	oldChildren.slice(count).forEach(function( /* cpr.controls.EmbeddedApp*/ it) {
		root.removeChild(it, true);
	});

	var idx = 0;

	for (idx = 0; idx < count; idx++) {
		(function(idx) {
			var row = dataSet.getRow(idx)
			var expectedAppURI = row.getValue("reuseId");
			var existing = oldChildren[idx];
			if (!existing) {
				existing = new cpr.controls.EmbeddedApp(null, LoadingApp);
				cpr.core.App.load(expectedAppURI, function(loadedApp) {
					existing.app = loadedApp;
				});
				root.addChild(existing, {
					height: rowHeight + "px"
				});
			} else if (existing.app != null && existing.app.id != expectedAppURI) {
				(function( /* cpr.controls.EmbeddedApp*/ embededApp) {
					cpr.core.App.load(expectedAppURI, function(loadedApp) {
						//						setTimeout(function(){
						embededApp.app = loadedApp;
						//						});
					});
				})(existing);
			}

			var explictHeight = row.getValue("height");
			if (explictHeight) {
				root.updateConstraint(existing, {
					height: explictHeight + "px"
				});
			}
			existing.setBindContext(new cpr.bind.DataRowContext(dataSet, idx));
		})(idx);
	}
}

function onBodyBeforeDraw( /* cpr.events.CUIEvent */ e) {
	render();
}