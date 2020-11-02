package exbuilder.util;


public class PagingMap {
	private int targetRow;
	private int rowSize;

	
	public PagingMap() {
	}
	
	public void setTargetRow(int targetRow) {
		this.targetRow = targetRow;
	}
	
	public int getTargetRow() {
		return this.targetRow;
	}
	
	public void setRowSize(int rowSize) {
		this.rowSize = rowSize;
	}
	
	public int getRowSize() {
		return this.rowSize;
	}

}
