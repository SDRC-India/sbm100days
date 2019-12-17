package com.sbm.service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.html.WebColors;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.sbm.domain.Area;
import com.sbm.domain.DistrictRanking;
import com.sbm.domain.FormatA03;
import com.sbm.domain.FormatA03Weekly;
import com.sbm.domain.FormatF28aWeekly;
import com.sbm.domain.FormatF42Weekly;
import com.sbm.domain.IhhlRawMaterialsRequirement;
import com.sbm.repository.AreaRepository;
import com.sbm.repository.DistrictRankingRepository;
import com.sbm.repository.FormatA03WeeklyRepository;
import com.sbm.repository.FormatAO3Repository;
import com.sbm.repository.FormatF28aWeeklyRepository;
import com.sbm.repository.FormatF42WeeklyRepository;
import com.sbm.repository.IhhlRawMaterialRequirementRepository;
import com.sbm.util.HeaderFooter;

import lombok.extern.slf4j.Slf4j;

/**
 * 
 * This class is responsible for rendering data for various weekly Excel report
 * and generating weekly PDF report
 * 
 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
 * 
 */
@Service
@Slf4j
public class ReportServiceImpl implements ReportService {

	@Autowired
	private IhhlRawMaterialRequirementRepository ihhlRawMaterialRequirementRepository;

	@Autowired
	private FormatA03WeeklyRepository formatA03WeeklyRepository;

	@Autowired
	private FormatF42WeeklyRepository formatF42WeeklyRepository;

	@Autowired
	private FormatF28aWeeklyRepository formatF28aWeeklyRepository;

	@Autowired
	private ServletContext context;

	@Autowired
	private AreaRepository areaRepository;

	@Autowired
	private ConfigurableEnvironment configurableEnvironment;

	@Autowired
	private FormatAO3Repository formatAO3Repository;

	@Autowired
	private DistrictRankingRepository districtRankingRepository;

	/**
	 * Generates weekly district ranking PDF
	 * 
	 * @param parentAreaId it is referred to sbmAreaId
	 * @param request      to set the domain name i.e source of the PDF generated
	 * 
	 * @return outputPath location of the PDF generated
	 * 
	 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
	 */
	@Override
	public String getWeeklyDistricRankingPdf(Integer parentAreaId, HttpServletRequest request) {

		/**
		 * Fetching area details from area table by sbmAreaId
		 */
		Area area = areaRepository.findBySbmAreaId(parentAreaId);
		String outputPath = null;
		/**
		 * Setting PDF document of A4 size in landscape mode
		 */
		Document document = new Document(PageSize.A4.rotate());
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		try {

			/**
			 * Fetching list of latest inserted data from district ranking table by passing
			 * sbmAreaId as an argument
			 */
			List<DistrictRanking> weeklyDistrictRankingList = districtRankingRepository
					.findLatestInsertedDistrictsByParentAreaId(parentAreaId);

			/**
			 * Getting the timestamp of the first index of fetched list of latest inserted
			 * data from district ranking table
			 */
			String createdDate = new SimpleDateFormat("dd-MM-yyyy")
					.format(weeklyDistrictRankingList.get(0).getCreatedDate());

			/**
			 * Getting the legend image from servlet context path and passing it as an
			 * argument to get that representation of the graphic element. Compact the image
			 * size to 50% Setting the alignment for the image to right.
			 */
			Image legend = Image.getInstance(context.getRealPath("template//images//legend.png"));
			legend.scalePercent(50);
			legend.setAlignment(legend.ALIGN_RIGHT);

			/**
			 * setting domain name from where pdf is being generated
			 */
			String uri = request.getRequestURI();
			String domainName = request.getRequestURL().toString();
			String ctxPath = request.getContextPath();
			domainName = domainName.replaceFirst(uri, "");
			domainName += ctxPath;

			/**
			 * Setting margins of the PDF. Setting the header and footer of the PDF.
			 * Compressing the PDF document to the fullest possible.
			 */
			PdfWriter writer = PdfWriter.getInstance(document, out);
			document.setMargins(document.leftMargin(), document.rightMargin(), 0, document.bottomMargin());
			HeaderFooter headerFooter = new HeaderFooter(context, "Weekly", createdDate, domainName);
			writer.setPageEvent(headerFooter);
			writer.setFullCompression();

			/**
			 * Setting font size and type. Setting the font in the heading paragraph of the
			 * PDF which illustrates area for which PDF is generated. Setting the alignment
			 * and spacing.
			 */
			Font boldFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD);
			Paragraph p = new Paragraph("Area:-" + "ODISHA" + "    " + "DISTRICT" + "-" + "WISE DISTRICT RANKING",
					boldFont);
			p.setAlignment(Element.ALIGN_CENTER);
			p.setSpacingAfter(10f);

			Font createdDateFont = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Paragraph createdDatePara = new Paragraph(
					"Created Date:" + new SimpleDateFormat("dd-MM-yyyy").format(new Date()), createdDateFont);
			createdDatePara.setAlignment(Element.ALIGN_RIGHT);
			createdDatePara.setSpacingBefore(13f);

			/**
			 * Initializing PDF table having six columns Setting alignment and width percent
			 * for the table
			 */
			PdfPTable table = new PdfPTable(6);
			table.setWidthPercentage(100f); // Width 100%
			table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);

			/**
			 * Setting width of columns of initialized PDF table
			 */
			float[] columnWidths = { 10f, 25f, 25f, 20f, 35f, 20f };
			table.setWidths(columnWidths);

