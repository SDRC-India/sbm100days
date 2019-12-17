package com.sbm.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.sbm.domain.Area;
import com.sbm.domain.SwachhagrahiDetails;
import com.sbm.repository.AreaRepository;
import com.sbm.repository.SwachhagrahiDetailsRepository;

import lombok.extern.slf4j.Slf4j;

/**
 * 
 * This class is responsible for scraping the FormatF24(Swachhagrahi details) data.
 * 
 * @author subrata
 *
 */
@Service
@Slf4j
public class DataScrapFormatF24ServiceImpl implements DataScrapFormatF24Service {
	
	private static SimpleDateFormat fullDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	@Autowired
	DataScrapService dataScrapService;
	
	@Autowired
	private ConfigurableEnvironment configurableEnvironment;
	
	@Autowired
	private AreaRepository areaRepository;
	
	@Autowired
	private SwachhagrahiDetailsRepository swachhagrahiDetailsRepository;

	/**
	 * Scraping the Swachhagrahi details(FormatF24) data. If any exception occurred, then trying 2 more times.
	 * This method will run everyday at 6.30 AM.
	 * 
	 * @author subrata
	 */
	@Override
	@Scheduled(cron="0 30 6 ? 1/1 ?")
	@Transactional
	public void formatF24DataScraping() {
		int maxTries = 1;
		Integer statusCode = 1;
		/**
		 * If we are not getting 0 as the statusCode, then we are trying 2 more times.
		 * If maxTries is equal to 4 then breaking the loop.
		 */
		do{
			try {
				if(maxTries == 4) {
					log.info("Unable to scrape FormatF24 sending an email to appropriate person.");
					/**
					 * If possible send an email to appropriate person.
					 */
					break;
				}
			} catch (Exception e) {
				log.error("Error while sending an email : "+e);
			}
			statusCode = formatF24DataScrape();
			maxTries++;
			
		}while(statusCode.intValue() != 0);
		log.info("Data scrape operation finished for FormatF24 " + fullDateFormat.format(new Date()));
	}
	/**
	 * This method is the actual method where we are scraping the Swachhagrahi details(FormatF24) data.
	 * On scraping success returning 0, otherwise 1
	 * 
	 * @return statusCode contains 1 or 0
	 * 
	 * @author subrata
	 */
	@Transactional
	public Integer formatF24DataScrape() {
		Integer statusCode = 1;
		log.info("FormatF24 data scrape start time==> " + fullDateFormat.format(new Date()));
		/**
		 * Getting District and Block user data from database and putting in a map.
		 */
		List<Area> areaList = areaRepository.findByAreaLevelAreaLevelIdIn(Arrays.asList(3, 4)); 
		Map<String, Area> areaMap = areaList.stream().collect(Collectors.toMap(k-> k.getAreaName().toLowerCase()+"_"+k.getParentAreaId(), v->v));
		WebDriver driver = null;
		List<SwachhagrahiDetails> listOfSwachhagrahiDetails = null;
		try {
			/**
			 * Getting a PhantomJs web driver from DataScrapService
			 */
			driver = dataScrapService.getWebDriver();
			/**
			 * Passing the URL to load in the WebDriver.
			 */
			driver.get(configurableEnvironment.getProperty("sbm.form.f24.url"));
			/**
			 * Maximizing the browser window.
			 */
			driver.manage().window().maximize();
			driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
			/**
			 * Clicking the Odisha link
			 */
			driver.findElement(By.linkText("Odisha")).click();
			listOfSwachhagrahiDetails = new ArrayList<>();
			/**
			 * Getting the page source from webdriver and parsing that page into HTML Document type.
			 */
			String pageDistrict = driver.getPageSource();
			Document docDistrict = Jsoup.parse(pageDistrict);
			/**
			 * Iterating all the <tr> tag from HTML document. 
			 */
			for (Element elementDistrict : docDistrict.select("tr")) {
				String areaNameAndAreaId = null;
				/**
				 * If an Element is <tr> tag then read all the values.
				 */
				if(checkHeaderText(elementDistrict)==true) {
					/**
					 * Set all the <td> data in SwachhagrahiDetails table.
					 * If <td> data contains 'Total', then setting 1 as the parentId for Odisha and 18 for all the districts. 
					 * Here areaNameAndAreaId contains district areaName and districtId.
					 */
					areaNameAndAreaId = getAreaName(elementDistrict.getElementsByTag("td"), driver, 
							elementDistrict.text().contains("Total")?"Total":"District", 
							listOfSwachhagrahiDetails, areaMap, elementDistrict.text().contains("Total")?1:18);
					
					if(areaNameAndAreaId != null && !(elementDistrict.text().contains("Total"))) {
						/**
						 * Getting the district area name from areaNameAndAreaId and clicking on that area name.
						 */
						driver.findElement(By.linkText(areaNameAndAreaId.split("_")[0])).click();
						/**
						 * Getting the page source from webdriver and parsing that page into HTML Document type.
						 */
						String pageBlock = driver.getPageSource();
						Document docBlock = Jsoup.parse(pageBlock);
						/**
						 * Iterating all the <tr> tag from HTML document. 
						 */
						for (Element elementBlock : docBlock.select("tr")) {
							if(checkHeaderText(elementBlock)==true && !(elementBlock.text().contains("Total"))) {
								/**
								 * Save all the <td> data in SwachhagrahiDetails table.
								 */
								getAreaName(elementBlock.getElementsByTag("td"), driver, "Block", 
										listOfSwachhagrahiDetails, areaMap, Integer.valueOf(areaNameAndAreaId.split("_")[1]));
							}
						}
						/**
						 * Clicking the "Back to Previous" link.
						 */
						driver.findElement(By.linkText("Back to Previous")).click();
					}
				}
			}
			/**
			 * Saving the listOfSwachhagrahiDetails in database.
			 */
			swachhagrahiDetailsRepository.save(listOfSwachhagrahiDetails);
			statusCode = 0;
		}catch (Exception e) {
			log.error("Action : Error while scraping the data for FormatF24.",e);
		}finally {
			/**
			 * Quits PhantomJs driver, closing every associated window.
			 */
			driver.quit();
			log.info("FormatF24 data scrape end time==> " + fullDateFormat.format(new Date()));
			log.info("Quits PhantomJs driver, closing every associated window.");
		}
		return statusCode;
	}
	
