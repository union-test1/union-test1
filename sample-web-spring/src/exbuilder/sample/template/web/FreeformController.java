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
import exbuilder.util.XBUtil;


@Controller
@RequestMapping("/template/freeform")
public class FreeformController {
	@Autowired
	private DatabaseDAO databaseDAO;

	
	public FreeformController() {
	}

	@RequestMapping("/getMainList.do")
	public View getMainList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		// parameter
		Map<String, Object> reqKey = XBUtil.getParamMap(dataRequest, "reqKey");

		// select result
		List<Map<String, String>> resList = this.databaseDAO.selectMain(reqKey);

		// message 전달
		Map<String, Object> meta = new HashMap<String, Object>();
		if(resList.size() == 1) {
			dataRequest.setResponse("resMain", resList.subList(0, 1));
		} else {
			meta.put("msg", "데이터가 없습니다.");
		}
		dataRequest.setMetadata(true, meta);

		return new JSONDataView();
	}

	@RequestMapping("/save.do")
	public View save(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		// parameter
		ParameterGroup resMain = dataRequest.getParameterGroup("resMain");
		
		Map<String, Object> metadata = new HashMap<String, Object>();
		
		// 저장처리
		if(resMain == null) {
			metadata.put("msg", "변경된 정보가 없습니다.");
		} else {
			Iterator<ParameterRow> rows = resMain.getInsertedRows();
			while(rows.hasNext()) {
				ParameterRow row = rows.next();
				this.databaseDAO.insertMain(row.toMap());
			}
			
			rows = resMain.getUpdatedRows();
			while(rows.hasNext()) {
				ParameterRow row = rows.next();
				this.databaseDAO.updateMain(row.toMap());
			}
			
			rows = resMain.getDeletedRows();
			while(rows.hasNext()) {
				ParameterRow row = rows.next();
				this.databaseDAO.deleteMain(row.toMap());
			}
		}
		
		dataRequest.setMetadata(true, metadata);

		return new JSONDataView();
	}

}
