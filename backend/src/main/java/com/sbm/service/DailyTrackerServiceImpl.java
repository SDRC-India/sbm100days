/**
 * 
 */
package com.sbm.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.poi.hssf.usermodel.HSSFPalette;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.sbm.repository.AreaDeadlineRepository;
import com.sbm.repository.FormatAO3Repository;
import com.sbm.util.ExcelStyleSheet;

import lombok.extern.slf4j.Slf4j;

/**
 * @author Ashutosh Dang(ashutosh@sdrc.co.in) Created Date : 06-Dec-2018
 *         11:58:42 AM
 */
@Service
@Slf4j
public class DailyTrackerServiceImpl implements DailyTrackerService {
	
	@Autowired
	private ConfigurableEnvironment configurableEnvironment;

	@Autowired
	private AreaDeadlineRepository areaDeadlineRepository;

	@Autowired
	private FormatAO3Repository formatAO3Repository;

	private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); 
	/**
	* Generating Daily Count Down Tracker Excel Report 
	* 
	*  Report contains area wise details of  all the district of Odisha 
	*  about number of toilet constructed daily since the
	*  the start of the project , daily construction rate, Required rate of construction,
	*  percentage of Achievement against reqd rate of construction , Balance to achieve
	*  target 
	*  
	* @return path of the excel generated
	* @author Ashutosh
	*/
	@Override
	public String getDailyTracker() {

		String dir = configurableEnvironment.getProperty("report.path");

		File file = new File(dir);

		/**
		 * appending the username to the excel file name 
		 */
		String uname =  SecurityContextHolder.getContext().getAuthentication().getName();
		/**
		 * make directory if doesn't exist
		 */
		if (!file.exists())
			file.mkdirs();
		String path = dir +"DailyCountdownTracker" + "_" +uname+"_"+new SimpleDateFormat("ddMMyyyyHHmmssSSSSSSS").format(new Date()) + ".xlsx";
		try {

			XSSFWorkbook workbook = new XSSFWorkbook();
			XSSFSheet sheet = workbook.createSheet("Daily Trakcer");

			/**
			 * Get coveragehhbalance_uncovered of all the required areas as on 1st DEC, 2018
			 */
			List<Object[]> balRemainAsOnDEC1List = formatAO3Repository.getBalRemainAsOnDEC1();
			Map<Integer, Integer> balRemainAsOnDEC1Map = new LinkedHashMap<>();
			/**
			 * area_id -> coveragehhbalance Uncovered
			 */
			balRemainAsOnDEC1List.stream()
					.forEach(value -> balRemainAsOnDEC1Map.put((Integer) value[0], (Integer) value[2]));

			/**
			 * Get hhcoveraged_yesterday of all the required areas Since 1st DEC,2018
			 */
			List<Object[]> hhCoveredDateWiseList = formatAO3Repository.getHHhhCoveredDateWise();
			Map<String, Integer> hhCoveredDateWiseMap = new LinkedHashMap<>();
			/**
			 * 380_2018-12-01 -> 153 hhCoveredDateWiseMap
			 */
			hhCoveredDateWiseList.stream().forEach(value -> hhCoveredDateWiseMap
					.put((Integer) value[0] + "_" + (String) value[3], (Integer) value[2]));

			/**
			 * Get ihhl_coverage_percent of all the required Areas
			 */
			List<Object[]> ihhlCoveragePerList = formatAO3Repository.getIhhlCoveragePercent();
			/**
			 * area_id -> coverage%age 0,2 ihhlCoveragePerMap
			 */
			Map<Integer, Double> ihhlCoveragePerMap = new LinkedHashMap<>();
			ihhlCoveragePerList.stream()
					.forEach(value -> ihhlCoveragePerMap.put((Integer) value[0], (Double) value[2]));

			/**
			 * Get ODF Deadline date of the required area 
			 */
			List<Object[]> areaDeadlineList = areaDeadlineRepository.findAreaDeadlineList();
			Map<Integer, String> areaDeadLineMap = new LinkedHashMap<>();
			/**
			 * area_id -> areaName_deadlinedate
			 */
			areaDeadlineList.stream().forEach(
					value -> areaDeadLineMap.put((Integer) value[1], (String) value[0] + "_" + (Date) value[3]));

			CellStyle backgroundStyle = workbook.createCellStyle();

			backgroundStyle.setFillBackgroundColor(IndexedColors.BLUE_GREY.getIndex());
			backgroundStyle.setFillPattern(FillPatternType.LESS_DOTS);

			/**
			 *  custom colors
			 */
			HSSFWorkbook hwb = new HSSFWorkbook();
			HSSFPalette palette = hwb.getCustomPalette();
			// get the color which most closely matches the color you want to use
			HSSFColor myColor = palette.findSimilarColor(153, 153, 255);
			// get the palette index of that color
			short palIndex = myColor.getIndex();
			CellStyle customCellStyle = workbook.createCellStyle();
			customCellStyle.setFillBackgroundColor(palIndex);

			CellStyle headStyle = ExcelStyleSheet.getStyleForColorHeader(workbook);
			CellStyle cellStyle = ExcelStyleSheet.getStyleForEvenCell(workbook);

			headStyle.setFillBackgroundColor(palIndex);
			/*--------------------------------------------*/
			/**
			 * calculation required for adding columns for Ihhl constructed date wise 
			 */
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			String baseDate = "2018-12-01";
			LocalDate endDate = LocalDate.parse(baseDate, formatter);
			LocalDate currentDate = LocalDate.now();
			int noOfDaysBetween = (int) ChronoUnit.DAYS.between(endDate, currentDate);
			/*--------------------------------------------*/
			/*------------------HEADERS-------------------------*/

			/**
			 *  first row
			 */
			Row row0 = sheet.createRow(0);
			Cell heading1 = row0.createCell(0);
			sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, (8 + noOfDaysBetween)));
			heading1.setCellValue((String) "SOSO@ 100 Days Countdown");
			heading1.setCellStyle(headStyle);

			/**
			 *  second row
			 */
			Row row1 = sheet.createRow(1);
			Row row2 = sheet.createRow(2); 
											
			Cell Slno = row1.createCell(0);
			Slno.setCellValue((String) "Sl. No.");
			Slno.setCellStyle(headStyle);
			sheet.setColumnWidth(Slno.getColumnIndex(), 2000);
			/**
			 * merge cell (int rowIndex, int columnIndex, int rowSpan, int columnSpan, XSSFSheet)
			 */
			doMerge(1, 2, 0, 0, sheet);
			Cell SlnoBlank = row2.createCell(0);
			SlnoBlank.setCellStyle(headStyle);
			sheet.setColumnWidth(SlnoBlank.getColumnIndex(), 2000);

			Cell dist = row1.createCell(1);
			dist.setCellValue((String) "District");
			dist.setCellStyle(headStyle);
			sheet.setColumnWidth(dist.getColumnIndex(), 5000);
			doMerge(1, 2, 1, 1, sheet);
			Cell distBlank = row2.createCell(1);
			distBlank.setCellStyle(headStyle);
			sheet.setColumnWidth(distBlank.getColumnIndex(), 5000);

			Cell targetDate = row1.createCell(2);
			targetDate.setCellValue((String) "Target ODF Date");
			targetDate.setCellStyle(headStyle);
			sheet.setColumnWidth(targetDate.getColumnIndex(), 4000);
			doMerge(1, 2, 2, 2, sheet);
			Cell targetDateBlank = row2.createCell(2);
			targetDateBlank.setCellStyle(headStyle);
			sheet.setColumnWidth(targetDateBlank.getColumnIndex(), 4000);

			Cell balRemaining = row1.createCell(3);
			balRemaining.setCellValue((String) "Balance Remaining (as on DEC 1)");
			balRemaining.setCellStyle(headStyle);
			doMerge(1, 2, 3, 3, sheet);
			sheet.setColumnWidth(balRemaining.getColumnIndex(), 7000);
			Cell balRemainingBlank = row2.createCell(3);
			balRemainingBlank.setCellStyle(headStyle);
			sheet.setColumnWidth(balRemainingBlank.getColumnIndex(), 4000);

			Cell covPercentage = row1.createCell(4);
			covPercentage.setCellValue((String) "Coverage %age");
			covPercentage.setCellStyle(headStyle);
			sheet.setColumnWidth(covPercentage.getColumnIndex(), 4000);
			doMerge(1, 2, 4, 4, sheet);
			Cell covPercentageBlank = row2.createCell(4);
			covPercentageBlank.setCellStyle(headStyle);
			sheet.setColumnWidth(covPercentageBlank.getColumnIndex(), 4000);
			/**
			 * the below column has been currently hidden as target odf date of all the areas has already crossed
			 */
