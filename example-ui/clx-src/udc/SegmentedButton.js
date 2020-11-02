function onBodyPropertyChange( /* cpr.events.CPropertyChangeEvent */ e) {
	render();
}

function createButton() {
	var btn = new cpr.controls.Button();
	btn.addEventListener("click", function(e) {
		var value = btn.userAttr("value");
		app.setAppProperty("value", value, true);
		var changeEvent = new cpr.events.CSelectionEvent("value-change", {
			newValue: value
		});
		app.dispatchEvent(changeEvent);
	});
	return btn;
}

function render() {
	if (!canRender()) {
		return;
	}

	var grp = app.lookup("group");

	/** @type cpr.data.DataCollection */
	var dataSet = app.getAppProperty("dataSet");

	var labelColumn = dataSet.getColumn(app.getAppProperty("labelColumn"));
	var valueColumn = dataSet.getColumn(app.getAppProperty("valueColumn"));
	var currentValue = app.getAppProperty("value");

	/** @type cpr.controls.layouts.FormLayout */
	var layout = grp.getLayout();
	var cols = [];
	var idx = 0;
	for (idx = 0; idx < dataSet.getRowCount(); idx++) {
		cols.push("1fr");
	}
	layout.setColumns(cols);

	/** @type cpr.controls.Button[] */
	var oldButtons = grp.getChildren();

	// removes unnecessary buttons
	oldButtons.splice(dataSet.getRowCount()).forEach(function( /* cpr.controls.Button */ it) {
		grp.removeChild(it, true);
	});
	
	for (idx = 0; idx < dataSet.getRowCount(); idx++) {
		(function(idx) {
			var btn = oldButtons[idx];
			if (!btn) {
				btn = createButton();
			}
			var eachLabel = labelColumn.getValue(idx);
			var eachValue = valueColumn.getValue(idx);

			btn.value = eachLabel;
			btn.userAttr("value", eachValue);

			if (eachValue == currentValue) {
				btn.style.addClass("cl-selected");
			} else {
				btn.style.removeClass("cl-selected");
			}

			if (btn.getParent() != grp) {
				grp.addChild(btn, {
					colIndex: idx
				});
			} else {
				grp.updateConstraint(btn, {
					colIndex: idx
				});
			}
		})(idx);
	}
}

function canRender() {
	/** @type cpr.data.DataCollection */
	var dataSet = app.getAppProperty("dataSet");
	if (dataSet instanceof cpr.data.DataCollection == false) {
		return false;
	}

	var labelColumn = dataSet.getColumn(app.getAppProperty("labelColumn"));
	if (!labelColumn) {
		return false;
	}

	var valueColumn = dataSet.getColumn(app.getAppProperty("valueColumn"));
	if (!valueColumn) {
		return false;
	}

	return true;
}

function onBodyBeforeDraw( /* cpr.events.CUIEvent */ e) {
	render();
}

/**
 * the text which will be shown in grid with viewing mode.
 */
exports.getText = function() {
	if (!canRender()) {
		return "";
	}
	/** @type cpr.data.DataSet */
	var dataSet = app.getAppProperty("dataSet");
	var labelColumnName = app.getAppProperty("labelColumn");
	var currentValue = app.getAppProperty("value");
	var theRow = dataSet.findFirstRow("value == '" + currentValue + "'");
	if (theRow) {
		return theRow.getValue(labelColumnName);
	} else {
		""
	}
};

function onBodyInit(/* cpr.events.CEvent */ e){
	app.lookup("group").removeAllChildren(true);
}