	/**
	 * If an Element is <th> tag then returning false, otherwise true.
	 * 
	 * @param headerText is the <tr> element
	 * @return true/false
	 * 
	 * @author subrata
	 */
	private boolean checkHeaderText(Element headerText) {
		if (!headerText.text().contains("Sr. No District Name Total No.") 
				&& !headerText.text().contains("[Format F24] Swachhagrahi Details") 
				&& !headerText.text().equals("")
				&& !headerText.text().contains("State Name : Odisha")
				&& !headerText.text().contains("Sr. No Block Name Total No. of GPs")) {
			
			return true;
		}else
			return false;
	}

	/**
	 * Setting all the <td> tag values in SwachhagrahiDetails domain.
	 * 
	 * @param ele is the <td> data
	 * @param driver is the webdriver
	 * @param level is the type of level whether district, block,total
	 * @param listOfSwachhagrahiDetails contains all the SwachhagrahiDetails domain
	 * @param areaMap contains the each area details according to their name, id
	 * @param parentId is the parent id for an area
	 * @return areaName contains areaName and areaId
	 * 
	 * @author subrata
	 */
	private static String getAreaName(List<Element> ele, WebDriver driver, String level, 
			List<SwachhagrahiDetails> listOfSwachhagrahiDetails, Map<String, Area> areaMap, Integer parentId) {
		String areaName = null;
		int i =0;
		SwachhagrahiDetails swachhagrahiDetails = new SwachhagrahiDetails();
		/**
		 * Iterating the List<Element>.
		 */
		for (Element element : ele) {
			switch (i) {
				case 0:
					/**
					 * Skipping this as the first element contains the Sl.no in the <td>
					 */
					break;
				case 1:
					/**
					 * If the <td> not contains "Total" then setting the areaName from element, SbmAreaId and ParentSbmAreaId.
					 * 
					 */
					if(!("Total".equals(level))) {
						swachhagrahiDetails.setAreaName(element.text());
						swachhagrahiDetails.setSbmAreaId(areaMap.get(element.text().toLowerCase()+"_"+parentId).getSbmAreaId());
						swachhagrahiDetails.setParentSbmAreaId(parentId);
						areaName = element.text()+"_"+swachhagrahiDetails.getSbmAreaId();
					}else if("Total".equals(level)) {
						/**
						 * If the <td> contains "Total" then setting the areaName to Odisha, SbmAreaId to 18
						 */
						swachhagrahiDetails.setAreaName("Odisha");
						swachhagrahiDetails.setSbmAreaId(18);
						swachhagrahiDetails.setParentSbmAreaId(parentId);
					}
					break;
				case 2:
					swachhagrahiDetails.setTotalNoOfGps(Integer.valueOf(element.text()));
					break;
				case 3:
					swachhagrahiDetails.setTotalNoOfGPEnteredSwachhagrahiDetails(Integer.valueOf(element.text()));
					break;
				case 4:
					swachhagrahiDetails.setNoOfSwachhagrahi(Integer.valueOf(element.text()));
					break;
				case 5:
					swachhagrahiDetails.setNoOfSwachhagrahiVolunteer(Integer.valueOf(element.text()));
					break;
				case 6:
					swachhagrahiDetails.setNoOfSwachhagrahiPaid(Integer.valueOf(element.text()));
					break;
			}
			i++;
		}
		/**
		 * If SbmAreaId is null then not adding in the listOfSwachhagrahiDetails
		 */
		if(swachhagrahiDetails.getSbmAreaId() != null)
			listOfSwachhagrahiDetails.add(swachhagrahiDetails);
		
		return areaName;
	}
}
