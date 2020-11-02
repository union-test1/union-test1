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
@RequestMapping("/template/md_freeformgrid")
public class MD_FreeformGridController {
	@Autowired
	private DatabaseDAO databaseDAO;

	public MD_FreeformGridController() {
	}

	@RequestMapping("/getMainList.do")
	public View getMainList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		// parameter
		Map<String, Object> reqKey = XBUtil.getParamMap(dataRequest, "reqKey");


		// select result
		List<Map<String, String>> mstList = this.databaseDAO.selectMain(reqKey);
		List<Map<String, String>> subList = this.databaseDAO.selectSub1(reqKey);

		// metadata TODO 공통화
		Map<String, Object> metadata = new HashMap<String, Object>();
		if (mstList.size() == 1) {
			dataRequest.setResponse("mstList", mstList);
			dataRequest.setResponse("subList", subList);
		} else {
			metadata.put("msg", "데이터가 없습니다.");
		}
		dataRequest.setMetadata(true, metadata);

		return new JSONDataView();
	}

	
	@RequestMapping("/save.do")
	public View save(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		// parameter
		ParameterGroup mstDetail = dataRequest.getParameterGroup("mstDetail");
		ParameterGroup mstList = dataRequest.getParameterGroup("mstList");
		ParameterGroup subList = dataRequest.getParameterGroup("subList");
		
		String msg = "변경된 정보가 없습니다.";
		String column1 = mstDetail.getValue("column1");
		
		int updCnt = 0;

		// mstList 추가, 삭제, 수정
		if (mstList != null) {
			Iterator<ParameterRow> rows = mstList.getInsertedRows();
			while (rows.hasNext()) {
				ParameterRow row = rows.next();
				this.databaseDAO.insertMain(row.toMap());
				updCnt++;
			}

			rows = mstList.getUpdatedRows();
			while (rows.hasNext()) {
				ParameterRow row = rows.next();
				this.databaseDAO.updateMain(row.toMap());
				updCnt++;
			}

			rows = mstList.getDeletedRows();
			while (rows.hasNext()) {
				ParameterRow row = rows.next();
				this.databaseDAO.deleteMain(row.toMap());
				updCnt++;
			}
		}

		// subList 추가, 삭제, 수정
		if (column1 != null && subList != null) {
			Iterator<ParameterRow> rows = subList.getInsertedRows();
			while (rows.hasNext()) {
				ParameterRow row = rows.next();
				Map<String, String> rowData = row.toMap();
				rowData.put("column1", column1);
				this.databaseDAO.insertSub1(rowData);
				updCnt++;
			}

			rows = subList.getUpdatedRows();
			while (rows.hasNext()) {
				ParameterRow row = rows.next();
				Map<String, String> rowData = row.toMap();
				rowData.put("column1", column1);
				this.databaseDAO.updateSub1(rowData);
				updCnt++;
			}

			rows = subList.getDeletedRows();
			while (rows.hasNext()) {
				ParameterRow row = rows.next();
				Map<String, String> rowData = row.toMap();
				rowData.put("column1", column1);
				this.databaseDAO.deleteSub1(rowData);
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
