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
@RequestMapping("/template/md_treegrid")
public class MD_TreeGridController {

	@Autowired
	private DatabaseDAO databaseDAO;
	
	
	public MD_TreeGridController() {
	}
	
	@RequestMapping("/getMainList.do")
	public View getMainList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		// parameter
		Map<String, Object> reqKey = XBUtil.getParamMap(dataRequest, "reqKey");
		
		//select result
		List<Map<String, String>> resList = this.databaseDAO.selectTree(reqKey);
		dataRequest.setResponse("resList", resList);
		
		//message 전달
		Map<String, Object> meta = new HashMap<String, Object>();
		if(resList.size() == 0) {
			meta.put("msg", "데이터가 없습니다.");
		}
		dataRequest.setMetadata(true, meta);

		return new JSONDataView();
	}

	@RequestMapping("/getSubList.do")
	public View getSubList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		// parameter
		Map<String, Object> reqKey = XBUtil.getParamMap(dataRequest, "reqSubKey");
		
		//select result
		List<Map<String, String>> resList = this.databaseDAO.selectTreeSub(reqKey);
		dataRequest.setResponse("resSubList", resList);
		
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
		// parameter
		ParameterGroup resSubList = dataRequest.getParameterGroup("resSubList");
		String msg = "변경된 정보가 없습니다.";

		// resList 추가, 삭제, 수정
		if (resSubList != null) {
			Iterator<ParameterRow> rows = resSubList.getInsertedRows();
			while (rows.hasNext()) {
				ParameterRow row = rows.next();
				this.databaseDAO.insertTreeSub(row.toMap());
			}

			rows = resSubList.getUpdatedRows();
			while (rows.hasNext()) {
				ParameterRow row = rows.next();
				this.databaseDAO.updateTreeSub(row.toMap());
			}

			rows = resSubList.getDeletedRows();
			while (rows.hasNext()) {
				ParameterRow row = rows.next();
				this.databaseDAO.deleteTreeSub(row.toMap());
			}
			msg = "변경되었습니다.";
		}
		
		Map<String, Object> meta = new HashMap<String, Object>();
		meta.put("msg", msg);
		dataRequest.setMetadata(true, meta);

		return new JSONDataView();
	}

}
