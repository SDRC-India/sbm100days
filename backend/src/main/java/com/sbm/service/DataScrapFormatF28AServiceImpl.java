package com.sbm.service;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.sbm.domain.FormatF28A;
import com.sbm.domain.FormatF28aWeekly;
import com.sbm.repository.FormatF28ARepository;
import com.sbm.repository.FormatF28aWeeklyRepository;

import lombok.extern.slf4j.Slf4j;

/**
 * 
 * This class is responsible for scraping the FormatF28A data.
 * 
 * @author subrata
 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
 */
@Service
@Slf4j
public class DataScrapFormatF28AServiceImpl implements DataScrapFormatF28AService {

	private static SimpleDateFormat fullDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@Autowired
	DataScrapService dataScrapService;

	@Autowired
	private ConfigurableEnvironment configurableEnvironment;

	@Autowired
	private FormatF28ARepository formatF28ARepository;

	@Autowired
	private FormatF28aWeeklyRepository formatF28aWeeklyRepository;

	/**
	 * Scraping the FormatF28A data. If any exception occurred, then trying 2 more
	 * times. This method will run everyday at 8.00 AM.
	 * 
	 * @author subrata
	 */
	@Override
	@Scheduled(cron = "0 0 8 ? 1/1 ?")
	@Transactional
	public void formF28ADataScraping() {
		int maxTries = 1;
		Integer statusCode = 1;
		/**
		 * If we are not getting 0 as the statusCode, then we are trying 2 more times.
		 * If maxTries is equal to 4 then breaking the loop.
		 */
		do {
			try {
				if (maxTries == 4) {
					log.info("Unable to scrape FormatF28A sending an email to appropriate person.");
					/**
					 * If possible send an email to appropriate person.
					 */
					break;
				}
			} catch (Exception e) {
				log.error("Error while sending an email : " + e);
			}
			statusCode = formF28ADataScrape();
			maxTries++;

		} while (statusCode.intValue() != 0);
		log.info("Data scrape operation finished for FormatF28A " + fullDateFormat.format(new Date()));
	}

