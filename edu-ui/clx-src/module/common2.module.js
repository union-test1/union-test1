// Common Module: commo.module.js

exports.id = "commo.module.js";

/**
 * 모듈 출판의 종류
 * 1) 모듈 함수(exports) : 페이지에서 불러와야 사용 가능
 * 	--> cpr.core.Module.require("module");
 * 2) 글로벌 함수(globals) : 일반함수처럼 사용 가능
 * 	--> 예외적으로 오브젝트로 사용되는 방법도 존재
 */

/**
 * 모듈 함수 출판 예시
 */
 
 /**
 * @desc 고객검색 팝업
 * @param {Object} searchbutton 검색팝업 UDC를 사용하는 컨트롤
 * @param {Function} handler 고객팝업을 실행 시킨 후 실행할 함수
 */
exports.openClntSearchPop = function(app, searchbutton/* udc.searchbutton*/ , handler/* Function*/ ) {
		this.openModal(app, "02_dialog/searchPop", 900, 700, function(e/* cpr.events.CUIEvent*/ ) {
			/**
			 * @type cpr.controls.Dialog
			 */
			var dialog = e.control;
			
			if (handler) {
				handler(e);
			}
		});
};

/**
 * @desc 다이얼로그 호출
 * @param {string} appId 오픈할 App의 ID
 * @param {number} width 다이얼로그의 가로 사이즈
 * @param {number} height 다이얼로그의 세로 사이즈
 * @param {function} handler 다이얼로그가 닫친 후 수행될 콜백함수
 * @param {object} initValue 다이얼로그 시작 시 전달할 값
 */
exports.openModal = function(app, appid /* string */ , width /* number */ , height /* number */ , handler/* Function */ , initValue/* {key:value} */ ) {
		var rootApp = app.getRootAppInstance();
		if (initValue == null) {
			initValue = {};
		}

		var dialogProp = {
			width : width,
			height : height,
			headerVisible : true,
			headerClose : false,
			resizable : true
		};

		rootApp.openDialog(appid, dialogProp, function( /*cpr.controls.Dialog*/ dialog) {
			if (handler) {
				dialog.addEventListenerOnce("close", handler);
			}
			if (initValue) {
				dialog.initValue = initValue;
			}
		});
};
