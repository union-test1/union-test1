package exbuilder.sample.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Repository;

import exbuilder.util.PagingMap;


@Repository
public class DatabaseDAO {
	private Table master;
	private Table sub1;
	private Table sub2;
	
	private Table tree;
	private Table treeSub;
	
	private List<Map<String, Object>> deptList;
	private List<Map<String, Object>> deptListLvl1;
	private List<Map<String, Object>> deptListLvl2;
	private List<Map<String, Object>> deptListLvl3;

	
	
	public DatabaseDAO() {
		
	}
	
	private Map<String, Object> createDeptMap(String code, String name, String parentCode) {
		Map<String, Object> dept = new HashMap<String, Object>();
		dept.put("code", code);
		dept.put("name", name);
		dept.put("parent", parentCode);
		
		return dept;
	}
	
	@PostConstruct
	private void init() {
		// master table
		this.master = new MasterTable();
		
		// sub table
		this.sub1 = new SubTable(this.master);
		this.sub2 = new SubTable(this.master);
		
		// tree
		this.tree = new TreeTable("root", 3, 3);
		this.treeSub = new SubTable(this.tree);
		
		// department
		this.initDepartment();
		this.initDepartmentLevel1();
		this.initDepartmentLevel2();
		this.initDepartmentLevel3();
	
	}
	
	/* Main */
	public int getMainTotCnt(Map<String, Object> requestMap) {
		return this.master.getTotCnt(requestMap);
	}
	
	public List<Map<String, String>> selectMain(Map<String, Object> requestMap) {
		return this.master.select(requestMap);
	}
	
	public List<Map<String, String>> selectMain(Map<String, Object> requestMap, PagingMap pagingMap) {
		return this.master.select(requestMap, pagingMap);
	}
	
	public void insertMain(Map<String, String> data) {
		this.master.insert(data);
	}
	
	public void updateMain(Map<String, String> data) {
		this.master.update(data);
	}
	
	public void deleteMain(Map<String, String> data) {
		this.master.delete(data);
	}
	
	/* Sub1 */
	public int getSub1TotCnt(Map<String, Object> requestMap) {
		return this.sub1.getTotCnt(requestMap);
	}
	
	public List<Map<String, String>> selectSub1(Map<String, Object> requestMap) {
		return this.sub1.select(requestMap);
	}
	
	public List<Map<String, String>> selectSub1(Map<String, Object> requestMap, PagingMap pagingMap) {
		return this.sub1.select(requestMap, pagingMap);
	}
	
	public void insertSub1(Map<String, String> data) {
		this.sub1.insert(data);
	}
	
	public void updateSub1(Map<String, String> data) {
		this.sub1.update(data);
	}
	
	public void deleteSub1(Map<String, String> data) {
		this.sub1.delete(data);
	}
	
	/* Sub2 */
	public int getSub2TotCnt(Map<String, Object> requestMap) {
		return this.sub2.getTotCnt(requestMap);
	}
	
	public List<Map<String, String>> selectSub2(Map<String, Object> requestMap) {
		return this.sub2.select(requestMap);
	}
	
	public List<Map<String, String>> selectSub2(Map<String, Object> requestMap, PagingMap pagingMap) {
		return this.sub2.select(requestMap, pagingMap);
	}
	
	public void insertSub2(Map<String, String> data) {
		this.sub2.insert(data);
	}
	
	public void updateSub2(Map<String, String> data) {
		this.sub2.update(data);
	}
	
	public void deleteSub2(Map<String, String> data) {
		this.sub2.delete(data);
	}


	/* Tree */
	public int getTreeTotCnt(Map<String, Object> requestMap) {
		return this.tree.getTotCnt(requestMap);
	}
	
	public List<Map<String, String>> selectTree(Map<String, Object> requestMap) {
		return this.tree.select(requestMap);
	}
	
	public List<Map<String, String>> selectTree(Map<String, Object> requestMap, PagingMap pagingMap) {
		return this.tree.select(requestMap, pagingMap);
	}
	
	public void insertTree(Map<String, String> data) {
		this.tree.insert(data);
	}
	
	public void updateTree(Map<String, String> data) {
		this.tree.update(data);
	}
	
	public void deleteTree(Map<String, String> data) {
		this.tree.delete(data);
	}

	/* TreeSub */
	public int getTreeSubTotCnt(Map<String, Object> requestMap) {
		return this.treeSub.getTotCnt(requestMap);
	}
	
	public List<Map<String, String>> selectTreeSub(Map<String, Object> requestMap) {
		return this.treeSub.select(requestMap);
	}
	
	public List<Map<String, String>> selectTreeSub(Map<String, Object> requestMap, PagingMap pagingMap) {
		return this.treeSub.select(requestMap, pagingMap);
	}
	
	public void insertTreeSub(Map<String, String> data) {
		this.treeSub.insert(data);
	}
	
	public void updateTreeSub(Map<String, String> data) {
		this.treeSub.update(data);
	}
	
	public void deleteTreeSub(Map<String, String> data) {
		this.treeSub.delete(data);
	}

	/* DeptList */
	public List<Map<String, Object>> getDeptList() {
		return this.deptList;
	}
	
	public List<Map<String, Object>> getDeptLvl1List() {
		return this.deptListLvl1;
	}
	
	public List<Map<String, Object>> getDeptLvl2List() {
		return this.deptListLvl2;
	}
	
