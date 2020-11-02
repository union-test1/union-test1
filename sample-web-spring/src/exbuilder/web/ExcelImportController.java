package exbuilder.web;

import java.io.File;
import java.io.FileInputStream;
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
@RequestMapping("/import")
public class ExcelImportController {

	
	public ExcelImportController() {
	}

	@RequestMapping("/excel.do")
	public View importExcel(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception {
		Map<String, File[]> uploadFiles = dataRequest.getFiles();
		Set<Entry<String, File[]>> entries = uploadFiles.entrySet();
		for(Entry<String, File[]> entry : entries) {
			String name = entry.getKey();
			File[] files = entry.getValue();
			if(files != null && files.length > 0) {
				List<Map<String, String>> data = this.parseData(files[0]);
				if(data != null) {
					dataRequest.setResponse(name, data);
				}
			}
		}
		
		return new JSONDataView();
	}
	
	@SuppressWarnings("deprecation")
	private List<Map<String, String>> parseData(File file) throws Exception {
		if(file == null || file.exists() == false) {
			return null;
		}
		
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
	
	
}
