	package exbuilder.sample.main.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.ArrayUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.spring.JSONDataView;


@Controller
public class MainController {
	
	private static final String[][] TEMPLATEMENU = new String[][] {
		{"Template", "템플릿", "", "root"}
		
		, {"DefaultTemplate", "화면템플릿", "", "Template"}
		, {"GridList", "원그리드 조회", "template/layout/grid/onegridlist", "DefaultTemplate"}
		, {"GridPaging", "원그리드 페이징", "template/layout/grid/onegridpaging", "DefaultTemplate"}
		, {"TwoGrid", "투그리드 조회", "template/layout/grid/twogridlist", "DefaultTemplate"}
		, {"MD_GridFreeform", "마스터-디테일 (그리드-프리폼)", "template/layout/grid/md_gridfreeform", "DefaultTemplate"}
		, {"MD_FreeformGrid", "마스터-디테일 (프리폼-그리드)", "template/layout/grid/md_freeformgrid", "DefaultTemplate"}
		, {"MD_TreeGrid", "마스터-디테일 (트리-그리드)", "template/layout/grid/md_treegrid", "DefaultTemplate"} 
		, {"GridMoveRow", "그리드간 데이터 이동", "template/layout/grid/movetogrid", "DefaultTemplate"}
		, {"CopyToGrid", "그리드간 데이터 복사", "template/layout/grid/copytogrid", "DefaultTemplate"}
		, {"DynamicGrid", "다이나믹 그리드", "template/layout/grid/dynamic_grid", "DefaultTemplate"}
		, {"MovableResizableGrid", "그리드-MovableResizable", "template/layout/grid/grid_movable_resizable", "DefaultTemplate"}
		, {"Freeform", "프리폼", "template/layout/freeform", "DefaultTemplate"}
		, {"ScreenChange", "스크린 체인지", "template/layout/screen_change", "DefaultTemplate"
			, "스크린 크기 변경시 폼 레이아웃의 구조를 변경할 수 있습니다."}
		, {"ReactionLayout", "반응형 레이아웃", "template/layout/reaction_layout", "DefaultTemplate"}
		, {"Animation", "애니메이션", "template/layout/animation", "DefaultTemplate"}
		, {"Tab01", "탭페이지", "template/layout/tab/tab01", "DefaultTemplate"}
		, {"Tab02", "탭페이지-조건부 분리", "template/layout/tab/tab02", "DefaultTemplate"}
		, {"TAB03", "탭페이지-버튼부 분리", "template/layout/tab/tab03", "DefaultTemplate"}
		
		, {"CommonTemplate", "템플릿기능예제", "", "Template"}
		, {"GridExcelExport", "그리드-엑셀 익스포트", "template/common/grid/excelExport", "CommonTemplate"
			, "그리드 엑셀 익스포트 예제입니다."}
		, {"MultiSheetExcelExport", "그리드-멀티 시트 엑셀 익스포트 예제", "template/common/grid/multiSheetExcelExport", "CommonTemplate"
			, "그리드 데이터를 2개이상의 엑셀 익스포트 예제입니다."}
		, {"GridFocusCell", "그리드-focuscell 예제", "template/common/grid/grid_focuscell", "CommonTemplate"
			, "그리드에 특정 셀에 포커스를 주는 예제입니다."}
		, {"ModalDialog", "다이얼로그-모달", "template/common/dialog/modaldialog", "CommonTemplate"
			, "모달 다이얼로그를 사용한 예제입니다. 모달 다이얼로그가 띄워지면 부모창의 제어를 할 수 없습니다."}
		, {"ModalessDialog", "다이얼로그-모달리스", "template/common/dialog/modalessdialog", "CommonTemplate"
			, "모달리스 다이얼로그를 사용한 예제입니다. 모달리스 다이얼로그는 띄워져도 부모창의 제어가 가능합니다."}
		, {"SubmissionProgress", "서브미션-프로그레스", "template/common/submission/submission_progress", "CommonTemplate"
			, "서브미션 호출시 프로그레스 이미지를 보여주는 예제입니다."}
		, {"SubmissionCustomData", "서브미션-DataSet행별 데이터 추가", "template/common/submission/submission_rowcustomdata", "CommonTemplate"
			, "데이터셋의 변경데이터를 서브미션으로 보낼 때 row 별로 특정데이터를 포함하여 보내게 하는 예제입니다."}
		, {"GridValidation", "validation-그리드", "template/common/validation/gridvalidation", "CommonTemplate"
			, "공통모듈을 이용한 그리드 validation 예제입니다."}
		, {"FreeformValidation", "validation-프리폼", "template/common/validation/freeformvalidation", "CommonTemplate"
			, "공통모듈을 이용한 프리폼 validation 예제입니다."}
		
	};
		////////////////////////////////////////////////////////////////////////////////////////////////////
	private static final String[][] EXAMPLEMENU = new String[][] {
		{"Example", "예제", "", "root"}
		, {"ExampleOverview", "Overview", "example/overview", "Example"}
		
		, {"Component", "기타 컴포넌트", "", "Example",}
		, {"Component01", "컴포넌트", "example/component/component", "Component"
			,"기본 컴포넌트들이 배치된 예제 입니다."} 
		, {"Component02", "프리폼 내부 컴포넌트", "example/component/componentinfreeform", "Component"
			,"프리폼(그룹-폼 레이아웃)에 기본 컴포넌트들이 배치된 예제 입니다."}
		, {"MaskFormat", "인풋계열-mask,format 예제", "example/component/maskformat", "Component"
			, "인풋계열(인풋박스, 넘버에디터, 마스크에디터, 데이트인풋)의 mask와 format 사용시 예제입니다."}
		, {"DateInput", "데이트인풋", "example/component/dateinput", "Component"
			, "데이트인풋에 mask와 format을 적용해보는 예제입니다."}
		, {"Anniversary", "캘린더기념일", "example/component/dateinput_anny", "Component"
			, "데이트인풋의 캘린더에 기념일을 추가하는 예제입니다."}
		, {"PDFViewer", "PDF뷰어", "example/component/pdfviewer", "Component"
			, "브라우저의 PDF Viewer를 실행합니다."}
		, {"CheckComboBox", "체크콤보-다중선택", "example/component/checkcombobox", "Component"
			, "체크박스를 이용하여 다중 선택을 지원하는 콤보박스 예제입니다."}
		, {"NavigationBar", "네비게이션바-메가메뉴", "example/component/nav_megamenu", "Component"
			, "네비게이션바에서 메가메뉴 형식의 메뉴예제입니다."}
		, {"NavMobile", "네비게이션바-모바일", "example/component/nav_mobile", "Component"
			, "네비게이션바의 서브 메뉴를 클릭으로 열고, 화면의 크기가 작으면 버튼으로 변경되는 UDC 컨트롤 예제입니다."}
		, {"TabContextMenu", "탭폴더-contextmenu", "example/component/tab_contextmenu", "Component"
			, "탭폴더 또는 MDI폴더의 헤더에 contextmenu를 지원하는 예제입니다."}
		, {"Tree", "트리", "example/component/tree", "Component"
			, "다양한 트리표현 예제입니다."}
		, {"MultiLanguage", "다국어설정", "example/component/multilanguage", "Component"
			, "컨트롤에 다국어를 설정, 변경하는 예제입니다."}
		, {"EnterNext", "Enter키를 이용한 포커스 이동", "example/component/enternext", "Component"
			, "컨트롤간에 enter키를 이용하여 포커스를 이동하는 예제입니다."}
		, {"AppWorkFlow", "앱-워크플로우", "example/component/app_workflow", "Component"
			, "App의 workflow를 사용하여 순차 처리 되어야하는 로직을 구현한 예제입니다."}
		, {"TabHeadeerClickEvent", "탭 헤더 클릭 이벤트 예제", "example/component/tab_headerClickEvent", "Component"
			, "탭의 헤더 클릭 이벤트 예제 입니다."}
		, {"MDIHeader", "MDI 헤더 포지션/숨김 설정", "example/component/mdi_header", "Component"
			, "MDI 헤더 포지션/숨김 설정 예제 입니다."}
		, {"SelectItem", "자식 아이템 선택 시 부모도 같이 선택", "example/component/selectItem_depth", "Component"
			, "자식 아이템 선택 시 부모도 같이 선택되는 예제 입니다."}
		, {"FileUploadBind", "파일업로드 언어선택/버튼라벨 바인딩", "example/component/fileupload_bind", "Component"
			, "파일업로드 언어선택/버튼라벨 바인딩 예제 입니다."}
		, {"ErrorDialog", "다이얼로그-잘못된경로", "example/dialog/dialogerror", "Component"
			, "다이얼로그에서 자기 자신의 페이지를 호출하는 경우 보여지는 화면 예제입니다."}
		, {"DialogEvent", "다이얼로그-before-unload", "example/dialog/dialogevent", "Component"
			, "다이얼로그에서 before-unload 이벤트에서 returnValue를 설정하는 예제입니다."}
		, {"DataSetEvent", "데이터셋-before 이벤트 예제", "example/component/dataset_event", "Component"
			, "데이터셋의 before-insert, insert, before-update, update, before-delete, delete 이벤트 예제입니다."}
		
		
		, {"Grid", "그리드", "", "Example"}
		, {"GridInsertDelete", "그리드-조회/신규/수정/삭제", "example/grid/grid_crud", "Grid"
			, "그리드의 조회,신규,수정,삭제를 보여주는 예제입니다."}
		, {"GridSplit", "그리드-스플릿", "example/grid/grid_split", "Grid"
			, "그리드 Split 예제입니다."} 
		, {"GridSplitGroup", "그리드-스플릿/행그룹", "example/grid/grid_split_grouping", "Grid"
			, "그리드 행 그룹핑과 Split을 동시에 적용한 예제입니다."}
		, {"GridGrouping", "그리드-트리구조 행그룹", "example/grid/grid_grouping", "Grid"
			, "그리드 행 그룹핑을 트리구조로 표현한 예제입니다."}
		, {"GridRowGroupClick", "그리드-행그룹 rowgroup-click 이벤트 예제", "example/grid/grid_rowGroupClick", "Grid"
			, "그리드 트리구조 행 그룹핑시 행그룹 클릭 이벤트 예제입니다."}
		, {"GridMass", "그리드-대용량", "example/grid/grid_mass", "Grid"
			, "그리드 대용량 데이터 처리 예제입니다."}
		, {"GridCellStyle1", "그리드-셀 스타일", "example/grid/grid_cellstyle", "Grid"
			, "그리드 셀에 바인드를 사용하여 progress bar처럼 표현한 예제입니다."}
		, {"GridCellStyle2", "그리드-셀 스타일2", "example/grid/grid_cellstyle2", "Grid"
			, "그리드 셀에 바인드를 사용하여 셀별 스타일을 다르게 표현한 예제입니다."}
		, {"GridExcelImport", "그리드-엑셀 임포트", "example/grid/excelImport", "Grid"
			, "그리드 엑셀 임포트 예제입니다."}
//		, {"GridExcelExport", "그리드-엑셀 익스포트", "example/grid/excelExport", "Grid"
//			, "그리드 엑셀 익스포트 예제입니다."}
//		, {"GridFocusCell", "그리드-focuscell 예제", "example/grid/grid_focuscell", "Grid"
//			, "그리드에 특정 셀에 포커스를 주는 예제입니다."}
		, {"GridContextMenu", "그리드-contextmenu 예제", "example/grid/grid_contextmenu", "Grid"
			, "그리드에 컨텍스트 메뉴를 통해 신규,수정,삭제,정렬,필터를 하는 예제입니다."}
		, {"GridInsertRowData", "그리드-insertRowData 예제", "example/grid/grid_insertRowData", "Grid"
			, "그리드의 insertRowData API 예제입니다. insertRowData는 그리드에 데이터와 함께 행을 추가하는 API입니다."}
		, {"GridSetColumnName", "그리드-columnName 변경 예제", "example/grid/grid_setColumnName", "Grid"
			, "그리드의 columnName setter 예제입니다. 그리드에 바인딩된 columnName을 동적으로 변경할 수 있습니다."}
		, {"GridgetColumnByColIndex", "그리드-getColumnByColIndex 예제", "example/grid/grid_getColumnByColIndex", "Grid"
			, "그리드 Detail 컬럼으로 Header 컬럼을 취득할 수 있는 API입니다."}
		, {"GridgetColumnName", "그리드-getColumnByName 예제", "example/grid/grid_getColumnByName", "Grid"
			, "그리드 Detail의 바인딩된 columnName을 통해 GridColumn객체를 가져오는 예제입니다."}
		, {"GridgetBindInfo", "그리드-getBindInfo 예제", "example/grid/grid_getBindInfo", "Grid"
			, "그리드 Detail의 바인딩된 속성을 통해 컨트롤 바인드 속성 정보를 가져오는 예제입니다."}
		, {"GridsetBindContext", "그리드-bindContext 예제", "example/grid/grid_setBindContext", "Grid"
			, "그룹 바인딩 속성인 그리드 선택 행을 통해 그륩의 값을 바꿔주고 context-value-change이벤트 객체를 통해 context와 columnName 접근 예제입니다."}
		, {"GridHeaderCheckBox", "그리드-headerCheckbox 예제", "example/grid/grid_headerCheckbox", "Grid"
			, "그리드 Header의 columnType을 checkbox로 설정시 Detail의 columntype=checkbox를 전체 선택, 전체 해제 할 수 있습니다."}
		, {"GridEvent", "그리드-추가 이벤트 예제(insert,update,delete)", "example/grid/grid_event", "Grid"
			, "그리드 추가된 이벤트 예제입니다. (before-insert, insert, before-update, update, before-delete, delete)"}
		, {"GridTreeCell", "그리드-treecell 사용예제(treegrid)", "example/grid/treegrid", "Grid"
			, "그리드 트리셀 컨트롤을 사용하여 그리드 행 데이터를 트리구조로 표현하는 예제입니다. \nweight, svhc, export_amt 컬럼의 경우 하위 행 데이터의 값의 합계가 상위 행 데이터 입니다. contexnt-value-chage 이벤트를 통해 하위 행 데이터 변경시 상위 행 데이터가 재계산되도록 하였습니다."}
		, {"GridClickMode", "그리드-clickMode 사용예제", "example/grid/grid_clickMode", "Grid"
			, "그리드 clickMode 사용 예제입니다. clickMode에는 select와 edit이 있고, 최초 1회 클릭 시 select 모드로 진입할지, edit 모드로 진입할지에 대한 속성입니다."}
		, {"GridMultiSortFilter", "그리드-multiSort/Filter 사용예제", "example/grid/grid_multisort", "Grid"
			, "그리드에 multiSort/Filter 사용 예제입니다."}
		, {"GridAutoRowHeight", "그리드-autoRowHeight 사용예제", "example/grid/grid_autoRowHeight", "Grid"
			, "그리드-autoRowHeight 사용 예제입니다."}
		
		, {"Thrice", "3단 계층형 콤보", "", "Example"}
		, {"ThriceCombo", "콤보박스-3단 계층형 콤보박스", "example/thricecombo/thricecombo", "Thrice"
			, "콤보박스를 계층형으로 구성한 예제입니다."}
		, {"ThriceComboInGrid", "그리드-3단 계층형 콤보박스", "example/thricecombo/thricecomboingrid", "Thrice"
			, "그리드에 계층형 콤보박스를 배치한 예제입니다."}
		
		, {"Submission", "서브미션", "", "Example"}
		, {"SubmissionTimeout", "서브미션-타임아웃", "example/submission/submission_timeout", "Submission"
			, "서브미션에 타임아웃이벤트를 사용하여 특정시간에 연결을 끊는 예제입니다."}
		, {"TSVProtocal", "TSV프로토콜 사용 예제", "example/submission/tsvprotocal", "Submission"
			, "서버에서 TSVDataView를 이용하여 TSV 응답 프로토콜로 데이터를 받는 예제입니다."}
		, {"SubmitUploadProgress", "서브미션-이벤트(submit-upload-progress) 예제", "example/submission/submission_event", "Submission"
			, "서브미션의 submit-upload-progress 이벤트 예제입니다.\nsubmit-upload-pregress 이벤트는 multipart/form-data 일 때 서버로 일정 크기의 데이터를 전송했을 때 발생합니다. 하나의 요청에 대해 여러 번 발생할 수 있습니다."}
		
		, {"FileUpload", "파일업로드", "", "Example"}
		, {"FreeformFileUpload", "단일 파일업로드(프리폼)", "example/file/singlefileupload", "FileUpload"
			, "프리폼 내부에 파일인풋을 배치하여 단일로 파일 업로드를 하는 예제입니다."}
		, {"GridFileUpload", "다중 파일업로드(그리드)", "example/file/multifileupload", "FileUpload"
			, "그리드 셀에 파일인풋을 배치하여 여러 개의 파일을 업로드하는 예제입니다."}
		
//		, {"Dialog", "다이얼로그", "", "Example"}
//		, {"ErrorDialog", "다이얼로그-잘못된경로", "example/dialog/dialogerror", "Dialog"
//			, "다이얼로그에서 자기 자신의 페이지를 호출하는 경우 보여지는 화면 예제입니다."}
//		, {"ModalDialog", "다이얼로그-모달", "example/dialog/modaldialog", "Dialog"
//			, "모달 다이얼로그를 사용한 예제입니다. 모달 다이얼로그가 띄워지면 부모창의 제어를 할 수 없습니다."}
//		, {"ModalessDialog", "다이얼로그-모달리스", "example/dialog/modalessdialog", "Dialog"
//			, "모달리스 다이얼로그를 사용한 예제입니다. 모달리스 다이얼로그는 띄워져도 부모창의 제어가 가능합니다."}

//		, {"Submission", "서브미션", "", "Example"}
//		, {"SubmissionTimeout", "타임아웃", "example/submission/submission_timeout", "Submission"
//			, "서브미션에 타임아웃이벤트를 사용하여 특정시간에 연결을 끊는 예제입니다."}
//		, {"SubmissionProgress", "프로그레스", "example/submission/submission_progress", "Submission"
//			, "서브미션 호출시 프로그레스 이미지를 보여주는 예제입니다."}
//		, {"SubmissionCustomData", "서브미션의 DataSet행별 추가데이터 send", "example/submission/submission_rowcustomdata", "Submission"
//			, "데이터셋의 변경데이터를 서브미션으로 보낼 때 row별로 특정데이터를 포함하여 보내게 하는 예제입니다."}

		, {"Embedded", "임베디드 페이지", "", "Example" }
		, {"HTMLPage", "HTML페이지", "example/embedded/embeddedHTML", "Embedded"
			, "임베디드 페이지를 이용하여 HTML 페이지를 띄운 예제입니다."}
		, {"JSPPage", "JSP페이지", "example/embedded/embeddedJSP", "Embedded"
			, "임베디드 페이지를 이용하여 JSP 페이지를 띄운 예제입니다."}

		, {"DynamicControl", "동적컨트롤", "", "Example"}
		, {"UDCTimeTable", "UDC를 이용한 동적컨트롤 생성", "example/dynamiccontrol/udc1", "DynamicControl"
			, "시간표 UDC를 생성하여 부모창에서 데이터만 바꿔 다양한 시간표를 표현한 예제입니다."}
		, {"floatingButton", "버튼 위치 고정", "example/dynamiccontrol/floatbutton", "DynamicControl"
			, "버튼의 위치를 고정하여 화면이 리사이즈되어도 화면의 위치에 고정되는 예제입니다."}
		, {"tagControl", "시멘틱 태그를 사용한 컨트롤 생성", "example/dynamiccontrol/tagcontrol", "DynamicControl"
			, "HTML을 작성하여 데이터를 출력하는 컨트롤입니다."}
		
//		, {"Validation", "validation", "", "Example"}
//		, {"GridValidation", "그리드 validation", "example/validation/gridvalidation", "Validation"
//			, "공통모듈을 이용한 그리드 validation 예제입니다."}
//		, {"FreeformValidation", "프리폼 validation", "example/validation/freeformvalidation", "Validation"
//			, "공통모듈을 이용한 프리폼 validation 예제입니다."}
		
		, {"Plugin", "외부연동컨트롤 연동", "", "Example"}
		, {"Chart", "echart 연동 예제", "example/plugin/chart", "Plugin"
			, "쉘 컨트롤을 이용하여 echart를 연동 예제입니다."}
		, {"Scheduler", "외부 Scheduler", "example/plugin/scheduler", "Plugin"
			, "쉘 컨트롤을 이용하여 dhtmlxscheduler를 연동한 예제입니다."}
		, {"Treetable", "jquery treetable 예제", "example/plugin/treetable", "Plugin"
			, "쉘 컨트롤을 이용하여 jquery treetable을 연동한 예제입니다."}
		
	};
	
	
	public MainController() {
		
	}
	
