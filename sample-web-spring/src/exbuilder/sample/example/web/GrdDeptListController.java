package exbuilder.sample.example.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.spring.JSONDataView;

import exbuilder.sample.dao.DatabaseDAO;


@Controller
@RequestMapping("/example/grdDept")
public class GrdDeptListController {
	@Autowired
	private DatabaseDAO databaseDAO;
	
	
	public GrdDeptListController() {
	}
	
	@RequestMapping("/getDeptList.do")
	public View getDeptList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {		
		//select result
		List<Map<String, Object>> ldept = this.databaseDAO.getDeptLvl1List();
		List<Map<String, Object>> mdept = this.databaseDAO.getDeptLvl2List();
		List<Map<String, Object>> sdept = this.databaseDAO.getDeptLvl3List();
		dataRequest.setResponse("ldept", ldept);
		dataRequest.setResponse("mdept", mdept);
		dataRequest.setResponse("sdept", sdept);
		
		dataRequest.setMetadata(true, null);

		return new JSONDataView();
	}
}
