package exbuilder.sample.dao;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import exbuilder.util.PagingMap;


public abstract class Table {
	protected List<Map<String, String>> table = new ArrayList<Map<String, String>>();
	
	public Table() {
	}
	
	protected abstract String[] getPKNames();
	protected abstract String[] getColumnNames();
	
	protected void copyRow(Map<String, String> src, Map<String, String> des) {
		String[] colNames = this.getColumnNames();
		for(String colName : colNames) {
			des.put(colName, src.get(colName));
		}
	}
	
	public List<Map<String, String>> getData() {
		return Collections.unmodifiableList(this.table);
	}
	
	public int getTotCnt(Map<String, Object> requestMap) {
		if(requestMap == null || requestMap.size() == 0) {
			return this.table.size();
		}
		int totCnt = 0;
		String[] cols = this.getColumnNames();
		outter : for(Map<String, String> row : this.table) {
			for(String colName : cols) {
				if(requestMap.containsKey(colName)) {
					String rowValue = row.get(colName);
					String value = (String)requestMap.get(colName);
					if(rowValue.indexOf(value) == -1) {
						continue outter;
					}
				}
			}
			totCnt++;
		}
		
		return totCnt;
	}
	
	public List<Map<String, String>> select(Map<String, Object> requestMap) {
		if(requestMap == null || requestMap.size() == 0) {
			return this.getData();
		}
		List<Map<String, String>> result = new ArrayList<Map<String, String>>();
		String[] cols = this.getColumnNames();
		outter : for(Map<String, String> row : this.table) {
			for(String colName : cols) {
				if(requestMap.containsKey(colName)) {
					String rowValue = row.get(colName);
					String value = (String)requestMap.get(colName);
					if(rowValue.indexOf(value) == -1) {
						continue outter;
					}
				}
			}
			result.add(row);
		}
		
		return result;
	}
	
	public List<Map<String, String>> select(Map<String, Object> requestMap, PagingMap pagingMap) {
		if(requestMap == null || requestMap.size() == 0) {
			return this.getData();
		}
		List<Map<String, String>> inlineTable = new ArrayList<Map<String, String>>();
		String[] cols = this.getColumnNames();
		outter : for(Map<String, String> row : this.table) {
			for(String colName : cols) {
				if(requestMap.containsKey(colName)) {
					String rowValue = row.get(colName);
					String value = (String)requestMap.get(colName);
					if(rowValue.indexOf(value) == -1) {
						continue outter;
					}
				}
			}
			inlineTable.add(row);
		}
		
		List<Map<String, String>> result = new ArrayList<Map<String, String>>();
		int offset = pagingMap.getTargetRow();
		
		int rowSize = pagingMap.getRowSize();
		if(inlineTable.size() < offset) {
			return result;
		}
		
		for(int i = (offset - 1), count = 0; count < rowSize && i < inlineTable.size(); i++, count++) {
			result.add(inlineTable.get(i));
		}
		
		return result;
	}
	
	public void insert(Map<String, String> data) {
		Map<String, String> newRow = new HashMap<String, String>();
		
		this.copyRow(data, newRow);
		
		this.table.add(newRow);
	}
	
	public void delete(Map<String, String> data) {
		String[] pkCol = this.getPKNames();
		String[] pkValue = new String[pkCol.length];
		for(int i = 0; i < pkCol.length; i++) {
			pkValue[i] = data.get(pkCol[i]);
		}
		
		outter : for(Map<String, String> old : this.table) {
			for(int j = 0; j < pkCol.length; j++) {
				if(old.get(pkCol[j]).equals(data.get(pkCol[j])) == false) {
					continue outter;
				}
			}
			this.table.remove(old);
			return;
		}
	}
	
	public void update(Map<String, String> data) {
		String[] pkCol = this.getPKNames();
		String[] pkValue = new String[pkCol.length];
		for(int i = 0; i < pkCol.length; i++) {
			pkValue[i] = data.get(pkCol[i]);
		}
		
		outter : for(Map<String, String> old : this.table) {
			for(int j = 0; j < pkCol.length; j++) {
				if(old.get(pkCol[j]).equals(data.get(pkCol[j])) == false) {
					continue outter;
				}
			}
			this.copyRow(data, old);
			return;
		}
	}

	@Override
	public String toString() {
		return "Table [table=" + this.table + "]";
	}
	

}
