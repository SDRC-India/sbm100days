package com.sbm.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.transaction.Transactional;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.stereotype.Service;

import com.sbm.domain.FormatER52;
import com.sbm.repository.FormatER52Repository;

import lombok.extern.slf4j.Slf4j;

/**
 * 
 * This class is responsible for scraping the FormatER52 data.
 * 
 * @author subrata
 *
 */
@Service
@Slf4j
public class DataScrapFormatER52ServiceImpl implements DataScrapFormatER52Service {
	
	private static SimpleDateFormat fullDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	@Autowired
	DataScrapService dataScrapService;
	
	@Autowired
	private ConfigurableEnvironment configurableEnvironment;
	
	@Autowired
	private FormatER52Repository formatER52Repository;
	
	/**
	 * Scraping the FormatER52 data. If any exception occurred, then trying 2 more times.
	 * 
	 * @author subrata
	 */
	@Override
//	@Scheduled(cron="0 0 8 ? 1/1 ?")
	@Transactional
	public void formER52DataScraping() {
		int maxTries = 1;
		Integer statusCode = 1;
		/**
		 * If we are not getting 0 as the statusCode, then we are trying 2 more times.
		 * If maxTries is equal to 4 then breaking the loop.
		 */
		do{
			try {
				if(maxTries == 4) {
					log.info("Unable to scrape FormatER52 sending an email to appropriate person.");
					/**
					 * If possible send an email to appropriate person.
					 */
					break;
				}
			} catch (Exception e) {
				log.error("Error while sending an email : "+e);
			}
			statusCode = formER52DataScrape();
			maxTries++;
			
		}while(statusCode.intValue() != 0);
		log.info("Data scrape operation finished for FormatER52 " + fullDateFormat.format(new Date()));
	}
	
