package exbuilder.web;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.spring.JSONDataView;


@Controller
public class DataImportController {


	public DataImportController() {
	}
	
	@RequestMapping("/dataimport.do")
	public View importData(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception {
		String type = dataRequest.getParameter("type");
		
		Map<String, File[]> uploadFiles = dataRequest.getFiles();
		Set<Entry<String, File[]>> entries = uploadFiles.entrySet();
		for(Entry<String, File[]> entry : entries) {
			String name = entry.getKey();
			File[] files = entry.getValue();
			if(files != null && files.length > 0 && files[0] != null && files[0].exists() == true) {
				List<Map<String, String>> data = null;
				if(type.equals("xlsx")) {
					data = this.parseExcel(files[0]);
				} else {
					// default csv
					data = this.parseCSV(files[0]);
				}
				
				if(data != null) {
					dataRequest.setResponse(name, data);
				}
			}
		}
		
		return new JSONDataView();
	}
	
	private List<Map<String, String>> parseExcel(File file) throws Exception {
		List<Map<String,String>> data = new ArrayList<Map<String, String>>();
		
		FileInputStream in = null;
		Workbook workbook = null;
		Map<Integer, String> header = new HashMap<Integer, String>();
		try {
			in = new FileInputStream(file);
			workbook = new XSSFWorkbook(in);
			Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();
            
            // single row header
            if(iterator.hasNext()) {
            	Row row = iterator.next();
            	Iterator<Cell> cellIterator = row.iterator();
            	while(cellIterator.hasNext()) {
            		Cell cell = cellIterator.next();
            		int colIdx = cell.getColumnIndex();
            		String value = cell.getStringCellValue();
            		header.put(colIdx, value);
            	}
            }
            
            // single row data
            while(iterator.hasNext()) {
            	Map<String, String> rowData = new HashMap<String, String>();
            	Collection<String> headers = header.values();
            	for(String h : headers) {
            		rowData.put(h, null);
            	}
            	
            	Row row = iterator.next();
            	Iterator<Cell> cellIterator = row.iterator();
            	while(cellIterator.hasNext()) {
            		Cell cell = cellIterator.next();
            		int colIdx = cell.getColumnIndex();
            		String name = header.get(new Integer(colIdx));
            		String value = null;
            		if(cell.getCellTypeEnum() == CellType.STRING) {
                		value = cell.getStringCellValue();
            		} else if(cell.getCellTypeEnum() == CellType.NUMERIC) {
            			value = "" + cell.getNumericCellValue();
            		}
            		rowData.put(name, value);
            	}
            	
            	data.add(rowData);
            }
        } finally {
			if(in != null) {
				try {
					in.close();
				} catch(Exception e) {
					e.printStackTrace();
				}
			}
			if(workbook != null) {
				try {
					workbook.close();
				} catch(Exception e) {
					e.printStackTrace();
				}
			}
		}
		
		return data;
	}
	
	private List<Map<String, String>> parseCSV(File file) throws IOException {
		List<Map<String,String>> data = new ArrayList<Map<String, String>>();
		
		BufferedReader reader = null;
		try {
			String[] headers = null;
			reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "utf-8"));
			String line = reader.readLine();
			if(line == null) {
				return data;
			}
			headers = line.split("[,]");
			for(int i = 0; i < headers.length; i++) {
				headers[i] = headers[i].trim();
			}
			for(line = reader.readLine(); line != null; line = reader.readLine()) {
				Map<String, String> row = new HashMap<String, String>();
				String[] rowData = line.split("[,]");
				for(int i = 0; i < headers.length; i++) {
					String value = null;
					if(rowData.length > i) {
						value = rowData[i].trim();
					}
					row.put(headers[i], value);
				}
				if(row.size() > 0) {
					data.add(row);
				}
			}
		} finally {
			if(reader != null) {
				try {
					reader.close();
				} catch(Exception e) {
					e.printStackTrace();
				}
			}
		}
		
		return data;
	}




}
