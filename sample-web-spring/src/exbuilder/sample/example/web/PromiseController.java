package exbuilder.sample.example.web;

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

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.spring.JSONDataView;


@Controller
@RequestMapping("/example/promise")
public class PromiseController {
	private Random random = new Random();
	private SimpleDateFormat dayFormat = new SimpleDateFormat("yyyyMMdd");
	private SimpleDateFormat hourFormat = new SimpleDateFormat("HH:mm:ss");


	public PromiseController() {
	}
	
	@RequestMapping("/submain.do")
	public View subMain(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		dataRequest.setResponse("main", this.createData());

		return new JSONDataView();
	}
	
	@RequestMapping("/subsub1.do")
	public View subSub1(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		dataRequest.setResponse("sub1", this.createData());

		return new JSONDataView();
	}
	
	@RequestMapping("/subsub2.do")
	public View subSub2(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		dataRequest.setResponse("sub2", this.createData());

		return new JSONDataView();
	}
	
	@RequestMapping("/subsub3.do")
	public View subSub3(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		dataRequest.setResponse("sub3", this.createData());

		return new JSONDataView();
	}
	
	private List<Map<String, Object>> createData() {
		Date date = new Date();
		
		List<Map<String, Object>> listData = new ArrayList<Map<String, Object>>();
		for(int i = 0; i < 1000; i++) {
			Map<String, Object> rowData = new HashMap<String, Object>();
			
			int idx = (int)Math.ceil(i / 6);
			rowData.put("column1", "대구분-" + idx);
			rowData.put("column2", "중구분-" + idx);
			rowData.put("column3", "소구분-" + idx);
			rowData.put("column4", this.random.nextInt());
			rowData.put("column5", this.dayFormat.format(date));
			rowData.put("column6", this.hourFormat.format(date));
			
			listData.add(rowData);
		}
		
		return listData;
	}

}
