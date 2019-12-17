/**
 * 
 */
package com.sbm.util;

import java.util.Date;

import javax.servlet.ServletContext;

import org.springframework.util.ResourceUtils;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * @author RajaniKanta(rajanikanta@sdrc.co.in)
 *
 */
public class HeaderFooterA4 extends PdfPageEventHelper {
	

	/** Alternating phrase for the header. */
	Phrase[] header = new Phrase[2];
	private boolean firstPage = true;
	
	/** Current page number (will be reset for every chapter). */
	int pagenumber;

	private String domainName ;

	private ServletContext context;
	
	public HeaderFooterA4(ServletContext context,String domainName) {
		this.context = context;
		this.domainName=domainName;
	}

	/**
	 * @param url
	 * @param formDataMainImage


	/**
	 * Initialize one of the headers.
	 * 
	 * @see com.itextpdf.text.pdf.PdfPageEventHelper#onOpenDocument(com.itextpdf.text.pdf.PdfWriter,
	 *      com.itextpdf.text.Document)
	 */
	public void onOpenDocument(PdfWriter writer, Document document) {
		header[0] = new Phrase("CCIMS");
	}

	/**
	 * Initialize one of the headers, based on the chapter title; reset the page
	 * number.
	 * 
	 * @see com.itextpdf.text.pdf.PdfPageEventHelper#onChapter(com.itextpdf.text.pdf.PdfWriter,
	 *      com.itextpdf.text.Document, float, com.itextpdf.text.Paragraph)
	 */
	public void onChapter(PdfWriter writer, Document document,
			float paragraphPosition, Paragraph title) {
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
		try
		{
			if(firstPage) {
				image = Image.getInstance(this.context.getRealPath("template/images/header2.png"));
			int indentation = 0;
			float scaler = ((document.getPageSize().getWidth() - indentation) / image
					.getWidth()) * 100;
			image.scalePercent(scaler);
			image.setAbsolutePosition(0, document.getPageSize().getHeight()
					+ document.topMargin()*1.5f - image.getHeight());
			document.add(image);
			document.add(Chunk.NEWLINE);
			firstPage=false;
			}

		}
		catch
		(Exception e)
		{
			
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
		Font fontStyle=new Font();
		fontStyle.setColor(255,255,255);
		fontStyle.setSize(8);
		fontStyle.setFamily(Font.FontFamily.HELVETICA.name());
		try {
			image = Image.getInstance(this.context.getRealPath("template/images/footer1.png"));
			int indentation = 0;
			float scaler = ((document.getPageSize().getWidth() - indentation) / image
					.getWidth()) * 100;
			image.scalePercent(scaler);
			image.setAbsolutePosition(0, 0);
			document.add(image);
		} catch (Exception e) {
			e.printStackTrace();
		}
		String date = new Date().toString();
		
		ColumnText.showTextAligned(writer.getDirectContent(),
				Element.ALIGN_CENTER,
				new Phrase(String.format("Page - %d, Printed on : %s  from %s",pagenumber,date,domainName),fontStyle),
				(document.getPageSize().getWidth()) / 2,
				document.bottomMargin() -30, 0);
	}
}
