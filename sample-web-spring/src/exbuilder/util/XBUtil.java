package exbuilder.util;

import java.util.HashMap;
import java.util.Map;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;


public class XBUtil {
	private XBUtil() {
	}
	
	/**
	 * usage : exbuilder.util.XBUtil.getParamMap(dataRequest, "reqKey");
	 * @param dataRequest
	 * @param groupName
	 * @return
	 */
	public static Map<String, Object> getParamMap(DataRequest dataRequest, String groupName) {
		if(dataRequest == null || groupName == null) {
			return null;
		}
		ParameterGroup paramGroup = dataRequest.getParameterGroup(groupName);
		if(paramGroup == null) {
			return null;
		}
		Map<String, Object> mapParam = new HashMap<String, Object>();
		String[] colNames = paramGroup.getColumnNames();
		if(colNames != null && colNames.length > 0) {
			for(int i = 0; i < colNames.length; i++) {
				String value = paramGroup.getValue(colNames[i]);
				mapParam.put(colNames[i], value);
			}
		}
		
		return mapParam;
	}
	
	public static void setPageInfo(PagingMap pagingMap, String startPageNo, String pageSize) {
		int iStartPageNo = Integer.parseInt(startPageNo);
		int iPageSize = Integer.parseInt(pageSize);
		
		// 시작 Row Index
		int offset = ((iStartPageNo - 1) * iPageSize) + 1;
		pagingMap.setTargetRow(offset);
		pagingMap.setRowSize(iPageSize);
	}
	
	/**
	 * policy based
	 * @param pagingMap
	 * @param startPageNo
	 * @param pageSize
	 */
	public static void setPageInfo(PagingMap pagingMap, String startPageNo) {
		int iStartPageNo = Integer.parseInt(startPageNo);
		int iPageSize = pagingMap.getRowSize();
		
		// 시작 Row Index
		int offset = ((iStartPageNo - 1) * iPageSize) + 1;
		pagingMap.setTargetRow(offset);
		pagingMap.setRowSize(iPageSize);
	}

}
