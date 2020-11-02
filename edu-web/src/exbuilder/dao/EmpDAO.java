package exbuilder.dao;

import java.util.List;
import java.util.Map;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class EmpDAO {
	private Logger logger = LogManager.getLogger(EmpDAO.class);
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	public List<Map<String, Object>> getEmpList(Map<String, Object> paramMap){
		List<Map<String, Object>> result = this.sqlSession.selectList("emp.getEmpList", paramMap);
		return result;
	}
	
	public int insertEmp(Map paramMap) throws Exception {
		return this.sqlSession.insert("emp.insertEmp", paramMap);
	}

	public int updateEmp(Map paramMap) throws Exception {
		return this.sqlSession.update("emp.updateEmp", paramMap);
	}

	public int deleteEmp(Map paramMap) throws Exception {
		return this.sqlSession.delete("emp.deleteEmp", paramMap);
	}
}
