package exbuilder.sample.dao;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;


public class MasterTable extends Table {
	private static final String[] COLS = new String[] {
			"column1"
			, "column2"
			, "column3"
			, "column4"
			, "column5"
			, "column6"
			, "column7"
			, "column8"
			, "column9"
			, "column10"
	};
	private static final String[] PKS = new String[] {
			COLS[0]
	};
	
	public MasterTable() {
		super();
		this.init();
	}

	private void init() {
		Random random = new Random();
		byte[] randomData = new byte[10];
		Base64.Encoder encoder = Base64.getEncoder();
		
		List<Map<String, String>> table = new ArrayList<Map<String, String>>();
		for(int i = 0; i < 200; i++) { // 200 개행
			Map<String, String> row = new HashMap<String, String>();
			
			for(String colNm : COLS) {
				random.nextBytes(randomData);
				row.put(colNm, encoder.encodeToString(randomData));
			}
			
			table.add(row);
		}
		this.table = table;
	}
	
	protected String[] getPKNames() {
		return PKS;
	}
	protected String[] getColumnNames() {
		return COLS;
	}

}