	/**
	 * This method is the actual method where we are scraping the FormatER52 data.
	 * On scraping success returning 0, otherwise 1
	 * 
	 * @return statusCode contains 1 or 0 
	 * 
	 * @author subrata
	 */
	@Transactional
	public Integer formER52DataScrape() {
		Integer statusCode = 1;
		log.info("FormatER52 data scrape start time==> " + fullDateFormat.format(new Date()));
		
		WebDriver driver = null;
		try {
			/**
			 * Getting a PhantomJs web driver from DataScrapService
			 */
			driver = dataScrapService.getWebDriver();
			/**
			 * Maximizing the browser window.
			 */
			driver.manage().window().maximize();
			/**
			 * Passing the URL to load in the WebDriver.
			 */
			driver.get(configurableEnvironment.getProperty("sbm.form.er.url"));
			
			driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
			/**
			 * Passing the username and password and clicking on submit button.
			 */
			driver.findElement(By.id("Login1_UserName")).sendKeys(new String(Base64.getDecoder().decode("b3Jpc3Nh")));
			driver.findElement(By.id("Login1_Password")).sendKeys(new String(Base64.getDecoder().decode("U29zb0AxMjM=")));
			driver.findElement(By.id("Login1_LoginButton")).click();
			
			/**
			 * Once logged in, we are passing the new URL to load in the WebDriver.
			 */
			driver.get("https://sbm.gov.in/SBM/Secure/Report/SBM_GetToiletcategoryWise.aspx");
			
			/**
			 * Getting all the <select> tag from the webdriver.
			 */
			List<WebElement> webEle = driver.findElements(By.tagName("select"));
			/**
			 * Select the first elements id from webEle.
			 */
			Select dropdown = new Select(driver.findElement(By.id(webEle.get(0).getAttribute("id"))));

			List<String> allFinancialYear = new ArrayList<>();
			/**
			 * Select all the dropdown options and store in a list.
			 */
			dropdown.getOptions().stream().forEach(v->{allFinancialYear.add(v.getText());});
			List<FormatER52> listOfFormatER52 = null;
			/**
			 * Iterating allFinancialYear list.
			 */
			for (String financialYear : allFinancialYear) {
				listOfFormatER52 = new ArrayList<>();
				/**
				 * We are not getting List<WebElement> in the financialYear dropdown from the second element onwards.
				 * So we are initializing webEle again.
				 * Getting all the <select> tag from the webdriver.
				 */
				webEle = driver.findElements(By.tagName("select"));
				/**
				 * Select the first elements id from webEle.
				 */
				String yearSelectedId = webEle.get(0).getAttribute("id");
				/**
				 * Select all the dropdown options and store in a list.
				 */
				new Select(driver.findElement(By.id(yearSelectedId))).selectByValue(financialYear);
				/**
				 * Getting all the <input> tag from the webdriver.
				 */
				List<WebElement> inputs = driver.findElements(By.tagName("input"));
				String submitId = null;
				/**
				 * Iterating all the inputTag list and getting the submitId.
				 */
				for (WebElement webElement : inputs) {
					if(webElement.getAttribute("type").equals("submit")) {
						submitId = webElement.getAttribute("id");
						break;
					}
				}
				/**
				 * Once we get the submitId, then we are clicking in the Submit button.
				 */
				driver.findElement(By.id(submitId)).click();
				/**
				 * Getting the page source from webdriver and parsing that page into HTML Document type.
				 */
				String pageDistrict = driver.getPageSource();
				Document docDistrict = Jsoup.parse(pageDistrict);
				/**
				 * Iterating all the <tr> tag from HTML document. 
				 */
				for (Element elements : docDistrict.select("tr")) {
					String districtHTMLID = null;
					
					if(checkHeaderText(elements)==true) {	
						/**
						 * Iterating all the <td> tag from element. 
						 */
						List<Element> ele = elements.getElementsByTag("td");
						/**
						 * Save all the <td> data in FormatER52 domain.
						 */
						districtHTMLID = setValueInDomain(listOfFormatER52, ele, driver, 
								(elements.text().contains("Total:-") ? "Total" : "District"), financialYear);
						
						/*if(!elements.text().contains("Total:-")) {
							districtHTMLID = setValueInDomain(listOfFormatER52, ele, driver, "District", financialYear);
						} else if(elements.text().contains("Total:-")) {
							districtHTMLID = setValueInDomain(listOfFormatER52, ele, driver, "Total", financialYear);
						}*/
					} 
					if(checkHeaderText(elements)==true && districtHTMLID!=  null) {	
						/**
						 * Clicking the districtId link.
						 */
						driver.findElement(By.id(districtHTMLID)).click();
						/**
						 * Getting the page source from webdriver and parsing that page into HTML Document type.
						 */
						String pageBlock = driver.getPageSource();
						Document docBlock = Jsoup.parse(pageBlock);
						/**
						 * Iterating all the <tr> tag from HTML document. 
						 */
						for (Element elementsBlock : docBlock.select("tr")) {
							String blockHTMLID = null;
							if(checkHeaderText(elementsBlock)==true && !elementsBlock.text().contains("Total:-")) {	
								/**
								 * Iterating all the <td> tag from element. 
								 */
								List<Element> ele = elementsBlock.getElementsByTag("td");
								/**
								 * Save all the <td> data in FormatER52 domain.
								 */
								blockHTMLID = setValueInDomain(listOfFormatER52, ele, driver, "Block", financialYear);
							}
							if(checkHeaderText(elements)==true && blockHTMLID!=  null) {
								/**
								 * Clicking the blockId link.
								 */
								driver.findElement(By.id(blockHTMLID)).click();
								/**
								 * Getting the page source from webdriver and parsing that page into HTML Document type.
								 */
								String pageGp = driver.getPageSource();
								Document gpBlock = Jsoup.parse(pageGp);
								/**
								 * Iterating all the <tr> tag from HTML document. 
								 */
								for (Element elementsGP : gpBlock.select("tr")) {
									if(checkHeaderText(elementsGP)==true && !elementsGP.text().contains("Total:-")) {
										/**
										 * Iterating all the <td> tag from element. 
										 */
										List<Element> ele = elementsGP.getElementsByTag("td");
										/**
										 * Save all the <td> data in FormatER52 domain.
										 */
										setValueInDomain(listOfFormatER52, ele, driver, "GP", financialYear);
									}
								}
								/**
								 * Clicking the "Back to Previous" link.
								 */
								driver.findElement(By.linkText("Back to Selection")).click();
							}
						}
						/**
						 * Clicking the "Back to Previous" link.
						 */
						driver.findElement(By.linkText("Back to Selection")).click();
					}
				}
				/**
				 * Clicking the "Back to Previous" link.
				 */
				driver.findElement(By.linkText("Back to Selection")).click();
			}
			/**
			 * Saving all the data in FormatER52 table
			 */
			formatER52Repository.save(listOfFormatER52);
			driver.findElement(By.linkText("Logout")).click();
			statusCode = 0;
		} catch (Exception e) {
			log.error("Action : Error while scraping the data for FormatER52. ",e);
		}finally {
			driver.quit();
			log.info("FormatER52 data scrape end time==> " + fullDateFormat.format(new Date()));
			log.info("Quits PhantomJs driver, closing every associated window.");
		}
		return statusCode;
	}
	
