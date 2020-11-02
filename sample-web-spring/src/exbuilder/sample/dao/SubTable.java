package exbuilder.sample.dao;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;


public class SubTable extends Table {
	private String[] COLS = null;
	private String[] FKS = null;
	private String[] PKS = null;
	
	
	public SubTable(Table table) {
		super();
		this.init(table);
	}
	
	private void init(Table parent) {
		// columns
		String[] fks = parent.getPKNames();
		
		List<String> COLS = new ArrayList<String>();
		List<String> FKS = new ArrayList<String>();
		List<String> PKS = new ArrayList<String>();
		
		int i = 0;
		for(String fk : fks) {
			COLS.add(fk);
			FKS.add(fk);
			PKS.add(fk);
			i++;
		}
		String colName = "column" + (++i);
		COLS.add(colName);
		PKS.add(colName);

		for(; i < 10; i++) {
			colName = "column" + (i + 1);
			COLS.add(colName);
		}
		this.COLS = new String[COLS.size()];
		this.FKS = new String[FKS.size()];
		this.PKS = new String[PKS.size()];
		COLS.toArray(this.COLS);
		FKS.toArray(this.FKS);
		PKS.toArray(this.PKS);
		
		// datas
		Random random = new Random();
		byte[] randomData = new byte[10];
		Base64.Encoder encoder = Base64.getEncoder();
		
		List<Map<String, String>> table = new ArrayList<Map<String, String>>();
		List<Map<String, String>> parentRows = parent.getData();
		for(Map<String, String> parentRow : parentRows) {
			for(int c = 0; c < 5; c++) { // parent 당 5 개행
				Map<String, String> row = new HashMap<String, String>();
				
				for(String colNm : COLS) {
					if(FKS.contains(colNm)) {
						row.put(colNm, parentRow.get(colNm));
					} else {
						random.nextBytes(randomData);
						row.put(colNm, encoder.encodeToString(randomData));
					}
				}
				
				table.add(row);
			}
		}
		this.table = table;
	}

	protected String[] getPKNames() {
		return this.PKS;
	}
	protected String[] getColumnNames() {
		return this.COLS;
	}

}
