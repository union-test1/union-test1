package exbuilder.sample.main.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.spring.UIView;

@Controller
public class IndexController {

	public IndexController() {
	}

	@RequestMapping("/index.do")
	public View index(HttpServletRequest request, HttpServletResponse response) throws Exception {

		boolean logined = false;
		// 인증체크로직
		{
			HttpSession session = request.getSession(false);
			if (session != null) {
				String userID = (String) session.getAttribute("USER_ID");
				logined = userID != null && "".equals(userID) == false;
			}
		}

		if (logined) {
			return new UIView("/ui/main/main.clx");
		} else {
			return new UIView("/ui/login/login.clx");
		}

	}

}