	/**
	 * This method is the actual method where we are scraping the FormatF28A data.
	 * On scraping success returning 0, otherwise 1
	 * 
	 * @return statusCode contains 1 or 0
	 * 
	 * @author subrata
	 */
	@Transactional
	public Integer formF28ADataScrape() {
		Integer statusCode = 1;
		log.info("FormatF28A data scrape start time==> " + fullDateFormat.format(new Date()));

		/**
		 * Getting latest record from FormatF28A table and putting in a map.
		 */
		List<FormatF28A> format28aList = formatF28ARepository.getLatestRecords();
		Map<Integer, Integer> geoTagMap = format28aList.stream()
				.collect(Collectors.toMap(FormatF28A::getSbmAreaId, FormatF28A::getUploadedPhotographsTotal));

		/**
		 * Checking the day whether Friday or not.
		 */
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		boolean isFriday = cal.get(Calendar.DAY_OF_WEEK) == Calendar.FRIDAY;
		List<FormatF28aWeekly> ftF28aWklyDtaLst = null;
		List<FormatF28aWeekly> formatF28aWeeklyList = null;
		Map<Integer, FormatF28aWeekly> formatF28aWeeklyMap = null;
		/**
		 * If isFriday is true, then getting the latest records from
		 * database(FormatF28aWeekly table)
		 */
		if (isFriday) {
			formatF28aWeeklyList = formatF28aWeeklyRepository.findLatestAllRecord();
			formatF28aWeeklyMap = formatF28aWeeklyList.stream()
					.collect(Collectors.toMap(FormatF28aWeekly::getSbmAreaId, v -> v));
		}

		WebDriver driver = null;
		try {
			/**
			 * Getting a PhantomJs web driver from DataScrapService
			 */
			driver = dataScrapService.getWebDriver();
			/**
			 * Passing the URL to load in the WebDriver.
			 */
			driver.get(configurableEnvironment.getProperty("sbm.form.f28A.url"));
			/**
			 * Maximizing the browser window.
			 */
			driver.manage().window().maximize();

			// selecting SBM radio button
			WebElement webEleList = driver.findElements(By.tagName("label")).get(1);
			driver.findElement(By.id(webEleList.getAttribute("for"))).click();

			/**
			 * Clicking the ODISHA link
			 */
			driver.findElement(By.linkText("ODISHA")).click();

			/**
			 * Getting the page source from webdriver and parsing that page into HTML
			 * Document type.
			 */
			String pageDistrict = driver.getPageSource();
			Document docDistrict = Jsoup.parse(pageDistrict);
			Map<Integer, String> districtNameMap = new LinkedHashMap<>();
			List<FormatF28A> listOfFormat28A = new ArrayList<>();

			/**
			 * Iterating all the
			 * <tr>
			 * tag from HTML document.
			 */
			for (Element elements : docDistrict.select("tr")) {
				/**
				 * If an Element is
				 * <tr>
				 * tag then read all the values.
				 */
				if (checkHeaderText(elements) == true) {
					/**
					 * Save all the
					 * <td>data in FormatF28A table.
					 */
					if (!elements.text().contains("Total")) {
						getSBMID(elements.getElementsByTag("td"), driver, "District", districtNameMap, 18, null,
								listOfFormat28A, geoTagMap);
					} else if (elements.text().contains("Total")) {
						getSBMID(elements.getElementsByTag("td"), driver, "Total", null, 1, 18, listOfFormat28A,
								geoTagMap);
					}
				}
			}
			/**
			 * Iterating the districtNameMap
			 */
			for (Integer districtSBMId : districtNameMap.keySet()) {
				/**
				 * Getting the district area name from districtNameMap and clicking on that area
				 * name.
				 */
				String districtName = districtNameMap.get(districtSBMId);
				driver.findElement(By.linkText(districtName)).click();
				/**
				 * Getting the page source from webdriver and parsing that page into HTML
				 * Document type.
				 */
				String pageBlock = driver.getPageSource();
				Document docBlock = Jsoup.parse(pageBlock);
				Map<Integer, String> blockNameMap = new LinkedHashMap<>();
				/**
				 * Iterating all the
				 * <tr>
				 * tag from HTML document.
				 */
				for (Element blockElements : docBlock.select("tr")) {
					if (checkHeaderText(blockElements) == true && !blockElements.text().contains("Total")) {
						/**
						 * Save all the
						 * <td>data in FormatF28A table.
						 */
						getSBMID(blockElements.getElementsByTag("td"), driver, "Block", blockNameMap, districtSBMId,
								null, listOfFormat28A, geoTagMap);
					}
				}
				/**
				 * Iterating the blockNameMap
				 */
				for (Integer blockSBMId : blockNameMap.keySet()) {
					/**
					 * Getting the block area name from blockNameMap and clicking on that area name.
					 */
					String blockName = blockNameMap.get(blockSBMId);
					driver.findElement(By.linkText(blockName)).click();
					/**
					 * Getting the page source from webdriver and parsing that page into HTML
					 * Document type.
					 */
					String pageGp = driver.getPageSource();
					Document docGp = Jsoup.parse(pageGp);
					/**
					 * Iterating all the
					 * <tr>
					 * tag from HTML document.
					 */
					for (Element gpElements : docGp.select("tr")) {
						if (checkHeaderText(gpElements) == true && !gpElements.text().contains("Total")) {
							/**
							 * Save all the
							 * <td>data in FormatF28A table.
							 */
							getSBMID(gpElements.getElementsByTag("td"), driver, "Gp", null, blockSBMId, null,
									listOfFormat28A, geoTagMap);
						}
					}
					/**
					 * Clicking the "Back to Previous" link.
					 */
					driver.findElement(By.linkText("Back to Previous")).click();
				}
				/**
				 * Clicking the "Back to Previous" link.
				 */
				driver.findElement(By.linkText("Back to Previous")).click();
			}
			/**
			 * Saving the listOfFormat28A in database.
			 */
			formatF28ARepository.save(listOfFormat28A);
			log.info("Number of records saved : " + listOfFormat28A.size());
			/**
			 * If isFriday is true, then setting the values in FormatF28aWeekly table
			 */
			if (isFriday) {
				ftF28aWklyDtaLst = new ArrayList<>();
				for (FormatF28A formatF28A : listOfFormat28A)
					getFtf28aWklyDtaDomain(formatF28A, ftF28aWklyDtaLst,
							formatF28aWeeklyMap == null ? null : formatF28aWeeklyMap.get(formatF28A.getSbmAreaId()));
			}
			formatF28aWeeklyRepository.save(ftF28aWklyDtaLst);
			statusCode = 0;
			log.info("FormatF28A data scrape end time==> " + fullDateFormat.format(new Date()));
		} catch (Exception e) {
			log.error("Action : Error while scraping the data for FormatF28A.", e);
		} finally {
			/**
			 * Quits PhantomJs driver, closing every associated window.
			 */
			driver.quit();
			log.info("Quits PhantomJs driver, closing every associated window.");
		}
		return statusCode;
	}

