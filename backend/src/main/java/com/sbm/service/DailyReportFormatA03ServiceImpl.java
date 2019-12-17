/**
 * 
 */
package com.sbm.service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.html.WebColors;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.sbm.domain.Area;
import com.sbm.domain.DailyReportFormatA03;
import com.sbm.domain.FormatA03;
import com.sbm.domain.FormatF28A;
import com.sbm.domain.FormatF42District;
import com.sbm.domain.FormatF42State;
import com.sbm.repository.AreaRepository;
import com.sbm.repository.DailyReportFormatA03Repository;
import com.sbm.repository.FormatAO3Repository;
import com.sbm.repository.FormatF28ARepository;
import com.sbm.repository.FormatF42DistrictRepository;
import com.sbm.repository.FormatF42StateRepository;
import com.sbm.util.HeaderFooter;

import lombok.extern.slf4j.Slf4j;

/**
 * @author Ashutosh Dang(ashutosh@sdrc.co.in) Created Date : 30-Nov-2018
 *         11:03:09 AM
 */
@Service
@Slf4j
public class DailyReportFormatA03ServiceImpl implements DailyReportFormatA03Service {

	@Autowired
	private ConfigurableEnvironment configurableEnvironment;

	@Autowired
	private FormatAO3Repository formatAO3Repository;

	@Autowired
	private DailyReportFormatA03Repository formatA03DailyReportRepository;

	@Autowired
	private FormatF28ARepository formatF28ARepository;

	@Autowired
	private FormatF42StateRepository formatF42StateRepository;

	@Autowired
	private FormatF42DistrictRepository formatF42DistrictRepository;

	@Autowired
	private ServletContext context;

	private SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy");

	@Value("${pdf.header.filePath}")
	private String headerFilepath;

	@Value("${pdf.footer.filePath}")
	private String footerFilepath;

	@Autowired
	private AreaRepository areaRepository;

	/**
	 * Pushing data to daily report table values will be pushed at the time of data
	 * scraping of formatA03
	 * @param dataDomains contains all the data for daily Report table
	 * @author Ashutosh
	 */
	@Override
	public void genDailyReport(List<FormatA03> dataDomains) {

		try {
			List<Area> areaList = areaRepository.findAll();

			Map<Integer, Integer> distStateMap = new HashMap<>();
			Map<Integer, Integer> blockDistMap = new HashMap<>();
			Map<Integer, Integer> gpBlockMap = new HashMap<>();

			/**
			 * keeping parentAreaID against sbmAreaID
			 */
			for (Area area : areaList) {
				if (area.getAreaLevel().getAreaLevelId() == 3) {
					distStateMap.put(area.getSbmAreaId(), area.getParentAreaId());
				} else if (area.getAreaLevel().getAreaLevelId() == 4) {
					blockDistMap.put(area.getSbmAreaId(), area.getParentAreaId());
				} else if (area.getAreaLevel().getAreaLevelId() == 5) {
					gpBlockMap.put(area.getSbmAreaId(), area.getParentAreaId());
				}
			}

			List<DailyReportFormatA03> dailyReportFormatA03List = new ArrayList<>();

			/**
			 * setting values for DailyReport table
			 */
			for (FormatA03 formatA03 : dataDomains) {
				DailyReportFormatA03 dailyReportFormatA03 = new DailyReportFormatA03();
				dailyReportFormatA03.setAreaLevelId(formatA03.getAreaLevelId());
				dailyReportFormatA03.setAreaId(formatA03.getAreaId());
				if (formatA03.getAreaLevelId() == 2) {
					dailyReportFormatA03.setAreaName("Odisha".toUpperCase());
				} else if (formatA03.getAreaLevelId() == 3) {
					dailyReportFormatA03.setAreaName(formatA03.getDistrictName());
					dailyReportFormatA03.setParentAreaId(distStateMap.get(formatA03.getAreaId()));
				} else if (formatA03.getAreaLevelId() == 4) {
					dailyReportFormatA03.setAreaName(formatA03.getBlockName());
					dailyReportFormatA03.setParentAreaId(blockDistMap.get(formatA03.getAreaId()));
				} else if (formatA03.getAreaLevelId() == 5) {
					dailyReportFormatA03.setAreaName(formatA03.getGpName());
					dailyReportFormatA03.setParentAreaId(gpBlockMap.get(formatA03.getAreaId()));
				}
				dailyReportFormatA03.setDetailsWithOrWithoutToilet(formatA03.getDetailsWithOrWithoutToilet());
				dailyReportFormatA03.setCoverageHHIncludingBLS(formatA03.getCoverageHHIncludingBLS());
				dailyReportFormatA03.setCoverageHHBalanceUncovered(formatA03.getCoverageHHBalanceUncovered());
				dailyReportFormatA03.setIhhlCoveragePercent(formatA03.getIhhlCoveragePercent());
				dailyReportFormatA03List.add(dailyReportFormatA03);
			}
			formatA03DailyReportRepository.save(dailyReportFormatA03List);
		} catch (Exception e) {
			log.error("Action : Error while Pushing Daily data to Daily Report Table", e);
		}
	}