	public List<Map<String, Object>> getDeptLvl3List() {
		return this.deptListLvl3;
	}
	
	

	
	/* set deptartment code */
	private void initDepartment() {
		List<Map<String, Object>> deptList = new ArrayList<Map<String, Object>>();
		deptList.add(this.createDeptMap("11000", "토마토시스템", "00000"));
		deptList.add(this.createDeptMap("11100", "경영기획실", "11000"));
		deptList.add(this.createDeptMap("11110", "경영혁신팀", "11100"));
		deptList.add(this.createDeptMap("21538", "전략기획팀", "11110"));
		deptList.add(this.createDeptMap("21539", "기획조정팀", "11110"));
		deptList.add(this.createDeptMap("21540", "기획연구팀", "11110"));
		deptList.add(this.createDeptMap("21541", "혁신총괄팀", "11110"));
		deptList.add(this.createDeptMap("21542", "조직팀", "11110"));
		deptList.add(this.createDeptMap("21543", "인사제도팀", "11110"));
		deptList.add(this.createDeptMap("21544", "인력산출기준개정전담", "11110"));
		deptList.add(this.createDeptMap("21571", "경영혁신팀", "11110"));
		deptList.add(this.createDeptMap("21660", "테스트팀", "11110"));
		deptList.add(this.createDeptMap("11120", "경영정보팀", "11100"));
		deptList.add(this.createDeptMap("21564", "경영정보팀", "11120"));
		deptList.add(this.createDeptMap("21565", "경영개선팀", "11120"));
		deptList.add(this.createDeptMap("21566", "경영성과팀", "11120"));
		deptList.add(this.createDeptMap("21567", "경영정보팀", "11120"));
		deptList.add(this.createDeptMap("21568", "정보화기획팀", "11120"));
		deptList.add(this.createDeptMap("21569", "HRM운영", "11120"));
		deptList.add(this.createDeptMap("21570", "LAN운영실", "11120"));
		deptList.add(this.createDeptMap("11130", "재정관리팀", "11100"));
		deptList.add(this.createDeptMap("21557", "재정관리팀", "11130"));
		deptList.add(this.createDeptMap("21558", "재정기획팀", "11130"));
		deptList.add(this.createDeptMap("21559", "재정제도팀", "11130"));
		deptList.add(this.createDeptMap("21560", "재정운영팀", "11130"));
		deptList.add(this.createDeptMap("21561", "예산총괄팀", "11130"));
		deptList.add(this.createDeptMap("21562", "결산총괄팀", "11130"));
		deptList.add(this.createDeptMap("21563", "회계분리추진T/F팀", "11130"));
		deptList.add(this.createDeptMap("21040", "경영기획실장실", "11100"));
		deptList.add(this.createDeptMap("21041", "경영기획실장", "21040"));
		deptList.add(this.createDeptMap("21534", "6시그마팀", "11100"));
		deptList.add(this.createDeptMap("21554", "6시그마팀", "21534"));
		deptList.add(this.createDeptMap("21555", "기획팀", "21534"));
		deptList.add(this.createDeptMap("21556", "프로젝트관리팀", "21534"));
		deptList.add(this.createDeptMap("21572", "컨설턴트", "21534"));
		deptList.add(this.createDeptMap("21573", "컨설턴트", "21534"));
		deptList.add(this.createDeptMap("21535", "노사협력팀", "11100"));
		deptList.add(this.createDeptMap("21550", "노사협력팀", "21535"));
		deptList.add(this.createDeptMap("21551", "노사협력팀", "21535"));
		deptList.add(this.createDeptMap("21552", "복리팀", "21535"));
		deptList.add(this.createDeptMap("21536", "투자기획팀", "11100"));
		deptList.add(this.createDeptMap("21546", "위탁기획팀", "21536"));
		deptList.add(this.createDeptMap("21547", "국사기획팀", "21536"));
		deptList.add(this.createDeptMap("21548", "재산운용팀", "21536"));
		deptList.add(this.createDeptMap("21549", "위탁제도개선전담팀", "21536"));
		deptList.add(this.createDeptMap("21553", "투자기획팀", "21536"));
		deptList.add(this.createDeptMap("21537", "홍보팀", "11100"));
		deptList.add(this.createDeptMap("21545", "홍보팀", "21537"));
		deptList.add(this.createDeptMap("21651", "홍보팀", "21537"));
		deptList.add(this.createDeptMap("11200", "조달사업단", "11000"));
		deptList.add(this.createDeptMap("11210", "조달정책팀", "11200"));
		deptList.add(this.createDeptMap("21598", "조달정책팀", "11210"));
		deptList.add(this.createDeptMap("21599", "총괄팀", "11210"));
		deptList.add(this.createDeptMap("21600", "8층소회의실", "11210"));
		deptList.add(this.createDeptMap("21601", "정책기획팀", "11210"));
		deptList.add(this.createDeptMap("21602", "요금정책팀", "11210"));
		deptList.add(this.createDeptMap("21603", "CS팀", "11210"));
		deptList.add(this.createDeptMap("21604", "통상협상팀", "11210"));
		deptList.add(this.createDeptMap("11220", "마케팅기획팀", "11200"));
		deptList.add(this.createDeptMap("21593", "마케팅기획팀", "11220"));
		deptList.add(this.createDeptMap("21594", "마케팅기획팀", "11220"));
		deptList.add(this.createDeptMap("21595", "통상개발팀", "11220"));
		deptList.add(this.createDeptMap("21596", "CRM팀", "11220"));
		deptList.add(this.createDeptMap("21597", "우체국쇼핑팀", "11220"));
		deptList.add(this.createDeptMap("11230", "물류기획팀", "11200"));
		deptList.add(this.createDeptMap("21588", "물류기획팀", "11230"));
		deptList.add(this.createDeptMap("21589", "물류혁신팀", "11230"));
		deptList.add(this.createDeptMap("21590", "집배팀", "11230"));
		deptList.add(this.createDeptMap("21591", "운송팀", "11230"));
		deptList.add(this.createDeptMap("21592", "발착팀", "11230"));
		deptList.add(this.createDeptMap("11240", "국제사업팀", "11200"));
		deptList.add(this.createDeptMap("21583", "국제사업팀", "11240"));
		deptList.add(this.createDeptMap("21584", "국제기구협력팀", "11240"));
		deptList.add(this.createDeptMap("21585", "EMS사업팀", "11240"));
		deptList.add(this.createDeptMap("21586", "국제운용팀", "11240"));
		deptList.add(this.createDeptMap("21587", "수출지원팀", "11240"));
		deptList.add(this.createDeptMap("11250", "소포사업팀", "11200"));
		deptList.add(this.createDeptMap("21579", "소포사업팀", "11250"));
		deptList.add(this.createDeptMap("21580", "소포기획팀", "11250"));
		deptList.add(this.createDeptMap("21581", "소포영업팀", "11250"));
		deptList.add(this.createDeptMap("21582", "소포운용팀", "11250"));
		deptList.add(this.createDeptMap("11260", "우표팀", "11200"));
		deptList.add(this.createDeptMap("21575", "우표팀", "11260"));
		deptList.add(this.createDeptMap("21576", "우표기획/우취보급팀", "11260"));
		deptList.add(this.createDeptMap("21577", "디자인실장", "11260"));
		deptList.add(this.createDeptMap("21578", "디자인실", "11260"));
		deptList.add(this.createDeptMap("21060", "조달사업단장실", "11200"));
		deptList.add(this.createDeptMap("21061", "조달사업단장", "21060"));
		deptList.add(this.createDeptMap("21574", "조달정보기술팀", "11200"));
		deptList.add(this.createDeptMap("21605", "조달정보기술팀", "21574"));
		deptList.add(this.createDeptMap("21606", "특송정보화팀", "21574"));
		deptList.add(this.createDeptMap("21607", "통상정보화팀", "21574"));
		deptList.add(this.createDeptMap("21608", "자동화팀", "21574"));
		deptList.add(this.createDeptMap("21609", "순로화구분자동화전담반", "21574"));
		deptList.add(this.createDeptMap("11300", "금융사업단", "11000"));
		deptList.add(this.createDeptMap("11310", "금융총괄팀", "11300"));
		deptList.add(this.createDeptMap("21629", "금융총괄팀", "11310"));
		deptList.add(this.createDeptMap("21630", "금융총괄팀", "11310"));
		deptList.add(this.createDeptMap("21631", "7층 소회의실", "11310"));
		deptList.add(this.createDeptMap("21632", "금융기획팀", "11310"));
		deptList.add(this.createDeptMap("21633", "예금제도팀", "11310"));
		deptList.add(this.createDeptMap("21634", "금융홍보팀", "11310"));
		deptList.add(this.createDeptMap("11320", "예금사업팀", "11300"));
		deptList.add(this.createDeptMap("21625", "예금사업팀", "11320"));
		deptList.add(this.createDeptMap("21626", "예금기획팀", "11320"));
		deptList.add(this.createDeptMap("21627", "영업전략팀", "11320"));
		deptList.add(this.createDeptMap("21628", "지불결제팀", "11320"));
		deptList.add(this.createDeptMap("11330", "보험기획팀", "11300"));
		deptList.add(this.createDeptMap("21618", "보험기획팀", "11330"));
		deptList.add(this.createDeptMap("21619", "보험기획팀", "11330"));
		deptList.add(this.createDeptMap("21620", "제도개선팀", "11330"));
		deptList.add(this.createDeptMap("21621", "상품개발팀", "11330"));
		deptList.add(this.createDeptMap("21622", "보험회계팀", "11330"));
		deptList.add(this.createDeptMap("21623", "통상대응팀", "11330"));
		deptList.add(this.createDeptMap("21624", "총괄팀", "11330"));
		deptList.add(this.createDeptMap("21078", "금융사업단장실", "11300"));
		deptList.add(this.createDeptMap("21079", "금융사업단장", "21078"));
		deptList.add(this.createDeptMap("21614", "보험사업팀", "11300"));
		deptList.add(this.createDeptMap("21646", "보험사업팀", "21614"));
		deptList.add(this.createDeptMap("21647", "영업전략팀", "21614"));
		deptList.add(this.createDeptMap("21648", "교육홍보팀", "21614"));
		deptList.add(this.createDeptMap("21649", "송무팀", "21614"));
		deptList.add(this.createDeptMap("21615", "자금운용팀", "11300"));
		deptList.add(this.createDeptMap("21641", "자금운용팀", "21615"));
		deptList.add(this.createDeptMap("21642", "운용기획팀", "21615"));
		deptList.add(this.createDeptMap("21643", "예금자금운용팀", "21615"));
		deptList.add(this.createDeptMap("21644", "보험적립금운용팀", "21615"));
		deptList.add(this.createDeptMap("21645", "운용제도팀", "21615"));
		deptList.add(this.createDeptMap("21616", "리스크관리팀", "11300"));
		deptList.add(this.createDeptMap("21638", "리스크관리팀", "21616"));
		deptList.add(this.createDeptMap("21639", "예금리스크팀", "21616"));
		deptList.add(this.createDeptMap("21640", "보험리스크팀", "21616"));
		deptList.add(this.createDeptMap("21617", "전자금융팀", "11300"));
		deptList.add(this.createDeptMap("21636", "전자금융팀", "21617"));
		deptList.add(this.createDeptMap("21637", "정보화", "21617"));
		deptList.add(this.createDeptMap("21650", "전자금융팀", "21617"));
		deptList.add(this.createDeptMap("11400", "감사팀", "11000"));
		deptList.add(this.createDeptMap("11410", "감사팀", "11400"));
		deptList.add(this.createDeptMap("21003", "감사2팀", "11410"));
		deptList.add(this.createDeptMap("21004", "감사3팀", "11410"));
		deptList.add(this.createDeptMap("21005", "감사1팀", "11410"));
		deptList.add(this.createDeptMap("21023", "감사팀", "11410"));
		deptList.add(this.createDeptMap("11500", "총무팀", "11000"));
		deptList.add(this.createDeptMap("11510", "총무팀", "11500"));
		deptList.add(this.createDeptMap("21527", "서무팀", "11510"));
		deptList.add(this.createDeptMap("21652", "서무팀", "21527"));
		deptList.add(this.createDeptMap("21653", "문서실", "21527"));
		deptList.add(this.createDeptMap("21654", "대회의실", "21527"));
		deptList.add(this.createDeptMap("21656", "중회의실", "21527"));
		deptList.add(this.createDeptMap("21657", "전산교육장", "21527"));
		deptList.add(this.createDeptMap("21658", "행정자료실", "21527"));
		deptList.add(this.createDeptMap("21528", "인사팀", "11510"));
		deptList.add(this.createDeptMap("21529", "관리팀", "11510"));
		deptList.add(this.createDeptMap("21530", "안전/보안팀", "11510"));
		deptList.add(this.createDeptMap("21531", "총무팀", "11510"));
		deptList.add(this.createDeptMap("21532", "본부실", "11000"));
		deptList.add(this.createDeptMap("21533", "본부실", "21532"));
		deptList.add(this.createDeptMap("12000", "교육원", "00000"));
		deptList.add(this.createDeptMap("12010", "관리과", "12000"));
		deptList.add(this.createDeptMap("22021", "관리과", "12010"));
		deptList.add(this.createDeptMap("22022", "회계", "12010"));
		deptList.add(this.createDeptMap("22034", "세입", "22022"));
		deptList.add(this.createDeptMap("22035", "세출", "22022"));
		deptList.add(this.createDeptMap("22036", "계약", "22022"));
		deptList.add(this.createDeptMap("22037", "회계팀", "22022"));
		deptList.add(this.createDeptMap("22038", "물품", "22022"));
		deptList.add(this.createDeptMap("22023", "서무", "12010"));
		deptList.add(this.createDeptMap("22039", "복무.서무", "22023"));
		deptList.add(this.createDeptMap("22041", "급여.물품", "22023"));
		deptList.add(this.createDeptMap("22043", "시설임대.보안", "22023"));
		deptList.add(this.createDeptMap("22044", "직장교육", "22023"));
		deptList.add(this.createDeptMap("22045", "정원.인사", "22023"));
		deptList.add(this.createDeptMap("22046", "도서실", "22023"));
		deptList.add(this.createDeptMap("22047", "예산.행사", "22023"));
		deptList.add(this.createDeptMap("22048", "서무팀", "22023"));
		deptList.add(this.createDeptMap("22024", "시설", "12010"));
		deptList.add(this.createDeptMap("22049", "체육동관리", "22024"));
		deptList.add(this.createDeptMap("22051", "조경", "22024"));
		deptList.add(this.createDeptMap("22052", "냉.난방", "22024"));
		deptList.add(this.createDeptMap("22053", "전기.통신", "22024"));
		deptList.add(this.createDeptMap("22054", "전기.소방", "22024"));
		deptList.add(this.createDeptMap("22055", "건축.안전", "22024"));
		deptList.add(this.createDeptMap("22056", "서무.물품", "22024"));
		deptList.add(this.createDeptMap("22057", "시설팀", "22024"));
		deptList.add(this.createDeptMap("22025", "관리", "12010"));
		deptList.add(this.createDeptMap("22058", "생활관관리", "22025"));
		deptList.add(this.createDeptMap("22059", "일반서무", "22025"));
		deptList.add(this.createDeptMap("22061", "의무실", "22025"));
		deptList.add(this.createDeptMap("22062", "식당관리", "22025"));
		deptList.add(this.createDeptMap("22063", "예산.차량", "22025"));
		deptList.add(this.createDeptMap("22064", "관리팀", "22025"));
		deptList.add(this.createDeptMap("22026", "전산.방송", "12010"));
		deptList.add(this.createDeptMap("22065", "서버관리", "22026"));
		deptList.add(this.createDeptMap("22066", "학사행정", "22026"));
		deptList.add(this.createDeptMap("22067", "전산.방송팀", "22026"));
		deptList.add(this.createDeptMap("22068", "종합방송실", "22026"));
		deptList.add(this.createDeptMap("22027", "교무", "12010"));
		deptList.add(this.createDeptMap("22069", "교재.강의실", "22027"));
		deptList.add(this.createDeptMap("22071", "교수능력발전", "22027"));
		deptList.add(this.createDeptMap("22072", "시간표.강사", "22027"));
		deptList.add(this.createDeptMap("22073", "교무팀", "22027"));
		deptList.add(this.createDeptMap("22028", "학생", "12010"));
		deptList.add(this.createDeptMap("22074", "서무.물품", "22028"));
		deptList.add(this.createDeptMap("22075", "여비.복무", "22028"));
		deptList.add(this.createDeptMap("22076", "선발.학적", "22028"));
		deptList.add(this.createDeptMap("22077", "생활지도", "22028"));
		deptList.add(this.createDeptMap("22078", "학생팀", "22028"));
		deptList.add(this.createDeptMap("22029", "당직실", "12010"));
		deptList.add(this.createDeptMap("12020", "교학과", "12000"));
		deptList.add(this.createDeptMap("22001", "경영교육실", "12020"));
		deptList.add(this.createDeptMap("22031", "금융교육실", "12020"));
		deptList.add(this.createDeptMap("22032", "정보통신교육실", "12020"));
		deptList.add(this.createDeptMap("22033", "조달교육실", "12020"));
		deptList.add(this.createDeptMap("22042", "교학과", "12020"));
		deptList.add(this.createDeptMap("12030", "기획연구과", "12000"));
		deptList.add(this.createDeptMap("22002", "기획", "12030"));
		deptList.add(this.createDeptMap("22007", "업무조정/지원", "22002"));
		deptList.add(this.createDeptMap("22008", "홈페이지", "22002"));
		deptList.add(this.createDeptMap("22009", "기획팀", "22002"));
		deptList.add(this.createDeptMap("22010", "교육계획(1)", "22002"));
		deptList.add(this.createDeptMap("22011", "교육계획(2)", "22002"));
		deptList.add(this.createDeptMap("22003", "노조지부실", "12030"));
		deptList.add(this.createDeptMap("22013", "지부", "22003"));
		deptList.add(this.createDeptMap("22004", "CYBER교육", "12030"));
		deptList.add(this.createDeptMap("22014", "시스템운영", "22004"));
		deptList.add(this.createDeptMap("22015", "교과목과정개발", "22004"));
		deptList.add(this.createDeptMap("22016", "원격교육", "22004"));
		deptList.add(this.createDeptMap("22017", "CYBER교육팀", "22004"));
		deptList.add(this.createDeptMap("22005", "심사평가", "12030"));
		deptList.add(this.createDeptMap("22018", "학습평가", "22005"));
		deptList.add(this.createDeptMap("22019", "심사평가", "22005"));
		deptList.add(this.createDeptMap("22020", "심사평가팀", "22005"));
		deptList.add(this.createDeptMap("22006", "기획연구과", "12030"));
		deptList.add(this.createDeptMap("22079", "원장실", "12000"));
		deptList.add(this.createDeptMap("22081", "부속실", "22079"));
		deptList.add(this.createDeptMap("22082", "원장", "22079"));
		deptList.add(this.createDeptMap("22083", "체신금융진흥회", "12000"));
		deptList.add(this.createDeptMap("13000", "우정사업정보센터", "00000"));
		deptList.add(this.createDeptMap("13010", "업무과", "13000"));
		deptList.add(this.createDeptMap("23001", "조달물류정보팀", "13010"));
		deptList.add(this.createDeptMap("23036", "통합접수팀", "23001"));
		deptList.add(this.createDeptMap("23037", "공통정보팀", "23001"));
		deptList.add(this.createDeptMap("23038", "판매정보팀", "23001"));
		deptList.add(this.createDeptMap("23002", "조달물류운영당당", "13010"));
		deptList.add(this.createDeptMap("23035", "운송정보팀", "23002"));
		deptList.add(this.createDeptMap("23062", "운영정보팀", "23002"));
		deptList.add(this.createDeptMap("23063", "종적정보팀", "23002"));
		deptList.add(this.createDeptMap("23106", "집배정보팀", "23002"));
		deptList.add(this.createDeptMap("23107", "국제정보팀", "23002"));
		deptList.add(this.createDeptMap("23003", "전파팀", "13010"));
		deptList.add(this.createDeptMap("23056", "무선국허가팀", "23003"));
		deptList.add(this.createDeptMap("23057", "전파사용료팀", "23003"));
		deptList.add(this.createDeptMap("23004", "조달/전파시스템팀", "13010"));
		deptList.add(this.createDeptMap("23054", "시스템1팀", "23004"));
		deptList.add(this.createDeptMap("23055", "시스템2팀", "23004"));
		deptList.add(this.createDeptMap("23092", "장비도입팀", "23004"));
		deptList.add(this.createDeptMap("23093", "유지보수팀", "23004"));
		deptList.add(this.createDeptMap("23034", "업무과", "13010"));
		deptList.add(this.createDeptMap("13020", "경영지원실", "13000"));
		deptList.add(this.createDeptMap("23005", "서무팀", "13020"));
		deptList.add(this.createDeptMap("23026", "기획팀", "23005"));
		deptList.add(this.createDeptMap("23027", "지원팀", "23005"));
		deptList.add(this.createDeptMap("23029", "인사팀", "23005"));
		deptList.add(this.createDeptMap("23007", "경영정보화팀", "13020"));
		deptList.add(this.createDeptMap("23031", "ERP팀/세입팀", "23007"));
		deptList.add(this.createDeptMap("23032", "전산관리팀", "23007"));
		deptList.add(this.createDeptMap("23094", "정보보호팀", "23007"));
		deptList.add(this.createDeptMap("23095", "경영시스템팀", "23007"));
		deptList.add(this.createDeptMap("23008", "회계팀", "13020"));
		deptList.add(this.createDeptMap("23033", "회계1팀", "23008"));
		deptList.add(this.createDeptMap("23096", "회계2팀", "23008"));
		deptList.add(this.createDeptMap("23019", "경영지원실장", "13020"));
		deptList.add(this.createDeptMap("23097", "시설팀", "13020"));
		deptList.add(this.createDeptMap("23098", "전기팀", "23097"));
		deptList.add(this.createDeptMap("23099", "설비팀", "23097"));
		deptList.add(this.createDeptMap("13030", "금융운영과", "13000"));
		deptList.add(this.createDeptMap("23009", "금융총괄팀", "13030"));
		deptList.add(this.createDeptMap("23044", "업무총괄팀", "23009"));
		deptList.add(this.createDeptMap("23045", "공통S/W팀", "23009"));
		deptList.add(this.createDeptMap("23100", "정산관리팀", "23009"));
		deptList.add(this.createDeptMap("23010", "예금업무총괄팀", "13030"));
		deptList.add(this.createDeptMap("23047", "요구불정보팀", "23010"));
		deptList.add(this.createDeptMap("23076", "저축성정보팀", "23010"));
		deptList.add(this.createDeptMap("23101", "온라인정보팀", "23010"));
		deptList.add(this.createDeptMap("23011", "환/수탁팀", "13030"));
		deptList.add(this.createDeptMap("23041", "지로팀", "23011"));
		deptList.add(this.createDeptMap("23042", "환연금팀", "23011"));
		deptList.add(this.createDeptMap("23012", "대외팀", "13030"));
		deptList.add(this.createDeptMap("23051", "CD팀", "23012"));
		deptList.add(this.createDeptMap("23052", "전자금융팀", "23012"));
		deptList.add(this.createDeptMap("23053", "타행환팀", "23012"));
		deptList.add(this.createDeptMap("23102", "대외개발팀", "23012"));
		deptList.add(this.createDeptMap("23039", "금융운영과", "13030"));
		deptList.add(this.createDeptMap("13040", "금융시스템과", "13000"));
		deptList.add(this.createDeptMap("23014", "시스템운용팀", "13040"));
		deptList.add(this.createDeptMap("23072", "업무지원팀", "23014"));
		deptList.add(this.createDeptMap("23073", "시스템1팀", "23014"));
		deptList.add(this.createDeptMap("23074", "시스템2팀", "23014"));
		deptList.add(this.createDeptMap("23103", "중앙통제팀", "23014"));
		deptList.add(this.createDeptMap("23015", "보험팀", "13040"));
		deptList.add(this.createDeptMap("23065", "즉시지급팀", "23015"));
		deptList.add(this.createDeptMap("23066", "청약심사/유지팀", "23015"));
		deptList.add(this.createDeptMap("23104", "심사지급팀", "23015"));
		deptList.add(this.createDeptMap("23016", "정보지원팀", "13040"));
		deptList.add(this.createDeptMap("23067", "금융영업팀", "23016"));
		deptList.add(this.createDeptMap("23068", "고객관리팀", "23016"));
		deptList.add(this.createDeptMap("23105", "DW/CRM팀", "23016"));
		deptList.add(this.createDeptMap("23017", "통신/금융장비팀", "13040"));
		deptList.add(this.createDeptMap("23069", "장비도입/유지보수팀", "23017"));
		deptList.add(this.createDeptMap("23071", "N/W운영관리팀", "23017"));
		deptList.add(this.createDeptMap("23064", "금융시스템과", "13040"));
		deptList.add(this.createDeptMap("23018", "센터장실", "13000"));
		deptList.add(this.createDeptMap("23075", "예금보험지원단", "13000"));
		deptList.add(this.createDeptMap("23118", "정보기반과", "13000"));
		deptList.add(this.createDeptMap("23122", "정보기반과", "23118"));
		deptList.add(this.createDeptMap("23123", "정보전략팀", "23118"));
		deptList.add(this.createDeptMap("23124", "정보보호팀", "23118"));
		deptList.add(this.createDeptMap("23125", "정보자원관리팀", "23118"));
		deptList.add(this.createDeptMap("23126", "품질관리팀", "23118"));
		deptList.add(this.createDeptMap("23127", "IT교육팀", "23118"));
		deptList.add(this.createDeptMap("23119", "조달정보과", "13000"));
		deptList.add(this.createDeptMap("23128", "조달정보과", "23119"));
		deptList.add(this.createDeptMap("23129", "조달개발팀", "23119"));
		deptList.add(this.createDeptMap("23130", "조달영업팀", "23119"));
		deptList.add(this.createDeptMap("23131", "조달물류팀", "23119"));
		deptList.add(this.createDeptMap("23132", "인터넷우체국팀", "23119"));
		deptList.add(this.createDeptMap("23147", "조달운영팀", "23119"));
		deptList.add(this.createDeptMap("23148", "조달기반팀", "23119"));
		deptList.add(this.createDeptMap("23120", "금융정보과", "13000"));
		deptList.add(this.createDeptMap("23133", "금융정보과", "23120"));
		deptList.add(this.createDeptMap("23134", "금융계정개발팀", "23120"));
		deptList.add(this.createDeptMap("23135", "금융공통개발팀1", "23120"));
		deptList.add(this.createDeptMap("23136", "금융시스템고도화 추진단", "23120"));
		deptList.add(this.createDeptMap("23137", "전자금융개발팀", "23120"));
		deptList.add(this.createDeptMap("23138", "금융지원팀", "23120"));
		deptList.add(this.createDeptMap("23139", "예금팀", "23120"));
		deptList.add(this.createDeptMap("23140", "보험팀", "23120"));
		deptList.add(this.createDeptMap("23141", "금융정보팀", "23120"));
		deptList.add(this.createDeptMap("23121", "경영지원과", "13000"));
		deptList.add(this.createDeptMap("23142", "경영지원과", "23121"));
		deptList.add(this.createDeptMap("23143", "총무팀", "23121"));
		deptList.add(this.createDeptMap("23144", "경영정보팀", "23121"));
		deptList.add(this.createDeptMap("23145", "회계팀", "23121"));
		deptList.add(this.createDeptMap("23146", "전파팀", "23121"));
		deptList.add(this.createDeptMap("14000", "조달사무소", "00000"));
		deptList.add(this.createDeptMap("14010", "관리과", "14000"));
		deptList.add(this.createDeptMap("24001", "서무팀", "14010"));
		deptList.add(this.createDeptMap("24002", "인사팀", "14010"));
		deptList.add(this.createDeptMap("24003", "우표팀", "14010"));
		deptList.add(this.createDeptMap("24004", "지출팀", "14010"));
		deptList.add(this.createDeptMap("24005", "관리과", "14010"));
		deptList.add(this.createDeptMap("14020", "계약과", "14000"));
		deptList.add(this.createDeptMap("24006", "용품계약팀", "14020"));
		deptList.add(this.createDeptMap("24023", "원인행위팀", "14020"));
		deptList.add(this.createDeptMap("24024", "인쇄계약팀", "14020"));
		deptList.add(this.createDeptMap("24025", "외자계약팀", "14020"));
		deptList.add(this.createDeptMap("24026", "수급팀", "14020"));
		deptList.add(this.createDeptMap("24027", "당직실", "14020"));
		deptList.add(this.createDeptMap("24028", "계약과", "14020"));
		deptList.add(this.createDeptMap("24029", "공사계약팀", "14020"));
		deptList.add(this.createDeptMap("14030", "저장과", "14000"));
		deptList.add(this.createDeptMap("24017", "인쇄물발송팀", "14030"));
		deptList.add(this.createDeptMap("24018", "우표및수표발송팀", "14030"));
		deptList.add(this.createDeptMap("24019", "용품발송팀", "14030"));
		deptList.add(this.createDeptMap("24020", "물품검수팀", "14030"));
		deptList.add(this.createDeptMap("24021", "우표검수팀", "14030"));
		deptList.add(this.createDeptMap("24022", "저장과", "14030"));
		deptList.add(this.createDeptMap("14040", "설계과", "14000"));
		deptList.add(this.createDeptMap("24012", "설계과", "14040"));
		deptList.add(this.createDeptMap("24013", "기계설계팀", "14040"));
		deptList.add(this.createDeptMap("24014", "전기설계팀", "14040"));
		deptList.add(this.createDeptMap("24015", "건축설계", "14040"));
		deptList.add(this.createDeptMap("24016", "예산팀", "14040"));
		deptList.add(this.createDeptMap("14050", "건축1과", "14000"));
		deptList.add(this.createDeptMap("24036", "건축1팀", "14050"));
		deptList.add(this.createDeptMap("24037", "건축1과", "14050"));
		deptList.add(this.createDeptMap("14060", "건축2과", "14000"));
		deptList.add(this.createDeptMap("24034", "건축2팀", "14060"));
		deptList.add(this.createDeptMap("24035", "건축2과", "14060"));
		deptList.add(this.createDeptMap("14070", "기계과", "14000"));
		deptList.add(this.createDeptMap("24009", "기계팀", "14070"));
		deptList.add(this.createDeptMap("24011", "기계과", "14070"));
		deptList.add(this.createDeptMap("14080", "전기과", "14000"));
		deptList.add(this.createDeptMap("24007", "전기팀", "14080"));
		deptList.add(this.createDeptMap("24008", "전기과", "14080"));
		deptList.add(this.createDeptMap("24031", "부속실", "14000"));
		deptList.add(this.createDeptMap("24032", "소장실", "14000"));
		deptList.add(this.createDeptMap("24033", "소장", "24032"));
		deptList.add(this.createDeptMap("24038", "조달계획과", "14000"));
		deptList.add(this.createDeptMap("24039", "조달운영과", "14000"));
		deptList.add(this.createDeptMap("24040", "자산개발과", "14000"));
		deptList.add(this.createDeptMap("24041", "건축과", "14000"));
		deptList.add(this.createDeptMap("24042", "설비과", "14000"));
		deptList.add(this.createDeptMap("24043", "물류자동학과", "14000"));
		deptList.add(this.createDeptMap("15000", "체신청(제주청제외)", "00000"));
		deptList.add(this.createDeptMap("15010", "영업국", "15000"));
		deptList.add(this.createDeptMap("15011", "우정계획팀", "15010"));
		deptList.add(this.createDeptMap("25006", "전산실", "15011"));
		deptList.add(this.createDeptMap("25007", "우정계획팀", "15011"));
		deptList.add(this.createDeptMap("15012", "조달영업과", "15010"));
		deptList.add(this.createDeptMap("25008", "조달영업팀", "15012"));
		deptList.add(this.createDeptMap("15013", "예금영업팀", "15010"));
		deptList.add(this.createDeptMap("25005", "예금영업팀", "15013"));
		deptList.add(this.createDeptMap("15014", "보험영업팀", "15010"));
		deptList.add(this.createDeptMap("25004", "보험영업팀", "15014"));
		deptList.add(this.createDeptMap("15015", "우정영업과", "15010"));
		deptList.add(this.createDeptMap("15016", "조달물류과", "15010"));
		deptList.add(this.createDeptMap("15017", "금융영업과", "15010"));
		deptList.add(this.createDeptMap("25003", "영업국장", "15010"));
		deptList.add(this.createDeptMap("25096", "테스트", "15010"));
		deptList.add(this.createDeptMap("15030", "업무국", "15000"));
		deptList.add(this.createDeptMap("15031", "집배업무팀", "15030"));
		deptList.add(this.createDeptMap("25024", "집배업무팀", "15031"));
		deptList.add(this.createDeptMap("15032", "운송업무팀", "15030"));
		deptList.add(this.createDeptMap("25023", "운송업무팀", "15032"));
		deptList.add(this.createDeptMap("15033", "소포업무팀", "15030"));
		deptList.add(this.createDeptMap("25022", "소포업무팀", "15033"));
		deptList.add(this.createDeptMap("15034", "국제업무팀", "15030"));
		deptList.add(this.createDeptMap("25021", "국제업무팀", "15034"));
		deptList.add(this.createDeptMap("25025", "업무국장", "15030"));
		deptList.add(this.createDeptMap("15100", "사업지원국", "15000"));
		deptList.add(this.createDeptMap("15110", "서무과", "15100"));
		deptList.add(this.createDeptMap("15111", "총무과", "15100"));
		deptList.add(this.createDeptMap("25011", "당직실", "15111"));
		deptList.add(this.createDeptMap("25012", "문서실", "15111"));
		deptList.add(this.createDeptMap("25013", "총무팀", "15111"));
		deptList.add(this.createDeptMap("25014", "현관안내(주간)", "15111"));
		deptList.add(this.createDeptMap("25015", "운전원실", "15111"));
		deptList.add(this.createDeptMap("25071", "민원실", "15111"));
		deptList.add(this.createDeptMap("25075", "전기.보일러", "15111"));
		deptList.add(this.createDeptMap("25076", "인사", "15111"));
		deptList.add(this.createDeptMap("25077", "서무", "15111"));
		deptList.add(this.createDeptMap("25078", "교육", "15111"));
		deptList.add(this.createDeptMap("25081", "발간실", "15111"));
		deptList.add(this.createDeptMap("25082", "조직", "15111"));
		deptList.add(this.createDeptMap("15120", "관리과", "15100"));
		deptList.add(this.createDeptMap("15130", "정보통신과", "15100"));
		deptList.add(this.createDeptMap("15140", "통신업무과", "15100"));
		deptList.add(this.createDeptMap("15150", "전파업무과", "15100"));
		deptList.add(this.createDeptMap("15160", "전파기술과", "15100"));
		deptList.add(this.createDeptMap("15170", "회계정보과", "15100"));
		deptList.add(this.createDeptMap("25016", "설계실", "15170"));
		deptList.add(this.createDeptMap("25017", "회계정보팀", "15170"));
		deptList.add(this.createDeptMap("15180", "관재과", "15100"));
		deptList.add(this.createDeptMap("25009", "사업지원국장", "15100"));
		deptList.add(this.createDeptMap("25018", "인력계획과", "15100"));
		deptList.add(this.createDeptMap("25019", "인력계획팀", "25018"));
		deptList.add(this.createDeptMap("25083", "대기실", "15100"));
		deptList.add(this.createDeptMap("15300", "업무1국", "15000"));
		deptList.add(this.createDeptMap("15310", "우정관리1과", "15300"));
		deptList.add(this.createDeptMap("15320", "우무1과", "15300"));
		deptList.add(this.createDeptMap("15330", "운용1과", "15300"));
		deptList.add(this.createDeptMap("15340", "체신금융1과", "15300"));
		deptList.add(this.createDeptMap("15350", "국제과", "15300"));
		deptList.add(this.createDeptMap("15400", "업무2국", "15000"));
		deptList.add(this.createDeptMap("15410", "우정관리2과", "15400"));
		deptList.add(this.createDeptMap("15420", "우무2과", "15400"));
		deptList.add(this.createDeptMap("15430", "운용2과", "15400"));
		deptList.add(this.createDeptMap("15440", "체신금융2과", "15400"));
		deptList.add(this.createDeptMap("15500", "전파국", "15000"));
		deptList.add(this.createDeptMap("15510", "업무1과", "15500"));
		deptList.add(this.createDeptMap("15520", "업무2과", "15500"));
		deptList.add(this.createDeptMap("15530", "기술과", "15500"));
		deptList.add(this.createDeptMap("25048", "전파국장", "15500"));
		deptList.add(this.createDeptMap("15600", "감사관실", "15000"));
		deptList.add(this.createDeptMap("15610", "감사관실", "15600"));
		deptList.add(this.createDeptMap("25042", "감사실", "15610"));
		deptList.add(this.createDeptMap("25043", "감사관", "15610"));
		deptList.add(this.createDeptMap("15620", "고객지원팀관실", "15600"));
		deptList.add(this.createDeptMap("25001", "청장실", "15000"));
		deptList.add(this.createDeptMap("25002", "청장", "25001"));
		deptList.add(this.createDeptMap("25060", "부속실", "25001"));
		deptList.add(this.createDeptMap("25026", "정보통신국", "15000"));
		deptList.add(this.createDeptMap("25027", "정보통신국장", "25026"));
		deptList.add(this.createDeptMap("25028", "전파기술팀", "25026"));
		deptList.add(this.createDeptMap("25029", "전파기술팀", "25028"));
		deptList.add(this.createDeptMap("25031", "전파업무2팀", "25026"));
		deptList.add(this.createDeptMap("25032", "전파업무2팀", "25031"));
		deptList.add(this.createDeptMap("25033", "전파업무1팀", "25026"));
		deptList.add(this.createDeptMap("25034", "전파업무1팀", "25033"));
		deptList.add(this.createDeptMap("25044", "통신업무팀", "25026"));
		deptList.add(this.createDeptMap("25035", "통신업무팀", "25044"));
		deptList.add(this.createDeptMap("25045", "정보통신팀", "25026"));
		deptList.add(this.createDeptMap("25036", "정보통신팀", "25045"));
		deptList.add(this.createDeptMap("25079", "전파업무팀", "25026"));
		deptList.add(this.createDeptMap("25080", "전파업무팀", "25079"));
		deptList.add(this.createDeptMap("25037", "체신노조", "15000"));
		deptList.add(this.createDeptMap("25038", "지방본부", "25037"));
		deptList.add(this.createDeptMap("25039", "노조사무실", "25038"));
		deptList.add(this.createDeptMap("25041", "위원장", "25038"));
		deptList.add(this.createDeptMap("25046", "우정사업국", "15000"));
		deptList.add(this.createDeptMap("25049", "우정계획과", "25046"));
		deptList.add(this.createDeptMap("25050", "우정계획팀", "25049"));
		deptList.add(this.createDeptMap("25058", "전산팀", "25049"));
		deptList.add(this.createDeptMap("25059", "금융분산시스템", "25049"));
		deptList.add(this.createDeptMap("25072", "총괄업무", "25049"));
		deptList.add(this.createDeptMap("25073", "국사관리", "25049"));
		deptList.add(this.createDeptMap("25074", "경영평가", "25049"));
		deptList.add(this.createDeptMap("25084", "예산.노사", "25049"));
		deptList.add(this.createDeptMap("25085", "전산센터", "25049"));
		 
		 this.deptList = deptList;
	}

