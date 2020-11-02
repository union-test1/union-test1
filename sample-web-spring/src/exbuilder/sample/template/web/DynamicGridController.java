package exbuilder.sample.template.web;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.spring.JSONDataView;

@Controller
@RequestMapping("/template/dynamicgrid")
public class DynamicGridController {
	private Logger logger = LogManager.getLogger(DynamicGridController.class);
	
	public DynamicGridController () {
	}
	
	/* 현재 사용 중인 대용량 데이터 조회 */
	@RequestMapping("/massdata.do")
	public View getMassData(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception {
		this.logger.debug("getMassData");
		
		ParameterGroup param = dataRequest.getParameterGroup("dm_request");

		String data = param.getValue("DATA");
		String col = param.getValue("COL");
		int rowCnt = 10;
		int colCnt = 20;
		if(data != null || "".equals(data) == false){
			rowCnt = Integer.parseInt(data);
		}
		if(col != null || "".equals(col) == false){
			colCnt = Integer.parseInt(col);
		}
		
		dataRequest.setResponse("ds_list", this.createData(rowCnt, colCnt));
		return new JSONDataView();
	}

	private List<Map<String, Object>> createData(int rowCnt, int colCnt) {
		List<Map<String, Object>> listData = new ArrayList<Map<String, Object>>();
		for (int i = 0; i < rowCnt; i++) {
			Random random = new Random();
			Map<String, Object> rowData = new LinkedHashMap<String, Object>();
			
			for(int j=0; j < colCnt; j++){
				String colResult = String.format("%03d", j+1);
				rowData.put("TEST_COL"+colResult, random.nextInt());
			}
			
			listData.add(rowData);
		}
		
		return listData;
	}
}
