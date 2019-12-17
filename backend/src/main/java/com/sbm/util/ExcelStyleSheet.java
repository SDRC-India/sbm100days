/**
 * 
 */
package com.sbm.util;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.RegionUtil;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

/**
 * @author Ashutosh Dang(ashutosh@sdrc.co.in) Created Date : 08-Dec-2018 5:44:18
 *         PM
 */
@Component
public class ExcelStyleSheet {

	/**
	 * style for color header
	 * 
	 * @param workbook This method will take workbook as parameter
	 * @return headerStyle method will return a style
	 */
	public static CellStyle getStyleForColorHeader(Workbook workbook) {

		CellStyle headerStyle = workbook.createCellStyle();
		headerStyle.setBorderBottom(BorderStyle.THIN);
		headerStyle.setBorderTop(BorderStyle.THIN);
		headerStyle.setBorderLeft(BorderStyle.THIN);
		headerStyle.setBorderRight(BorderStyle.THIN);
		headerStyle.setWrapText(true);
		headerStyle.setAlignment(HorizontalAlignment.CENTER);
		headerStyle.setFillForegroundColor(IndexedColors.SKY_BLUE.getIndex());
		headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		headerStyle.setFont(getFontForHeader(workbook));
		return headerStyle;
	}

	/**
	 * font for header
	 * 
	 * @param workbook This method will take workbook as parameter
	 * @return font method will return a font
	 */
	public static Font getFontForHeader(Workbook workbook) {

		Font font = workbook.createFont();
		font.setFontHeightInPoints((short) 10);
		font.setBold(true);

		return font;
	}

	// odd cell
	public static CellStyle getStyleForOddCell(Workbook workbook) {
		CellStyle colStyleOdd = workbook.createCellStyle();
		colStyleOdd.setBorderBottom(BorderStyle.THIN);
		colStyleOdd.setBorderTop(BorderStyle.THIN);
		colStyleOdd.setBorderLeft(BorderStyle.THIN);
		colStyleOdd.setBorderRight(BorderStyle.THIN);
		colStyleOdd.setAlignment(HorizontalAlignment.CENTER);
		colStyleOdd.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
		colStyleOdd.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		return colStyleOdd;
	}

	public static CellStyle getStyleForEvenCell(Workbook workbook) {

		CellStyle colStyleEven = workbook.createCellStyle();
		colStyleEven.setBorderBottom(BorderStyle.THIN);
		colStyleEven.setBorderTop(BorderStyle.THIN);
		colStyleEven.setBorderLeft(BorderStyle.THIN);
		colStyleEven.setBorderRight(BorderStyle.THIN);
		colStyleEven.setWrapText(true);
		colStyleEven.setAlignment(HorizontalAlignment.CENTER);
		return colStyleEven;

	}

	/**
	 * This method merge column and sets border and color
	 * 
	 * @param rowIndex This method will take rowIndex as parameter
	 * @param columnIndex This method will take columnIndex as parameter
	 * @param rowSpan This method will take rowSpan as parameter
	 * @param columnSpan This method will take columnSpan as parameter
	 * @param sheet This method will take sheet as parameter
	 * @return sheet method will return a sheet
	 */
	public static XSSFSheet doMerge(int rowIndex, int columnIndex, int rowSpan, int columnSpan, XSSFSheet sheet) {

		Cell cell = sheet.getRow(rowIndex).getCell(rowSpan);
		CellRangeAddress range = new CellRangeAddress(rowIndex, columnIndex, rowSpan, columnSpan);

		sheet.addMergedRegion(range);

		RegionUtil.setBorderBottom(BorderStyle.THIN, range, sheet);
		RegionUtil.setBorderTop(BorderStyle.THIN, range, sheet);
		RegionUtil.setBorderLeft(BorderStyle.THIN, range, sheet);
		RegionUtil.setBorderRight(BorderStyle.THIN, range, sheet);

		RegionUtil.setBottomBorderColor(cell.getCellStyle().getBottomBorderColor(), range, sheet);
		RegionUtil.setTopBorderColor(cell.getCellStyle().getTopBorderColor(), range, sheet);
		RegionUtil.setLeftBorderColor(cell.getCellStyle().getLeftBorderColor(), range, sheet);
		RegionUtil.setRightBorderColor(cell.getCellStyle().getRightBorderColor(), range, sheet);

		return sheet;
	}

	public static CellStyle getStyleForHeading(XSSFWorkbook workbook) {

		CellStyle headerStyle = workbook.createCellStyle();
		headerStyle.setBorderBottom(BorderStyle.THIN);
		headerStyle.setBorderTop(BorderStyle.THIN);
		headerStyle.setBorderLeft(BorderStyle.THIN);
		headerStyle.setBorderRight(BorderStyle.THIN);
		//headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		headerStyle.setAlignment(HorizontalAlignment.LEFT);
		headerStyle.setWrapText(true);
		//headerStyle.setFillForegroundColor(getCustomColorForHeader(workbook));
		headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		headerStyle.setFont(getFontForHeader(workbook));
		return headerStyle;
	}

//	private static short getCustomColorForHeader(XSSFWorkbook workbook){
//		
//		XSSFPalette palette = workbook.getCustomPalette();
//		get the color which most closely matches the color you want to use
//		XSSFColor myColor = palette.findSimilarColor(197, 217, 241);
//		get the palette index of that color 
//		short palIndex = myColor.getIndex();
//		
//		return palIndex;
//		
//	}
	public static CellStyle getStyleForCells(Workbook workbook) {

		CellStyle headerStyle = workbook.createCellStyle();
		headerStyle.setBorderBottom(BorderStyle.THIN);
		headerStyle.setBorderTop(BorderStyle.THIN);
		headerStyle.setBorderLeft(BorderStyle.THIN);
		headerStyle.setBorderRight(BorderStyle.THIN);
		headerStyle.setWrapText(true);
		headerStyle.setAlignment(HorizontalAlignment.CENTER);
		headerStyle.setFillForegroundColor(IndexedColors.BROWN.getIndex());
		headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		headerStyle.setFont(getFontForHeader(workbook));
		return headerStyle;
	}

}