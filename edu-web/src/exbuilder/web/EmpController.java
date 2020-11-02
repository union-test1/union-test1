package exbuilder.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.binding.MapperMethod.ParamMap;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.protocol.data.ParameterRow;
import com.cleopatra.spring.JSONDataView;

import exbuilder.dao.EmpDAO;

@Controller
@RequestMapping("/emp")
public class EmpController {
	private Logger logger = LogManager.getLogger(EmpController.class);
	
	@Autowired
	private EmpDAO empDAO;
	
	public EmpController(){
	}
	
	/**
	 * 직원 정보 조회
	 * @param request
	 * @param response
	 * @param dataRequest
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("/empList.do")
	public View getEmpList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws IOException{
		this.logger.debug("getEmpList");
		
		/**
		 * DataRequest : 서브미션 통신에 대한 데이터
		 * ParameterGroup : 서브미션 request 데이터를 받음
		 * JSONDataView : eXbuilder6의 clx로 데이터를 통신하기 위해 JSON형태로 넘겨주는 부분
		 */
		ParameterGroup param = dataRequest.getParameterGroup("dm1");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		
		if(param != null){
			
			String empName = param.getValue("strName");
			
			if(empName != null && !"".equals(empName)){
				paramMap.put("NAME", empName);
			}
		}
		
		List<Map<String, Object>> getEmpList = this.empDAO.getEmpList(paramMap);
		dataRequest.setResponse("ds1", getEmpList);
		
		return new JSONDataView();
	}
	
	@RequestMapping("/save.do")
	public View empSave(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws Exception {
		/**
		 * 데이터셋은 request로 넘어올 때 각각의 상태값을 포함한다.
		 * (INSERT, UPDATE, DELETE 등)
		 * 따라서 데이터셋의 상태값을 통해 해당하는 쿼리문을 실행한다.
		 */
		ParameterGroup parameterGroup = dataRequest.getParameterGroup("ds1");
		
		if (parameterGroup != null) {
			Iterator<ParameterRow> iter;
			
			iter = parameterGroup.getInsertedRows();
			while (iter.hasNext()) {
				this.empDAO.insertEmp(iter.next().toMap());
			}
			iter = parameterGroup.getUpdatedRows();
			while (iter.hasNext()) {
				this.empDAO.updateEmp(iter.next().toMap());
			}
			iter = parameterGroup.getDeletedRows();
			while (iter.hasNext()) {
				this.empDAO.deleteEmp(iter.next().toMap());
			}
		}
		
		return new JSONDataView();
	}
}
