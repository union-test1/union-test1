package exbuilder.sample.example.web;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.protocol.data.ParameterRow;
import com.cleopatra.spring.JSONDataView;

import exbuilder.util.XBUtil;

@Controller
@RequestMapping("/example/crud")
public class FileUploadController {
	private List<Map<String, String>> database = new ArrayList<Map<String, String>>();
	private Map<String, File> files = new HashMap<String, File>();
	
	public FileUploadController() {
	}
	
	@PostConstruct
	private void init() {
		String path = this.getClass().getResource("/exbuilder/sample/example/resource").getPath();
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
		File file = new File(path + "tomatosystem_ci.jpg");
		 
		for(int i = 0; i < 1000; i++) {
			Map<String, String> row = new HashMap<>();
			row.put("column1", "PK-" + (i + 1));
			row.put("column2", "데이터 - " + (i + 1));
			row.put("column3", format.format(new Date()));
			row.put("column4", "상세정보 - " + (i + 1) + "\n상세정보상세정보\n(상세정보상세정보상세정보)\n(상세정보상세정보상세정보)\n(상세정보상세정보상세정보)");
			row.put("column5", "tomatosystem_ci.jpg");
			
			this.database.add(row);
			this.files.put("f@PK-" + (i + 1), file);
		}
	}
	
	@RequestMapping("/list.do")
	public View list(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {		
		dataRequest.setResponse("ds_main", this.database);
		
		return new JSONDataView();
	}
	
	@RequestMapping("/save.do")
	public View save(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		ParameterGroup paramGrp = dataRequest.getParameterGroup("ds_main");
		
		if(paramGrp != null) {
			Iterator<ParameterRow> rows = null;
			
			// insert
			rows = paramGrp.getInsertedRows();
			while(rows.hasNext()) {
				ParameterRow row = rows.next();
				String[] colNames = row.getColumnNames();
				
				Map<String, String> rowData = new HashMap<String, String>();
				for(String colName : colNames) {
					rowData.put(colName, row.getValue(colName));
				}
				
				this.database.add(rowData);
			}
			
			// delete
			rows = paramGrp.getDeletedRows();
			while(rows.hasNext()) {
				ParameterRow row = rows.next();
				String pk = row.getValue("column1");
				innerLoop : for(int i = 0; i < this.database.size(); i++) {
					Map<String, String> old = this.database.get(i);
					String col1 = old.get("column1");
					if(col1.equals(pk)) {
						this.database.remove(i);
						break innerLoop;
					}
				}
			}
			
			// update
			rows = paramGrp.getUpdatedRows();
			dataRequest.getUploadFiles();
			while(rows.hasNext()) {
				ParameterRow row = rows.next();
				String pk = row.getValue("column1");
				innerLoop : for(Map<String, String> old : this.database) {
					String col1 = old.get("column1");
					if(col1.equals(pk)) {
						String[] colNames = row.getColumnNames();
						
						for(String colName : colNames) {
							old.put(colName, row.getValue(colName));
						}
						break innerLoop;
					}
				}
			}
		}

		// files
		Map<String, File[]> files = dataRequest.getFiles();
		if(files != null && files.size() > 0) {
			Set<Entry<String, File[]>> fileEntrySet = files.entrySet();
			for(Entry<String, File[]> entry : fileEntrySet) {
				System.out.println("==========>>>>>"+entry.getKey() + ":" + entry.getValue()[0]);
				this.files.put(entry.getKey(), entry.getValue()[0]);
			}
		}
		
		// response message
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("message", "저장되었습니다.");
		
		dataRequest.setResponse("ds_main", this.database);
		dataRequest.setMetadata(true, message);
		
		return new JSONDataView();
	}
	
	@RequestMapping("checkfile.do")
	public View checkFile(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest){
		ParameterGroup parameterGroup = dataRequest.getParameterGroup("dm_check_file");
		String fileKey = parameterGroup.getValue("file_key");
		
		Map<String, String> fileinfo = null;
		Map<String, String> row;
		for(int i = 0; i < this.database.size(); i++) {
			row = this.database.get(i);
			String col1 = row.get("column1");
			if(col1.equals(fileKey)) {
				fileinfo = row;
				break;
			}
		}
		
		Map<String, Object> resParam = new HashMap<String, Object>();
		resParam.put("file_key", fileKey);
		resParam.put("has_file", (fileinfo != null) ? true : false);
		dataRequest.setResponse("dm_check_file", resParam);
		return new JSONDataView();
	}
	
	
	@RequestMapping("/file.do")
	public View downloadFile(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws IOException {
		String prefix = dataRequest.getParameter("prefix");
		String fileKey = dataRequest.getParameter("filekey");
		
		File file = null;
		Set<Entry<String, File>> fileEntrySet = this.files.entrySet();
		for(Entry<String, File> entry : fileEntrySet) {
			if (prefix.concat(fileKey).equals(entry.getKey())) {
				file = entry.getValue();
				break;
			}
		}
		
		System.out.println("-------------->>>>>>>>>>>>"+file);
		if (file != null) {
			Map<String, String> fileinfo = null;
			for(int i = 0; i < this.database.size(); i++) {
				Map<String, String> row = this.database.get(i);
				String pk = row.get("column1");
				if(fileKey.equals(pk)) {
					fileinfo = row;
					break;
				}
			}
			
			String fileName = (String) fileinfo.get("column5");
			String userAgent = request.getHeader("User-Agent");

			response.setHeader("Content-Type", "application/octet-stream");
			response.setHeader("Content-Length", String.valueOf(file.length()));
			String headerValue;
			if (userAgent != null && (userAgent.indexOf("Chrome") > -1 || userAgent.indexOf("Trident") > -1)) {
				//IE11, Chrome에서 정상적으로 파일명 나옴.
				headerValue = String.format("attachment; filename=\"%s\"", URLEncoder.encode(fileName, "UTF-8")).replaceAll("\\+", " ");
			} else {
				//Safari, FireFox
				headerValue = String.format("attachment; filename=\"%s\"", new String(fileName.getBytes("UTF-8"), "latin1"));
			}
			response.setHeader("Content-Disposition", headerValue);
			Files.copy(file.toPath(), response.getOutputStream());
			
		}

		return new JSONDataView();
	}
	
}

