package exbuilder.sample.main.web;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.spring.JSONDataView;


@Controller
public class LoginController {
	
	
	public LoginController() {
	}
	
	@RequestMapping("/login.do")
	public View login(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception {
		ParameterGroup loginParam = dataRequest.getParameterGroup("dm_login");
		
		boolean success = false;
		Map<String, Object> message = new HashMap<String, Object>();
		if(loginParam != null) {
			String userID = loginParam.getValue("user_id");
			String password = loginParam.getValue("user_pass");
			
			System.out.println("userID : " + userID + ", password : " + password);
			if(userID != null && "".equals(userID) == false) {
				HttpSession session = request.getSession(false);
				if(session != null) {
					session.invalidate();
				}
				session = request.getSession(true);
				session.setAttribute("USER_ID", userID);
				success = true;
				
				message.put("uri", "main/main");
			} else {
				message.put("message", "ID를 입력하세요.");
			}
		}
		
		dataRequest.setMetadata(success, message);
		
		return new JSONDataView();
	}
	
	@RequestMapping("/logout.do")
	public View logout(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception {
		Map<String, Object> message = new HashMap<String, Object>();
		HttpSession session = request.getSession(false);
		if(session != null) {
			session.invalidate();
		}
		
		message.put("uri", "login/login");
		
		dataRequest.setMetadata(true, message);
		
		return new JSONDataView();
	}

}
