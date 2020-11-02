package exbuilder.sample.template.web;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.spring.JSONDataView;

import exbuilder.sample.dao.DatabaseDAO;
import exbuilder.util.XBUtil;

@Controller
@RequestMapping("/template/movableresizable")
public class GridMovableResizableController {
	
	public GridMovableResizableController() {
	}
	
	@RequestMapping("/getList.do")
	public View getMainList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		Random random = new Random();
		List<Map<String, Object>> listData = new ArrayList<Map<String, Object>>();
		for(int i = 0; i < 200; i++) {
			Map<String, Object> rowData = new HashMap<String, Object>();
			
			rowData.put("col1", "col1 - " + i);
			rowData.put("col2", "col2 - " + i);
			rowData.put("col3", "col3 - " + i);
			rowData.put("col4", "col4 - " + i);
			rowData.put("col5", "col5 - " + i);
			rowData.put("col6", "col6 - " + i);
			rowData.put("col7", random.nextInt(200));
			rowData.put("col8", random.nextInt(200));
			rowData.put("col9", random.nextInt(200));
			rowData.put("col10", random.nextInt(200));
			
			listData.add(rowData);
		}
		
		dataRequest.setResponse("ds_list", listData);
		
		return new JSONDataView();
	}
}
