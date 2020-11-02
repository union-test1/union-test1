package exbuilder.web;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.spring.JSONDataView;


@Controller
@RequestMapping("/paging")
public class PagingInfoController {
	private static Map<String, Map<String, Integer>> PAGINGTYPE = new HashMap<String, Map<String, Integer>>();
	static {
		Map<String, Integer> type1 = new HashMap<String, Integer>();
		type1.put("rowSize", 14);
		type1.put("pageSize", 3);
		
		Map<String, Integer> type2 = new HashMap<String, Integer>();
		type2.put("rowSize", 30);
		type2.put("pageSize", 5);
		
		Map<String, Integer> type3 = new HashMap<String, Integer>();
		type3.put("rowSize", 50);
		type3.put("pageSize", 10);
		
		PAGINGTYPE.put("1", type1);
		PAGINGTYPE.put("2", type2);
		PAGINGTYPE.put("3", type3);
	}

	
	@RequestMapping("/pagingInfo.do")
	public View getPagingInfo(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception {
		String pagingType = dataRequest.getParameter("pagingType");
		System.out.println("pagingType : " + pagingType);
		pagingType = pagingType == null ? "1" : pagingType;
		
		Map<String, Integer> pagingInfo = PAGINGTYPE.get(pagingType);
		if(pagingInfo == null) {
			pagingInfo = PAGINGTYPE.get("1");
		}
		
		dataRequest.setResponse("PagingInfo", pagingInfo);
		
		return new JSONDataView();
	}
	

	
}
