package exbuilder.sample.example.web;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.builder.TSVResponseBuilder;
import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.DataResponse;
import com.cleopatra.spring.JSONDataView;


@Controller
@RequestMapping("/example/gridcrud")
public class GridCrudController {


	public GridCrudController() {
	}
	
	@RequestMapping("/splitData.do")
	public View splitData(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		Random random = new Random();
		SimpleDateFormat dayFormat = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat hourFormat = new SimpleDateFormat("HH:mm:ss");
		Date date = new Date();
		List<Map<String, Object>> listData = new ArrayList<Map<String, Object>>();
		for(int i = 0; i < 3000; i++) {
			Map<String, Object> rowData = new HashMap<String, Object>();
			
			int idx = (int)Math.ceil(i / 6);
			rowData.put("column1", "대구분-" + idx);
			rowData.put("column2", "중구분-" + idx);
			rowData.put("column3", "소구분-" + idx);
			rowData.put("column4", "세구분-" + idx);
			rowData.put("column5", "상세정보상세정보상세정보상세정보상세정보상세정보상세정보상세정보");
			
			rowData.put("column6", random.nextInt());
			rowData.put("column7", random.nextInt());
			rowData.put("column8", random.nextInt());
			rowData.put("column9", random.nextInt());
			rowData.put("column10", random.nextInt());
			rowData.put("column11", dayFormat.format(date));
			rowData.put("column12", hourFormat.format(date));
			rowData.put("column13", "상세정보상세정보상세정보");
			rowData.put("column14", dayFormat.format(date));
			rowData.put("column15", hourFormat.format(date));
			rowData.put("column16", "상세정보상세정보상세정보");
			rowData.put("column17", dayFormat.format(date));
			rowData.put("column18", "Y");
			rowData.put("column19", "N");
			rowData.put("column20", "비고비고비고비고비고비고비고비고비고");
			
			listData.add(rowData);
		}
		
		dataRequest.setResponse("mainDS", listData);
		
		return new JSONDataView();
	}
	
	@RequestMapping("/splitData2.do")
	public View splitData2(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		Random random = new Random();
		SimpleDateFormat dayFormat = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat hourFormat = new SimpleDateFormat("HH:mm:ss");
		Date date = new Date();
		List<Map<String, Object>> listData = new ArrayList<Map<String, Object>>();
		for(int i = 0; i < 1000; i++) {
			Map<String, Object> rowData = new HashMap<String, Object>();
			
			int idx = (int)Math.ceil(i / 6);
			rowData.put("column1", "대구분-" + idx);
			rowData.put("column2", "중구분-" + idx);
			rowData.put("column3", "소구분-" + idx);
			rowData.put("column4", "세구분-" + idx);
			rowData.put("column5", "상세정보상세정보상세정보상세정보상세정보상세정보상세정보상세정보");
			
			rowData.put("column6", random.nextInt());
			rowData.put("column7", random.nextInt());
			rowData.put("column8", random.nextInt());
			rowData.put("column9", random.nextInt());
			rowData.put("column10", random.nextInt());
			rowData.put("column11", dayFormat.format(date));
			rowData.put("column12", hourFormat.format(date));
			rowData.put("column13", "상세정보상세정보상세정보");
			rowData.put("column14", dayFormat.format(date));
			rowData.put("column15", hourFormat.format(date));
			rowData.put("column16", "상세정보상세정보상세정보");
			rowData.put("column17", dayFormat.format(date));
			rowData.put("column18", "Y");
			rowData.put("column19", "N");
			rowData.put("column20", "비고비고비고비고비고비고비고비고비고");
			
			listData.add(rowData);
		}
		
		dataRequest.setResponse("mainDS", listData);
		
		return new JSONDataView();
	}
	
	@RequestMapping("/bigData.do")
	public View bigData(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		Random random = new Random();
		List<Map<String, Object>> listData = new ArrayList<Map<String, Object>>();
		
		for(int i = 0; i < 200000; i++) {
			Map<String, Object> rowData = new HashMap<String, Object>();
			
			int idx = (int)Math.ceil(i / 6);
			rowData.put("column1", "대구분-" + idx);
			rowData.put("column2", "중구분-" + idx);
			rowData.put("column3", "소구분-" + idx);
			rowData.put("column4", "세구분-" + idx);
			rowData.put("column5", "상세구분-" + i);
			
			rowData.put("column6", random.nextInt());
			rowData.put("column7", random.nextInt());
			rowData.put("column8", random.nextInt());
			rowData.put("column9", random.nextInt());
			rowData.put("column10", random.nextInt());
			
			listData.add(rowData);
		}
		
		dataRequest.setResponse("mainDS", listData);
		
		return new JSONDataView();
	}
	
	@RequestMapping("/massData.do")
	public void massData(HttpServletRequest request, HttpServletResponse response) {
		Random random = new Random();
		final DataResponse dataResponse = DataResponse.getInstance(TSVResponseBuilder.CONTENT_TYPE, response);
		
		for(int i = 0; i < 200000; i++) {
			Map<String, Object> rowData = new HashMap<String, Object>();
			
			int idx = (int)Math.ceil(i / 6);
			rowData.put("column1", "대구분-" + idx);
			rowData.put("column2", "중구분-" + idx);
			rowData.put("column3", "소구분-" + idx);
			rowData.put("column4", "세구분-" + idx);
			rowData.put("column5", "상세구분-" + i);
			
			rowData.put("column6", random.nextInt());
			rowData.put("column7", random.nextInt());
			rowData.put("column8", random.nextInt());
			rowData.put("column9", random.nextInt());
			rowData.put("column10", random.nextInt());
			
			try {
				dataResponse.send(rowData);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
		
		dataResponse.flush();
	}

}
