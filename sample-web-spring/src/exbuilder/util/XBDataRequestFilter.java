package exbuilder.util;

import javax.servlet.http.HttpServletRequest;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.parser.RequestFilter;


public class XBDataRequestFilter implements RequestFilter {

	
	public XBDataRequestFilter() {
		System.out.println("# create XBDataRequestFilter");
	}

	@Override
	public void filter(DataRequest arg0, HttpServletRequest arg1) {
		// TODO Auto-generated method stub
		
		System.out.println("# call XBDataRequestFilter.filter");
	}

}