			/**
			 * Setting font size and type of PDF table header,header index number and body
			 * contents
			 */
			float fntSize = 10f;
			float columnfntSize = 11f;
			Font columnFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, columnfntSize, BaseColor.WHITE);
			Font headFont = FontFactory.getFont(FontFactory.HELVETICA, fntSize);
			Font indexFont = FontFactory.getFont(FontFactory.HELVETICA, fntSize, BaseColor.WHITE);

			/**
			 * Setting the PDF table header names and add it to table instance
			 */
			table.addCell(new PdfPCell(new Phrase("Sl. No.", columnFont)));
			table.addCell(new PdfPCell(new Phrase("District", columnFont)));
			table.addCell(new PdfPCell(new Phrase("Total Score", columnFont)));
			table.addCell(new PdfPCell(new Phrase("Current Ranking", columnFont)));
			table.addCell(
					new PdfPCell(
							new Phrase(
									"Ranking As On " + (!weeklyDistrictRankingList.isEmpty()
											? weeklyDistrictRankingList.get(0).getPreviousWeekCreatedDate() != null
													? new SimpleDateFormat("dd-MM-yyyy")
															.format(weeklyDistrictRankingList.get(0)
																	.getPreviousWeekCreatedDate())
													: "Previous Week"
											: "First Time"),
									columnFont)));
			table.addCell(new PdfPCell(new Phrase("Change In Ranking", columnFont)));

			/**
			 * Setting the PDF table header index number and add it to table instance
			 */
			for (int i = 0; i < columnWidths.length; i++)
				table.addCell(new PdfPCell(new Phrase(i + 1 + "", indexFont)));

			/**
			 * Looping for header row and header index row i.e it will loop two times
			 */
			for (int i = 0; i <= 1; i++) {
				/**
				 * Setting the header row and header index row as header so that it can be seen
				 * in every page of PDF report
				 */
				table.setHeaderRows(i + 1);
				/**
				 * Getting the cells of the header row and header index row as per the loop
				 */
				PdfPCell[] cells = table.getRow(i).getCells();
				/**
				 * Setting background color,border color,horizontal alignment and fixed height
				 * of the header row and header index row as per the loop
				 */
				for (int j = 0; j < cells.length; j++) {
					cells[j].setBackgroundColor(new BaseColor(66, 114, 198));
					cells[j].setBorderColor(BaseColor.BLACK);
					cells[j].setHorizontalAlignment(Element.ALIGN_CENTER);
					if (i == 0)
						cells[j].setFixedHeight(20f);
					else
						cells[j].setFixedHeight(17f);
				}
			}

			/**
			 * Iterating list of latest inserted data from district ranking table to
			 * populate the PDF table contents
			 */
			for (int i = 0; i < weeklyDistrictRankingList.size(); i++) {

				/**
				 * Creating PDF cell instance and setting its HorizontalAlignment,BorderColor,
				 * MinimumHeight and finally adding it to table instance
				 */
				PdfPCell hcell;
				hcell = new PdfPCell(new Phrase(i + 1 + "", headFont));
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

				hcell = new PdfPCell(
						new Phrase(weeklyDistrictRankingList.get(i).getDistrictName().toUpperCase(), headFont));
				hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

				hcell = new PdfPCell(new Phrase(weeklyDistrictRankingList.get(i).getTotalScore() + "", headFont));
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

				hcell = new PdfPCell(
						new Phrase(weeklyDistrictRankingList.get(i).getCurrentWeekRanking() + "", headFont));
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

				Integer previousWeekRanking = weeklyDistrictRankingList.get(i).getPreviousWeekRanking();
				hcell = new PdfPCell(
						previousWeekRanking != null ? new PdfPCell(new Phrase(previousWeekRanking + "", headFont))
								: new PdfPCell(new Phrase("-", headFont)));
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

				Integer changeInRanking = weeklyDistrictRankingList.get(i).getChangeInRanking();
				hcell = new PdfPCell(changeInRanking != null ? new PdfPCell(new Phrase(changeInRanking + "", headFont))
						: new PdfPCell(new Phrase("-", headFont)));
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);
			}

			/**
			 * Opening the PDF document. Adding header paragraph to the document of the PDF
			 * which illustrates area for which PDF is generated. Adding the table to the
			 * document. Closing the document.
			 */
			document.open();
			document.add(p);
			document.add(table);
			document.close();

			/**
			 * Reading the properties value from application.properties file of the report
			 * location path make directory if doesn't exist
			 */
			String dir = configurableEnvironment.getProperty("report.path");
			File file = new File(dir);
			if (!file.exists())
				file.mkdirs();

			/**
			 * Getting the area name for which report is generated. Append the area name and
			 * report creation time with postfixed as .pdf Pass the resultant PDF report
			 * path as abstract pathname to OutputStream constructor. All the costly
			 * resources are closed
			 */
			String areaName = area.getAreaName();
			String name = areaName + "_" + new SimpleDateFormat("ddMMyyyyHHmmssSSSSSSS").format(new Date()) + ".pdf";
			outputPath = dir + "" + name;
			OutputStream fos = new FileOutputStream(new File(outputPath));
			out.writeTo(fos);
			out.close();
			fos.close();
		} catch (Exception e) {
			log.error("Action : Error while Generating Weekly District Ranking Pdf Report", e);
			e.printStackTrace();
		}
		return new Gson().toJson(outputPath);

	}

	/**
	 * Generates weekly physical Progress status report and weekly non performing gp
	 * report depending upon the parameter passed
	 * 
	 * @param parentAreaId        it can be referred to sbmAreaId or areaLevel
	 * @param areaLevelForAllGps  if not null then get all gps of @param
	 *                            parentAreaId
	 * @param showNonPerformingGp if not null then generate weekly non performing
	 *                            PDF report
	 * @param request             to set the domain name i.e source of the PDF
	 *                            generated
	 * 
	 * @return outputPath location of the PDF generated
	 * 
	 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
	 */
	@Override
	public String getWeeklyPdfReport(Integer parentAreaId, Integer areaLevelForAllGps, Boolean showNonPerformingGp,
			HttpServletRequest request) {

		/**
		 * Fetching area details from area table by sbmAreaId
		 */
		Area area = areaRepository.findBySbmAreaId(parentAreaId);
		String outputPath = null;

		/**
		 * Setting PDF document of A4 size in landscape mode
		 */
		Document document = new Document(PageSize.A4.rotate());
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		try {

			/**
			 * Declaring few list to populate later by customizing raw list of data
			 */
			List<FormatA03Weekly> frmtA03LatestWklyList = new ArrayList<FormatA03Weekly>();
			List<FormatA03Weekly> frmtA03LatestWklySrtedDescByPrgrsList = new ArrayList<FormatA03Weekly>();
			List<FormatA03Weekly> frmtA03LatestWklySrtedIncByCovList = new ArrayList<FormatA03Weekly>();
			FormatA03Weekly lastRow = new FormatA03Weekly();

			/**
			 * Fetching list of latest inserted data from weekly formatA03 table by passing
			 * combination of sbmAreaId/areaLevelId or sbmAreaId and areaLevelForAllGps
			 */
			List<FormatA03Weekly> dataList = areaLevelForAllGps != null
					? formatA03WeeklyRepository.findAllLatestGpsOfA03WeeklyByParentAreaId(parentAreaId)
					: parentAreaId > 5
							? formatA03WeeklyRepository.findByParentAreaIdOrderByCreatedDateDescOfAllAreas(parentAreaId)
							: formatA03WeeklyRepository.findByAreaLevelIdOrderByCreatedDateDescOfAllAreas(parentAreaId);

			/**
			 * Checking if the @param showNonPerformingGp is not null then the request is
			 * for generating weekly non performing report
			 */
			if (showNonPerformingGp != null) {
				/**
				 * Getting the domain in last index of the list of latest inserted data from
				 * weekly formatA03 table
				 */
				FormatA03Weekly lastIndexData = dataList.get(dataList.size() - 1);
				/**
				 * Removing the domain in last index of the list
				 */
				dataList.remove(dataList.get(dataList.size() - 1));
				/**
				 * Filtering the list based on Improvement and IhhlCoveragePercent Setting the
				 * left up list of domain in a new list which is declared initially
				 */
				frmtA03LatestWklyList.addAll(
						dataList.stream().filter(p -> p.getImprovment() <= 0 && p.getIhhlCoveragePercent() != 100)
								.collect(Collectors.toList()));
				/**
				 * Adding the domain in last index in the new list
				 */
				frmtA03LatestWklyList.add(lastIndexData);
			}
			/**
			 * Checking if the @param showNonPerformingGp null then the request is for
			 * generating weekly physical Progress status report
			 */
			else {
				/**
				 * Setting the list of domain in a new list which is declared initially
				 */
				frmtA03LatestWklyList.addAll(dataList);
			}

			/**
			 * Iterating the new list
			 */
			for (int i = 0; i < frmtA03LatestWklyList.size(); i++) {
				/**
				 * Checking if the current iteration is not the last iteration
				 */
				if (i != frmtA03LatestWklyList.size() - 1) {
					/**
					 * Checking if the CoveragePercent is equal to 100 then set all those domains in
					 * a list
					 */
					if (frmtA03LatestWklyList.get(i).getIhhlCoveragePercent().compareTo(new Double(100.0)) == 0)
						frmtA03LatestWklySrtedIncByCovList.add(frmtA03LatestWklyList.get(i));
					else
						/**
						 * Checking if the CoveragePercent is not equal to 100 then set all those
						 * domains in another list
						 */
						frmtA03LatestWklySrtedDescByPrgrsList.add(frmtA03LatestWklyList.get(i));
				}
				/**
				 * Checking if the current iteration is the last iteration then reassign the
				 * last index domain
				 */
				else {
					lastRow = frmtA03LatestWklyList.get(i);
				}
			}
			/**
			 * Clearing all data from already populated list. Push newly populated list to
			 * the empty list. Also push the last index domain
			 */
			frmtA03LatestWklyList.clear();
			frmtA03LatestWklyList.addAll(frmtA03LatestWklySrtedDescByPrgrsList);
			frmtA03LatestWklyList.addAll(frmtA03LatestWklySrtedIncByCovList);
			frmtA03LatestWklyList.add(lastRow);

			/**
			 * Getting the areaLevelId and timestamp of the first index domain of fetched
			 * list of latest inserted data from weekly formatA03 table
			 */
			Integer areaLevelId = frmtA03LatestWklyList.get(0).getAreaLevelId();
			String createdDate = new SimpleDateFormat("dd-MM-yyyy")
					.format(frmtA03LatestWklyList.get(0).getCreatedDate());

			/**
			 * Getting the legend image from servlet context path and passing it as an
			 * argument to get that representation of the graphic element. Compact the image
			 * size to 50% Setting the alignment for the image to right.
			 */
			Image legend = Image.getInstance(context.getRealPath("template//images//legend.png"));
			legend.scalePercent(50);
			legend.setAlignment(legend.ALIGN_RIGHT);

			/**
			 * setting domain name from where pdf is being generated
			 */
			String uri = request.getRequestURI();
			String domainName = request.getRequestURL().toString();
			String ctxPath = request.getContextPath();
			domainName = domainName.replaceFirst(uri, "");
			domainName += ctxPath;

			/**
			 * Setting margins of the PDF. Setting the header and footer of the PDF.
			 * Compressing the PDF document to the fullest possible.
			 */
			PdfWriter writer = PdfWriter.getInstance(document, out);
			document.setMargins(document.leftMargin(), document.rightMargin(), 0, document.bottomMargin());
			HeaderFooter headerFooter = new HeaderFooter(context, "Weekly", createdDate, domainName);
			writer.setPageEvent(headerFooter);
			writer.setFullCompression();

			/**
			 * Checking if the size of the list is more than one then resultant PDF will
			 * have non performing gp
			 */
			if (frmtA03LatestWklyList.size() > 1) {

				String districtName = "";
				String areaType = "";
				String parentAreaName = "";
				String immediateParentAreaName = "";
				String parentAreaType = "";
				/**
				 * Checking the areaLevelId and assigning the
				 * areaType,ParentAreaName,parentAreaType
				 */
				if (areaLevelId == 3) {
					parentAreaType = "State";
					areaType = "District";
					parentAreaName = frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getStateName();
				} else if (areaLevelId == 4) {
					parentAreaType = "District";
					areaType = "Block";
					parentAreaName = parentAreaId > 5
							? frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getDistrictName()
							: frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getStateName();
				} else if (areaLevelId == 5) {
					parentAreaType = "Block";
					areaType = "Gram Panchayat";
					parentAreaName = areaLevelForAllGps != null ? area.getAreaName()
							: parentAreaId > 5
									? frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getBlockName()
									: frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getStateName();
				}

				/**
				 * Setting font size and type. Setting the font in the heading paragraph of the
				 * PDF which illustrates area for which PDF is generated. Setting the alignment
				 * and spacing.
				 */
				Font boldFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD);
				Paragraph p = showNonPerformingGp == null
						? new Paragraph("Area:-" + parentAreaName + "    " + areaType.toUpperCase() + "-"
								+ "WISE PHYSICAL PROGRESS STATUS", boldFont)
						: new Paragraph("Area:-" + parentAreaName + "    " + "NON PERFORMING GRAM PANCHAYAT", boldFont);
				p.setAlignment(Element.ALIGN_CENTER);
				p.setSpacingAfter(10f);

				Font createdDateFont = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
				Paragraph createdDatePara = new Paragraph(
						"Created Date:" + new SimpleDateFormat("dd-MM-yyyy").format(new Date()), createdDateFont);
				createdDatePara.setAlignment(Element.ALIGN_RIGHT);
				createdDatePara.setSpacingBefore(13f);

				/**
				 * Initializing PDF table dynamically based on arealevelId Setting alignment and
				 * width percent for the table
				 */
				PdfPTable table = new PdfPTable(areaLevelId == 5 ? 9 : areaLevelId == 3 ? 7 : 8);
				table.setWidthPercentage(100f); // Width 100%
				table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);

				/**
				 * Setting width of columns of initialized PDF table dynamically based on
				 * arealevelId
				 */
				float[] columnWidths = {};
				if (areaLevelId == 5) {
					float[] columnWidth = { 10f, 25f, 30f, 30f, 18f, 17.5f, 19f, 15f, 17f };
					columnWidths = columnWidth;
					table.setWidths(columnWidths);
				} else if (areaLevelId == 3) {
					float[] columnWidth = { 10f, 30f, 18f, 17.5f, 19f, 10f, 12f };
					columnWidths = columnWidth;
					table.setWidths(columnWidths);
				} else {
					float[] columnWidth = { 10f, 30f, 30f, 14f, 13.5f, 17f, 12f, 13f };
					columnWidths = columnWidth;
					table.setWidths(columnWidths);
				}

				/**
				 * Setting font size and type of PDF table header,header index number and body
				 * contents
				 */
				float fntSize = 10f;
				float columnfntSize = 11f;
				Font columnFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, columnfntSize, BaseColor.WHITE);
				Font headFont = FontFactory.getFont(FontFactory.HELVETICA, fntSize);
				Font indexFont = FontFactory.getFont(FontFactory.HELVETICA, fntSize, BaseColor.WHITE);

				/**
				 * Setting the PDF table header names dynamically based on arealevelId and add
				 * it to table instance
				 */
				table.addCell(new PdfPCell(new Phrase("Sl. No.", columnFont)));
				if (areaLevelId == 5)
					table.addCell(new PdfPCell(new Phrase("District", columnFont)));
				if (areaLevelId != 3)
					table.addCell(new PdfPCell(new Phrase(parentAreaType, columnFont)));
				table.addCell(new PdfPCell(new Phrase(areaType, columnFont)));
				table.addCell(
						new PdfPCell(
								new Phrase(
										"Improvement Since Date "
												+ (!frmtA03LatestWklyList.isEmpty()
														? frmtA03LatestWklyList.get(0).getImprovmentSinceDate() != null
																? new SimpleDateFormat("dd-MM-yyyy")
																		.format(frmtA03LatestWklyList.get(0)
																				.getImprovmentSinceDate())
																: ""
														: "First Time"),
										columnFont)));
				table.addCell(new PdfPCell(new Phrase("Required Rate Of Construction(per week)", columnFont)));
				table.addCell(new PdfPCell(new Phrase("Progress vis-à-vis Weekly Requirement", columnFont)));
				table.addCell(new PdfPCell(new Phrase("Balance Remaining", columnFont)));
				table.addCell(new PdfPCell(new Phrase("Coverage%", columnFont)));

				/**
				 * Setting the PDF table header index number and add it to table instance
				 */
				for (int i = 0; i < columnWidths.length; i++)
					table.addCell(new PdfPCell(new Phrase(i + 1 + "", indexFont)));

				/**
				 * Looping for header row and header index row i.e it will loop two times
				 */
				for (int i = 0; i <= 1; i++) {
					/**
					 * Setting the header row and header index row as header so that it can be seen
					 * in every page of PDF report
					 */
					table.setHeaderRows(i + 1);
					/**
					 * Getting the cells of the header row and header index row as per the loop
					 */
					PdfPCell[] cells = table.getRow(i).getCells();
					/**
					 * Setting background color,border color,horizontal alignment and fixed height
					 * of the header row and header index row as per the loop
					 */
					for (int j = 0; j < cells.length; j++) {
						cells[j].setBackgroundColor(new BaseColor(66, 114, 198));
						cells[j].setBorderColor(BaseColor.BLACK);
						cells[j].setHorizontalAlignment(Element.ALIGN_CENTER);
						if (i == 0)
							cells[j].setFixedHeight(60f);
						else
							cells[j].setFixedHeight(17f);
					}
				}

				/**
				 * Iterating list of latest inserted data from weekly FormatA03 table to
				 * populate the PDF table contents
				 */
				for (int i = 0; i < frmtA03LatestWklyList.size(); i++) {
					BaseColor cellBackgroundColor = null;
					String coveragePercent = frmtA03LatestWklyList.get(i).getIhhlCoveragePercent() + "%";
					Double progressPercent = frmtA03LatestWklyList.get(i).getProgressPercent();

					/**
					 * Checking if coveragePercent is equal to 100 and current loop iteration is not
					 * last iteration then set background color as dark green
					 */
					if (coveragePercent.equals("100.0%") && i != frmtA03LatestWklyList.size() - 1) {
						cellBackgroundColor = new BaseColor(111, 220, 111);// when coverage percent is 100(dark green)
					}

					/**
					 * Checking if progressPercent is not equal to null then check the
					 * progressPercent against there threshold values to set the background color of
					 * different rows of PDF table content
					 */
					if (progressPercent != null) {
						int progressPercentZeroToFiftyComp = Double.compare(progressPercent, new Double(50.00));
						int progressPercentFiftyToEightyComp = Double.compare(progressPercent, new Double(80.00));
						int progressPercentEightyToHundredComp = Double.compare(progressPercent, new Double(100.00));

						if (progressPercentZeroToFiftyComp < 0 && !coveragePercent.equals("100.0%")
								&& i != frmtA03LatestWklyList.size() - 1)
							cellBackgroundColor = new BaseColor(255, 179, 179);// if progress percent <50(red)
						else if ((progressPercentZeroToFiftyComp >= 0 && progressPercentFiftyToEightyComp < 0)
								&& !coveragePercent.equals("100.0%") && i != frmtA03LatestWklyList.size() - 1)
							cellBackgroundColor = new BaseColor(255, 217, 179); // if progress percent 50-79.99(yellow)
						else if ((progressPercentFiftyToEightyComp >= 0 && progressPercentEightyToHundredComp < 0)
								&& !coveragePercent.equals("100.0%") && i != frmtA03LatestWklyList.size() - 1)
							cellBackgroundColor = new BaseColor(153, 230, 153); // if progress percent 80-99.99(light
																				// green)
						else if (progressPercentEightyToHundredComp >= 0 && !coveragePercent.equals("100.0%")
								&& i != frmtA03LatestWklyList.size() - 1)
							cellBackgroundColor = new BaseColor(111, 220, 111); // if progress percent 100(dark green)
					}
					String areaName = "";

					/**
					 * Checking if current iteration is the last iteration then leave districtName
					 * ,immediateParentAreaName as blank and set areaName and cellBackgroundColor
					 */
					if (i == frmtA03LatestWklyList.size() - 1) {
						districtName = "\u00A0\u00A0\u00A0";
						immediateParentAreaName = "\u00A0\u00A0\u00A0";
						areaName = "TOTAL";
						cellBackgroundColor = new BaseColor(220, 221, 231);// color of total(last row)
					}

					/**
					 * Checking if current iteration is the not the last iteration then set areaName
					 * ,immediateParentAreaName and districtName dynamically according to
					 * areaLevelId
					 */
					else {

						if (areaLevelId == 3) {
							areaName = frmtA03LatestWklyList.get(i).getDistrictName();
							immediateParentAreaName = frmtA03LatestWklyList.get(i).getStateName();
						} else if (areaLevelId == 4) {
							areaName = frmtA03LatestWklyList.get(i).getBlockName();
							immediateParentAreaName = frmtA03LatestWklyList.get(i).getDistrictName();
						} else if (areaLevelId == 5) {
							areaName = frmtA03LatestWklyList.get(i).getGpName();
							immediateParentAreaName = frmtA03LatestWklyList.get(i).getBlockName();
							districtName = frmtA03LatestWklyList.get(i).getDistrictName();
						}
					}

					/**
					 * Checking if resultant PDF is for weekly non performing gp or weekly physical
					 * progress status report
					 */
					if ((i != frmtA03LatestWklyList.size() - 1 && showNonPerformingGp != null)
							|| showNonPerformingGp == null) {

						/**
						 * Creating PDF cell instance and setting its HorizontalAlignment,BorderColor,
						 * MinimumHeight and finally adding it to table instance
						 */
						PdfPCell hcell;
						hcell = new PdfPCell(
								i != frmtA03LatestWklyList.size() - 1 ? new PdfPCell(new Phrase(i + 1 + "", headFont))
										: new PdfPCell(new Phrase("\u00A0\u00A0\u00A0", headFont)));
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setBackgroundColor(cellBackgroundColor);
						hcell.setMinimumHeight(17f);
						table.addCell(hcell);

						if (areaLevelId == 5) {
							hcell = new PdfPCell(new Phrase(districtName, headFont));
							hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
							hcell.setBorderColor(BaseColor.BLACK);
							hcell.setBackgroundColor(cellBackgroundColor);
							hcell.setMinimumHeight(17f);
							table.addCell(hcell);
						}
						if (areaLevelId != 3) {
							hcell = new PdfPCell(new Phrase(immediateParentAreaName, headFont));
							hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
							hcell.setBorderColor(BaseColor.BLACK);
							hcell.setBackgroundColor(cellBackgroundColor);
							hcell.setMinimumHeight(17f);
							table.addCell(hcell);
						}

						hcell = new PdfPCell(new Phrase(areaName, headFont));
						hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setBackgroundColor(cellBackgroundColor);
						hcell.setMinimumHeight(17f);
						table.addCell(hcell);

						Integer improvement = frmtA03LatestWklyList.get(i).getImprovment();
						hcell = new PdfPCell(improvement != null ? new PdfPCell(new Phrase(improvement + "", headFont))
								: new PdfPCell(new Phrase("-", headFont)));
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setBackgroundColor(cellBackgroundColor);
						hcell.setMinimumHeight(17f);
						table.addCell(hcell);

						Integer rRForConstructionPerWeek = frmtA03LatestWklyList.get(i).getConstructionForWeekRR();
						hcell = new PdfPCell(rRForConstructionPerWeek != null
								? new PdfPCell(new Phrase(rRForConstructionPerWeek + "", headFont))
								: new PdfPCell(new Phrase("-", headFont)));
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBackgroundColor(cellBackgroundColor);
						hcell.setMinimumHeight(17f);
						table.addCell(hcell);

						hcell = new PdfPCell(
								progressPercent != null ? new PdfPCell(new Phrase(progressPercent + "%", headFont))
										: new PdfPCell(new Phrase("-", headFont)));
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBackgroundColor(cellBackgroundColor);
						hcell.setMinimumHeight(17f);
						table.addCell(hcell);

						hcell = new PdfPCell(new PdfPCell(new Phrase(
								frmtA03LatestWklyList.get(i).getCoverageHHBalanceUncovered() + "", headFont)));
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBackgroundColor(cellBackgroundColor);
						hcell.setMinimumHeight(17f);
						table.addCell(hcell);

						hcell = new PdfPCell(new PdfPCell(new Phrase(coveragePercent, headFont)));
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBackgroundColor(cellBackgroundColor);
						hcell.setMinimumHeight(17f);
						table.addCell(hcell);

					}
				}
				/**
				 * Opening the PDF document. Adding header paragraph to the document of the PDF
				 * which illustrates area for which PDF is generated. Adding the legend to the
				 * document. Adding the table to the document. Closing the document.
				 */
				document.open();
				document.add(p);
				document.add(legend);
				document.add(table);
				document.close();
			}
			/**
			 * Checking if the size of the list is one then resultant PDF will have no PDF
			 * table but only the header,legend and footer
			 */
			else {
				/**
				 * Opening the PDF document. Adding the legend to the document. Closing the
				 * document.
				 */
				document.open();
				document.add(legend);
				document.close();
			}

			/**
			 * Reading the properties value from application.properties file of the report
			 * location path make directory if doesn't exist
			 */
			String dir = configurableEnvironment.getProperty("report.path");
			File file = new File(dir);
			if (!file.exists())
				file.mkdirs();

			/**
			 * Getting the area name for which report is generated. Append the area name and
			 * report creation time with postfixed as .pdf Pass the resultant PDF report
			 * path as abstract pathname to OutputStream constructor. All the costly
			 * resources are closed
			 */
			String areaName = parentAreaId > 5 ? area.getAreaName()
					: parentAreaId == 4 ? "All_Blocks" : parentAreaId == 5 ? "All_Gps" : "anonymous";
			String name = areaName + "_" + new SimpleDateFormat("ddMMyyyyHHmmssSSSSSSS").format(new Date()) + ".pdf";
			outputPath = dir + "" + name;
			OutputStream fos = new FileOutputStream(new File(outputPath));
			out.writeTo(fos);
			out.close();
			fos.close();
		} catch (Exception e) {
			log.error("Action : Error while Generating Weekly Physical Progress Status Pdf Report", e);
			e.printStackTrace();
		}
		return new Gson().toJson(outputPath);
	}

	/**
	 * Generates weekly JSON data for physical Progress status excel report
	 * 
	 * @param parentAreaId        it can be referred to sbmAreaId or areaLevel
	 * @param areaLevelId         if not null then get all gps of @param
	 *                            parentAreaId
	 * @param showNonPerformingGp if not null then generate weekly non performing
	 *                            PDF report
	 * 
	 * @return weeklyExcelReportList list of JSON data map
	 * 
	 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
	 */
	@Override
	public List<Map<String, String>> getWeeklyExcelReport(Integer parentAreaId, Integer areaLevelId,
			Boolean showNonPerformingGp) {

		/**
		 * Declaring few list to populate later by customizing raw list of data
		 */
		List<FormatA03Weekly> frmtA03LatestWklyListByParentId = new ArrayList<FormatA03Weekly>();
		List<Map<String, String>> weeklyExcelReportList = new ArrayList<Map<String, String>>();

		List<FormatA03Weekly> frmtA03LatestWklySrtedDescByPrgrsList = new ArrayList<FormatA03Weekly>();
		List<FormatA03Weekly> frmtA03LatestWklySrtedIncByCovList = new ArrayList<FormatA03Weekly>();
		FormatA03Weekly lastRow = new FormatA03Weekly();

		/**
		 * Fetching list of latest inserted data from weekly formatA03 table by passing
		 * combination of sbmAreaId/areaLevelId or sbmAreaId and areaLevelId
		 */
		List<FormatA03Weekly> dataList = areaLevelId != null
				? formatA03WeeklyRepository.findAllLatestGpsOfA03WeeklyByParentAreaId(parentAreaId)
				: parentAreaId > 5
						? formatA03WeeklyRepository.findByParentAreaIdOrderByCreatedDateDescOfAllAreas(parentAreaId)
						: formatA03WeeklyRepository.findByAreaLevelIdOrderByCreatedDateDescOfAllAreas(parentAreaId);

		/**
		 * Checking if the @param showNonPerformingGp is not null then the request is
		 * for generating weekly non performing JSON data
		 */
		if (showNonPerformingGp != null) {
			/**
			 * Getting the domain in last index of the list of latest inserted data from
			 * weekly formatA03 table
			 */
			FormatA03Weekly lastIndexData = dataList.get(dataList.size() - 1);
			/**
			 * Removing the domain in last index of the list
			 */
			dataList.remove(dataList.get(dataList.size() - 1));
			/**
			 * Filtering the list based on Improvement and IhhlCoveragePercent Setting the
			 * left up list of domain in a new list which is declared initially
			 */
			frmtA03LatestWklyListByParentId
					.addAll(dataList.stream().filter(p -> p.getImprovment() <= 0 && p.getIhhlCoveragePercent() != 100)
							.collect(Collectors.toList()));
			/**
			 * Adding the domain in last index in the new list
			 */
			frmtA03LatestWklyListByParentId.add(lastIndexData);
		}
		/**
		 * Checking if the @param showNonPerformingGp null then the request is for
		 * generating weekly physical Progress status JSON data
		 */
		else {
			frmtA03LatestWklyListByParentId.addAll(dataList);
		}

		/**
		 * Iterating the new list
		 */
		for (int i = 0; i < frmtA03LatestWklyListByParentId.size(); i++) {
			/**
			 * Checking if the current iteration is not the last iteration
			 */
			if (i != frmtA03LatestWklyListByParentId.size() - 1) {
				/**
				 * Checking if the CoveragePercent is equal to 100 then set all those domains in
				 * a list
				 */
				if (frmtA03LatestWklyListByParentId.get(i).getIhhlCoveragePercent().compareTo(new Double(100.0)) == 0)
					frmtA03LatestWklySrtedIncByCovList.add(frmtA03LatestWklyListByParentId.get(i));
				else
					/**
					 * Checking if the CoveragePercent is not equal to 100 then set all those
					 * domains in another list
					 */
					frmtA03LatestWklySrtedDescByPrgrsList.add(frmtA03LatestWklyListByParentId.get(i));
			}
			/**
			 * Checking if the current iteration is the last iteration then reassign the
			 * last index domain
			 */
			else {
				lastRow = frmtA03LatestWklyListByParentId.get(i);
			}
		}
		/**
		 * Clearing all data from already populated list. Push newly populated list to
		 * the empty list. Also push the last index domain
		 */
		frmtA03LatestWklyListByParentId.clear();
		frmtA03LatestWklyListByParentId.addAll(frmtA03LatestWklySrtedDescByPrgrsList);
		frmtA03LatestWklyListByParentId.addAll(frmtA03LatestWklySrtedIncByCovList);
		frmtA03LatestWklyListByParentId.add(lastRow);

		/**
		 * Checking if the size of the list is more than one then resultant JSON data
		 * will will be for non performing gp
		 */
		if (frmtA03LatestWklyListByParentId.size() > 1) {
			Integer counter = 0;
			for (FormatA03Weekly formatA03Weekly : frmtA03LatestWklyListByParentId) {
				String areaType = null;
				String areaName = null;
				String parentAreaName = null;
				String parentAreaType = null;
				String districtName = null;
				counter++;
				/**
				 * Getting the areaLevelId of the first index domain of fetched
				 */
				Integer areaLevel = frmtA03LatestWklyListByParentId.get(0).getAreaLevelId();
				/**
				 * Checking the areaLevelId and assigning the
				 * areaType,ParentAreaName,parentAreaType,areaName
				 */
				if (areaLevel == 3) {
					areaType = "District";
					parentAreaType = "State";
					areaName = formatA03Weekly.getDistrictName() != null ? formatA03Weekly.getDistrictName() : "";
					parentAreaName = formatA03Weekly.getStateName() != null ? formatA03Weekly.getStateName() : "";
				} else if (areaLevel == 4) {
					areaType = "Block";
					parentAreaType = "District";
					areaName = formatA03Weekly.getBlockName() != null ? formatA03Weekly.getBlockName() : "";
					parentAreaName = formatA03Weekly.getDistrictName() != null ? formatA03Weekly.getDistrictName() : "";
				} else if (areaLevel == 5) {
					areaType = "Gram Panchayat";
					parentAreaType = "Block";
					areaName = formatA03Weekly.getGpName() != null ? formatA03Weekly.getGpName() : "";
					parentAreaName = formatA03Weekly.getBlockName() != null ? formatA03Weekly.getBlockName() : "";
					districtName = formatA03Weekly.getDistrictName() != null ? formatA03Weekly.getDistrictName() : "";
				}
				Map<String, String> map = new LinkedHashMap<String, String>();
				/**
				 * Checking if resultant JSON is for weekly non performing gp or weekly physical
				 * progress status report
				 */
				if ((counter != frmtA03LatestWklyListByParentId.size() && showNonPerformingGp != null)
						|| showNonPerformingGp == null) {
					/**
					 * Started to populate the map and add it in a list
					 */
					map.put("Sl. No.", String.valueOf(counter));
					if (areaLevel == 5)
						map.put("District", districtName);
					if (areaLevel != 3)
						map.put(parentAreaType, parentAreaName);
					map.put(areaType, String.valueOf(areaName));
					map.put("Improvement", String.valueOf(formatA03Weekly.getImprovment()));
					map.put("Required Rate Of Construction Per Week",
							String.valueOf(formatA03Weekly.getConstructionForWeekRR() != null
									? formatA03Weekly.getConstructionForWeekRR()
									: "-"));
					map.put("Progress vis-à-vis Weekly Requirement%", String.valueOf(
							formatA03Weekly.getProgressPercent() != null ? formatA03Weekly.getProgressPercent() : "-"));
					map.put("Balance Remaining", String.valueOf(formatA03Weekly.getCoverageHHBalanceUncovered()));
					map.put("Coverage%", String.valueOf(formatA03Weekly.getIhhlCoveragePercent()));
					Double progressPercentage = formatA03Weekly.getProgressPercent();
					String coveragePercentage = formatA03Weekly.getIhhlCoveragePercent() + "%";
					/**
					 * Checking if coveragePercent is equal to 100 and current loop iteration is not
					 * last iteration then set value of the key CssClass of the map as
					 * fifthslices(dark green)
					 */
					if (coveragePercentage.equals("100.0%")
							&& counter - 1 != frmtA03LatestWklyListByParentId.size() - 1) {
						map.put("CssClass", "fifthslices");// when coverage percent is 100
					}
					/**
					 * Checking if progressPercent is not equal to null then check the
					 * progressPercent against there threshold values to set value of the key
					 * CssClass of the map
					 */
					if (progressPercentage != null) {
						int progressPercentZeroToFiftyComp = Double.compare(progressPercentage, new Double(50.00));
						int progressPercentFiftyToEightyComp = Double.compare(progressPercentage, new Double(80.00));
						int progressPercentEightyToHundredComp = Double.compare(progressPercentage, new Double(100.00));
						if (progressPercentZeroToFiftyComp < 0 && !coveragePercentage.equals("100.0%")
								&& counter - 1 != frmtA03LatestWklyListByParentId.size() - 1)
							map.put("CssClass", "firstslices");
						else if (progressPercentZeroToFiftyComp >= 0 && progressPercentFiftyToEightyComp < 0
								&& !coveragePercentage.equals("100.0%")
								&& counter - 1 != frmtA03LatestWklyListByParentId.size() - 1)
							map.put("CssClass", "secondslices");
						else if (progressPercentFiftyToEightyComp >= 0 && progressPercentEightyToHundredComp < 0
								&& !coveragePercentage.equals("100.0%")
								&& counter - 1 != frmtA03LatestWklyListByParentId.size() - 1)
							map.put("CssClass", "thirdslices");
						else if (progressPercentEightyToHundredComp >= 0 && !coveragePercentage.equals("100.0%")
								&& counter - 1 != frmtA03LatestWklyListByParentId.size() - 1)
							map.put("CssClass", "fourthslices");
					}
					/**
					 * Checking if current iteration is the last iteration then set value of the key
					 * CssClass of the map as sixthslices
					 */
					if (counter - 1 == frmtA03LatestWklyListByParentId.size() - 1) {
						map.put("CssClass", "sixthslices");// color of total(last row)
					}
					/**
					 * add the map in the list
					 */
					weeklyExcelReportList.add(map);
				}
			}
		}

		return weeklyExcelReportList;
	}

	/**
	 * Generates weekly ODF declaration PDF report
	 * 
	 * @param parentAreaId it can be referred to sbmAreaId or areaLevel
	 * @param request      to set the domain name i.e source of the PDF generated
	 * @param range        to filter the generated PDF based on the range provided
	 *                     for OdfDeclaredVillagesPercentage
	 * 
	 * @return outputPath location of the PDF generated
	 * 
	 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
	 */
	@Override
	public String getWeeklyOdfDeclarationStatusPdf(Integer parentAreaId, HttpServletRequest request, String range) {
		String outputPath = null;
		/**
		 * Setting PDF document of A4 size in landscape mode
		 */
		Document document = new Document(PageSize.A4.rotate());
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		try {
			/**
			 * Declaring a list to populate later by customizing raw list of data
			 */
			List<FormatF42Weekly> frmtF42LatestWklyList = new ArrayList<FormatF42Weekly>();
			/**
			 * Fetching all area details from area table and setting in a map
			 */
			List<Area> allArea = areaRepository.findAll();
			Map<Integer, Area> sbmAreaIdAreaDomainMap = new LinkedHashMap<Integer, Area>();
			for (Area area : allArea) {
				sbmAreaIdAreaDomainMap.put(area.getSbmAreaId(), area);
			}

			/**
			 * Fetching list of latest inserted data from FormatF42Weekly table by sbmAreaId
			 * or ArealevelId
			 */
			List<FormatF42Weekly> dataList = parentAreaId > 5
					? formatF42WeeklyRepository.findLatestOdfDeclared(parentAreaId)
					: formatF42WeeklyRepository.findLatestOdfDeclaredByAreaLevelId(parentAreaId);

			/**
			 * Getting the domain in last index of the list of latest inserted data from
			 * FormatF42Weekly table
			 */
			FormatF42Weekly lastIndexData = dataList.get(dataList.size() - 1);
			/**
			 * Removing the domain in last index of the list
			 */
			dataList.remove(dataList.get(dataList.size() - 1));
			/**
			 * Filtering the list based on OdfDeclaredVillagesPercentage and Setting the
			 * left up list of domain in a new list which is declared initially
			 */
			frmtF42LatestWklyList.addAll(dataList.stream()
					.filter(p -> p.getOdfDeclaredVillagesPercentage() >= Integer
							.parseInt(range == null ? "0" : range.split("-")[0])
							&& p.getOdfDeclaredVillagesPercentage() <= Integer
									.parseInt(range == null ? "100" : range.split("-")[1]))
					.collect(Collectors.toList()));
			/**
			 * Adding the domain in last index in the new list which is declared initially
			 */
			frmtF42LatestWklyList.add(lastIndexData);

			/**
			 * Getting the timestamp of the first index domain of fetched list of latest
			 * inserted data from FormatF42Weekly table
			 */
			String createdDate = new SimpleDateFormat("dd-MM-yyyy")
					.format(frmtF42LatestWklyList.get(0).getCreatedDate());

			/**
			 * setting domain name from where pdf is being generated
			 */
			String uri = request.getRequestURI();
			String domainName = request.getRequestURL().toString();
			String ctxPath = request.getContextPath();
			domainName = domainName.replaceFirst(uri, "");
			domainName += ctxPath;

			/**
			 * Setting margins of the PDF. Setting the header and footer of the PDF.
			 * Compressing the PDF document to the fullest possible.
			 */
			PdfWriter writer = PdfWriter.getInstance(document, out);
			document.setMargins(document.leftMargin(), document.rightMargin(), 0, document.bottomMargin());
			HeaderFooter headerFooter = new HeaderFooter(context, "Weekly", createdDate, domainName);
			writer.setPageEvent(headerFooter);
			writer.setFullCompression();

			/**
			 * Getting the legend image from servlet context path and passing it as an
			 * argument to get that representation of the graphic element. Compact the image
			 * size to 50% Setting the alignment for the image to right.
			 */
			Image legend = Image.getInstance(context.getRealPath("template//images//legend.png"));
			legend.scalePercent(50);
			legend.setAlignment(legend.ALIGN_RIGHT);

			/**
			 * Checking if the size of the list is more than one in case of range is given
			 * for filter
			 */
			if (frmtF42LatestWklyList.size() > 1) {
				/**
				 * Fetching the areaLevelId
				 */
				Integer areaLevelId = areaRepository.findBySbmAreaId(frmtF42LatestWklyList.get(0).getAreaId())
						.getAreaLevel().getAreaLevelId();

				String areaType = "";
				String parentAreaName = "";
				String immediateParentAreaName = "";
				String parentAreaType = "";

				/**
				 * Checking the areaLevelId and assigning the
				 * areaType,ParentAreaName,parentAreaType
				 */
				if (areaLevelId == 3) {
					parentAreaType = "State";
					areaType = "District";
					parentAreaName = frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getAreaName();
				} else if (areaLevelId == 4) {
					parentAreaType = "District";
					areaType = "Block";
					parentAreaName = frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getAreaName();
				} else if (areaLevelId == 5) {
					parentAreaType = "Block";
					areaType = "Gram Panchayat";
					parentAreaName = frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getAreaName();
				}

				/**
				 * Setting font size and type. Setting the font in the heading paragraph of the
				 * PDF which illustrates area for which PDF is generated. Setting the alignment
				 * and spacing.
				 */
				Font boldFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD);
				Paragraph p = new Paragraph("Area:-" + parentAreaName.toUpperCase() + "    " + areaType.toUpperCase()
						+ "-" + "ODF DECLARATION STATUS", boldFont);
				p.setAlignment(Element.ALIGN_CENTER);
				p.setSpacingAfter(10f);

				Font createdDateFont = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
				Paragraph createdDatePara = new Paragraph(
						"Created Date:" + new SimpleDateFormat("dd-MM-yyyy").format(new Date()), createdDateFont);
				createdDatePara.setAlignment(Element.ALIGN_RIGHT);
				createdDatePara.setSpacingBefore(13f);

				/**
				 * Initializing PDF table dynamically based on arealevelId Setting alignment and
				 * width percent for the table
				 */
				PdfPTable table = new PdfPTable(areaLevelId == 3 ? 7 : 8);
				table.setWidthPercentage(100); // Width 100%
				table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);

				/**
				 * Setting width of columns of initialized PDF table dynamically based on
				 * arealevelId
				 */
				float[] columnWidths = {};
				if (areaLevelId == 3) {
					float[] columnWidth = { 1f, 2.5f, 1f, 1f, 1f, 0.8f, 0.8f };
					columnWidths = columnWidth;
					table.setWidths(columnWidths);
				} else {
					float[] columnWidth = { 1f, 2.5f, 3f, 1.5f, 1.5f, 1.5f, 1.4f, 1.5f };
					columnWidths = columnWidth;
					table.setWidths(columnWidths);
				}

				/**
				 * Setting font size and type of PDF table header,header index number and body
				 * contents
				 */
				float fntSize = 10f;
				float columnfntSize = 11f;
				Font columnFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, columnfntSize, BaseColor.WHITE);
				Font headFont = FontFactory.getFont(FontFactory.HELVETICA, fntSize);
				Font indexFont = FontFactory.getFont(FontFactory.HELVETICA, fntSize, BaseColor.WHITE);

				/**
				 * Setting the PDF table header names dynamically based on arealevelId and add
				 * it to table instance
				 */
				table.addCell(new PdfPCell(new Phrase("Sl. No.", columnFont)));
				if (areaLevelId != 3)
					table.addCell(new PdfPCell(new Phrase(parentAreaType, columnFont)));
				table.addCell(new PdfPCell(new Phrase(areaType, columnFont)));
				table.addCell(new PdfPCell(new Phrase("Total Villages", columnFont)));
				table.addCell(
						new PdfPCell(
								new Phrase(
										"Odf Declared villages As on "
												+ (!frmtF42LatestWklyList.isEmpty()
														? frmtF42LatestWklyList.get(0).getImprovmentSinceDate() != null
																? new SimpleDateFormat("dd-MM-yyyy")
																		.format(frmtF42LatestWklyList.get(0)
																				.getImprovmentSinceDate())
																: ""
														: "First Time"),
										columnFont)));
				table.addCell(
						new PdfPCell(
								new Phrase(
										"Odf Declared villages As on "
												+ (!frmtF42LatestWklyList.isEmpty()
														? frmtF42LatestWklyList.get(0).getCreatedDate() != null
																? new SimpleDateFormat("dd-MM-yyyy").format(
																		frmtF42LatestWklyList.get(0).getCreatedDate())
																: ""
														: "First Time"),
										columnFont)));

				table.addCell(
						new PdfPCell(
								new Phrase(
										"Improvement Since Date "
												+ (!frmtF42LatestWklyList.isEmpty()
														? frmtF42LatestWklyList.get(0).getImprovmentSinceDate() != null
																? new SimpleDateFormat("dd-MM-yyyy")
																		.format(frmtF42LatestWklyList.get(0)
																				.getImprovmentSinceDate())
																: ""
														: "First Time"),
										columnFont)));
				table.addCell(new PdfPCell(new Phrase("Declaration%", columnFont)));

				/**
				 * Setting the PDF table header index number and add it to table instance
				 */
				for (int i = 0; i < columnWidths.length; i++)
					table.addCell(new PdfPCell(new Phrase(i + 1 + "", indexFont)));

				/**
				 * Looping for header row and header index row i.e it will loop two times
				 */
				for (int i = 0; i <= 1; i++) {
					/**
					 * Setting the header row and header index row as header so that it can be seen
					 * in every page of PDF report
					 */
					table.setHeaderRows(i + 1);
					/**
					 * Getting the cells of the header row and header index row as per the loop
					 */
					PdfPCell[] cells = table.getRow(i).getCells();
					/**
					 * Setting background color,border color,horizontal alignment and fixed height
					 * of the header row and header index row as per the loop
					 */
					for (int j = 0; j < cells.length; j++) {
						cells[j].setBackgroundColor(new BaseColor(66, 114, 198));
						cells[j].setBorderColor(BaseColor.BLACK);
						cells[j].setHorizontalAlignment(Element.ALIGN_CENTER);
						if (i == 0)
							cells[j].setFixedHeight(45f);
						else
							cells[j].setFixedHeight(17f);
					}
				}

				/**
				 * Iterating list of latest inserted data from weekly FormatF42Weekly table to
				 * populate the PDF table contents
				 */
				for (int i = 0; i < frmtF42LatestWklyList.size(); i++) {
					BaseColor cellBackgroundColor = null;

					/**
					 * Checking if declaration against there threshold values to set the background
					 * color of different rows of PDF table content
					 */
					Double declaration = frmtF42LatestWklyList.get(i).getOdfDeclaredVillagesPercentage();
					int declarationZeroToFiftyComp = Double.compare(declaration, new Double(50.00));
					int declarationFiftyToEightyComp = Double.compare(declaration, new Double(80.00));
					int declarationEightyToHundredComp = Double.compare(declaration, new Double(100.00));

					if (declarationZeroToFiftyComp < 0 && i != frmtF42LatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(255, 179, 179);// if progress percent <50(red)
					else if ((declarationZeroToFiftyComp >= 0 && declarationFiftyToEightyComp < 0)
							&& i != frmtF42LatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(255, 217, 179); // if progress percent 50-79.99(yellow)
					else if ((declarationFiftyToEightyComp >= 0 && declarationEightyToHundredComp < 0)
							&& i != frmtF42LatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(153, 230, 153); // if progress percent 80-99.99(light green)
					else if (declarationEightyToHundredComp == 0 && i != frmtF42LatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(111, 220, 111); // if progress percent 100(dark green)
					String areaName = "";

					/**
					 * Checking if current iteration is the last iteration then leave districtName
					 * ,immediateParentAreaName as blank and set areaName and cellBackgroundColor
					 */
					if (i == frmtF42LatestWklyList.size() - 1) {
						immediateParentAreaName = "\u00A0\u00A0\u00A0";
						areaName = "TOTAL";
						cellBackgroundColor = new BaseColor(220, 221, 231);// color of total(last row)
					}
					/**
					 * Checking if current iteration is the not the last iteration then set areaName
					 * ,immediateParentAreaName and districtName
					 */
					else {
						/*
						 * if (areaLevelId == 3||areaLevelId == 4||areaLevelId == 5) {
						 */
						areaName = frmtF42LatestWklyList.get(i).getAreaName();
						immediateParentAreaName = sbmAreaIdAreaDomainMap.get(
								sbmAreaIdAreaDomainMap.get(frmtF42LatestWklyList.get(i).getAreaId()).getParentAreaId())
								.getAreaName().toUpperCase();

					}

					/**
					 * Checking if resultant PDF is for weekly ODF declared or weekly ODF declared
					 * with range
					 */
					if ((i != frmtF42LatestWklyList.size() - 1 && range != null) || range == null) {
						/**
						 * Creating PDF cell instance and setting its HorizontalAlignment,BorderColor,
						 * MinimumHeight and finally adding it to table instance
						 */
						PdfPCell hcell;
						hcell = new PdfPCell(
								i != frmtF42LatestWklyList.size() - 1 ? new PdfPCell(new Phrase(i + 1 + "", headFont))
										: new PdfPCell(new Phrase("\u00A0\u00A0\u00A0", headFont)));
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setMinimumHeight(17f);
						hcell.setBackgroundColor(cellBackgroundColor);
						table.addCell(hcell);

						if (areaLevelId != 3) {
							hcell = new PdfPCell(new Phrase(immediateParentAreaName, headFont));
							hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
							hcell.setBorderColor(BaseColor.BLACK);
							hcell.setMinimumHeight(17f);
							hcell.setBackgroundColor(cellBackgroundColor);
							table.addCell(hcell);
						}

						hcell = new PdfPCell(new Phrase(areaName, headFont));
						hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setMinimumHeight(17f);
						hcell.setBackgroundColor(cellBackgroundColor);
						table.addCell(hcell);

						hcell = new PdfPCell(new PdfPCell(
								new Phrase(frmtF42LatestWklyList.get(i).getOdfDeclaredTotalVillages() + "", headFont)));
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setMinimumHeight(17f);
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBackgroundColor(cellBackgroundColor);
						table.addCell(hcell);

						Integer previousWeekOdfDeclaredTotalVillages = frmtF42LatestWklyList.get(i)
								.getOdfDeclaredVillagesOnPreviousWeek();
						hcell = new PdfPCell(previousWeekOdfDeclaredTotalVillages != null
								? new PdfPCell(new Phrase(previousWeekOdfDeclaredTotalVillages + "", headFont))
								: new PdfPCell(new Phrase("-", headFont)));
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setMinimumHeight(17f);
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBackgroundColor(cellBackgroundColor);
						table.addCell(hcell);

						hcell = new PdfPCell(new PdfPCell(new Phrase(
								frmtF42LatestWklyList.get(i).getOdfDeclaredVillagesOnCurrentWeek() + "", headFont)));
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setMinimumHeight(17f);
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBackgroundColor(cellBackgroundColor);
						table.addCell(hcell);

						Integer improvement = frmtF42LatestWklyList.get(i).getOdfDeclaredVillagesimprovment();
						hcell = new PdfPCell(improvement != null ? new PdfPCell(new Phrase(improvement + "", headFont))
								: new PdfPCell(new Phrase("-", headFont)));
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setMinimumHeight(17f);
						hcell.setBackgroundColor(cellBackgroundColor);
						table.addCell(hcell);

						hcell = new PdfPCell(declaration != null ? new PdfPCell(new Phrase(declaration + "%", headFont))
								: new PdfPCell(new Phrase("-", headFont)));
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setMinimumHeight(17f);
						hcell.setBackgroundColor(cellBackgroundColor);
						table.addCell(hcell);

					}
				}
				/**
				 * Opening the PDF document. Adding header paragraph to the document of the PDF
				 * which illustrates area for which PDF is generated. Adding the legend to the
				 * document. Adding the table to the document. Closing the document.
				 */
				document.open();
				document.add(p);
				document.add(legend);
				document.add(table);
				document.close();
			}
			/**
			 * Checking if the size of the list is one then resultant PDF will have no PDF
			 * table but only the header,legend and footer
			 */
			else {
				document.open();
				document.add(legend);
				document.close();
			}

			/**
			 * Reading the properties value from application.properties file of the report
			 * location path make directory if doesn't exist
			 */
			String dir = configurableEnvironment.getProperty("report.path");
			File file = new File(dir);
			if (!file.exists())
				file.mkdirs();

			/**
			 * Getting the area name for which report is generated. Append the area name and
			 * report creation time with postfixed as .pdf Pass the resultant PDF report
			 * path as abstract pathname to OutputStream constructor. All the costly
			 * resources are closed
			 */
			Area area = areaRepository.findBySbmAreaId(parentAreaId);
			String areaName = parentAreaId > 5 ? area.getAreaName()
					: parentAreaId == 4 ? "All_Blocks" : parentAreaId == 5 ? "All_Gps" : "anonymous";
			String name = areaName + "_" + new SimpleDateFormat("ddMMyyyyHHmmssSSSSSSS").format(new Date()) + ".pdf";
			outputPath = dir + "" + name;
			OutputStream fos = new FileOutputStream(new File(outputPath));
			out.writeTo(fos);
			out.close();
			fos.close();
		} catch (Exception e) {
			log.error("Action : Error while Generating Weekly Odf Declaration Status Pdf Report", e);
			e.printStackTrace();
		}
		return new Gson().toJson(outputPath);
	}

	/**
	 * Generates weekly ODF verification PDF report
	 * 
	 * @param parentAreaId it can be referred to sbmAreaId or areaLevel.
	 * @param request      to set the domain name i.e source of the PDF generated.
	 * @param range        to filter the generated PDF based on the range provided
	 *                     for VerifiedOdfDeclaredVillagesPercentage.
	 * 
	 * @return outputPath location of the PDF generated
	 * 
	 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
	 */
	@Override
	public String getWeeklyOdfVerificationStatusPdf(Integer parentAreaId, HttpServletRequest request, String range) {
		String outputPath = null;

		/**
		 * Setting PDF document of A4 size in landscape mode
		 */
		Document document = new Document(PageSize.A4.rotate());
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		try {
			/**
			 * Declaring a list to populate later by customizing raw list of data
			 */
			List<FormatF42Weekly> frmtF42LatestWklyList = new ArrayList<FormatF42Weekly>();
			/**
			 * Fetching all area details from area table and setting in a map
			 */
			List<Area> allArea = areaRepository.findAll();
			Map<Integer, Area> sbmAreaIdAreaDomainMap = new LinkedHashMap<Integer, Area>();
			for (Area area : allArea) {
				sbmAreaIdAreaDomainMap.put(area.getSbmAreaId(), area);
			}

			/**
			 * Fetching list of latest inserted data from FormatF42Weekly table by sbmAreaId
			 * or ArealevelId
			 */
			List<FormatF42Weekly> dataList = parentAreaId > 5
					? formatF42WeeklyRepository.findLatestOdfVerified(parentAreaId)
					: formatF42WeeklyRepository.findLatestOdfVerifiedByAreaLevelId(parentAreaId);

			/**
			 * Getting the domain in last index of the list of latest inserted data from
			 * FormatF42Weekly table
			 */
			FormatF42Weekly lastIndexData = dataList.get(dataList.size() - 1);
			/**
			 * Removing the domain in last index of the list
			 */
			dataList.remove(dataList.get(dataList.size() - 1));
			/**
			 * Filtering the list based on VerifiedOdfDeclaredVillagesPercentage and Setting
			 * the left up list of domain in a new list which is declared initially
			 */
			frmtF42LatestWklyList.addAll(dataList.stream()
					.filter(p -> p.getVerifiedOdfDeclaredVillagesPercentage() >= Integer
							.parseInt(range == null ? "0" : range.split("-")[0])
							&& p.getVerifiedOdfDeclaredVillagesPercentage() <= Integer
									.parseInt(range == null ? "100" : range.split("-")[1]))
					.collect(Collectors.toList()));
			/**
			 * Adding the domain in last index in the new list which is declared initially
			 */
			frmtF42LatestWklyList.add(lastIndexData);

			/**
			 * Getting the timestamp of the first index domain of fetched list of latest
			 * inserted data from FormatF42Weekly table
			 */
			String createdDate = new SimpleDateFormat("dd-MM-yyyy")
					.format(frmtF42LatestWklyList.get(0).getCreatedDate());

			/**
			 * setting domain name from where PDF is being generated
			 */
			String uri = request.getRequestURI();
			String domainName = request.getRequestURL().toString();
			String ctxPath = request.getContextPath();
			domainName = domainName.replaceFirst(uri, "");
			domainName += ctxPath;

			/**
			 * Setting margins of the PDF. Setting the header and footer of the PDF.
			 * Compressing the PDF document to the fullest possible.
			 */
			PdfWriter writer = PdfWriter.getInstance(document, out);
			document.setMargins(document.leftMargin(), document.rightMargin(), 0, document.bottomMargin());
			HeaderFooter headerFooter = new HeaderFooter(context, "Weekly", createdDate, domainName);
			writer.setPageEvent(headerFooter);
			writer.setFullCompression();

			/**
			 * Getting the legend image from servlet context path and passing it as an
			 * argument to get that representation of the graphic element. Compact the image
			 * size to 50%. Setting the alignment for the image to right.
			 */
			Image legend = Image.getInstance(context.getRealPath("template//images//legend.png"));
			legend.scalePercent(50);
			legend.setAlignment(legend.ALIGN_RIGHT);

			/**
			 * Checking if the size of the list is more than one in case of range is given
			 * for filter
			 */
			if (frmtF42LatestWklyList.size() > 1) {
				/**
				 * Fetching the areaLevelId
				 */
				Integer areaLevelId = areaRepository.findBySbmAreaId(frmtF42LatestWklyList.get(0).getAreaId())
						.getAreaLevel().getAreaLevelId();

				String areaType = "";
				String parentAreaName = "";
				String immediateParentAreaName = "";
				String parentAreaType = "";

				/**
				 * Checking the areaLevelId and assigning the
				 * areaType,ParentAreaName,parentAreaType
				 */
				if (areaLevelId == 3) {
					parentAreaType = "State";
					areaType = "District";
					parentAreaName = frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getAreaName();
				} else if (areaLevelId == 4) {
					parentAreaType = "District";
					areaType = "Block";
					parentAreaName = frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getAreaName();
				} else if (areaLevelId == 5) {
					parentAreaType = "Block";
					areaType = "Gram Panchayat";
					parentAreaName = frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getAreaName();
				}

				/**
				 * Setting font size and type. Setting the font in the heading paragraph of the
				 * PDF which illustrates area for which PDF is generated. Setting the alignment
				 * and spacing.
				 */
				Font boldFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD);
				Paragraph p = new Paragraph("Area:-" + parentAreaName.toUpperCase() + "    " + areaType.toUpperCase()
						+ "-" + "ODF VERIFICATION STATUS", boldFont);
				p.setAlignment(Element.ALIGN_CENTER);
				p.setSpacingAfter(10f);

				Font createdDateFont = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
				Paragraph createdDatePara = new Paragraph(
						"Created Date:" + new SimpleDateFormat("dd-MM-yyyy").format(new Date()), createdDateFont);
				createdDatePara.setAlignment(Element.ALIGN_RIGHT);
				createdDatePara.setSpacingBefore(13f);

				/**
				 * Initializing PDF table dynamically based on arealevelId Setting alignment and
				 * width percent for the table
				 */
				PdfPTable table = new PdfPTable(areaLevelId == 3 ? 7 : 8);
				table.setWidthPercentage(100); // Width 100%
				table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);

				/**
				 * Setting width of columns of initialized PDF table dynamically based on
				 * arealevelId
				 */
				float[] columnWidths = {};
				if (areaLevelId == 3) {
					float[] columnWidth = { 1f, 2.5f, 1f, 1f, 1f, 0.8f, 0.8f };
					columnWidths = columnWidth;
					table.setWidths(columnWidths);
				} else {
					float[] columnWidth = { 1f, 2.5f, 3f, 1.5f, 1.5f, 1.5f, 1.4f, 1.5f };
					columnWidths = columnWidth;
					table.setWidths(columnWidths);
				}

				/**
				 * Setting font size and type of PDF table header,header index number and body
				 * contents
				 */
				float fntSize = 10f;
				float columnfntSize = 11f;
				Font columnFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, columnfntSize, BaseColor.WHITE);
				Font headFont = FontFactory.getFont(FontFactory.HELVETICA, fntSize);
				Font indexFont = FontFactory.getFont(FontFactory.HELVETICA, fntSize, BaseColor.WHITE);

				/**
				 * Setting the PDF table header names dynamically based on arealevelId and add
				 * it to table instance
				 */
				table.addCell(new PdfPCell(new Phrase("Sl. No.", columnFont)));
				if (areaLevelId != 3)
					table.addCell(new PdfPCell(new Phrase(parentAreaType, columnFont)));
				table.addCell(new PdfPCell(new Phrase(areaType, columnFont)));
				table.addCell(new PdfPCell(new Phrase("Odf Declared Villages", columnFont)));
				table.addCell(
						new PdfPCell(
								new Phrase(
										"Odf Verified villages As on "
												+ (!frmtF42LatestWklyList.isEmpty()
														? frmtF42LatestWklyList.get(0).getImprovmentSinceDate() != null
																? new SimpleDateFormat("dd-MM-yyyy")
																		.format(frmtF42LatestWklyList.get(0)
																				.getImprovmentSinceDate())
																: ""
														: "First Time"),
										columnFont)));
				table.addCell(
						new PdfPCell(
								new Phrase(
										"Odf Verified villages As on "
												+ (!frmtF42LatestWklyList.isEmpty()
														? frmtF42LatestWklyList.get(0).getCreatedDate() != null
																? new SimpleDateFormat("dd-MM-yyyy").format(
																		frmtF42LatestWklyList.get(0).getCreatedDate())
																: ""
														: "First Time"),
										columnFont)));

				table.addCell(
						new PdfPCell(
								new Phrase(
										"Improvement Since Date "
												+ (!frmtF42LatestWklyList.isEmpty()
														? frmtF42LatestWklyList.get(0).getImprovmentSinceDate() != null
																? new SimpleDateFormat("dd-MM-yyyy")
																		.format(frmtF42LatestWklyList.get(0)
																				.getImprovmentSinceDate())
																: ""
														: "First Time"),
										columnFont)));
				table.addCell(new PdfPCell(new Phrase("Verification%", columnFont)));

				/**
				 * Setting the PDF table header index number and add it to table instance
				 */
				for (int i = 0; i < columnWidths.length; i++)
					table.addCell(new PdfPCell(new Phrase(i + 1 + "", indexFont)));

				/**
				 * Looping for header row and header index row i.e it will loop two times
				 */
				for (int i = 0; i <= 1; i++) {
					/**
					 * Setting the header row and header index row as header so that it can be seen
					 * in every page of PDF report
					 */
					table.setHeaderRows(i + 1);
					/**
					 * Getting the cells of the header row and header index row as per the loop
					 */
					PdfPCell[] cells = table.getRow(i).getCells();
					/**
					 * Setting background color,border color,horizontal alignment and fixed height
					 * of the header row and header index row as per the loop
					 */
					for (int j = 0; j < cells.length; j++) {
						cells[j].setBackgroundColor(new BaseColor(66, 114, 198));
						cells[j].setBorderColor(BaseColor.BLACK);
						cells[j].setHorizontalAlignment(Element.ALIGN_CENTER);
						if (i == 0)
							cells[j].setFixedHeight(45f);
						else
							cells[j].setFixedHeight(17f);
					}
				}

				/**
				 * Iterating list of latest inserted data from weekly FormatF42Weekly table to
				 * populate the PDF table contents
				 */
				for (int i = 0; i < frmtF42LatestWklyList.size(); i++) {
					BaseColor cellBackgroundColor = null;
					/**
					 * Checking if verification against there threshold values to set the background
					 * color of different rows of PDF table content
					 */
					Double verification = frmtF42LatestWklyList.get(i).getVerifiedOdfDeclaredVillagesPercentage();
					int verificationPercentZeroToFiftyComp = Double.compare(verification, new Double(50.00));
					int verificationPercentFiftyToEightyComp = Double.compare(verification, new Double(80.00));
					int verificationPercentEightyToHundredComp = Double.compare(verification, new Double(100.00));
					if (verificationPercentZeroToFiftyComp < 0 && i != frmtF42LatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(255, 179, 179);// if progress percent <50(red)
					else if ((verificationPercentZeroToFiftyComp >= 0 && verificationPercentFiftyToEightyComp < 0)
							&& i != frmtF42LatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(255, 217, 179); // if progress percent 50-79.99(yellow)
					else if ((verificationPercentFiftyToEightyComp >= 0 && verificationPercentEightyToHundredComp < 0)
							&& i != frmtF42LatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(153, 230, 153); // if progress percent 80-99.99(light green)
					else if (verificationPercentEightyToHundredComp == 0 && i != frmtF42LatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(111, 220, 111); // if progress percent 100(dark green)
					String areaName = "";

					/**
					 * Checking if current iteration is the last iteration then leave
					 * immediateParentAreaName as blank and set areaName and cellBackgroundColor
					 */
					if (i == frmtF42LatestWklyList.size() - 1) {
						immediateParentAreaName = "\u00A0\u00A0\u00A0";
						areaName = "TOTAL";
						cellBackgroundColor = new BaseColor(220, 221, 231);// color of total(last row)
					}

					/**
					 * Checking if current iteration is the not the last iteration then set areaName
					 * ,immediateParentAreaName
					 */
					else {
						/*
						 * if (areaLevelId == 3||areaLevelId == 4||areaLevelId == 5) {
						 */
						areaName = frmtF42LatestWklyList.get(i).getAreaName();
						immediateParentAreaName = sbmAreaIdAreaDomainMap.get(
								sbmAreaIdAreaDomainMap.get(frmtF42LatestWklyList.get(i).getAreaId()).getParentAreaId())
								.getAreaName().toUpperCase();

					}
					/**
					 * Checking if resultant PDF is for weekly ODF verified or weekly ODF verified
					 * with range
					 */
					if ((i != frmtF42LatestWklyList.size() - 1 && range != null) || range == null) {
						/**
						 * Creating PDF cell instance and setting its HorizontalAlignment,BorderColor,
						 * MinimumHeight and finally adding it to table instance
						 */
						PdfPCell hcell;
						hcell = new PdfPCell(
								i != frmtF42LatestWklyList.size() - 1 ? new PdfPCell(new Phrase(i + 1 + "", headFont))
										: new PdfPCell(new Phrase("\u00A0\u00A0\u00A0", headFont)));
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setMinimumHeight(17f);
						hcell.setBackgroundColor(cellBackgroundColor);
						table.addCell(hcell);

						if (areaLevelId != 3) {
							hcell = new PdfPCell(new Phrase(immediateParentAreaName, headFont));
							hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
							hcell.setBorderColor(BaseColor.BLACK);
							hcell.setMinimumHeight(17f);
							hcell.setBackgroundColor(cellBackgroundColor);
							table.addCell(hcell);
						}

						hcell = new PdfPCell(new Phrase(areaName, headFont));
						hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setMinimumHeight(17f);
						hcell.setBackgroundColor(cellBackgroundColor);
						table.addCell(hcell);

						hcell = new PdfPCell(new PdfPCell(new Phrase(
								frmtF42LatestWklyList.get(i).getVerifiedOdfDeclaredTotalVillages() + "", headFont)));
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setMinimumHeight(17f);
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBackgroundColor(cellBackgroundColor);
						table.addCell(hcell);

						Integer previousWeekOdfVerifiedTotalVillages = frmtF42LatestWklyList.get(i)
								.getVerifiedOdfDeclaredVillagesOnPreviousWeek();
						hcell = new PdfPCell(previousWeekOdfVerifiedTotalVillages != null
								? new PdfPCell(new Phrase(previousWeekOdfVerifiedTotalVillages + "", headFont))
								: new PdfPCell(new Phrase("-", headFont)));
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setMinimumHeight(17f);
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBackgroundColor(cellBackgroundColor);
						table.addCell(hcell);

						hcell = new PdfPCell(new PdfPCell(new Phrase(
								frmtF42LatestWklyList.get(i).getVerifiedOdfDeclaredVillagesOnCurrentWeek() + "",
								headFont)));
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setMinimumHeight(17f);
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBackgroundColor(cellBackgroundColor);
						table.addCell(hcell);

						Integer improvement = frmtF42LatestWklyList.get(i).getVerifiedOdfDeclaredVillagesimprovment();
						hcell = new PdfPCell(improvement != null ? new PdfPCell(new Phrase(improvement + "", headFont))
								: new PdfPCell(new Phrase("-", headFont)));
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setMinimumHeight(17f);
						hcell.setBackgroundColor(cellBackgroundColor);
						table.addCell(hcell);

						hcell = new PdfPCell(
								verification != null ? new PdfPCell(new Phrase(verification + "%", headFont))
										: new PdfPCell(new Phrase("-", headFont)));
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setMinimumHeight(17f);
						hcell.setBackgroundColor(cellBackgroundColor);
						table.addCell(hcell);

					}
				}
				/**
				 * Opening the PDF document. Adding header paragraph to the document of the PDF
				 * which illustrates area for which PDF is generated. Adding the legend to the
				 * document. Adding the table to the document. Closing the document.
				 */
				document.open();
				document.add(p);
				document.add(legend);
				document.add(table);
				document.close();
			}
			/**
			 * Checking if the size of the list is one then resultant PDF will have no PDF
			 * table but only the header,legend and footer
			 */
			else {
				document.open();
				document.add(legend);
				document.close();
			}

			/**
			 * Reading the properties value from application.properties file of the report
			 * location path make directory if doesn't exist
			 */
			String dir = configurableEnvironment.getProperty("report.path");
			File file = new File(dir);
			if (!file.exists())
				file.mkdirs();

			/**
			 * Getting the area name for which report is generated. Append the area name and
			 * report creation time with postfixed as .pdf Pass the resultant PDF report
			 * path as abstract pathname to OutputStream constructor. All the costly
			 * resources are closed
			 */
			Area area = areaRepository.findBySbmAreaId(parentAreaId);
			String areaName = parentAreaId > 5 ? area.getAreaName()
					: parentAreaId == 4 ? "All_Blocks" : parentAreaId == 5 ? "All_Gps" : "anonymous";
			String name = areaName + "_" + new SimpleDateFormat("ddMMyyyyHHmmssSSSSSSS").format(new Date()) + ".pdf";
			outputPath = dir + "" + name;
			OutputStream fos = new FileOutputStream(new File(outputPath));
			out.writeTo(fos);
			out.close();
			fos.close();
		} catch (Exception e) {
			log.error("Action : Error while Generating Weekly Odf Verification Status Pdf Report", e);
			e.printStackTrace();
		}
		return new Gson().toJson(outputPath);
	}

	/**
	 * Generates weekly Geotag report
	 * 
	 * @param parentAreaId it can be referred to sbmAreaId or areaLevel
	 * @param areaLevel    if not null then get all gps of @param parentAreaId
	 * @param request      to set the domain name i.e source of the PDF generated
	 * @param range        to filter the generated PDF based on the range provided
	 *                     for CurrentWeekCoveragePercent
	 * 
	 * @return outputPath location of the PDF generated
	 * 
	 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
	 */
	@Override
	public String getWeeklyGeoTagStatusPdf(Integer parentAreaId, Integer areaLevel, String range,
			HttpServletRequest request) {
		String outputPath = null;
		/**
		 * Setting PDF document of A4 size in landscape mode
		 */
		Document document = new Document(PageSize.A4.rotate());
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		try {
			/**
			 * Declaring a list to populate later by customizing raw list of data
			 */
			List<FormatF28aWeekly> frmtF28aLatestWklyList = new ArrayList<FormatF28aWeekly>();
			/**
			 * Fetching all area details from area table and setting in a map
			 */
			List<Area> allArea = areaRepository.findAll();
			Map<Integer, Area> sbmAreaIdAreaDomainMap = new LinkedHashMap<Integer, Area>();
			for (Area area : allArea) {
				sbmAreaIdAreaDomainMap.put(area.getSbmAreaId(), area);
			}

			/**
			 * Fetching list of latest inserted data from FormatF28AWeekly table by passing
			 * combination of sbmAreaId/areaLevel or sbmAreaId and areaLevel
			 */
			List<FormatF28aWeekly> dataList = areaLevel != null
					? formatF28aWeeklyRepository.findAllLatestGpsOfF28aWeeklyByParentAreaId(parentAreaId)
					: parentAreaId > 5 ? formatF28aWeeklyRepository.findLatestGeoTagByParentId(parentAreaId)
							: formatF28aWeeklyRepository.findLatestGeoTagByAreaLevelId(parentAreaId);

			/**
			 * Getting the domain in last index of the list of latest inserted data from
			 * FormatF28AWeekly table
			 */
			FormatF28aWeekly lastIndexData = dataList.get(dataList.size() - 1);
			/**
			 * Removing the domain in last index of the list
			 */
			dataList.remove(dataList.get(dataList.size() - 1));
			/**
			 * Filtering the list based on CurrentWeekCoveragePercent and Setting the left
			 * up list of domain in a new list which is declared initially
			 */
			frmtF28aLatestWklyList.addAll(dataList.stream()
					.filter(p -> p.getCurrentWeekCoveragePercent() >= Integer
							.parseInt(range == null ? "0" : range.split("-")[0])
							&& p.getCurrentWeekCoveragePercent() <= Integer
									.parseInt(range == null ? "100" : range.split("-")[1]))
					.collect(Collectors.toList()));
			/**
			 * Adding the domain in last index in the new list which is declared initially
			 */
			frmtF28aLatestWklyList.add(lastIndexData);

			/**
			 * Getting the timestamp of the first index domain of fetched list of latest
			 * inserted data from FormatF42Weekly table
			 */
			String createdDate = new SimpleDateFormat("dd-MM-yyyy")
					.format(frmtF28aLatestWklyList.get(0).getCreatedDate());

			/**
			 * setting domain name from where PDF is being generated
			 */
			String uri = request.getRequestURI();
			String domainName = request.getRequestURL().toString();
			String ctxPath = request.getContextPath();
			domainName = domainName.replaceFirst(uri, "");
			domainName += ctxPath;

			/**
			 * Setting margins of the PDF. Setting the header and footer of the PDF.
			 * Compressing the PDF document to the fullest possible.
			 */
			PdfWriter writer = PdfWriter.getInstance(document, out);
			document.setMargins(document.leftMargin(), document.rightMargin(), 0, document.bottomMargin());
			HeaderFooter headerFooter = new HeaderFooter(context, "Weekly", createdDate, domainName);
			writer.setPageEvent(headerFooter);
			writer.setFullCompression();

			/**
			 * Getting the legend image from servlet context path and passing it as an
			 * argument to get that representation of the graphic element. Compact the image
			 * size to 50% Setting the alignment for the image to right.
			 */
			Image legend = Image.getInstance(context.getRealPath("template//images//legend.png"));
			legend.scalePercent(50);
			legend.setAlignment(legend.ALIGN_RIGHT);

			/**
			 * Checking if the size of the list is more than one in case of range is given
			 * for filter
			 */
			if (frmtF28aLatestWklyList.size() > 1) {
				/**
				 * Fetching the areaLevelId
				 */
				Integer areaLevelId = areaRepository.findBySbmAreaId(frmtF28aLatestWklyList.get(0).getSbmAreaId())
						.getAreaLevel().getAreaLevelId();

				String districtName = "";
				String areaType = "";
				String parentAreaName = "";
				String immediateParentAreaName = "";
				String parentAreaType = "";

				/**
				 * Checking the areaLevelId and assigning the
				 * areaType,ParentAreaName,parentAreaType
				 */
				if (areaLevelId == 3) {
					parentAreaType = "State";
					areaType = "District";
					parentAreaName = frmtF28aLatestWklyList.get(frmtF28aLatestWklyList.size() - 1).getAreaName();
				} else if (areaLevelId == 4) {
					parentAreaType = "District";
					areaType = "Block";
					parentAreaName = frmtF28aLatestWklyList.get(frmtF28aLatestWklyList.size() - 1).getAreaName();
				} else if (areaLevelId == 5) {
					parentAreaType = "Block";
					areaType = "Gram Panchayat";
					parentAreaName = frmtF28aLatestWklyList.get(frmtF28aLatestWklyList.size() - 1).getAreaName();
				}

				/**
				 * Setting font size and type. Setting the font in the heading paragraph of the
				 * PDF which illustrates area for which PDF is generated. Setting the alignment
				 * and spacing.
				 */
				Font boldFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD);
				Paragraph p = new Paragraph("Area:-" + parentAreaName.toUpperCase() + "    " + areaType.toUpperCase()
						+ "-" + "WISE GEO-TAGGING STATUS", boldFont);
				p.setAlignment(Element.ALIGN_CENTER);
				p.setSpacingAfter(10f);

				Font createdDateFont = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
				Paragraph createdDatePara = new Paragraph(
						"Created Date:" + new SimpleDateFormat("dd-MM-yyyy").format(new Date()), createdDateFont);
				createdDatePara.setAlignment(Element.ALIGN_RIGHT);
				createdDatePara.setSpacingBefore(13f);

				/**
				 * Initializing PDF table dynamically based on arealevelId Setting alignment and
				 * width percent for the table
				 */
				PdfPTable table = new PdfPTable(areaLevelId == 5 ? 8 : areaLevelId == 3 ? 6 : 7);
				table.setWidthPercentage(100f); // Width 100%
				table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);

				/**
				 * Setting width of columns of initialized PDF table dynamically based on
				 * arealevelId
				 */
				float[] columnWidths = {};
				if (areaLevelId == 5) {
					float[] columnWidth = { 8f, 25f, 30f, 30f, 18f, 18f, 15f, 14f };
					columnWidths = columnWidth;
					table.setWidths(columnWidths);
				} else if (areaLevelId == 3) {
					float[] columnWidth = { 10f, 50f, 17f, 17f, 12f, 12f };
					columnWidths = columnWidth;
					table.setWidths(columnWidths);
				} else {
					float[] columnWidth = { 10f, 30f, 30f, 20f, 20f, 14f, 13f };
					columnWidths = columnWidth;
					table.setWidths(columnWidths);
				}

				/**
				 * Setting font size and type of PDF table header,header index number and body
				 * contents
				 */
				float fntSize = 10f;
				float columnfntSize = 11f;
				Font columnFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, columnfntSize, BaseColor.WHITE);
				Font headFont = FontFactory.getFont(FontFactory.HELVETICA, fntSize);
				Font indexFont = FontFactory.getFont(FontFactory.HELVETICA, fntSize, BaseColor.WHITE);

				/**
				 * Setting the PDF table header names dynamically based on arealevelId and add
				 * it to table instance
				 */
				table.addCell(new PdfPCell(new Phrase("Sl. No.", columnFont)));
				if (areaLevelId == 5)
					table.addCell(new PdfPCell(new Phrase("District", columnFont)));
				if (areaLevelId != 3)
					table.addCell(new PdfPCell(new Phrase(parentAreaType, columnFont)));
				table.addCell(new PdfPCell(new Phrase(areaType, columnFont)));
				table.addCell(
						new PdfPCell(
								new Phrase(
										"% Coverage as on "
												+ (!frmtF28aLatestWklyList.isEmpty()
														? frmtF28aLatestWklyList.get(0).getImprovmentSinceDate() != null
																? new SimpleDateFormat("dd-MM-yyyy")
																		.format(frmtF28aLatestWklyList.get(0)
																				.getImprovmentSinceDate())
																: ""
														: "First Time"),
										columnFont)));
				table.addCell(
						new PdfPCell(
								new Phrase(
										"% Coverage as on "
												+ (!frmtF28aLatestWklyList.isEmpty()
														? frmtF28aLatestWklyList.get(0).getCreatedDate() != null
																? new SimpleDateFormat("dd-MM-yyyy").format(
																		frmtF28aLatestWklyList.get(0).getCreatedDate())
																: ""
														: "First Time"),
										columnFont)));
				table.addCell(
						new PdfPCell(
								new Phrase(
										"Improvement Since Date "
												+ (!frmtF28aLatestWklyList.isEmpty()
														? frmtF28aLatestWklyList.get(0).getImprovmentSinceDate() != null
																? new SimpleDateFormat("dd-MM-yyyy")
																		.format(frmtF28aLatestWklyList.get(0)
																				.getImprovmentSinceDate())
																: ""
														: "First Time"),
										columnFont)));
				table.addCell(new PdfPCell(new Phrase("Balancing Remaining", columnFont)));

				/**
				 * Setting the PDF table header index number and add it to table instance
				 */
				for (int i = 0; i < columnWidths.length; i++)
					table.addCell(new PdfPCell(new Phrase(i + 1 + "", indexFont)));

				/**
				 * Looping for header row and header index row i.e it will loop two times
				 */
				for (int i = 0; i <= 1; i++) {
					/**
					 * Setting the header row and header index row as header so that it can be seen
					 * in every page of PDF report
					 */
					table.setHeaderRows(i + 1);
					/**
					 * Getting the cells of the header row and header index row as per the loop
					 */
					PdfPCell[] cells = table.getRow(i).getCells();
					/**
					 * Setting background color,border color,horizontal alignment and fixed height
					 * of the header row and header index row as per the loop
					 */
					for (int j = 0; j < cells.length; j++) {
						cells[j].setBackgroundColor(new BaseColor(66, 114, 198));
						cells[j].setBorderColor(BaseColor.BLACK);
						cells[j].setHorizontalAlignment(Element.ALIGN_CENTER);
						if (i == 0)
							cells[j].setFixedHeight(45f);
						else
							cells[j].setFixedHeight(17f);
					}
				}
				/**
				 * Iterating list of latest inserted data from weekly FormatF28AWeekly table to
				 * populate the PDF table contents
				 */
				for (int i = 0; i < frmtF28aLatestWklyList.size(); i++) {
					BaseColor cellBackgroundColor = null;
					/**
					 * Checking if currentWeekCoveragePercent against there threshold values to set
					 * the background color of different rows of PDF table content
					 */
					Double currentWeekCoveragePercent = frmtF28aLatestWklyList.get(i).getCurrentWeekCoveragePercent();
					int coveragePercentZeroToFiftyComp = Double.compare(currentWeekCoveragePercent, new Double(50.00));
					int coveragePercentFiftyToEightyComp = Double.compare(currentWeekCoveragePercent,
							new Double(80.00));
					int coveragePercentEightyToHundredComp = Double.compare(currentWeekCoveragePercent,
							new Double(100.00));

					if (coveragePercentZeroToFiftyComp < 0 && i != frmtF28aLatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(255, 179, 179);// if progress percent <50(red)
					else if ((coveragePercentZeroToFiftyComp >= 0 && coveragePercentFiftyToEightyComp < 0)
							&& i != frmtF28aLatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(255, 217, 179); // if progress percent 50-79.99(yellow)
					else if ((coveragePercentFiftyToEightyComp >= 0 && coveragePercentEightyToHundredComp < 0)
							&& i != frmtF28aLatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(153, 230, 153); // if progress percent 80-99.99(light green)
					else if (coveragePercentEightyToHundredComp == 0 && i != frmtF28aLatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(111, 220, 111); // if progress percent 100(dark green)
					String areaName = "";

					/**
					 * Checking if current iteration is the last iteration then leave districtName
					 * ,immediateParentAreaName as blank and set areaName and cellBackgroundColor
					 */
					if (i == frmtF28aLatestWklyList.size() - 1) {
						districtName = "\u00A0\u00A0\u00A0";
						immediateParentAreaName = "\u00A0\u00A0\u00A0";
						areaName = "TOTAL";
						cellBackgroundColor = new BaseColor(220, 221, 231);// color of total(last row)
					}
					/**
					 * Checking if current iteration is the not the last iteration then set areaName
					 * ,immediateParentAreaName and districtName
					 */
					else {

						if (areaLevelId == 3 || areaLevelId == 4 || areaLevelId == 5) {
							if (areaLevelId == 5) {
								districtName = sbmAreaIdAreaDomainMap.get(sbmAreaIdAreaDomainMap
										.get(frmtF28aLatestWklyList.get(i).getParentSbmAreaId()).getParentAreaId())
										.getAreaName().toUpperCase();
							}
							areaName = frmtF28aLatestWklyList.get(i).getAreaName();
							immediateParentAreaName = sbmAreaIdAreaDomainMap
									.get(frmtF28aLatestWklyList.get(i).getParentSbmAreaId()).getAreaName()
									.toUpperCase();
						}

					}
					/**
					 * Checking if resultant PDF is for weekly Geo Tag or weekly Geo Tag with range
					 */
					if ((i != frmtF28aLatestWklyList.size() - 1 && range != null) || range == null) {

						/**
						 * Creating PDF cell instance and setting its HorizontalAlignment,BorderColor,
						 * MinimumHeight and finally adding it to table instance
						 */
						PdfPCell hcell;
						hcell = new PdfPCell(
								i != frmtF28aLatestWklyList.size() - 1 ? new PdfPCell(new Phrase(i + 1 + "", headFont))
										: new PdfPCell(new Phrase("\u00A0\u00A0\u00A0", headFont)));
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setBackgroundColor(cellBackgroundColor);
						hcell.setMinimumHeight(17f);
						table.addCell(hcell);

						if (areaLevelId == 5) {
							hcell = new PdfPCell(new Phrase(districtName, headFont));
							hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
							hcell.setBorderColor(BaseColor.BLACK);
							hcell.setBackgroundColor(cellBackgroundColor);
							hcell.setMinimumHeight(17f);
							table.addCell(hcell);
						}

						if (areaLevelId != 3) {
							hcell = new PdfPCell(new Phrase(immediateParentAreaName, headFont));
							hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
							hcell.setBorderColor(BaseColor.BLACK);
							hcell.setBackgroundColor(cellBackgroundColor);
							hcell.setMinimumHeight(17f);
							table.addCell(hcell);
						}

						hcell = new PdfPCell(new Phrase(areaName, headFont));
						hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setBackgroundColor(cellBackgroundColor);
						hcell.setMinimumHeight(17f);
						table.addCell(hcell);

						Double previousWeekCoveragePercent = frmtF28aLatestWklyList.get(i)
								.getPreviousWeekCoveragePercent();
						hcell = new PdfPCell(previousWeekCoveragePercent != null
								? new PdfPCell(new Phrase(previousWeekCoveragePercent + "%", headFont))
								: new PdfPCell(new Phrase("-", headFont)));
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setBackgroundColor(cellBackgroundColor);
						hcell.setMinimumHeight(17f);
						table.addCell(hcell);

						hcell = new PdfPCell(new PdfPCell(new Phrase(currentWeekCoveragePercent + "%", headFont)));
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBackgroundColor(cellBackgroundColor);
						hcell.setMinimumHeight(17f);
						table.addCell(hcell);

						BigDecimal improvement = frmtF28aLatestWklyList.get(i).getImprovement();
						hcell = new PdfPCell(improvement != null ? new PdfPCell(new Phrase(improvement + "%", headFont))
								: new PdfPCell(new Phrase("-", headFont)));
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBackgroundColor(cellBackgroundColor);
						hcell.setMinimumHeight(17f);
						table.addCell(hcell);

						hcell = new PdfPCell(new PdfPCell(
								new Phrase(frmtF28aLatestWklyList.get(i).getBalanceRemaining() + "", headFont)));
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hcell.setBackgroundColor(cellBackgroundColor);
						hcell.setMinimumHeight(17f);
						table.addCell(hcell);

					}
				}
				/**
				 * Opening the PDF document. Adding header paragraph to the document of the PDF
				 * which illustrates area for which PDF is generated. Adding the legend to the
				 * document. Adding the table to the document. Closing the document.
				 */
				document.open();
				document.add(p);
				document.add(legend);
				document.add(table);
				document.close();
			}
			/**
			 * Checking if the size of the list is one then resultant PDF will have no PDF
			 * table but only the header,legend and footer
			 */
			else {
				document.open();
				document.add(legend);
				document.close();
			}
			/**
			 * Reading the properties value from application.properties file of the report
			 * location path make directory if doesn't exist
			 */
			String dir = configurableEnvironment.getProperty("report.path");
			File file = new File(dir);
			if (!file.exists())
				file.mkdirs();

			/**
			 * Getting the area name for which report is generated. Append the area name and
			 * report creation time with postfixed as .pdf Pass the resultant PDF report
			 * path as abstract pathname to OutputStream constructor. All the costly
			 * resources are closed
			 */
			Area area = areaRepository.findBySbmAreaId(parentAreaId);
			String areaName = parentAreaId > 5 ? area.getAreaName()
					: parentAreaId == 4 ? "All_Blocks" : parentAreaId == 5 ? "All_Gps" : "anonymous";
			String name = areaName + "_" + new SimpleDateFormat("ddMMyyyyHHmmssSSSSSSS").format(new Date()) + ".pdf";
			outputPath = dir + "" + name;
			OutputStream fos = new FileOutputStream(new File(outputPath));
			out.writeTo(fos);
			out.close();
			fos.close();
		} catch (Exception e) {
			log.error("Action : Error while Generating Weekly Geo Tag Status Pdf Report", e);
			e.printStackTrace();
		}
		return new Gson().toJson(outputPath);
	}

	/**
	 * Generates weekly JSON data for ODF declaration excel report
	 * 
	 * @param parentAreaId it can be referred to sbmAreaId or areaLevel
	 * 
	 * @return weeklyOdfDeclarationExcelReportList list of JSON data map
	 * 
	 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
	 */
	@Override
	public List<Map<String, String>> getWeeklyOdfDeclarationExcelReport(Integer parentAreaId) {

		/**
		 * Declaring list to populate later by customizing raw list of data
		 */
		List<Map<String, String>> weeklyOdfDeclarationExcelReportList = new ArrayList<Map<String, String>>();

		/**
		 * Fetching list of latest inserted data from weekly formatf42 table by passing
		 * areaLevelId or sbmAreaId
		 */
		List<FormatF42Weekly> frmtF42LatestWklyList = parentAreaId > 5
				? formatF42WeeklyRepository.findLatestOdfDeclared(parentAreaId)
				: formatF42WeeklyRepository.findLatestOdfDeclaredByAreaLevelId(parentAreaId);

		/**
		 * Fetching list of area details from area table and push it into a map
		 */
		List<Area> allArea = areaRepository.findAll();
		Map<Integer, Area> sbmAreaIdAreaDomainMap = new LinkedHashMap<Integer, Area>();
		for (Area area : allArea) {
			sbmAreaIdAreaDomainMap.put(area.getSbmAreaId(), area);
		}

		Integer counter = 0;
		/**
		 * Iterating the fetched list
		 */
		for (FormatF42Weekly formatF42Weekly : frmtF42LatestWklyList) {
			String areaType = null;
			String areaName = null;
			String parentAreaName = null;
			String parentAreaType = null;
			counter++;
			/**
			 * Getting the areaLevelId of the first index domain of fetched
			 */
			Integer areaLevel = areaRepository.findBySbmAreaId(frmtF42LatestWklyList.get(0).getAreaId()).getAreaLevel()
					.getAreaLevelId();
			/**
			 * Checking the areaLevelId and assigning the
			 * areaType,ParentAreaName,parentAreaType,areaName
			 */
			if (areaLevel == 3) {
				areaType = "District";
				parentAreaType = "State";
				areaName = frmtF42LatestWklyList.size() - 1 != counter - 1 ? formatF42Weekly.getAreaName() : "";
				parentAreaName = frmtF42LatestWklyList.size() - 1 != counter - 1 ? sbmAreaIdAreaDomainMap
						.get(sbmAreaIdAreaDomainMap.get(formatF42Weekly.getAreaId()).getParentAreaId()).getAreaName()
						.toUpperCase() : "";
			} else if (areaLevel == 4) {
				areaType = "Block";
				parentAreaType = "District";
				areaName = frmtF42LatestWklyList.size() - 1 != counter - 1 ? formatF42Weekly.getAreaName() : "";
				parentAreaName = frmtF42LatestWklyList.size() - 1 != counter - 1 ? sbmAreaIdAreaDomainMap
						.get(sbmAreaIdAreaDomainMap.get(formatF42Weekly.getAreaId()).getParentAreaId()).getAreaName()
						.toUpperCase() : "";
			} else if (areaLevel == 5) {
				areaType = "Gram Panchayat";
				parentAreaType = "Block";
				areaName = frmtF42LatestWklyList.size() - 1 != counter - 1 ? formatF42Weekly.getAreaName() : "";
				parentAreaName = frmtF42LatestWklyList.size() - 1 != counter - 1 ? sbmAreaIdAreaDomainMap
						.get(sbmAreaIdAreaDomainMap.get(formatF42Weekly.getAreaId()).getParentAreaId()).getAreaName()
						.toUpperCase() : "";
			}
			Map<String, String> map = new LinkedHashMap<String, String>();
			/**
			 * Started to populate the map and add it in a list
			 */
			map.put("Sl. No.", String.valueOf(counter));
			if (areaLevel != 3)
				map.put(parentAreaType, parentAreaName);
			map.put(areaType, String.valueOf(areaName));
			map.put("Total Villages", String.valueOf(formatF42Weekly.getOdfDeclaredTotalVillages()));
			map.put("Odf Declared Villages On Previous Week",
					String.valueOf(formatF42Weekly.getOdfDeclaredVillagesOnPreviousWeek()));
			map.put("Odf Declared Villages On Current Week",
					String.valueOf(formatF42Weekly.getOdfDeclaredVillagesOnCurrentWeek()));
			map.put("Improvement", String.valueOf(formatF42Weekly.getOdfDeclaredVillagesimprovment()));
			map.put("Declaration%", String.valueOf(formatF42Weekly.getOdfDeclaredVillagesPercentage()));

			/**
			 * add the map in the list
			 */
			weeklyOdfDeclarationExcelReportList.add(map);
		}
		return weeklyOdfDeclarationExcelReportList;

	}

	/**
	 * Generates weekly JSON data for ODF verification excel report
	 * 
	 * @param parentAreaId it can be referred to sbmAreaId or areaLevel
	 * 
	 * @return weeklyOdfVerifiedExcelReportList list of JSON data map
	 * 
	 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
	 */
	@Override
	public List<Map<String, String>> getWeeklyOdfVerifiedExcelReport(Integer parentAreaId) {
		/**
		 * Declaring list to populate later by customizing raw list of data
		 */
		List<Map<String, String>> weeklyOdfVerifiedExcelReportList = new ArrayList<Map<String, String>>();
		/**
		 * Fetching list of latest inserted data from weekly formatf42 table by passing
		 * areaLevelId or sbmAreaId
		 */
		List<FormatF42Weekly> frmtF42LatestWklyList = parentAreaId > 5
				? formatF42WeeklyRepository.findLatestOdfVerified(parentAreaId)
				: formatF42WeeklyRepository.findLatestOdfVerifiedByAreaLevelId(parentAreaId);

		/**
		 * Fetching list of area details from area table and push it into a map
		 */
		List<Area> allArea = areaRepository.findAll();
		Map<Integer, Area> sbmAreaIdAreaDomainMap = new LinkedHashMap<Integer, Area>();
		for (Area area : allArea) {
			sbmAreaIdAreaDomainMap.put(area.getSbmAreaId(), area);
		}
		Integer counter = 0;
		/**
		 * Iterating the fetched list
		 */
		for (FormatF42Weekly formatF42Weekly : frmtF42LatestWklyList) {
			String areaType = null;
			String areaName = null;
			String parentAreaName = null;
			String parentAreaType = null;
			counter++;

			/**
			 * Getting the areaLevelId of the first index domain of fetched
			 */
			Integer areaLevel = areaRepository.findBySbmAreaId(frmtF42LatestWklyList.get(0).getAreaId()).getAreaLevel()
					.getAreaLevelId();

			/**
			 * Checking the areaLevelId and assigning the
			 * areaType,ParentAreaName,parentAreaType,areaName
			 */
			if (areaLevel == 3) {
				areaType = "District";
				parentAreaType = "State";
				areaName = frmtF42LatestWklyList.size() - 1 != counter - 1 ? formatF42Weekly.getAreaName() : "";
				parentAreaName = frmtF42LatestWklyList.size() - 1 != counter - 1 ? sbmAreaIdAreaDomainMap
						.get(sbmAreaIdAreaDomainMap.get(formatF42Weekly.getAreaId()).getParentAreaId()).getAreaName()
						.toUpperCase() : "";
			} else if (areaLevel == 4) {
				areaType = "Block";
				parentAreaType = "District";
				areaName = frmtF42LatestWklyList.size() - 1 != counter - 1 ? formatF42Weekly.getAreaName() : "";
				parentAreaName = frmtF42LatestWklyList.size() - 1 != counter - 1 ? sbmAreaIdAreaDomainMap
						.get(sbmAreaIdAreaDomainMap.get(formatF42Weekly.getAreaId()).getParentAreaId()).getAreaName()
						.toUpperCase() : "";
			} else if (areaLevel == 5) {
				areaType = "Gram Panchayat";
				parentAreaType = "Block";
				areaName = frmtF42LatestWklyList.size() - 1 != counter - 1 ? formatF42Weekly.getAreaName() : "";
				parentAreaName = frmtF42LatestWklyList.size() - 1 != counter - 1 ? sbmAreaIdAreaDomainMap
						.get(sbmAreaIdAreaDomainMap.get(formatF42Weekly.getAreaId()).getParentAreaId()).getAreaName()
						.toUpperCase() : "";
			}
			Map<String, String> map = new LinkedHashMap<String, String>();

			/**
			 * Started to populate the map and add it in a list
			 */
			map.put("Sl. No.", String.valueOf(counter));
			if (areaLevel != 3)
				map.put(parentAreaType, parentAreaName);
			map.put(areaType, String.valueOf(areaName));
			map.put("Odf Declared Villages", String.valueOf(formatF42Weekly.getVerifiedOdfDeclaredTotalVillages()));
			map.put("Odf Verified Villages On Previous Week",
					String.valueOf(formatF42Weekly.getVerifiedOdfDeclaredVillagesOnPreviousWeek()));
			map.put("Odf Verified Villages On Current Week",
					String.valueOf(formatF42Weekly.getVerifiedOdfDeclaredVillagesOnCurrentWeek()));
			map.put("Improvement", String.valueOf(formatF42Weekly.getVerifiedOdfDeclaredVillagesimprovment()));
			map.put("Verification%", String.valueOf(formatF42Weekly.getVerifiedOdfDeclaredVillagesPercentage()));

			/**
			 * add the map in the list
			 */
			weeklyOdfVerifiedExcelReportList.add(map);
		}
		return weeklyOdfVerifiedExcelReportList;
	}

	/**
	 * Generates weekly JSON data for Geo Tagging status excel report
	 * 
	 * @param parentAreaId it can be referred to sbmAreaId or areaLevel
	 * @param areaLevelId  if not null then get all gps of @param parentAreaId
	 * 
	 * @return weeklyGeoTagStatusExcelReportList list of JSON data map
	 * 
	 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
	 */
	@Override
	public List<Map<String, String>> getWeeklyGeoTagStatusExcelReport(Integer parentAreaId, Integer areaLevelId) {

		/**
		 * Declaring a list to populate later by customizing raw list of data
		 */
		List<Map<String, String>> weeklyGeoTagStatusExcelReportList = new ArrayList<Map<String, String>>();

		/**
		 * Fetching list of latest inserted data from FormatF28AWeekly table by passing
		 * combination of sbmAreaId/areaLevelId or sbmAreaId and areaLevelId
		 */
		List<FormatF28aWeekly> frmtF28aLatestWklyList = areaLevelId != null
				? formatF28aWeeklyRepository.findAllLatestGpsOfF28aWeeklyByParentAreaId(parentAreaId)
				: parentAreaId > 5 ? formatF28aWeeklyRepository.findLatestGeoTagByParentId(parentAreaId)
						: formatF28aWeeklyRepository.findLatestGeoTagByAreaLevelId(parentAreaId);

		/**
		 * Fetching list of all areas detail from area table and populating a map
		 */
		List<Area> allArea = areaRepository.findAll();
		Map<Integer, Area> sbmAreaIdAreaDomainMap = new LinkedHashMap<Integer, Area>();
		for (Area area : allArea) {
			sbmAreaIdAreaDomainMap.put(area.getSbmAreaId(), area);
		}
		Integer counter = 0;
		/**
		 * Iterating the fetched list
		 */
		for (FormatF28aWeekly formatF28aWeekly : frmtF28aLatestWklyList) {
			String areaType = null;
			String areaName = null;
			String parentAreaName = null;
			String parentAreaType = null;
			String districtName = null;
			counter++;
			/**
			 * Getting the areaLevelId of the first index domain of fetched
			 */
			Integer areaLevel = areaRepository.findBySbmAreaId(frmtF28aLatestWklyList.get(0).getSbmAreaId())
					.getAreaLevel().getAreaLevelId();

			/**
			 * Checking the areaLevelId and assigning the
			 * areaType,ParentAreaName,parentAreaType,areaName
			 */
			if (areaLevel == 3) {
				areaType = "District";
				parentAreaType = "State";
				areaName = frmtF28aLatestWklyList.size() - 1 != counter - 1 ? formatF28aWeekly.getAreaName() : "";
				parentAreaName = frmtF28aLatestWklyList.size() - 1 != counter - 1
						? sbmAreaIdAreaDomainMap.get(formatF28aWeekly.getParentSbmAreaId()).getAreaName().toUpperCase()
						: "";
			} else if (areaLevel == 4) {
				areaType = "Block";
				parentAreaType = "District";
				areaName = frmtF28aLatestWklyList.size() - 1 != counter - 1 ? formatF28aWeekly.getAreaName() : "";
				parentAreaName = frmtF28aLatestWklyList.size() - 1 != counter - 1
						? sbmAreaIdAreaDomainMap.get(formatF28aWeekly.getParentSbmAreaId()).getAreaName().toUpperCase()
						: "";
			} else if (areaLevel == 5) {
				areaType = "Gram Panchayat";
				parentAreaType = "Block";
				areaName = frmtF28aLatestWklyList.size() - 1 != counter - 1 ? formatF28aWeekly.getAreaName() : "";
				parentAreaName = frmtF28aLatestWklyList.size() - 1 != counter - 1
						? sbmAreaIdAreaDomainMap.get(formatF28aWeekly.getParentSbmAreaId()).getAreaName().toUpperCase()
						: "";
				districtName = frmtF28aLatestWklyList.size() - 1 != counter - 1 ? sbmAreaIdAreaDomainMap
						.get(sbmAreaIdAreaDomainMap.get(formatF28aWeekly.getParentSbmAreaId()).getParentAreaId())
						.getAreaName().toUpperCase() : "";
			}
			Map<String, String> map = new LinkedHashMap<String, String>();

			/**
			 * Started to populate the map and add it in a list
			 */
			map.put("Sl. No.", String.valueOf(counter));
			if (areaLevel == 5)
				map.put("District", districtName);
			if (areaLevel != 3)
				map.put(parentAreaType, parentAreaName);
			map.put(areaType, String.valueOf(areaName));
			map.put("Previous Week Coverage Percent",
					String.valueOf(formatF28aWeekly.getPreviousWeekCoveragePercent() + "%"));
			map.put("Current Week Coverage Percent",
					String.valueOf(formatF28aWeekly.getCurrentWeekCoveragePercent() + "%"));
			;
			map.put("Improvement", String.valueOf(formatF28aWeekly.getImprovement() + "%"));
			map.put("Balance Remaining", String.valueOf(formatF28aWeekly.getBalanceRemaining()));

			/**
			 * add the map in the list
			 */
			weeklyGeoTagStatusExcelReportList.add(map);
		}
		return weeklyGeoTagStatusExcelReportList;

	}

	/**
	 * Generates consolidated PDF report for Weekly physical progress status report,
	 * weekly geotag report,weekly ODF declaration report,weekly ODF verification
	 * report
	 * 
	 * @param parentAreaId it can be referred to sbmAreaId or areaLevel
	 * @param areaLevel    if not null then get all gps of @param parentAreaId
	 * @param request      to set the domain name i.e source of the PDF generated
	 * 
	 * @return outputPath location of the PDF generated
	 * 
	 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
	 */
	@Override
	public String getWeeklyConsolidatedPdf(Integer parentAreaId, Integer areaLevel, HttpServletRequest request) {

		/**
		 * Fetching area details from area table by sbmAreaId
		 */
		Area area = areaRepository.findBySbmAreaId(parentAreaId);
		String outputPath = null;

		/**
		 * Setting PDF document of A4 size in landscape mode
		 */
		Document document = new Document(PageSize.A4.rotate());
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		try {

			/**
			 * Declaring few list to populate later by customizing raw list of data from
			 * FormatA03Weekly table
			 */
			List<FormatA03Weekly> frmtA03LatestWklySrtedDescByPrgrsList = new ArrayList<FormatA03Weekly>();
			List<FormatA03Weekly> frmtA03LatestWklySrtedIncByCovList = new ArrayList<FormatA03Weekly>();
			FormatA03Weekly lastRow = new FormatA03Weekly();

			/**
			 * Fetching list of latest inserted data from weekly formatA03 table by passing
			 * combination of sbmAreaId/areaLevelId or sbmAreaId and areaLevel
			 */
			List<FormatA03Weekly> frmtA03LatestWklyList = areaLevel != null
					? formatA03WeeklyRepository.findAllLatestGpsOfA03WeeklyByParentAreaId(parentAreaId)
					: parentAreaId > 5
							? formatA03WeeklyRepository.findByParentAreaIdOrderByCreatedDateDescOfAllAreas(parentAreaId)
							: formatA03WeeklyRepository.findByAreaLevelIdOrderByCreatedDateDescOfAllAreas(parentAreaId);

			/**
			 * Iterating the weekly formatA03 list
			 */
			for (int i = 0; i < frmtA03LatestWklyList.size(); i++) {
				/**
				 * Checking if the current iteration is not the last iteration
				 */
				if (i != frmtA03LatestWklyList.size() - 1) {
					/**
					 * Checking if the CoveragePercent is equal to 100 then set all those domains in
					 * a list
					 */
					if (frmtA03LatestWklyList.get(i).getIhhlCoveragePercent().compareTo(new Double(100.0)) == 0)
						frmtA03LatestWklySrtedIncByCovList.add(frmtA03LatestWklyList.get(i));
					else
						/**
						 * Checking if the CoveragePercent is not equal to 100 then set all those
						 * domains in another list
						 */
						frmtA03LatestWklySrtedDescByPrgrsList.add(frmtA03LatestWklyList.get(i));
				} else
				/**
				 * Checking if the current iteration is the last iteration then reassign the
				 * last index domain
				 */
				{
					lastRow = frmtA03LatestWklyList.get(i);
				}
			}
			/**
			 * Clearing all data from already populated list. Push newly populated list to
			 * the empty list. Also push the last index domain
			 */
			frmtA03LatestWklyList.clear();
			frmtA03LatestWklyList.addAll(frmtA03LatestWklySrtedDescByPrgrsList);
			frmtA03LatestWklyList.addAll(frmtA03LatestWklySrtedIncByCovList);
			frmtA03LatestWklyList.add(lastRow);

			/**
			 * Fetching list of latest inserted data from FormatF28AWeekly table by passing
			 * combination of sbmAreaId/areaLevel or sbmAreaId and areaLevel
			 */
			List<FormatF28aWeekly> frmtF28aLatestWklyList = areaLevel != null
					? formatF28aWeeklyRepository.findAllLatestGpsOfF28aWeeklyByParentAreaId(parentAreaId)
					: parentAreaId > 5 ? formatF28aWeeklyRepository.findLatestGeoTagByParentId(parentAreaId)
							: formatF28aWeeklyRepository.findLatestGeoTagByAreaLevelId(parentAreaId);

			/**
			 * Fetching list of latest inserted data from FormatF42Weekly table by sbmAreaId
			 * or ArealevelId for ODF declaration PDF
			 */
			List<FormatF42Weekly> frmtF42LatestWklyList = areaLevel != null
					? formatF42WeeklyRepository.findAllLatestGpsOfF42WeeklyByParentAreaId(parentAreaId)
					: parentAreaId > 5 ? formatF42WeeklyRepository.findLatestOdfDeclared(parentAreaId)
							: formatF42WeeklyRepository.findLatestOdfDeclaredByAreaLevelId(parentAreaId);

			/**
			 * Fetching list of latest inserted data from FormatF42Weekly table by sbmAreaId
			 * or ArealevelId for ODF Verified PDF
			 */
			List<FormatF42Weekly> frmtF42LatestOdfVerifiedWklyList = areaLevel != null
					? formatF42WeeklyRepository.findAllLatestGpsOfF42WeeklyByParentAreaId(parentAreaId)
					: parentAreaId > 5 ? formatF42WeeklyRepository.findLatestOdfVerified(parentAreaId)
							: formatF42WeeklyRepository.findLatestOdfVerifiedByAreaLevelId(parentAreaId);

			/**
			 * Getting the areaLevelId and timestamp of the first index domain of fetched
			 * list of latest inserted data from weekly formatA03 table
			 */
			Integer areaLevelId = frmtA03LatestWklyList.get(0).getAreaLevelId();
			String createdDate = new SimpleDateFormat("dd-MM-yyyy")
					.format(frmtA03LatestWklyList.get(0).getCreatedDate());

			/**
			 * setting domain name from where pdf is being generated
			 */
			String uri = request.getRequestURI();
			String domainName = request.getRequestURL().toString();
			String ctxPath = request.getContextPath();
			domainName = domainName.replaceFirst(uri, "");
			domainName += ctxPath;

			/**
			 * Setting margins of the PDF. Setting the header and footer of the PDF.
			 * Compressing the PDF document to the fullest possible.
			 */
			PdfWriter writer = PdfWriter.getInstance(document, out);
			document.setMargins(document.leftMargin(), document.rightMargin(), 0, document.bottomMargin());
			HeaderFooter headerFooter = new HeaderFooter(context, "Weekly", createdDate, domainName);
			writer.setPageEvent(headerFooter);
			writer.setFullCompression();

			String districtName = "";
			String parentAreaType = "";
			String areaType = "";
			String parentAreaName = "";
			String immediateParentAreaName = "";
			/**
			 * Checking the areaLevelId and assigning the
			 * areaType,ParentAreaName,parentAreaType
			 */
			if (areaLevelId == 3) {
				parentAreaType = "State";
				areaType = "District";
				parentAreaName = frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getStateName();
			} else if (areaLevelId == 4) {
				parentAreaType = "District";
				areaType = "Block";
				parentAreaName = parentAreaId > 5
						? frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getDistrictName()
						: frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getStateName();
			} else if (areaLevelId == 5) {
				parentAreaType = "Block";
				areaType = "Gram Panchayat";
				parentAreaName = areaLevel != null ? area.getAreaName()
						: parentAreaId > 5 ? frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getBlockName()
								: frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getStateName();
			}

			/**
			 * Setting font size and type. Setting the font in the heading paragraph of the
			 * PDF which illustrates area for which PDF is generated. Setting the alignment
			 * and spacing.
			 */
			Font boldFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD);
			Paragraph p = new Paragraph("Area:-" + parentAreaName.toUpperCase() + "    " + areaType.toUpperCase() + "-"
					+ "WISE PHYSICAL PROGRESS STATUS", boldFont);
			p.setAlignment(Element.ALIGN_CENTER);
			p.setSpacingAfter(10f);

			Font createdDateFont = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Paragraph createdDatePara = new Paragraph(
					"Created Date:" + new SimpleDateFormat("dd-MM-yyyy").format(new Date()), createdDateFont);
			createdDatePara.setAlignment(Element.ALIGN_RIGHT);
			createdDatePara.setSpacingBefore(13f);

			/**
			 * Getting the legend image from servlet context path and passing it as an
			 * argument to get that representation of the graphic element. Compact the image
			 * size to 50% Setting the alignment for the image to right.
			 */
			Image legend = Image.getInstance(context.getRealPath("template//images//legend.png"));
			legend.scalePercent(50);
			legend.setAlignment(legend.ALIGN_RIGHT);

			/**
			 * *****************First Table of First PDF page
			 * starts*******************************
			 */

			/**
			 * Constructing data for first table in first PDF page. Declaring a map and
			 * populating it to provide data to the first table in first PDF page
			 */
			Map<String, String> ihhlsConstructedsince2014Map = new LinkedHashMap<String, String>();
			ihhlsConstructedsince2014Map.put("Financial Year", "IHHLs Completed");
			ihhlsConstructedsince2014Map.put("Before Baseline Survey",
					frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getHhDetailsWithToilet() != null
							? frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getHhDetailsWithToilet() + ""
							: "-");
			ihhlsConstructedsince2014Map.put("2014-15",
					frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getCoverageHH1415() != null
							? frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getCoverageHH1415() + ""
							: "-");
			ihhlsConstructedsince2014Map.put("2015-16",
					frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getCoverageHH1516() != null
							? frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getCoverageHH1516() + ""
							: "-");
			ihhlsConstructedsince2014Map.put("2016-17",
					frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getCoverageHH1617() != null
							? frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getCoverageHH1617() + ""
							: "-");
			ihhlsConstructedsince2014Map.put("2017-18",
					frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getCoverageHH1718() != null
							? frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getCoverageHH1718() + ""
							: "-");
			ihhlsConstructedsince2014Map.put("2018-19",
					frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getCoverageHH1819() != null
							? frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getCoverageHH1819() + ""
							: "-");
			ihhlsConstructedsince2014Map.put("TOTAL",
					frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getCoverageHH1819() != null
							? frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getCoverageHHIncludingBLS()
									+ ""
							: "-");

			/**
			 * Setting font size ,font color,background color for header row of first table
			 * in first PDF page
			 */
			Font pg1Tb1Headerfont = new Font(FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.WHITE);
			BaseColor headerBgColor = WebColors.getRGBColor("#4272c6");

			/**
			 * Initializing PDF table for first table in first PDF page and setting
			 * alignment
			 */
			PdfPTable firstTopTable = new PdfPTable(2);
			firstTopTable.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);

			/**
			 * Setting width of columns of first table in first PDF page
			 */
			float[] columnWidthsFirstTopTable = { 20f, 20f };
			firstTopTable.setWidths(columnWidthsFirstTopTable);

			/**
			 * Creating PDF cell instance for first table header in first PDF page and
			 * setting few properties and finally adding it to table instance
			 */
			PdfPCell hcellPg1Tb1;
			hcellPg1Tb1 = new PdfPCell(new Phrase("IHHLs Constructed since 2014", pg1Tb1Headerfont));
			hcellPg1Tb1.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcellPg1Tb1.setBackgroundColor(headerBgColor);
			hcellPg1Tb1.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcellPg1Tb1.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcellPg1Tb1.setFixedHeight(30f);
			hcellPg1Tb1.setColspan(3);
			firstTopTable.addCell(hcellPg1Tb1);

			/**
			 * Setting font type for first table content in first PDF page
			 */
			Font bFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
			int firstPgFirstTabCounter = 0;

			/**
			 * Iterating already populated map for populating the first table in first PDF
			 * page
			 */
			for (Map.Entry<String, String> entry : ihhlsConstructedsince2014Map.entrySet()) {

				PdfPCell hcell0;
				hcell0 = firstPgFirstTabCounter == 0
						|| firstPgFirstTabCounter == ihhlsConstructedsince2014Map.size() - 1
								? new PdfPCell(new Phrase(entry.getKey(), bFont))
								: new PdfPCell(new Phrase(entry.getKey()));
				hcell0.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell0.setBorderColor(BaseColor.BLACK);
				firstTopTable.addCell(hcell0);

				hcell0 = firstPgFirstTabCounter == 0
						|| firstPgFirstTabCounter == ihhlsConstructedsince2014Map.size() - 1
								? new PdfPCell(new Phrase(entry.getValue(), bFont))
								: new PdfPCell(new Phrase(entry.getValue()));
				hcell0.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell0.setBorderColor(BaseColor.BLACK);
				firstTopTable.addCell(hcell0);
				firstPgFirstTabCounter++;
			}

			/**
			 * *****************Second Table of First PDF page
			 * starts*******************************
			 */

			/**
			 * Constructing data for second table in first PDF page. Declaring a map and
			 * populating it to provide data to the second table in first PDF page based on
			 * arealevelId or sbmAreaId
			 */
			String areaTypeName = frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getAreaLevelId() == 2
					? "State"
					: frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getAreaLevelId() == 3 ? "District"
							: frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getAreaLevelId() == 4
									? "Block"
									: "Gram Panchyat";

			Map<String, String> areaAtAGlanceMap = new LinkedHashMap<String, String>();
			areaAtAGlanceMap.put("Coverage of IHHL in the " + areaTypeName,
					frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getIhhlCoveragePercent() + "%");
			areaAtAGlanceMap.put("Balance IHHLs to be Constructed",
					frmtA03LatestWklyList.get(frmtA03LatestWklyList.size() - 1).getCoverageHHBalanceUncovered() + "");
			areaAtAGlanceMap.put("Coverage of Geo-tagging",
					frmtF28aLatestWklyList.get(frmtF28aLatestWklyList.size() - 1).getCurrentWeekCoveragePercent()
							+ "%");
			areaAtAGlanceMap.put("Number of Villages Declared ODF",
					frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getOdfDeclaredVillagesOnCurrentWeek()
							+ "(" + frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1)
									.getOdfDeclaredVillagesPercentage()
							+ "%)");
			areaAtAGlanceMap.put("Number of Villages Verified ODF",
					frmtF42LatestOdfVerifiedWklyList.get(frmtF42LatestOdfVerifiedWklyList.size() - 1)
							.getVerifiedOdfDeclaredVillagesOnCurrentWeek() + "("
							+ frmtF42LatestOdfVerifiedWklyList.get(frmtF42LatestOdfVerifiedWklyList.size() - 1)
									.getVerifiedOdfDeclaredVillagesPercentage()
							+ "%)");
			if (areaLevelId == 3 || parentAreaId < 6) {
				areaAtAGlanceMap.put("Number of GPs Declared ODF",
						frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getGpDeclaredOdf() != null
								? frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getGpDeclaredOdf() + ""
								: "-");
				areaAtAGlanceMap.put("Number of Blocks Declared ODF",
						frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getBlockDeclaredOdf() != null
								? frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getBlockDeclaredOdf() + ""
								: "-");
				areaAtAGlanceMap.put("Number of Districts Declared ODF",
						frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getBlockDeclaredOdf() != null
								? formatF42WeeklyRepository.findCountOfNoOfDistDeclOdf() + ""
								: "-");
			} else if (areaLevelId == 4 || areaLevel != null) {
				areaAtAGlanceMap.put("Number of GPs Declared ODF",
						frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getGpDeclaredOdf() != null
								? frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getGpDeclaredOdf() + ""
								: "-");
				areaAtAGlanceMap.put("Number of Blocks Declared ODF",
						frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getBlockDeclaredOdf() != null
								? frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getBlockDeclaredOdf() + ""
								: "-");
			} else if (areaLevelId == 5) {
				areaAtAGlanceMap.put("Number of GPs Declared ODF",
						frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getGpDeclaredOdf() != null
								? frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getGpDeclaredOdf() + ""
								: "-");

			}

			/**
			 * Initializing PDF table for second table in first PDF page and setting
			 * alignment
			 */
			PdfPTable secondTopTable = new PdfPTable(3);
			secondTopTable.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);

			/**
			 * Setting width of columns of second table in first PDF page
			 */
			float[] columnWidthssecondTopTable = { 10f, 40f, 30f };
			secondTopTable.setWidths(columnWidthssecondTopTable);

			/**
			 * Creating PDF cell instance for second table header in first PDF page and
			 * setting few properties and finally adding it to table instance
			 */
			PdfPCell hcellPg1Tb2;
			hcellPg1Tb2 = new PdfPCell(new Phrase(
					"SBM(G) " + frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getAreaName().toUpperCase()
							+ " At a Glance",
					pg1Tb1Headerfont));
			hcellPg1Tb2.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcellPg1Tb2.setBackgroundColor(headerBgColor);
			hcellPg1Tb2.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcellPg1Tb2.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcellPg1Tb2.setFixedHeight(30f);
			hcellPg1Tb2.setColspan(3);
			secondTopTable.addCell(hcellPg1Tb2);

			int counter = 0;

			/**
			 * Iterating already populated map for populating the second table in first PDF
			 * page
			 */
			for (Map.Entry<String, String> entry : areaAtAGlanceMap.entrySet()) {
				counter++;
				PdfPCell hcell1;
				hcell1 = new PdfPCell(new Phrase(counter + ""));
				hcell1.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell1.setBorderColor(BaseColor.BLACK);
				secondTopTable.addCell(hcell1);

				hcell1 = new PdfPCell(new Phrase(entry.getKey()));
				hcell1.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell1.setBorderColor(BaseColor.BLACK);
				secondTopTable.addCell(hcell1);

				hcell1 = new PdfPCell(new Phrase(entry.getValue()));
				hcell1.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell1.setBorderColor(BaseColor.BLACK);
				secondTopTable.addCell(hcell1);
			}

			secondTopTable.setSpacingBefore(80f);

			/**
			 * Opening the PDF document. Adding first table of first PDF page to the
			 * document. Adding second table of first PDF page to the document. Switching to
			 * new page for Weekly Physical Progress Status PDF
			 */
			document.open();
			document.add(firstTopTable);
			document.add(secondTopTable);
			document.newPage();

			/**
			 * *****************Weekly Physical Progress Status PDF starts from
			 * here******************
			 */

			/**
			 * Initializing PDF table for weekly FormatA03 dynamically based on arealevelId
			 * Setting alignment and width percent for the table
			 */
			PdfPTable table = new PdfPTable(areaLevelId == 5 ? 9 : areaLevelId == 3 ? 7 : 8);
			table.setWidthPercentage(100f); // Width 100%
			table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);

			/**
			 * Setting width of columns of initialized PDF table for weekly FormatA03
			 * dynamically based on arealevelId
			 */
			float[] columnWidths = {};
			if (areaLevelId == 5) {
				float[] columnWidth = { 10f, 25f, 30f, 30f, 18f, 17.5f, 19f, 15f, 17f };
				columnWidths = columnWidth;
				table.setWidths(columnWidths);
			} else if (areaLevelId == 3) {
				float[] columnWidth = { 10f, 30f, 18f, 17.5f, 19f, 10f, 12f };
				columnWidths = columnWidth;
				table.setWidths(columnWidths);
			} else {
				float[] columnWidth = { 10f, 30f, 30f, 14f, 13.5f, 17f, 12f, 13f };
				columnWidths = columnWidth;
				table.setWidths(columnWidths);
			}

			/**
			 * Setting font size and type of PDF table header,header index number and body
			 * contents for weekly FormatA03 PDF report
			 */
			float fntSize = 10f;
			float columnfntSize = 11f;
			Font columnFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, columnfntSize, BaseColor.WHITE);
			Font headFont = FontFactory.getFont(FontFactory.HELVETICA, fntSize);
			Font indexFont = FontFactory.getFont(FontFactory.HELVETICA, fntSize, BaseColor.WHITE);

			/**
			 * Setting weekly FormatA03 PDF table header names dynamically based on
			 * arealevelId and add it to table instance
			 */
			table.addCell(new PdfPCell(new Phrase("Sl. No.", columnFont)));
			if (areaLevelId == 5)
				table.addCell(new PdfPCell(new Phrase("District", columnFont)));
			if (areaLevelId != 3)
				table.addCell(new PdfPCell(new Phrase(parentAreaType, columnFont)));
			table.addCell(new PdfPCell(new Phrase(areaType, columnFont)));
			table.addCell(
					new PdfPCell(
							new Phrase(
									"Improvement Since Date "
											+ (!frmtA03LatestWklyList.isEmpty()
													? frmtA03LatestWklyList.get(0).getImprovmentSinceDate() != null
															? new SimpleDateFormat("dd-MM-yyyy")
																	.format(frmtA03LatestWklyList.get(0)
																			.getImprovmentSinceDate())
															: ""
													: "First Time"),
									columnFont)));
			table.addCell(new PdfPCell(new Phrase("Required Rate Of Construction(per week)", columnFont)));
			table.addCell(new PdfPCell(new Phrase("Progress vis-à-vis Weekly Requirement", columnFont)));
			table.addCell(new PdfPCell(new Phrase("Balance Remaining", columnFont)));
			table.addCell(new PdfPCell(new Phrase("Coverage%", columnFont)));

			/**
			 * Setting the weekly FormatA03 PDF table header index number and add it to
			 * table instance
			 */
			for (int i = 0; i < columnWidths.length; i++)
				table.addCell(new PdfPCell(new Phrase(i + 1 + "", indexFont)));

			/**
			 * Looping for weekly FormatA03 PDF table header row and header index row i.e it
			 * will loop two times
			 */
			for (int i = 0; i <= 1; i++) {
				/**
				 * Setting the weekly FormatA03 PDF table header row and header index row as
				 * header so that it can be seen in every page of PDF report
				 */
				table.setHeaderRows(i + 1);
				/**
				 * Getting the cells of the weekly FormatA03 PDF table header row and header
				 * index row as per the loop
				 */
				PdfPCell[] cells = table.getRow(i).getCells();
				/**
				 * Setting background color,border color,horizontal alignment and fixed height
				 * of the weekly FormatA03 PDF table header row and header index row as per the
				 * loop
				 */
				for (int j = 0; j < cells.length; j++) {
					cells[j].setBackgroundColor(new BaseColor(66, 114, 198));
					cells[j].setBorderColor(BaseColor.BLACK);
					cells[j].setHorizontalAlignment(Element.ALIGN_CENTER);
					if (i == 0)
						cells[j].setFixedHeight(60f);
					else
						cells[j].setFixedHeight(17f);
				}
			}
			/**
			 * Iterating list of latest inserted data from weekly FormatA03 table to
			 * populate the PDF table contents
			 */
			for (int i = 0; i < frmtA03LatestWklyList.size(); i++) {
				BaseColor cellBackgroundColor = null;
				String coveragePercent = frmtA03LatestWklyList.get(i).getIhhlCoveragePercent() + "%";
				Double progressPercent = frmtA03LatestWklyList.get(i).getProgressPercent();
				/**
				 * Checking if coveragePercent is equal to 100 and current loop iteration is not
				 * last iteration then set background color as dark green
				 */
				if (coveragePercent.equals("100.0%") && i != frmtA03LatestWklyList.size() - 1) {
					cellBackgroundColor = new BaseColor(111, 220, 111);// when coverage percent is 100(dark green)
				}
				/**
				 * Checking if progressPercent is not equal to null then check the
				 * progressPercent against there threshold values to set the background color of
				 * different rows of PDF table content
				 */
				if (progressPercent != null) {
					int progressPercentZeroToFiftyComp = Double.compare(progressPercent, new Double(50.00));
					int progressPercentFiftyToEightyComp = Double.compare(progressPercent, new Double(80.00));
					int progressPercentEightyToHundredComp = Double.compare(progressPercent, new Double(100.00));

					if (progressPercentZeroToFiftyComp < 0 && !coveragePercent.equals("100.0%")
							&& i != frmtA03LatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(255, 179, 179);// if progress percent <50(red)
					else if ((progressPercentZeroToFiftyComp >= 0 && progressPercentFiftyToEightyComp < 0)
							&& !coveragePercent.equals("100.0%") && i != frmtA03LatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(255, 217, 179); // if progress percent 50-79.99(yellow)
					else if ((progressPercentFiftyToEightyComp >= 0 && progressPercentEightyToHundredComp < 0)
							&& !coveragePercent.equals("100.0%") && i != frmtA03LatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(153, 230, 153); // if progress percent 80-99.99(light green)
					else if (progressPercentEightyToHundredComp >= 0 && !coveragePercent.equals("100.0%")
							&& i != frmtA03LatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(111, 220, 111); // if progress percent 100(dark green)
				}
				String areaName = "";

				/**
				 * Checking if current iteration for weekly FormatA03 list is the last iteration
				 * then leave districtName,immediateParentAreaName as blank and set areaName and
				 * cellBackgroundColor
				 */
				if (i == frmtA03LatestWklyList.size() - 1) {
					districtName = "\u00A0\u00A0\u00A0";
					immediateParentAreaName = "\u00A0\u00A0\u00A0";
					areaName = "TOTAL";
					cellBackgroundColor = new BaseColor(220, 221, 231);// color of total(last row)
				}
				/**
				 * Checking if current iteration for weekly FormatA03 list is the not the last
				 * iteration then set areaName,immediateParentAreaName and districtName
				 * dynamically according to areaLevelId
				 */
				else {

					if (areaLevelId == 3) {
						areaName = frmtA03LatestWklyList.get(i).getDistrictName();
						immediateParentAreaName = frmtA03LatestWklyList.get(i).getStateName();
					} else if (areaLevelId == 4) {
						areaName = frmtA03LatestWklyList.get(i).getBlockName();
						immediateParentAreaName = frmtA03LatestWklyList.get(i).getDistrictName();
					} else if (areaLevelId == 5) {
						areaName = frmtA03LatestWklyList.get(i).getGpName();
						immediateParentAreaName = frmtA03LatestWklyList.get(i).getBlockName();
						districtName = frmtA03LatestWklyList.get(i).getDistrictName();
					}
				}

				/**
				 * Creating PDF cell instance for weekly FormatAO3 PDF report and setting its
				 * HorizontalAlignment,BorderColor,MinimumHeight and finally adding it to table
				 * instance
				 */
				PdfPCell hcell;
				hcell = new PdfPCell(
						i != frmtA03LatestWklyList.size() - 1 ? new PdfPCell(new Phrase(i + 1 + "", headFont))
								: new PdfPCell(new Phrase("\u00A0\u00A0\u00A0", headFont)));
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

				if (areaLevelId == 5) {
					hcell = new PdfPCell(new Phrase(districtName, headFont));
					hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
					hcell.setBorderColor(BaseColor.BLACK);
					hcell.setBackgroundColor(cellBackgroundColor);
					hcell.setMinimumHeight(17f);
					table.addCell(hcell);
				}
				if (areaLevelId != 3) {
					hcell = new PdfPCell(new Phrase(immediateParentAreaName, headFont));
					hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
					hcell.setBorderColor(BaseColor.BLACK);
					hcell.setBackgroundColor(cellBackgroundColor);
					hcell.setMinimumHeight(17f);
					table.addCell(hcell);
				}

				hcell = new PdfPCell(new Phrase(areaName, headFont));
				hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

				Integer improvement = frmtA03LatestWklyList.get(i).getImprovment();
				hcell = new PdfPCell(improvement != null ? new PdfPCell(new Phrase(improvement + "", headFont))
						: new PdfPCell(new Phrase("-", headFont)));
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

				Integer rRForConstructionPerWeek = frmtA03LatestWklyList.get(i).getConstructionForWeekRR();
				hcell = new PdfPCell(rRForConstructionPerWeek != null
						? new PdfPCell(new Phrase(rRForConstructionPerWeek + "", headFont))
						: new PdfPCell(new Phrase("-", headFont)));
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

				hcell = new PdfPCell(progressPercent != null ? new PdfPCell(new Phrase(progressPercent + "%", headFont))
						: new PdfPCell(new Phrase("-", headFont)));
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

				hcell = new PdfPCell(new PdfPCell(
						new Phrase(frmtA03LatestWklyList.get(i).getCoverageHHBalanceUncovered() + "", headFont)));
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

				hcell = new PdfPCell(new PdfPCell(new Phrase(coveragePercent, headFont)));
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

			}

			/**
			 * Adding header paragraph to the document of the weekly FormatA03 PDF which
			 * illustrates area for which PDF is generated. Adding the legend to the
			 * document. Adding the FormatA03 table content to the document. Switching to
			 * new page for Weekly GEO Tagging PDF
			 */
			document.add(p);
			document.add(legend);
			document.add(table);
			document.newPage();

			/**
			 * *****************Weekly GEO Tagging PDF starts from
			 * here*********************************
			 */

			/**
			 * Fetching all area details from area table and setting in a map
			 */
			List<Area> allArea = areaRepository.findAll();
			Map<Integer, Area> sbmAreaIdAreaDomainMap = new LinkedHashMap<Integer, Area>();
			for (Area area1 : allArea) {
				sbmAreaIdAreaDomainMap.put(area1.getSbmAreaId(), area1);
			}

			String districtName2 = "";
			String areaType2 = "";
			String parentAreaName2 = "";
			String immediateParentAreaName2 = "";
			String parentAreaType2 = "";
			/**
			 * Checking the areaLevelId and assigning the
			 * areaType,ParentAreaName,parentAreaType
			 */
			if (areaLevelId == 3) {
				parentAreaType2 = "State";
				areaType2 = "District";
				parentAreaName2 = frmtF28aLatestWklyList.get(frmtF28aLatestWklyList.size() - 1).getAreaName();
			} else if (areaLevelId == 4) {
				parentAreaType2 = "District";
				areaType2 = "Block";
				parentAreaName2 = frmtF28aLatestWklyList.get(frmtF28aLatestWklyList.size() - 1).getAreaName();
			} else if (areaLevelId == 5) {
				parentAreaType2 = "Block";
				areaType2 = "Gram Panchayat";
				parentAreaName2 = frmtF28aLatestWklyList.get(frmtF28aLatestWklyList.size() - 1).getAreaName();
			}

			/**
			 * Setting the font for the Weekly FortmatF28A PDF in the heading paragraph of
			 * the PDF which illustrates area for which PDF is generated. Setting the
			 * alignment and spacing.
			 */
			Paragraph p2 = new Paragraph("Area:-" + parentAreaName2.toUpperCase() + "    " + areaType2.toUpperCase()
					+ "-" + "WISE GEO-TAGGING STATUS", boldFont);
			p2.setAlignment(Element.ALIGN_CENTER);
			p2.setSpacingAfter(10f);

			/**
			 * Initializing PDF table for Weekly FortmatF28A PDF dynamically based on
			 * arealevelId Setting alignment and width percent for the table
			 */
			PdfPTable table2 = new PdfPTable(areaLevelId == 5 ? 8 : areaLevelId == 3 ? 6 : 7);
			table2.setWidthPercentage(100f); // Width 100%
			table2.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);

			/**
			 * Setting width of columns of initialized PDF table for Weekly FortmatF28A PDF
			 * dynamically based on arealevelId
			 */
			float[] columnWidths2 = {};
			if (areaLevelId == 5) {
				float[] columnWidth2 = { 8f, 25f, 30f, 30f, 18f, 18f, 15f, 14f };
				columnWidths2 = columnWidth2;
				table2.setWidths(columnWidths2);
			} else if (areaLevelId == 3) {
				float[] columnWidth2 = { 10f, 50f, 17f, 17f, 12f, 12f };
				columnWidths2 = columnWidth2;
				table2.setWidths(columnWidths2);
			} else {
				float[] columnWidth2 = { 10f, 30f, 30f, 20f, 20f, 14f, 13f };
				columnWidths2 = columnWidth2;
				table2.setWidths(columnWidths2);
			}

			/**
			 * Setting the PDF table header names for Weekly FortmatF28A PDF dynamically
			 * based on arealevelId and add it to table instance
			 */
			table2.addCell(new PdfPCell(new Phrase("Sl No", columnFont)));
			if (areaLevelId == 5)
				table2.addCell(new PdfPCell(new Phrase("District", columnFont)));
			if (areaLevelId != 3)
				table2.addCell(new PdfPCell(new Phrase(parentAreaType2, columnFont)));
			table2.addCell(new PdfPCell(new Phrase(areaType2, columnFont)));
			table2.addCell(
					new PdfPCell(
							new Phrase(
									"% Coverage as on "
											+ (!frmtF28aLatestWklyList.isEmpty()
													? frmtF28aLatestWklyList.get(0).getImprovmentSinceDate() != null
															? new SimpleDateFormat("dd-MM-yyyy")
																	.format(frmtF28aLatestWklyList.get(0)
																			.getImprovmentSinceDate())
															: ""
													: "First Time"),
									columnFont)));
			table2.addCell(new PdfPCell(new Phrase("% Coverage as on "
					+ (!frmtF28aLatestWklyList.isEmpty() ? frmtF28aLatestWklyList.get(0).getCreatedDate() != null
							? new SimpleDateFormat("dd-MM-yyyy").format(frmtF28aLatestWklyList.get(0).getCreatedDate())
							: "" : "First Time"),
					columnFont)));
			table2.addCell(
					new PdfPCell(
							new Phrase(
									"Improvement Since Date "
											+ (!frmtF28aLatestWklyList.isEmpty()
													? frmtF28aLatestWklyList.get(0).getImprovmentSinceDate() != null
															? new SimpleDateFormat("dd-MM-yyyy")
																	.format(frmtF28aLatestWklyList.get(0)
																			.getImprovmentSinceDate())
															: ""
													: "First Time"),
									columnFont)));
			table2.addCell(new PdfPCell(new Phrase("Balancing Remaining", columnFont)));

			/**
			 * Setting the weekly FormatF28A PDF table header index number and add it to
			 * table instance
			 */
			for (int i = 0; i < columnWidths2.length; i++)
				table2.addCell(new PdfPCell(new Phrase(i + 1 + "", indexFont)));

			/**
			 * Looping for weekly FormatF28A PDF table header row and header index row i.e
			 * it will loop two times
			 */
			for (int i = 0; i <= 1; i++) {
				/**
				 * Setting the weekly FormatF28A PDF table header row and header index row as
				 * header so that it can be seen in every page of PDF report
				 */
				table2.setHeaderRows(i + 1);
				/**
				 * Getting the cells of the weekly FormatF28A PDF table header row and header
				 * index row as per the loop
				 */
				PdfPCell[] cells2 = table2.getRow(i).getCells();
				/**
				 * Setting background color,border color,horizontal alignment and fixed height
				 * of the weekly FormatF28A PDF table header row and header index row as per the
				 * loop
				 */
				for (int j = 0; j < cells2.length; j++) {
					cells2[j].setBackgroundColor(new BaseColor(66, 114, 198));
					cells2[j].setBorderColor(BaseColor.BLACK);
					cells2[j].setHorizontalAlignment(Element.ALIGN_CENTER);
					if (i == 0)
						cells2[j].setFixedHeight(45f);
					else
						cells2[j].setFixedHeight(17f);
				}
			}
			/**
			 * Iterating list of latest inserted data from weekly FormatF28AWeekly table to
			 * populate the PDF table contents
			 */
			for (int i = 0; i < frmtF28aLatestWklyList.size(); i++) {
				BaseColor cellBackgroundColor = null;
				/**
				 * Checking if currentWeekCoveragePercent against there threshold values to set
				 * the background color of different rows of PDF table content
				 */
				Double currentWeekCoveragePercent = frmtF28aLatestWklyList.get(i).getCurrentWeekCoveragePercent();
				int coveragePercentZeroToFiftyComp = Double.compare(currentWeekCoveragePercent, new Double(50.00));
				int coveragePercentFiftyToEightyComp = Double.compare(currentWeekCoveragePercent, new Double(80.00));
				int coveragePercentEightyToHundredComp = Double.compare(currentWeekCoveragePercent, new Double(100.00));

				if (coveragePercentZeroToFiftyComp < 0 && i != frmtF28aLatestWklyList.size() - 1)
					cellBackgroundColor = new BaseColor(255, 179, 179);// if progress percent <50(red)
				else if ((coveragePercentZeroToFiftyComp >= 0 && coveragePercentFiftyToEightyComp < 0)
						&& i != frmtF28aLatestWklyList.size() - 1)
					cellBackgroundColor = new BaseColor(255, 217, 179); // if progress percent 50-79.99(yellow)
				else if ((coveragePercentFiftyToEightyComp >= 0 && coveragePercentEightyToHundredComp < 0)
						&& i != frmtF28aLatestWklyList.size() - 1)
					cellBackgroundColor = new BaseColor(153, 230, 153); // if progress percent 80-99.99(light green)
				else if (coveragePercentEightyToHundredComp == 0 && i != frmtF28aLatestWklyList.size() - 1)
					cellBackgroundColor = new BaseColor(111, 220, 111); // if progress percent 100(dark green)
				String areaName2 = "";

				/**
				 * Checking if current iteration is the last iteration then leave districtName
				 * ,immediateParentAreaName as blank and set areaName and cellBackgroundColor
				 */
				if (i == frmtF28aLatestWklyList.size() - 1) {
					districtName2 = "\u00A0\u00A0\u00A0";
					immediateParentAreaName2 = "\u00A0\u00A0\u00A0";
					areaName2 = "TOTAL";
					cellBackgroundColor = new BaseColor(220, 221, 231);// color of total(last row)
				}
				/**
				 * Checking if current iteration is the not the last iteration then set areaName
				 * ,immediateParentAreaName and districtName
				 */
				else {

					if (areaLevelId == 3 || areaLevelId == 4 || areaLevelId == 5) {
						if (areaLevelId == 5) {
							districtName2 = sbmAreaIdAreaDomainMap.get(sbmAreaIdAreaDomainMap
									.get(frmtF28aLatestWklyList.get(i).getParentSbmAreaId()).getParentAreaId())
									.getAreaName().toUpperCase();
						}
						areaName2 = frmtF28aLatestWklyList.get(i).getAreaName();
						immediateParentAreaName2 = sbmAreaIdAreaDomainMap
								.get(frmtF28aLatestWklyList.get(i).getParentSbmAreaId()).getAreaName().toUpperCase();
					}

				}
				/**
				 * Creating PDF cell instance of weekly FormatF28A table and setting its
				 * HorizontalAlignment,BorderColor,MinimumHeight and finally adding it to table
				 * instance
				 */
				PdfPCell hcell;
				hcell = new PdfPCell(
						i != frmtF28aLatestWklyList.size() - 1 ? new PdfPCell(new Phrase(i + 1 + "", headFont))
								: new PdfPCell(new Phrase("\u00A0\u00A0\u00A0", headFont)));
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table2.addCell(hcell);

				if (areaLevelId == 5) {
					hcell = new PdfPCell(new Phrase(districtName2, headFont));
					hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
					hcell.setBorderColor(BaseColor.BLACK);
					hcell.setBackgroundColor(cellBackgroundColor);
					hcell.setMinimumHeight(17f);
					table2.addCell(hcell);
				}
				if (areaLevelId != 3) {
					hcell = new PdfPCell(new Phrase(immediateParentAreaName2, headFont));
					hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
					hcell.setBorderColor(BaseColor.BLACK);
					hcell.setBackgroundColor(cellBackgroundColor);
					hcell.setMinimumHeight(17f);
					table2.addCell(hcell);
				}

				hcell = new PdfPCell(new Phrase(areaName2, headFont));
				hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table2.addCell(hcell);

				Double previousWeekCoveragePercent = frmtF28aLatestWklyList.get(i).getPreviousWeekCoveragePercent();
				hcell = new PdfPCell(previousWeekCoveragePercent != null
						? new PdfPCell(new Phrase(previousWeekCoveragePercent + "%", headFont))
						: new PdfPCell(new Phrase("-", headFont)));
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table2.addCell(hcell);

				hcell = new PdfPCell(new PdfPCell(new Phrase(currentWeekCoveragePercent + "%", headFont)));
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table2.addCell(hcell);

				BigDecimal improvement = frmtF28aLatestWklyList.get(i).getImprovement();
				hcell = new PdfPCell(improvement != null ? new PdfPCell(new Phrase(improvement + "%", headFont))
						: new PdfPCell(new Phrase("-", headFont)));
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table2.addCell(hcell);

				hcell = new PdfPCell(
						new PdfPCell(new Phrase(frmtF28aLatestWklyList.get(i).getBalanceRemaining() + "", headFont)));
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table2.addCell(hcell);

			}

			/**
			 * Adding header paragraph to the document of the PDF which illustrates area for
			 * which PDF is generated. Adding the legend to the document. Adding the Format
			 * F28A table content to the document.
			 */
			document.add(p2);
			document.add(legend);
			document.add(table2);

			/**
			 * *****************Weekly ODF Declaration PDF starts from
			 * here*********************************
			 */
			/**
			 * Checking if the user requesting for GP level consolidating Report then skip
			 * Weekly ODF Declaration PDF and Weekly ODF Verification PDF as it doesn't have
			 * GP data
			 */
			if ((frmtF42LatestWklyList.size() > 1)) {
				/**
				 * New PDF page is initialized for Weekly ODF Declaration PDF
				 */
				document.newPage();

				String areaType3 = "";
				String parentAreaName3 = "";
				String immediateParentAreaName3 = "";
				String parentAreaType3 = "";

				/**
				 * Checking the areaLevelId and assigning the
				 * areaType,ParentAreaName,parentAreaType
				 */
				if (areaLevelId == 3) {
					parentAreaType3 = "State";
					areaType3 = "District";
					parentAreaName3 = frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getAreaName();
				} else if (areaLevelId == 4) {
					parentAreaType3 = "District";
					areaType3 = "Block";
					parentAreaName3 = frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getAreaName();
				} else if (areaLevelId == 5) {
					parentAreaType3 = "Block";
					areaType3 = "Gram Panchayat";
					parentAreaName3 = frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getAreaName();
				}

				/**
				 * Setting the font for the ODF declared PDF in the heading paragraph of the PDF
				 * which illustrates area for which PDF is generated. Setting the alignment and
				 * spacing.
				 */
				Paragraph p3 = new Paragraph("Area:-" + parentAreaName3.toUpperCase() + "    " + areaType3.toUpperCase()
						+ "-" + "ODF DECLARATION STATUS", boldFont);
				p3.setAlignment(Element.ALIGN_CENTER);
				p3.setSpacingAfter(10f);

				/**
				 * Initializing ODF declared PDF table dynamically based on arealevelId Setting
				 * alignment and width percent for the table
				 */
				PdfPTable table3 = new PdfPTable(areaLevelId == 3 ? 7 : 8);
				table3.setWidthPercentage(100); // Width 100%
				table3.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);

				/**
				 * Setting width of columns of initialized ODF declared PDF table dynamically
				 * based on arealevelId
				 */
				float[] columnWidths3 = {};
				if (areaLevelId == 3) {
					float[] columnWidth3 = { 1f, 2.5f, 1f, 1f, 1f, 0.8f, 0.8f };
					columnWidths3 = columnWidth3;
					table3.setWidths(columnWidths3);
				} else {
					float[] columnWidth3 = { 1f, 2.5f, 3f, 1.5f, 1.5f, 1.5f, 1.4f, 1.5f };
					columnWidths3 = columnWidth3;
					table3.setWidths(columnWidths3);
				}

				/**
				 * Setting the ODF declared PDF table header names dynamically based on
				 * arealevelId and add it to table instance
				 */
				table3.addCell(new PdfPCell(new Phrase("Sl No", columnFont)));
				if (areaLevelId != 3)
					table3.addCell(new PdfPCell(new Phrase(parentAreaType3, columnFont)));
				table3.addCell(new PdfPCell(new Phrase(areaType3, columnFont)));
				table3.addCell(new PdfPCell(new Phrase("Total Villages", columnFont)));
				table3.addCell(
						new PdfPCell(
								new Phrase(
										"Odf Declared villages As on"
												+ (!frmtF42LatestWklyList.isEmpty()
														? frmtF42LatestWklyList.get(0).getImprovmentSinceDate() != null
																? new SimpleDateFormat("dd-MM-yyyy")
																		.format(frmtF42LatestWklyList.get(0)
																				.getImprovmentSinceDate())
																: ""
														: "First Time"),
										columnFont)));
				table3.addCell(
						new PdfPCell(
								new Phrase(
										"Odf Declared villages As on "
												+ (!frmtF42LatestWklyList.isEmpty()
														? frmtF42LatestWklyList.get(0).getCreatedDate() != null
																? new SimpleDateFormat("dd-MM-yyyy").format(
																		frmtF42LatestWklyList.get(0).getCreatedDate())
																: ""
														: "First Time"),
										columnFont)));

				table3.addCell(
						new PdfPCell(
								new Phrase(
										"Improvement Since Date "
												+ (!frmtF42LatestWklyList.isEmpty()
														? frmtF42LatestWklyList.get(0).getImprovmentSinceDate() != null
																? new SimpleDateFormat("dd-MM-yyyy")
																		.format(frmtF42LatestWklyList.get(0)
																				.getImprovmentSinceDate())
																: ""
														: "First Time"),
										columnFont)));
				table3.addCell(new PdfPCell(new Phrase("Declaration%", columnFont)));

				/**
				 * Setting the ODF declared PDF table header index number and add it to table
				 * instance
				 */
				for (int i = 0; i < columnWidths3.length; i++)
					table3.addCell(new PdfPCell(new Phrase(i + 1 + "", indexFont)));

				/**
				 * Looping for ODF declared PDF table header row and header index row i.e it
				 * will loop two times
				 */
				for (int i = 0; i <= 1; i++) {
					/**
					 * Setting the ODF declared PDF table header row and header index row as header
					 * so that it can be seen in every page of PDF report
					 */
					table3.setHeaderRows(i + 1);
					/**
					 * Getting the ODF declared PDF table cells of the header row and header index
					 * row as per the loop
					 */
					PdfPCell[] cells3 = table3.getRow(i).getCells();
					/**
					 * Setting background color,border color,horizontal alignment and fixed height
					 * of the ODF declared PDF table header row and header index row as per the loop
					 */
					for (int j = 0; j < cells3.length; j++) {
						cells3[j].setBackgroundColor(new BaseColor(66, 114, 198));
						cells3[j].setBorderColor(BaseColor.BLACK);
						cells3[j].setHorizontalAlignment(Element.ALIGN_CENTER);
						if (i == 0)
							cells3[j].setFixedHeight(45f);
						else
							cells3[j].setFixedHeight(17f);
					}
				}
				/**
				 * Iterating list of latest inserted data from weekly FormatF42Weekly table to
				 * populate the ODF declared PDF table contents
				 */
				for (int i = 0; i < frmtF42LatestWklyList.size(); i++) {
					BaseColor cellBackgroundColor = null;

					/**
					 * Checking if declaration against there threshold values to set the background
					 * color of different rows of ODF declared PDF table content
					 */
					Double declaration = frmtF42LatestWklyList.get(i).getOdfDeclaredVillagesPercentage();
					int declarationZeroToFiftyComp = Double.compare(declaration, new Double(50.00));
					int declarationFiftyToEightyComp = Double.compare(declaration, new Double(80.00));
					int declarationEightyToHundredComp = Double.compare(declaration, new Double(100.00));

					if (declarationZeroToFiftyComp < 0 && i != frmtF42LatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(255, 179, 179);// if progress percent <50(red)
					else if ((declarationZeroToFiftyComp >= 0 && declarationFiftyToEightyComp < 0)
							&& i != frmtF42LatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(255, 217, 179); // if progress percent 50-79.99(yellow)
					else if ((declarationFiftyToEightyComp >= 0 && declarationEightyToHundredComp < 0)
							&& i != frmtF42LatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(153, 230, 153); // if progress percent 80-99.99(light green)
					else if (declarationEightyToHundredComp == 0 && i != frmtF42LatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(111, 220, 111); // if progress percent 100(dark green)
					String areaName3 = "";

					/**
					 * Checking if current iteration is the last iteration then leave
					 * immediateParentAreaName as blank and set areaName and cellBackgroundColor
					 */
					if (i == frmtF42LatestWklyList.size() - 1) {
						immediateParentAreaName3 = "\u00A0\u00A0\u00A0";
						areaName3 = "TOTAL";
						cellBackgroundColor = new BaseColor(220, 221, 231);// color of total(last row)
					}
					/**
					 * Checking if current iteration is the not the last iteration then set areaName
					 * ,immediateParentAreaName
					 */
					else {
						/*
						 * if (areaLevelId == 3||areaLevelId == 4||areaLevelId == 5) {
						 */
						areaName3 = frmtF42LatestWklyList.get(i).getAreaName();
						immediateParentAreaName3 = sbmAreaIdAreaDomainMap.get(
								sbmAreaIdAreaDomainMap.get(frmtF42LatestWklyList.get(i).getAreaId()).getParentAreaId())
								.getAreaName().toUpperCase();

					}

					/**
					 * Creating PDF cell instance and setting its HorizontalAlignment,BorderColor,
					 * MinimumHeight and finally adding it to ODF declared PDF table instance
					 */
					PdfPCell hcell;
					hcell = new PdfPCell(
							i != frmtF42LatestWklyList.size() - 1 ? new PdfPCell(new Phrase(i + 1 + "", headFont))
									: new PdfPCell(new Phrase("\u00A0\u00A0\u00A0", headFont)));
					hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
					hcell.setBorderColor(BaseColor.BLACK);
					hcell.setBackgroundColor(cellBackgroundColor);
					hcell.setMinimumHeight(17f);
					table3.addCell(hcell);

					if (areaLevelId != 3) {
						hcell = new PdfPCell(new Phrase(immediateParentAreaName3, headFont));
						hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setBackgroundColor(cellBackgroundColor);
						hcell.setMinimumHeight(17f);
						table3.addCell(hcell);
					}

					hcell = new PdfPCell(new Phrase(areaName3, headFont));
					hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
					hcell.setBorderColor(BaseColor.BLACK);
					hcell.setBackgroundColor(cellBackgroundColor);
					hcell.setMinimumHeight(17f);
					table3.addCell(hcell);

					hcell = new PdfPCell(new PdfPCell(
							new Phrase(frmtF42LatestWklyList.get(i).getOdfDeclaredTotalVillages() + "", headFont)));
					hcell.setBorderColor(BaseColor.BLACK);
					hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
					hcell.setBackgroundColor(cellBackgroundColor);
					hcell.setMinimumHeight(17f);
					table3.addCell(hcell);

					Integer previousWeekOdfDeclaredTotalVillages = frmtF42LatestWklyList.get(i)
							.getOdfDeclaredVillagesOnPreviousWeek();
					hcell = new PdfPCell(previousWeekOdfDeclaredTotalVillages != null
							? new PdfPCell(new Phrase(previousWeekOdfDeclaredTotalVillages + "", headFont))
							: new PdfPCell(new Phrase("-", headFont)));
					hcell.setBorderColor(BaseColor.BLACK);
					hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
					hcell.setBackgroundColor(cellBackgroundColor);
					hcell.setMinimumHeight(17f);
					table3.addCell(hcell);

					hcell = new PdfPCell(new PdfPCell(new Phrase(
							frmtF42LatestWklyList.get(i).getOdfDeclaredVillagesOnCurrentWeek() + "", headFont)));
					hcell.setBorderColor(BaseColor.BLACK);
					hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
					hcell.setBackgroundColor(cellBackgroundColor);
					hcell.setMinimumHeight(17f);
					table3.addCell(hcell);

					Integer improvement = frmtF42LatestWklyList.get(i).getOdfDeclaredVillagesimprovment();
					hcell = new PdfPCell(improvement != null ? new PdfPCell(new Phrase(improvement + "", headFont))
							: new PdfPCell(new Phrase("-", headFont)));
					hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
					hcell.setBorderColor(BaseColor.BLACK);
					hcell.setBackgroundColor(cellBackgroundColor);
					hcell.setMinimumHeight(17f);
					table3.addCell(hcell);

					hcell = new PdfPCell(declaration != null ? new PdfPCell(new Phrase(declaration + "%", headFont))
							: new PdfPCell(new Phrase("-", headFont)));
					hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
					hcell.setBorderColor(BaseColor.BLACK);
					hcell.setBackgroundColor(cellBackgroundColor);
					hcell.setMinimumHeight(17f);
					table3.addCell(hcell);

				}
				/**
				 * Adding header paragraph to the document of the ODF declared PDF which
				 * illustrates area for which PDF is generated. Adding the legend to the
				 * document. Adding the ODF declared PDF table to the document. New PDF page is
				 * initialized for Weekly ODF Verification PDF
				 */
				document.add(p3);
				document.add(legend);
				document.add(table3);
				document.newPage();

				String areaType4 = "";
				String parentAreaName4 = "";
				String immediateParentAreaName4 = "";
				String parentAreaType4 = "";

				/**
				 * Checking the areaLevelId and assigning the
				 * areaType,ParentAreaName,parentAreaType
				 */
				if (areaLevelId == 3) {
					parentAreaType4 = "State";
					areaType4 = "District";
					parentAreaName4 = frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getAreaName();
				} else if (areaLevelId == 4) {
					parentAreaType4 = "District";
					areaType4 = "Block";
					parentAreaName4 = frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getAreaName();
				} else if (areaLevelId == 5) {
					parentAreaType4 = "Block";
					areaType4 = "Gram Panchayat";
					parentAreaName4 = frmtF42LatestWklyList.get(frmtF42LatestWklyList.size() - 1).getAreaName();
				}

				/**
				 * Setting the font in the heading paragraph of the ODF Verified PDF which
				 * illustrates area for which PDF is generated. Setting the alignment and
				 * spacing.
				 */
				Paragraph p4 = new Paragraph("Area:-" + parentAreaName4.toUpperCase() + "    " + areaType4.toUpperCase()
						+ "-" + "ODF VERIFICATION STATUS", boldFont);
				p4.setAlignment(Element.ALIGN_CENTER);
				p4.setSpacingAfter(10f);

				/**
				 * Initializing ODF Verified PDF table dynamically based on arealevelId Setting
				 * alignment and width percent for the table
				 */
				PdfPTable table4 = new PdfPTable(areaLevelId == 3 ? 7 : 8);
				table4.setWidthPercentage(100); // Width 100%
				table4.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);

				/**
				 * Setting width of table columns of initialized ODF Verified PDF table
				 * dynamically based on arealevelId
				 */
				float[] columnWidths4 = {};
				if (areaLevelId == 3) {
					float[] columnWidth4 = { 1f, 2.5f, 1f, 1f, 1f, 0.8f, 0.8f };
					columnWidths4 = columnWidth4;
					table4.setWidths(columnWidths4);
				} else {
					float[] columnWidth4 = { 1f, 2.5f, 3f, 1.5f, 1.5f, 1.5f, 1.4f, 1.5f };
					columnWidths4 = columnWidth4;
					table4.setWidths(columnWidths4);
				}

				/**
				 * Setting the ODF Verified PDF table header names dynamically based on
				 * arealevelId and add it to table instance
				 */
				table4.addCell(new PdfPCell(new Phrase("Sl No", columnFont)));
				if (areaLevelId != 3)
					table4.addCell(new PdfPCell(new Phrase(parentAreaType4, columnFont)));
				table4.addCell(new PdfPCell(new Phrase(areaType4, columnFont)));
				table4.addCell(new PdfPCell(new Phrase("Odf Declared Villages", columnFont)));
				table4.addCell(new PdfPCell(
						new Phrase("Odf Verified villages As on" + (!frmtF42LatestOdfVerifiedWklyList.isEmpty()
								? frmtF42LatestOdfVerifiedWklyList.get(0).getImprovmentSinceDate() != null
										? new SimpleDateFormat("dd-MM-yyyy").format(
												frmtF42LatestOdfVerifiedWklyList.get(0).getImprovmentSinceDate())
										: ""
								: "First Time"), columnFont)));
				table4.addCell(new PdfPCell(
						new Phrase("Odf Verified villages As on " + (!frmtF42LatestOdfVerifiedWklyList.isEmpty()
								? frmtF42LatestOdfVerifiedWklyList.get(0).getCreatedDate() != null
										? new SimpleDateFormat("dd-MM-yyyy")
												.format(frmtF42LatestOdfVerifiedWklyList.get(0).getCreatedDate())
										: ""
								: "First Time"), columnFont)));

				table4.addCell(
						new PdfPCell(new Phrase("Improvement Since Date " + (!frmtF42LatestOdfVerifiedWklyList.isEmpty()
								? frmtF42LatestOdfVerifiedWklyList.get(0).getImprovmentSinceDate() != null
										? new SimpleDateFormat("dd-MM-yyyy").format(
												frmtF42LatestOdfVerifiedWklyList.get(0).getImprovmentSinceDate())
										: ""
								: "First Time"), columnFont)));
				table4.addCell(new PdfPCell(new Phrase("Verification%", columnFont)));

				/**
				 * Setting the ODF Verified PDF table header index number and add it to table
				 * instance
				 */
				for (int i = 0; i < columnWidths4.length; i++)
					table4.addCell(new PdfPCell(new Phrase(i + 1 + "", indexFont)));

				/**
				 * Looping for ODF Verified PDF header row and header index row i.e it will loop
				 * two times
				 */
				for (int i = 0; i <= 1; i++) {
					/**
					 * Setting the ODF Verified PDF header row and header index row as header so
					 * that it can be seen in every page of PDF report
					 */
					table4.setHeaderRows(i + 1);
					/**
					 * Getting the cells of the ODF Verified PDF header row and header index row as
					 * per the loop
					 */
					PdfPCell[] cells4 = table4.getRow(i).getCells();
					/**
					 * Setting background color,border color,horizontal alignment and fixed height
					 * of ODF Verified PDF header row and header index row as per the loop
					 */
					for (int j = 0; j < cells4.length; j++) {
						cells4[j].setBackgroundColor(new BaseColor(66, 114, 198));
						cells4[j].setBorderColor(BaseColor.BLACK);
						cells4[j].setHorizontalAlignment(Element.ALIGN_CENTER);
						if (i == 0)
							cells4[j].setFixedHeight(45f);
						else
							cells4[j].setFixedHeight(17f);
					}
				}
				/**
				 * Iterating list of latest inserted data from weekly FormatF42Weekly table to
				 * populate the PDF table contents
				 */
				for (int i = 0; i < frmtF42LatestOdfVerifiedWklyList.size(); i++) {
					BaseColor cellBackgroundColor = null;
					/**
					 * Checking if verification against there threshold values to set the background
					 * color of different rows of ODF Verified PDF table content
					 */
					Double verification = frmtF42LatestOdfVerifiedWklyList.get(i)
							.getVerifiedOdfDeclaredVillagesPercentage();
					int verificationPercentZeroToFiftyComp = Double.compare(verification, new Double(50.00));
					int verificationPercentFiftyToEightyComp = Double.compare(verification, new Double(80.00));
					int verificationPercentEightyToHundredComp = Double.compare(verification, new Double(100.00));
					if (verificationPercentZeroToFiftyComp < 0 && i != frmtF42LatestWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(255, 179, 179);// if progress percent <50(red)
					else if ((verificationPercentZeroToFiftyComp >= 0 && verificationPercentFiftyToEightyComp < 0)
							&& i != frmtF42LatestOdfVerifiedWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(255, 217, 179); // if progress percent 50-79.99(yellow)
					else if ((verificationPercentFiftyToEightyComp >= 0 && verificationPercentEightyToHundredComp < 0)
							&& i != frmtF42LatestOdfVerifiedWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(153, 230, 153); // if progress percent 80-99.99(light green)
					else if (verificationPercentEightyToHundredComp == 0
							&& i != frmtF42LatestOdfVerifiedWklyList.size() - 1)
						cellBackgroundColor = new BaseColor(111, 220, 111); // if progress percent 100(dark green)
					String areaName4 = "";

					/**
					 * Checking if current iteration is the last iteration then leave
					 * immediateParentAreaName as blank and set areaName and cellBackgroundColor
					 */
					if (i == frmtF42LatestOdfVerifiedWklyList.size() - 1) {
						immediateParentAreaName4 = "\u00A0\u00A0\u00A0";
						areaName4 = "TOTAL";
						cellBackgroundColor = new BaseColor(220, 221, 231);// color of total(last row)
					}

					/**
					 * Checking if current iteration is the not the last iteration then set areaName
					 * ,immediateParentAreaName
					 */
					else {
						/*
						 * if (areaLevelId == 3||areaLevelId == 4||areaLevelId == 5) {
						 */
						immediateParentAreaName4 = sbmAreaIdAreaDomainMap.get(
								sbmAreaIdAreaDomainMap.get(frmtF42LatestWklyList.get(i).getAreaId()).getParentAreaId())
								.getAreaName().toUpperCase();
						areaName4 = frmtF42LatestOdfVerifiedWklyList.get(i).getAreaName();

					}
					/**
					 * Creating ODF Verified PDF table content cell instance and setting its
					 * HorizontalAlignment,BorderColor,MinimumHeight and finally adding it to table
					 * instance
					 */
					PdfPCell hcell;
					hcell = new PdfPCell(i != frmtF42LatestOdfVerifiedWklyList.size() - 1
							? new PdfPCell(new Phrase(i + 1 + "", headFont))
							: new PdfPCell(new Phrase("\u00A0\u00A0\u00A0", headFont)));
					hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
					hcell.setBorderColor(BaseColor.BLACK);
					hcell.setBackgroundColor(cellBackgroundColor);
					hcell.setMinimumHeight(17f);
					table4.addCell(hcell);

					if (areaLevelId != 3) {
						hcell = new PdfPCell(new Phrase(immediateParentAreaName4, headFont));
						hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
						hcell.setBorderColor(BaseColor.BLACK);
						hcell.setBackgroundColor(cellBackgroundColor);
						hcell.setMinimumHeight(17f);
						table4.addCell(hcell);
					}

					hcell = new PdfPCell(new Phrase(areaName4, headFont));
					hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
					hcell.setBorderColor(BaseColor.BLACK);
					hcell.setBackgroundColor(cellBackgroundColor);
					hcell.setMinimumHeight(17f);
					table4.addCell(hcell);

					hcell = new PdfPCell(new PdfPCell(new Phrase(
							frmtF42LatestOdfVerifiedWklyList.get(i).getVerifiedOdfDeclaredTotalVillages() + "",
							headFont)));
					hcell.setBorderColor(BaseColor.BLACK);
					hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
					hcell.setBackgroundColor(cellBackgroundColor);
					hcell.setMinimumHeight(17f);
					table4.addCell(hcell);

					Integer previousWeekOdfVerifiedTotalVillages = frmtF42LatestOdfVerifiedWklyList.get(i)
							.getVerifiedOdfDeclaredVillagesOnPreviousWeek();
					hcell = new PdfPCell(previousWeekOdfVerifiedTotalVillages != null
							? new PdfPCell(new Phrase(previousWeekOdfVerifiedTotalVillages + "", headFont))
							: new PdfPCell(new Phrase("-", headFont)));
					hcell.setBorderColor(BaseColor.BLACK);
					hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
					hcell.setBackgroundColor(cellBackgroundColor);
					hcell.setMinimumHeight(17f);
					table4.addCell(hcell);

					hcell = new PdfPCell(new PdfPCell(new Phrase(
							frmtF42LatestOdfVerifiedWklyList.get(i).getVerifiedOdfDeclaredVillagesOnCurrentWeek() + "",
							headFont)));
					hcell.setBorderColor(BaseColor.BLACK);
					hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
					hcell.setBackgroundColor(cellBackgroundColor);
					hcell.setMinimumHeight(17f);
					table4.addCell(hcell);

					Integer improvement = frmtF42LatestOdfVerifiedWklyList.get(i)
							.getVerifiedOdfDeclaredVillagesimprovment();
					hcell = new PdfPCell(improvement != null ? new PdfPCell(new Phrase(improvement + "", headFont))
							: new PdfPCell(new Phrase("-", headFont)));
					hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
					hcell.setBorderColor(BaseColor.BLACK);
					hcell.setBackgroundColor(cellBackgroundColor);
					hcell.setMinimumHeight(17f);
					table4.addCell(hcell);

					hcell = new PdfPCell(verification != null ? new PdfPCell(new Phrase(verification + "%", headFont))
							: new PdfPCell(new Phrase("-", headFont)));
					hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
					hcell.setBorderColor(BaseColor.BLACK);
					hcell.setBackgroundColor(cellBackgroundColor);
					hcell.setMinimumHeight(17f);
					table4.addCell(hcell);

				}
				/**
				 * Adding header paragraph to the document of the ODF Verified PDF which
				 * illustrates area for which PDF is generated. Adding the legend to the
				 * document. Adding the ODF Verified PDF table content to the document.
				 */
				document.add(p4);
				document.add(legend);
				document.add(table4);
			}
			/**
			 * Closing the document.
			 */
			document.close();

			/**
			 * Reading the properties value from application.properties file of the report
			 * location path make directory if doesn't exist
			 */
			String dir = configurableEnvironment.getProperty("report.path");
			File file = new File(dir);
			if (!file.exists())
				file.mkdirs();

			/**
			 * Getting the area name for which report is generated. Append the area name and
			 * report creation time with postfixed as .pdf Pass the resultant PDF report
			 * path as abstract pathname to OutputStream constructor. All the costly
			 * resources are closed
			 */
			String areaName = parentAreaId > 5 ? area.getAreaName()
					: parentAreaId == 4 ? "All_Blocks" : parentAreaId == 5 ? "All_Gps" : "anonymous";
			String name = areaName + "_" + new SimpleDateFormat("ddMMyyyyHHmmssSSSSSSS").format(new Date()) + ".pdf";
			outputPath = dir + "" + name;
			OutputStream fos = new FileOutputStream(new File(outputPath));
			out.writeTo(fos);
			out.close();
			fos.close();

		} catch (Exception e) {
			log.error("Action : Error while Generating Weekly Consolidate Pdf Report", e);
			e.printStackTrace();
		}
		return new Gson().toJson(outputPath);

	}

	/**
	 * Generates Daily JSON data for Supply Chain Excel Report based on some
	 * calculations on the fly
	 * 
	 * @param parentAreaId it can be referred to sbmAreaId or areaLevel
	 * @param areaLevel    if not null then get all gps of @param parentAreaId
	 * 
	 * @return dailySupplyChainExcelDataList list of JSON data map
	 * 
	 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
	 */
	@Override
	public List<Map<String, String>> getDailySupplyChainExcelData(Integer parentAreaId, Integer areaLevel) {
		/**
		 * Fetching all Ihhl Raw Materials Requirement details from
		 * IhhlRawMaterialsRequirement table and setting in a map
		 */
		List<IhhlRawMaterialsRequirement> IhhlRawMaterialsRequirementList = ihhlRawMaterialRequirementRepository
				.findAll();
		Map<Integer, String> IhhlRawMaterialsRequirementmap = new LinkedHashMap<Integer, String>();
		for (IhhlRawMaterialsRequirement ihhlRawMaterialsRequirement : IhhlRawMaterialsRequirementList) {
			IhhlRawMaterialsRequirementmap.put(ihhlRawMaterialsRequirement.getId(),
					ihhlRawMaterialsRequirement.getQuantity());
		}

		/**
		 * Declaring a list to populate later by customizing raw list of data
		 */
		List<Map<String, String>> dailySupplyChainExcelDataList = new ArrayList<Map<String, String>>();

		/**
		 * Fetching list of latest inserted data from daily formatA03 table by passing
		 * combination of sbmAreaId/areaLevel or sbmAreaId and areaLevel
		 */
		List<FormatA03> latestFormatA03DataListOfAllAreas = areaLevel != null
				? formatAO3Repository.findLatestDataListOfAllGpsByDistrictId(parentAreaId)
				: parentAreaId > 5 ? formatAO3Repository.findLatestDataListOfAllAreasByParentId(parentAreaId)
						: formatAO3Repository.findLatestDataListOfAllAreasByAreaLevelId(parentAreaId);

		/**
		 * Fetching list of all areas detail from area table and populating a map
		 */
		List<Area> allArea = areaRepository.findAll();
		Map<Integer, Area> sbmAreaIdAreaDomainMap = new LinkedHashMap<Integer, Area>();
		for (Area area : allArea) {
			sbmAreaIdAreaDomainMap.put(area.getSbmAreaId(), area);
		}
		Integer counter = 0;

		/**
		 * Iterating the fetched list
		 */
		for (FormatA03 formatA03 : latestFormatA03DataListOfAllAreas) {
			String areaType = null;
			String areaName = null;
			String parentAreaName = null;
			String parentAreaType = null;
			String districtName = null;
			counter++;

			/**
			 * Getting the areaLevelId of the first index domain of fetched list of latest
			 * inserted data from daily formatA03 table
			 */
			Integer areaLevelId = latestFormatA03DataListOfAllAreas.get(0).getAreaLevelId();

			/**
			 * Checking the areaLevelId and assigning the
			 * areaType,areaName,ParentAreaName,parentAreaType
			 */
			if (areaLevelId == 3) {
				areaType = "District";
				parentAreaType = "State";
				areaName = formatA03.getDistrictName() != null ? formatA03.getDistrictName() : "";
				parentAreaName = formatA03.getStateName() != null ? formatA03.getStateName() : "";
			} else if (areaLevelId == 4) {
				areaType = "Block";
				parentAreaType = "District";
				areaName = formatA03.getBlockName() != null ? formatA03.getBlockName() : "";
				parentAreaName = formatA03.getDistrictName() != null ? formatA03.getDistrictName() : "";
			} else if (areaLevelId == 5) {
				areaType = "Gram Panchayat";
				parentAreaType = "Block";
				areaName = formatA03.getGpName() != null ? formatA03.getGpName() : "";
				parentAreaName = formatA03.getBlockName() != null ? formatA03.getBlockName() : "";
				districtName = formatA03.getDistrictName() != null ? formatA03.getDistrictName() : "";
			}

			/**
			 * Started to populate the map and add it in a list
			 */
			Map<String, String> map = new LinkedHashMap<String, String>();
			map.put("Sl. No.", String.valueOf(counter));
			if (areaLevelId == 5)
				map.put("District", districtName);
			if (areaLevelId != 3)
				map.put(parentAreaType, parentAreaName);
			map.put(areaType, String.valueOf(areaName));
			map.put("Balance Uncovered", String.valueOf(formatA03.getCoverageHHBalanceUncovered()));
			map.put("Brick Pieces", String.valueOf(Integer.parseInt(IhhlRawMaterialsRequirementmap.get(1))
					* formatA03.getCoverageHHBalanceUncovered()));
			map.put("Cement Bags", String.valueOf(Integer.parseInt(IhhlRawMaterialsRequirementmap.get(2))
					* formatA03.getCoverageHHBalanceUncovered()));
			map.put("Rcc Rings Nos", String.valueOf(Integer.parseInt(IhhlRawMaterialsRequirementmap.get(3))
					* formatA03.getCoverageHHBalanceUncovered()));
			map.put("Labour Man Days", String.valueOf(Integer.parseInt(IhhlRawMaterialsRequirementmap.get(7))
					* formatA03.getCoverageHHBalanceUncovered()));
			map.put("Masons Man Days",
					String.valueOf(Double.parseDouble(IhhlRawMaterialsRequirementmap.get(8).split("-")[0])
							* formatA03.getCoverageHHBalanceUncovered() + "-"
							+ Integer.parseInt(IhhlRawMaterialsRequirementmap.get(8).split("-")[1])
									* formatA03.getCoverageHHBalanceUncovered()));
			map.put("Sand Bags", String.valueOf(Integer.parseInt(IhhlRawMaterialsRequirementmap.get(9))
					* formatA03.getCoverageHHBalanceUncovered()));

			/**
			 * add the map in the list
			 */
			dailySupplyChainExcelDataList.add(map);
		}
		return dailySupplyChainExcelDataList;

	}

	/**
	 * Generates Daily Supply Chain PDF Report based on some calculations on the fly
	 * 
	 * @param parentAreaId       it can be referred to sbmAreaId or areaLevel
	 * @param request            to set the domain name i.e source of the PDF
	 *                           generated
	 * @param areaLevelForAllGps if not null then get all gps of @param parentAreaId
	 * 
	 * @return outputPath location of the PDF generated
	 * 
	 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
	 */
	@Override
	public String getDailySupplyChainPdfReport(Integer parentAreaId, Integer areaLevelForAllGps,
			HttpServletRequest request) {

		/**
		 * Fetching all Ihhl Raw Materials Requirement details from
		 * IhhlRawMaterialsRequirement table and setting in a map
		 */
		List<IhhlRawMaterialsRequirement> IhhlRawMaterialsRequirementList = ihhlRawMaterialRequirementRepository
				.findAll();
		Map<Integer, String> IhhlRawMaterialsRequirementmap = new LinkedHashMap<Integer, String>();
		for (IhhlRawMaterialsRequirement ihhlRawMaterialsRequirement : IhhlRawMaterialsRequirementList) {
			IhhlRawMaterialsRequirementmap.put(ihhlRawMaterialsRequirement.getId(),
					ihhlRawMaterialsRequirement.getQuantity());
		}
		/**
		 * Fetching area details from area table by sbmAreaId
		 */
		Area area = areaRepository.findBySbmAreaId(parentAreaId);
		String outputPath = null;
		/**
		 * Setting PDF document of A4 size in landscape mode
		 */
		Document document = new Document(PageSize.A4.rotate());
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		try {

			/**
			 * Fetching list of latest inserted data from daily formatA03 table by passing
			 * combination of sbmAreaId/areaLevelId or sbmAreaId and areaLevelForAllGps
			 */
			List<FormatA03> latestFormatA03DataListOfAllAreas = areaLevelForAllGps != null
					? formatAO3Repository.findLatestDataListOfAllGpsByDistrictId(parentAreaId)
					: parentAreaId > 5 ? formatAO3Repository.findLatestDataListOfAllAreasByParentId(parentAreaId)
							: formatAO3Repository.findLatestDataListOfAllAreasByAreaLevelId(parentAreaId);

			/**
			 * Getting the areaLevelId and timestamp of the first index domain of fetched
			 * list of latest inserted data from daily formatA03 table
			 */
			Integer areaLevelId = latestFormatA03DataListOfAllAreas.get(0).getAreaLevelId();
			String createdDate = new SimpleDateFormat("dd-MM-yyyy")
					.format(latestFormatA03DataListOfAllAreas.get(0).getCreatedDate());

			/**
			 * setting domain name from where PDF is being generated
			 */
			String uri = request.getRequestURI();
			String domainName = request.getRequestURL().toString();
			String ctxPath = request.getContextPath();
			domainName = domainName.replaceFirst(uri, "");
			domainName += ctxPath;

			/**
			 * Setting margins of the PDF. Setting the header and footer of the PDF.
			 * Compressing the PDF document to the fullest possible.
			 */
			PdfWriter writer = PdfWriter.getInstance(document, out);
			document.setMargins(document.leftMargin(), document.rightMargin(), 0, document.bottomMargin());
			HeaderFooter headerFooter = new HeaderFooter(context, "Daily", createdDate, domainName);
			writer.setPageEvent(headerFooter);
			writer.setFullCompression();

			String districtName = "";
			String areaType = "";
			String parentAreaName = "";
			String immediateParentAreaName = "";
			String parentAreaType = "";

			/**
			 * Checking the areaLevelId and assigning the
			 * areaType,ParentAreaName,parentAreaType
			 */
			if (areaLevelId == 3) {
				parentAreaType = "State";
				areaType = "District";
				parentAreaName = latestFormatA03DataListOfAllAreas.get(latestFormatA03DataListOfAllAreas.size() - 1)
						.getStateName();
			} else if (areaLevelId == 4) {
				parentAreaType = "District";
				areaType = "Block";
				parentAreaName = parentAreaId > 5
						? latestFormatA03DataListOfAllAreas.get(latestFormatA03DataListOfAllAreas.size() - 1)
								.getDistrictName()
						: latestFormatA03DataListOfAllAreas.get(latestFormatA03DataListOfAllAreas.size() - 1)
								.getStateName();
			} else if (areaLevelId == 5) {
				parentAreaType = "Block";
				areaType = "Gram Panchayat";
				parentAreaName = areaLevelForAllGps != null ? area.getAreaName()
						: parentAreaId > 5
								? latestFormatA03DataListOfAllAreas.get(latestFormatA03DataListOfAllAreas.size() - 1)
										.getBlockName()
								: latestFormatA03DataListOfAllAreas.get(latestFormatA03DataListOfAllAreas.size() - 1)
										.getStateName();
			}

			/**
			 * Setting font size and type. Setting the font in the heading paragraph of the
			 * PDF which illustrates area for which PDF is generated. Setting the alignment
			 * and spacing.
			 */
			Font boldFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD);
			Paragraph p = new Paragraph(
					"Area:-" + parentAreaName + "    " + areaType.toUpperCase() + "-" + "WISE SUPPLY CHAIN STATUS",
					boldFont);
			p.setAlignment(Element.ALIGN_CENTER);
			p.setSpacingAfter(10f);

			Font createdDateFont = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Paragraph createdDatePara = new Paragraph(
					"Created Date:" + new SimpleDateFormat("dd-MM-yyyy").format(new Date()), createdDateFont);
			createdDatePara.setAlignment(Element.ALIGN_RIGHT);
			createdDatePara.setSpacingBefore(13f);

			/**
			 * Initializing PDF table dynamically based on arealevelId Setting alignment and
			 * width percent for the table
			 */
			PdfPTable table = new PdfPTable(areaLevelId == 5 ? 11 : areaLevelId == 3 ? 9 : 10);
			table.setWidthPercentage(100f); // Width 100%
			table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);

			/**
			 * Setting width of columns of initialized PDF table dynamically based on
			 * arealevelId
			 */
			float[] columnWidths = {};
			if (areaLevelId == 5) {
				float[] columnWidth = { 15f, 45f, 45f, 50f, 35f, 25f, 25f, 20f, 25f, 35f, 20f };
				columnWidths = columnWidth;
				table.setWidths(columnWidths);
			} else if (areaLevelId == 3) {
				float[] columnWidth = { 15f, 45f, 35f, 25f, 25f, 20f, 22f, 35f, 20f };
				columnWidths = columnWidth;
				table.setWidths(columnWidths);
			} else {
				float[] columnWidth = { 15f, 45f, 45f, 35f, 25f, 25f, 20f, 22f, 35f, 20f };
				columnWidths = columnWidth;
				table.setWidths(columnWidths);
			}

			/**
			 * Setting font size and type of PDF table header,header index number and body
			 * contents
			 */
			float fntSize = 10f;
			float columnfntSize = 11f;
			Font columnFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, columnfntSize, BaseColor.WHITE);
			Font headFont = FontFactory.getFont(FontFactory.HELVETICA, fntSize);
			Font indexFont = FontFactory.getFont(FontFactory.HELVETICA, fntSize, BaseColor.WHITE);

			/**
			 * Setting the PDF table header names dynamically based on arealevelId and add
			 * it to table instance
			 */
			table.addCell(new PdfPCell(new Phrase("Sl. No.", columnFont)));
			if (areaLevelId == 5)
				table.addCell(new PdfPCell(new Phrase("District", columnFont)));
			if (areaLevelId != 3)
				table.addCell(new PdfPCell(new Phrase(parentAreaType, columnFont)));
			table.addCell(new PdfPCell(new Phrase(areaType, columnFont)));
			table.addCell(new PdfPCell(new Phrase("Balance Uncovered", columnFont)));
			table.addCell(new PdfPCell(new Phrase("Brick Pieces", columnFont)));
			table.addCell(new PdfPCell(new Phrase("Cement Bags", columnFont)));
			table.addCell(new PdfPCell(new Phrase("Rcc Rings Nos", columnFont)));
			table.addCell(new PdfPCell(new Phrase("Labour Man Days", columnFont)));
			table.addCell(new PdfPCell(new Phrase("Masons Man Days", columnFont)));
			table.addCell(new PdfPCell(new Phrase("Sand Bags", columnFont)));

			/**
			 * Setting the PDF table header index number and add it to table instance
			 */
			for (int i = 0; i < columnWidths.length; i++)
				table.addCell(new PdfPCell(new Phrase(i + 1 + "", indexFont)));

			/**
			 * Looping for header row and header index row i.e it will loop two times
			 */
			for (int i = 0; i <= 1; i++) {
				/**
				 * Setting the header row and header index row as header so that it can be seen
				 * in every page of PDF report
				 */
				table.setHeaderRows(i + 1);
				/**
				 * Getting the cells of the header row and header index row as per the loop
				 */
				PdfPCell[] cells = table.getRow(i).getCells();
				/**
				 * Setting background color,border color,horizontal alignment and fixed height
				 * of the header row and header index row as per the loop
				 */
				for (int j = 0; j < cells.length; j++) {
					cells[j].setBackgroundColor(new BaseColor(66, 114, 198));
					cells[j].setBorderColor(BaseColor.BLACK);
					cells[j].setHorizontalAlignment(Element.ALIGN_CENTER);
				}
			}

			/**
			 * Iterating list of latest inserted data from daily FormatA03 table to populate
			 * the PDF table contents
			 */
			for (int i = 0; i < latestFormatA03DataListOfAllAreas.size(); i++) {
				BaseColor cellBackgroundColor = null;

				String areaName = "";

				/**
				 * Checking if current iteration is the last iteration then leave districtName
				 * ,immediateParentAreaName as blank and set areaName and cellBackgroundColor
				 */
				if (i == latestFormatA03DataListOfAllAreas.size() - 1) {
					districtName = "\u00A0\u00A0\u00A0";
					immediateParentAreaName = "\u00A0\u00A0\u00A0";
					areaName = "TOTAL";
					cellBackgroundColor = new BaseColor(220, 221, 231);// color of total(last row)
				}

				/**
				 * Checking if current iteration is the not the last iteration then set areaName
				 * ,immediateParentAreaName and districtName
				 */
				else {

					if (areaLevelId == 3) {
						areaName = latestFormatA03DataListOfAllAreas.get(i).getDistrictName();
						immediateParentAreaName = latestFormatA03DataListOfAllAreas.get(i).getStateName();
					} else if (areaLevelId == 4) {
						areaName = latestFormatA03DataListOfAllAreas.get(i).getBlockName();
						immediateParentAreaName = latestFormatA03DataListOfAllAreas.get(i).getDistrictName();
					} else if (areaLevelId == 5) {
						areaName = latestFormatA03DataListOfAllAreas.get(i).getGpName();
						immediateParentAreaName = latestFormatA03DataListOfAllAreas.get(i).getBlockName();
						districtName = latestFormatA03DataListOfAllAreas.get(i).getDistrictName();
					}

				}
				/**
				 * Creating PDF cell instance,performing calculation and setting its
				 * HorizontalAlignment,BorderColor, MinimumHeight and finally adding it to table
				 * instance
				 */
				PdfPCell hcell;
				hcell = new PdfPCell(i != latestFormatA03DataListOfAllAreas.size() - 1
						? new PdfPCell(new Phrase(i + 1 + "", headFont))
						: new PdfPCell(new Phrase("\u00A0\u00A0\u00A0", headFont)));
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

				if (areaLevelId == 5) {
					hcell = new PdfPCell(new Phrase(districtName, headFont));
					hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
					hcell.setBorderColor(BaseColor.BLACK);
					hcell.setBackgroundColor(cellBackgroundColor);
					hcell.setMinimumHeight(17f);
					table.addCell(hcell);
				}
				if (areaLevelId != 3) {
					hcell = new PdfPCell(new Phrase(immediateParentAreaName, headFont));
					hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
					hcell.setBorderColor(BaseColor.BLACK);
					hcell.setBackgroundColor(cellBackgroundColor);
					hcell.setMinimumHeight(17f);
					table.addCell(hcell);
				}

				hcell = new PdfPCell(new Phrase(areaName, headFont));
				hcell.setHorizontalAlignment(Element.ALIGN_LEFT);
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

				hcell = new PdfPCell(new PdfPCell(new Phrase(
						latestFormatA03DataListOfAllAreas.get(i).getCoverageHHBalanceUncovered() + "", headFont)));
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

				hcell = new PdfPCell(new PdfPCell(new Phrase(
						Integer.parseInt(IhhlRawMaterialsRequirementmap.get(1))
								* latestFormatA03DataListOfAllAreas.get(i).getCoverageHHBalanceUncovered() + "",
						headFont)));
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

				hcell = new PdfPCell(new PdfPCell(new Phrase(
						Integer.parseInt(IhhlRawMaterialsRequirementmap.get(2))
								* latestFormatA03DataListOfAllAreas.get(i).getCoverageHHBalanceUncovered() + "",
						headFont)));
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

				hcell = new PdfPCell(new PdfPCell(new Phrase(
						Integer.parseInt(IhhlRawMaterialsRequirementmap.get(3))
								* latestFormatA03DataListOfAllAreas.get(i).getCoverageHHBalanceUncovered() + "",
						headFont)));
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

				hcell = new PdfPCell(new PdfPCell(new Phrase(
						Integer.parseInt(IhhlRawMaterialsRequirementmap.get(7))
								* latestFormatA03DataListOfAllAreas.get(i).getCoverageHHBalanceUncovered() + "",
						headFont)));
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

				hcell = new PdfPCell(new PdfPCell(new Phrase(
						Double.parseDouble(IhhlRawMaterialsRequirementmap.get(8).split("-")[0])
								* latestFormatA03DataListOfAllAreas.get(i).getCoverageHHBalanceUncovered()
								+ "-"
								+ Integer.parseInt(IhhlRawMaterialsRequirementmap.get(8).split("-")[1])
										* latestFormatA03DataListOfAllAreas.get(i).getCoverageHHBalanceUncovered()
								+ "",
						headFont)));
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

				hcell = new PdfPCell(new PdfPCell(new Phrase(
						Integer.parseInt(IhhlRawMaterialsRequirementmap.get(9))
								* latestFormatA03DataListOfAllAreas.get(i).getCoverageHHBalanceUncovered() + "",
						headFont)));
				hcell.setBorderColor(BaseColor.BLACK);
				hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hcell.setBackgroundColor(cellBackgroundColor);
				hcell.setMinimumHeight(17f);
				table.addCell(hcell);

			}

			// legend.setAbsolutePosition(210,210);
			/**
			 * Opening the PDF document. Adding header paragraph to the document of the PDF
			 * which illustrates area for which PDF is generated. Adding the table to the
			 * document. Closing the document.
			 */
			document.open();
			document.add(p);
			document.add(table);
			document.close();

			/**
			 * Reading the properties value from application.properties file of the report
			 * location path make directory if doesn't exist
			 */
			String dir = configurableEnvironment.getProperty("report.path");
			File file = new File(dir);
			if (!file.exists())
				file.mkdirs();

			/**
			 * Getting the area name for which report is generated. Append the area name and
			 * report creation time with postfixed as .pdf Pass the resultant PDF report
			 * path as abstract pathname to OutputStream constructor. All the costly
			 * resources are closed
			 */
			String areaName = parentAreaId > 5 ? area.getAreaName()
					: parentAreaId == 4 ? "All_Blocks" : parentAreaId == 5 ? "All_Gps" : "anonymous";
			String name = areaName + "_" + new SimpleDateFormat("ddMMyyyyHHmmssSSSSSSS").format(new Date()) + ".pdf";
			outputPath = dir + "" + name;
			OutputStream fos = new FileOutputStream(new File(outputPath));
			out.writeTo(fos);
			out.close();
			fos.close();
		} catch (Exception e) {
			log.error("Action : Error while Generating Daily Supply Chain Pdf Report", e);
			e.printStackTrace();
		}

		return new Gson().toJson(outputPath);

	}

	/**
	 * Generates weekly JSON data for District Ranking excel report
	 * 
	 * @param parentAreaId it can be only referred to sbmAreaId
	 * 
	 * @return weeklyDistrictRankingExcelList list of JSON data map
	 * 
	 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
	 */
	@Override
	public List<Map<String, String>> getWeeklyDistrictRankingExcelData(Integer parentAreaId) {
		/**
		 * Declaring list to populate later by customizing raw list of data
		 */
		List<Map<String, String>> weeklyDistrictRankingExcelList = new ArrayList<Map<String, String>>();

		/**
		 * Fetching list of latest inserted data from District Ranking table by passing
		 * sbmAreaId
		 */
		List<DistrictRanking> weeklyDistrictRankingList = districtRankingRepository
				.findLatestInsertedDistrictsByParentAreaId(parentAreaId);

		Integer counter = 0;

		/**
		 * Iterating the fetched list
		 */
		for (DistrictRanking districtRanking : weeklyDistrictRankingList) {

			/**
			 * Started to populate the map and add it in a list
			 */
			Map<String, String> map = new LinkedHashMap<String, String>();
			map.put("Sl. No.", String.valueOf(++counter));
			map.put("District", String.valueOf(districtRanking.getDistrictName().toUpperCase()));
			map.put("Performance score", String.valueOf(districtRanking.getPerformanceScore()));
			map.put("Transperncy score", String.valueOf(districtRanking.getTransparencyScore()));
			map.put("Sustainability score", String.valueOf(districtRanking.getSustainabilityScore()));
			map.put("Total score", String.valueOf(districtRanking.getTotalScore()));
			map.put("Current Ranking", String.valueOf(districtRanking.getCurrentWeekRanking()));
			map.put("Previous Week Ranking",
					districtRanking.getPreviousWeekRanking() != null
							? String.valueOf(districtRanking.getPreviousWeekRanking())
							: "-");
			map.put("Change in Rank",
					districtRanking.getChangeInRanking() != null ? String.valueOf(districtRanking.getChangeInRanking())
							: "-");
			weeklyDistrictRankingExcelList.add(map);
		}
		return weeklyDistrictRankingExcelList;
	}

}








