cpr.expression.ExpressionEngine.INSTANCE.registerFunction("computeLevel", computeLevel);
cpr.expression.ExpressionEngine.INSTANCE.registerFunction("computeChildSum", computeChildSum);

/**
 * rowId를 이용하여 트리 level을 계산합니다.
 * parentId를 따라 부모 로우을 탐색하여 개수를 센 뒤 반환합니다.
 * 
 * @param {String} rowId
 */
function computeLevel( /* String */ rowId) {
	var row = findRowWithId(rowId);
	if (!row) {
		return 1;
	}

	var level = 1;
	var parentId = row.getValue("parentId");
	while (parentId) {
		level++;
		row = findRowWithId(parentId);
		parentId = row.getValue("parentId");
	}

	return level;
}

/**
 * 자기 자신 및 자식 로우의 특정 컬럼의 총합을 구합니다.
 * @param {String} rowId 총합을 구할 부모 로우의 ID.
 * @param {String} colName 총합계산에 사용할 컬럼 명.
 */
function computeChildSum(rowId, colName) {
	if (!rowId) {
		return 0;
	}

	var selfValue = Number(findRowWithId(rowId).getValue(colName));
	return getAllChildRows(rowId).map(function( /* cpr.data.Row */ each) {
		return Number(each.getValue(colName));
	}).reduce(function( /* typeA */ a, /* typeA */ b) {
		return a + b;
	}, selfValue);
}

/**
 * 특정 로우의 모든 재귀적 자식 로우들을 얻습니다. (자기 자신은 포함하지 않습니다.)
 * @param rowId 자식들을 얻을 row의 id.
 */
function getAllChildRows(rowId) {
	/** @type cpr.data.Row[] */
	var result = [];
	var ds = app.lookup("ds1");

	ds.findAllRow("parentId == '" + rowId + "'").forEach(function( /* cpr.data.Row */ each) {
		result.push(each);
		var eachChildrens = getAllChildRows(each.getValue("id"));
		result = result.concat(eachChildrens)
	});

	return result;
}

/**
 * rowId로 row를 찾습니다.
 * @param {String} rowId 찾을 row의 id.
 */
function findRowWithId(rowId) {
	var ds = app.lookup("ds1");
	var row = ds.findFirstRow("id == '" + rowId + "'");
	return row;
}