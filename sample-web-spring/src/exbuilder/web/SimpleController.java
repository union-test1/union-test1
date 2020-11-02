package exbuilder.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.protocol.data.ParameterRow;
import com.cleopatra.spring.JSONDataView;


@Controller
@RequestMapping("/simple")
public class SimpleController {

	
	@RequestMapping("/search.do")
	public View search(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception {
		ParameterGroup dm1 = dataRequest.getParameterGroup("dm1");
		String column1 = dm1.getValue("column1");
		String column2 = dm1.getValue("column2");
		
		System.out.println("column1 : " + column1 + ", column2 : " + column2);
		
		List<Map<String, String>> data = new ArrayList<Map<String, String>>();
		dataRequest.setResponse("ds1", data);
		for(int i = 0; i < 100; i++) {
			Map<String, String> row = new HashMap<String, String>();
			row.put("column1", "data" + i + "_1");
			row.put("column2", "data" + i + "_2");
			row.put("column3", "data" + i + "_3");
			row.put("column4", "data" + i + "_4");
			row.put("column5", "data" + i + "_5");
			row.put("column6", "data" + i + "_6");
			row.put("column7", "data" + i + "_7");
			
			data.add(row);
		}
		
		return new JSONDataView();
	}
	
	private void printLog(Iterator<ParameterRow> rows) {
		while(rows.hasNext()) {
			ParameterRow row = rows.next();
//			Map<String, String> param = row.toMap();
			
			String[] colnm = row.getColumnNames();
			for(int i = 0; i < colnm.length; i++) {
				System.out.print("colnm : " + colnm[i] + "=" + row.getValue(colnm[i]) + "\t");
			}
			System.out.println();
		}
	}
	
	@RequestMapping("/save.do")
	public View save(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception {
		ParameterGroup ds1 = dataRequest.getParameterGroup("ds1");
		Iterator<ParameterRow> rows = ds1.getInsertedRows();
		System.out.println("INSERTED ROWS :: ");
		this.printLog(rows);
		
		rows = ds1.getUpdatedRows();
		System.out.println("UPDATED ROWS :: ");
		this.printLog(rows);
		
		rows = ds1.getDeletedRows();
		System.out.println("DELETED ROWS :: ");
		this.printLog(rows);
		
		List<Map<String, String>> data = new ArrayList<Map<String, String>>();
		dataRequest.setResponse("ds1", data);
		for(int i = 0; i < 100; i++) {
			Map<String, String> row = new HashMap<String, String>();
			row.put("column1", "new data" + i + "_1");
			row.put("column2", "new data" + i + "_2");
			row.put("column3", "new data" + i + "_3");
			row.put("column4", "new data" + i + "_4");
			row.put("column5", "new data" + i + "_5");
			row.put("column6", "new data" + i + "_6");
			row.put("column7", "new data" + i + "_7");
			
			data.add(row);
		}
		
		return new JSONDataView();
	}
	
	
//	@Autowired
//	private com.sales.cmn.dao.MassDataDAO massDataDAO;
//	
//	@RequestMapping("massdata.do")
//	public void getMassData(HttpServletRequest request, HttpServletResponse response) throws Exception {
//		response.setCharacterEncoding("utf-8");
//		response.setContentType("text/tab-separated-values; charset=utf-8");
//		
//		List<String> header = new ArrayList<String>();
//		java.io.PrintWriter out = response.getWriter();
//
//		// 테스트용 전체 건(17만건)
//		this.massDataDAO.getList(new RowBounds(), new ResultHandler<com.sales.sys.util.InsensitiveKeyMap<String, Object>>() {
//			@Override
//			public void handleResult(ResultContext<? extends InsensitiveKeyMap<String, Object>> resultContext) {
//				InsensitiveKeyMap<String, Object> rowData = resultContext.getResultObject();
//				
//				/**
//				 * TODO javaserver plugin에서 처리할 수 있는 방안 검토 후 기능 추가
//				 */
//				// tab separated value
//				StringBuilder str = new StringBuilder();
//				if(header.size() == 0) {
//					Set<String> resultHeader = rowData.keySet();
//					header.addAll(resultHeader);
//					boolean first = true;
//					for(String head : header) {
//						if(first) {
//							first = false;
//						} else {
//							str.append("\t");
//						}
//						str.append(head);
//					}
//					str.append("\n");
//				}
//				
//				boolean first = true;
//				for(String head : header) {
//					if(first) {
//						first = false;
//					} else {
//						str.append("\t");
//					}
//					str.append(rowData.get(head));
//				}
//				str.append("\n");
//				
//				out.print(str.toString());
//			}
//		});
//	}
	
	
	
}