	private void initDepartmentLevel1() {
		List<Map<String, Object>> deptList = new ArrayList<Map<String, Object>>();
		deptList.add(this.createDeptMap("11000", "우정사업본부", "00000"));
		deptList.add(this.createDeptMap("12000", "교육원", "00000"));
		deptList.add(this.createDeptMap("13000", "우정사업정보센터", "00000"));
		deptList.add(this.createDeptMap("14000", "조달사무소", "00000"));
		deptList.add(this.createDeptMap("15000", "체신청(제주청제외)", "00000"));
		deptList.add(this.createDeptMap("15700", "제주청", "00000"));
		deptList.add(this.createDeptMap("16000", "우체국", "00000"));
		deptList.add(this.createDeptMap("16800", "국제우체국", "00000"));
		deptList.add(this.createDeptMap("16900", "조달집중국", "00000"));
		deptList.add(this.createDeptMap("16990", "관내우체국(6급이하)", "00000"));
		deptList.add(this.createDeptMap("18000", "물류센터", "00000"));
		
		this.deptListLvl1 = deptList;
	}
	
	private void initDepartmentLevel2() {
		List<Map<String, Object>> deptList = new ArrayList<Map<String, Object>>();
		
		deptList.add(this.createDeptMap("11100", "경영기획실", "11000"));
		deptList.add(this.createDeptMap("11200", "조달사업단", "11000"));
		deptList.add(this.createDeptMap("11300", "금융사업단", "11000"));
		deptList.add(this.createDeptMap("11400", "감사팀", "11000"));
		deptList.add(this.createDeptMap("11500", "총무팀", "11000"));
		deptList.add(this.createDeptMap("21532", "본부실", "11000"));
		deptList.add(this.createDeptMap("12010", "관리과", "12000"));
		deptList.add(this.createDeptMap("12020", "교학과", "12000"));
		deptList.add(this.createDeptMap("12030", "기획연구과", "12000"));
		deptList.add(this.createDeptMap("22079", "원장실", "12000"));
		deptList.add(this.createDeptMap("22083", "체신금융진흥회", "12000"));
		deptList.add(this.createDeptMap("13010", "업무과", "13000"));
		deptList.add(this.createDeptMap("13020", "경영지원실", "13000"));
		deptList.add(this.createDeptMap("13030", "금융운영과", "13000"));
		deptList.add(this.createDeptMap("13040", "금융시스템과", "13000"));
		deptList.add(this.createDeptMap("23018", "센터장실", "13000"));
		deptList.add(this.createDeptMap("23075", "예금보험지원단", "13000"));
		deptList.add(this.createDeptMap("23118", "정보기반과", "13000"));
		deptList.add(this.createDeptMap("23119", "조달정보과", "13000"));
		deptList.add(this.createDeptMap("23120", "금융정보과", "13000"));
		deptList.add(this.createDeptMap("23121", "경영지원과", "13000"));
		deptList.add(this.createDeptMap("14010", "관리과", "14000"));
		deptList.add(this.createDeptMap("14020", "계약과", "14000"));
		deptList.add(this.createDeptMap("14030", "저장과", "14000"));
		deptList.add(this.createDeptMap("14040", "설계과", "14000"));
		deptList.add(this.createDeptMap("14050", "건축1과", "14000"));
		deptList.add(this.createDeptMap("14060", "건축2과", "14000"));
		deptList.add(this.createDeptMap("14070", "기계과", "14000"));
		deptList.add(this.createDeptMap("14080", "전기과", "14000"));
		deptList.add(this.createDeptMap("24031", "부속실", "14000"));
		deptList.add(this.createDeptMap("24032", "소장실", "14000"));
		deptList.add(this.createDeptMap("24038", "조달계획과", "14000"));
		deptList.add(this.createDeptMap("24039", "조달운영과", "14000"));
		deptList.add(this.createDeptMap("24040", "자산개발과", "14000"));
		deptList.add(this.createDeptMap("24041", "건축과", "14000"));
		deptList.add(this.createDeptMap("24042", "설비과", "14000"));
		deptList.add(this.createDeptMap("24043", "물류자동학과", "14000"));
		deptList.add(this.createDeptMap("15010", "영업국", "15000"));
		deptList.add(this.createDeptMap("15030", "업무국", "15000"));
		deptList.add(this.createDeptMap("15100", "사업지원국", "15000"));
		deptList.add(this.createDeptMap("15300", "업무1국", "15000"));
		deptList.add(this.createDeptMap("15400", "업무2국", "15000"));
		deptList.add(this.createDeptMap("15500", "전파국", "15000"));
		deptList.add(this.createDeptMap("15600", "감사관실", "15000"));
		deptList.add(this.createDeptMap("25001", "청장실", "15000"));
		deptList.add(this.createDeptMap("25026", "정보통신국", "15000"));
		deptList.add(this.createDeptMap("25037", "체신노조", "15000"));
		deptList.add(this.createDeptMap("25046", "우정사업국", "15000"));
		deptList.add(this.createDeptMap("25062", "정보통신실", "15000"));
		deptList.add(this.createDeptMap("25092", "금융영업실", "15000"));
		deptList.add(this.createDeptMap("15710", "지도과", "15700"));
		deptList.add(this.createDeptMap("15711", "우정사업팀", "15700"));
		deptList.add(this.createDeptMap("15720", "정보통신팀", "15700"));
		deptList.add(this.createDeptMap("15730", "전파팀", "15700"));
		deptList.add(this.createDeptMap("15740", "관리과", "15700"));
		deptList.add(this.createDeptMap("15741", "사업지원팀", "15700"));
		deptList.add(this.createDeptMap("15750", "감사실", "15700"));
		deptList.add(this.createDeptMap("16110", "영업과", "16000"));
		deptList.add(this.createDeptMap("16120", "조달영업과", "16000"));
		deptList.add(this.createDeptMap("16130", "배달서비스과", "16000"));
		deptList.add(this.createDeptMap("16140", "조달분류과", "16000"));
		deptList.add(this.createDeptMap("16150", "조달물류과", "16000"));
		deptList.add(this.createDeptMap("16160", "금융영업과", "16000"));
		deptList.add(this.createDeptMap("16170", "업무과", "16000"));
		deptList.add(this.createDeptMap("16180", "업무1과", "16000"));
		deptList.add(this.createDeptMap("16190", "업무2과", "16000"));
		deptList.add(this.createDeptMap("161B0", "지원과", "16000"));
		deptList.add(this.createDeptMap("161C0", "지도실", "16000"));
		deptList.add(this.createDeptMap("161D0", "경영지도실", "16000"));
		deptList.add(this.createDeptMap("161E0", "마케팅지원실", "16000"));
		deptList.add(this.createDeptMap("26032", "사서함", "16000"));
		deptList.add(this.createDeptMap("26033", "배달", "16000"));
		deptList.add(this.createDeptMap("26034", "민원안내", "16000"));
		deptList.add(this.createDeptMap("26035", "중대본부", "16000"));
		deptList.add(this.createDeptMap("26036", "국장실", "16000"));
		deptList.add(this.createDeptMap("26037", "노조지부", "16000"));
		deptList.add(this.createDeptMap("26039", "민원실", "16000"));
		deptList.add(this.createDeptMap("26133", "조달물류과", "16000"));
		deptList.add(this.createDeptMap("26136", "중대본부2", "16000"));
		deptList.add(this.createDeptMap("26151", "소포과", "16000"));
		deptList.add(this.createDeptMap("26170", "조달물류1과", "16000"));
		deptList.add(this.createDeptMap("26171", "조달물류2과", "16000"));
		deptList.add(this.createDeptMap("26198", "조달집중과", "16000"));
		deptList.add(this.createDeptMap("26207", "시설운영과", "16000"));
		deptList.add(this.createDeptMap("26222", "소포영업과", "16000"));
		deptList.add(this.createDeptMap("26223", "고객지원실", "16000"));
		deptList.add(this.createDeptMap("26230", "소포실", "16000"));
		deptList.add(this.createDeptMap("16810", "영업과", "16800"));
		deptList.add(this.createDeptMap("16820", "업무과", "16800"));
		deptList.add(this.createDeptMap("16830", "통상조달과", "16800"));
		deptList.add(this.createDeptMap("16840", "소포조달과", "16800"));
		deptList.add(this.createDeptMap("16850", "안전과", "16800"));
		deptList.add(this.createDeptMap("16860", "안전1과", "16800"));
		deptList.add(this.createDeptMap("16870", "안전2과", "16800"));
		deptList.add(this.createDeptMap("16879", "지원과", "16800"));
		deptList.add(this.createDeptMap("26824", "국장실", "16800"));
		deptList.add(this.createDeptMap("26867", "노조지부", "16800"));
		deptList.add(this.createDeptMap("26880", "지원과", "16800"));
		deptList.add(this.createDeptMap("26881", "항공발송과", "16800"));
		deptList.add(this.createDeptMap("26882", "항공도착과", "16800"));
		deptList.add(this.createDeptMap("26883", "운용1과", "16800"));
		deptList.add(this.createDeptMap("26884", "운용2과", "16800"));
		deptList.add(this.createDeptMap("16910", "물류총괄과", "16900"));
		deptList.add(this.createDeptMap("16920", "물류총괄1과", "16900"));
		deptList.add(this.createDeptMap("16930", "물류총괄2과", "16900"));
		deptList.add(this.createDeptMap("16940", "지원기술과", "16900"));
		deptList.add(this.createDeptMap("16949", "지원과", "16900"));
		deptList.add(this.createDeptMap("16964", "물류소통실", "16900"));
		deptList.add(this.createDeptMap("26797", "영업과", "16900"));
		deptList.add(this.createDeptMap("26944", "계약등기고객전담팀", "16900"));
		deptList.add(this.createDeptMap("26951", "EMS배달부서", "16900"));
		deptList.add(this.createDeptMap("26953", "EMS통관부서", "16900"));
		deptList.add(this.createDeptMap("26965", "기계동력실", "16900"));
		deptList.add(this.createDeptMap("26991", "EMS배달부서", "16990"));
		deptList.add(this.createDeptMap("26992", "EMS통관부서", "16990"));
		deptList.add(this.createDeptMap("26999", "배달", "16990"));
		deptList.add(this.createDeptMap("27001", "금융", "16990"));
		deptList.add(this.createDeptMap("27005", "국제ICC팀", "16990"));
		deptList.add(this.createDeptMap("27006", "접수계", "16990"));
		deptList.add(this.createDeptMap("27007", "소포영업과", "16990"));
		deptList.add(this.createDeptMap("27008", "통상조달계", "16990"));
		deptList.add(this.createDeptMap("28001", "소포물류팀", "18000"));
		deptList.add(this.createDeptMap("28002", "지원팀", "18000"));
		deptList.add(this.createDeptMap("28003", "마케팅팀", "18000"));
		deptList.add(this.createDeptMap("28004", "발착실", "18000"));
		deptList.add(this.createDeptMap("28005", "소포물류과", "18000"));
		deptList.add(this.createDeptMap("28008", "지원과", "18000"));

		
		this.deptListLvl2 = deptList;
	}

