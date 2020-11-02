package exbuilder.sample.main.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;

@Controller
public class TestController {

	public TestController(){
		
	}
	@RequestMapping("/test.do")
	public View test(HttpServletRequest request, HttpServletResponse response) throws Exception {

		return new UIView("/ui/TEST/view/test.clx");
	}
	@RequestMapping("/testNew.do")
	public View testNew(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		return new UIView("/ui/TEST/view/testNew.clx");
	}

	@RequestMapping("/testShow.do")
	public View show(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		
		List<Map<String, Object>> listData = new ArrayList<Map<String, Object>>();
		
		for(int i = 0; i < 10; i++) {
			Map<String, Object> rowData = new HashMap<String, Object>();
			rowData.put("사원번호", "20200101");
			rowData.put("이름", "황재현");
			rowData.put("직급", "사원");
			rowData.put("전화번호", "01015151515");
			rowData.put("나이", "29");
			listData.add(rowData);
						
			rowData = new HashMap<String, Object>();
			rowData.put("사원번호", "20200102");
			rowData.put("이름", "김대리");
			rowData.put("직급", "대리");
			rowData.put("전화번호", "01062626262");
			rowData.put("나이", "33");
			listData.add(rowData);
			rowData = new HashMap<String, Object>();
			rowData.put("사원번호", "20200103");
			rowData.put("이름", "허진영");
			rowData.put("직급", "연구원");
			rowData.put("전화번호", "01054545454");
			rowData.put("나이", "28");
			listData.add(rowData);
			rowData = new HashMap<String, Object>();
			rowData.put("사원번호", "20200104");
			rowData.put("이름", "김수현");
			rowData.put("직급", "주임");
			rowData.put("전화번호", "01098788785");
			rowData.put("나이", "26");
			listData.add(rowData);
			rowData = new HashMap<String, Object>();
			rowData.put("사원번호", "20200105");
			rowData.put("이름", "장조림");
			rowData.put("직급", "사장");
			rowData.put("전화번호", "01051515151");
			rowData.put("나이", "43");
			listData.add(rowData);
		}
		
		dataRequest.setResponse("ds1", listData);
		
		return new JSONDataView();
	}
}
