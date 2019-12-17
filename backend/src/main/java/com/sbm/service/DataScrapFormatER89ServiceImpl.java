/**
 * 
 */
package com.sbm.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.sbm.domain.Area;
import com.sbm.domain.FormatER89;
import com.sbm.repository.AreaRepository;
import com.sbm.repository.FormatER89Repository;

import lombok.extern.slf4j.Slf4j;

/**
 * @author Ashutosh Dang(ashutosh@sdrc.co.in) Created Date : 26-Dec-2018
 *         11:53:00 AM
 */
@Service
@Slf4j
public class DataScrapFormatER89ServiceImpl implements DataScrapFormatER89Service {

	@Autowired
	DataScrapService dataScrapService;

	@Autowired
	private ConfigurableEnvironment configurableEnvironment;

	@Autowired
	private FormatER89Repository formatER89Repository;

	@Autowired
	private AreaRepository areaRepository;
	
	private static SimpleDateFormat fullDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	/**
	* Scraping data for FormatER89 with maximum try of 3 
	* with cron job scheduled at 6 am 
	* @author Ashutosh
	*/ 
	@Override
	@Transactional
	@Scheduled(cron="0 0 6 ? 1/1 ?")
	public void formatER89DataScraping() {
		int statusCode=0;
		int numberOfAttempts=0;
		do {
			try {
			if(numberOfAttempts==4) {
				break;
			}
			}catch(Exception e) {
				log.error("Action : error While Scraping Data for FormatER89"+e);
			}
			statusCode=formatER89DataScrape();
			numberOfAttempts++;
		}while(statusCode==0);
		log.info("Data scrape operation finished for FormatER89 " + fullDateFormat.format(new Date()));
	}
	/**
	* Scraping data for FormatER89
	* @return stauscode if successful returns 1 else return 0
 	* @author Ashutosh
	*/ 
	