	private void initDepartmentLevel3() {
		List<Map<String, Object>> deptList = new ArrayList<Map<String, Object>>();
		
		deptList.add(this.createDeptMap("11110", "경영혁신팀", "11100"));
		deptList.add(this.createDeptMap("11120", "경영정보팀", "11100"));
		deptList.add(this.createDeptMap("11130", "재정관리팀", "11100"));
		deptList.add(this.createDeptMap("21040", "경영기획실장실", "11100"));
		deptList.add(this.createDeptMap("21534", "6시그마팀", "11100"));
		deptList.add(this.createDeptMap("21535", "노사협력팀", "11100"));
		deptList.add(this.createDeptMap("21536", "투자기획팀", "11100"));
		deptList.add(this.createDeptMap("21537", "홍보팀", "11100"));
		deptList.add(this.createDeptMap("11210", "조달정책팀", "11200"));
		deptList.add(this.createDeptMap("11220", "마케팅기획팀", "11200"));
		deptList.add(this.createDeptMap("11230", "물류기획팀", "11200"));
		deptList.add(this.createDeptMap("11240", "국제사업팀", "11200"));
		deptList.add(this.createDeptMap("11250", "소포사업팀", "11200"));
		deptList.add(this.createDeptMap("11260", "우표팀", "11200"));
		deptList.add(this.createDeptMap("21060", "조달사업단장실", "11200"));
		deptList.add(this.createDeptMap("21574", "조달정보기술팀", "11200"));
		deptList.add(this.createDeptMap("11310", "금융총괄팀", "11300"));
		deptList.add(this.createDeptMap("11320", "예금사업팀", "11300"));
		deptList.add(this.createDeptMap("11330", "보험기획팀", "11300"));
		deptList.add(this.createDeptMap("21078", "금융사업단장실", "11300"));
		deptList.add(this.createDeptMap("21614", "보험사업팀", "11300"));
		deptList.add(this.createDeptMap("21615", "자금운용팀", "11300"));
		deptList.add(this.createDeptMap("21616", "리스크관리팀", "11300"));
		deptList.add(this.createDeptMap("21617", "전자금융팀", "11300"));
		deptList.add(this.createDeptMap("11410", "감사팀", "11400"));
		deptList.add(this.createDeptMap("11510", "총무팀", "11500"));
		deptList.add(this.createDeptMap("21533", "본부실", "21532"));
		deptList.add(this.createDeptMap("22021", "관리과", "12010"));
		deptList.add(this.createDeptMap("22022", "회계", "12010"));
		deptList.add(this.createDeptMap("22023", "서무", "12010"));
		deptList.add(this.createDeptMap("22024", "시설", "12010"));
		deptList.add(this.createDeptMap("22025", "관리", "12010"));
		deptList.add(this.createDeptMap("22026", "전산.방송", "12010"));
		deptList.add(this.createDeptMap("22027", "교무", "12010"));
		deptList.add(this.createDeptMap("22028", "학생", "12010"));
		deptList.add(this.createDeptMap("22029", "당직실", "12010"));
		deptList.add(this.createDeptMap("22001", "경영교육실", "12020"));
		deptList.add(this.createDeptMap("22031", "금융교육실", "12020"));
		deptList.add(this.createDeptMap("22032", "정보통신교육실", "12020"));
		deptList.add(this.createDeptMap("22033", "조달교육실", "12020"));
		deptList.add(this.createDeptMap("22042", "교학과", "12020"));
		deptList.add(this.createDeptMap("22002", "기획", "12030"));
		deptList.add(this.createDeptMap("22003", "노조지부실", "12030"));
		deptList.add(this.createDeptMap("22004", "CYBER교육", "12030"));
		deptList.add(this.createDeptMap("22005", "심사평가", "12030"));
		deptList.add(this.createDeptMap("22006", "기획연구과", "12030"));
		deptList.add(this.createDeptMap("22081", "부속실", "22079"));
		deptList.add(this.createDeptMap("22082", "원장", "22079"));
		deptList.add(this.createDeptMap("23001", "조달물류정보팀", "13010"));
		deptList.add(this.createDeptMap("23002", "조달물류운영당당", "13010"));
		deptList.add(this.createDeptMap("23003", "전파팀", "13010"));
		deptList.add(this.createDeptMap("23004", "조달/전파시스템팀", "13010"));
		deptList.add(this.createDeptMap("23034", "업무과", "13010"));
		deptList.add(this.createDeptMap("23005", "서무팀", "13020"));
		deptList.add(this.createDeptMap("23007", "경영정보화팀", "13020"));
		deptList.add(this.createDeptMap("23008", "회계팀", "13020"));
		deptList.add(this.createDeptMap("23019", "경영지원실장", "13020"));
		deptList.add(this.createDeptMap("23097", "시설팀", "13020"));
		deptList.add(this.createDeptMap("23009", "금융총괄팀", "13030"));
		deptList.add(this.createDeptMap("23010", "예금업무총괄팀", "13030"));
		deptList.add(this.createDeptMap("23011", "환/수탁팀", "13030"));
		deptList.add(this.createDeptMap("23012", "대외팀", "13030"));
		deptList.add(this.createDeptMap("23039", "금융운영과", "13030"));
		deptList.add(this.createDeptMap("23014", "시스템운용팀", "13040"));
		deptList.add(this.createDeptMap("23015", "보험팀", "13040"));
		deptList.add(this.createDeptMap("23016", "정보지원팀", "13040"));
		deptList.add(this.createDeptMap("23017", "통신/금융장비팀", "13040"));
		deptList.add(this.createDeptMap("23064", "금융시스템과", "13040"));
		deptList.add(this.createDeptMap("23122", "정보기반과", "23118"));
		deptList.add(this.createDeptMap("23123", "정보전략팀", "23118"));
		deptList.add(this.createDeptMap("23124", "정보보호팀", "23118"));
		deptList.add(this.createDeptMap("23125", "정보자원관리팀", "23118"));
		deptList.add(this.createDeptMap("23126", "품질관리팀", "23118"));
		deptList.add(this.createDeptMap("23127", "IT교육팀", "23118"));
		deptList.add(this.createDeptMap("23128", "조달정보과", "23119"));
		deptList.add(this.createDeptMap("23129", "조달개발팀", "23119"));
		deptList.add(this.createDeptMap("23130", "조달영업팀", "23119"));
		deptList.add(this.createDeptMap("23131", "조달물류팀", "23119"));
		deptList.add(this.createDeptMap("23132", "인터넷우체국팀", "23119"));
		deptList.add(this.createDeptMap("23147", "조달운영팀", "23119"));
		deptList.add(this.createDeptMap("23148", "조달기반팀", "23119"));
		deptList.add(this.createDeptMap("23133", "금융정보과", "23120"));
		deptList.add(this.createDeptMap("23134", "금융계정개발팀", "23120"));
		deptList.add(this.createDeptMap("23135", "금융공통개발팀1", "23120"));
		deptList.add(this.createDeptMap("23136", "금융시스템고도화 추진단", "23120"));
		deptList.add(this.createDeptMap("23137", "전자금융개발팀", "23120"));
		deptList.add(this.createDeptMap("23138", "금융지원팀", "23120"));
		deptList.add(this.createDeptMap("23139", "예금팀", "23120"));
		deptList.add(this.createDeptMap("23140", "보험팀", "23120"));
		deptList.add(this.createDeptMap("23141", "금융정보팀", "23120"));
		deptList.add(this.createDeptMap("23142", "경영지원과", "23121"));
		deptList.add(this.createDeptMap("23143", "총무팀", "23121"));
		deptList.add(this.createDeptMap("23144", "경영정보팀", "23121"));
		deptList.add(this.createDeptMap("23145", "회계팀", "23121"));
		deptList.add(this.createDeptMap("23146", "전파팀", "23121"));
		deptList.add(this.createDeptMap("24001", "서무팀", "14010"));
		deptList.add(this.createDeptMap("24002", "인사팀", "14010"));
		deptList.add(this.createDeptMap("24003", "우표팀", "14010"));
		deptList.add(this.createDeptMap("24004", "지출팀", "14010"));
		deptList.add(this.createDeptMap("24005", "관리과", "14010"));
		deptList.add(this.createDeptMap("24006", "용품계약팀", "14020"));
		deptList.add(this.createDeptMap("24023", "원인행위팀", "14020"));
		deptList.add(this.createDeptMap("24024", "인쇄계약팀", "14020"));
		deptList.add(this.createDeptMap("24025", "외자계약팀", "14020"));
		deptList.add(this.createDeptMap("24026", "수급팀", "14020"));
		deptList.add(this.createDeptMap("24027", "당직실", "14020"));
		deptList.add(this.createDeptMap("24028", "계약과", "14020"));
		deptList.add(this.createDeptMap("24029", "공사계약팀", "14020"));
		deptList.add(this.createDeptMap("24017", "인쇄물발송팀", "14030"));
		deptList.add(this.createDeptMap("24018", "우표및수표발송팀", "14030"));
		deptList.add(this.createDeptMap("24019", "용품발송팀", "14030"));
		deptList.add(this.createDeptMap("24020", "물품검수팀", "14030"));
		deptList.add(this.createDeptMap("24021", "우표검수팀", "14030"));
		deptList.add(this.createDeptMap("24022", "저장과", "14030"));
		deptList.add(this.createDeptMap("24012", "설계과", "14040"));
		deptList.add(this.createDeptMap("24013", "기계설계팀", "14040"));
		deptList.add(this.createDeptMap("24014", "전기설계팀", "14040"));
		deptList.add(this.createDeptMap("24015", "건축설계", "14040"));
		deptList.add(this.createDeptMap("24016", "예산팀", "14040"));
		deptList.add(this.createDeptMap("24036", "건축1팀", "14050"));
		deptList.add(this.createDeptMap("24037", "건축1과", "14050"));
		deptList.add(this.createDeptMap("24034", "건축2팀", "14060"));
		deptList.add(this.createDeptMap("24035", "건축2과", "14060"));
		deptList.add(this.createDeptMap("24009", "기계팀", "14070"));
		deptList.add(this.createDeptMap("24011", "기계과", "14070"));
		deptList.add(this.createDeptMap("24007", "전기팀", "14080"));
		deptList.add(this.createDeptMap("24008", "전기과", "14080"));
		deptList.add(this.createDeptMap("24033", "소장", "24032"));
		deptList.add(this.createDeptMap("15011", "우정계획팀", "15010"));
		deptList.add(this.createDeptMap("15012", "조달영업과", "15010"));
		deptList.add(this.createDeptMap("15013", "예금영업팀", "15010"));
		deptList.add(this.createDeptMap("15014", "보험영업팀", "15010"));
		deptList.add(this.createDeptMap("15015", "우정영업과", "15010"));
		deptList.add(this.createDeptMap("15016", "조달물류과", "15010"));
		deptList.add(this.createDeptMap("15017", "금융영업과", "15010"));
		deptList.add(this.createDeptMap("25003", "영업국장", "15010"));
		deptList.add(this.createDeptMap("25096", "테스트", "15010"));
		deptList.add(this.createDeptMap("15031", "집배업무팀", "15030"));
		deptList.add(this.createDeptMap("15032", "운송업무팀", "15030"));
		deptList.add(this.createDeptMap("15033", "소포업무팀", "15030"));
		deptList.add(this.createDeptMap("15034", "국제업무팀", "15030"));
		deptList.add(this.createDeptMap("25025", "업무국장", "15030"));
		deptList.add(this.createDeptMap("15110", "서무과", "15100"));
		deptList.add(this.createDeptMap("15111", "총무과", "15100"));
		deptList.add(this.createDeptMap("15120", "관리과", "15100"));
		deptList.add(this.createDeptMap("15130", "정보통신과", "15100"));
		deptList.add(this.createDeptMap("15140", "통신업무과", "15100"));
		deptList.add(this.createDeptMap("15150", "전파업무과", "15100"));
		deptList.add(this.createDeptMap("15160", "전파기술과", "15100"));
		deptList.add(this.createDeptMap("15170", "회계정보과", "15100"));
		deptList.add(this.createDeptMap("15180", "관재과", "15100"));
		deptList.add(this.createDeptMap("25009", "사업지원국장", "15100"));
		deptList.add(this.createDeptMap("25018", "인력계획과", "15100"));
		deptList.add(this.createDeptMap("25083", "대기실", "15100"));
		deptList.add(this.createDeptMap("15310", "우정관리1과", "15300"));
		deptList.add(this.createDeptMap("15320", "우무1과", "15300"));
		deptList.add(this.createDeptMap("15330", "운용1과", "15300"));
		deptList.add(this.createDeptMap("15340", "체신금융1과", "15300"));
		deptList.add(this.createDeptMap("15350", "국제과", "15300"));
		deptList.add(this.createDeptMap("15410", "우정관리2과", "15400"));
		deptList.add(this.createDeptMap("15420", "우무2과", "15400"));
		deptList.add(this.createDeptMap("15430", "운용2과", "15400"));
		deptList.add(this.createDeptMap("15440", "체신금융2과", "15400"));
		deptList.add(this.createDeptMap("15510", "업무1과", "15500"));
		deptList.add(this.createDeptMap("15520", "업무2과", "15500"));
		deptList.add(this.createDeptMap("15530", "기술과", "15500"));
		deptList.add(this.createDeptMap("25048", "전파국장", "15500"));
		deptList.add(this.createDeptMap("15610", "감사관실", "15600"));
		deptList.add(this.createDeptMap("15620", "고객지원팀", "15600"));
		deptList.add(this.createDeptMap("25002", "청장", "25001"));
		deptList.add(this.createDeptMap("25060", "부속실", "25001"));
		deptList.add(this.createDeptMap("25027", "정보통신국장", "25026"));
		deptList.add(this.createDeptMap("25028", "전파기술팀", "25026"));
		deptList.add(this.createDeptMap("25031", "전파업무2팀", "25026"));
		deptList.add(this.createDeptMap("25033", "전파업무1팀", "25026"));
		deptList.add(this.createDeptMap("25044", "통신업무팀", "25026"));
		deptList.add(this.createDeptMap("25045", "정보통신팀", "25026"));
		deptList.add(this.createDeptMap("25079", "전파업무팀", "25026"));
		deptList.add(this.createDeptMap("25038", "지방본부", "25037"));
		deptList.add(this.createDeptMap("25049", "우정계획과", "25046"));
		deptList.add(this.createDeptMap("25051", "우정사업국장", "25046"));
		deptList.add(this.createDeptMap("25052", "조달영업과", "25046"));
		deptList.add(this.createDeptMap("25054", "금융영업팀", "25046"));
		deptList.add(this.createDeptMap("25056", "조달물류과", "25046"));
		deptList.add(this.createDeptMap("25070", "대기실", "25046"));
		deptList.add(this.createDeptMap("25063", "전파업무과", "25062"));
		deptList.add(this.createDeptMap("25065", "통신업무과", "25062"));
		deptList.add(this.createDeptMap("25067", "정보통신과", "25062"));
		deptList.add(this.createDeptMap("25068", "전파기술과", "25062"));
		deptList.add(this.createDeptMap("25088", "정보통신실장", "25062"));
		deptList.add(this.createDeptMap("25093", "예금영업과", "25092"));
		deptList.add(this.createDeptMap("25095", "금융검사과", "25092"));
		deptList.add(this.createDeptMap("25701", "전산실", "15711"));
		deptList.add(this.createDeptMap("25702", "금융영업계", "15711"));
		deptList.add(this.createDeptMap("25703", "소포영업계", "15711"));
		deptList.add(this.createDeptMap("25704", "조달영업계", "15711"));
		deptList.add(this.createDeptMap("25705", "우정사업팀", "15711"));
		deptList.add(this.createDeptMap("25706", "정보통신계", "15720"));
		deptList.add(this.createDeptMap("25707", "통신업무계", "15720"));
		deptList.add(this.createDeptMap("25708", "정보통신팀", "15720"));
		deptList.add(this.createDeptMap("25714", "기술계", "15730"));
		deptList.add(this.createDeptMap("25715", "업무2계", "15730"));
		deptList.add(this.createDeptMap("25716", "업무1계", "15730"));
		deptList.add(this.createDeptMap("25717", "전파팀", "15730"));
		deptList.add(this.createDeptMap("25709", "당직실", "15741"));
		deptList.add(this.createDeptMap("25711", "회계계", "15741"));
		deptList.add(this.createDeptMap("25712", "총무계", "15741"));
		deptList.add(this.createDeptMap("25713", "사업지원팀", "15741"));
		deptList.add(this.createDeptMap("16111", "영업과 마케팅실", "16110"));
		deptList.add(this.createDeptMap("26001", "고객지원팀", "16110"));
		deptList.add(this.createDeptMap("26002", "소포전담팀", "16110"));
		deptList.add(this.createDeptMap("26003", "조달영업팀", "16110"));
		deptList.add(this.createDeptMap("26004", "금융지원팀", "16110"));
		deptList.add(this.createDeptMap("26005", "금융영업팀", "16110"));
		deptList.add(this.createDeptMap("26006", "민원실", "16110"));
		deptList.add(this.createDeptMap("26007", "마켓팅팀", "16110"));
		deptList.add(this.createDeptMap("26041", "보험", "16110"));
		deptList.add(this.createDeptMap("26042", "보험관리사실", "16110"));
		deptList.add(this.createDeptMap("26043", "예금", "16110"));
		deptList.add(this.createDeptMap("26057", "영업과", "16110"));
		deptList.add(this.createDeptMap("26079", "자금실", "16110"));
		deptList.add(this.createDeptMap("26080", "금융창구", "16110"));
		deptList.add(this.createDeptMap("26082", "조달서무", "16110"));
		deptList.add(this.createDeptMap("26083", "조달창구", "16110"));
		deptList.add(this.createDeptMap("26084", "금융서무", "16110"));
		deptList.add(this.createDeptMap("26092", "자금관리팀", "16110"));
		deptList.add(this.createDeptMap("26093", "판촉팀", "16110"));
		deptList.add(this.createDeptMap("26096", "통신실", "16110"));
		deptList.add(this.createDeptMap("26103", "국제팀", "16110"));
		deptList.add(this.createDeptMap("26104", "금융1팀", "16110"));
		deptList.add(this.createDeptMap("26105", "금융2팀", "16110"));
		deptList.add(this.createDeptMap("26111", "조달", "16110"));
		deptList.add(this.createDeptMap("26112", "금융", "16110"));
		deptList.add(this.createDeptMap("26130", "보험관리사팀", "16110"));
		deptList.add(this.createDeptMap("26137", "소포팀", "16110"));
		deptList.add(this.createDeptMap("26138", "특급팀", "16110"));
		deptList.add(this.createDeptMap("26139", "조달팀", "16110"));
		deptList.add(this.createDeptMap("26143", "C.S.팀", "16110"));
		deptList.add(this.createDeptMap("26145", "방문소포팀", "16110"));
		deptList.add(this.createDeptMap("26224", "고객지원실", "16110"));
		deptList.add(this.createDeptMap("16121", "조달영업과 마케팅실", "16120"));
		deptList.add(this.createDeptMap("26008", "접수1팀", "16120"));
		deptList.add(this.createDeptMap("26009", "접수2팀", "16120"));
		deptList.add(this.createDeptMap("26010", "우체국택배", "16120"));
		deptList.add(this.createDeptMap("26011", "판매", "16120"));
		deptList.add(this.createDeptMap("26012", "안내창구", "16120"));
		deptList.add(this.createDeptMap("26044", "사서함실", "16120"));
		deptList.add(this.createDeptMap("26045", "조달창구", "16120"));
		deptList.add(this.createDeptMap("26085", "조달영업과", "16120"));
		deptList.add(this.createDeptMap("26089", "조달팀", "16120"));
		deptList.add(this.createDeptMap("26090", "서무팀", "16120"));
		deptList.add(this.createDeptMap("26091", "수위실", "16120"));
		deptList.add(this.createDeptMap("26119", "접수팀", "16120"));
		deptList.add(this.createDeptMap("26166", "민원실", "16120"));
		deptList.add(this.createDeptMap("26215", "조달영업실", "16120"));
		deptList.add(this.createDeptMap("26216", "조달영업1팀", "16120"));
		deptList.add(this.createDeptMap("26217", "조달영업2팀", "16120"));
		deptList.add(this.createDeptMap("16131", "운용실", "16130"));
		deptList.add(this.createDeptMap("26013", "집배실", "16130"));
		deptList.add(this.createDeptMap("26014", "집배1실", "16130"));
		deptList.add(this.createDeptMap("26015", "집배2실", "16130"));
		deptList.add(this.createDeptMap("26046", "집배3실", "16130"));
		deptList.add(this.createDeptMap("26047", "특급실", "16130"));
		deptList.add(this.createDeptMap("26098", "배달서비스과", "16130"));
		deptList.add(this.createDeptMap("26108", "EMS배달부서", "16130"));
		deptList.add(this.createDeptMap("26109", "EMS통관부서", "16130"));
		deptList.add(this.createDeptMap("26121", "집배1팀", "16130"));
		deptList.add(this.createDeptMap("26122", "집배2팀", "16130"));
		deptList.add(this.createDeptMap("26123", "사서함팀", "16130"));
		deptList.add(this.createDeptMap("26128", "소포팀", "16130"));
		deptList.add(this.createDeptMap("26129", "위탁소포", "16130"));
		deptList.add(this.createDeptMap("26016", "사서함", "16140"));
		deptList.add(this.createDeptMap("26017", "발착팀", "16140"));
		deptList.add(this.createDeptMap("26018", "특수팀", "16140"));
		deptList.add(this.createDeptMap("26019", "조달소통팀", "16140"));
		deptList.add(this.createDeptMap("26020", "특수조달팀", "16140"));
		deptList.add(this.createDeptMap("26048", "소포팀", "16140"));
		deptList.add(this.createDeptMap("26049", "국제팀", "16140"));
		deptList.add(this.createDeptMap("26097", "조달분류과", "16140"));
		deptList.add(this.createDeptMap("16151", "운용실", "16150"));
		deptList.add(this.createDeptMap("26053", "집배실", "16150"));
		deptList.add(this.createDeptMap("26054", "특수팀", "16150"));
		deptList.add(this.createDeptMap("26055", "발착팀", "16150"));
		deptList.add(this.createDeptMap("26058", "집배.발착팀", "16150"));
		deptList.add(this.createDeptMap("26072", "조달소통팀", "16150"));
		deptList.add(this.createDeptMap("26081", "소포팀", "16150"));
		deptList.add(this.createDeptMap("26086", "서무계", "16150"));
		deptList.add(this.createDeptMap("26087", "당직실", "16150"));
		deptList.add(this.createDeptMap("26094", "택배팀", "16150"));
		deptList.add(this.createDeptMap("26099", "집배소통팀", "16150"));
		deptList.add(this.createDeptMap("26101", "서무회계팀", "16150"));
		deptList.add(this.createDeptMap("26102", "특수발착팀", "16150"));
		deptList.add(this.createDeptMap("26106", "세무.세출팀", "16150"));
		deptList.add(this.createDeptMap("26117", "물류팀", "16150"));
		deptList.add(this.createDeptMap("26126", "국제통관실", "16150"));
		deptList.add(this.createDeptMap("26140", "특급팀", "16150"));
		deptList.add(this.createDeptMap("26142", "통관팀", "16150"));
		deptList.add(this.createDeptMap("26155", "EMS배달팀", "16150"));
		deptList.add(this.createDeptMap("26156", "집배1실", "16150"));
		deptList.add(this.createDeptMap("26157", "집배2실", "16150"));
		deptList.add(this.createDeptMap("26158", "사서함실", "16150"));
		deptList.add(this.createDeptMap("26159", "방문소포실", "16150"));
		deptList.add(this.createDeptMap("26160", "조달물류과", "16150"));
		deptList.add(this.createDeptMap("26161", "집배3실", "16150"));
		deptList.add(this.createDeptMap("26165", "소포실", "16150"));
		deptList.add(this.createDeptMap("26185", "민원실", "16150"));
		deptList.add(this.createDeptMap("26221", "방문소포팀", "16150"));
		deptList.add(this.createDeptMap("26021", "환급", "16160"));
		deptList.add(this.createDeptMap("26022", "국제환금", "16160"));
		deptList.add(this.createDeptMap("26023", "대체", "16160"));
		deptList.add(this.createDeptMap("26024", "수납", "16160"));
		deptList.add(this.createDeptMap("26025", "예금", "16160"));
		deptList.add(this.createDeptMap("26026", "보험", "16160"));
		deptList.add(this.createDeptMap("26027", "자금실", "16160"));
		deptList.add(this.createDeptMap("26028", "어음교환", "16160"));
		deptList.add(this.createDeptMap("26050", "금융창구", "16160"));
		deptList.add(this.createDeptMap("26051", "보험관리사실", "16160"));
		deptList.add(this.createDeptMap("26088", "금융영업과", "16160"));
		deptList.add(this.createDeptMap("26124", "관리팀", "16160"));
		deptList.add(this.createDeptMap("26125", "자금팀", "16160"));
		deptList.add(this.createDeptMap("26218", "금융영업실", "16160"));
		deptList.add(this.createDeptMap("16171", "운용실", "16170"));
		deptList.add(this.createDeptMap("16191", "운용실", "16190"));
		deptList.add(this.createDeptMap("26029", "서무팀", "161B0"));
		deptList.add(this.createDeptMap("26030", "회계팀", "161B0"));
		deptList.add(this.createDeptMap("26031", "청사관리팀", "161B0"));
		deptList.add(this.createDeptMap("26052", "당직실", "161B0"));
		deptList.add(this.createDeptMap("26071", "정보교육센터", "161B0"));
		deptList.add(this.createDeptMap("26073", "지원과", "161B0"));
		deptList.add(this.createDeptMap("26074", "인사.서무팀", "161B0"));
		deptList.add(this.createDeptMap("26077", "서무.회계팀", "161B0"));
		deptList.add(this.createDeptMap("26095", "행정팀", "161B0"));
		deptList.add(this.createDeptMap("26115", "사료관리실", "161B0"));
		deptList.add(this.createDeptMap("26116", "우표팀", "161B0"));
		deptList.add(this.createDeptMap("26229", "시설팀", "161B0"));
		deptList.add(this.createDeptMap("16108", "경영지도실", "161D0"));
		deptList.add(this.createDeptMap("26075", "경영지도실장", "161D0"));
		deptList.add(this.createDeptMap("26227", "경영지도실", "161D0"));
		deptList.add(this.createDeptMap("26078", "마케팅지원실장", "161E0"));
		deptList.add(this.createDeptMap("26187", "사서함", "26032"));
		deptList.add(this.createDeptMap("26056", "국장", "26036"));
		deptList.add(this.createDeptMap("26135", "국장2", "26036"));
		deptList.add(this.createDeptMap("26149", "소포과", "26036"));
		deptList.add(this.createDeptMap("26076", "노조지부", "26037"));
		deptList.add(this.createDeptMap("26172", "조달물류1과", "26170"));
		deptList.add(this.createDeptMap("26173", "특수발착팀", "26170"));
		deptList.add(this.createDeptMap("26174", "집배1실", "26170"));
		deptList.add(this.createDeptMap("26175", "집배2실", "26170"));
		deptList.add(this.createDeptMap("26176", "조달물류2과", "26171"));
		deptList.add(this.createDeptMap("26177", "집배3실", "26171"));
		deptList.add(this.createDeptMap("26178", "특급실", "26171"));
		deptList.add(this.createDeptMap("26179", "소포배달팀", "26171"));
		deptList.add(this.createDeptMap("26180", "방문소포팀", "26171"));
		deptList.add(this.createDeptMap("26181", "마케팅팀", "26171"));
		deptList.add(this.createDeptMap("26200", "물류소통실1", "26198"));
		deptList.add(this.createDeptMap("26201", "기계동력실", "26198"));
		deptList.add(this.createDeptMap("26203", "물류소통실2", "26198"));
		deptList.add(this.createDeptMap("26219", "시설팀", "26207"));
		deptList.add(this.createDeptMap("26220", "임대팀", "26207"));
		deptList.add(this.createDeptMap("26225", "소포영업과", "26222"));
		deptList.add(this.createDeptMap("26226", "고객지원실", "26222"));
		deptList.add(this.createDeptMap("26233", "소포영업과", "26222"));
		deptList.add(this.createDeptMap("26801", "창구계", "16810"));
		deptList.add(this.createDeptMap("26802", "통상조달계", "16810"));
		deptList.add(this.createDeptMap("26803", "발착계", "16810"));
		deptList.add(this.createDeptMap("26804", "접수계", "16810"));
		deptList.add(this.createDeptMap("26805", "특급1계", "16810"));
		deptList.add(this.createDeptMap("26806", "특급2계", "16810"));
		deptList.add(this.createDeptMap("26807", "통관계", "16810"));
		deptList.add(this.createDeptMap("26826", "영업과", "16810"));
		deptList.add(this.createDeptMap("26856", "고객지원실", "16810"));
		deptList.add(this.createDeptMap("26861", "보험관리사실", "16810"));
		deptList.add(this.createDeptMap("26868", "공항운송계", "16810"));
		deptList.add(this.createDeptMap("26871", "특급발송계(주)", "16810"));
		deptList.add(this.createDeptMap("26872", "특급발송계(야)", "16810"));
		deptList.add(this.createDeptMap("26875", "발송계", "16810"));
		deptList.add(this.createDeptMap("26877", "발송계(야)", "16810"));
		deptList.add(this.createDeptMap("26808", "발착계", "16830"));
		deptList.add(this.createDeptMap("26809", "특수계", "16830"));
		deptList.add(this.createDeptMap("26810", "운송1계", "16830"));
		deptList.add(this.createDeptMap("26811", "운송2계", "16830"));
		deptList.add(this.createDeptMap("26812", "준등기계", "16830"));
		deptList.add(this.createDeptMap("26848", "운송2계(OZ)", "16830"));
		deptList.add(this.createDeptMap("26849", "운송2계(KE)", "16830"));
		deptList.add(this.createDeptMap("26850", "발착계(발송)", "16830"));
		deptList.add(this.createDeptMap("26851", "발착계(도착)", "16830"));
		deptList.add(this.createDeptMap("26852", "운전원대기실", "16830"));
		deptList.add(this.createDeptMap("26853", "통상조달과", "16830"));
		deptList.add(this.createDeptMap("26869", "운송계", "16830"));
		deptList.add(this.createDeptMap("26813", "도착계", "16840"));
		deptList.add(this.createDeptMap("26814", "발송계", "16840"));
		deptList.add(this.createDeptMap("26827", "운송팀", "16840"));
		deptList.add(this.createDeptMap("26828", "기계", "16840"));
		deptList.add(this.createDeptMap("26855", "소포조달과", "16840"));
		deptList.add(this.createDeptMap("26859", "통관계", "16840"));
		deptList.add(this.createDeptMap("26860", "발착계", "16840"));
		deptList.add(this.createDeptMap("26870", "소포발송계", "16840"));
		deptList.add(this.createDeptMap("26873", "EMS통관부서", "16840"));
		deptList.add(this.createDeptMap("26874", "EMS배달부서", "16840"));
		deptList.add(this.createDeptMap("26876", "운송계", "16840"));
		deptList.add(this.createDeptMap("26858", "안전과", "16850"));
		deptList.add(this.createDeptMap("26815", "관리계", "16860"));
		deptList.add(this.createDeptMap("26816", "제1계", "16860"));
		deptList.add(this.createDeptMap("26817", "제2계", "16860"));
		deptList.add(this.createDeptMap("26854", "안전1과", "16860"));
		deptList.add(this.createDeptMap("26818", "제1계", "16870"));
		deptList.add(this.createDeptMap("26819", "제2계", "16870"));
		deptList.add(this.createDeptMap("26820", "제3계", "16870"));
		deptList.add(this.createDeptMap("26846", "안전2과", "16870"));
		deptList.add(this.createDeptMap("26847", "관리계", "16870"));
		deptList.add(this.createDeptMap("16901", "항공보안", "16879"));
		deptList.add(this.createDeptMap("26821", "서무팀", "16879"));
		deptList.add(this.createDeptMap("26822", "회계조사팀", "16879"));
		deptList.add(this.createDeptMap("26823", "조사계", "16879"));
		deptList.add(this.createDeptMap("26832", "구내식당", "16879"));
		deptList.add(this.createDeptMap("26833", "연금매점", "16879"));
		deptList.add(this.createDeptMap("26834", "당직실", "16879"));
		deptList.add(this.createDeptMap("26835", "지원과", "16879"));
		deptList.add(this.createDeptMap("26836", "노조지부", "16879"));
		deptList.add(this.createDeptMap("26837", "기계계", "16879"));
		deptList.add(this.createDeptMap("26838", "중대본부", "16879"));
		deptList.add(this.createDeptMap("26839", "수위실", "16879"));
		deptList.add(this.createDeptMap("26840", "냉난방실", "16879"));
		deptList.add(this.createDeptMap("26841", "전기실", "16879"));
		deptList.add(this.createDeptMap("26842", "청사관리계", "16879"));
		deptList.add(this.createDeptMap("26843", "조사1계", "16879"));
		deptList.add(this.createDeptMap("26844", "조사2계", "16879"));
		deptList.add(this.createDeptMap("26845", "민원실", "16879"));
		deptList.add(this.createDeptMap("26878", "고객지원계", "16879"));
		deptList.add(this.createDeptMap("26879", "경영지도계", "16879"));
		deptList.add(this.createDeptMap("26825", "국장", "26824"));
		deptList.add(this.createDeptMap("26885", "민원실", "26880"));
		deptList.add(this.createDeptMap("26886", "서무", "26880"));
		deptList.add(this.createDeptMap("26887", "회계", "26880"));
		deptList.add(this.createDeptMap("26888", "고객지원", "26880"));
		deptList.add(this.createDeptMap("26889", "청사관리", "26880"));
		deptList.add(this.createDeptMap("26890", "경영지도", "26880"));
		deptList.add(this.createDeptMap("26891", "기계", "26880"));
		deptList.add(this.createDeptMap("26892", "발송", "26881"));
		deptList.add(this.createDeptMap("26893", "발송(야)", "26881"));
		deptList.add(this.createDeptMap("26898", "특수", "26881"));
		deptList.add(this.createDeptMap("26900", "발착", "26881"));
		deptList.add(this.createDeptMap("26894", "도착", "26882"));
		deptList.add(this.createDeptMap("26895", "통관", "26882"));
		deptList.add(this.createDeptMap("26896", "발착", "26882"));
		deptList.add(this.createDeptMap("26897", "통상", "26882"));
		deptList.add(this.createDeptMap("26899", "운용", "26883"));
		deptList.add(this.createDeptMap("26901", "통상계", "16910"));
		deptList.add(this.createDeptMap("26902", "발착소포계", "16910"));
		deptList.add(this.createDeptMap("26903", "특수계", "16910"));
		deptList.add(this.createDeptMap("26904", "운용계", "16910"));
		deptList.add(this.createDeptMap("26905", "운송용기계", "16910"));
		deptList.add(this.createDeptMap("26919", "발착계", "16910"));
		deptList.add(this.createDeptMap("26920", "조달물류지원실", "16910"));
		deptList.add(this.createDeptMap("26921", "소포계", "16910"));
		deptList.add(this.createDeptMap("26922", "국제조달통관계", "16910"));
		deptList.add(this.createDeptMap("26923", "조달물류실", "16910"));
		deptList.add(this.createDeptMap("26934", "소형통상계", "16910"));
		deptList.add(this.createDeptMap("26935", "대형통상계", "16910"));
		deptList.add(this.createDeptMap("26947", "통상조달계", "16910"));
		deptList.add(this.createDeptMap("26948", "특수발착계", "16910"));
		deptList.add(this.createDeptMap("26956", "특수통상계", "16910"));
		deptList.add(this.createDeptMap("26960", "조달소통팀", "16910"));
		deptList.add(this.createDeptMap("26961", "총괄팀", "16910"));
		deptList.add(this.createDeptMap("26963", "등기소포계", "16910"));
		deptList.add(this.createDeptMap("26966", "운송교환계", "16910"));
		deptList.add(this.createDeptMap("26968", "소포발착계", "16910"));
		deptList.add(this.createDeptMap("26970", "도착계", "16910"));
		deptList.add(this.createDeptMap("26971", "발송계", "16910"));
		deptList.add(this.createDeptMap("26972", "소포발착팀", "16910"));
		deptList.add(this.createDeptMap("26982", "조달소통팀", "16910"));
		deptList.add(this.createDeptMap("26983", "총괄팀", "16910"));
		deptList.add(this.createDeptMap("26984", "조달관리계", "16910"));
		deptList.add(this.createDeptMap("26986", "소통1계", "16910"));
		deptList.add(this.createDeptMap("26987", "소통2계", "16910"));
		deptList.add(this.createDeptMap("26989", "물류상황계", "16910"));
		deptList.add(this.createDeptMap("26990", "통상조달팀", "16910"));
		deptList.add(this.createDeptMap("26993", "등기조달팀", "16910"));
		deptList.add(this.createDeptMap("26994", "접수계", "16910"));
		deptList.add(this.createDeptMap("26995", "소포운송팀", "16910"));
		deptList.add(this.createDeptMap("26997", "집배계", "16910"));
		deptList.add(this.createDeptMap("26998", "물류총괄계", "16910"));
		deptList.add(this.createDeptMap("26906", "소포계", "16920"));
		deptList.add(this.createDeptMap("26907", "대형통상계", "16920"));
		deptList.add(this.createDeptMap("26908", "소형통상계", "16920"));
		deptList.add(this.createDeptMap("26936", "조달소통계", "16920"));
		deptList.add(this.createDeptMap("26937", "등기통상계", "16920"));
		deptList.add(this.createDeptMap("26940", "물류총괄계", "16920"));
		deptList.add(this.createDeptMap("26945", "통상조달계", "16920"));
		deptList.add(this.createDeptMap("26988", "물류상황계", "16920"));
		deptList.add(this.createDeptMap("26909", "발착계", "16930"));
		deptList.add(this.createDeptMap("26910", "특수계", "16930"));
		deptList.add(this.createDeptMap("26911", "접수계", "16930"));
		deptList.add(this.createDeptMap("26946", "특수발착계", "16930"));
		deptList.add(this.createDeptMap("26952", "소포계", "16930"));
		deptList.add(this.createDeptMap("26957", "집배계", "16930"));
		deptList.add(this.createDeptMap("26958", "운용계", "16930"));
		deptList.add(this.createDeptMap("26912", "동력설비팀", "16940"));
		deptList.add(this.createDeptMap("26913", "반송기계계", "16940"));
		deptList.add(this.createDeptMap("26914", "조달기계팀", "16940"));
		
		this.deptListLvl3 = deptList;
	}

}
