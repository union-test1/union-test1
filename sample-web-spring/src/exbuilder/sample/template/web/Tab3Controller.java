package exbuilder.sample.template.web;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.protocol.data.ParameterRow;
import com.cleopatra.spring.JSONDataView;

import exbuilder.sample.dao.DatabaseDAO;
import exbuilder.util.PagingMap;
import exbuilder.util.XBUtil;


@Controller
@RequestMapping("/tabTemplate/tab03")
public class Tab3Controller {
	@Autowired
	private DatabaseDAO databaseDAO;
	
	
	public Tab3Controller() {
	}
	
	@RequestMapping("/getMainList.do")
	public View getMainList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		// parameter
		Map<String, Object> reqKey = XBUtil.getParamMap(dataRequest, "reqKey");
		Map<String, Object> reqPage = XBUtil.getParamMap(dataRequest, "resPage");
		
		//result
		//paging
		int totCnt = this.databaseDAO.getMainTotCnt(reqKey);
		int pageIdx = Integer.parseInt((String)reqPage.get("pageIdx"));
		int rowSize = 30;
		int pageSize = 5;
		
		int offset = ((pageIdx - 1) * rowSize) + 1;
		if(totCnt < offset) {
			pageIdx = 1;
			offset = ((pageIdx - 1) * rowSize) + 1;
		}
		
		PagingMap pagingMap = new PagingMap();
		pagingMap.setRowSize(rowSize);
		pagingMap.setTargetRow(offset);
		
		Map<String, Object> resPage = new HashMap<String, Object>();
		resPage.put("totCnt", totCnt);
		resPage.put("pageIdx", pageIdx);
		resPage.put("rowSize", rowSize);
		resPage.put("pageSize", pageSize);
		
		//select result
		List<Map<String, String>> resList = this.databaseDAO.selectMain(reqKey, pagingMap);
		dataRequest.setResponse("resList", resList);
		dataRequest.setResponse("resPage", resPage);
		
		//message 전달
		Map<String, Object> meta = new HashMap<String, Object>();
		if(resList.size() == 0) {
			meta.put("msg", "데이터가 없습니다.");
		}
		dataRequest.setMetadata(true, meta);

		return new JSONDataView();
	}
	
	@RequestMapping("/save.do")
	public View save(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		//parameter
		ParameterGroup resList = dataRequest.getParameterGroup("resList");
		Map<String, Object> meta = new HashMap<String, Object>();
		String msg = "변경된 정보가 없습니다";
		
		if(resList != null){
			Iterator<ParameterRow> rows = resList.getInsertedRows();
			while(rows.hasNext()){
				ParameterRow row = rows.next();
				this.databaseDAO.insertMain(row.toMap());
			}
			
			rows = resList.getUpdatedRows();
	
			while(rows.hasNext()){
				ParameterRow row = rows.next();
				this.databaseDAO.updateMain(row.toMap());
			}
			
			rows = resList.getDeletedRows();
			while(rows.hasNext()) {
				ParameterRow row = rows.next();
				this.databaseDAO.deleteMain(row.toMap());
			}
			
			msg = "변경되었습니다.";
		}
		meta.put("msg", msg);
		dataRequest.setMetadata(true, meta);
		
		return new JSONDataView();
	}

}