	@Transactional
	public Integer formatER89DataScrape() {
		/**
		* Keeping the initial status code as 0 , On successful data scrap the method will return status code 1 
		*/
		Integer statusCode=0;
		log.info("FormatER89 data scrape start time==> " + fullDateFormat.format(new Date()));
		List<Area> areaList = areaRepository.getAreasDistState();

		Map<String, Area> areaMap = areaList.stream()
				.collect(Collectors.toMap(k -> k.getAreaName().toLowerCase(), v -> v));

		WebDriver driver = null;
		try {
			
			/**
			 * getting the phantomjs headless driver
			 */
			driver = dataScrapService.getWebDriver();
			driver.manage().window().maximize();
			driver.get(configurableEnvironment.getProperty("sbm.form.er.url"));
			driver.findElement(By.id("Login1_UserName")).click();
			driver.findElement(By.id("Login1_UserName")).clear();
			/**
			*passing encoded username and password  to username and password text field 
			*/ 
			driver.findElement(By.id("Login1_UserName")).sendKeys(new String(Base64.getDecoder().decode("b3Jpc3Nh")));
			driver.findElement(By.id("Login1_Password")).click();
			driver.findElement(By.id("Login1_Password")).clear();
//			driver.findElement(By.id("Login1_Password")).sendKeys(new String(Base64.getDecoder().decode("U29zb0AxMjM=")));
			driver.findElement(By.id("Login1_Password")).sendKeys(new String(Base64.getDecoder().decode("U29zb0AyMDE5")));
			driver.findElement(By.id("Login1_LoginButton")).click();
			
			driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
			/**
			 * driver loads the requested page 
			 */
			driver.get("https://sbm.gov.in/SBM/Secure/Report/SBM_DistrictwiseIECHRDAdmin_TarVsAchOBRelease.aspx");
			
			/**
			*  Getting all the selects element in the current web page
			*/
			List<WebElement> selects=driver.findElements(By.tagName("select"));
			/**
			* Getting the financial year select element at index 0 of all selects in the current page
			*/
			Select finYearSelect=new Select( selects.get(0));
			List<WebElement> options=finYearSelect.getOptions(); 
			List<String> yearOptionTxtList=new LinkedList<>();
			for (WebElement option : options) {
				if(!option.getText().contains("Select") /*&& !option.getText().contains("Select Share")*/ ) {
				yearOptionTxtList.add(option.getText());
				}
			}
			/**
			* Getting the "center + state share" option 
			*/
			Select shareSelect=new Select( selects.get(1));
			List<WebElement> shareOptions=shareSelect.getOptions(); 
			List<String> shareOptionsTxtList=new LinkedList<>();
			for (WebElement option : shareOptions) {
				if(!option.getText().contains("Select Share")) {
					shareOptionsTxtList.add(option.getText().trim());
				}
			}
			List<FormatER89> formatER89DataList = new ArrayList<>();
			/**
			*  Iterating for each financial year options
			*/
			for (int i = 0; i < yearOptionTxtList.size(); i++) {
				/**
				* Again getting all selects from the current page as the in memory couldn't keep it
				*/
				selects=driver.findElements(By.tagName("select"));
				/**
				* Getting the id of financial year select element at index 0 and clicking it 
				*/
				driver.findElement(By.id(selects.get(0).getAttribute("id"))).click();
				new Select(driver.findElement(By.id(selects.get(0).getAttribute("id")))).selectByIndex(i+1);//(yearOptionTxtList.get(i));
				selects=driver.findElements(By.tagName("select"));
				driver.findElement(By.id(selects.get(0).getAttribute("id"))).click();
				
		
				selects=driver.findElements(By.tagName("select"));
				/**
				* Getting the id of Share select and clicking the option "center + state" 
				*/
				driver.findElement(By.id(selects.get(1).getAttribute("id"))).click();
				new Select(driver.findElement(By.id(selects.get(1).getAttribute("id")))).selectByVisibleText("Center + State Share");//(shareOptionsTxtList.get(2));
				selects=driver.findElements(By.tagName("select"));
				driver.findElement(By.id(selects.get(1).getAttribute("id"))).click();
				
				driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
				/**
				* finding the button with input type="submit"
				*/
				driver.findElement(By.xpath("//input[@type='submit']")).click();
				driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
				/**
				 * getting page source of the current web page from where we'll get all the table data
				 */
				String pageDistrict = driver.getPageSource();
				Document docDistrict = Jsoup.parse(pageDistrict);
//				List<FormatER89> formatER89DataList = new ArrayList<>();

				/**
				* Iterating for each <tr> element found in the current page 
				*/
				for (Element row : docDistrict.select("tr")) {
						
					FormatER89 formatER89Data = new FormatER89();
					/**
					* Filtering out the unnecessary <tr>  elements which has values as below
					*/
					if (!row.text().contains("IEC, HRD (Activitywise) Target")
							&& !row.text().contains("Physical Financial") && !row.text().equals("")
							&& !row.text().contains("State Name :") && !row.text().contains("District Name :")
							&& !row.text().contains("Sr. No. District Name Block ")
							&& !row.text().contains("Total Expenditure (All Component) ")
							&& !row.text().contains("Target Achievement Target Achievement")
							&& !row.text().contains("13=11+12 14=(13/10)*100")
							&& !row.text().contains("STATE HEADQUARTER")) {
						int a = 1;
						Elements tdList = row.select("td");
						/**
						* Iterating over each <td> in the <tr>
						*/
						for (Element element : tdList) {
							/**
							*  making adjustment for the <tr> which contains "Total:-"
							*/
							if (row.text().contains("Total") && a == 1)
								a = 0;
							
							/**
							 * setting values for each cell in the sheet 
							 */
							switch (a) {
							case 0:
								formatER89Data.setAreaName(("Odisha").toUpperCase());
								a = 2;
								break;
							case 1:
								break;
							case 2:
								formatER89Data.setAreaName((element.text()).toUpperCase());
								break;
							case 3:
								formatER89Data.setPhysicalIecTarget(Integer.parseInt(element.text()));
								break;
							case 4:
								formatER89Data.setPhysicalIecAchievement(Integer.parseInt(element.text()));
								break;
							case 5:
								formatER89Data.setPhysicalHrdTarget(Integer.parseInt(element.text()));
								break;
							case 6:
								formatER89Data.setPhysicalHrdAchievement(Integer.parseInt(element.text()));
								break;
							case 7:
								formatER89Data.setFinOpeningBal(Double.parseDouble(element.text()));
								break;
							case 8:
								formatER89Data.setFinRelease(Double.parseDouble(element.text()));
								break;
							case 9:
								formatER89Data.setFinTotal(Double.parseDouble(element.text()));
								break;
							case 10:
								formatER89Data.setFinTotalExpAll(Double.parseDouble(element.text()));
								break;
							case 11:
								formatER89Data.setFinIecExp(Double.parseDouble(element.text()));
								break;
							case 12:
								formatER89Data.setFinHrdExp(Double.parseDouble(element.text()));
								break;
							case 13:
								formatER89Data.setFinTotalIecHrd(Double.parseDouble(element.text()));
								break;
							case 14:
								formatER89Data.setFinPerIecExp(Double.parseDouble(element.text()));
								break;
							}
							++a;
						}
						formatER89Data
								.setSbmAreaId(areaMap.get(formatER89Data.getAreaName().toLowerCase()).getSbmAreaId());
						formatER89Data.setAreaLevelId(areaMap.get(formatER89Data.getAreaName().toLowerCase())
								.getAreaLevel().getAreaLevelId());
						formatER89Data.setParentAreaId(
								areaMap.get(formatER89Data.getAreaName().toLowerCase()).getParentAreaId());
						formatER89Data.setCreatedDate(new Date());
						formatER89Data.setFinancialYear(yearOptionTxtList.get(i));
						formatER89DataList.add(formatER89Data);
					}
				}
//				formatER89Repository.save(formatER89DataList);
				driver.findElement(By.linkText("Back to Previous")).click();
			}
			formatER89Repository.save(formatER89DataList);
			driver.findElement(By.linkText("Logout")).click();
			statusCode=1;
			log.info(formatER89DataList.size()+" no of records saved successfully");
		}catch(NoSuchElementException e) {
			log.error("Action : Error NoSuchElementException while Scraping Data for FormatER89 Report",e);
			e.printStackTrace();
		}
		catch (Exception e) {
			log.error("Action : Error while Scraping Data for FormatER89 Report",e);
			e.printStackTrace();
		} finally {
			driver.quit();
			log.info("FormatER89 data scrape end time==> " + fullDateFormat.format(new Date()));
			log.info("Quits PhantomJs driver, closing every associated window.");
		}
		return statusCode;
	}
  
}
