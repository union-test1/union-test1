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
@RequestMapping("/template/twogridlist")
public class TwoGridListController {
	@Autowired
	private DatabaseDAO databaseDAO;


	public TwoGridListController() {
	}

	@RequestMapping("/getMainList.do")
	public View getMainList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		// parameter
		Map<String, Object> reqKey = XBUtil.getParamMap(dataRequest, "reqKey");

		// result
		// select result
		List<Map<String, String>> resMain = this.databaseDAO.selectMain(reqKey);
		List<Map<String, String>> resList1 = this.databaseDAO.selectSub1(reqKey);
		List<Map<String, String>> resList2 = this.databaseDAO.selectSub2(reqKey);

		// metadata TODO 공통화
		Map<String, Object> metadata = new HashMap<String, Object>();
		if (resMain.size() == 1) {
			dataRequest.setResponse("resList1", resList1);
			dataRequest.setResponse("resList2", resList2);
		} else {
			metadata.put("msg", "데이터가 없습니다.");
		}
		dataRequest.setMetadata(true, metadata);

		return new JSONDataView();
	}

	@RequestMapping("/save.do")
	public View save(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		// parameter
		ParameterGroup resList1 = dataRequest.getParameterGroup("resList1");
		ParameterGroup resList2 = dataRequest.getParameterGroup("resList2");
		String msg = "변경된 정보가 없습니다.";

		// resList 추가, 삭제, 수정
		if (resList1 != null) {
			Iterator<ParameterRow> rows = resList1.getInsertedRows();
			while (rows.hasNext()) {
				ParameterRow row = rows.next();
				this.databaseDAO.insertSub1(row.toMap());
			}

			rows = resList1.getUpdatedRows();
			while (rows.hasNext()) {
				ParameterRow row = rows.next();
				this.databaseDAO.updateSub1(row.toMap());
			}

			rows = resList1.getDeletedRows();
			while (rows.hasNext()) {
				ParameterRow row = rows.next();
				this.databaseDAO.deleteSub1(row.toMap());
			}
			msg = "변경되었습니다.";
		}
		
		// resList 추가, 삭제, 수정
		if (resList2 != null) {
			Iterator<ParameterRow> rows = resList2.getInsertedRows();
			while (rows.hasNext()) {
				ParameterRow row = rows.next();
				this.databaseDAO.insertSub2(row.toMap());
			}

			rows = resList2.getUpdatedRows();
			while (rows.hasNext()) {
				ParameterRow row = rows.next();
				this.databaseDAO.updateSub2(row.toMap());
			}

			rows = resList2.getDeletedRows();
			while (rows.hasNext()) {
				ParameterRow row = rows.next();
				this.databaseDAO.deleteSub2(row.toMap());
			}
			msg = "변경되었습니다.";
		}

		Map<String, Object> meta = new HashMap<String, Object>();
		meta.put("msg", msg);
		dataRequest.setMetadata(true, meta);

		return new JSONDataView();
	}

}