	@RequestMapping("/getMenuList.do")
	public View getMenuList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception {
		String[][] menu = new String[][]{};
		menu = (String[][]) ArrayUtils.addAll(MainController.TEMPLATEMENU, MainController.EXAMPLEMENU);
		
		List<Map<String, Object>> leftMenuList = this.getMenuList(menu);
		
		dataRequest.setResponse("leftMenuList", leftMenuList);
		
		return new JSONDataView();
	}
	
	@RequestMapping("/getExampleMenuList.do")
	public View getExampleMenuList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception {
		List<Map<String, Object>> leftMenuList = this.getMenuList(MainController.EXAMPLEMENU);
		leftMenuList.remove(1); // Overview 제거
		leftMenuList.remove(0); // 예제 제거
		
		dataRequest.setResponse("leftMenuList", leftMenuList);
		
		return new JSONDataView();
	}
	
	private List<Map<String, Object>> getMenuList(String[][] data) {
		List<Map<String, Object>> menuList = new ArrayList<Map<String, Object>>();
		
		for(String[] menuItem : data) {
			Map<String, Object> menu = new HashMap<String, Object>();
			menu.put("menuId", menuItem[0]);
			menu.put("menuNm", menuItem[1]);
			menu.put("appId", menuItem[2]);
			menu.put("upMenuId", menuItem[3]);
			
			if(menuItem.length == 5) {
				menu.put("menuExplain", menuItem[4]);
			}
			
			menuList.add(menu);
		}
		
		return menuList;
	}

}
