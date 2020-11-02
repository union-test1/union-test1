package exbuilder.sample.dao;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

public class TreeTable extends Table {
	private static final String[] COLS = new String[] {
			"column1" /* key */
			, "column2" /* label */
			, "column3" /* parent */
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
	
	private String root;
	private int depth;
	
	
	public TreeTable(String rootKey, int depth, int child) {
		super();
		
		this.init(rootKey, depth, child);
	}

	private void init(String rootKey, int depth, int child) {
		this.root = rootKey;
		this.depth = depth;
		
		Random random = new Random();
		byte[] randomData = new byte[10];
		Base64.Encoder encoder = Base64.getEncoder();
		
		List<Map<String, String>> table = new ArrayList<Map<String, String>>();
		// root
		List<String> parentKey = new ArrayList<String>();
		parentKey.add(rootKey);
		for(int i = 0; i < depth; i++) {
			List<String> nextParentKey = new ArrayList<String>();
			for(String pKey : parentKey) {
				for(int j = 0; j < child; j++) {
					Map<String, String> row = new HashMap<String, String>();
					
					for(String colNm : COLS) {
						random.nextBytes(randomData);
						row.put(colNm, encoder.encodeToString(randomData));
					}
					String value = row.get("column1");
					nextParentKey.add(value);
					
					row.put("column2", value);
					row.put("column3", pKey);
					
					table.add(row);
				}
			}
			parentKey = nextParentKey;
		}
		
		this.table = table;
	}
	
	public List<Map<String, String>> select(Map<String, Object> requestMap) {
		if(requestMap == null || requestMap.size() == 0) {
			return this.getData();
		}
		
		List<Map<String, String>> tree = new ArrayList<Map<String, String>>();
		
		requestMap.put("column3", this.root);
		List<Map<String, String>> result = super.select(requestMap);
		tree.addAll(result);
		
		Map<String, Object> param = new HashMap<String, Object>();
		
		for(int i = 0; i < this.depth; i++) {
			List<Map<String, String>> tempResult = new ArrayList<Map<String, String>>();
			for(Map<String, String> row : result) {
				param.put("column3", row.get("column1"));
				
				List<Map<String, String>> subTree = super.select(param);
				tree.addAll(subTree);
				tempResult.addAll(subTree);
			}
			result = tempResult;
		}
		
		return tree;
	}
	
	@Override
	protected String[] getPKNames() {
		return PKS;
	}

	@Override
	protected String[] getColumnNames() {
		return COLS;
	}

}
