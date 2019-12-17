/**
 * 
 */
package com.sbm.util;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletContext;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.html.WebColors;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * @author Ashutosh Dang(ashutosh@sdrc.co.in) Created Date : 04-Dec-2018 3:44:53
 *         PM
 */
public class HeaderFooter extends PdfPageEventHelper {
	/** Alternating phrase for the header. */
	Phrase[] header = new Phrase[2];

	/** Current page number (will be reset for every chapter). */
	int pagenumber;

	private ServletContext context;

	private String domainName;
	
	private String reportType;

	private String createdDate;

	public HeaderFooter(ServletContext context, String reportType, String createdDate, String domainName) {
		this.context = context;
		this.reportType = reportType;
		this.createdDate = createdDate;
		this.domainName = domainName;

		// TODO Auto-generated constructor stub
	}

	/**
	 * Initialize one of the headers.
	 * 
	 * @see com.itextpdf.text.pdf.PdfPageEventHelper#onOpenDocument(com.itextpdf.text.pdf.PdfWriter,
	 *      com.itextpdf.text.Document)
	 */
	public void onOpenDocument(PdfWriter writer, Document document) {
		header[0] = new Phrase("SBM Daily Report");
	}

	/**
	 * Initialize one of the headers, based on the chapter title; reset the page
	 * number.
	 * 
	 * @see com.itextpdf.text.pdf.PdfPageEventHelper#onChapter(com.itextpdf.text.pdf.PdfWriter,
	 *      com.itextpdf.text.Document, float, com.itextpdf.text.Paragraph)
	 */
	public void onChapter(PdfWriter writer, Document document, float paragraphPosition, Paragraph title) {
		header[1] = new Phrase(title.getContent());
		pagenumber = 1;

	}

	/**
	 * Increase the page number.
	 * 
	 * @see com.itextpdf.text.pdf.PdfPageEventHelper#onStartPage(com.itextpdf.text.pdf.PdfWriter,
	 *      com.itextpdf.text.Document)
	 */
	public void onStartPage(PdfWriter writer, Document document) {
		pagenumber++;
		Image image = null;

		try {
			image = Image.getInstance(context.getRealPath("template//images//header.png"));
			PdfPTable table = new PdfPTable(3);

			BaseColor cellBg = WebColors.getRGBColor("#ffccb3"); // #ff3333 -red
//			BaseColor textColor = WebColors.getRGBColor("#ff9999");
//			Font cellFont = new Font(FontFamily.HELVETICA, 12, Font.NORMAL, textColor);
			Font middleCellFont = new Font(FontFamily.HELVETICA, 14, Font.BOLD, BaseColor.BLACK);
//			Font rightCell = new Font(FontFamily.HELVETICA, 14, Font.NORMAL, textColor);

			PdfPCell hcell;
			hcell = new PdfPCell(image, true);
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell.setVerticalAlignment(Element.ALIGN_BOTTOM);
			hcell.setBackgroundColor(cellBg);
			hcell.setBorder(Rectangle.NO_BORDER);
//			hcell.setBorder(Rectangle.BOTTOM);
//			hcell.setBorderColorBottom(BaseColor.BLACK);
			table.addCell(hcell);

			if (reportType.equalsIgnoreCase("weekly"))
				hcell = new PdfPCell(new Phrase("WEEKLY STATUS REPORT OF SBM – G",middleCellFont));
			else
				hcell = new PdfPCell(new Phrase("DAILY STATUS REPORT OF SBM – G", middleCellFont));
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell.setBackgroundColor(cellBg);
			hcell.setBorder(Rectangle.NO_BORDER);
//			hcell.setBorder(Rectangle.BOTTOM);
//			hcell.setBorderColorBottom(BaseColor.BLACK);
			table.addCell(hcell);

			String pattern = "yyyy-MM-dd";
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
//			String date = simpleDateFormat.format(new Date());

			hcell = new PdfPCell(new Phrase(createdDate, middleCellFont));
			hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hcell.setVerticalAlignment(Element.ALIGN_MIDDLE);
			hcell.setBackgroundColor(cellBg);
			hcell.setBorder(Rectangle.NO_BORDER);
//			hcell.setBorder(Rectangle.BOTTOM);
//			hcell.setBorderColorBottom(BaseColor.BLACK);
			table.addCell(hcell);
			table.setTotalWidth(PageSize.A4.rotate().getWidth());
			table.setLockedWidth(true);
			table.setSpacingAfter(10f);
			document.add(table);
			document.add(Chunk.NEWLINE);
			document.add(Chunk.NEWLINE);
		} catch (Exception e) {

		}

	}

	/**
	 * Adds the header and the footer.
	 * 
	 * @see com.itextpdf.text.pdf.PdfPageEventHelper#onEndPage(com.itextpdf.text.pdf.PdfWriter,
	 *      com.itextpdf.text.Document)
	 */
	public void onEndPage(PdfWriter writer, Document document) {
		Image image;
		Font fontStyle = new Font();
		fontStyle.setColor(255, 255, 255);
		fontStyle.setSize(6);
		try {

			image = Image.getInstance(context.getRealPath("template//images//footer1.png"));
			int indentation = 0;
			float scaler = ((document.getPageSize().getWidth() - indentation) / image.getWidth()) * 100;
			image.scalePercent(scaler);
			image.setAbsolutePosition(0, 0);
			document.add(image);
		} catch (Exception e) {
			e.printStackTrace();
		}

		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-YYYY");
		String date = sdf.format(new Date());
		ColumnText.showTextAligned(writer.getDirectContent(), Element.ALIGN_CENTER,
				new Phrase(String.format("Page - %d, Printed on : %s %s", pagenumber, date,
						domainName), fontStyle),
				(document.getPageSize().getWidth()) / 2, document.bottomMargin() - 28.5f, 0);
	}
}