/*			Cell daysLeftToODF = row1.createCell(5);
			daysLeftToODF.setCellValue((String) "No. Of Days Left to be ODF");
			daysLeftToODF.setCellStyle(headStyle);
			sheet.setColumnWidth(daysLeftToODF.getColumnIndex(), 4000);
			doMerge(1, 2, 5, 5, sheet);
			Cell daysLeftToODFBlank = row2.createCell(5);
			daysLeftToODFBlank.setCellStyle(headStyle);
			sheet.setColumnWidth(daysLeftToODFBlank.getColumnIndex(), 4000);
*/
			int j = 5;
			int k = 0;

			/**
			 * new column gets added with each passing day 
			 * for adding datewise hhcoveredyesterday
			 */
			for (int i = 0; i <= noOfDaysBetween; i++) {
				Cell dayWiseTargetAchieved = row1.createCell(j + i);
				dayWiseTargetAchieved.setCellValue((String) "Day" + " " + (i + 1));
				dayWiseTargetAchieved.setCellStyle(headStyle);
				sheet.setColumnWidth(dayWiseTargetAchieved.getColumnIndex(), 4000);

				// return incremented changedDate
				Cell dates = row2.createCell(j + i);
				// dates.setCellValue(baseDate);
				dates.setCellStyle(headStyle);
				sheet.setColumnWidth(dates.getColumnIndex(), 4000);

				// cal.add(Calendar.DATE, 1);
				k = i;

			}
			j = j + k;

			Cell totTargetArchieved = row1.createCell(j);
			totTargetArchieved.setCellValue((String) "Total target Achieved");
			totTargetArchieved.setCellStyle(headStyle);
			sheet.setColumnWidth(totTargetArchieved.getColumnIndex(), 4000);
			doMerge(1, 2, j, j, sheet);
			Cell totTargetArchievedBlank = row2.createCell(j);
			totTargetArchievedBlank.setCellStyle(headStyle);
			sheet.setColumnWidth(totTargetArchievedBlank.getColumnIndex(), 4000);

			Cell perTargetArchieved = row1.createCell(++j);
			perTargetArchieved.setCellValue((String) "%age of the Target Achieved");
			perTargetArchieved.setCellStyle(headStyle);
			sheet.setColumnWidth(perTargetArchieved.getColumnIndex(), 4000);
			doMerge(1, 2, j, j, sheet);
			Cell perTargetArchievedBlank = row2.createCell(j);
			perTargetArchievedBlank.setCellStyle(headStyle);
			sheet.setColumnWidth(perTargetArchievedBlank.getColumnIndex(), 4000);

			Cell currConsRate = row1.createCell(++j);
			currConsRate.setCellValue((String) "Current Rate Of Construction");
			sheet.setColumnWidth(currConsRate.getColumnIndex(), 4000);
			currConsRate.setCellStyle(headStyle);
			doMerge(1, 2, j, j, sheet);
			sheet.autoSizeColumn(currConsRate.getColumnIndex());
			Cell currConsRateBlank = row2.createCell(j);
			currConsRateBlank.setCellStyle(headStyle);
			sheet.setColumnWidth(currConsRateBlank.getColumnIndex(), 4000);
			/**
			 * the below column has been currently hidden as fields of this column will come blank 
			 * as target odf date of all the areas has already crossed
			 */