	/**
	 * If an Element is
	 * <th>tag then returning false, otherwise true.
	 * 
	 * @param headerText is the
	 *                   <tr>
	 *                   element
	 * @return true/false
	 * 
	 * @author subrata
	 */
	private static boolean checkHeaderText(Element headerText) {
		/*
		 * if (!headerText.text().contains("[Format F28 A] No. of") &&
		 * !headerText.text().contains("All Scheme SBM") &&
		 * !headerText.text().contains("Sr. No. No. of Toilets") &&
		 * !headerText.text().contains("Approved Unapproved Total") &&
		 * !headerText.text().contains("1 2 3 4 5 6") && !headerText.text().equals("")
		 * && !headerText.text().contains("Sr. No. Block Name No. of Toilets") &&
		 * !headerText.text().contains("Sr. No. Gram Panchayat Name No. of") &&
		 * !headerText.text().contains("State Name :- ODISHA") &&
		 * !headerText.text().contains("Sr. No. District Name No. of Toilets") &&
		 * !headerText.text().contains("Sr. No. State Name District Name Block")) {
		 */

		List<Element> eleList = headerText.getElementsByTag("th");

		if (eleList.size() == 0 && !headerText.text().contains("[Format F28 A] No. of")
				&& !headerText.text().contains("All Scheme SBM") && !headerText.text().equals("")) {
			return true;
		} else
			return false;
	}