	/**
	 * Generates consolidated pdf report for Daily physical progress status and
	 * Daily IHHL completion report
	 * @param forAreaId can be a sbmAreaId or areaLevel
	 * @param areaLevel if present get data for all Panchayats in a block
	 * @param range if present find data within that range
	 * @param request for setting the domain that is the source of the pdf generated
	 * @return outputPath path from where the pdf will be downloaded
	 * @author Ashutosh
	 */
	public String genDailyPDFReport(int forAreaId, Integer areaLevel, String range, HttpServletRequest request) {
		String outputPath = null;
		List<DailyReportFormatA03> dailyReportFormatA03List = new ArrayList<>();
		Map<Integer, Integer> areaIDParentIdMap = new HashMap<>();
		/**
		 * keeping parentAreaId against each sbm Area Id in a map
		 */
		areaIDParentIdMap = areaRepository.findByAreaIdParentAreaId(forAreaId).stream()
				.collect(Collectors.toMap(Area::getSbmAreaId, Area::getParentAreaId));
		Map<Integer, Area> areaMap = new HashMap<>();
		Map<Integer, Area> areaMap2 = new HashMap<>();
		/**
		 * getting Daily Physical Progress data from DailyReport table 
		 * based on whether forAreaId is smbAreaId or areaLevelId 
		 */
		if (forAreaId == 18 || forAreaId == 3 || forAreaId == 4 || forAreaId == 5 && areaLevel == null) {
			dailyReportFormatA03List = formatA03DailyReportRepository.findLastDateAllData(forAreaId);
			if (!(forAreaId == 18))
				areaMap = areaRepository
						.findByAreaLevelAreaLevelIdIn(forAreaId == 5 ? Arrays.asList(4, 3) : Arrays.asList(3)).stream()
						.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
			if ((forAreaId == 18))
				areaMap = areaRepository.findBySbmAreaId(forAreaId).stream()
						.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
		} else if (areaLevel == null) {
			dailyReportFormatA03List = formatA03DailyReportRepository.findLastDateData(forAreaId);
			areaMap = areaRepository.findBySbmAreaId(forAreaId).stream()
					.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
			areaMap2 = areaRepository.findByAreaLevelAreaLevelIdIn(Arrays.asList(4, 3)).stream()
					.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
		} else {
			dailyReportFormatA03List = formatA03DailyReportRepository.findLastDateDataGpWise(forAreaId);
			areaMap = areaRepository.findAreaGPWise(forAreaId).stream()
					.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
		}
		/**
		 * keeping sbmAreaName against sbmAreaID in a map
		 */
		List<Area> areaList = areaRepository.findBySbmAreaId(forAreaId);
		Map<Integer, String> areaIdNameMap1 = new HashMap<>();
		for (DailyReportFormatA03 dailyReportFormatA03 : dailyReportFormatA03List) {
			areaIdNameMap1.put(dailyReportFormatA03.getAreaId(), dailyReportFormatA03.getAreaName());
		}

		Map<Integer, Integer> distStateMap = new HashMap<>();
		Map<Integer, Integer> blockDistMap = new HashMap<>();
		Map<Integer, Integer> gpBlockMap = new HashMap<>();
		String areaType = "";
		String areaHeaderName = "";
		int rownosPg1Tb2 = 0;
		String pg1Tb2Header = "";
		String parent = "";
		String grandParent = "";
		boolean blockLevel = false;
		boolean gpLevel = false;
		boolean distLevel = false;
		/**
		 * Setting areaType, areaHeaderName, no of rows in the second table of page 1
		 */

		for (Area area : areaList) {
			if (area.getAreaLevel().getAreaLevelId() == 3 || forAreaId == 4) {
				areaType = "Block";
				areaHeaderName = "Block";
				rownosPg1Tb2 = 7;
				pg1Tb2Header = "District";
				distStateMap.put(area.getSbmAreaId(), area.getParentAreaId());
			} else if (area.getAreaLevel().getAreaLevelId() == 4 || forAreaId == 5) {
				blockDistMap.put(area.getSbmAreaId(), area.getParentAreaId());
				areaType = "Gram Panchayat";
				areaHeaderName = "Gram Panchayat";
				rownosPg1Tb2 = 6;
				pg1Tb2Header = "Block";
			} else if (area.getAreaLevel().getAreaLevelId() == 5) {
				gpBlockMap.put(area.getSbmAreaId(), area.getParentAreaId());
				areaType = "Gram Panchayat";
				areaHeaderName = "Gram Panchayat";
				rownosPg1Tb2 = 5;

			} else {
				areaType = "District";
				areaHeaderName = "District";
				rownosPg1Tb2 = 8;
				pg1Tb2Header = "State";
			}
		}
		String forAreaName = "";

		if (areaMap.containsKey(forAreaId)) {
			if (areaMap.get(forAreaId).getAreaLevel().getAreaLevelId() == 4 || areaLevel != null) {
				gpLevel = true;
				grandParent = "District";
				parent = "Block";
			} else if (areaMap.get(forAreaId).getAreaLevel().getAreaLevelId() == 3 && areaLevel == null) {
				blockLevel = true;
				parent = "District";
			} else {
				distLevel = true;
			}
		}
		/**
		 * calculating rows number of page1 table2  
		 * getting parent and grandparent header when areaLevelId=4 or 5
		 */
		if (forAreaId == 4) {
			areaType = "Block";
			forAreaName = "Odisha";
			areaHeaderName = "Block";
			rownosPg1Tb2 = 7;
			pg1Tb2Header = "State";
			parent = "District";
		} else if (forAreaId == 5) {
			areaType = "Gram Panchayat";
			areaHeaderName = "Gram Panchayat";
			forAreaName = "Odisha";
			rownosPg1Tb2 = 6;
			pg1Tb2Header = "State";
			grandParent = "District";
			parent = "Block";
		} else {
			forAreaName = areaMap.get(forAreaId).getAreaName();
			rownosPg1Tb2 = 8;
		}
		if (areaLevel != null && areaLevel == 5) {
			areaType = "Gram Panchayat";
			areaHeaderName = "Gram Panchayat";
			forAreaName = "Odisha";
			rownosPg1Tb2 = 7;
			pg1Tb2Header = "District";
			grandParent = "District";
			parent = "Block";
		}
		/**
		 * Creating pdf document of A4 size in landscape mode
		 */
		Document document = new Document(PageSize.A4.rotate());
		ByteArrayOutputStream out = new ByteArrayOutputStream();

		/**
		 * setting domain name from where pdf is being generated 
		 */
		String reportCreatedDate = simpleDateFormat.format(new Date());
		String uri = request.getRequestURI();
		String domainName = request.getRequestURL().toString();
		String ctxPath = request.getContextPath();
		domainName = domainName.replaceFirst(uri, "");
		domainName += ctxPath;

		try {

			PdfWriter writer = PdfWriter.getInstance(document, out);
			writer.setCompressionLevel(9);
			document.setMargins(document.leftMargin(), document.rightMargin(), 0, document.bottomMargin());
			HeaderFooter headerFooter = new HeaderFooter(context, "Daily", reportCreatedDate, domainName);
			/**
			 * adds header and footer to each page of the pdf by calling 
			 * onStartPage() and onEndPage() of HeaderFooter class that are triggered by 
			 * page starting and page ending events of the pdf 
			 */
			writer.setPageEvent(headerFooter);
			BaseColor headerBgColor = WebColors.getRGBColor("#668cff");
			BaseColor totalBg = WebColors.getRGBColor("#e6f3ff");
			BaseColor cellBg = WebColors.getRGBColor("#ffffb3");
			Font headFont = new Font(FontFamily.HELVETICA, 11, Font.NORMAL, BaseColor.WHITE);

			Font cellFont = new Font(FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.BLACK);

			Font pg1Tb1Hfont = new Font(FontFamily.HELVETICA, 12, Font.NORMAL, BaseColor.BLACK);
			Font pg1Tb1Hbfont = new Font(FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.BLACK);
			Font pg1Tb1Headerfont = new Font(FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.WHITE);

			/**
			 * Getting Data for page1 table1 from format_a03 table 
			 */
			FormatA03 pg1Tb1Data;
			if (forAreaId == 18 || forAreaId == 3 || forAreaId == 4 || forAreaId == 5) {
				pg1Tb1Data = formatAO3Repository.findPg1Tb1AllData();
			} else {
				pg1Tb1Data = formatAO3Repository.findPg1Tb1Data(forAreaId);
			}
			PdfPTable page1Table1 = new PdfPTable(2);
			float[] pg1Tb1ColWidths = new float[] { 20f, 20f };
			page1Table1.setWidths(pg1Tb1ColWidths);
			PdfPCell hcellPg1Tb1;

			hcellPg1Tb1 = new PdfPCell(new Phrase("IHHLs Constructed since 2014", pg1Tb1Headerfont));
			hcellPg1Tb1.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcellPg1Tb1.setBackgroundColor(headerBgColor);
			hcellPg1Tb1.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcellPg1Tb1.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcellPg1Tb1.setFixedHeight(30f);
			hcellPg1Tb1.setColspan(2);
			page1Table1.addCell(hcellPg1Tb1);

			int ncols = 2; // number of columns
			int nrows = 8; // number of rows
			PdfPCell[][] cells = new PdfPCell[nrows][ncols];

			// To create the table cells
			cells[0][0] = new PdfPCell(new Phrase("Financial Year", pg1Tb1Hbfont));
			(cells[0][0]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cells[0][0]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table1.addCell(cells[0][0]);

			cells[1][0] = new PdfPCell(new Phrase("IHHLs Completed", pg1Tb1Hbfont));
			(cells[1][0]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cells[1][0]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table1.addCell(cells[1][0]);

			cells[0][1] = new PdfPCell(new Phrase("Before Baseline Survey", pg1Tb1Hfont));
			(cells[0][1]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cells[0][1]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table1.addCell(cells[0][1]);

			cells[0][1] = new PdfPCell(new Phrase(String.valueOf(pg1Tb1Data.getHhDetailsWithToilet()), pg1Tb1Hfont));
			(cells[0][1]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cells[0][1]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table1.addCell(cells[0][1]);

			cells[2][0] = new PdfPCell(new Phrase("2014-15", pg1Tb1Hfont));
			(cells[2][0]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cells[2][0]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table1.addCell(cells[2][0]);

			cells[2][1] = new PdfPCell(new Phrase(String.valueOf(pg1Tb1Data.getCoverageHH1415()), pg1Tb1Hfont));
			(cells[2][1]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cells[2][1]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table1.addCell(cells[2][1]);

			cells[3][0] = new PdfPCell(new Phrase("2015-16", pg1Tb1Hfont));
			(cells[3][0]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cells[3][0]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table1.addCell(cells[3][0]);
			cells[3][1] = new PdfPCell(new Phrase(String.valueOf(pg1Tb1Data.getCoverageHH1516()), pg1Tb1Hfont));
			(cells[3][1]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cells[3][1]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table1.addCell(cells[3][1]);

			cells[4][0] = new PdfPCell(new Phrase("2016-17", pg1Tb1Hfont));
			(cells[4][0]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cells[4][0]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table1.addCell(cells[4][0]);
			cells[4][1] = new PdfPCell(new Phrase(String.valueOf(pg1Tb1Data.getCoverageHH1617()), pg1Tb1Hfont));
			(cells[4][1]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cells[4][1]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table1.addCell(cells[4][1]);

			cells[5][0] = new PdfPCell(new Phrase("2017-18", pg1Tb1Hfont));
			(cells[5][0]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cells[5][0]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table1.addCell(cells[4][0]);
			cells[5][1] = new PdfPCell(new Phrase(String.valueOf(pg1Tb1Data.getCoverageHH1718()), pg1Tb1Hfont));
			(cells[5][1]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cells[5][1]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table1.addCell(cells[5][1]);

			cells[6][0] = new PdfPCell(new Phrase("2018-19", pg1Tb1Hfont));
			(cells[6][0]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cells[6][0]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table1.addCell(cells[6][0]);
			cells[6][1] = new PdfPCell(new Phrase(String.valueOf(pg1Tb1Data.getCoverageHH1819()), pg1Tb1Hfont));
			(cells[6][1]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cells[6][1]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table1.addCell(cells[6][1]);

			cells[7][0] = new PdfPCell(new Phrase("Total", pg1Tb1Hbfont));
			(cells[7][0]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cells[7][0]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table1.addCell(cells[7][0]);
			cells[7][1] = new PdfPCell(
					new Phrase(String.valueOf(pg1Tb1Data.getCoverageHHIncludingBLS()), pg1Tb1Hbfont));
			(cells[7][1]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cells[7][1]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table1.addCell(cells[7][1]);

			/**
			 * Getting data for page1 table2 from format_f28a table and format_f42_state table
			 */
			FormatF28A formatf28AData = new FormatF28A();
			FormatF42State formatF42State = new FormatF42State();
			FormatF42District formatF42District = new FormatF42District();
			if (forAreaId == 18 || forAreaId == 3 || forAreaId == 4 || forAreaId == 5) {
				formatf28AData = formatF28ARepository.findPg1Tb2AllData();
				formatF42State = formatF42StateRepository.findPg1Tb2F42AllData();
			} else {
				formatf28AData = formatF28ARepository.findPg1Tb2Data(forAreaId);
				if (distStateMap.containsKey(forAreaId))
					formatF42State = formatF42StateRepository.findPg1Tb2F42Data(forAreaId);
				if (blockDistMap.containsKey(forAreaId))
					formatF42District = formatF42DistrictRepository.findPg1Tb2F42Data(forAreaId);
			}

			PdfPTable page1Table2 = new PdfPTable(3);
			float[] pg1Tb2ColWidths = new float[] { 10f, 40f, 30f };
			page1Table2.setWidths(pg1Tb2ColWidths);

			PdfPCell hcellPg1Tb2;
			hcellPg1Tb2 = new PdfPCell(new Phrase("SBM(G) Odisha At a Glance", pg1Tb1Headerfont));
			hcellPg1Tb2.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcellPg1Tb2.setBackgroundColor(headerBgColor);
			hcellPg1Tb2.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcellPg1Tb2.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcellPg1Tb2.setFixedHeight(30f);
			hcellPg1Tb2.setColspan(3);
			page1Table2.addCell(hcellPg1Tb2);

			int colnosPg1Tb2 = 3;
			PdfPCell[][] cellsPg1Tb2 = new PdfPCell[rownosPg1Tb2][colnosPg1Tb2]; // get number of rows from the first
																					// conditions
			int pg1Tb2Cellno = 1;
			cellsPg1Tb2[0][0] = new PdfPCell(new Phrase(String.valueOf(pg1Tb2Cellno), pg1Tb1Hfont));
			(cellsPg1Tb2[0][0]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cellsPg1Tb2[0][0]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table2.addCell(cellsPg1Tb2[0][0]);

			cellsPg1Tb2[0][1] = new PdfPCell(new Phrase("Coverage of IHHL in the " + pg1Tb2Header, pg1Tb1Hfont));
			(cellsPg1Tb2[0][1]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cellsPg1Tb2[0][1]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table2.addCell(cellsPg1Tb2[0][1]);

			String ihhlCovPer = "";
			if (Double.isNaN(pg1Tb1Data.getIhhlCoveragePercent()) || pg1Tb1Data.getIhhlCoveragePercent() == 0.00
					|| pg1Tb1Data.getIhhlCoveragePercent() == null) {
				ihhlCovPer = 0.00 + "%";
			} else {
				ihhlCovPer = String.valueOf(pg1Tb1Data.getIhhlCoveragePercent()) + "%";
			}
			cellsPg1Tb2[0][2] = new PdfPCell(new Phrase(ihhlCovPer, pg1Tb1Hfont));
			(cellsPg1Tb2[0][2]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cellsPg1Tb2[0][2]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table2.addCell(cellsPg1Tb2[0][2]);

			cellsPg1Tb2[1][0] = new PdfPCell(new Phrase(String.valueOf(++pg1Tb2Cellno), pg1Tb1Hfont));
			(cellsPg1Tb2[1][0]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cellsPg1Tb2[1][0]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table2.addCell(cellsPg1Tb2[1][0]);

			cellsPg1Tb2[1][1] = new PdfPCell(new Phrase("Balance IHHLs to be Constructed", pg1Tb1Hfont));
			(cellsPg1Tb2[1][1]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cellsPg1Tb2[1][1]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table2.addCell(cellsPg1Tb2[1][1]);

			cellsPg1Tb2[1][2] = new PdfPCell(
					new Phrase(String.valueOf(pg1Tb1Data.getCoverageHHBalanceUncovered()), pg1Tb1Hfont));
			(cellsPg1Tb2[1][2]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cellsPg1Tb2[1][2]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table2.addCell(cellsPg1Tb2[1][2]);

			cellsPg1Tb2[2][0] = new PdfPCell(new Phrase(String.valueOf(++pg1Tb2Cellno), pg1Tb1Hfont));
			(cellsPg1Tb2[2][0]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cellsPg1Tb2[2][0]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table2.addCell(cellsPg1Tb2[2][0]);

			cellsPg1Tb2[2][1] = new PdfPCell(new Phrase("Coverage of Geo-tagging", pg1Tb1Hfont));
			(cellsPg1Tb2[2][1]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cellsPg1Tb2[2][1]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table2.addCell(cellsPg1Tb2[2][1]);

			/**
			 * set percentage of UploadedPhotographs/geotagging
			 * if it it  null/0.00 then set it to 0.00% 
			 */
			String perUploadedPhoto = "";
			if (Double.isNaN(formatf28AData.getUploadedPhotographsPercentage())
					|| formatf28AData.getUploadedPhotographsPercentage() == 0.00
					|| formatf28AData.getUploadedPhotographsPercentage() == null) {
				perUploadedPhoto = 0.00 + "%";
			} else {
				perUploadedPhoto = String.valueOf(formatf28AData.getUploadedPhotographsPercentage()) + "%";
			}
			cellsPg1Tb2[2][2] = new PdfPCell(new Phrase(perUploadedPhoto, pg1Tb1Hfont));
			(cellsPg1Tb2[2][2]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cellsPg1Tb2[2][2]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table2.addCell(cellsPg1Tb2[2][2]);

			cellsPg1Tb2[3][0] = new PdfPCell(new Phrase(String.valueOf(++pg1Tb2Cellno), pg1Tb1Hfont));
			(cellsPg1Tb2[3][0]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cellsPg1Tb2[3][0]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table2.addCell(cellsPg1Tb2[3][0]);

			cellsPg1Tb2[3][1] = new PdfPCell(new Phrase("Number of Villages Declared ODF", pg1Tb1Hfont));
			(cellsPg1Tb2[3][1]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cellsPg1Tb2[3][1]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table2.addCell(cellsPg1Tb2[3][1]);

			int noOfVilDeclODF = 0;
			double vilDeclOdfPer = 0.00;
			int noOfVilVerODF = 0;
			double vilVerOdfPer = 0.00;
			int noOfGpDeclOdf = 0;
			int noOfBlocksDeclOdf = 0;
			int noOfDistDeclOdf = 0;

			/**
			 * Setting noOfVilDeclODF,vilDeclOdfPer,noOfGpDeclOdf,noOfBlocksDeclOdf etc
			 * based on the areaLevel or forAreaId for the second table of first page of the
			 * pdf
			 */
			if (forAreaId == 18 || forAreaId == 3 || forAreaId == 4 || forAreaId == 5) {
				noOfVilDeclODF = formatF42State.getVillageDeclaredOdfTotal();
				vilDeclOdfPer = formatF42State.getVillageDeclaredOdfPercentage();
				noOfVilVerODF = formatF42State.getVillageVerifiedOdfTotal();
				vilVerOdfPer = formatF42State.getVillageVerifiedOdfPercentage();
				noOfGpDeclOdf = formatF42State.getGpDeclaredOdf();
				noOfBlocksDeclOdf = formatF42State.getBlockDeclaredOdf();
				noOfDistDeclOdf = 0;

			} else if (distStateMap.containsKey(forAreaId)) {
				noOfVilDeclODF = formatF42State.getVillageDeclaredOdfTotal();
				vilDeclOdfPer = formatF42State.getVillageDeclaredOdfPercentage();
				noOfVilVerODF = formatF42State.getVillageVerifiedOdfTotal();
				vilVerOdfPer = formatF42State.getVillageVerifiedOdfPercentage();
				noOfGpDeclOdf = formatF42State.getGpDeclaredOdf();
				noOfBlocksDeclOdf = formatF42State.getBlockDeclaredOdf();
			} else if (blockDistMap.containsKey(forAreaId)) {
				noOfVilDeclODF = formatF42District.getVillageDeclaredOdfTotal();
				vilDeclOdfPer = formatF42District.getVillageDeclaredOdfPercentage();
				noOfVilVerODF = formatF42District.getVillageVerifiedOdfTotal();
				vilVerOdfPer = formatF42District.getVillageVerifiedOdfPercentage();
				noOfGpDeclOdf = formatF42District.getGpDeclaredOdf();
			}
			cellsPg1Tb2[3][2] = new PdfPCell(new Phrase(noOfVilDeclODF + "(" + vilDeclOdfPer + "%)", pg1Tb1Hfont));
			(cellsPg1Tb2[3][2]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cellsPg1Tb2[3][2]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table2.addCell(cellsPg1Tb2[3][2]);

			cellsPg1Tb2[4][0] = new PdfPCell(new Phrase(String.valueOf(++pg1Tb2Cellno), pg1Tb1Hfont));
			(cellsPg1Tb2[4][0]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cellsPg1Tb2[4][0]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table2.addCell(cellsPg1Tb2[4][0]);

			cellsPg1Tb2[4][1] = new PdfPCell(new Phrase("Number of Villages Verified ODF", pg1Tb1Hfont));
			(cellsPg1Tb2[4][1]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cellsPg1Tb2[4][1]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table2.addCell(cellsPg1Tb2[4][1]);

			cellsPg1Tb2[4][2] = new PdfPCell(new Phrase(noOfVilVerODF + "(" + vilVerOdfPer + "%)", pg1Tb1Hfont));
			(cellsPg1Tb2[4][2]).setVerticalAlignment(Element.ALIGN_MIDDLE);
			(cellsPg1Tb2[4][2]).setHorizontalAlignment(Element.ALIGN_CENTER);
			page1Table2.addCell(cellsPg1Tb2[4][2]);
			int currrow = 4;
			/**
			 * based on areaLevelId and areaLevel setting values for page1 table2 rows data
			 */
			if (blockDistMap.containsKey(forAreaId)
					|| (forAreaId == 18 || forAreaId == 3 || forAreaId == 4 || forAreaId == 5)
					|| (areaLevel != null && areaLevel == 5)) {
				cellsPg1Tb2[++currrow][0] = new PdfPCell(new Phrase(String.valueOf(++pg1Tb2Cellno), pg1Tb1Hfont));
				(cellsPg1Tb2[currrow][0]).setVerticalAlignment(Element.ALIGN_MIDDLE);
				(cellsPg1Tb2[currrow][0]).setHorizontalAlignment(Element.ALIGN_CENTER);
				page1Table2.addCell(cellsPg1Tb2[currrow][0]);

				cellsPg1Tb2[currrow][1] = new PdfPCell(new Phrase("Number of Gps Declared ODF", pg1Tb1Hfont));
				(cellsPg1Tb2[currrow][1]).setVerticalAlignment(Element.ALIGN_MIDDLE);
				(cellsPg1Tb2[currrow][1]).setHorizontalAlignment(Element.ALIGN_CENTER);
				page1Table2.addCell(cellsPg1Tb2[currrow][1]);

				cellsPg1Tb2[currrow][2] = new PdfPCell(new Phrase(String.valueOf(noOfGpDeclOdf), pg1Tb1Hfont));
				(cellsPg1Tb2[currrow][2]).setVerticalAlignment(Element.ALIGN_MIDDLE);
				(cellsPg1Tb2[currrow][2]).setHorizontalAlignment(Element.ALIGN_CENTER);
				page1Table2.addCell(cellsPg1Tb2[currrow][2]);
			}
			if (distStateMap.containsKey(forAreaId) || (forAreaId == 18 || forAreaId == 3 || forAreaId == 4)) {
				cellsPg1Tb2[++currrow][0] = new PdfPCell(new Phrase(String.valueOf(++pg1Tb2Cellno), pg1Tb1Hfont));
				(cellsPg1Tb2[currrow][0]).setVerticalAlignment(Element.ALIGN_MIDDLE);
				(cellsPg1Tb2[currrow][0]).setHorizontalAlignment(Element.ALIGN_CENTER);
				page1Table2.addCell(cellsPg1Tb2[currrow][0]);

				cellsPg1Tb2[currrow][1] = new PdfPCell(new Phrase("Number of Blocks Declared ODF", pg1Tb1Hfont));
				(cellsPg1Tb2[currrow][1]).setVerticalAlignment(Element.ALIGN_MIDDLE);
				(cellsPg1Tb2[currrow][1]).setHorizontalAlignment(Element.ALIGN_CENTER);
				page1Table2.addCell(cellsPg1Tb2[currrow][1]);

				cellsPg1Tb2[currrow][2] = new PdfPCell(new Phrase(String.valueOf(noOfBlocksDeclOdf), pg1Tb1Hfont));
				(cellsPg1Tb2[currrow][2]).setVerticalAlignment(Element.ALIGN_MIDDLE);
				(cellsPg1Tb2[currrow][2]).setHorizontalAlignment(Element.ALIGN_CENTER);
				page1Table2.addCell(cellsPg1Tb2[currrow][2]);
			}
			if (forAreaId == 18 || forAreaId == 3) {
				cellsPg1Tb2[++currrow][0] = new PdfPCell(new Phrase(String.valueOf(++pg1Tb2Cellno), pg1Tb1Hfont));
				(cellsPg1Tb2[currrow][0]).setVerticalAlignment(Element.ALIGN_MIDDLE);
				(cellsPg1Tb2[currrow][0]).setHorizontalAlignment(Element.ALIGN_CENTER);
				page1Table2.addCell(cellsPg1Tb2[currrow][0]);

				cellsPg1Tb2[currrow][1] = new PdfPCell(new Phrase("Number of Districts Declared ODF", pg1Tb1Hfont));
				(cellsPg1Tb2[currrow][1]).setVerticalAlignment(Element.ALIGN_MIDDLE);
				(cellsPg1Tb2[currrow][1]).setHorizontalAlignment(Element.ALIGN_CENTER);
				page1Table2.addCell(cellsPg1Tb2[currrow][1]);
				int noOfDistDecOdf = formatF42StateRepository.findNoOfDistDeclOdf();
				cellsPg1Tb2[currrow][2] = new PdfPCell(new Phrase(String.valueOf(noOfDistDecOdf), pg1Tb1Hfont));
				(cellsPg1Tb2[currrow][2]).setVerticalAlignment(Element.ALIGN_MIDDLE);
				(cellsPg1Tb2[currrow][2]).setHorizontalAlignment(Element.ALIGN_CENTER);
				page1Table2.addCell(cellsPg1Tb2[currrow][2]);
			}

			PdfPTable table;
			int dynamicColnos = 6;

			/**
			 * Setting dynamic column numbers for adding parent AreaName in the pdf based on
			 * the areaLevelId 
			 */
			if (forAreaId == 4 || blockLevel && areaLevel == null) {
				dynamicColnos = dynamicColnos + 1;
				table = new PdfPTable(dynamicColnos);
				float widths[] = { 15f, 35f, 35f, 25f, 25f, 35f, 18f };
				table.setWidths(widths);
				table.setWidthPercentage(100f);
			} else if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5)) {
				dynamicColnos = dynamicColnos + 2;
				table = new PdfPTable(dynamicColnos);
				float widths[] = { 18f, 35f, 35f, 50f, 25f, 25f, 35f, 18f };
				table.setWidths(widths);
				table.setWidthPercentage(100f);
			} else {
				table = new PdfPTable(dynamicColnos);
				float widths[] = { 12f, 35f, 25f, 25f, 35f, 18f };
				table.setWidths(widths);
				table.setWidthPercentage(100f);
			}
			PdfPCell hcell;

			hcell = new PdfPCell(new Phrase("Sl. No.", headFont));
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell.setMinimumHeight(50f);
			hcell.setBackgroundColor(headerBgColor);
			table.addCell(hcell);
			/**
			 * Below two cells will be added dynamically based on the areaLevel 
			 */
			if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5)) {
				hcell = new PdfPCell(new Phrase(grandParent, headFont));// here set the District
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
				hcell.setMinimumHeight(50f);
				hcell.setBackgroundColor(headerBgColor);
				table.addCell(hcell);
			}
			if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5) || forAreaId == 4 || blockLevel) {
				hcell = new PdfPCell(new Phrase(parent, headFont));
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
				hcell.setMinimumHeight(50f);
				hcell.setBackgroundColor(headerBgColor);
				table.addCell(hcell);
			}

			hcell = new PdfPCell(new Phrase(areaHeaderName, headFont));
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell.setMinimumHeight(50f);
			hcell.setBackgroundColor(headerBgColor);
			table.addCell(hcell);

			hcell = new PdfPCell(new Phrase("Total No. of IHHLs to be Constructed", headFont));
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell.setMinimumHeight(50f);
			hcell.setBackgroundColor(headerBgColor);
			table.addCell(hcell);

			hcell = new PdfPCell(new Phrase("Total IHHLs Constructed", headFont));
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell.setMinimumHeight(50f);
			hcell.setBackgroundColor(headerBgColor);
			table.addCell(hcell);

			hcell = new PdfPCell(new Phrase("Remaining IHHLs to be Constructed", headFont));
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell.setMinimumHeight(50f);
			hcell.setBackgroundColor(headerBgColor);
			table.addCell(hcell);

			hcell = new PdfPCell(new Phrase("Coverage %age", headFont));
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell.setMinimumHeight(50f);
			hcell.setBackgroundColor(headerBgColor);
			table.addCell(hcell);
			table.setHeaderRows(1);
			/**
			 * adding column numbers under the headers
			 */
			for (int colnos = 1; colnos <= dynamicColnos; colnos++) {
				hcell = new PdfPCell(new Phrase(String.valueOf(colnos), headFont));
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
				// hcell.setFixedHeight(14f);
				hcell.setBackgroundColor(headerBgColor);
				table.addCell(hcell);
				/**
				 * making this header rows to appear in each page 
				 * up to the table expands 
				 */
				table.setHeaderRows(2);
			}
			int i = 1;
			int case1 = 1;
			for (DailyReportFormatA03 dailyReportFormatA03 : dailyReportFormatA03List) {
				case1 = (dailyReportFormatA03.getAreaId() != forAreaId) ? 1 : 2;
				/**
				 * if sbmareaId==18 then start from case 2 of switch case
				 */
				if (dailyReportFormatA03.getAreaId() == 18)
					case1 = 2;
				PdfPCell cell;
				switch (case1) {
				case 1: {
					/**
					 * setting row color in pdf table based on Ihhl coverage percentage
					 */
					if (dailyReportFormatA03.getIhhlCoveragePercent() <= 50.00) {
						cellBg = WebColors.getRGBColor("#ffb3b3");
					} else if (dailyReportFormatA03.getIhhlCoveragePercent() > 50.00
							&& dailyReportFormatA03.getIhhlCoveragePercent() <= 79.99) {
						cellBg = WebColors.getRGBColor("#ffd9b3");
					} else if (dailyReportFormatA03.getIhhlCoveragePercent() >= 80.00
							&& dailyReportFormatA03.getIhhlCoveragePercent() <= 99.99) {
						cellBg = WebColors.getRGBColor("#c1f0c1");
					} else if (dailyReportFormatA03.getIhhlCoveragePercent() == 100.00) {
						cellBg = WebColors.getRGBColor("#6fdc6f");
					}
					cell = new PdfPCell(new Phrase(String.valueOf(i), cellFont));
					cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell.setMinimumHeight(14f);
					cell.setBackgroundColor(cellBg);
					table.addCell(cell);

					String parentName = "";
					String grandParentName = "";
					/**
					 * getting parentName and grandParentName based on areaLevelId of the curentArea in the loop
					 */
					if (areaLevel == null && dailyReportFormatA03.getParentAreaId() != null) {
						if (forAreaId == 5) {
							Integer pp = areaMap.get(dailyReportFormatA03.getParentAreaId()).getParentAreaId();
							grandParentName = areaMap.get(pp).getAreaName().toUpperCase();
							parentName = areaMap.get(dailyReportFormatA03.getParentAreaId()).getAreaName()
									.toUpperCase();
						}
						if (forAreaId == 4) {
							parentName = areaMap.get(dailyReportFormatA03.getParentAreaId()).getAreaName()
									.toUpperCase();
						}
						if (dailyReportFormatA03.getAreaLevelId() == 4) {
							// if (areaMap.containsKey(dailyReportFormatA03.getParentAreaId())) {
							parentName = areaMap.get(dailyReportFormatA03.getParentAreaId()).getAreaName()
									.toUpperCase();
							// }
						}
						if (dailyReportFormatA03.getAreaLevelId() == 5) {
							Integer pp = areaMap.get(dailyReportFormatA03.getParentAreaId()).getParentAreaId();
							if (pp != 18) {
								if (areaMap2.containsKey(pp)) {
									grandParentName = areaMap2.get(pp).getAreaName().toUpperCase();
								}
								if (areaMap.containsKey(dailyReportFormatA03.getParentAreaId())) {
									parentName = areaMap.get(dailyReportFormatA03.getParentAreaId()).getAreaName()
											.toUpperCase();
								}
							}
						}
					} 
					/**
					 * get parentAreaName and grandParentName if areaLevel present and value is 5
					 */
					else if (areaLevel != null && areaLevel == 5) {
						if (areaMap.containsKey(dailyReportFormatA03.getParentAreaId())) {
							Integer pp = areaMap.get(dailyReportFormatA03.getParentAreaId()).getParentAreaId();
							grandParentName = areaMap.get(pp).getAreaName().toUpperCase();
							parentName = areaMap.get(dailyReportFormatA03.getParentAreaId()).getAreaName()
									.toUpperCase();
						}
					} else {
						parentName = areaIdNameMap1.get(forAreaId);
					}

					if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5)) {
						cell = new PdfPCell(new Phrase(grandParentName, cellFont));// here set the District
						cell.setHorizontalAlignment(Element.ALIGN_LEFT);
						cell.setVerticalAlignment(Element.ALIGN_LEFT);
						cell.setMinimumHeight(14f);
						cell.setBackgroundColor(cellBg);
						table.addCell(cell);
					}
					if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5) || forAreaId == 4
							|| blockLevel) {
						if (forAreaId != 18) {
							cell = new PdfPCell(new Phrase(parentName, cellFont));
							cell.setHorizontalAlignment(Element.ALIGN_LEFT);
							cell.setVerticalAlignment(Element.ALIGN_LEFT);
							cell.setMinimumHeight(14f);
							cell.setBackgroundColor(cellBg);
							table.addCell(cell);
						}
					}

					cell = new PdfPCell(
							new Phrase(String.valueOf(dailyReportFormatA03.getAreaName()).toUpperCase(), cellFont));
					cell.setVerticalAlignment(Element.ALIGN_LEFT);
					cell.setHorizontalAlignment(Element.ALIGN_LEFT);
					cell.setMinimumHeight(14f);
					cell.setBackgroundColor(cellBg);
					table.addCell(cell);

					cell = new PdfPCell(
							new Phrase(String.valueOf(dailyReportFormatA03.getDetailsWithOrWithoutToilet()), cellFont));
					cell.setPaddingLeft(5);
					cell.setVerticalAlignment(Element.ALIGN_LEFT);
					cell.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell.setMinimumHeight(14f);
					cell.setBackgroundColor(cellBg);
					table.addCell(cell);

					cell = new PdfPCell(
							new Phrase(String.valueOf(dailyReportFormatA03.getCoverageHHIncludingBLS()), cellFont));
					cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell.setMinimumHeight(17f);
					cell.setBackgroundColor(cellBg);
					table.addCell(cell);

					cell = new PdfPCell(
							new Phrase(String.valueOf(dailyReportFormatA03.getCoverageHHBalanceUncovered()), cellFont));
					cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell.setMinimumHeight(17f);
					cell.setBackgroundColor(cellBg);
					table.addCell(cell);

					cell = new PdfPCell(
							new Phrase(String.valueOf(dailyReportFormatA03.getIhhlCoveragePercent()), cellFont));
					cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell.setMinimumHeight(17f);
					cell.setBackgroundColor(cellBg);
					table.addCell(cell);
					++i;
					break;
				}
				case 2: {
					forAreaName = dailyReportFormatA03.getAreaName();
					cell = new PdfPCell(new Phrase("Total", cellFont));
					cell.setVerticalAlignment(Element.ALIGN_CENTER);
					cell.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell.setMinimumHeight(17f);
					cell.setBackgroundColor(totalBg);
					if (forAreaId == 4 || blockLevel) {
						cell.setColspan(3);
					} else if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5)) {
						cell.setColspan(4);
					} else {
						cell.setColspan(2);
					}
					table.addCell(cell);

					cell = new PdfPCell(
							new Phrase(String.valueOf(dailyReportFormatA03.getDetailsWithOrWithoutToilet()), cellFont));
					cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell.setMinimumHeight(17f);
					cell.setBackgroundColor(totalBg);
					table.addCell(cell);

					cell = new PdfPCell(
							new Phrase(String.valueOf(dailyReportFormatA03.getCoverageHHIncludingBLS()), cellFont));
					cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell.setMinimumHeight(17f);
					cell.setBackgroundColor(totalBg);
					table.addCell(cell);

					cell = new PdfPCell(
							new Phrase(String.valueOf(dailyReportFormatA03.getCoverageHHBalanceUncovered()), cellFont));
					cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell.setMinimumHeight(17f);
					cell.setBackgroundColor(totalBg);
					table.addCell(cell);

					cell = new PdfPCell(
							new Phrase(String.valueOf(dailyReportFormatA03.getIhhlCoveragePercent()), cellFont));
					cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell.setMinimumHeight(17f);
					cell.setBackgroundColor(totalBg);
					table.addCell(cell);
					break;
				}
				}
			}

			Font boldFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD);
			Paragraph upperPara = new Paragraph(
					"Area:  " + forAreaName + "   " + areaType.toUpperCase() + "-" + "WISE PHYSICAL PROGRESS STATUS",
					boldFont);
			upperPara.setAlignment(Element.ALIGN_CENTER);
			// upperPara.setSpacingAfter(10f);
			Paragraph spacePara = new Paragraph("", boldFont);
			Image legend = Image.getInstance(context.getRealPath("template//images//legend.png"));
			legend.scalePercent(50);
			legend.setAlignment(legend.ALIGN_RIGHT);
			legend.setIndentationRight(50f);

			document.open();
			document.add(spacePara);
			document.add(page1Table1);
			document.add(spacePara);
			document.add(Chunk.NEWLINE);
			document.add(Chunk.NEWLINE);
			document.add(Chunk.NEWLINE);
			document.add(page1Table2);
			document.newPage();
			document.add(upperPara);
			document.add(legend);
			document.add(table);
			document.newPage();

			Paragraph upperPara2 = new Paragraph("Area:  " + forAreaName + "   " + "TODAY’S IHHL COMPLETION "
					+ areaType.toUpperCase() + "WISE" + "\n" + "(AS PER IMIS)", boldFont);
			upperPara2.setAlignment(Element.ALIGN_CENTER);
			upperPara2.setSpacingAfter(10f);

			/**
			 * data for daily report table2 or for daily ihhl completion report
			 */
			List<Object[]> areaListPg2 = new ArrayList<>();

			List<Object[]> dailyreportPage2Data = new ArrayList<>();

			if (forAreaId == 18 || forAreaId == 3 || forAreaId == 4 || forAreaId == 5 && areaLevel == null) {
				dailyreportPage2Data = formatAO3Repository.findDailyAllRptPage2Data(forAreaId);
				areaListPg2 = areaRepository.getAllAreaNameIdLevelId(forAreaId);
			} else if ((areaLevel == null)) {
				dailyreportPage2Data = formatAO3Repository.findDailyRptPage2Data(forAreaId);
				areaListPg2 = areaRepository.getAreaNameIdLevelId(forAreaId);
			} else {
				dailyreportPage2Data = formatAO3Repository.findDailyRptPage2DataGpWise(forAreaId);
				areaListPg2 = areaRepository.getAreaNameIdLevelId(forAreaId);
			}
			Map<Integer, String> areaIdNameMap = new HashMap<>();
			/**
			 * keeping areaName against areaId in a map
			 */
			if (areaLevel == null) {
				for (Object[] obj : areaListPg2) {
					areaIdNameMap.put((Integer) obj[0], (String) obj[1]);
				}
			} else {
				for (Object[] objects : dailyreportPage2Data) {
					areaIdNameMap.put((Integer) objects[0], (String) objects[1]);
				}
			}
			/**
			 * keeping daily Ihhl completion data against area_id_created_date 
			 */
			Map<String, String> todayDailyReportPage2Map = new HashMap<>();
			for (Object[] objects : dailyreportPage2Data) {
				if (areaLevel == null) {
					todayDailyReportPage2Map.put((Integer) objects[0] + "_" + (String) objects[6],
							(Integer) objects[2] + "_" + (Integer) objects[3] + "_" + (Double) objects[4] + "_"
									+ (Integer) objects[5] + "_" + (Integer) objects[1]);
				} else {
					todayDailyReportPage2Map.put((Integer) objects[0] + "_" + (String) objects[6],
							(Integer) objects[2] + "_" + (Integer) objects[3] + "_" + (Double) objects[4] + "_"
									+ (Integer) objects[5] + "_" + (Integer) objects[7]);
				}
			}
			Map<String, String> dateValueMap = new HashMap<>();
			for (Map.Entry<String, String> entry : todayDailyReportPage2Map.entrySet()) {
				dateValueMap.put(entry.getKey().split("_")[1], entry.getKey().split("_")[1]);
			}
			List<String> dateList = new ArrayList<>();
			for (Map.Entry<String, String> entry : dateValueMap.entrySet()) {
				dateList.add(entry.getKey());
			}
			/**
			 * finding latest date and second latest date for which data is available in the db
			 */
			String latestDate = "";
			String dayBeforeLatestDate = "";
			if (dateList.get(0).compareTo(dateList.get(1)) > 0) {
				dayBeforeLatestDate = dateList.get(1);
				latestDate = dateList.get(0);
			} else if (dateList.get(0).compareTo(dateList.get(1)) < 0) {
				dayBeforeLatestDate = dateList.get(0);
				latestDate = dateList.get(1);
			}
			Map<String, String> latestDateDataMap = new HashMap<>();
			
			/**
			 * keeping daily Ihhl data of an area against the respective areaId
			 */
			for (Map.Entry<String, String> entry : todayDailyReportPage2Map.entrySet()) {
				if (todayDailyReportPage2Map.containsKey(entry.getKey().split("_")[0] + "_" + latestDate)) {
					latestDateDataMap.put(entry.getKey().split("_")[0] + "_" + latestDate, entry.getValue());
				}
			}

			PdfPTable table2;
			int dynamicColnos2 = 7;

			/**
			 * setting dynamic column numbers based on the areaLevelId
			 * and setting widths according to that
			 */
			if (forAreaId == 4 || blockLevel && areaLevel == null) {
				dynamicColnos2 = dynamicColnos2 + 1;
				table2 = new PdfPTable(dynamicColnos2);
				float widths[] = { 15f, 35f, 40f, 35f, 25f, 25f, 35f, 18f };
				table2.setWidths(widths);
				table2.setWidthPercentage(100f);
			} else if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5)) {
				dynamicColnos2 = dynamicColnos2 + 2;
				table2 = new PdfPTable(dynamicColnos2);
				float widths[] = { 18f, 35f, 40f, 50f, 35f, 25f, 25f, 35f, 18f };
				table2.setWidths(widths);
				table2.setWidthPercentage(100f);
			} else {
				table2 = new PdfPTable(dynamicColnos2);
				float widths[] = { 12f, 35f, 35f, 25f, 25f, 35f, 18f };
				table2.setWidths(widths);
				table2.setWidthPercentage(100f);
			}
			PdfPCell hcell2;

			hcell2 = new PdfPCell(new Phrase("Sl. No.", headFont));
			hcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell2.setMinimumHeight(50f);
			hcell2.setBackgroundColor(headerBgColor);
			table2.addCell(hcell2);
			/**
			 * Adding grandParent header
			 */
			if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5)) {
				hcell2 = new PdfPCell(new Phrase(grandParent, headFont));
				hcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
				hcell2.setMinimumHeight(50f);
				hcell2.setBackgroundColor(headerBgColor);
				table2.addCell(hcell2);
			}
			/**
			 * Adding parent header
			 */
			if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5) || forAreaId == 4 || blockLevel) {
				hcell2 = new PdfPCell(new Phrase(parent, headFont));
				hcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
				hcell2.setMinimumHeight(50f);
				hcell2.setBackgroundColor(headerBgColor);
				table2.addCell(hcell2);
			}

			hcell2 = new PdfPCell(new Phrase(areaHeaderName, headFont));
			hcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell2.setMinimumHeight(50f);
			hcell2.setBackgroundColor(headerBgColor);
			table2.addCell(hcell2);

			SimpleDateFormat dtfomat = new SimpleDateFormat("dd-MMMM");
			Date asOnDate = new Date();
			try {
				asOnDate = new SimpleDateFormat("dd-MM-yyyy").parse(dayBeforeLatestDate);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			String dateBalIHHL = dtfomat.format(asOnDate);
			hcell2 = new PdfPCell(new Phrase("IHHL Progress On " + dateBalIHHL, headFont));
			hcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell2.setMinimumHeight(50f);
			hcell2.setBackgroundColor(headerBgColor);
			table2.addCell(hcell2);

			hcell2 = new PdfPCell(new Phrase("Balance IHHLs", headFont));
			hcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell2.setMinimumHeight(50f);
			hcell2.setBackgroundColor(headerBgColor);
			table2.addCell(hcell2);

			hcell2 = new PdfPCell(new Phrase("Reqd Rate of Const per day", headFont));
			hcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell2.setMinimumHeight(50f);
			hcell2.setBackgroundColor(headerBgColor);
			table2.addCell(hcell2);

			hcell2 = new PdfPCell(new Phrase("%age Achievement against Reqd Rate of Const", headFont));
			hcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell2.setMinimumHeight(50f);
			hcell2.setBackgroundColor(headerBgColor);
			table2.addCell(hcell2);

			hcell2 = new PdfPCell(new Phrase("Deficit", headFont));
			hcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell2.setMinimumHeight(50f);
			hcell2.setBackgroundColor(headerBgColor);
			table2.addCell(hcell2);
			/**
			 * setting column headers to appear in each page upto which
			 * the table expands 
			 */
			table2.setHeaderRows(1);
			table2.setHeadersInEvent(true);
			/**
			 * adding column number headers 
			 */
			for (int colnos = 1; colnos <= dynamicColnos2; colnos++) {
				hcell2 = new PdfPCell(new Phrase(String.valueOf(colnos), headFont));
				hcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
				hcell2.setBackgroundColor(headerBgColor);
				table2.addCell(hcell2);
				/**
				 * setting column number headers to appear in each page upto which
				 * the table expands 
				 */
				table2.setHeaderRows(2);
			}
			int cellNoTb2 = 1;

			PdfPCell cell2;
			Map<Integer, Float> sortedAchiveAgnsRRConsMap = new LinkedHashMap<>();
			Map<Integer, Float> sortedAchiveAgnsRRConsMap2 = new LinkedHashMap<>();
			Map<Integer, String> areaIdValuesMap = new HashMap<>();
			Map<Integer, String> areaIdValuesMap2 = new HashMap<>();
			for (Object[] objects : dailyreportPage2Data) {

				/**
				 * keeping the latestDay data in the latestDataString and 2nd latest data in the
				 * dayBeforeLatestData String
				 */
				String latestDataString = todayDailyReportPage2Map.get(objects[0] + "_" + latestDate);
				String dayBeforeLatestData = todayDailyReportPage2Map.get(objects[0] + "_" + dayBeforeLatestDate);
				if (latestDateDataMap.containsKey(objects[0] + "_" + latestDate)) {
					String areaName = String.valueOf(areaIdNameMap.get(objects[0]));
					int IHHlProgress = Integer.parseInt(latestDataString.split("_")[0]);
					int balIHHLs = Integer.parseInt(latestDataString.split("_")[1]);
					int area_level = Integer.parseInt(latestDataString.split("_")[4]);
					String rrCons = "";
					float reqdRateOfCons = 0.00f;
					if (!(dayBeforeLatestData.split("_")[2]).equals("null")
							&& !(dayBeforeLatestData.split("_")[2]).equals("")) {
						reqdRateOfCons = Float.parseFloat(dayBeforeLatestData.split("_")[2]);
						/**
						 * if required Rate of Construction between 0.00f and 1.00f 
						 * then make it to 1.00f so that percent Achievement against
						 * Required Rate of Construction won't be infinity
						 */
						if (reqdRateOfCons > 0.00f && reqdRateOfCons <= 1.00f) {
							reqdRateOfCons = 1.00f;
						} else {
							reqdRateOfCons = Math.round(reqdRateOfCons);
						}
						rrCons = String.valueOf(Math.round(reqdRateOfCons));
					} else {
						rrCons = "-";
					}
					DecimalFormat df = new DecimalFormat("##.##%");
					String achiveAgnsRRCons = "";
					float perAchiveAgnstRateOfCons = 0.00f;
					/**
					 * If required rate of construction is either 0.00f or null 
					 * then set percentage Achievement against Reqd rate of construction to "-"
					 */
					if (reqdRateOfCons != 0.00f && !(dayBeforeLatestData.split("_")[2]).equals("null")) {
						perAchiveAgnstRateOfCons = (float) IHHlProgress / reqdRateOfCons;
						achiveAgnsRRCons = df.format(perAchiveAgnstRateOfCons);
					} else {
						achiveAgnsRRCons = "-";
					}
					int deficitValue = Integer.parseInt(latestDataString.split("_")[3]);
					String deficitVal = (deficitValue == 0) ? "-" : String.valueOf(deficitValue);
					latestDateDataMap.remove(objects[0] + "_" + latestDate);

					/**
					 * keeping the data in two separate maps for sorting purpose areaIdValuesMap
					 * when the achiveAgnsRRCons is not "-" areaIdValuesMap2 when the
					 * achiveAgnsRRCons is "-"
					 */
					if (!achiveAgnsRRCons.equals("-")) {
						areaIdValuesMap.put((Integer) objects[0], areaName + "_" + IHHlProgress + "_" + balIHHLs + "_"
								+ rrCons + "_" + achiveAgnsRRCons + "_" + deficitVal + "_" + area_level);
					} else {
						areaIdValuesMap2.put((Integer) objects[0], areaName + "_" + IHHlProgress + "_" + balIHHLs + "_"
								+ rrCons + "_" + achiveAgnsRRCons + "_" + deficitVal + "_" + area_level);
					}
					if (!achiveAgnsRRCons.equals("-")) {
						sortedAchiveAgnsRRConsMap.put((Integer) objects[0], perAchiveAgnstRateOfCons);
					} else {
						sortedAchiveAgnsRRConsMap2.put((Integer) objects[0], perAchiveAgnstRateOfCons);
					}
					latestDateDataMap.remove(objects[0] + "_" + latestDate);
				}
			}
			/**
			 * keeping area wise values sorted based on the perAchiveAgnstRateOfCons in one map
			 */
			Map<Integer, Float> sortByPerAchiveRRMap = sortedAchiveAgnsRRConsMap.entrySet().stream()
					.sorted(Map.Entry.comparingByValue()).collect(Collectors.toMap(Map.Entry::getKey,
							Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
			/**
			 * keeping area wise values when perAchiveAgnstRateOfCons is "-" in another map
			 */
			Map<Integer, Float> sortByPerAchiveRRMap2 = sortedAchiveAgnsRRConsMap2.entrySet().stream()
					.sorted(Map.Entry.comparingByValue()).collect(Collectors.toMap(Map.Entry::getKey,
							Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
			/**
			 * Iterate for areas who have perAchiveAgnstRateOfCons is not "_" and then 
			 * set them to the cells of the table
			 */
			for (Map.Entry<Integer, Float> entry : sortByPerAchiveRRMap.entrySet()) {
				String perAchiveRR = (areaIdValuesMap.get(entry.getKey()).split("_")[4]).replace("%", "").trim();
				double perAchiveR = !Double.isNaN(entry.getValue()) || !entry.getValue().equals(null)
						? entry.getValue() * 100
						: Double.NaN;
				/**
				 * setting color codes of each row of the table based on perAchiveAgnstRateOfCons value 
				 * falls under a certain range
				 */
				if (Double.isNaN(perAchiveR) || perAchiveRR.equals("-")) {
					cellBg = WebColors.getRGBColor("#6fdc6f");
				} else if (perAchiveR <= 50.00) {
					cellBg = WebColors.getRGBColor("#ffb3b3");
				} else if (perAchiveR > 50.00 && perAchiveR <= 79.99) {
					cellBg = WebColors.getRGBColor("#ffd9b3");
				} else if (perAchiveR >= 80.00 && perAchiveR <= 99.99) {
					cellBg = WebColors.getRGBColor("#c1f0c1");
				} else if (perAchiveR >= 100.00) {
					cellBg = WebColors.getRGBColor("#6fdc6f");
				}
				/**
				 * filtering out areas whose sbmAreaId=18 or forAreaId is same as the sbmAreaId 
				 * of the area in the current loop
				 */
				if (entry.getKey() != forAreaId && entry.getKey() != 18) {
					// setting slno
					cell2 = new PdfPCell(new Phrase(String.valueOf(cellNoTb2), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);
					String parentName = "";
					String grandParentName = "";
					/**
					 * getting parentName and grandParentName based on the areaLevelId of
					 * 	the area in the current loop			
					 */
					if (areaLevel == null && areaMap.get(areaIDParentIdMap.get(entry.getKey())) != null) {
						if (forAreaId == 5) {
							Integer pp = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getParentAreaId();
							grandParentName = areaMap.get(pp).getAreaName().toUpperCase();
							parentName = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName().toUpperCase();
						}
						if (forAreaId == 4) {
							if (areaIDParentIdMap.containsKey(entry.getKey())) {
								parentName = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName()
										.toUpperCase();
							}
						}
						int aLevel = Integer.parseInt(areaIdValuesMap.get(entry.getKey()).split("_")[6]);
						if (aLevel == 4 && areaIDParentIdMap.get(entry.getKey()) != 18) {
							if (areaIDParentIdMap.containsKey(entry.getKey())) {
								if (areaMap2.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
									parentName = areaMap2.get(areaIDParentIdMap.get(entry.getKey())).getAreaName()
											.toUpperCase();
								}
							}
						}

						if (aLevel == 5) {
							if (areaMap2.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
								Integer pp = areaMap2.get(areaIDParentIdMap.get(entry.getKey())).getParentAreaId();
								if (pp != 18) {
									if (areaMap2.containsKey(pp)) {
										grandParentName = areaMap2.get(pp).getAreaName().toUpperCase();
									}
									if (areaMap.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
										parentName = areaMap2.get(areaIDParentIdMap.get(entry.getKey())).getAreaName()
												.toUpperCase();
									}
								}
							}
						}
					} else if (areaLevel != null && areaLevel == 5) {
						if (areaMap.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
							Integer pp = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getParentAreaId();
							grandParentName = areaMap.get(pp).getAreaName().toUpperCase();
							parentName = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName().toUpperCase();
						}
					} else {
						parentName = areaIdNameMap.get(forAreaId);
					}
					/**
					 * setting grandParentName 
					 */
					if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5)) {
						cell2 = new PdfPCell(new Phrase(grandParentName, cellFont));// here set the District
						cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
						cell2.setVerticalAlignment(Element.ALIGN_LEFT);
						cell2.setMinimumHeight(17f);
						cell2.setBackgroundColor(cellBg);
						table2.addCell(cell2);
					}
					/**
					 * setting parentName
					 */
					if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5) || forAreaId == 4
							|| blockLevel) {
						if (forAreaId != 18) {
							cell2 = new PdfPCell(new Phrase(parentName, cellFont));
							cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
							cell2.setVerticalAlignment(Element.ALIGN_LEFT);
							cell2.setMinimumHeight(17f);
							cell2.setBackgroundColor(cellBg);
							table2.addCell(cell2);
						}
					}
					/**
					 * setting areaName
					 */
					cell2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdNameMap.get(entry.getKey())).toUpperCase(), cellFont));
					cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
					cell2.setVerticalAlignment(Element.ALIGN_LEFT);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);
					/**
					 *  setting IHHL Progress
					 */
					int IHHlProgress = Integer.parseInt(areaIdValuesMap.get(entry.getKey()).split("_")[1]);
					cell2 = new PdfPCell(new Phrase(String.valueOf(IHHlProgress), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_LEFT);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);
					/**
					 *  setting Balance IHHLs
					 */
					cell2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[2]), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);
					/**
					 * setting required Rate of construction day before latest
					 */
					cell2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[3]), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);
					/**
					 *  setting %age achievement against reqd rate of cons
					 * (IHHL progress)/(Reqd. Rate Of Construction)
					 */

					cell2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[4]), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);

					/**
					 *  setting deficit if deficit is surplus then set hypen else set the value
					 */
					cell2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[5]), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);

					++cellNoTb2;
				}
			}
			/**
			 * Iterate for areas who have perAchiveAgnstRateOfCons is "_" and then 
			 * set them to the cells of the table
			 */
			for (Map.Entry<Integer, Float> entry : sortByPerAchiveRRMap2.entrySet()) {
				String perAchiveRR = (areaIdValuesMap2.get(entry.getKey()).split("_")[4]).replace("%", "").trim();
				double perAchiveR = !Double.isNaN(entry.getValue()) || !entry.getValue().equals(null)
						? entry.getValue() * 100
						: Double.NaN;
				/**
				 * setting color codes of each row of the table based on perAchiveAgnstRateOfCons value 
				 * falls under a certain range
				 */
				if (Double.isNaN(perAchiveR) || perAchiveRR.equals("-")) {
					cellBg = WebColors.getRGBColor("#6fdc6f");
				} else if (perAchiveR <= 50.00) {
					cellBg = WebColors.getRGBColor("#ffb3b3");
				} else if (perAchiveR > 50.00 && perAchiveR <= 79.99) {
					cellBg = WebColors.getRGBColor("#ffd9b3");
				} else if (perAchiveR >= 80.00 && perAchiveR <= 99.99) {
					cellBg = WebColors.getRGBColor("#c1f0c1");
				} else if (perAchiveR >= 100.00) {
					cellBg = WebColors.getRGBColor("#6fdc6f");
				}
				if (entry.getKey() != forAreaId && entry.getKey() != 18) {
					/**
					 *  setting slno
					 */
					cell2 = new PdfPCell(new Phrase(String.valueOf(cellNoTb2), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);
					String parentName = "";
					String grandParentName = "";
					/**
					 * getting parentAreaName and grandParentAreaName based on the areaLevelId
					 * of the area in the current Loop
					 */
					if (areaLevel == null && areaMap.get(areaIDParentIdMap.get(entry.getKey())) != null) {
						if (forAreaId == 5) {
							Integer pp = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getParentAreaId();
							grandParentName = areaMap.get(pp).getAreaName().toUpperCase();
							parentName = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName().toUpperCase();
						}
						if (forAreaId == 4) {
							parentName = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName().toUpperCase();
						}
						int aLevel = Integer.parseInt(areaIdValuesMap2.get(entry.getKey()).split("_")[6]);
						if (aLevel == 4 && areaIDParentIdMap.get(entry.getKey()) != 18) {
							if (areaIDParentIdMap.containsKey(entry.getKey())) {
								if (areaMap2.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
									parentName = areaMap2.get(areaIDParentIdMap.get(entry.getKey())).getAreaName()
											.toUpperCase();
								}
							}
						}

						if (aLevel == 5) {
							if (areaMap2.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
								Integer pp = areaMap2.get(areaIDParentIdMap.get(entry.getKey())).getParentAreaId();
								if (pp != 18) {
									if (areaMap2.containsKey(pp)) {
										grandParentName = areaMap2.get(pp).getAreaName().toUpperCase();
									}
									if (areaMap.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
										parentName = areaMap2.get(areaIDParentIdMap.get(entry.getKey())).getAreaName()
												.toUpperCase();
									}
								}
							}
						}
					} else if (areaLevel != null && areaLevel == 5) {
						if (areaMap.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
							Integer pp = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getParentAreaId();
							grandParentName = areaMap.get(pp).getAreaName().toUpperCase();
							parentName = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName().toUpperCase();
						}
					} else {
						parentName = areaIdNameMap.get(forAreaId);
					}
					/**
					 * setting grandParentName
					 */
					if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5)) {
						cell2 = new PdfPCell(new Phrase(grandParentName, cellFont));
						cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
						cell2.setVerticalAlignment(Element.ALIGN_LEFT);
						cell2.setMinimumHeight(17f);
						cell2.setBackgroundColor(cellBg);
						table2.addCell(cell2);
					}
					/**
					 * setting parentName
					 */
					if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5) || forAreaId == 4
							|| blockLevel) {
						if (forAreaId != 18) {
							cell2 = new PdfPCell(new Phrase(parentName, cellFont));
							cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
							cell2.setVerticalAlignment(Element.ALIGN_LEFT);
							cell2.setMinimumHeight(17f);
							cell2.setBackgroundColor(cellBg);
							table2.addCell(cell2);
						}
					}
					/**
					 *  setting areaName
					 */
					cell2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdNameMap.get(entry.getKey())).toUpperCase(), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_LEFT);
					cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);
					/**
					 * setting IHHL Progress
					 */
					int IHHlProgress = Integer.parseInt(areaIdValuesMap2.get(entry.getKey()).split("_")[1]);
					cell2 = new PdfPCell(new Phrase(String.valueOf(IHHlProgress), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);
					/**
					 * setting Balance IHHLs
					 */
					cell2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap2.get(entry.getKey()).split("_")[2]), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);
					/**
					 *  setting required Rate of construction day before latest
					 */
					cell2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap2.get(entry.getKey()).split("_")[3]), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);
					/**
					 *  setting %age achievement against reqd rate of cons
					 *(IHHL progress)/(Reqd. Rate Of Construction)
					 */

					cell2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap2.get(entry.getKey()).split("_")[4]), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);

					/**
					 *  setting deficit if deficit is surplus then set hypen else set the value
					 */
					cell2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap2.get(entry.getKey()).split("_")[5]), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);

					++cellNoTb2;
				}
				/**
				 * if forAreaId is same as the samAreaId of the area in the current loop 
				 * or sbm Area Id=18 then keep it in other sorted map
				 */
				if (entry.getKey() == forAreaId || entry.getKey() == 18) {
					sortByPerAchiveRRMap.put(entry.getKey(), entry.getValue());
					areaIdValuesMap.put(entry.getKey(), areaIdValuesMap2.get(entry.getKey()));
				}
			}
			PdfPCell cellT2;
			for (Map.Entry<Integer, Float> entry : sortByPerAchiveRRMap.entrySet()) {
				if (entry.getKey() == forAreaId || entry.getKey() == 18) {

					/**
					 *  setting Total
					 */
					cell2 = new PdfPCell(new Phrase(String.valueOf("Total "), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_CENTER);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setFixedHeight(17f);
					cell2.setBackgroundColor(totalBg);
					if (forAreaId == 4 || blockLevel) {
						cell2.setColspan(3);
					} else if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5)) {
						cell2.setColspan(4);
					} else {
						cell2.setColspan(2);
					}
					table2.addCell(cell2);
					/**
					 * setting IHHL Progress
					 */
					cellT2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[1]), cellFont));
					cellT2.setVerticalAlignment(Element.ALIGN_LEFT);
					cellT2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cellT2.setMinimumHeight(17f);
					cellT2.setBackgroundColor(totalBg);
					table2.addCell(cellT2);
					/**
					 *  setting Balance IHHLs
					 */
					cellT2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[2]), cellFont));
					cellT2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cellT2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cellT2.setMinimumHeight(17f);
					cellT2.setBackgroundColor(totalBg);
					table2.addCell(cellT2);
					/**
					 *  setting required Rate of construction day before latest
					 */
					cellT2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[3]), cellFont));
					cellT2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cellT2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cellT2.setMinimumHeight(17f);
					cellT2.setBackgroundColor(totalBg);
					table2.addCell(cellT2);
					/**
					 * setting %age achievement against reqd rate of cons
					 * (IHHL progress)/(Reqd. Rate Of Construction)
					 */
					 
					cellT2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[4]), cellFont));
					cellT2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cellT2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cellT2.setMinimumHeight(17f);
					cellT2.setBackgroundColor(totalBg);
					table2.addCell(cellT2);

					/**
					 *  setting deficit if deficit is surplus then set "-" else set the value
					 */

					cellT2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[5]), cellFont));
					cellT2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cellT2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cellT2.setMinimumHeight(17f);
					cellT2.setBackgroundColor(totalBg);
					table2.addCell(cellT2);
				}
			}

			document.add(upperPara2);
			document.add(legend);
			document.add(table2);
			document.close();

			List<Area> areaList1 = (forAreaId == 2 || forAreaId == 3 || forAreaId == 4 || forAreaId == 5)
					? areaRepository.findAllByAreaLevelAreaLevelIdInOrderByAreaIdAsc(Arrays.asList(forAreaId))
					: areaRepository.findBySbmAreaId(forAreaId);
			Map<Integer, String> areaNameIdMap = new HashMap<>();
			for (Area area : areaList1) {
				areaNameIdMap.put(area.getSbmAreaId(), area.getAreaName());
			}
			/**
			 * setting pdf name based on the areaName or areaLevelId
			 */
			String pdfName = "";
			if (areaNameIdMap.containsKey(forAreaId)) {
				pdfName = areaNameIdMap.get(forAreaId);
			} else if (forAreaId == 2 || forAreaId == 18) {
				pdfName = "All_District";
			} else if (forAreaId == 3) {
				pdfName = "All_Districts";
			} else if (forAreaId == 4) {
				pdfName = "All_Blocks";
			} else if (forAreaId == 5) {
				pdfName = "All_GPs";
			}
			String dir = configurableEnvironment.getProperty("report.path");
			File file = new File(dir);
			if (!file.exists())
				file.mkdirs();

			String name = pdfName + "_" + new SimpleDateFormat("ddMMyyyyHHmmssSSSSSSS").format(new Date()) + ".pdf";
			outputPath = dir + "" + name;
			OutputStream fos = new FileOutputStream(new File(outputPath));
			out.writeTo(fos);
			out.close();
			fos.close();
		} catch (DocumentException ex) {
			log.error("Action : Error while Generating Daily Consolidated Pdf Report", ex);
		} catch (Exception e) {
			log.error("Action : Error while Generating Daily Consolidated Pdf Report", e);
			e.printStackTrace();
		}

		return new Gson().toJson(outputPath);
	}

	/**
	 * Generating JSON data for Daily Physical progress report
	 * @param forAreaId can be a sbmAreaId or areaLevel
	 * @param areaLevel if present get data for all Panchayats in a block
	 * @param range if present find data within that range
	 * @author Ashutosh
	 */
	@Override
	public List<Map<String, String>> getDailyData(int forAreaId, Integer areaLevel, String range) {
		List<Map<String, String>> dailyFormatA03ModelList = new ArrayList<>();
		try {
			List<DailyReportFormatA03> dailyReportFormatA03List = new ArrayList<>();
			Map<Integer, Area> areaMap = new HashMap<>();
			Map<Integer, Area> areaMap2 = new HashMap<>();
			/**
			 * Getting Physical Progress Data from DailyReport Table and area details based on
			 * forAreaId and areaLevel
			 */
			if (forAreaId == 18 || forAreaId == 3 || forAreaId == 4 || forAreaId == 5 && areaLevel == null) {
				dailyReportFormatA03List = formatA03DailyReportRepository.findLastDateAllData(forAreaId);
				if (!(forAreaId == 18))
					areaMap = areaRepository
							.findByAreaLevelAreaLevelIdIn(forAreaId == 5 ? Arrays.asList(4, 3) : Arrays.asList(3))
							.stream().collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
				if ((forAreaId == 18))
					areaMap = areaRepository.findBySbmAreaId(forAreaId).stream()
							.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
			} else if (areaLevel == null) {
				dailyReportFormatA03List = formatA03DailyReportRepository.findLastDateData(forAreaId);
				areaMap = areaRepository.findBySbmAreaId(forAreaId).stream()
						.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
				areaMap2 = areaRepository.findByAreaLevelAreaLevelIdIn(Arrays.asList(4, 3)).stream()
						.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
			} else {
				/**
				 * getting data of All gram panchayats when areaLevel=5
				 */
				dailyReportFormatA03List = formatA03DailyReportRepository.findLastDateDataGpWise(forAreaId);
				areaMap = areaRepository.findAreaGPWise(forAreaId).stream()
						.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
			}

			/**
			 * keeping areaId, areaName in a map
			 */
			Map<Integer, String> areaIdNameMap = new HashMap<>();
			for (DailyReportFormatA03 dailyReportFormatA03 : dailyReportFormatA03List) {
				areaIdNameMap.put(dailyReportFormatA03.getAreaId(), dailyReportFormatA03.getAreaName());
			}
			Double lowerLimit = 0.00;
			Double upperLimit = 100.00;
			/**
			 * getting range limit to filter values based on coverage percentage
			 * swapping values if value at first index is greater than the value at second index 
			 * not Required if handled through validation from front end
			 */
			if (range != null) {

				lowerLimit = Double.valueOf(range.split("-")[0]);
				upperLimit = Double.valueOf(range.split("-")[1]);
				if (upperLimit <= lowerLimit) {
					lowerLimit = lowerLimit + upperLimit;
					upperLimit = lowerLimit - upperLimit;
					lowerLimit = lowerLimit - upperLimit;
				}

			}

			int counter = 1;
			/**
			 * iterating for all the index in the latest data list of daily Report  
		 	 */
			for (DailyReportFormatA03 dailyReportFormatA03 : dailyReportFormatA03List) {
				Map<String, String> dataMap = new LinkedHashMap<>();

				/**
				 * setting areaHeader and parentAreaHeader for respective area
				 */
				String areaHeader;
				String parentAreaName = "State";
				if (dailyReportFormatA03.getAreaLevelId() == 3) {
					areaHeader = "District";
					parentAreaName = "State";
				} else if (dailyReportFormatA03.getAreaLevelId() == 4) {
					areaHeader = "Block";
					parentAreaName = "District";
				} else if (dailyReportFormatA03.getAreaLevelId() == 5) {
					areaHeader = "Gram Panchayat";
					parentAreaName = "Block";
				} else {
					areaHeader = "State";
					parentAreaName = "State";
				}
				if (areaLevel != null && areaLevel == 5) {
					areaHeader = "Gram Panchayat";
					parentAreaName = "District";
				}
				boolean notInclude = true;
				/**
				 * not to include the total if range is present
				 */
				if (range != null) {
					if (dailyReportFormatA03.getAreaId() == 18 || dailyReportFormatA03.getAreaId() == forAreaId)
						notInclude = false;
				}
				/**
				 * if range present filter the areas with in the Ihhl coverage percent range
				 */
				if ((dailyReportFormatA03.getIhhlCoveragePercent() >= lowerLimit)
						&& (dailyReportFormatA03.getIhhlCoveragePercent() <= upperLimit) && notInclude) {
					dataMap.put("Sl. No.", Integer.toString(counter));
					/**
					 * setting areaName, ParentAreaName and GrandParentAreaName of the area in the current loop
					 */
					if (areaLevel == null && dailyReportFormatA03.getParentAreaId() != null) {
						if (forAreaId == 5) {
							Integer pp = areaMap.get(dailyReportFormatA03.getParentAreaId()).getParentAreaId();
							if (areaMap.containsKey(pp)) {
								dataMap.put("District", (areaMap.get(pp).getAreaName()).toUpperCase());
								dataMap.put(parentAreaName,
										(areaMap.get(dailyReportFormatA03.getParentAreaId()).getAreaName())
												.toUpperCase());
							}
						}
						if (forAreaId == 4) {
							dataMap.put(parentAreaName,
									(areaMap.get(dailyReportFormatA03.getParentAreaId()).getAreaName()).toUpperCase());
						}
						if (dailyReportFormatA03.getAreaLevelId() == 4) {
							if (areaMap.containsKey(dailyReportFormatA03.getParentAreaId())) {
								dataMap.put(parentAreaName,
										(areaMap.get(dailyReportFormatA03.getParentAreaId()).getAreaName())
												.toUpperCase());
							}
						}
						if (dailyReportFormatA03.getAreaLevelId() == 5) {
							Integer pp = areaMap.get(dailyReportFormatA03.getParentAreaId()).getParentAreaId();
							if (pp != 18) {
								if (areaMap2.containsKey(pp)) {
									dataMap.put("District", areaMap2.get(pp).getAreaName().toUpperCase());
								}
								if (areaMap.containsKey(dailyReportFormatA03.getParentAreaId())) {
									dataMap.put("Block",
											(areaMap.get(dailyReportFormatA03.getParentAreaId()).getAreaName())
													.toUpperCase());
								}
							}
						}

					} else if (areaLevel != null && areaLevel == 5) {
						if (areaMap.containsKey(dailyReportFormatA03.getParentAreaId())) {
							Integer pp = areaMap.get(dailyReportFormatA03.getParentAreaId()).getParentAreaId();
							if (pp != 18) {
								dataMap.put("District", (areaMap.get(pp).getAreaName()).toUpperCase());
								dataMap.put("Block", (areaMap.get(dailyReportFormatA03.getParentAreaId()).getAreaName())
										.toUpperCase());
							}
						}
					}

					else {
						dataMap.put(parentAreaName, areaIdNameMap.get(forAreaId));
					}
					if (!(dailyReportFormatA03.getAreaId() == 18 || dailyReportFormatA03.getAreaId() == forAreaId)) {
						dataMap.put(areaHeader, dailyReportFormatA03.getAreaName());
					}
					dataMap.put("Total Number of IHHLs to be Constructed",
							Integer.toString(dailyReportFormatA03.getDetailsWithOrWithoutToilet()));
					dataMap.put("Total IHHLs Constructed",
							Integer.toString(dailyReportFormatA03.getCoverageHHIncludingBLS()));
					dataMap.put("Remaining IHHLs to be Constructed",
							Integer.toString(dailyReportFormatA03.getCoverageHHBalanceUncovered()));
					dataMap.put("Coverage%", Double.toString(dailyReportFormatA03.getIhhlCoveragePercent()));
					String cssClass = "";
					/**
					 * setting css color codes of the row of the table in ui based on coverage percent 
					 */
					if (dailyReportFormatA03.getIhhlCoveragePercent() <= 50.00) {
						cssClass = "firstslices";
					} else if (dailyReportFormatA03.getIhhlCoveragePercent() > 50.00
							&& dailyReportFormatA03.getIhhlCoveragePercent() <= 79.99) {
						cssClass = "secondslices";
					} else if (dailyReportFormatA03.getIhhlCoveragePercent() >= 80.00
							&& dailyReportFormatA03.getIhhlCoveragePercent() <= 99.99) {
						cssClass = "thirdslices";
					} else if (dailyReportFormatA03.getIhhlCoveragePercent() == 100.00) {
						cssClass = "fourthslices";
					}
					dataMap.put("CssClass", cssClass);
					counter++;
					dailyFormatA03ModelList.add(dataMap);

					// css color code need to be send
				}
			}
		} catch (Exception e) {
			log.error("Action : Error while Generating Json Data for Physical Progress Report", e);
		}
		return dailyFormatA03ModelList;
	}

	/**
	 * Generating JSON data for Daily IHHL Completion report
	 * 
	 * @param forAreaId can be a sbmAreaId or areaLevel
	 * @param areaLevel if present get data for all Panchayats in a block
	 * @param range if present find data within that range
	 * 
	 * @author Ashutosh
	 */
	public List<Map<String, String>> getDailyDataTb2(int forAreaId, Integer areaLevel, String range) {

		List<Map<String, String>> dailyFormatA03ModelTb2List = new ArrayList<>();
		try {
			List<Object[]> areaListPg2 = new ArrayList<>();

			List<Object[]> dailyreportPage2Data = new ArrayList<>();

			/**
			 * getting parentAreaId against sbmAreaId
			 */
			Map<Integer, Integer> areaIDParentIdMap = new HashMap<>();
			areaIDParentIdMap = areaRepository.findByAreaIdParentAreaId(forAreaId).stream()
					.collect(Collectors.toMap(Area::getSbmAreaId, Area::getParentAreaId));
			Map<Integer, Area> areaMap = new HashMap<>();
			Map<Integer, Area> areaMap2 = new HashMap<>();

			/**
			 * Getting IHHL Completion Data from FormatA03 Table and area details based on
			 * forAreaId and areaLevel
			 */
			if (forAreaId == 18 || forAreaId == 3 || forAreaId == 4 || forAreaId == 5 && areaLevel == null) {
				dailyreportPage2Data = formatAO3Repository.findDailyAllRptPage2Data(forAreaId);
				areaListPg2 = areaRepository.getAllAreaNameIdLevelId(forAreaId);

				if (!(forAreaId == 18))
					areaMap = areaRepository
							.findByAreaLevelAreaLevelIdIn(forAreaId == 5 ? Arrays.asList(4, 3) : Arrays.asList(3))
							.stream().collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
				if ((forAreaId == 18))
					areaMap = areaRepository.findBySbmAreaId(forAreaId).stream()
							.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
			} else if ((areaLevel == null)) {
				dailyreportPage2Data = formatAO3Repository.findDailyRptPage2Data(forAreaId);
				areaListPg2 = areaRepository.getAreaNameIdLevelId(forAreaId);
				areaMap = areaRepository.findBySbmAreaId(forAreaId).stream()
						.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
				areaMap2 = areaRepository.findByAreaLevelAreaLevelIdIn(Arrays.asList(4, 3)).stream()
						.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
			} else {
				/**
				 * getting data of All gram panchayats when areaLevel=5
				 */
				dailyreportPage2Data = formatAO3Repository.findDailyRptPage2DataGpWise(forAreaId);
				areaListPg2 = areaRepository.getAreaNameIdLevelId(forAreaId);
				areaMap = areaRepository.findAreaGPWise(forAreaId).stream()
						.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
			}

			/**
			 * keeping areaName against areaId in map
			 */
			Map<Integer, String> areaIdNameMap = new HashMap<>();
			if (areaLevel == null) {
				for (Object[] obj : areaListPg2) {
					areaIdNameMap.put((Integer) obj[0], (String) obj[1]);
				}
			} else {
				for (Object[] objects : dailyreportPage2Data) {
					areaIdNameMap.put((Integer) objects[0], (String) objects[1]);
				}
			}

			/**
			 * putting Ihhl completion data in map when areaLevel not present and when areaLevel Present
			 */
			Map<String, String> todayDailyReportPage2Map = new HashMap<>();
			for (Object[] objects : dailyreportPage2Data) {
				if (areaLevel == null) {
					todayDailyReportPage2Map.put((Integer) objects[0] + "_" + (String) objects[6],
							(Integer) objects[2] + "_" + (Integer) objects[3] + "_" + (Double) objects[4] + "_"
									+ (Integer) objects[5] + "_" + (Integer) objects[1]);
				} else {
					todayDailyReportPage2Map.put((Integer) objects[0] + "_" + (String) objects[6],
							(Integer) objects[2] + "_" + (Integer) objects[3] + "_" + (Double) objects[4] + "_"
									+ (Integer) objects[5] + "_" + (Integer) objects[7]);
				}
			}

			/**
			 * getting the latest two dates fetched from db
			 */
			Map<String, String> dateValueMap = new HashMap<>();
			for (Map.Entry<String, String> entry : todayDailyReportPage2Map.entrySet()) {
				dateValueMap.put(entry.getKey().split("_")[1], entry.getKey().split("_")[1]);
			}
			/**
			 * keeping the latest two dates in a list from the result fetched
			 */
			List<String> dateList = new ArrayList<>();
			for (Map.Entry<String, String> entry : dateValueMap.entrySet()) {
				dateList.add(entry.getKey());
			}
			String latestDate = "";
			String dayBeforeLatestDate = "";
			/**
			 * comparing two dates of latest two records fetched from DB
			 */
			if (dateList.get(0).compareTo(dateList.get(1)) > 0) {
				dayBeforeLatestDate = dateList.get(1);
				latestDate = dateList.get(0);
			} else if (dateList.get(0).compareTo(dateList.get(1)) < 0) {
				dayBeforeLatestDate = dateList.get(0);
				latestDate = dateList.get(1);
			}
			
			/**
			 * putting the latest date data in map 
			 * key sbmAreaId_date , value -> all values of latest date 
			 * 
			 * we are only taking the Required Rate of construction from the Day Before latest date(that is 
			 * from the second latest date)
			 */
			Map<String, String> latestDateDataMap = new HashMap<>();

			for (Map.Entry<String, String> entry : todayDailyReportPage2Map.entrySet()) {
				if (todayDailyReportPage2Map.containsKey(entry.getKey().split("_")[0] + "_" + latestDate)) {
					latestDateDataMap.put(entry.getKey().split("_")[0] + "_" + latestDate, entry.getValue());
				}
			}

			String areaHeader = "";
			String parentAreaName = "State";
			
			/**
			 * taken two sorted map to keep values in a sorted order
			 *  first map when percentage achievement against RR is not "-"
			 *  second map when percentage achievement against RR is "-"
			 */
			Map<Integer, Float> sortedAchiveAgnsRRConsMap = new LinkedHashMap<>();
			Map<Integer, Float> sortedAchiveAgnsRRConsMap2 = new LinkedHashMap<>();
			Map<Integer, String> areaIdValuesMap = new HashMap<>();
			Map<Integer, String> areaIdValuesMap2 = new HashMap<>();
			for (Object[] objects : dailyreportPage2Data) {

				/**
				 * Setting the areaHeader and parentAreaHeader in the json 
				 */
				if (areaLevel == null && (Integer) objects[1] == 3) {
					areaHeader = "District";
					parentAreaName = "State";
				} else if (areaLevel == null && (Integer) objects[1] == 4) {
					areaHeader = "Block";
					parentAreaName = "District";
				} else if (areaLevel == null && (Integer) objects[1] == 5) {
					areaHeader = "Gram Panchayat";
					parentAreaName = "Block";
				} else {
					areaHeader = "State";
					parentAreaName = "State";
				}
				if (areaLevel != null && areaLevel == 5) {
					areaHeader = "Gram Panchayat";
					parentAreaName = "District";
				}
				
				/**
				 * keeping the latest date data in latestDataString string 
				 * and second latest date data in dayBeforeLatestData string 
				 */
				String latestDataString = todayDailyReportPage2Map.get(objects[0] + "_" + latestDate);
				String dayBeforeLatestData = todayDailyReportPage2Map.get(objects[0] + "_" + dayBeforeLatestDate);
				
				if (latestDateDataMap.containsKey(objects[0] + "_" + latestDate)) {
					
					String areaName = String.valueOf(areaIdNameMap.get(objects[0]));
					int IHHlProgress = Integer.parseInt(latestDataString.split("_")[0]);
					int balIHHLs = Integer.parseInt(latestDataString.split("_")[1]);
					int area_level = Integer.parseInt(latestDataString.split("_")[4]);
					String rrCons = "";
					float reqdRateOfCons = 0.00f;
					/**
					 * Getting Required Rate of construction from the second latest date data 
					 */
					if (!(dayBeforeLatestData.split("_")[2]).equals("null")
							&& !(dayBeforeLatestData.split("_")[2]).equals("")) {
						reqdRateOfCons = Float.parseFloat(dayBeforeLatestData.split("_")[2]);
						
						/**
						 * Setting the Required Rate of construction to 1.00 when the value is in
						 * between 0.00f and 1.00f so that the percentage achieved against required rate
						 * of construction value won't be infinity
						 */
						if (reqdRateOfCons > 0.00f && reqdRateOfCons <= 1.00f) {
							reqdRateOfCons = 1.00f;
						} else {
							reqdRateOfCons = Math.round(reqdRateOfCons);
						}
						rrCons = String.valueOf(Math.round(reqdRateOfCons));
					} else {
						rrCons = "-";
					}
					DecimalFormat df = new DecimalFormat("##.##%");
					String achiveAgnsRRCons = "";
					float perAchiveAgnstRateOfCons = 0.00f;
					/**
					 * set percentage achievement against RR "-" when the values is either 0.00f or null
					 */
					if (reqdRateOfCons != 0.00f && !(dayBeforeLatestData.split("_")[2]).equals("null")) {
						perAchiveAgnstRateOfCons = (float) IHHlProgress / reqdRateOfCons;
						achiveAgnsRRCons = df.format(perAchiveAgnstRateOfCons);
					} else {
						achiveAgnsRRCons = "-";
					}
					/**
					 * get deficit value and if it is 0 then set it to "-"
					 */
					int deficitValue = Integer.parseInt(latestDataString.split("_")[3]);
					String deficitVal = (deficitValue == 0) ? "-" : String.valueOf(deficitValue);
					/**
					 * removing the data from the map once we get the values for a particular area as we are getting
					 *  data for two dates for a single sbm areaId
					 */
					latestDateDataMap.remove(objects[0] + "_" + latestDate);

					/**
					 * keeping the values in two map first for area who has  percentage achievement against RR is  "-"
					 * second for area percentage achievement against RR is not "-"
					 */
					if (!achiveAgnsRRCons.equals("-")) {
						areaIdValuesMap.put((Integer) objects[0], areaName + "_" + IHHlProgress + "_" + balIHHLs + "_"
								+ rrCons + "_" + achiveAgnsRRCons + "_" + deficitVal + "_" + area_level);
					} else {
						areaIdValuesMap2.put((Integer) objects[0], areaName + "_" + IHHlProgress + "_" + balIHHLs + "_"
								+ rrCons + "_" + achiveAgnsRRCons + "_" + deficitVal + "_" + area_level);
					}
					/**
					 * keeping percentage achievement against RR against sbm Area Id
					 */
					if (!achiveAgnsRRCons.equals("-")) {
						sortedAchiveAgnsRRConsMap.put((Integer) objects[0], perAchiveAgnstRateOfCons);
					} else {
						sortedAchiveAgnsRRConsMap2.put((Integer) objects[0], perAchiveAgnstRateOfCons);
					}
					latestDateDataMap.remove(objects[0] + "_" + latestDate);
				}
			}
			/**
			 * keeping values in two sorted map based on the percentage achievement against RR values 
			 */
			Map<Integer, Float> sortByPerAchiveRRMap = sortedAchiveAgnsRRConsMap.entrySet().stream()
					.sorted(Map.Entry.comparingByValue()).collect(Collectors.toMap(Map.Entry::getKey,
							Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
			Map<Integer, Float> sortByPerAchiveRRMap2 = sortedAchiveAgnsRRConsMap2.entrySet().stream()
					.sorted(Map.Entry.comparingByValue()).collect(Collectors.toMap(Map.Entry::getKey,
							Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));

			int counter = 0;
			String cssClass = "";
			Map<String, String> dataMap = new LinkedHashMap<>();
			/**
			 * setting values for respective sbm area id when percentage achievement against RR is not "-"
			 */
			for (Map.Entry<Integer, Float> entry : sortByPerAchiveRRMap.entrySet()) {
				dataMap = new LinkedHashMap<>();
				String perAchiveRR = (areaIdValuesMap.get(entry.getKey()).split("_")[4]).replace("%", "").trim();
				double perAchiveR = !Double.isNaN(entry.getValue()) || !entry.getValue().equals(null)
						? entry.getValue() * 100
						: Double.NaN;
				/**
				 * setting css Class for color of the row of the table based on the range of percentage achievement against RR
				 */
				if (Double.isNaN(perAchiveR) || perAchiveRR.equals("-")) {
					cssClass = "fourthslices";
				} else if (perAchiveR <= 50.00) {
					cssClass = "firstslices";
				} else if (perAchiveR > 50.00 && perAchiveR <= 79.99) {
					cssClass = "secondslices";
				} else if (perAchiveR >= 80.00 && perAchiveR <= 99.99) {
					cssClass = "thirdslices";
				} else if (perAchiveR >= 100.00) {
					cssClass = "fourthslices";
				}
				if (entry.getKey() != forAreaId && entry.getKey() != 18) {
					counter++;
					dataMap.put("Sl. No.", Integer.toString(counter));

					/**
					 * setting areaName, Parent AreaName for respective area Id to dataMap
					 */
					if (areaLevel == null && areaMap.get(areaIDParentIdMap.get(entry.getKey())) != null) {
						if (forAreaId == 5) {
							Integer pp = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getParentAreaId();
							if (areaMap.containsKey(pp)) {
								dataMap.put("District", (areaMap.get(pp).getAreaName()).toUpperCase());
								dataMap.put(parentAreaName,
										(areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName())
												.toUpperCase());
							}
						}
						if (forAreaId == 4) {
							dataMap.put(parentAreaName,
									(areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName()).toUpperCase());
						}
						int aLevel = Integer.parseInt(areaIdValuesMap.get(entry.getKey()).split("_")[6]);
						if (aLevel == 4) {
							if (areaMap.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
								dataMap.put(parentAreaName,
										(areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName())
												.toUpperCase());
							}
						}
						if (aLevel == 5) {
							Integer pp = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getParentAreaId();
							if (pp != 18) {
								if (areaMap2.containsKey(pp)) {
									dataMap.put("District", areaMap2.get(pp).getAreaName().toUpperCase());
								}
								if (areaMap.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
									dataMap.put("Block",
											(areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName())
													.toUpperCase());
								}
							}
						}

					} else if (areaLevel != null && areaLevel == 5) {
						if (areaMap.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
							Integer pp = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getParentAreaId();
							if (pp != 18) {
								dataMap.put("District", (areaMap.get(pp).getAreaName()).toUpperCase());
								dataMap.put("Block", (areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName())
										.toUpperCase());
							}
						}
					}

					else {
						dataMap.put(parentAreaName, areaIdNameMap.get(forAreaId));
					}

					dataMap.put(areaHeader, areaIdNameMap.get(entry.getKey()).toUpperCase());
					int IHHlProgress = Integer.parseInt(areaIdValuesMap.get(entry.getKey()).split("_")[1]);
					SimpleDateFormat dtfomat = new SimpleDateFormat("dd-MMMM");
					Date asOnDate = new Date();
					try {
						asOnDate = new SimpleDateFormat("dd-MM-yyyy").parse(dayBeforeLatestDate);
					} catch (ParseException e) {
						e.printStackTrace();
					}
					String dateBalIHHL = dtfomat.format(asOnDate);
					dataMap.put("IHHL Progress On " + dateBalIHHL, String.valueOf(IHHlProgress));
					dataMap.put("Balance IHHLs", String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[2]));
					dataMap.put("Reqd Rate of Const per day",
							String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[3]));
					dataMap.put("%age Achievement against Reqd Rate of Const",
							String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[4]));
					dataMap.put("Deficit", String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[5]));
					dataMap.put("CssClass", cssClass);
					dailyFormatA03ModelTb2List.add(dataMap);
				}
			}

			/**
			 * setting values for respective sbm area id when percentage achievement against RR is  "-"
			 */
			for (Map.Entry<Integer, Float> entry : sortByPerAchiveRRMap2.entrySet()) {
				dataMap = new LinkedHashMap<>();
				String perAchiveRR = (areaIdValuesMap2.get(entry.getKey()).split("_")[4]).replace("%", "").trim();
				double perAchiveR = !Double.isNaN(entry.getValue()) || !entry.getValue().equals(null)
						? entry.getValue() * 100
						: Double.NaN;
				
				/**
				 * setting css Class for color of the row of the table in the UI
				 *  based on the range of percentage achievement against RR
				 */
				if (Double.isNaN(perAchiveR) || perAchiveRR.equals("-")) {
					cssClass = "fourthslices";
				} else if (perAchiveR <= 50.00) {
					cssClass = "firstslices";
				} else if (perAchiveR > 50.00 && perAchiveR <= 79.99) {
					cssClass = "secondslices";
				} else if (perAchiveR >= 80.00 && perAchiveR <= 99.99) {
					cssClass = "thirdslices";
				} else if (perAchiveR >= 100.00) {
					cssClass = "fourthslices";
				}
				if (entry.getKey() != forAreaId && entry.getKey() != 18) {
					counter++;
					dataMap.put("Sl. No.", Integer.toString(counter));
					/**
					 * setting areaName, Parent AreaName for respective area Id to json 
					 */
					if (areaLevel == null && areaMap.get(areaIDParentIdMap.get(entry.getKey())) != null) {
						if (forAreaId == 5) {
							Integer pp = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getParentAreaId();
							if (areaMap.containsKey(pp)) {
								dataMap.put("District", (areaMap.get(pp).getAreaName()).toUpperCase());
								dataMap.put(parentAreaName,
										(areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName())
												.toUpperCase());
							}
						}
						if (forAreaId == 4) {
							dataMap.put(parentAreaName,
									(areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName()).toUpperCase());
						}
						int aLevel = Integer.parseInt(areaIdValuesMap2.get(entry.getKey()).split("_")[6]);
						if (aLevel == 4) {
							if (areaMap.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
								dataMap.put(parentAreaName,
										(areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName())
												.toUpperCase());
							}
						}
						if (aLevel == 5) {
							Integer pp = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getParentAreaId();
							if (pp != 18) {
								if (areaMap2.containsKey(pp)) {
									dataMap.put("District", areaMap2.get(pp).getAreaName().toUpperCase());
								}
								if (areaMap.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
									dataMap.put("Block",
											(areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName())
													.toUpperCase());
								}
							}
						}

					} else if (areaLevel != null && areaLevel == 5) {
						if (areaMap.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
							Integer pp = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getParentAreaId();
							if (pp != 18) {
								dataMap.put("District", (areaMap.get(pp).getAreaName()).toUpperCase());
								dataMap.put("Block", (areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName())
										.toUpperCase());
							}
						}
					}

					else {
						dataMap.put(parentAreaName, areaIdNameMap.get(forAreaId));
					}

					dataMap.put(areaHeader, areaIdNameMap.get(entry.getKey()).toUpperCase());
					int IHHlProgress = Integer.parseInt(areaIdValuesMap2.get(entry.getKey()).split("_")[1]);
					SimpleDateFormat dtfomat = new SimpleDateFormat("dd-MMMM");
					Date asOnDate = new Date();
					try {
						asOnDate = new SimpleDateFormat("dd-MM-yyyy").parse(dayBeforeLatestDate);
					} catch (ParseException e) {
						e.printStackTrace();
					}
					String dateBalIHHL = dtfomat.format(asOnDate);
					dataMap.put("IHHL Progress On " + dateBalIHHL, String.valueOf(IHHlProgress));
					dataMap.put("Balance IHHLs", String.valueOf(areaIdValuesMap2.get(entry.getKey()).split("_")[2]));
					dataMap.put("Reqd Rate of Const per day",
							String.valueOf(areaIdValuesMap2.get(entry.getKey()).split("_")[3]));
					dataMap.put("%age Achievement against Reqd Rate of Const",
							String.valueOf(areaIdValuesMap2.get(entry.getKey()).split("_")[4]));
					dataMap.put("Deficit", String.valueOf(areaIdValuesMap2.get(entry.getKey()).split("_")[5]));
					dataMap.put("CssClass", cssClass);
					dailyFormatA03ModelTb2List.add(dataMap);
				}
				/**
				 * setting values against arearId when current areaId in the loop equals forAreaId or 18 (sbm area Id of Odisha)
				 */
				if (entry.getKey() == forAreaId || entry.getKey() == 18) {
					sortByPerAchiveRRMap.put(entry.getKey(), entry.getValue());
					areaIdValuesMap.put(entry.getKey(), areaIdValuesMap2.get(entry.getKey()));
				}
			}

			for (Map.Entry<Integer, Float> entry : sortByPerAchiveRRMap.entrySet()) {

				String perAchiveRR = (areaIdValuesMap.get(entry.getKey()).split("_")[4]).replace("%", "").trim();

				double perAchiveR = !Double.isNaN(entry.getValue()) || !entry.getValue().equals(null)
						? entry.getValue() * 100
						: Double.NaN;
				if (Double.isNaN(perAchiveR) || perAchiveRR.equals("-")) {
					cssClass = "fourthslices";
				} else if (perAchiveR <= 50.00) {
					cssClass = "firstslices";
				} else if (perAchiveR > 50.00 && perAchiveR <= 79.99) {
					cssClass = "secondslices";
				} else if (perAchiveR >= 80.00 && perAchiveR <= 99.99) {
					cssClass = "thirdslices";
				} else if (perAchiveR >= 100.00) {
					cssClass = "fourthslices";
				}
				dataMap = new LinkedHashMap<>();
				if (entry.getKey() == forAreaId || entry.getKey() == 18) {
					dataMap.put("Sl No.", Integer.toString(++counter));
					// dataMap.put(areaHeader, areaIdNameMap.get(entry.getKey()));
					int IHHlProgress = Integer.parseInt(areaIdValuesMap.get(entry.getKey()).split("_")[1]);
					SimpleDateFormat dtfomat = new SimpleDateFormat("dd-MMMM");
					Date asOnDate = new Date();
					try {
						asOnDate = new SimpleDateFormat("dd-MM-yyyy").parse(dayBeforeLatestDate);
					} catch (ParseException e) {
						e.printStackTrace();
					}
					String dateBalIHHL = dtfomat.format(asOnDate);
					dataMap.put("IHHL Progress On " + dateBalIHHL, String.valueOf(IHHlProgress));
					dataMap.put("Balance IHHLs", String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[2]));
					dataMap.put("Reqd Rate of Const per day",
							String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[3]));
					dataMap.put("%age Achievement against Reqd Rate of Const",
							String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[4]));
					dataMap.put("Deficit", String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[5]));
					dataMap.put("CssClass", cssClass);
					dailyFormatA03ModelTb2List.add(dataMap);
				}
			}
		} catch (Exception e) {
			log.error("Action : Error while Generating Json Data for Ihhl Completion Report", e);
		}
		return dailyFormatA03ModelTb2List;
	}

	/**
	 * separate pdf report generation for Daily Physical progress status
	 * 
	 * @param forAreaId can be a sbmAreaId or areaLevel
	 * @param areaLevel if present get data for all Panchayats in a block
	 * @param range if present find data within that range
	 * @param request for setting the domain that is the source of the pdf generated
	 * @return outputPath path from where the pdf will be downloaded
	 * 
	 * @author Ashutosh
	 */
	@Override
	public String genDailyPhyProgressRprt(int forAreaId, Integer areaLevel, String range, HttpServletRequest request) {
		String outputPath = null;
		List<DailyReportFormatA03> dailyReportFormatA03List = new ArrayList<>();
		Map<Integer, Area> areaMap = new HashMap<>();
		Map<Integer, Area> areaMap2 = new HashMap<>();
		/**
		 * getting physical progress report data from daily_report_a03 table
		 * and getting area from mst_area table
		 */
		if (forAreaId == 18 || forAreaId == 3 || forAreaId == 4 || forAreaId == 5 && areaLevel == null) {
			dailyReportFormatA03List = formatA03DailyReportRepository.findLastDateAllData(forAreaId);
			if (!(forAreaId == 18))
				areaMap = areaRepository
						.findByAreaLevelAreaLevelIdIn(forAreaId == 5 ? Arrays.asList(4, 3) : Arrays.asList(3)).stream()
						.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
			if ((forAreaId == 18))
				areaMap = areaRepository.findBySbmAreaId(forAreaId).stream()
						.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
		} else if (areaLevel == null) {
			dailyReportFormatA03List = formatA03DailyReportRepository.findLastDateData(forAreaId);
			areaMap = areaRepository.findBySbmAreaId(forAreaId).stream()
					.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
			areaMap2 = areaRepository.findByAreaLevelAreaLevelIdIn(Arrays.asList(4, 3)).stream()
					.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
		} else {
			/**
			 * when areaLevel is present and areaLevel==5
			 */
			dailyReportFormatA03List = formatA03DailyReportRepository.findLastDateDataGpWise(forAreaId);
			areaMap = areaRepository.findAreaGPWise(forAreaId).stream()
					.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
		}
		List<Area> areaList = areaRepository.findBySbmAreaId(forAreaId);
		Map<Integer, String> areaIdNameMap = new HashMap<>();
		/**
		 * putting areaName against sbmAreaId in a map
		 */
		for (DailyReportFormatA03 dailyReportFormatA03 : dailyReportFormatA03List) {
			areaIdNameMap.put(dailyReportFormatA03.getAreaId(), dailyReportFormatA03.getAreaName());
		}

		Map<Integer, Integer> distStateMap = new HashMap<>();
		Map<Integer, Integer> blockDistMap = new HashMap<>();
		Map<Integer, Integer> gpBlockMap = new HashMap<>();
		String areaType = "";
		String areaHeaderName = "";
		String grandParent = "";
		String parent = "";
		boolean blockLevel = false;
		boolean gpLevel = false;
		boolean distLevel = false;
		/**
		 * getting areaType, areaHeaderName based on areaLevelId 
		 */
		for (Area area : areaList) {
			if (area.getAreaLevel().getAreaLevelId() == 3 || forAreaId == 4) {
				areaType = "Block";
				areaHeaderName = "Block";
				distStateMap.put(area.getSbmAreaId(), area.getParentAreaId());
			} else if (area.getAreaLevel().getAreaLevelId() == 4 || forAreaId == 5) {
				blockDistMap.put(area.getSbmAreaId(), area.getParentAreaId());
				areaType = "Gram Panchayat";
				areaHeaderName = "Gram Panchayat";

			} else if (area.getAreaLevel().getAreaLevelId() == 5) {
				gpBlockMap.put(area.getSbmAreaId(), area.getParentAreaId());
				areaType = "Gram Panchayat";
				areaHeaderName = "Gram Panchayat";
				grandParent = "District";
				parent = "Block";
			} else {
				areaType = "District";
				areaHeaderName = "District";
			}
		}
		if (areaMap.containsKey(forAreaId)) {
			if (areaMap.get(forAreaId).getAreaLevel().getAreaLevelId() == 4 || areaLevel != null) {
				gpLevel = true;
				grandParent = "District";
				parent = "Block";
			} else if (areaMap.get(forAreaId).getAreaLevel().getAreaLevelId() == 3 && areaLevel == null) {
				blockLevel = true;
				parent = "District";
			} else {
				distLevel = true;
			}
		}
		String forAreaName = "";
		if (forAreaId == 4) {
			areaType = "Block";
			forAreaName = "Odisha";
			areaHeaderName = "Block";
			parent = "District";
		} else if (forAreaId == 5) {
			areaType = "Gram Panchayat";
			areaHeaderName = "Gram Panchayat";
			forAreaName = "Odisha";
			grandParent = "District";
			parent = "Block";
		} else {
			forAreaName = "Odisha";
		}
		if (areaLevel != null && areaLevel == 5) {
			areaType = "Gram Panchayat";
			areaHeaderName = "Gram Panchayat";
			grandParent = "District";
			parent = "Block";
		}
		Document document = new Document(PageSize.A4.rotate());
		ByteArrayOutputStream out = new ByteArrayOutputStream();

		String pattern = "dd-MM-yyyy";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		String reportCreatedDate = simpleDateFormat.format(new Date());
		String uri = request.getRequestURI();
		String domainName = request.getRequestURL().toString();
		String ctxPath = request.getContextPath();
		domainName = domainName.replaceFirst(uri, "");
		domainName += ctxPath;

		try {

			PdfWriter writer = PdfWriter.getInstance(document, out);

			document.setMargins(document.leftMargin(), document.rightMargin(), 0, document.bottomMargin());
			HeaderFooter headerFooter = new HeaderFooter(context, "Daily", reportCreatedDate, domainName);
			/**
			 * adds header and footer to each page of the pdf by calling 
			 * onStartPage() and onEndPage() of HeaderFooter class that are triggered by 
			 * page starting and page ending events of the pdf 
			 */
			writer.setPageEvent(headerFooter);

			BaseColor headerBgColor = WebColors.getRGBColor("#668cff");
			BaseColor totalBg = WebColors.getRGBColor("#e6f3ff");
			BaseColor cellBg = WebColors.getRGBColor("#ffffb3");
			Font headFont = new Font(FontFamily.HELVETICA, 11, Font.NORMAL, BaseColor.WHITE);

			Font cellFont = new Font(FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.BLACK);
			int dynamicColnos = 6;
			PdfPTable table;
			/**
			 * getting dynamic column numbers based on the areaLevelId 
			 */
			if (forAreaId == 4 || blockLevel && areaLevel == null) {
				dynamicColnos = dynamicColnos + 1;
				table = new PdfPTable(dynamicColnos);
				float widths[] = { 15f, 35f, 35f, 25f, 25f, 35f, 18f };
				table.setWidths(widths);
				table.setWidthPercentage(100f);
			} else if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5)) {
				dynamicColnos = dynamicColnos + 2;
				table = new PdfPTable(dynamicColnos);
				float widths[] = { 18f, 35f, 35f, 50f, 25f, 25f, 35f, 18f };
				table.setWidths(widths);
				table.setWidthPercentage(100f);
			} else {
				table = new PdfPTable(dynamicColnos);
				float widths[] = { 12f, 35f, 25f, 25f, 35f, 18f };
				table.setWidths(widths);
				table.setWidthPercentage(100f);
			}
			PdfPCell hcell;

			hcell = new PdfPCell(new Phrase("Sl. No.", headFont));
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell.setMinimumHeight(50f);
			hcell.setBackgroundColor(headerBgColor);
			table.addCell(hcell);
			/**
			 * setting grandParent header
			 */
			if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5)) {
				hcell = new PdfPCell(new Phrase(grandParent, headFont));// here set the District
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
				hcell.setMinimumHeight(50f);
				hcell.setBackgroundColor(headerBgColor);
				table.addCell(hcell);
			}
			/**
			 * setting parentHeader
			 */
			if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5) || forAreaId == 4 || blockLevel) {
				hcell = new PdfPCell(new Phrase(parent, headFont));
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
				hcell.setMinimumHeight(50f);
				hcell.setBackgroundColor(headerBgColor);
				table.addCell(hcell);
			}
			hcell = new PdfPCell(new Phrase(areaHeaderName, headFont));
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell.setMinimumHeight(50f);
			hcell.setBackgroundColor(headerBgColor);
			table.addCell(hcell);

			hcell = new PdfPCell(new Phrase("Total No. of IHHLs to be Constructed", headFont));
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell.setMinimumHeight(50f);
			hcell.setBackgroundColor(headerBgColor);
			table.addCell(hcell);

			hcell = new PdfPCell(new Phrase("Total IHHLs Constructed", headFont));
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell.setMinimumHeight(50f);
			hcell.setBackgroundColor(headerBgColor);
			table.addCell(hcell);

			hcell = new PdfPCell(new Phrase("Remaining IHHLs to be Constructed", headFont));
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell.setMinimumHeight(50f);
			hcell.setBackgroundColor(headerBgColor);
			table.addCell(hcell);

			hcell = new PdfPCell(new Phrase("Coverage " + "\n" + "%age", headFont));
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell.setMinimumHeight(50f);
			hcell.setBackgroundColor(headerBgColor);
			table.addCell(hcell);
			table.setHeaderRows(1);
			/**
			 * setting column numbers below top header row of the table
			 */
			for (int colnos = 1; colnos <= dynamicColnos; colnos++) {
				hcell = new PdfPCell(new Phrase(String.valueOf(colnos), headFont));
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				// hcell.setFixedHeight(16f);
				hcell.setBackgroundColor(headerBgColor);
				table.addCell(hcell);
				table.setHeaderRows(2);
			}
			int i = 1;
			int case1 = 1;
			Double lowerLimit = 0.00;
			Double upperLimit = 100.00;
			/**
			 * range limit based on the Ihhl Coverage percentage
			 * swapping of range limit if lowerLimit is greater than the upperLimit
			 * not required if handled through validation at front end
			 */
			if (range != null) {

				lowerLimit = Double.valueOf(range.split("-")[0]);
				upperLimit = Double.valueOf(range.split("-")[1]);
				if (upperLimit <= lowerLimit) {
					lowerLimit = lowerLimit + upperLimit;
					upperLimit = lowerLimit - upperLimit;
					lowerLimit = lowerLimit - upperLimit;
				}

			}
			/**
			 * Iterating dailyReportFormatA03List for setting values for all areas in the list
			 */
			for (DailyReportFormatA03 dailyReportFormatA03 : dailyReportFormatA03List) {

				case1 = (dailyReportFormatA03.getAreaId() != forAreaId) ? 1 : 2;
				if (dailyReportFormatA03.getAreaId() == 18)
					case1 = 2;
				PdfPCell cell;
				switch (case1) {
				case 1: {
					/**
					 * if range param present then filter out the sbmAreas whose
					 * IhhlCoveragePercent is in between the range 
					 */
					if ((dailyReportFormatA03.getIhhlCoveragePercent() >= lowerLimit)
							&& (dailyReportFormatA03.getIhhlCoveragePercent() <= upperLimit)) {
						
						/**
						 * setting background color of rows of the table in the pdf
						 * based on the Ihhl coverage percentage of an area
						 */
						if (dailyReportFormatA03.getIhhlCoveragePercent() <= 50.00) {
							cellBg = WebColors.getRGBColor("#ffb3b3");
						} else if (dailyReportFormatA03.getIhhlCoveragePercent() > 50.00
								&& dailyReportFormatA03.getIhhlCoveragePercent() <= 79.99) {
							cellBg = WebColors.getRGBColor("#ffd9b3");
						} else if (dailyReportFormatA03.getIhhlCoveragePercent() >= 80.00
								&& dailyReportFormatA03.getIhhlCoveragePercent() <= 99.99) {
							cellBg = WebColors.getRGBColor("#c1f0c1");
						} else if (dailyReportFormatA03.getIhhlCoveragePercent() == 100.00) {
							cellBg = WebColors.getRGBColor("#6fdc6f");
						}
						cell = new PdfPCell(new Phrase(String.valueOf(i), cellFont));
						cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
						cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						cell.setMinimumHeight(17f);
						cell.setBackgroundColor(cellBg);
						table.addCell(cell);
						String parentName = "";
						String grandParentName = "";
						/**
						 * getting parentName and grandParentName based on areaLevelId 
						 */
						if (areaLevel == null && dailyReportFormatA03.getParentAreaId() != null) {
							if (forAreaId == 5) {
								Integer pp = areaMap.get(dailyReportFormatA03.getParentAreaId()).getParentAreaId();
								grandParentName = areaMap.get(pp).getAreaName().toUpperCase();
								parentName = areaMap.get(dailyReportFormatA03.getParentAreaId()).getAreaName()
										.toUpperCase();
							}
							if (forAreaId == 4) {
								parentName = areaMap.get(dailyReportFormatA03.getParentAreaId()).getAreaName()
										.toUpperCase();
							}
							if (dailyReportFormatA03.getAreaLevelId() == 4) {
								parentName = areaMap.get(dailyReportFormatA03.getParentAreaId()).getAreaName()
										.toUpperCase();
							}
							if (dailyReportFormatA03.getAreaLevelId() == 5) {
								Integer pp = areaMap.get(dailyReportFormatA03.getParentAreaId()).getParentAreaId();
								if (pp != 18) {
									if (areaMap2.containsKey(pp)) {
										grandParentName = areaMap2.get(pp).getAreaName().toUpperCase();
									}
									if (areaMap.containsKey(dailyReportFormatA03.getParentAreaId())) {
										parentName = areaMap.get(dailyReportFormatA03.getParentAreaId()).getAreaName()
												.toUpperCase();
									}
								}
							}
						} else if (areaLevel != null && areaLevel == 5) {
							if (areaMap.containsKey(dailyReportFormatA03.getParentAreaId())) {
								Integer pp = areaMap.get(dailyReportFormatA03.getParentAreaId()).getParentAreaId();
								grandParentName = areaMap.get(pp).getAreaName().toUpperCase();
								parentName = areaMap.get(dailyReportFormatA03.getParentAreaId()).getAreaName()
										.toUpperCase();
							}
						} else {
							parentName = areaIdNameMap.get(forAreaId);
						}
						
						/**
						 * setting grandParentName
						 */
						if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5)) {
							cell = new PdfPCell(new Phrase(grandParentName, cellFont));// here set the District
							cell.setHorizontalAlignment(Element.ALIGN_LEFT);
							cell.setVerticalAlignment(Element.ALIGN_LEFT);
							cell.setMinimumHeight(17f);
							cell.setBackgroundColor(cellBg);
							table.addCell(cell);
						}
						/**
						 * setting parentName
						 */
						if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5) || forAreaId == 4
								|| blockLevel) {
							if (forAreaId != 18) {
								cell = new PdfPCell(new Phrase(parentName, cellFont));
								cell.setHorizontalAlignment(Element.ALIGN_LEFT);
								cell.setVerticalAlignment(Element.ALIGN_LEFT);
								cell.setMinimumHeight(17f);
								cell.setBackgroundColor(cellBg);
								table.addCell(cell);
							}
						}
						/**
						 * setting areaName
						 */
						cell = new PdfPCell(
								new Phrase(String.valueOf(dailyReportFormatA03.getAreaName()).toUpperCase(), cellFont));
						cell.setVerticalAlignment(Element.ALIGN_LEFT);
						cell.setHorizontalAlignment(Element.ALIGN_LEFT);
						cell.setMinimumHeight(17f);
						cell.setBackgroundColor(cellBg);
						table.addCell(cell);

						cell = new PdfPCell(new Phrase(
								String.valueOf(dailyReportFormatA03.getDetailsWithOrWithoutToilet()), cellFont));
						cell.setVerticalAlignment(Element.ALIGN_LEFT);
						cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						cell.setMinimumHeight(17f);
						cell.setBackgroundColor(cellBg);
						table.addCell(cell);

						cell = new PdfPCell(
								new Phrase(String.valueOf(dailyReportFormatA03.getCoverageHHIncludingBLS()), cellFont));
						cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
						cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						cell.setMinimumHeight(17f);
						cell.setBackgroundColor(cellBg);
						table.addCell(cell);

						cell = new PdfPCell(new Phrase(
								String.valueOf(dailyReportFormatA03.getCoverageHHBalanceUncovered()), cellFont));
						cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
						cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						cell.setMinimumHeight(17f);
						cell.setBackgroundColor(cellBg);
						table.addCell(cell);

						cell = new PdfPCell(
								new Phrase(String.valueOf(dailyReportFormatA03.getIhhlCoveragePercent()), cellFont));
						cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
						cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						cell.setMinimumHeight(17f);
						cell.setBackgroundColor(cellBg);
						table.addCell(cell);
						++i;

					}
				}
					break;
				case 2: {
					/**
					 * if there is no range input param then add total value
					 */
					if (range == null) {

						forAreaName = dailyReportFormatA03.getAreaName();
						cell = new PdfPCell(new Phrase("Total", cellFont));
						cell.setVerticalAlignment(Element.ALIGN_CENTER);
						cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						cell.setMinimumHeight(17f);
						cell.setBackgroundColor(totalBg);
						/**
						 * setting colspan of "Total" based on parentName and
						 * grandParentName added 
						 */
						if (forAreaId == 4 || blockLevel) {
							cell.setColspan(3);
						} else if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5)) {
							cell.setColspan(4);
						} else {
							cell.setColspan(2);
						}
						table.addCell(cell);

						cell = new PdfPCell(new Phrase(
								String.valueOf(dailyReportFormatA03.getDetailsWithOrWithoutToilet()), cellFont));
						cell.setPaddingLeft(5);
						cell.setVerticalAlignment(Element.ALIGN_LEFT);
						cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						cell.setMinimumHeight(17f);
						cell.setBackgroundColor(totalBg);
						table.addCell(cell);

						cell = new PdfPCell(
								new Phrase(String.valueOf(dailyReportFormatA03.getCoverageHHIncludingBLS()), cellFont));
						cell.setVerticalAlignment(Element.ALIGN_LEFT);
						cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						cell.setMinimumHeight(17f);
						cell.setBackgroundColor(totalBg);
						cell.setPaddingRight(5);
						table.addCell(cell);

						cell = new PdfPCell(new Phrase(
								String.valueOf(dailyReportFormatA03.getCoverageHHBalanceUncovered()), cellFont));
						cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
						cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						cell.setMinimumHeight(17f);
						cell.setBackgroundColor(totalBg);
						cell.setPaddingRight(5);
						table.addCell(cell);

						cell = new PdfPCell(
								new Phrase(String.valueOf(dailyReportFormatA03.getIhhlCoveragePercent()), cellFont));
						cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
						cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						cell.setMinimumHeight(17f);
						cell.setBackgroundColor(totalBg);
						cell.setPaddingRight(5);
						table.addCell(cell);
					}
					break;

				}
				}

			}
			Font boldFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD);
			Paragraph upperPara = new Paragraph(
					"Area:  " + forAreaName + "   " + areaType.toUpperCase() + "-" + "WISE PHYSICAL PROGRESS STATUS",
					boldFont);
			upperPara.setAlignment(Element.ALIGN_CENTER);
			upperPara.setSpacingAfter(10f);
			Image legend = Image.getInstance(context.getRealPath("template//images//legend.png"));
			legend.scalePercent(50);
			legend.setAlignment(legend.ALIGN_RIGHT);
			legend.setIndentationRight(50f);

			document.open();
			document.add(upperPara);
			document.add(legend);
			document.add(table);
			document.close();

			List<Area> areaList1 = (forAreaId == 2 || forAreaId == 3 || forAreaId == 4 || forAreaId == 5)
					? areaRepository.findAllByAreaLevelAreaLevelIdInOrderByAreaIdAsc(Arrays.asList(forAreaId))
					: areaRepository.findBySbmAreaId(forAreaId);
			Map<Integer, String> areaNameIdMap = new HashMap<>();
			for (Area area : areaList1) {
				areaNameIdMap.put(area.getSbmAreaId(), area.getAreaName());
			}
			/**
			 * setting pdf name based on areaName or areaLevelId
			 */
			String pdfName = "";
			if (areaNameIdMap.containsKey(forAreaId)) {
				pdfName = areaNameIdMap.get(forAreaId);
			} else if (forAreaId == 2 || forAreaId == 18) {
				pdfName = "All_District";
			} else if (forAreaId == 3) {
				pdfName = "All_Districts";
			} else if (forAreaId == 4) {
				pdfName = "All_Blocks";
			} else if (forAreaId == 5) {
				pdfName = "All_GPs";
			}
			String dir = configurableEnvironment.getProperty("report.path");
			File file = new File(dir);
			if (!file.exists())
				file.mkdirs();

			String name = pdfName + "_" + new SimpleDateFormat("ddMMyyyyHHmmssSSSSSSS").format(new Date()) + ".pdf";
			outputPath = dir + "" + name;
			OutputStream fos = new FileOutputStream(new File(outputPath));
			out.writeTo(fos);
			out.close();
			fos.close();

		} catch (DocumentException ex) {

		} catch (Exception e) {
			log.error("Action : Error while Generating Daily Physical Progess Pdf Report", e);
			e.printStackTrace();
		}

		return new Gson().toJson(outputPath);
	}

	/**
	 * separate pdf report generation for Daily Ihhl Completion
	 * 
	 * @param forAreaId can be a sbmAreaId or areaLevel
	 * @param areaLevel if present get data for all Panchayats in a block
	 * @param range if present find data within that range
	 * @param request for setting the domain that is the source of the pdf generated
	 * @return outputPath path from where the pdf will be downloaded
	 * 
	 * @author Ashutosh
	 */
	@Override
	public String genDailyIhhlCompRprt(int forAreaId, Integer areaLevel, String range, HttpServletRequest request) {
		String outputPath = null;

		List<Area> areaList = areaRepository.findBySbmAreaId(forAreaId);
		Map<Integer, Integer> areaIDParentIdMap = new HashMap<>();
		/**
		 * keeping parentAreaId against sbmAreaId in a map
		 */
		areaIDParentIdMap = areaRepository.findByAreaIdParentAreaId(forAreaId).stream()
				.collect(Collectors.toMap(Area::getSbmAreaId, Area::getParentAreaId));
		List<Area> areaList1 = (forAreaId == 2 || forAreaId == 3 || forAreaId == 4 || forAreaId == 5)
				? areaRepository.findAllByAreaLevelAreaLevelIdInOrderByAreaIdAsc(Arrays.asList(forAreaId))
				: areaRepository.findBySbmAreaId(forAreaId);
		Map<Integer, String> areaNameIdMap = new HashMap<>();
		for (Area area : areaList1) {
			areaNameIdMap.put(area.getSbmAreaId(), area.getAreaName());
		}
		Map<Integer, Integer> distStateMap = new HashMap<>();
		Map<Integer, Integer> blockDistMap = new HashMap<>();
		Map<Integer, Integer> gpBlockMap = new HashMap<>();
		String areaType = "";
		String areaHeaderName = "";
		String grandParent = "";
		String parent = "";
		boolean blockLevel = false;
		boolean gpLevel = false;
		boolean distLevel = false;
		/**
		 * setting areaType and areaHeader
		 */
		for (Area area : areaList) {
			if (area.getAreaLevel().getAreaLevelId() == 3 || forAreaId == 4) {
				areaType = "Block";
				areaHeaderName = "Block";
				distStateMap.put(area.getSbmAreaId(), area.getParentAreaId());
			} else if (area.getAreaLevel().getAreaLevelId() == 4 || forAreaId == 5) {
				blockDistMap.put(area.getSbmAreaId(), area.getParentAreaId());
				areaType = "Gram Panchayat";
				areaHeaderName = "Gram Panchayat";

			} else if (area.getAreaLevel().getAreaLevelId() == 5) {
				gpBlockMap.put(area.getSbmAreaId(), area.getParentAreaId());
				areaType = "Gram Panchayat";
				areaHeaderName = "Gram Panchayat";
				grandParent = "District";
				parent = "Block";
			} else {
				areaType = "District";
				areaHeaderName = "District";
			}
		}

		/**
		 * setting forAreaName,parent and grandParent
		 */
		String forAreaName = "";
		if (forAreaId == 4) {
			areaType = "Block";
			forAreaName = "Odisha";
			areaHeaderName = "Block";
			parent = "District";
		} else if (forAreaId == 5) {
			areaType = "Gram Panchayat";
			areaHeaderName = "Gram Panchayat";
			forAreaName = "Odisha";
			grandParent = "District";
			parent = "Block";
		} else {
			forAreaName = areaNameIdMap.get(forAreaId);
		}
		if (areaLevel != null && areaLevel == 5) {
			areaType = "Gram Panchayat";
			areaHeaderName = "Gram Panchayat";
			grandParent = "District";
			parent = "Block";
		}

		/**
		 * creating pdf document of A4 size in landscape mode
		 */
		Document document = new Document(PageSize.A4.rotate());
		ByteArrayOutputStream out = new ByteArrayOutputStream();

		String pattern = "dd-MM-yyyy";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		String reportCreatedDate = simpleDateFormat.format(new Date());
		/**
		 * setting domain name from where pdf is being generated 
		 * or setting the source of pdf generation
		 */
		String uri = request.getRequestURI();
		String domainName = request.getRequestURL().toString();
		String ctxPath = request.getContextPath();
		domainName = domainName.replaceFirst(uri, "");
		domainName += ctxPath;

		try {

			PdfWriter writer = PdfWriter.getInstance(document, out);

			document.setMargins(document.leftMargin(), document.rightMargin(), 0, document.bottomMargin());
			HeaderFooter headerFooter = new HeaderFooter(context, "Daily", reportCreatedDate, domainName);
			/**
			 * adds header and footer to each page of the pdf by calling 
			 * onStartPage() and onEndPage() of HeaderFooter class that are triggered by 
			 * page starting and page ending events of the pdf 
			 */
			writer.setPageEvent(headerFooter);

			BaseColor headerBgColor = WebColors.getRGBColor("#668cff");
			BaseColor totalBg = WebColors.getRGBColor("#e6f3ff");
			BaseColor cellBg = WebColors.getRGBColor("#ffffb3");
			Font headFont = new Font(FontFamily.HELVETICA, 11, Font.NORMAL, BaseColor.WHITE);

			Font cellFont = new Font(FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.BLACK);
			Font boldFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD);

			// Data For table2

			List<Object[]> areaListPg2 = new ArrayList<>();

			List<Object[]> dailyreportPage2Data = new ArrayList<>();
			Map<Integer, Area> areaMap = new HashMap<>();
			Map<Integer, Area> areaMap2 = new HashMap<>();
			/**
			 * Getting daily ihhl completion report data from format_a03 table 
			 * based on whether forAreaId(param to the method) sbmAreaId or areaLevelId
			 */
			if (forAreaId == 18 || forAreaId == 3 || forAreaId == 4 || forAreaId == 5 && areaLevel == null) {
				dailyreportPage2Data = formatAO3Repository.findDailyAllRptPage2Data(forAreaId);
				areaListPg2 = areaRepository.getAllAreaNameIdLevelId(forAreaId);

				if (!(forAreaId == 18))
					areaMap = areaRepository
							.findByAreaLevelAreaLevelIdIn(forAreaId == 5 ? Arrays.asList(4, 3) : Arrays.asList(3))
							.stream().collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
				if ((forAreaId == 18))
					areaMap = areaRepository.findBySbmAreaId(forAreaId).stream()
							.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
			} else if ((areaLevel == null)) {
				dailyreportPage2Data = formatAO3Repository.findDailyRptPage2Data(forAreaId);
				areaListPg2 = areaRepository.getAreaNameIdLevelId(forAreaId);
				areaMap = areaRepository.findBySbmAreaId(forAreaId).stream()
						.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
				areaMap2 = areaRepository.findByAreaLevelAreaLevelIdIn(Arrays.asList(4, 3)).stream()
						.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
			} else {
				dailyreportPage2Data = formatAO3Repository.findDailyRptPage2DataGpWise(forAreaId);
				areaListPg2 = areaRepository.getAreaNameIdLevelId(forAreaId);// gps name not coming
				areaMap = areaRepository.findAreaGPWise(forAreaId).stream()
						.collect(Collectors.toMap(Area::getSbmAreaId, v -> v));
			}
			if (areaMap.containsKey(forAreaId)) {
				if (areaMap.get(forAreaId).getAreaLevel().getAreaLevelId() == 4 || areaLevel != null) {
					gpLevel = true;
					grandParent = "District";
					parent = "Block";
				} else if (areaMap.get(forAreaId).getAreaLevel().getAreaLevelId() == 3 && areaLevel == null) {
					blockLevel = true;
					parent = "District";
				} else {
					distLevel = true;
				}
			}
			Map<Integer, String> areaIdNameMap = new HashMap<>();
			if (areaLevel == null) {
				for (Object[] obj : areaListPg2) {
					areaIdNameMap.put((Integer) obj[0], (String) obj[1]);
				}
			} else {
				for (Object[] objects : dailyreportPage2Data) {
					areaIdNameMap.put((Integer) objects[0], (String) objects[1]);
				}
			}
			/**
			 * keeping Ihhl completion report data against sbmareaID_createdData in a map
			 */
			Map<String, String> todayDailyReportPage2Map = new HashMap<>();
			for (Object[] objects : dailyreportPage2Data) {
				if (areaLevel == null) {
					todayDailyReportPage2Map.put((Integer) objects[0] + "_" + (String) objects[6],
							(Integer) objects[2] + "_" + (Integer) objects[3] + "_" + (Double) objects[4] + "_"
									+ (Integer) objects[5] + "_" + (Integer) objects[1]);
				} else {
					todayDailyReportPage2Map.put((Integer) objects[0] + "_" + (String) objects[6],
							(Integer) objects[2] + "_" + (Integer) objects[3] + "_" + (Double) objects[4] + "_"
									+ (Integer) objects[5] + "_" + (Integer) objects[7]);
				}
			}

			Map<String, String> dateValueMap = new HashMap<>();
			for (Map.Entry<String, String> entry : todayDailyReportPage2Map.entrySet()) {
				dateValueMap.put(entry.getKey().split("_")[1], entry.getKey().split("_")[1]);
			}
			List<String> dateList = new ArrayList<>();
			for (Map.Entry<String, String> entry : dateValueMap.entrySet()) {
				dateList.add(entry.getKey());
			}
			/**
			 * getting latest 2 date for which the data are being fetched 
			 */
			String latestDate = "";
			String dayBeforeLatestDate = "";
			if (dateList.get(0).compareTo(dateList.get(1)) > 0) {
				dayBeforeLatestDate = dateList.get(1);
				latestDate = dateList.get(0);
			} else if (dateList.get(0).compareTo(dateList.get(1)) < 0) {
				dayBeforeLatestDate = dateList.get(0);
				latestDate = dateList.get(1);
			}
			Map<String, String> latestDateDataMap = new HashMap<>();

			for (Map.Entry<String, String> entry : todayDailyReportPage2Map.entrySet()) {
				if (todayDailyReportPage2Map.containsKey(entry.getKey().split("_")[0] + "_" + latestDate)) {
					latestDateDataMap.put(entry.getKey().split("_")[0] + "_" + latestDate, entry.getValue());
				}
			}

			PdfPTable table2;
			/**
			 * getting dynamicColnos of the pdf table based on the arealevelId
			 * for adding parentName and grandParentName of the requestArea
			 * example for an area which is a gram panchayat we need to add block 
			 * it belongs to as parentName and 
			 * district name as grandParentName  
			 */
			int dynamicColnos = 7;
			if (forAreaId == 4 || blockLevel && areaLevel == null) {
				dynamicColnos = dynamicColnos + 1;
				table2 = new PdfPTable(dynamicColnos);
				float widths[] = { 15f, 35f, 40f, 30f, 25f, 25f, 35f, 18f };
				table2.setWidths(widths);
				table2.setWidthPercentage(100f);
			} else if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5)) {
				dynamicColnos = dynamicColnos + 2;
				table2 = new PdfPTable(dynamicColnos);
				float widths[] = { 18f, 35f, 40f, 50f, 35f, 25f, 25f, 35f, 18f };
				table2.setWidths(widths);
				table2.setWidthPercentage(100f);
			} else {
				table2 = new PdfPTable(dynamicColnos);
				float widths[] = { 12f, 35f, 35f, 25f, 25f, 35f, 18f };
				table2.setWidths(widths);
				table2.setWidthPercentage(100f);
			}

			PdfPCell hcell2;

			hcell2 = new PdfPCell(new Phrase("Sl. No.", headFont));
			hcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell2.setMinimumHeight(50f);
			hcell2.setBackgroundColor(headerBgColor);
			table2.addCell(hcell2);

			/**
			 * adding grandParent Header
			 */
			if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5)) {
				hcell2 = new PdfPCell(new Phrase(grandParent, headFont));// here set the District
				hcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
				hcell2.setMinimumHeight(50f);
				hcell2.setBackgroundColor(headerBgColor);
				table2.addCell(hcell2);
			}
			/**
			 * adding parent Header
			 */
			if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5) || forAreaId == 4 || blockLevel) {
				hcell2 = new PdfPCell(new Phrase(parent, headFont));
				hcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
				hcell2.setMinimumHeight(50f);
				hcell2.setBackgroundColor(headerBgColor);
				table2.addCell(hcell2);
			}
			/**
			 * setting areaHeader
			 */
			hcell2 = new PdfPCell(new Phrase(areaHeaderName, headFont));
			hcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell2.setMinimumHeight(50f);
			hcell2.setBackgroundColor(headerBgColor);
			table2.addCell(hcell2);

			SimpleDateFormat dtfomat = new SimpleDateFormat("dd-MMMM");
			Date asOnDate = new Date();
			try {
				asOnDate = new SimpleDateFormat("dd-MM-yyyy").parse(dayBeforeLatestDate);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			String dateBalIHHL = dtfomat.format(asOnDate);
			hcell2 = new PdfPCell(new Phrase("IHHL Progress On " + dateBalIHHL, headFont));
			hcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell2.setMinimumHeight(50f);
			hcell2.setBackgroundColor(headerBgColor);
			table2.addCell(hcell2);

			hcell2 = new PdfPCell(new Phrase("Balance IHHLs", headFont));
			hcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell2.setMinimumHeight(50f);
			hcell2.setBackgroundColor(headerBgColor);
			table2.addCell(hcell2);

			hcell2 = new PdfPCell(new Phrase("Reqd Rate of Const per day", headFont));
			hcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell2.setMinimumHeight(50f);
			hcell2.setBackgroundColor(headerBgColor);
			table2.addCell(hcell2);

			hcell2 = new PdfPCell(new Phrase("%age Achievement against Reqd Rate of Const", headFont));
			hcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell2.setMinimumHeight(50f);
			hcell2.setBackgroundColor(headerBgColor);
			table2.addCell(hcell2);

			hcell2 = new PdfPCell(new Phrase("Deficit", headFont));
			hcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell2.setMinimumHeight(50f);
			hcell2.setBackgroundColor(headerBgColor);
			table2.addCell(hcell2);
			table2.setHeaderRows(1);
			table2.setHeadersInEvent(true);
			/**
			 * Adding Column numbers as headers below the first row of headers
			 * which depends on the dynamicColnos
			 */
			for (int colnos = 1; colnos <= dynamicColnos; colnos++) {
				hcell2 = new PdfPCell(new Phrase(String.valueOf(colnos), headFont));
				hcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell2.setBackgroundColor(headerBgColor);
				table2.addCell(hcell2);
				table2.setHeaderRows(2);
			}

			int cellNoTb2 = 1;

			PdfPCell cell2;

			Map<Integer, Float> sortedAchiveAgnsRRConsMap = new LinkedHashMap<>();
			Map<Integer, Float> sortedAchiveAgnsRRConsMap2 = new LinkedHashMap<>();
			Map<Integer, String> areaIdValuesMap = new HashMap<>();
			Map<Integer, String> areaIdValuesMap2 = new HashMap<>();
			for (Object[] objects : dailyreportPage2Data) {
				
				/**
				 * keeping the latest date data in latestDataString
				 * and the second lasted date data in dayBeforeLatestData string
				 */
				String latestDataString = todayDailyReportPage2Map.get(objects[0] + "_" + latestDate);
				String dayBeforeLatestData = todayDailyReportPage2Map.get(objects[0] + "_" + dayBeforeLatestDate);
				if (latestDateDataMap.containsKey(objects[0] + "_" + latestDate)) {
					String areaName = String.valueOf(areaIdNameMap.get(objects[0]));
					int IHHlProgress = Integer.parseInt(latestDataString.split("_")[0]);
					int balIHHLs = Integer.parseInt(latestDataString.split("_")[1]);
					int area_level = Integer.parseInt(latestDataString.split("_")[4]);
					String rrCons = "";
					float reqdRateOfCons = 0.00f;
					/**
					 * set required rate of Construction as "-" if required rate of Construction is null
					 */
					if (!(dayBeforeLatestData.split("_")[2]).equals("null")
							&& !(dayBeforeLatestData.split("_")[2]).equals("")) {
						reqdRateOfCons = Float.parseFloat(dayBeforeLatestData.split("_")[2]);
						if (reqdRateOfCons > 0.00f && reqdRateOfCons <= 1.00f) {
							reqdRateOfCons = 1.00f;
						} else {
							reqdRateOfCons = Math.round(reqdRateOfCons);
						}
						rrCons = String.valueOf(Math.round(reqdRateOfCons));
					} else {
						rrCons = "-";
					}
					DecimalFormat df = new DecimalFormat("##.##%");
					String achiveAgnsRRCons = "";
					float perAchiveAgnstRateOfCons = 0.00f;
					/**
					 * setting percentage Achievement against Required Rate of construction
					 * set achiveAgnsRRCons to "-" if Required rate of constrction is either null or 0.00f
					 */
					if (reqdRateOfCons != 0.00f && !(dayBeforeLatestData.split("_")[2]).equals("null")) {
						perAchiveAgnstRateOfCons = (float) IHHlProgress / reqdRateOfCons;
						achiveAgnsRRCons = df.format(perAchiveAgnstRateOfCons);
					} else {
						achiveAgnsRRCons = "-";
					}
					int deficitValue = Integer.parseInt(latestDataString.split("_")[3]);
					String deficitVal = (deficitValue == 0) ? "-" : String.valueOf(deficitValue);
					latestDateDataMap.remove(objects[0] + "_" + latestDate);
					
					/**
					 * keeping Ihhl completion data in two map 
					 * one if achiveAgnsRRCons is not "-" and
					 * another map if achiveAgnsRRCons is "-"
					 */
					if (!achiveAgnsRRCons.equals("-")) {
						areaIdValuesMap.put((Integer) objects[0], areaName + "_" + IHHlProgress + "_" + balIHHLs + "_"
								+ rrCons + "_" + achiveAgnsRRCons + "_" + deficitVal + "_" + area_level);
					} else {
						areaIdValuesMap2.put((Integer) objects[0], areaName + "_" + IHHlProgress + "_" + balIHHLs + "_"
								+ rrCons + "_" + achiveAgnsRRCons + "_" + deficitVal + "_" + area_level);
					}
					if (!achiveAgnsRRCons.equals("-")) {
						sortedAchiveAgnsRRConsMap.put((Integer) objects[0], perAchiveAgnstRateOfCons);
					} else {
						sortedAchiveAgnsRRConsMap2.put((Integer) objects[0], perAchiveAgnstRateOfCons);
					}
					latestDateDataMap.remove(objects[0] + "_" + latestDate);
				}
			}
			/**
			 * sorting areawise ihhl completion data based on achiveAgnsRRCons 
			 */
			Map<Integer, Float> sortByPerAchiveRRMap = sortedAchiveAgnsRRConsMap.entrySet().stream()
					.sorted(Map.Entry.comparingByValue()).collect(Collectors.toMap(Map.Entry::getKey,
							Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
			Map<Integer, Float> sortByPerAchiveRRMap2 = sortedAchiveAgnsRRConsMap2.entrySet().stream()
					.sorted(Map.Entry.comparingByValue()).collect(Collectors.toMap(Map.Entry::getKey,
							Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
			// Double lowerLimit=0.00;
			// Double upperLimit=2000.00;
			// if(range != null ) {
			//
			// lowerLimit=Double.valueOf(range.split("-")[0]);
			// upperLimit=Double.valueOf(range.split("-")[1]);
			// if(upperLimit<=lowerLimit) {
			// lowerLimit=lowerLimit+upperLimit;
			// upperLimit=lowerLimit-upperLimit;
			// lowerLimit=lowerLimit-upperLimit;
			// }
			//
			// }
			/**
			 * iterating over map where achiveAgnsRRCons is not "-"
			 */
			for (Map.Entry<Integer, Float> entry : sortByPerAchiveRRMap.entrySet()) {

				String perAchiveRR = (areaIdValuesMap.get(entry.getKey()).split("_")[4]).replace("%", "").trim();
				double perAchiveR = !Double.isNaN(entry.getValue()) || !entry.getValue().equals(null)
						? entry.getValue() * 100
						: Double.NaN;
				/**
				 * setting row color codes in pdf table based on ranges of achiveAgnsRRCons
				 */
				if (Double.isNaN(perAchiveR) || perAchiveRR.equals("-")) {
					cellBg = WebColors.getRGBColor("#6fdc6f");
				} else if (perAchiveR <= 50.00) {
					cellBg = WebColors.getRGBColor("#ffb3b3");
				} else if (perAchiveR > 50.00 && perAchiveR <= 79.99) {
					cellBg = WebColors.getRGBColor("#ffd9b3");
				} else if (perAchiveR >= 80.00 && perAchiveR <= 99.99) {
					cellBg = WebColors.getRGBColor("#c1f0c1");
				} else if (perAchiveR >= 100.00) {
					cellBg = WebColors.getRGBColor("#6fdc6f");
				}
				if (entry.getKey() != forAreaId && entry.getKey() != 18) {
					/**
					 *  setting slno
					 */
					cell2 = new PdfPCell(new Phrase(String.valueOf(cellNoTb2), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);
					String parentName = "";
					String grandParentName = "";
					/**
					 * getting parentAreaName and grandParentAreaName
					 */
					if (areaLevel == null && areaMap.get(areaIDParentIdMap.get(entry.getKey())) != null) {
						if (forAreaId == 5) {
							Integer pp = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getParentAreaId();
							grandParentName = areaMap.get(pp).getAreaName().toUpperCase();
							parentName = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName().toUpperCase();
						}
						if (forAreaId == 4) {
							if (areaIDParentIdMap.containsKey(entry.getKey())) {
								parentName = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName()
										.toUpperCase();
							}
						}
						int aLevel = Integer.parseInt(areaIdValuesMap.get(entry.getKey()).split("_")[6]);
						if (aLevel == 4 && areaIDParentIdMap.get(entry.getKey()) != 18) {
							if (areaIDParentIdMap.containsKey(entry.getKey())) {
								if (areaMap2.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
									parentName = areaMap2.get(areaIDParentIdMap.get(entry.getKey())).getAreaName()
											.toUpperCase();
								}
							}
						}

						if (aLevel == 5) {
							if (areaMap2.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
								Integer pp = areaMap2.get(areaIDParentIdMap.get(entry.getKey())).getParentAreaId();
								if (pp != 18) {
									if (areaMap2.containsKey(pp)) {
										grandParentName = areaMap2.get(pp).getAreaName().toUpperCase();
									}
									if (areaMap.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
										parentName = areaMap2.get(areaIDParentIdMap.get(entry.getKey())).getAreaName()
												.toUpperCase();
									}
								}
							}
						}
					} else if (areaLevel != null && areaLevel == 5) {
						if (areaMap.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
							Integer pp = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getParentAreaId();
							grandParentName = areaMap.get(pp).getAreaName().toUpperCase();
							parentName = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName().toUpperCase();
						}
					} else {
						parentName = areaIdNameMap.get(forAreaId);
					}
					/**
					 *  setting areaName
					 */
					if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5)) {
						cell2 = new PdfPCell(new Phrase(grandParentName, cellFont));// here set the District
						cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
						cell2.setVerticalAlignment(Element.ALIGN_LEFT);
						cell2.setMinimumHeight(17f);
						cell2.setBackgroundColor(cellBg);
						table2.addCell(cell2);
					}
					if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5) || forAreaId == 4
							|| blockLevel) {
						if (forAreaId != 18) {
							cell2 = new PdfPCell(new Phrase(parentName, cellFont));
							cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
							cell2.setVerticalAlignment(Element.ALIGN_LEFT);
							cell2.setMinimumHeight(17f);
							cell2.setBackgroundColor(cellBg);
							table2.addCell(cell2);
						}
					}
					cell2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdNameMap.get(entry.getKey())).toUpperCase(), cellFont));
					cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
					cell2.setVerticalAlignment(Element.ALIGN_LEFT);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);
					/**
					 *  setting IHHL Progress
					 */
					int IHHlProgress = Integer.parseInt(areaIdValuesMap.get(entry.getKey()).split("_")[1]);
					cell2 = new PdfPCell(new Phrase(String.valueOf(IHHlProgress), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_LEFT);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);
					/**
					 *  setting Balance IHHLs
					 */
					cell2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[2]), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);
					/**
					 *  setting required Rate of construction day before latest
					 */
					cell2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[3]), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);
					/**
					 * setting %age achievement against reqd rate of cons
					 * (IHHL progress)/(Reqd. Rate Of Construction)
					 */
					cell2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[4]), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);

					/**
					 *  setting deficit if deficit is surplus then set hypen else set the value
					 */
					cell2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[5]), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);

					++cellNoTb2;
				}
			}
			/**
			 * iterating map containing area for which percentageAchiveAganstRR is "-"
			 */
			for (Map.Entry<Integer, Float> entry : sortByPerAchiveRRMap2.entrySet()) {
				String perAchiveRR = (areaIdValuesMap2.get(entry.getKey()).split("_")[4]).replace("%", "").trim();
				double perAchiveR = !Double.isNaN(entry.getValue()) || !entry.getValue().equals(null)
						? entry.getValue() * 100
						: Double.NaN;
				
				/**
				 * setting background color of row of pdf table based on the value
				 * of percentageAchiveAganstRR 
				 */
				if (Double.isNaN(perAchiveR) || perAchiveRR.equals("-")) {
					cellBg = WebColors.getRGBColor("#6fdc6f");
				} else if (perAchiveR <= 50.00) {
					cellBg = WebColors.getRGBColor("#ffb3b3");
				} else if (perAchiveR > 50.00 && perAchiveR <= 79.99) {
					cellBg = WebColors.getRGBColor("#ffd9b3");
				} else if (perAchiveR >= 80.00 && perAchiveR <= 99.99) {
					cellBg = WebColors.getRGBColor("#c1f0c1");
				} else if (perAchiveR >= 100.00) {
					cellBg = WebColors.getRGBColor("#6fdc6f");
				}
				if (entry.getKey() != forAreaId && entry.getKey() != 18) {
					/**
					 *  setting slno
					 */
					cell2 = new PdfPCell(new Phrase(String.valueOf(cellNoTb2), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);
					String parentName = "";
					String grandParentName = "";
					/**
					 * getting parentName and grandParentName based on areaLevelId
					 */
					if (areaLevel == null && areaMap.get(areaIDParentIdMap.get(entry.getKey())) != null) {
						if (forAreaId == 5) {
							Integer pp = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getParentAreaId();
							grandParentName = areaMap.get(pp).getAreaName().toUpperCase();
							parentName = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName().toUpperCase();
						}
						if (forAreaId == 4) {
							parentName = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName().toUpperCase();
						}
						int aLevel = Integer.parseInt(areaIdValuesMap2.get(entry.getKey()).split("_")[6]);
						if (aLevel == 4 && areaIDParentIdMap.get(entry.getKey()) != 18) {
							if (areaIDParentIdMap.containsKey(entry.getKey())) {
								if (areaMap2.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
									parentName = areaMap2.get(areaIDParentIdMap.get(entry.getKey())).getAreaName()
											.toUpperCase();
								}
							}
						}

						if (aLevel == 5) {
							if (areaMap2.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
								Integer pp = areaMap2.get(areaIDParentIdMap.get(entry.getKey())).getParentAreaId();
								if (pp != 18) {
									if (areaMap2.containsKey(pp)) {
										grandParentName = areaMap2.get(pp).getAreaName().toUpperCase();
									}
									if (areaMap.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
										parentName = areaMap2.get(areaIDParentIdMap.get(entry.getKey())).getAreaName()
												.toUpperCase();
									}
								}
							}
						}
					} else if (areaLevel != null && areaLevel == 5) {
						if (areaMap.containsKey(areaIDParentIdMap.get(entry.getKey()))) {
							Integer pp = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getParentAreaId();
							grandParentName = areaMap.get(pp).getAreaName().toUpperCase();
							parentName = areaMap.get(areaIDParentIdMap.get(entry.getKey())).getAreaName().toUpperCase();
						}
					} else {
						parentName = areaIdNameMap.get(forAreaId);
					}
					/**
					 * setting grandParentName
					 */
					if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5)) {
						cell2 = new PdfPCell(new Phrase(grandParentName, cellFont));// here set the District
						cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
						cell2.setVerticalAlignment(Element.ALIGN_LEFT);
						cell2.setMinimumHeight(17f);
						cell2.setBackgroundColor(cellBg);
						table2.addCell(cell2);
					}
					/**
					 * setting parentAreaName
					 */
					if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5) || forAreaId == 4
							|| blockLevel) {
						if (forAreaId != 18) {
							cell2 = new PdfPCell(new Phrase(parentName, cellFont));
							cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
							cell2.setVerticalAlignment(Element.ALIGN_LEFT);
							cell2.setMinimumHeight(17f);
							cell2.setBackgroundColor(cellBg);
							table2.addCell(cell2);
						}
					}
					/**
					 *  setting areaName
					 */
					cell2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdNameMap.get(entry.getKey())).toUpperCase(), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_LEFT);
					cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);
					/**
					 *  setting IHHL Progress
					 */
					int IHHlProgress = Integer.parseInt(areaIdValuesMap2.get(entry.getKey()).split("_")[1]);
					cell2 = new PdfPCell(new Phrase(String.valueOf(IHHlProgress), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_LEFT);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);
					/**
					 *  setting Balance IHHLs
					 */
					cell2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap2.get(entry.getKey()).split("_")[2]), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);
					/**
					 *  setting required Rate of construction day before latest
					 */
					cell2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap2.get(entry.getKey()).split("_")[3]), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);
					/**
					 *  setting %age achievement against reqd rate of cons
					 *  (IHHL progress)/(Reqd. Rate Of Construction)
					 */
					cell2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap2.get(entry.getKey()).split("_")[4]), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);

					/**
					 *  setting deficit if deficit is surplus then set hypen else set the value
					 */
					cell2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap2.get(entry.getKey()).split("_")[5]), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(cellBg);
					table2.addCell(cell2);

					++cellNoTb2;
				}
				if (entry.getKey() == forAreaId || entry.getKey() == 18) {
					sortByPerAchiveRRMap.put(entry.getKey(), entry.getValue());
					areaIdValuesMap.put(entry.getKey(), areaIdValuesMap2.get(entry.getKey()));
				}
			}
			// }
			PdfPCell cellT2;
			for (Map.Entry<Integer, Float> entry : sortByPerAchiveRRMap.entrySet()) {
				if (entry.getKey() == forAreaId || entry.getKey() == 18) {
					/**
					 *  setting Total
					 */
					cell2 = new PdfPCell(new Phrase(String.valueOf("Total "), cellFont));
					cell2.setVerticalAlignment(Element.ALIGN_CENTER);
					cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell2.setMinimumHeight(17f);
					cell2.setBackgroundColor(totalBg);
					/**
					 * setting colspan of last row of the table as number of columns 
					 * varies based on the areaLevelId
					 */
					if (forAreaId == 4 || blockLevel) {
						cell2.setColspan(3);
					} else if (forAreaId == 5 || gpLevel || (areaLevel != null && areaLevel == 5)) {
						cell2.setColspan(4);
					} else {
						cell2.setColspan(2);
					}
					table2.addCell(cell2);
					/**
					 *  setting IHHL Progress
					 */
					cellT2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[1]), cellFont));
					cellT2.setVerticalAlignment(Element.ALIGN_LEFT);
					cellT2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cellT2.setMinimumHeight(17f);
					cellT2.setBackgroundColor(totalBg);
					table2.addCell(cellT2);
					/**
					 *  setting Balance IHHLs
					 */
					cellT2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[2]), cellFont));
					cellT2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cellT2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cellT2.setMinimumHeight(17f);
					cellT2.setBackgroundColor(totalBg);
					table2.addCell(cellT2);
					/**
					 *  setting required Rate of construction day before latest
					 */
					cellT2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[3]), cellFont));
					cellT2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cellT2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cellT2.setMinimumHeight(17f);
					cellT2.setBackgroundColor(totalBg);
					table2.addCell(cellT2);
					/**
					 *  setting %age achievement against reqd rate of cons
					 *  (IHHL progress)/(Reqd. Rate Of Construction)
					 */
					cellT2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[4]), cellFont));
					cellT2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cellT2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cellT2.setMinimumHeight(17f);
					cellT2.setBackgroundColor(totalBg);
					table2.addCell(cellT2);

					/**
					 *  setting deficit if deficit is surplus then set hypen else set the value
					 */

					cellT2 = new PdfPCell(
							new Phrase(String.valueOf(areaIdValuesMap.get(entry.getKey()).split("_")[5]), cellFont));
					cellT2.setVerticalAlignment(Element.ALIGN_MIDDLE);
					cellT2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cellT2.setMinimumHeight(17f);
					cellT2.setBackgroundColor(totalBg);
					table2.addCell(cellT2);
				}
			}

			Paragraph upperPara = new Paragraph(
					"Area:  " + forAreaName + "   " + areaType.toUpperCase() + "-" + "WISE PHYSICAL PROGRESS STATUS",
					boldFont);
			upperPara.setAlignment(Element.ALIGN_CENTER);
			upperPara.setSpacingAfter(10f);
			upperPara.setAlignment(Element.ALIGN_CENTER);
			upperPara.setSpacingAfter(10f);
			Image legend = Image.getInstance(context.getRealPath("template//images//legend.png"));
			legend.scalePercent(50);
			legend.setAlignment(legend.ALIGN_RIGHT);
			legend.setIndentationRight(50f);

			Paragraph upperPara2 = new Paragraph("Area:  " + forAreaName + "   " + "TODAY’S IHHL COMPLETION "
					+ areaType.toUpperCase() + "WISE" + "\n" + "(AS PER IMIS)", boldFont);
			upperPara2.setAlignment(Element.ALIGN_CENTER);
			upperPara2.setSpacingAfter(10f);

			document.open();
			document.add(upperPara2);
			document.add(legend);
			document.add(table2);
			document.close();
			
			/**
			 * setting name of the pdf 
			 */
			String pdfName = "";
			if (areaNameIdMap.containsKey(forAreaId)) {
				pdfName = areaNameIdMap.get(forAreaId);
			} else if (forAreaId == 2 || forAreaId == 18) {
				pdfName = "All_District";
			} else if (forAreaId == 3) {
				pdfName = "All_Districts";
			} else if (forAreaId == 4) {
				pdfName = "All_Blocks";
			} else if (forAreaId == 5) {
				pdfName = "All_GPs";
			}
			String dir = configurableEnvironment.getProperty("report.path");
			File file = new File(dir);
			if (!file.exists())
				file.mkdirs();

			String name = pdfName + "_" + new SimpleDateFormat("ddMMyyyyHHmmssSSSSSSS").format(new Date()) + ".pdf";
			outputPath = dir + "" + name;
			OutputStream fos = new FileOutputStream(new File(outputPath));
			out.writeTo(fos);
			out.close();
			fos.close();
		} catch (DocumentException ex) {
			log.error("Action : Error while Generating Daily Ihhl Completion Pdf Report", ex);
		} catch (Exception e) {
			log.error("Action : Error while Generating Daily Ihhl Completion Pdf Report", e);
			e.printStackTrace();
		}

		return new Gson().toJson(outputPath);
	}
}