	/**
	 * Setting all the <td> tag values in SwachhagrahiDetails domain.
	 * 
	 * @param listOfFormatER52 contains all the FormatER52 domain
	 * @param ele is the <td> data
	 * @param driver is the webdriver
	 * @param level is the type of level whether district, block or gp
	 * @param financialYear
	 * 
	 * @return sbmHTMLId is the element id
	 */
	private static String setValueInDomain(List<FormatER52> listOfFormatER52, List<Element> ele, 
			WebDriver driver, String level, String financialYear) {
		
		String sbmHTMLId = null;
		FormatER52 formatER52 = new FormatER52();
		int a = 0;
		
		Date currentDate = new Date();
		for (Element element : ele) {
			switch (a) {
				case 0:
					if("Total".equals(level)) {
						formatER52.setParentSbmAreaId(1);
						formatER52.setSbmAreaId(18);
						formatER52.setAreaName("ODISHA");
						a++;
					}
					break;
				case 1:
					if(!"Total".equals(level)) {
						WebElement el = driver.findElement(By.id(element.getElementsByTag("a").get(0).attr("id")));
						String disabled = el.getAttribute("class");
						if(!("aspNetDisabled".equals(disabled))) {
							sbmHTMLId = element.getElementsByTag("a").get(0).attr("id");
						}
						if("District".equals(level)) {
							formatER52.setParentSbmAreaId(Integer.valueOf(element.getElementsByTag("input").get(0).attr("value")));
							formatER52.setSbmAreaId(Integer.valueOf(element.getElementsByTag("input").get(1).attr("value")));
						}
						if("Block".equals(level)) {
							formatER52.setParentSbmAreaId(Integer.valueOf(element.getElementsByTag("input").get(1).attr("value")));
							formatER52.setSbmAreaId(Integer.valueOf(element.getElementsByTag("input").get(2).attr("value")));
						}
						if("GP".equals(level)) {
							formatER52.setParentSbmAreaId(Integer.valueOf(element.getElementsByTag("input").get(2).attr("value")));
							formatER52.setSbmAreaId(Integer.valueOf(element.getElementsByTag("input").get(3).attr("value")));
						}
						
						formatER52.setAreaName(element.text());
					}
					break;
				case 2:
					formatER52.setTotalToiletConstructed(Integer.valueOf(element.text()));
					break;
				case 3:
					formatER52.setTwinToilet(Integer.valueOf(element.text()));
					break;
				case 4:
					formatER52.setSingleToilet(Integer.valueOf(element.text()));
					break;
				case 5:
					formatER52.setSepticToilet(Integer.valueOf(element.text()));
					break;
				case 6:
					formatER52.setBiogasToilet(Integer.valueOf(element.text()));
					break;
				case 7:
					formatER52.setBioToilet(Integer.valueOf(element.text()));
					break;
				case 8:
					formatER52.setEcologicalSanitationToilet(Integer.valueOf(element.text()));
					break;
				case 9:
					formatER52.setDivyangFriendlyToiletHHTotal(Integer.valueOf(element.text()));
					break;
				case 10:
					formatER52.setDivyangFriendlyToiletHHAPL(Integer.valueOf(element.text()));
					break;
				case 11:
					formatER52.setDivyangFriendlyToiletHHBPL(Integer.valueOf(element.text()));
					break;
				case 12:
					formatER52.setDivyangFriendlySanitaryComplex(Integer.valueOf(element.text()));
					break;
			}
			a++;
		}
		formatER52.setCreatedDate(currentDate);
		formatER52.setFinancialYear(financialYear);
		listOfFormatER52.add(formatER52);
		
		return sbmHTMLId;
	}

	/**
	 * If an Element is <th> tag then returning false, otherwise true.
	 * 
	 * @param headerText is the <tr> element
	 * @return true/false 
	 * 
	 * @author subrata
	 */
	private static boolean checkHeaderText(Element headerText) {
		if (!headerText.text().contains("[Format ER 52] Details of Toilet") 
				&& !headerText.text().contains("S.No District Name Total Toilet")
				&& !headerText.text().contains("S.No Block Name Total Toilet")
				&& !headerText.text().contains("S.No Panchyat Name Total Toilet")
				&& !headerText.text().contains("Total APL BPL") && !headerText.text().equals("")
				&& !headerText.text().contains("1 2 3 4 5 6 7 8 9 10 11 12 13") 
				&& !headerText.text().contains("STATE HEADQUARTER")
				&& !headerText.text().contains("State Name: ODISHA")
				&& !headerText.text().contains("S.No Block Name Total Toilet")) {
			
			return true;
		}else
			return false;
	}
}