	/**
	 * Setting all the values in FormatF28A domain.
	 * 
	 * @param ele             is the
	 *                        <td>data
	 * @param driver          is the webdriver
	 * @param level           is the type of level whether district, block
	 * @param nameMap         contains the District/Block details
	 * @param parentSBMId     is the ParentSbmAreaId
	 * @param sbmID           is the SbmAreaId
	 * @param listOfFormat28A contains all the FormatF28A domain
	 * @param geoTagMap       contains the latest record data in database
	 * @return sbmId(i.e. SbmAreaId)
	 */
	private static Integer getSBMID(Elements ele, WebDriver driver, String level, Map<Integer, String> nameMap,
			Integer parentSBMId, Integer sbmID, List<FormatF28A> listOfFormat28A, Map<Integer, Integer> geoTagMap) {
		FormatF28A formatf28a = new FormatF28A();
		Integer sbmId = null;
		int i = 0;
		/**
		 * Iterating the Elements.
		 */
		for (Element element : ele) {
			switch (i) {
			case 0:
				/**
				 * If the
				 * <td>contains "Total" then setting the areaName to ODISHA
				 */
				if ("Total".equals(level)) {
					formatf28a.setParentSbmAreaId(parentSBMId);
					formatf28a.setSbmAreaId(sbmID);
					formatf28a.setAreaName("ODISHA");
					i++;
				}
				break;
			case 1:
				/**
				 * If the
				 * <td>not contains "Total" then setting the areaName from element, SbmAreaId
				 * and ParentSbmAreaId.
				 * 
				 */
				if (i == 1 && !("Total".equals(level))) {
					sbmId = Integer.valueOf(element.getElementsByTag("input").get(0).attr("value"));
					formatf28a.setAreaName(element.text());
					formatf28a.setSbmAreaId(sbmID == null ? sbmId : sbmID);
					formatf28a.setParentSbmAreaId(parentSBMId);

					if (nameMap != null)
						nameMap.put(sbmId, element.text());
				}
				break;
			case 2:
				formatf28a.setNoOfToiletsUnapproved(Integer.valueOf(element.text()));
				break;
			case 3:
				formatf28a.setNoOfToiletsApproved(Integer.valueOf(element.text()));
				break;
			case 4:
				formatf28a.setUploadedPhotographsApproved(Integer.valueOf(element.text()));
				break;
			case 5:
				formatf28a.setUploadedPhotographsUnapproved(Integer.valueOf(element.text()));
				break;
			case 6:
				formatf28a.setUploadedPhotographsTotal(Integer.valueOf(element.text()));
				break;
			case 7:
				formatf28a.setUploadedPhotographsPercentage(Double.valueOf(element.text()));
				break;
			}
			i++;
		}
		formatf28a.setCreatedDate(new Date());
		/**
		 * UploadedPhotographsYesterday can be calculated as (Today
		 * UploadedPhotographsTotal-Yesterday[or latest record in DB]
		 * UploadedPhotographsTotal)
		 */
		formatf28a.setUploadedPhotographsYesterday(
				geoTagMap.containsKey(formatf28a.getSbmAreaId()) ? formatf28a.getUploadedPhotographsTotal().intValue()
						- geoTagMap.get(formatf28a.getSbmAreaId()).intValue() : null);
		/**
		 * If SbmAreaId is null then not adding in the listOfSwachhagrahiDetails
		 */
		if (formatf28a.getSbmAreaId() != null)
			listOfFormat28A.add(formatf28a);
		return sbmId;
	}

	/**
	 * Setting all the required values in FormatF28aWeekly domain.
	 * 
	 * @param formatF28A             refers to currently scrapped district data
	 *                               domain of daily formatF28A domain
	 * @param ftF28aWklyDtaLst       refers to the list which is supposed to
	 *                               populated by weekly formatF28A domain
	 * @param formatF28aPreviousWeek refers to the domain of latest inserted data by
	 *                               date from FormatF42 weekly
	 * 
	 * @author Mitan
	 */
	private void getFtf28aWklyDtaDomain(FormatF28A formatF28A, List<FormatF28aWeekly> ftF28aWklyDtaLst,
			FormatF28aWeekly formatF28aPreviousWeek) {
		FormatF28aWeekly formatF28aWeekly = new FormatF28aWeekly();
		formatF28aWeekly.setAreaName(formatF28A.getAreaName());
		formatF28aWeekly.setSbmAreaId(formatF28A.getSbmAreaId());
		formatF28aWeekly.setParentSbmAreaId(formatF28A.getParentSbmAreaId());
		formatF28aWeekly.setCreatedDate(formatF28A.getCreatedDate());
		formatF28aWeekly.setImprovmentSinceDate(
				formatF28aPreviousWeek == null ? null : formatF28aPreviousWeek.getCreatedDate());
		formatF28aWeekly.setPreviousWeekCoveragePercent(
				formatF28aPreviousWeek == null ? null : formatF28aPreviousWeek.getCurrentWeekCoveragePercent());
		formatF28aWeekly.setCurrentWeekCoveragePercent(formatF28A.getUploadedPhotographsPercentage());
		formatF28aWeekly.setImprovement(formatF28aPreviousWeek == null ? null
				: new BigDecimal(formatF28aWeekly.getCurrentWeekCoveragePercent())
						.subtract(new BigDecimal(formatF28aWeekly.getPreviousWeekCoveragePercent())));
		formatF28aWeekly
				.setBalanceRemaining(formatF28A.getNoOfToiletsApproved() - formatF28A.getUploadedPhotographsTotal());
		ftF28aWklyDtaLst.add(formatF28aWeekly);
	}

}