/*			Cell reqdConsRate = row1.createCell(++j);
			reqdConsRate.setCellValue((String) "Required Rate Of Construction");
			reqdConsRate.setCellStyle(headStyle);
			sheet.setColumnWidth(reqdConsRate.getColumnIndex(), 4000);
			doMerge(1, 2, j, j, sheet);
			Cell reqdConsRateBlank = row2.createCell(j);
			reqdConsRateBlank.setCellStyle(headStyle);
			sheet.setColumnWidth(reqdConsRateBlank.getColumnIndex(), 4000);
*/

			Cell balToTarget = row1.createCell(++j);
			balToTarget.setCellValue((String) "Balance to Achieve Target");
			balToTarget.setCellStyle(headStyle);
			sheet.setColumnWidth(balToTarget.getColumnIndex(), 4000);
			doMerge(1, 2, j, j, sheet);
			Cell balToTargetBlank = row2.createCell(j);
			balToTargetBlank.setCellStyle(headStyle);
			sheet.setColumnWidth(balToTargetBlank.getColumnIndex(), 4000);
			/*------------------HEADERS  End-------------------------*/
			// inserting cell values only for active area i.e not crossed deadline

			/*------------------Setting Cell Value-------------------------*/
			int rownum = areaDeadLineMap.size();
			Row dataRow;
			int cellNo = 0;
			Map<Integer, Integer> siAreaIdMap = new HashMap<>();
			int si = 1;
			for (Entry<Integer, String> entry : areaDeadLineMap.entrySet()) {

				siAreaIdMap.put(si, entry.getKey());
				++si;
			}
			int sl = 1;
			for (int l = 1; l <= rownum; l++) {
				try {
					int areaId = siAreaIdMap.get(l);
					dataRow = sheet.createRow(l + 2);

					/**
					 * setting sl. no
					 */
					Cell cell1 = dataRow.createCell(cellNo);
					cell1.setCellValue(sl);// random number k
					cell1.setCellStyle(cellStyle);
					/**
					 * setting area_name
					 */
					String targetOdfD = (areaDeadLineMap.get(areaId)).split("_")[0];

					Cell cell2 = dataRow.createCell(++cellNo);
					cell2.setCellValue(targetOdfD.toUpperCase());
					cell2.setCellStyle(cellStyle);
					/**
					 * setting target ODF Date 
					 */
					Cell cell3 = dataRow.createCell(++cellNo);
					String deadLineDate = areaDeadLineMap.get(areaId).split("_")[1];

					DateFormat formatter2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S"); // 2019-02-15 00:00:00.0
					Date date = (Date) formatter2.parse(deadLineDate);
					SimpleDateFormat newFormat = new SimpleDateFormat("dd-MMM-yyyy");
					String finalString = newFormat.format(date);

					cell3.setCellValue(finalString);
					cell3.setCellStyle(cellStyle);
					/**
					 * setting balance remaining
					 * balRemainAsOnDEC1Map area_id -> coveragehhbalance Uncovered
					 */
					int balRemainingValue = balRemainAsOnDEC1Map.get(areaId);
					Cell cell4 = dataRow.createCell(++cellNo);
					cell4.setCellValue(balRemainingValue);
					cell4.setCellStyle(cellStyle);
					/**
					 * setting Coverage %age
					 * Coverage %age area_id -> coverage%age 0,2 ihhlCoveragePerMap
					 */
					Cell cell5 = dataRow.createCell(++cellNo);
					cell5.setCellValue(ihhlCoveragePerMap.get(areaId));
					cell5.setCellStyle(cellStyle);
					/**
					 * Setting No Of Days Left to Be Odf
					 * calculate no of Days left to Be ODF
					 */
					SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S");
					Date date1 = inputFormat.parse(deadLineDate);

					// Format date into output format
					SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd");
					String endDate1 = outputFormat.format(date1);

					DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("yyyy-MM-dd");

					LocalDate endDate2 = LocalDate.parse(endDate1, formatter1);
					LocalDate currentDate1 = LocalDate.now();
					int noOfDaysLeftToOdf = (int) ChronoUnit.DAYS.between(currentDate1, endDate2);
					String daysLeft = "";
					daysLeft =(noOfDaysLeftToOdf <= 0) ?"-":(String.valueOf(noOfDaysLeftToOdf));
					/**
					 * the below cells has been currently hidden 
					 * as target odf date of all the areas has already crossed
					 */
//					Cell cell6 = dataRow.createCell(++cellNo);
//					cell6.setCellValue(daysLeft);
//					cell6.setCellStyle(cellStyle);
					/**
					 * Setting hhCoveredDateWise
					 * hhCoveredDateWiseMap 380_2018-12-01 -> 153 
					 */
					int q = 0;
					String BaseDateplusOne="2018-12-02";
					String dt = baseDate;
					int totalAchievedValue = 0;
					/**
					 * Setting hhCoveredDateWise for each required area
					 *  adding new column with each passing date
					 */
					for (int forDays = 1; forDays <= noOfDaysBetween; forDays++) {
						/**
						 * set target achieved datewise 
						 * if we don't have data for a date then place "-" for values of that column
						 */
						if (hhCoveredDateWiseMap.containsKey(areaId + "_" + BaseDateplusOne)) {
							Cell dateWiseAchieved = dataRow.createCell(cellNo + forDays);
							totalAchievedValue = totalAchievedValue + hhCoveredDateWiseMap.get(areaId + "_" + BaseDateplusOne);
							dateWiseAchieved.setCellValue(hhCoveredDateWiseMap.get(areaId + "_" + BaseDateplusOne));

							dateWiseAchieved.setCellStyle(cellStyle);

							DateFormat formtr2 = new SimpleDateFormat("yyyy-MM-dd"); 
							Date datewisee = (Date) formtr2.parse(dt);
							SimpleDateFormat reqdFormat = new SimpleDateFormat("dd-MMM");
							String finalDate = reqdFormat.format(datewisee);

							Cell dates = row2.createCell(cellNo + forDays);
							dates.setCellValue(finalDate);
							dates.setCellStyle(headStyle);
							sheet.setColumnWidth(dates.getColumnIndex(), 4000);

							Calendar c1 = Calendar.getInstance();
							c1.setTime(sdf.parse(BaseDateplusOne));
							c1.add(Calendar.DATE, 1); 
							BaseDateplusOne = sdf.format(c1.getTime()); 
							
							Calendar c2 = Calendar.getInstance();
							c2.setTime(sdf.parse(dt));
							c2.add(Calendar.DATE, 1); 
							dt = sdf.format(c2.getTime());
							q = forDays;
						}else {
							Cell dateWiseAchieved = dataRow.createCell(cellNo + forDays);
							dateWiseAchieved.setCellValue("-");

							dateWiseAchieved.setCellStyle(cellStyle);

							DateFormat formtr2 = new SimpleDateFormat("yyyy-MM-dd"); 
							Date datewisee = (Date) formtr2.parse(dt);
							SimpleDateFormat reqdFormat = new SimpleDateFormat("dd-MMM");
							String finalDate = reqdFormat.format(datewisee);

							Cell dates = row2.createCell(cellNo + forDays);
							dates.setCellValue(finalDate);
							dates.setCellStyle(headStyle);
							sheet.setColumnWidth(dates.getColumnIndex(), 4000);

							Calendar c2 = Calendar.getInstance();
							c2.setTime(sdf.parse(dt));
							c2.add(Calendar.DATE, 1); 
							dt = sdf.format(c2.getTime()); 
							q = forDays;
							
							Calendar c1 = Calendar.getInstance();
							c1.setTime(sdf.parse(BaseDateplusOne));
							c1.add(Calendar.DATE, 1); 
							BaseDateplusOne = sdf.format(c1.getTime()); 
							
						
						}
					}
					int cellNoNew = cellNo + q;

					/**
					 * Setting total target Achieved
					 */
					Cell totachieved = dataRow.createCell(++cellNoNew);
					totachieved.setCellValue(totalAchievedValue);
					totachieved.setCellStyle(cellStyle);
					/**
					 * Setting  %age target Achieved
					 */
					String percentageAchieved = "";
					DecimalFormat df = new DecimalFormat("##.##%");
					percentageAchieved=(balRemainingValue != 0) 
							? String.valueOf(df.format(((float) totalAchievedValue) / balRemainingValue))
							: "-";

					Cell perTarAchieved = dataRow.createCell(++cellNoNew);
					perTarAchieved.setCellValue(percentageAchieved);
					perTarAchieved.setCellStyle(cellStyle);
					/**
					 * Setting current rate of construction (per day)
					 */
					Cell currentConsRate = dataRow.createCell(++cellNoNew);
					currentConsRate.setCellValue(Math.round((float) totalAchievedValue / noOfDaysBetween));
					currentConsRate.setCellStyle(cellStyle);
					/**
					 * Setting Required rate of construction (per day)
					 * set "-" if noOfDaysLeftToOdf==0
					 */
					String rrCons = "";
					rrCons = (balRemainingValue != 0 && noOfDaysLeftToOdf > 0)
							? String.valueOf(Math.round((float) balRemainingValue / noOfDaysLeftToOdf))
							: "-";
					
					/**
					 * the below cells has been currently hidden
					 * as target odf date of all the areas has already crossed
					 */
//					Cell reqRateCons = dataRow.createCell(++cellNoNew);
//					reqRateCons.setCellValue(rrCons);
//					reqRateCons.setCellStyle(cellStyle);
					/**
					 * Setting Balance To achieve Target
					 */
					int balTarget = balRemainingValue - totalAchievedValue;
					String balTar = "";
					balTar = (balTarget <= 0) ? "-":String.valueOf(balTarget) ;

					Cell balToTargetcell = dataRow.createCell(++cellNoNew);
					balToTargetcell.setCellValue(balTar);
					balToTargetcell.setCellStyle(cellStyle);

					cellNo = 0;
					totalAchievedValue = 0;
					++sl;
				} catch (ParseException e) {

					e.printStackTrace();
				}

				
			}
			/*------------------Setting Cell Value End-------------------------*/

			sheet.createFreezePane(5, 3);

			FileOutputStream fos = new FileOutputStream(new File(path));
			workbook.write(fos);
			fos.close();
			workbook.close();
			hwb.close();

		} catch (IOException e) {
			log.error("Action : Error while Generating Daily Tracker Report",e);
		}
		return new Gson().toJson(path);
	}

	/**
	* Merge Cells in Excel
	* 
	* @param rowIndex row number of from which ,cells need to be merged
	* @param columnIndex column number from which ,cells need to be merged 
	* @param rowSpan upto how many cellno the merging may expand
	* @param columnSpan upto how many cellno the merging may exapand
	* @param sheet returns excel sheet with merged cells
	* @return sheet with merged cells
	*  
	* @author Ashutosh
	*/
	public static XSSFSheet doMerge(int rowIndex, int columnIndex, int rowSpan, int columnSpan, XSSFSheet sheet) {

		CellRangeAddress range = new CellRangeAddress(rowIndex, columnIndex, rowSpan, columnSpan);

		sheet.addMergedRegion(range);

		return sheet;
	}

}