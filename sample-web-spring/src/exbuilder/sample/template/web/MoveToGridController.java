package exbuilder.sample.template.web;

import java.util.ArrayList;
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
import exbuilder.util.XBUtil;


@Controller
@RequestMapping("/template/movetogrid")
public class MoveToGridController {
	@Autowired
	private DatabaseDAO databaseDAO;


	public MoveToGridController() {
	}

	@RequestMapping("/getMainList.do")
	public View getMainList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		// parameter
		Map<String, Object> reqKey = XBUtil.getParamMap(dataRequest, "reqKey");

		// select result
		List<Map<String, String>> resList1 = this.databaseDAO.selectSub1(reqKey);
		List<Map<String, String>> resList2 = this.databaseDAO.selectSub2(reqKey);

		// metadata TODO 공통화
		Map<String, Object> metadata = new HashMap<String, Object>();
		if (resList1.isEmpty() && resList2.isEmpty()) {
			metadata.put("msg", "데이터가 없습니다.");
		} else {
			List<Map<String, String>> resSub = new ArrayList<Map<String, String>>();
			for(Map<String, String> entity : resList2) {
				if(resList1.contains(entity) == false) {
					resSub.add(entity);
				}
			}
			
			dataRequest.setResponse("resList1", resList1);
			dataRequest.setResponse("resList2", resSub);
		}
		dataRequest.setMetadata(true, metadata);

		return new JSONDataView();
	}

	@RequestMapping("/save.do")
	public View save(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		// parameter
		ParameterGroup resMain1 = dataRequest.getParameterGroup("reqList1");
		ParameterGroup resMain2 = dataRequest.getParameterGroup("reqList2");
		Map<String, Object> reqKey = XBUtil.getParamMap(dataRequest, "reqKeyCopy");
		
		List<Map<String, String>> resList1 = this.databaseDAO.selectSub1(reqKey);
		List<Map<String, String>> resList2 = this.databaseDAO.selectSub2(reqKey);
		
		String msg = "변경된 정보가 없습니다.";
		int updCnt = 0;
		
		// row 정보 삭제
		if (resList1 != null) {
			for (int rowIdx = 0; rowIdx < resList1.size(); rowIdx++) {
				 this.databaseDAO.deleteSub1(resList1.get(rowIdx));
				 updCnt++;
			}
			for (int rowIdx = 0; rowIdx < resList2.size(); rowIdx++) {
				 this.databaseDAO.deleteSub2(resList2.get(rowIdx));
				 updCnt++;
			}
		}
		
		// resList 일괄추가
		if (resMain1 != null) {
			Iterator<ParameterRow> rows = resMain1.getInsertedRows();
			while (rows.hasNext()) {
				ParameterRow row = rows.next();
				this.databaseDAO.insertSub1(row.toMap());
				updCnt++;
			}
		}
		if (resMain2 != null) {
			Iterator<ParameterRow> rows = resMain2.getInsertedRows();
			while (rows.hasNext()) {
				ParameterRow row = rows.next();
				this.databaseDAO.insertSub2(row.toMap());
				updCnt++;
			}
		}
		
		if(updCnt > 0) {
			msg = "변경되었습니다.";
		}
		
		Map<String, Object> meta = new HashMap<String, Object>();
		meta.put("msg", msg);
		dataRequest.setMetadata(true, meta);

		return new JSONDataView();
	}

}
