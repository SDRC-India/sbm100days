package com.sbm.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
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
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.stereotype.Service;

import com.sbm.domain.Area;
import com.sbm.domain.AreaLevel;
import com.sbm.domain.Options;
import com.sbm.domain.SubmitionData;
import com.sbm.repository.AreaLevelRepository;
import com.sbm.repository.AreaRepository;
import com.sbm.repository.OptionRepositry;
import com.sbm.repository.OptionTypeRepository;
import com.sbm.repository.SubmitionDataRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class DataScrapFormatD13ServiceImpl implements DataScrapFormatD13Service {

	private static SimpleDateFormat fullDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@Autowired
	DataScrapService dataScrapService;

	@Autowired
	private ConfigurableEnvironment configurableEnvironment;

	@Autowired
	private AreaRepository areaRepository;

	@Autowired
	private OptionRepositry optionRepositry;
	
	@Autowired
	private SubmitionDataRepository submitionDataRepository;
	
	@Autowired
	private AreaLevelRepository areaLevelRepository;
	
	
	String checkList="";
	@Override
	public void formD13DataScraping() {

		int maxTries = 1;
		Integer statusCode = 1;
		/**
		 * If we are not getting 0 as the statusCode, then we are trying 2 more times.
		 * If maxTries is equal to 4 then breaking the loop.
		 */
		log.info("Data scrape operation start for D13 " + fullDateFormat.format(new Date()));
		do {
			try {
				if (maxTries == 4) {
					log.info("Unable to scrape FormatD13 sending an email to appropriate person.");
					/**
					 * If possible send an email to appropriate person.
					 */
					break;
				}
			} catch (Exception e) {
				log.error("Error while sending an email : " + e);
			}
			Map<Integer, Map<Integer, List<Area>>> areas = areaRepository.findAll()
					.stream().collect(Collectors.groupingBy(k->(Integer)k.getAreaLevel().getAreaLevelId(), Collectors.groupingBy(v->v.getSbmAreaId(), Collectors.toList())));
			Map<Object, Map<String, List<Options>>> optionMap = optionRepositry.findAll()
					.stream().collect(Collectors.groupingBy(k->k.getOptionType().getOptionTypeId(), Collectors.groupingBy(v->v.getOptionName().toLowerCase(),Collectors.toList())));
			statusCode = formD13DataScrape(areas, optionMap);
			maxTries++;

		} while (statusCode.intValue() != 0);
		log.info("Data scrape operation finished for FormatD13 " + fullDateFormat.format(new Date()));

	}


	
	/**
	 * This method is the actual method where we are scraping the FormatER52 data.
	 * On scraping success returning 0, otherwise 1
	 * 
	 * @return statusCode contains 1 or 0
	 * 
	 * @author Rajanikanta
	 */
	@Transactional
	public Integer formD13DataScrape(Map<Integer, Map<Integer, List<Area>>> areaMap, Map<Object, Map<String, List<Options>>> optionMap) {
		Integer statusCode = 1;
		log.info("Swechagrahi data scrape start time==> " + fullDateFormat.format(new Date()));
		WebDriver driver = null;
		List<SubmitionData> submissionList =null;
		int pointer = 1;
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
			driver.get(configurableEnvironment.getProperty("sbm.form.swechagrahi.url"));

			/**
			 * Passing the username and password and clicking on submit button.
			 */
			driver.findElement(By.id("Login1_UserName")).sendKeys(new String(Base64.getDecoder().decode("b3Jpc3Nh")));
			driver.findElement(By.id("Login1_Password"))
					.sendKeys(new String(Base64.getDecoder().decode("U29zb0AyMDE5")));
			driver.findElement(By.id("Login1_LoginButton")).click();

			/**
			 * Once logged in, we are passing the new URL to load in the WebDriver.
			 */
			driver.get("https://sbm.gov.in/SBM/Secure/Entry/SBM_EntryUpdateSwachhagrahi.aspx");

			/**
			 * Getting all the <select> tag from the webdriver.
			 */

			List<WebElement> webEle = driver.findElements(By.tagName("select"));
			/**
			 * Select the first elements id from webEle.
			 */

			List<Integer> allDistricts = new ArrayList<>();
			/**
			 * Select all the dropdown options and store in a list.
			 */
			
			WebElement districtElement = driver.findElement(By.id(webEle.get(1).getAttribute("id")));
			Select dropdownDistrict= new Select(districtElement);
			List<WebElement> optionsDistrict = dropdownDistrict.getOptions();
			for (WebElement option : optionsDistrict) {
				allDistricts.add(Integer.valueOf(option.getAttribute("value"))); 
			}
			
			/**
			 * Iterating allFinancialYear list.
			 */
			SubmitionData submissionData = null;

			allDistricts.remove(0);
			for (Integer district : allDistricts) {

				System.out.println("district-> " + district);

				webEle = driver.findElements(By.tagName("select"));
				/**
				 * Select the first elements id from webEle.
				 */
				String districtSelectedId = webEle.get(1).getAttribute("id");
				/**
				 * Select all the dropdown options and store in a list.
				 */
				driver.findElement(By.id(districtSelectedId)).click();
				new Select(driver.findElement(By.id(districtSelectedId))).selectByValue(district.toString());
				driver.findElement(By.id(districtSelectedId)).click();
				driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
				List<WebElement> webEleBlock = driver.findElements(By.tagName("select"));
				/**
				 * Select the first elements id from webEle.
				 */
				
				List<Integer> allBlocks = new ArrayList<>();
				WebElement blockElement = driver.findElement(By.id(webEleBlock.get(2).getAttribute("id")));
				Select dropdownBlock = new Select(blockElement);
				List<WebElement> optionsBlock = dropdownBlock.getOptions();
				for (WebElement option : optionsBlock) {
					allBlocks.add(Integer.valueOf(option.getAttribute("value"))); 
				}
				
				allBlocks.remove(0);
				for (Integer block : allBlocks) {
					System.out.println("block ---> "+block);
					submissionList = new ArrayList<SubmitionData>();
					webEle = driver.findElements(By.tagName("select"));
					/**
					 * Select the first elements id from webEle.
					 */
					String blockSelectedId = webEle.get(2).getAttribute("id");
					/**
					 * Select all the dropdown options and store in a list.
					 */
					driver.findElement(By.id(blockSelectedId)).click();
					new Select(driver.findElement(By.id(blockSelectedId))).selectByValue(block.toString());
					driver.findElement(By.id(blockSelectedId)).click();
					driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
					List<WebElement> webEleGp = driver.findElements(By.tagName("select"));
					/**
					 * Select the first elements id from webEle.
					 */
					
					List<Integer> allGps = new ArrayList<>();
					WebElement gpElement = driver.findElement(By.id(webEleGp.get(3).getAttribute("id")));
					Select dropdownGp = new Select(gpElement);
					List<WebElement> optionsGp = dropdownGp.getOptions();
					for (WebElement option : optionsGp) {
						allGps.add(Integer.valueOf(option.getAttribute("value"))); 
					}
					
					allGps.remove(0);

					for (Integer gp : allGps) {
						System.out.println("Gp ---> " + gp);

						webEle = driver.findElements(By.tagName("select"));
						/**
						 * Select the first elements id from webEle.
						 */
						String gpSelectedId = webEle.get(3).getAttribute("id");
						driver.findElement(By.id(blockSelectedId)).click();
						new Select(driver.findElement(By.id(gpSelectedId))).selectByValue(gp.toString());
						driver.findElement(By.id(blockSelectedId)).click();

						driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);

						String pageGP = driver.getPageSource();
						Document docGP = Jsoup.parse(pageGP);
						String check = "";
						String type = "";
						String checkVal="";
						boolean table = false;
						
						 
						for (Element elements : docGP.select("tr")) {
							
							if (checkHeaderText(elements) == true) {
								Elements element = elements.select("td");
								String fieldValue = "";
								int i = 1;
							    checkList="";
//							    if(pointer>1)
//							    	i=i-1;
							    submissionData = new SubmitionData();
								submissionData.setQ1(areaMap.get(2).get(18).get(0));
								submissionData.setQ2(areaMap.get(3).get(district).get(0));
								submissionData.setQ3(areaMap.get(4).get(block).get(0));
								submissionData.setQ4(areaMap.get(5).get(gp).get(0));
								for (Element ele : element) {

									List<Element> inputElements = ele.getElementsByTag("input");
									List<Element> selectElements = ele.getElementsByTag("select");
									List<Element> tableElements = ele.getElementsByTag("table");

									if (inputElements.size() > 0 && selectElements.size() == 0) {
										type = ele.getElementsByTag("input").get(0).attr("type");
										check = ele.getElementsByTag("input").get(0).attr("checked");

										if (type.equals("checkbox")) {

											if(tableElements.size() > 0)
												{table = true;}
											if (tableElements.size() == 0) {
												submissionData = setValue(i,  fieldValue,  submissionData, areaMap,
														optionMap,  check.contains("checked"));
											}
										} else {
											if (!type.equals("checkbox"))
												fieldValue = ele.getElementsByTag("input").get(0).attr("value");
											submissionData = setValue(i,  fieldValue,  submissionData, areaMap,
													optionMap,  check.contains("checked"));
										}
									}

									if (selectElements.size() > 0) {

										WebElement selectElement = driver
												.findElement(By.id(ele.getElementsByTag("select").get(0).attr("id")));

										Select select = new Select(selectElement);
										fieldValue = select.getFirstSelectedOption().getText();

										submissionData = setValue(i,  fieldValue,  submissionData, areaMap,
												optionMap,  check.contains("checked"));
										if(fieldValue.contains("OTHER")) {
											fieldValue = ele.getElementsByTag("input").get(0).attr("value");
											System.out.println("other qulification->"+fieldValue+","+district+","+block+","+gp);
											submissionData = setValue(30,  fieldValue,  submissionData, areaMap,
													optionMap,  check.contains("checked"));
											
										}else if(fieldValue.contains("Others (Please specify)")) {
											fieldValue = ele.getElementsByTag("input").get(0).attr("value");
											System.out.println("Others (Please specify)->"+fieldValue+","+district+","+block+","+gp);
											submissionData = setValue(31,  fieldValue,  submissionData, areaMap,
													optionMap,  check.contains("checked"));
											
										}
									}

									i++;
									pointer++;

								}
								
									if( submissionData.getQ6()!=null && !submissionData.getQ6().equals("")) {
										if(submissionData.getQ4().getAreaId()== 1093 && submissionData.getQ7().equals("")) {
											System.out.println("ddd");
										}
										submissionData.setLive(true);
										submissionList.add(submissionData); 
									}
								}
							
						}
						
						
						
						driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
					}
					setValueInDomain(submissionList,block);
				}

			}
			/**
			 * Saving all the data in FormatER52 table
			 */
			driver.findElement(By.linkText("Logout")).click();
			statusCode = 0;
		} catch (Exception e) {
			log.error("Action : Error while scraping the data for FormatD13. ", e);
		} finally {
			driver.quit();
			log.info("FormatD13 data scrape end time==> " + fullDateFormat.format(new Date()));
			log.info("Quits PhantomJs driver, closing every associated window.");
		}
		return statusCode;
	}

	SubmitionData setValue(int i, String fieldValue, SubmitionData submissionData, Map<Integer, Map<Integer, List<Area>>> areaMap,
			Map<Object, Map<String, List<Options>>> optionMap, boolean checkedStatus) {
		
		switch (i) {
		case 2:
			// name
			submissionData.setQ6(fieldValue);
			break;
		case 3:
			// father's name
			submissionData.setQ7(fieldValue);
			break;
		case 4:
			// age
			submissionData.setQ8(fieldValue);
			break;
		case 5:
			// gender
			if(!fieldValue.contains("Select"))
			submissionData.setQ9((Options)optionMap.get(2).get(fieldValue.toLowerCase()).get(0));
			break;
		case 6:
			// qlification
			if(!fieldValue.contains("--Select--"))
			submissionData.setQ10((Options)optionMap.get(3).get(fieldValue.toLowerCase()).get(0));
			break;
		
		case 7:
			//Experience
			submissionData.setQ12(fieldValue);
			break;
		case 8:
			//mobile no.
			submissionData.setQ13(fieldValue);
			break;
		case 9:
			//whether trained
			if(!fieldValue.contains("Select"))
			submissionData.setQ14((Options)optionMap.get(4).get(fieldValue.toLowerCase()).get(0));
			break;
		case 10:
			//whether working
			if(fieldValue.equals("Yes")) {
			submissionData.setQ19((Options)optionMap.get(9).get(fieldValue.toLowerCase()).get(0));
			}else {
				submissionData.setQ19((Options)optionMap.get(9).get("no").get(0));
				
				if(fieldValue.equals("No-ASHA/ANM Member")) {
					submissionData.setQ20((Options)optionMap.get(10).get("asha worke").get(0));
					}else if(fieldValue.equals("No-SHG Member")) {
						submissionData.setQ20((Options)optionMap.get(10).get("anganwadi worker").get(0));
					}else {
						submissionData.setQ20((Options)optionMap.get(10).get("other").get(0));
					}
			}
			break;
		case 11:
			//whether paid
			submissionData.setQ21((Options)optionMap.get(11).get(fieldValue.toLowerCase()).get(0));
			break;
		case 12:
			//payment linked
			if(!fieldValue.contains("Select Payment Linked to"))
			submissionData.setQ22((Options)optionMap.get(12).get(fieldValue.toLowerCase()).get(0));
			break;
		case 13:
			//no of village
			submissionData.setQ24(fieldValue);
			break;
		case 15:
			//what type of activity
			if(checkedStatus) {
			checkList="39";
			}
			break;
			
		case 16:
			//what type of activity
			if(checkedStatus) {
			if(checkList.length()>0)
				checkList=checkList+",";
			checkList=checkList+"40";
			}
			break;
			
		case 17:
			//what type of activity
			if(checkedStatus) {
			if(checkList.length()>0)
				checkList=checkList+",";
			checkList=checkList+"41";
			}
			break;
			
		case 18:
			//what type of activity
			if(checkedStatus) {
			if(checkList.length()>0)
				checkList=checkList+",";
			checkList=checkList+"42";
			}
			break;
			
		case 19:
			//what type of activity
			if(checkedStatus) {
			if(checkList.length()>0)
				checkList=checkList+",";
			checkList=checkList+"43";
			}
			break;
		case 20 :
			//village name
			submissionData.setQ25((checkList.equals("")&&checkList.equals(" "))?null:checkList);
			if(!fieldValue.contains("--Select Village--"))
			submissionData.setQ26(fieldValue);
			break;
		case 21 :
			//email
			submissionData.setQ27(fieldValue);
			break;
		case 22:
			// active/inactive
			if(!fieldValue.contains("Select Status") && fieldValue.length()>0)
			submissionData.setQ28((Options)optionMap.get(14).get(fieldValue.toLowerCase()).get(0));
			break;
		case 24:
			// card type
			if(!fieldValue.contains("-- Select Card Type--") && fieldValue.length()>0)
			submissionData.setQ30((Options)optionMap.get(15).get(fieldValue.toLowerCase()).get(0));
			break;
		case 25:
			// card number
			submissionData.setQ31(fieldValue);
			break;
		case 27:
			// address
			submissionData.setQ33(fieldValue);
			break;
		
		case 30:
			//other qualification
			submissionData.setQ11(fieldValue);
			System.out.println("30--other obj value -> "+submissionData.getQ11());
			break;
		case 31:
			//other specify
			submissionData.setQ23(fieldValue);
			System.out.println("31--other specify obj value -> "+submissionData.getQ23());
			break;
		

		}

		return submissionData;
	}

	@Transactional
	private void setValueInDomain(List<SubmitionData> listOfFormatD13, int blockId) {

		
		AreaLevel level = areaLevelRepository.findByAreaLevelId(4);
		Area block = areaRepository.findBysbmAreaIdAndAreaLevel(blockId,level);
		List<SubmitionData> datas = submitionDataRepository.findByIsLiveTrueAndQ3AreaId(block.getAreaId());
		if(datas.size()==0) {
			submitionDataRepository.save(listOfFormatD13);
		}
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
	 * @author Rajanikanta
	 */
	private static boolean checkHeaderText(Element headerText) {
		if (!headerText.text().contains("Sr.No. Name of Swachhagrahi")) {
			return true;
		} else
			return false;
	}

	/**
	 * Setting all the
	 * <td>tag values in SwachhagrahiDetails domain.
	 * 
	 * @param listOfFormatER52 contains all the FormatER52 domain
	 * @param ele              is the
	 *                         <td>data
	 * @param driver           is the webdriver
	 * @param level            is the type of level whether district, block or gp
	 * @param financialYear
	 * 
	 * @return sbmHTMLId is the element id
	 */
	

}
