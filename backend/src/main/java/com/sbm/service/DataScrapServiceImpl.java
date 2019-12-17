package com.sbm.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
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
import org.openqa.selenium.phantomjs.PhantomJSDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriverService;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.sbm.domain.Area;
import com.sbm.domain.AreaDeadline;
import com.sbm.domain.AreaLevel;
import com.sbm.domain.FormatA03;
import com.sbm.domain.FormatA03Weekly;
import com.sbm.domain.FormatF42District;
import com.sbm.domain.FormatF42State;
import com.sbm.domain.FormatF42Weekly;
import com.sbm.repository.AreaDeadlineRepository;
import com.sbm.repository.AreaLevelRepository;
import com.sbm.repository.AreaRepository;
import com.sbm.repository.FormatA03WeeklyRepository;
import com.sbm.repository.FormatAO3Repository;
import com.sbm.repository.FormatF42DistrictRepository;
import com.sbm.repository.FormatF42StateRepository;
import com.sbm.repository.FormatF42WeeklyRepository;

import lombok.extern.slf4j.Slf4j;

/**
 * DataScrapServiceImpl class will insert daily and weekly format A03 and F42
 * data
 * 
 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
 * @author subrata
 * 
 */
@Service
@Slf4j
@EnableScheduling
public class DataScrapServiceImpl implements DataScrapService {

	private static SimpleDateFormat fullDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	DecimalFormat df = new DecimalFormat("0.00");

	@Autowired
	private ConfigurableEnvironment configurableEnvironment;

	@Autowired
	private FormatAO3Repository formatAO3Reposotory;

	@Autowired
	private FormatA03WeeklyRepository formatAO3WeeklyReposotory;

	@Autowired
	private FormatF42DistrictRepository formatF42DistrictRepository;

	@Autowired
	private FormatF42StateRepository formatF42StateRepository;

	@Autowired
	private AreaLevelRepository areaLevelRepository;

	@Autowired
	private AreaRepository areaRepository;

	@Autowired
	private AreaDeadlineRepository areaDeadlineRepository;

	@Autowired
	private DailyReportFormatA03Service dailyReportFormatA03Service;

	@Autowired
	private FormatF42WeeklyRepository formatF42WeeklyReposotory;

	/**
	 * This method calls a method which initializes data scraping process for format
	 * A03 This method also handles if the data scraping process fails and tries 2
	 * more times to initiate the same process This method will run everyday at
	 * 07.30 AM.
	 * 
	 * @author Mitan Kumar Batu
	 */
	@Scheduled(cron = "0 30 7 ? 1/1 ?")
	@Override
	@Transactional
	public void formA03DataScraping() {
		int maxTries = 1;
		Integer statusCode = 1;
		/**
		 * If we are not getting 0 as the statusCode, then we are trying 2 more times.
		 * If maxTries is equal to 4 then breaking the loop.
		 */
		do {
			try {
				if (maxTries == 4) {
					log.info("Unable to scrape FormatA03 sending an email to appropriate person.");
					/**
					 * If possible send an email to appropriate person.
					 */
					break;
				}
			} catch (Exception e) {
				log.error("Error while sending an email : " + e);
			}
			statusCode = formA03DataScrape();
			maxTries++;

		} while (statusCode.intValue() != 0);
		log.info("Data scrape operation finished for FormatA03 " + fullDateFormat.format(new Date()));
	}

	/**
	 * This method inserts Daily AO3 Format Data through Data Scraping, With the
	 * success of the process it returns statusCode as 0 whereas if the process
	 * fails it returns statusCode as 1
	 * 
	 * @return statusCode
	 * 
	 * @author Mitan Kumar Batu
	 */
	@Transactional
	public Integer formA03DataScrape() {
		Integer statusCode = 1;
		log.info("FormatA03 data scrape start time==>" + fullDateFormat.format(new Date()));
		WebDriver driver = null;

		try {
			Calendar cal = Calendar.getInstance();
			cal.setTime(new Date());
			/**
			 * checks if today is friday
			 */
			boolean isFriday = cal.get(Calendar.DAY_OF_WEEK) == Calendar.FRIDAY;

			/**
			 * add all the sbmAreaId as key and its count as value
			 */
			Map<Integer, Integer> mapOfSbmAreaIds = new HashMap<Integer, Integer>();

			List<FormatA03Weekly> frmtA03LatestAllDataList = null;
			Map<Integer, FormatA03Weekly> frmtA03LatestAllDataMap = null;
			/**
			 * check if today is friday then this condition is executed
			 */
			if (isFriday) {
				/**
				 * Fetching latest inserted data by date from format a03 weekly table and
				 * storing in a map.
				 */
				frmtA03LatestAllDataList = formatAO3WeeklyReposotory.findAllLatestAreas();
				frmtA03LatestAllDataMap = new LinkedHashMap<Integer, FormatA03Weekly>();
				for (FormatA03Weekly formatA03WeeklyRef : frmtA03LatestAllDataList) {
					frmtA03LatestAllDataMap.put(formatA03WeeklyRef.getAreaId(), formatA03WeeklyRef);
				}
			}

			/**
			 * Fetching deadline date for every area and storing in a map.
			 */
			List<AreaDeadline> areaDeadlineList = areaDeadlineRepository.findByIsDeadLineActiveTrue();
			Map<Integer, Date> areaDeadlineMap = new LinkedHashMap<Integer, Date>();
			for (AreaDeadline areaDeadline : areaDeadlineList) {
				areaDeadlineMap.put(areaDeadline.getAreaId().getSbmAreaId(), areaDeadline.getDeadline());
			}

			/**
			 * Fetching latest inserted State data by date from format AO3 table and storing
			 * in two maps.
			 */
			Map<String, Integer> stateListMap = new LinkedHashMap<String, Integer>();
			Map<String, Integer> stateDeficitMap = new LinkedHashMap<String, Integer>();
			List<FormatA03> stateList = formatAO3Reposotory.findLatestState();
			Iterator<FormatA03> stateIterator = stateList.iterator();
			while (stateIterator.hasNext()) {
				FormatA03 bean = stateIterator.next();
				stateListMap.put(bean.getStateName().toLowerCase() + "_" + "india", bean.getCoverageHHIncludingBLS());
				if (bean.getBalanceUncoveredRR() != null)
					stateDeficitMap.put(bean.getStateName().toLowerCase() + "_" + "india",
							(int) Math.round(bean.getBalanceUncoveredRR()));
				else
					stateDeficitMap.put(bean.getStateName().toLowerCase() + "_" + "india", null);
			}

			/**
			 * Fetching latest inserted District data by date from format AO3 table and
			 * storing in two maps.
			 */
			Map<String, Integer> districtListMap = new LinkedHashMap<String, Integer>();
			Map<String, Integer> districtDeficitMap = new LinkedHashMap<String, Integer>();
			List<FormatA03> districtList = formatAO3Reposotory.findAllDistricts();
			Iterator<FormatA03> iterator3 = districtList.iterator();
			while (iterator3.hasNext()) {
				FormatA03 bean = iterator3.next();
				districtListMap.put(bean.getDistrictName().toLowerCase() + "_" + bean.getStateName().toLowerCase(),
						bean.getCoverageHHIncludingBLS());
				if (bean.getBalanceUncoveredRR() != null)
					districtDeficitMap.put(
							bean.getDistrictName().toLowerCase() + "_" + bean.getStateName().toLowerCase(),
							(int) Math.round(bean.getBalanceUncoveredRR()));
				else
					districtDeficitMap
							.put(bean.getDistrictName().toLowerCase() + "_" + bean.getStateName().toLowerCase(), null);
			}

			/**
			 * Fetching latest inserted Block data by date from format AO3 table and storing
			 * in two maps.
			 */
			Map<String, Integer> blockListMap = new LinkedHashMap<String, Integer>();
			Map<String, Integer> blockDeficitMap = new LinkedHashMap<String, Integer>();
			List<FormatA03> blockList = formatAO3Reposotory.findAllBlocks();
			Iterator<FormatA03> iterator4 = blockList.iterator();
			while (iterator4.hasNext()) {
				FormatA03 bean1 = iterator4.next();
				blockListMap.put(bean1.getBlockName().toLowerCase() + "_" + bean1.getDistrictName().toLowerCase() + "_"
						+ bean1.getStateName().toLowerCase(), bean1.getCoverageHHIncludingBLS());
				if (bean1.getBalanceUncoveredRR() != null)
					blockDeficitMap.put(
							bean1.getBlockName().toLowerCase() + "_" + bean1.getDistrictName().toLowerCase() + "_"
									+ bean1.getStateName().toLowerCase(),
							(int) Math.round(bean1.getBalanceUncoveredRR()));
				else
					blockDeficitMap.put(bean1.getBlockName().toLowerCase() + "_" + bean1.getDistrictName().toLowerCase()
							+ "_" + bean1.getStateName().toLowerCase(), null);
			}

			/**
			 * Fetching latest inserted GP data by date from format AO3 table and storing in
			 * two maps.
			 */
			Map<String, Integer> gpListMap = new LinkedHashMap<String, Integer>();
			Map<String, Integer> gpDeficitMap = new LinkedHashMap<String, Integer>();
			List<FormatA03> gpList = formatAO3Reposotory.findAllGps();
			Iterator<FormatA03> iterator5 = gpList.iterator();
			while (iterator5.hasNext()) {
				FormatA03 bean2 = iterator5.next();
				gpListMap.put(
						bean2.getGpName().toLowerCase() + "_" + bean2.getBlockName().toLowerCase() + "_"
								+ bean2.getDistrictName().toLowerCase() + "_" + bean2.getStateName().toLowerCase(),
						bean2.getCoverageHHIncludingBLS());
				if (bean2.getBalanceUncoveredRR() != null)
					gpDeficitMap.put(
							bean2.getGpName().toLowerCase() + "_" + bean2.getBlockName().toLowerCase() + "_"
									+ bean2.getDistrictName().toLowerCase() + "_" + bean2.getStateName().toLowerCase(),
							(int) Math.round(bean2.getBalanceUncoveredRR()));
				else
					gpDeficitMap.put(
							bean2.getGpName().toLowerCase() + "_" + bean2.getBlockName().toLowerCase() + "_"
									+ bean2.getDistrictName().toLowerCase() + "_" + bean2.getStateName().toLowerCase(),
							null);

			}

			/**
			 * Fetching all area detail from area table and storing in a map.
			 */
			Map<Integer, Area> areaModelMap = new LinkedHashMap<Integer, Area>();
			List<Area> areaList = areaRepository.findAll();
			Iterator<Area> iterator = areaList.iterator();
			while (iterator.hasNext()) {
				Area areaDomain = iterator.next();
				areaModelMap.put(areaDomain.getSbmAreaId(), areaDomain);
			}

			/**
			 * Iterating the areaList and setting the sbm area id as per area level id in
			 * different maps i.e
			 * stateMap,districtStateMap,blockDistrictStateMap,gpBlockDistrictStateMap.
			 * Simultaneously set area level id as key and the above mentioned map as value
			 * in another map i.e map
			 */
			Map<Integer, LinkedHashMap<String, Integer>> map = new LinkedHashMap<Integer, LinkedHashMap<String, Integer>>();
			LinkedHashMap<String, Integer> stateMap = new LinkedHashMap<>();
			LinkedHashMap<String, Integer> districtStateMap = new LinkedHashMap<>();
			LinkedHashMap<String, Integer> blockDistrictStateMap = new LinkedHashMap<>();
			LinkedHashMap<String, Integer> gpBlockDistrictStateMap = new LinkedHashMap<>();
			Iterator<Area> iterator2 = areaList.iterator();
			while (iterator2.hasNext()) {
				Area areaDomain = iterator2.next();
				switch (areaDomain.getAreaLevel().getAreaLevelId()) {
				case 2:
					stateMap.put(
							areaDomain.getAreaName().toUpperCase() + "_"
									+ areaModelMap.get(areaDomain.getParentAreaId()).getAreaName().toUpperCase(),
							areaDomain.getSbmAreaId());
					map.put(areaDomain.getAreaLevel().getAreaLevelId(), stateMap);
					break;
				case 3:
					districtStateMap.put(
							areaDomain.getAreaName().toUpperCase() + "_"
									+ areaModelMap.get(areaDomain.getParentAreaId()).getAreaName().toUpperCase(),
							areaDomain.getSbmAreaId());
					map.put(areaDomain.getAreaLevel().getAreaLevelId(), districtStateMap);
					break;
				case 4:
					blockDistrictStateMap.put(areaDomain.getAreaName().toUpperCase() + "_"
							+ areaModelMap.get(areaDomain.getParentAreaId()).getAreaName().toUpperCase() + "_"
							+ areaModelMap.get(areaModelMap.get(areaDomain.getParentAreaId()).getParentAreaId())
									.getAreaName().toUpperCase(),
							areaDomain.getSbmAreaId());
					map.put(areaDomain.getAreaLevel().getAreaLevelId(), blockDistrictStateMap);
					break;
				case 5:
					gpBlockDistrictStateMap.put(areaDomain.getAreaName().toUpperCase() + "_"
							+ areaModelMap.get(areaDomain.getParentAreaId()).getAreaName().toUpperCase() + "_"
							+ areaModelMap.get(areaModelMap.get(areaDomain.getParentAreaId()).getParentAreaId())
									.getAreaName().toUpperCase()
							+ "_"
							+ areaModelMap.get(
									areaModelMap.get(areaModelMap.get(areaDomain.getParentAreaId()).getParentAreaId())
											.getParentAreaId())
									.getAreaName().toUpperCase(),
							areaDomain.getSbmAreaId());
					map.put(areaDomain.getAreaLevel().getAreaLevelId(), gpBlockDistrictStateMap);
					break;

				}
			}

			/**
			 * Fetching all area level detail from area level table and storing in a map.
			 */
			List<AreaLevel> areaLevelList = areaLevelRepository.findAll();
			Map<String, Integer> areaLevelMap = areaLevelList.stream()
					.collect(Collectors.toMap(AreaLevel::getAreaLevelName, AreaLevel::getAreaLevelId));

			/**
			 * Web Driver is called
			 */
			driver = getWebDriver();
			/**
			 * Reading the properties value from application.properties file and the
			 * specific page is opened by web driver
			 */
			driver.get(configurableEnvironment.getProperty("sbm.form.a03.url"));
			/**
			 * Clicking the Select State Drop down
			 */
			driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlState")).click();
			/**
			 * Opening the Select State Drop down. Reading the properties value from
			 * application.properties file for the key state.odisha.id Selecting Odisha in
			 * drop down
			 */
			new Select(driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlState")))
					.selectByValue(configurableEnvironment.getProperty("state.odisha.id"));
			driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlState")).click();
			/**
			 * Opening the Select District Drop down. Setting all the options of drop down
			 * in a list i.e allOptionsDistrict
			 */
			WebElement selectElementDistrict = driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlDistrict"));
			Select select = new Select(selectElementDistrict);
			List<WebElement> allOptionsDistrict = select.getOptions();
			String area = null;
			String stateName = null;
			String districtName = null;
			String blockName = null;
			List<FormatA03> dataDomains = new ArrayList<FormatA03>();
			List<FormatA03Weekly> ftA03WklyDtaLst = new ArrayList<FormatA03Weekly>();
			List<FormatA03> dailyReportDataList = new ArrayList<>();

			/**
			 * Iterating list of districts i.e allOptionsDistrict
			 */
			for (int j = 0; j < allOptionsDistrict.size(); j++) {
				/**
				 * Clicking the Select District Drop down
				 */
				driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlDistrict")).click();
				/**
				 * Selecting the districts according to allOptionsDistrict loop index
				 */
				new Select(driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlDistrict"))).selectByIndex(j);
				/**
				 * Clicking the Selected District in Drop down
				 */
				driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlDistrict")).click();
				/**
				 * Opening the Select Block Drop down. Setting all the options of drop down in a
				 * list i.e allOptionsBlocks
				 */
				WebElement selectElementBlocks = driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlBlock"));
				Select selectBlocks = new Select(selectElementBlocks);
				List<WebElement> allOptionsBlocks = selectBlocks.getOptions();

				/**
				 * Iterating list of blocks i.e allOptionsBlocks
				 */
				for (int i = 0; i < allOptionsBlocks.size(); i++) {
					/**
					 * Clicking the Select Block Drop down
					 */
					driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlBlock")).click();
					/**
					 * Selecting the blocks according to allOptionsBlocks loop index
					 */
					new Select(driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlBlock"))).selectByIndex(i);
					/**
					 * Clicking the Selected Block in Drop down
					 */
					driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlBlock")).click();
					/**
					 * Clicking the View Report Button
					 */
					driver.findElement(By.id("ctl00_ContentPlaceHolder1_btnSubmit")).click();
					/**
					 * Getting the page source of the report and parsing it to get HTML Document
					 * type
					 */
					String pageSource = driver.getPageSource();
					Document doc = Jsoup.parse(pageSource);
//					==============for header========

					int count = 0;
					Elements rows = doc.select("tr");
					/**
					 * Iterating the
					 * <tr>
					 * tag from the page source
					 */
					for (Element header : rows) {
						/**
						 * Skipping first five iteration as they are table headers On sixth iteration
						 * set the area type i.e if the areas which need to be scrapped are
						 * districts,blocks or gps,districtName,blockName,stateName Setting
						 * districtName,blockName,stateName in the current iteration
						 */
						if (count == 5) {

							if (!header.text().contains("District") && !header.text().contains("Block")) {
								area = "districts";
								stateName = driver
										.findElement(By.id("ctl00_ContentPlaceHolder1_Rpt_data_ctl00_lblstatename"))
										.getText().split(":-")[1];

							} else if (header.text().contains("State") && header.text().contains("District")
									&& !header.text().contains("Block")) {
								area = "blocks";
								districtName = driver
										.findElement(By.id("ctl00_ContentPlaceHolder1_Rpt_data_ctl00_lbldtname"))
										.getText().split(":-")[1];
								stateName = driver
										.findElement(By.id("ctl00_ContentPlaceHolder1_Rpt_data_ctl00_lblstatename"))
										.getText().split(":-")[1];
							} else if (header.text().contains("State") && header.text().contains("District")
									&& header.text().contains("Block")) {
								area = "gps";
								districtName = driver
										.findElement(By.id("ctl00_ContentPlaceHolder1_Rpt_data_ctl00_lbldtname"))
										.getText().split(":-")[1];
								blockName = driver
										.findElement(By.id("ctl00_ContentPlaceHolder1_Rpt_data_ctl00_lblblname"))
										.getText().split(":-")[1];
								stateName = driver
										.findElement(By.id("ctl00_ContentPlaceHolder1_Rpt_data_ctl00_lblstatename"))
										.getText().split(":-")[1];

							}
						}
						FormatA03 dataDomain = new FormatA03();
						Elements elee = header.select("td");
						/**
						 * Setting variable a which value is 0 when data scrapped for district level and
						 * 1 for state level
						 */
						int a = !header.text().startsWith("Total") ? 0 : 1;
						/**
						 * checking if the data is scrapped for districts and if the index of
						 * allOptionsBlocks and allOptionsDistrict are 0 which confirms scrapped data
						 * are districts
						 */
						if ("districts".equalsIgnoreCase(area) && (i == 0 && j == 0)) {

							/**
							 * Iterating the
							 * <td>tag of the current iterating
							 * <tr>
							 * tag from the page source
							 */
							for (Element element : elee) {

								switch (a) {
								case 0:

									break;
								case 1:
									/**
									 * Checking if the scrapped data is for district or state and setting the the
									 * AreaLevelId accordingly
									 */
									dataDomain.setAreaLevelId(
											!header.text().startsWith("Total") ? areaLevelMap.get("District")
													: areaLevelMap.get("State"));
									/**
									 * Checking if the scrapped data is for district or state and setting the the
									 * DistrictName accordingly
									 */
									dataDomain.setDistrictName(
											!header.text().startsWith("Total") ? element.text() : null);
									dataDomain.setStateName(stateName);
									dataDomain.setCreatedDate(new Date());
									String mapKey = null;
									/**
									 * Checking if the scrapped data is for district or state by areaLevelId and
									 * setting the sbm area id accordingly
									 */
									if (dataDomain.getAreaLevelId() == 2) {
										mapKey = dataDomain.getStateName() + "_" + "INDIA";
										dataDomain.setAreaId(
												map.get(dataDomain.getAreaLevelId()).get(mapKey.toUpperCase()));
									} else if (dataDomain.getAreaLevelId() == 3) {
										mapKey = dataDomain.getDistrictName() + "_" + dataDomain.getStateName();
										dataDomain.setAreaId(map.get(dataDomain.getAreaLevelId()).get(mapKey));
									}
									break;
								case 2:
									dataDomain.setDetailsWithOrWithoutToilet(Integer.valueOf(element.text()));
									break;
								case 3:
									dataDomain.setTotalDetailEnteredLob(Integer.valueOf(element.text()));
									break;
								case 4:
									dataDomain.setDetailsWithOrWithoutToiletLob(Integer.valueOf(element.text()));
									break;
								case 5:
									dataDomain.setHhDetailsWithToilet(Integer.valueOf(element.text()));
									break;
								case 6:
									dataDomain.setBplNotHavingToilet(Integer.valueOf(element.text()));
									break;
								case 7:
									dataDomain.setIdentifiedAplNotHavingToilet(Integer.valueOf(element.text()));
									break;
								case 8:
									dataDomain.setUnidentifiedAplNotHavingToilet(Integer.valueOf(element.text()));
									break;
								case 9:
									dataDomain.setTotalAplNotHavingToilet(Integer.valueOf(element.text()));
									break;
								case 10:
									dataDomain.setTotalBplAplNotHavingToilet(Integer.valueOf(element.text()));
									break;
								case 11:
									dataDomain.setTotalHHIdentifiedNotHavingToilet(Integer.valueOf(element.text()));
									break;

								case 12:
									dataDomain.setCoverageHH1314Reported(Integer.valueOf(element.text()));
									break;

								case 13:
									dataDomain.setCoverage1314OutOfHHEntered(Integer.valueOf(element.text()));
									break;

								case 14:
									dataDomain.setCoverageHHDistrictWise1314(Integer.valueOf(element.text()));
									break;

								case 15:
									dataDomain.setCoverageHH1415(Integer.valueOf(element.text()));
									break;
								case 16:
									dataDomain.setCoverageHH1516(Integer.valueOf(element.text()));
									break;
								case 17:
									dataDomain.setCoverageHH1617(Integer.valueOf(element.text()));
									break;
								case 18:
									dataDomain.setCoverageHH1718(Integer.valueOf(element.text()));
									break;
								case 19:
									dataDomain.setCoverageHH1819(Integer.valueOf(element.text()));
									break;
								case 20:
									dataDomain.setCoverageHH1920(Integer.valueOf(element.text()));
									break;
								case 21:
									dataDomain.setCoverageHHCommunityOtherToilet(Integer.valueOf(element.text()));
									break;
								case 22:
									dataDomain.setCoverageHHAfterBLS(Integer.valueOf(element.text()));
									break;
								case 23:
									dataDomain.setCoverageHHIncludingBLS(Integer.valueOf(element.text()));

									/**
									 * Checking if the scrapped data is for district or state and setting the HH
									 * covered Yesterday accordingly
									 */
									Integer hhCoverageyesterday = !header.text().startsWith("Total")
											? districtListMap.get(dataDomain.getDistrictName().toLowerCase() + "_"
													+ dataDomain.getStateName().toLowerCase())
											: stateListMap.get(dataDomain.getStateName().toLowerCase() + "_" + "india");

									Integer coverageHHIncludingBLSLeft = (hhCoverageyesterday != null)
											? (dataDomain.getCoverageHHIncludingBLS() - hhCoverageyesterday)
											: null;
									dataDomain.setHHCoveragedYesterday(coverageHHIncludingBLSLeft);

									/**
									 * Checking if the scrapped data is for district or state and setting the
									 * Deficit accordingly
									 */
									Integer yesterdayRequiredRate = !header.text().startsWith("Total")
											? districtDeficitMap.get(dataDomain.getDistrictName().toLowerCase() + "_"
													+ dataDomain.getStateName().toLowerCase())
											: stateDeficitMap
													.get(dataDomain.getStateName().toLowerCase() + "_" + "india");

									if (yesterdayRequiredRate != null) {
										dataDomain.setDeficit((yesterdayRequiredRate - coverageHHIncludingBLSLeft) >= 0
												? (yesterdayRequiredRate - coverageHHIncludingBLSLeft)
												: 0);
									} else {
										dataDomain.setDeficit(0);
									}
//									dataDomain.setDeficit(yesterdayRequiredRate!=null?(yesterdayRequiredRate- coverageHHIncludingBLSLeft): 0);

									break;
								case 24:
									dataDomain.setCoverageHHBalanceUncovered(Integer.valueOf(element.text()));

									/**
									 * Calculating the days left between current date and deadline date of scrapped
									 * area Calculating the required rate of construction per day
									 */
									LocalDate startDate = LocalDate.now();
									LocalDate currentDate = (areaDeadlineMap.get(dataDomain.getAreaId()).toInstant()
											.atZone(ZoneId.systemDefault()).toLocalDate());
									long noOfDaysBetween = ChronoUnit.DAYS.between(startDate, currentDate);
									Double value = noOfDaysBetween <= 0 ? null
											: Double.parseDouble(
													df.format(((double) dataDomain.getCoverageHHBalanceUncovered()
															/ (double) noOfDaysBetween)));
									dataDomain.setBalanceUncoveredRR(value);

									break;
								case 25:
									dataDomain.setHhCoveredInLOB(Double.valueOf(element.text()));
									break;
									
								case 26:
									dataDomain.setCoverageHHLobBls(Integer.valueOf(element.text()));
									break;
									
								case 27:
									dataDomain.setIhhlCoveragePercent(Double.valueOf(element.text()));
									break;

								}
								a++;
							}
						}
						/**
						 * checking if the data scrapped for blocks or gps and the row having name Total
						 * is skipped
						 */
						else if (("blocks".equalsIgnoreCase(area) || "gps".equalsIgnoreCase(area))
								&& !header.text().startsWith("Total")) {
							for (Element element : elee) {

								switch (a) {
								case 0:
									break;
								case 1:
									if (area.equalsIgnoreCase("blocks")) {
										dataDomain.setAreaLevelId(areaLevelMap.get("Block"));
										dataDomain.setBlockName(element.text());
										dataDomain.setDistrictName(districtName);
										dataDomain.setStateName(stateName);
										dataDomain.setCreatedDate(new Date());
									} else if (area.equalsIgnoreCase("gps")) {
										dataDomain.setAreaLevelId(areaLevelMap.get("Gram Panchayat"));
										dataDomain.setGpName(element.text());
										dataDomain.setDistrictName(districtName);
										dataDomain.setBlockName(blockName);
										dataDomain.setStateName(stateName);
										dataDomain.setCreatedDate(new Date());
									}
									String mapKey = null;
									/**
									 * Checking if the scrapped data is for block or gp by areaLevelId and setting
									 * the sbm area id accordingly
									 */
									if (dataDomain.getAreaLevelId() == 4) {
										mapKey = dataDomain.getBlockName() + "_" + dataDomain.getDistrictName() + "_"
												+ dataDomain.getStateName();
										dataDomain.setAreaId(
												map.get(dataDomain.getAreaLevelId()).get(mapKey.toUpperCase()));
									} else if (dataDomain.getAreaLevelId() == 5) {
										mapKey = dataDomain.getGpName() + "_" + dataDomain.getBlockName() + "_"
												+ dataDomain.getDistrictName() + "_" + dataDomain.getStateName();
										dataDomain.setAreaId(
												map.get(dataDomain.getAreaLevelId()).get(mapKey.toUpperCase()));
									}
									break;
								case 2:
									dataDomain.setDetailsWithOrWithoutToilet(Integer.valueOf(element.text()));
									break;
								case 3:
									dataDomain.setTotalDetailEnteredLob(Integer.valueOf(element.text()));
									break;
								case 4:
									dataDomain.setDetailsWithOrWithoutToiletLob(Integer.valueOf(element.text()));
									break;
								case 5:
									dataDomain.setHhDetailsWithToilet(Integer.valueOf(element.text()));
									break;
								case 6:
									dataDomain.setBplNotHavingToilet(Integer.valueOf(element.text()));
									break;
								case 7:
									dataDomain.setIdentifiedAplNotHavingToilet(Integer.valueOf(element.text()));
									break;
								case 8:
									dataDomain.setUnidentifiedAplNotHavingToilet(Integer.valueOf(element.text()));
									break;
								case 9:
									dataDomain.setTotalAplNotHavingToilet(Integer.valueOf(element.text()));
									break;
								case 10:
									dataDomain.setTotalBplAplNotHavingToilet(Integer.valueOf(element.text()));
									break;
								case 11:
									dataDomain.setTotalHHIdentifiedNotHavingToilet(Integer.valueOf(element.text()));
									break;

								case 12:
									dataDomain.setCoverage1314HHEntered(Integer.valueOf(element.text()));
									break;

								case 13:
									dataDomain.setCoverageHH1415(Integer.valueOf(element.text()));
									break;
								case 14:
									dataDomain.setCoverageHH1516(Integer.valueOf(element.text()));
									break;
								case 15:
									dataDomain.setCoverageHH1617(Integer.valueOf(element.text()));
									break;
								case 16:
									dataDomain.setCoverageHH1718(Integer.valueOf(element.text()));
									break;
								case 17:
									dataDomain.setCoverageHH1819(Integer.valueOf(element.text()));
									break;
								case 18:
									dataDomain.setCoverageHH1920(Integer.valueOf(element.text()));
									break;
								case 19:
									dataDomain.setCoverageHHCommunityOtherToilet(Integer.valueOf(element.text()));
									break;
								case 20:
									dataDomain.setCoverageHHAfterBLS(Integer.valueOf(element.text()));
									break;
								case 21:
									dataDomain.setCoverageHHIncludingBLS(Integer.valueOf(element.text()));

									/**
									 * Checking if the scrapped data is for blocks or gps and setting the HH covered
									 * Yesterday and deficit accordingly
									 */
									if (area.equalsIgnoreCase("blocks")) {

										Integer yesterdatBlockCoverageIncludingBls = blockListMap
												.get(dataDomain.getBlockName().toLowerCase() + "_"
														+ dataDomain.getDistrictName().toLowerCase() + "_"
														+ dataDomain.getStateName().toLowerCase());
										Integer districtCoverageHHIncludingBLS = yesterdatBlockCoverageIncludingBls != null
												? (dataDomain.getCoverageHHIncludingBLS()
														- yesterdatBlockCoverageIncludingBls)
												: null;
										dataDomain.setHHCoveragedYesterday(districtCoverageHHIncludingBLS);

										Integer yesterdayRequiredRate = blockDeficitMap
												.get(dataDomain.getBlockName().toLowerCase() + "_"
														+ dataDomain.getDistrictName().toLowerCase() + "_"
														+ dataDomain.getStateName().toLowerCase());

										if (yesterdayRequiredRate != null) {
											dataDomain.setDeficit(
													(yesterdayRequiredRate - districtCoverageHHIncludingBLS) >= 0
															? (yesterdayRequiredRate - districtCoverageHHIncludingBLS)
															: 0);
										} else {
											dataDomain.setDeficit(0);
										}
//									  dataDomain.setDeficit(yesterdayRequiredRate!=null?(yesterdayRequiredRate- districtCoverageHHIncludingBLS): 0);

									} else if (area.equalsIgnoreCase("gps")) {

										Integer yesterdaygpCoverageHHIncludingBLS = gpListMap
												.get(dataDomain.getGpName().toLowerCase() + "_"
														+ dataDomain.getBlockName().toLowerCase() + "_"
														+ dataDomain.getDistrictName().toLowerCase() + "_"
														+ dataDomain.getStateName().toLowerCase());
										Integer gpCoverageHHIncludingBLS = yesterdaygpCoverageHHIncludingBLS != null
												? (dataDomain.getCoverageHHIncludingBLS()
														- yesterdaygpCoverageHHIncludingBLS)
												: null;
										dataDomain.setHHCoveragedYesterday(gpCoverageHHIncludingBLS);

										Integer yesterdayRequiredRate = gpDeficitMap
												.get(dataDomain.getGpName().toLowerCase() + "_"
														+ dataDomain.getBlockName().toLowerCase() + "_"
														+ dataDomain.getDistrictName().toLowerCase() + "_"
														+ dataDomain.getStateName().toLowerCase());

										if (yesterdayRequiredRate != null) {
											dataDomain
													.setDeficit((yesterdayRequiredRate - gpCoverageHHIncludingBLS) >= 0
															? (yesterdayRequiredRate - gpCoverageHHIncludingBLS)
															: 0);
										} else {
											dataDomain.setDeficit(0);
										}
//											dataDomain.setDeficit(yesterdayRequiredRate!=null?(yesterdayRequiredRate- gpCoverageHHIncludingBLS): 0);

									}

									break;
								case 22:
									dataDomain.setCoverageHHBalanceUncovered(Integer.valueOf(element.text()));
									/**
									 * Calculating the days left between current date and deadline date of scrapped
									 * area Calculating the required rate of construction per day
									 */
									if (area.equalsIgnoreCase("blocks")) {

										LocalDate startDate = LocalDate.now();
										LocalDate currentDate = (areaDeadlineMap.get(dataDomain.getAreaId()).toInstant()
												.atZone(ZoneId.systemDefault()).toLocalDate());
										long noOfDaysBetween = ChronoUnit.DAYS.between(startDate, currentDate);
										Double value = noOfDaysBetween <= 0 ? null
												: Double.parseDouble(
														df.format((double) (dataDomain.getCoverageHHBalanceUncovered()
																/ (double) noOfDaysBetween)));
										dataDomain.setBalanceUncoveredRR(value);

									} else if (area.equalsIgnoreCase("gps")) {

										LocalDate startDate = LocalDate.now();
										LocalDate currentDate = (areaDeadlineMap
												.get(areaModelMap.get(dataDomain.getAreaId()).getParentAreaId())
												.toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
										long noOfDaysBetween = ChronoUnit.DAYS.between(startDate, currentDate);
										Double value = noOfDaysBetween <= 0 ? null
												: Double.parseDouble(
														df.format((double) (dataDomain.getCoverageHHBalanceUncovered()
																/ (double) noOfDaysBetween)));
										dataDomain.setBalanceUncoveredRR(value);

									}
									break;
									
								case 23:
									dataDomain.setHhCoveredInLOB(Double.valueOf(element.text()));
									break;
								case 24:
									dataDomain.setCoverageHHLobBls(Integer.valueOf(element.text()));
									break;
								case 25:
									dataDomain.setIhhlCoveragePercent(Double.valueOf(element.text()));
									break;
								}
								a++;
							}
						}
						if (dataDomain.getIhhlCoveragePercent() != null) {
							double balanceUncoveredPercent = dataDomain.getDetailsWithOrWithoutToilet().intValue() == 0
									? 0
									: (double) (dataDomain.getCoverageHHBalanceUncovered() * 100)
											/ dataDomain.getDetailsWithOrWithoutToilet();

							df.format(balanceUncoveredPercent);
							dataDomain.setCreatedDate(new Date());
							dataDomain.setCoverageHHBalanceUncoveredPercent(
									Double.parseDouble(df.format(balanceUncoveredPercent)));
							/**
							 * Setting the key as sbm area id and value as its count
							 */
							mapOfSbmAreaIds.put(dataDomain.getAreaId(),
									mapOfSbmAreaIds.get(dataDomain.getAreaId()) == null ? 1
											: mapOfSbmAreaIds.get(dataDomain.getAreaId()) + 1);
							/**
							 * Checking if the count of sbm area id is 1 then, Add the format A03 domain in
							 * a list
							 */
							if (mapOfSbmAreaIds.get(dataDomain.getAreaId()) == 1) {
								dataDomains.add(dataDomain);
								/**
								 * Check if current date is friday
								 */
								if (isFriday) {
									/**
									 * Method is called for weekly Format A03 data insertion
									 */
									FormatA03Weekly formatA03Weekly = getFtA03WklyDtaDomain(dataDomain,
											frmtA03LatestAllDataList, frmtA03LatestAllDataMap, areaModelMap,
											areaDeadlineMap);
									/**
									 * Add the format A03 Weekly domain in a list
									 */
									ftA03WklyDtaLst.add(formatA03Weekly);
								}
								/**
								 * Add the format A03 domain in a list for daily report
								 */
								dailyReportDataList.add(dataDomain);
							}

						}
						count++;
					}
					/**
					 * Clicking the Back to Previous button
					 */
					driver.findElement(By.id("ctl00_ContentPlaceHolder1_lnk_selection")).click();
					/**
					 * Opening the Select Block Drop down. Setting all the options of drop down in a
					 * list i.e allOptionsBlocks
					 */
					selectElementBlocks = driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlBlock"));
					selectBlocks = new Select(selectElementBlocks);
					allOptionsBlocks = selectBlocks.getOptions();
				}
				/**
				 * Opening the Select District Drop down. Setting all the options of drop down
				 * in a list i.e allOptionsDistrict
				 */
				selectElementDistrict = driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlDistrict"));
				select = new Select(selectElementDistrict);
				allOptionsDistrict = select.getOptions();

			}
			/**
			 * Saving Daily Format A03 list in DB Saving Weekly Format A03 list in DB Saving
			 * Daily Format A03 list in DB for daily report Reinitializing the statusCode as
			 * 0
			 */
			formatAO3Reposotory.save(dataDomains);
			formatAO3WeeklyReposotory.save(ftA03WklyDtaLst);
			dailyReportFormatA03Service.genDailyReport(dailyReportDataList);
			statusCode = 0;
			log.info("FormatA03 data scrape end time==> " + fullDateFormat.format(new Date()));
		} catch (Exception e) {
			log.error("Action : Error while scraping the data for FormatA03 ", e);
		} finally {
			driver.quit();
			log.info("Quits PhantomJs driver, closing every associated window.");
		}
		return statusCode;
	}

	/**
	 * This method sets Weekly A03 Format Data from FormatA03 domain and returns the
	 * weekly domain
	 * 
	 * @param datadomain               refers to currently scrapped domain of daily
	 *                                 FormatA03 domain
	 * @param frmtA03LatestAllDataList refers to latest inserted data by date from
	 *                                 format a03 weekly
	 * @param frmtA03LatestAllDataMap  refers to map where key is sbmAreaId and
	 *                                 domain as value of latest inserted data by
	 *                                 date from format a03 weekly
	 * @param areaModelMap             refers to map where key is sbmAreaId and
	 *                                 values as the domain from area table
	 * @param areaDeadlineMap          refers to a map where key is sbmAreaId and
	 *                                 value as deadlineDate from deadline table
	 * 
	 * @return FormatA03Weekly refers to the Weekly A03 Format Data Domain
	 * 
	 * @author Mitan Kumar Batu
	 */
//	================================================================================
	@Override
	public FormatA03Weekly getFtA03WklyDtaDomain(FormatA03 datadomain, List<FormatA03Weekly> frmtA03LatestAllDataList,
			Map<Integer, FormatA03Weekly> frmtA03LatestAllDataMap, Map<Integer, Area> areaModelMap,
			Map<Integer, Date> areaDeadlineMap) {

		/**
		 * Gets the size of the latest inserted data by date from format a03 weekly
		 * table
		 */
		int frmtA03ltstAllDataSize = frmtA03LatestAllDataList.size();
		FormatA03Weekly ftA03WklyDtaDmn = new FormatA03Weekly();
		/**
		 * Setting data from FormatA03 Domain into Weekly Format A03 Domain
		 */
		ftA03WklyDtaDmn.setAreaId(datadomain.getAreaId());
		ftA03WklyDtaDmn.setParentAreaId(areaModelMap.get(datadomain.getAreaId()).getParentAreaId());
		ftA03WklyDtaDmn.setAreaLevelId(datadomain.getAreaLevelId());
		ftA03WklyDtaDmn.setBlockName(datadomain.getBlockName());
		ftA03WklyDtaDmn.setCoverageHHBalanceUncovered(datadomain.getCoverageHHBalanceUncovered());
		ftA03WklyDtaDmn.setCoverageHHIncludingBLS(datadomain.getCoverageHHIncludingBLS());
		ftA03WklyDtaDmn.setCreatedDate(datadomain.getCreatedDate());
		ftA03WklyDtaDmn.setDistrictName(datadomain.getDistrictName());
		ftA03WklyDtaDmn.setIhhlCoveragePercent(datadomain.getIhhlCoveragePercent());
		ftA03WklyDtaDmn.setStateName(datadomain.getStateName());
		ftA03WklyDtaDmn.setGpName(datadomain.getGpName());

		/**
		 * Checking if the size of latest inserted data by date from format a03 weekly
		 * table is 0 If 0 then ImprovmentSinceDate is set to null Else
		 * ImprovmentSinceDate is set to created date of latest inserted data from
		 * format a03 weekly table
		 */
		ftA03WklyDtaDmn.setImprovmentSinceDate(
				frmtA03ltstAllDataSize != 0 ? frmtA03LatestAllDataMap.get(datadomain.getAreaId()).getCreatedDate()
						: null);

		/**
		 * Checking if the size of latest inserted data by date from format a03 weekly
		 * table is 0 If 0 then Improvement is set to null Else Improvement is set to
		 * this week CoverageHHIncludingBLS subtracted by last week
		 * CoverageHHIncludingBLS
		 */
		Integer latestCovHHIncludingBls = frmtA03ltstAllDataSize != 0
				? frmtA03LatestAllDataMap.get(datadomain.getAreaId()).getCoverageHHIncludingBLS()
				: null;
		Integer improvment = latestCovHHIncludingBls != null
				? datadomain.getCoverageHHIncludingBLS() - latestCovHHIncludingBls
				: null;
		ftA03WklyDtaDmn.setImprovment(improvment);

		/**
		 * Calculating the weeks left between current date and deadline date of the area
		 * Calculating the required rate of construction per week
		 */
		Date latestCreatedDate = frmtA03ltstAllDataSize != 0
				? frmtA03LatestAllDataMap.get(datadomain.getAreaId()).getCreatedDate()
				: null;
		LocalDate startDate = latestCreatedDate != null
				? latestCreatedDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate()
				: null;
		LocalDate deadlineDate = datadomain.getAreaLevelId() == 5
				? (areaDeadlineMap.get(ftA03WklyDtaDmn.getParentAreaId()).toInstant().atZone(ZoneId.systemDefault())
						.toLocalDate())
				: (areaDeadlineMap.get(datadomain.getAreaId()).toInstant().atZone(ZoneId.systemDefault())
						.toLocalDate());
		Long noOfDaysBetween = startDate != null ? ChronoUnit.DAYS.between(startDate, deadlineDate) : null;
		Long noOfWeeksBetween = noOfDaysBetween != null
				? (noOfDaysBetween % 7 == 0 ? (noOfDaysBetween / 7) : (noOfDaysBetween / 7) + 1)
				: null;
		Integer constructionPerWeekRR = noOfWeeksBetween != null
				? noOfDaysBetween > 0 ? Math.round(
						(float) (frmtA03LatestAllDataMap.get(datadomain.getAreaId()).getCoverageHHBalanceUncovered())
								/ (float) noOfWeeksBetween)
						: null
				: null;
		ftA03WklyDtaDmn.setConstructionForWeekRR(constructionPerWeekRR);

		/**
		 * Calculating the progress Percent
		 */
		Double progressPercent = frmtA03ltstAllDataSize != 0
				? constructionPerWeekRR != null ? constructionPerWeekRR != 0
						? (new BigDecimal(ftA03WklyDtaDmn.getImprovment() * 100)
								.divide(new BigDecimal(constructionPerWeekRR), 2, RoundingMode.HALF_UP)).doubleValue()
						: 0 : null
				: null;
		ftA03WklyDtaDmn.setProgressPercent(progressPercent);
		ftA03WklyDtaDmn.setHhDetailsWithToilet(datadomain.getHhDetailsWithToilet());
		ftA03WklyDtaDmn.setCoverageHH1415(datadomain.getCoverageHH1415());
		ftA03WklyDtaDmn.setCoverageHH1516(datadomain.getCoverageHH1516());
		ftA03WklyDtaDmn.setCoverageHH1617(datadomain.getCoverageHH1617());
		ftA03WklyDtaDmn.setCoverageHH1718(datadomain.getCoverageHH1718());
		ftA03WklyDtaDmn.setCoverageHH1819(datadomain.getCoverageHH1819());
		return ftA03WklyDtaDmn;
	}

//	================================================================================
	/**
	 * Creating and returning new PhantomJSDriver.
	 * 
	 * @return driver
	 * 
	 * @author subrata
	 */
	@Override
	public WebDriver getWebDriver() {
		WebDriver driver = null;
		System.setProperty("phantomjs.binary.path", configurableEnvironment.getProperty("phantomjs.path"));
//		System.setProperty("webdriver.chrome.driver", "F:\\chromedriver_win32\\chromedriver.exe");
//		 driver = new ChromeDriver();
		DesiredCapabilities caps = new DesiredCapabilities();
		caps.setCapability(PhantomJSDriverService.PHANTOMJS_CLI_ARGS, new String[] { "--webdriver-loglevel=NONE" });
		driver = new PhantomJSDriver(caps);

		return driver;
	}

//	================================================================================
	/**
	 * Scraping the FormatF42 data. If any exception occurred, then trying 2 more
	 * times. This method will run everyday at 7.00 AM.
	 * 
	 * @author subrata
	 */
	@Scheduled(cron = "0 0 7 ? 1/1 ?") // second, minute, hour, day of month, month, day(s) of week
	@Override
	@Transactional
	public void formF42DataScraping() {
		int maxTries = 1;
		Integer statusCode = 1;
		/**
		 * If we are not getting 0 as the statusCode, then we are trying 2 more times.
		 * If maxTries is equal to 4 then breaking the loop.
		 */
		do {
			try {
				if (maxTries == 4) {
					log.info("Unable to scrape FormatF42 sending an email to appropriate person.");
					/**
					 * If possible send an email to appropriate person.
					 */
					break;
				}
			} catch (Exception e) {
				log.error("Error while sending an email : " + e);
			}
			statusCode = formF42DataScrape();
			maxTries++;

		} while (statusCode.intValue() != 0);
		log.info("Data scrape operation finished for FormatF42 " + fullDateFormat.format(new Date()));
	}

	/**
	 * This method is the actual method where we are scraping the FormatF42 data. On
	 * scraping success returning 0, otherwise 1
	 * 
	 * @return statusCode contains 1 or 0
	 * 
	 * @author subrata
	 */
	@Transactional
	public Integer formF42DataScrape() {
		Integer statusCode = 1;

		log.info("FormatF42 data scrape start time==> " + fullDateFormat.format(new Date()));

		/**
		 * Getting latest record data from FormatF42District table and putting in a map.
		 */
		List<FormatF42District> formatfDistrict42List = formatF42DistrictRepository.getLastRecord();
		Map<Integer, FormatF42District> formatfDistrict42Map = formatfDistrict42List.stream()
				.collect(Collectors.toMap(FormatF42District::getBlockId, v -> v));

		/**
		 * Getting latest record data from FormatF42State table and putting in a map.
		 */
		List<FormatF42State> formatfState42List = formatF42StateRepository.getLastRecord();
		Map<Integer, FormatF42State> formatfState42Map = formatfState42List.stream()
				.collect(Collectors.toMap(FormatF42State::getAreaId, v -> v));

		List<FormatF42Weekly> formatF42WeeklyList = null;
		Map<Integer, FormatF42Weekly> formatf42WeeklyMap = null;
		List<FormatF42Weekly> ftF42WklyDtaLst = new ArrayList<>();

		Map<Integer, Integer> checkSbmAreaIdMap = new HashMap<>();
		WebDriver driver = null;
		try {
			/**
			 * Checking the day whether Friday or not.
			 */
			Calendar cal = Calendar.getInstance();
			cal.setTime(new Date());
			boolean isFriday = cal.get(Calendar.DAY_OF_WEEK) == Calendar.FRIDAY;
			/**
			 * If isFriday is true, then getting the latest records from
			 * database(FormatF28aWeekly table)
			 */
			if (isFriday) {
				formatF42WeeklyList = formatF42WeeklyReposotory.findLatestAllRecord();
				formatf42WeeklyMap = formatF42WeeklyList.stream()
						.collect(Collectors.toMap(FormatF42Weekly::getAreaId, v -> v));
			}
			/**
			 * Getting a PhantomJs web driver
			 */
			driver = getWebDriver();
			/**
			 * Passing the URL to load in the WebDriver.
			 */
			driver.get(configurableEnvironment.getProperty("sbm.form.f42.url"));
			// Selecting the State value from the drop down and clicking
			driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlComponent")).click();
			new Select(driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlComponent")))
					.selectByValue(configurableEnvironment.getProperty("website.select.value"));
			driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlComponent")).click();

			// Selecting Odisha from the drop down and clicking
			driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlState")).click();
			new Select(driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlState")))
					.selectByValue(configurableEnvironment.getProperty("state.odisha.id"));
			driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlState")).click();

			// Submitting form by clicking Submit button
			driver.findElement(By.id("ctl00_ContentPlaceHolder1_btnSubmit")).click();
			/**
			 * Getting the page source from webdriver and parsing that page into HTML
			 * Document type.
			 */
			String pageDistrict = driver.getPageSource();
			Document docDistrict = Jsoup.parse(pageDistrict);
			List<FormatF42State> formatF42StateList = new ArrayList<>();
			int k = 1;
			String stateId = null;
			/**
			 * Iterating all the
			 * <tr>
			 * tag from HTML document.
			 */
			for (Element header : docDistrict.select("tr")) {
				/**
				 * Excluding the
				 * <th>tag.
				 */
				if (!header.text().contains("Remark: Villages showing")
						&& !header.text().contains("[Format F42] Status of Declared") && !header.text().equals("")
						&& !header.text().contains("State Name :") && !header.text().contains("District Name :")
						&& !header.text().contains("Sr. No. District Name Block ")
						&& !header.text().contains("2015-2016 2016-2017 ")
						&& !header.text().contains("Total Declared ODF Verified ODF (1st Level)")
						&& !header.text().contains("20=16+17 + 18+ 19 21=9-10-15")) {
					// System.out.println(header.text());

					String areaID = null;
					if (!header.text().contains("Total:-")) {
						/**
						 * getting the areaID and stateId value.
						 */
						areaID = (k < 10) ? "ctl00_ContentPlaceHolder1_Reptdist_ctl0" + k + "_hfdtcode"
								: "ctl00_ContentPlaceHolder1_Reptdist_ctl" + k + "_hfdtcode";
						areaID = driver.findElement(By.id(areaID)).getAttribute("value");
						stateId = driver
								.findElement(By.id((k < 10) ? "ctl00_ContentPlaceHolder1_Reptdist_ctl0" + k + "_hfCode"
										: "ctl00_ContentPlaceHolder1_Reptdist_ctl" + k + "_hfCode"))
								.getAttribute("value");
					}
					/**
					 * Putting all the areaID and their occurrences.
					 */
					checkSbmAreaIdMap.put((areaID == null ? Integer.valueOf(stateId) : Integer.valueOf(areaID)),
							checkSbmAreaIdMap
									.get(areaID == null ? Integer.valueOf(stateId) : Integer.valueOf(areaID)) == null
											? 1
											: checkSbmAreaIdMap.get(
													areaID == null ? Integer.valueOf(stateId) : Integer.valueOf(areaID))
													+ 1);

					/**
					 * Save all the
					 * <td>data in FormatF42State table.
					 */
					Elements elee = header.select("td");
					int a = 1;
					FormatF42State formatF42StateData = new FormatF42State();
					for (Element element : elee) {

						Date currentDate = new Date();
						if (header.text().contains("Total :-") && a == 1)
							a = 0;

						switch (a) {
						case 0:
							/**
							 * If header.text() contains "Total" then setting "Odisha" as the AreaName.
							 */
							formatF42StateData.setAreaName("Odisha");
							a = 2;
							break;
						case 1:
							break;
						case 2:
							formatF42StateData.setAreaName(element.text());
							break;
						case 3:
							formatF42StateData.setBlockTotal(Integer.valueOf(element.text()));
							break;
						case 4:
							formatF42StateData.setBlockDeclaredOdf(Integer.valueOf(element.text()));
							break;
						case 5:
							formatF42StateData.setBlockVarifiedOdf(Integer.valueOf(element.text()));
							break;
						case 6:
							formatF42StateData.setGpTotal(Integer.valueOf(element.text()));
							break;
						case 7:
							formatF42StateData.setGpDeclaredOdf(Integer.valueOf(element.text()));
							break;
						case 8:
							formatF42StateData.setGpVarifiedOdf(Integer.valueOf(element.text()));
							break;
						case 9:
							formatF42StateData.setVillageTotal(Integer.valueOf(element.text()));
							break;
						case 10:
							formatF42StateData.setVillageNotExist(Integer.valueOf(element.text()));
							break;
						case 11:
							formatF42StateData.setVillageDeclaredOdf1516(Integer.valueOf(element.text()));
							break;
						case 12:
							formatF42StateData.setVillageDeclaredOdf1617(Integer.valueOf(element.text()));
							break;
						case 13:
							formatF42StateData.setVillageDeclaredOdf1718(Integer.valueOf(element.text()));
							break;
						case 14:
							formatF42StateData.setVillageDeclaredOdf1819(Integer.valueOf(element.text()));
							break;
						case 15:
							formatF42StateData.setVillageDeclaredOdfTotal(Integer.valueOf(element.text()));
							break;
						case 16:
							formatF42StateData.setVillageVerifiedOdf1516(Integer.valueOf(element.text()));
							break;
						case 17:
							formatF42StateData.setVillageVerifiedOdf1617(Integer.valueOf(element.text()));
							break;
						case 18:
							formatF42StateData.setVillageVerifiedOdf1718(Integer.valueOf(element.text()));
							break;
						case 19:
							formatF42StateData.setVillageVerifiedOdf1819(Integer.valueOf(element.text()));
							break;
						case 20:
							formatF42StateData.setVillageVerifiedOdfTotal(Integer.valueOf(element.text()));
							break;
						case 21:
							formatF42StateData.setVillageNotDeclaredOdf(Integer.valueOf(element.text()));
							break;
						case 22:
							formatF42StateData.setVillageNotVarifiedOdf(Integer.valueOf(element.text()));
							break;
						case 23:
							formatF42StateData.setVerifiedOdfSecondLevel(Integer.valueOf(element.text()));
							break;
						}
						formatF42StateData.setStateId(areaID != null ? Integer.valueOf(stateId) : null);
						formatF42StateData.setCreatedDate(currentDate);
						formatF42StateData
								.setAreaId(areaID == null ? Integer.valueOf(stateId) : Integer.valueOf(areaID));
						a++;
					}
					if (formatF42StateData.getAreaName() != null) {
						/**
						 * VillageDeclaredOdfPercentage can be calculated as ((VillageDeclaredOdfTotal -
						 * VillageTotal)/100)
						 */
						Double vdodf = getPercentage(
								(double) formatF42StateData.getVillageDeclaredOdfTotal().intValue(),
								(double) formatF42StateData.getVillageTotal().intValue());

						formatF42StateData.setVillageDeclaredOdfPercentage(vdodf);
						/**
						 * VillageVerifiedOdfPercentage can be calculated as ((VillageVerifiedOdfTotal -
						 * VillageDeclaredOdfTotal)/100)
						 */
						Double vvodf = getPercentage(
								(double) formatF42StateData.getVillageVerifiedOdfTotal().intValue(),
								(double) formatF42StateData.getVillageDeclaredOdfTotal());

						formatF42StateData.setVillageVerifiedOdfPercentage(vvodf);

						FormatF42State formatF42St = formatfState42Map.get(formatF42StateData.getAreaId()) == null
								? null
								: formatfState42Map.get(formatF42StateData.getAreaId());
						/**
						 * VillageDeclaredOdfDifference can be calculated as (Today
						 * VillageDeclaredOdfTotal - Yesterday[or latest record in DB]
						 * VillageDeclaredOdfTotal)
						 */
						formatF42StateData.setVillageDeclaredOdfDifference(formatF42St == null ? null
								: formatF42StateData.getVillageDeclaredOdfTotal().intValue()
										- formatF42St.getVillageDeclaredOdfTotal().intValue());
						/**
						 * VillageVerifiedOdfDifference can be calculated as (Today
						 * VillageVerifiedOdfTotal - Yesterday[or latest record in DB]
						 * VillageVerifiedOdfTotal)
						 */
						formatF42StateData.setVillageVerifiedOdfDifference(formatF42St == null ? null
								: formatF42StateData.getVillageVerifiedOdfTotal().intValue()
										- formatF42St.getVillageVerifiedOdfTotal().intValue());

						if (checkSbmAreaIdMap.get(formatF42StateData.getAreaId()) == 1)
							formatF42StateList.add(formatF42StateData);
						/**
						 * If isFriday is true, then setting the values in FormatF42Weekly table
						 */
						if (isFriday) {
							getFtf42WklyDtaDomain(formatF42StateData, ftF42WklyDtaLst, formatf42WeeklyMap == null ? null
									: formatf42WeeklyMap.get(formatF42StateData.getAreaId()));
							// ftF42WklyDtaLst.add(formatF42Weekly);
						}
						k++;
					}
				}
			}

//			formatF42StateRepository.save(formatF42StateList);
			List<FormatF42District> formatF42DistrictList = new ArrayList<>();
			for (int i = 1; i <= 30; i++) {
				/**
				 * getting the districtId and districtName.
				 */
				String districtId = (i < 10) ? "ctl00_ContentPlaceHolder1_Reptdist_ctl0" + i + "_hfdtcode"
						: "ctl00_ContentPlaceHolder1_Reptdist_ctl" + i + "_hfdtcode";
				String districtID = driver.findElement(By.id(districtId)).getAttribute("value");

				String districtName = (i < 10) ? "ctl00_ContentPlaceHolder1_Reptdist_ctl0" + i + "_lbldist"
						: "ctl00_ContentPlaceHolder1_Reptdist_ctl" + i + "_lbldist";
				driver.findElement(By.id(districtName)).click();
				/**
				 * Getting the page source from webdriver and parsing that page into HTML
				 * Document type.
				 */
				String pageBlock = driver.getPageSource();
				Document docBlock = Jsoup.parse(pageBlock);
//				List<FormatF42District> formatF42DistrictList = new ArrayList<>();
				int b = 1; // for evaluate of block id;
				/**
				 * Iterating all the
				 * <tr>
				 * tag from HTML document.
				 */
				for (Element header : docBlock.select("tr")) {
					/**
					 * Excluding the
					 * <th>tag.
					 */
					if (!header.text().contains("Total:-") && !header.text().contains("Remark: Villages showing")
							&& !header.text().contains("[Format F42] Status of Declared") && !header.text().equals("")
							&& !header.text().contains("State Name :") && !header.text().contains("District Name :")
							&& !header.text().contains("Sr. No. Block Name")
							&& !header.text().contains("2015-2016 2016-2017 ")
							&& !header.text().contains("Total Declared ODF Verified ODF (1st Level)")
							&& !header.text().contains("18=14+15 +16 +17")) {

						Elements elee = header.select("td");
						int a = 1;
						/**
						 * getting the blockId value.
						 */
						String blockId = (b < 10) ? "ctl00_ContentPlaceHolder1_ReptBlock_ctl0" + b + "_hfBlkcode"
								: "ctl00_ContentPlaceHolder1_ReptBlock_ctl" + b + "_hfBlkcode";
						String blockID = driver.findElement(By.id(blockId)).getAttribute("value");

						checkSbmAreaIdMap.put((blockID == null ? Integer.valueOf(blockId) : Integer.valueOf(blockID)),
								checkSbmAreaIdMap.get(
										blockID == null ? Integer.valueOf(blockId) : Integer.valueOf(blockID)) == null
												? 1
												: checkSbmAreaIdMap.get(blockID == null ? Integer.valueOf(blockId)
														: Integer.valueOf(blockID)) + 1);

						FormatF42District formatF42DistrictData = new FormatF42District();
						/**
						 * Set all the
						 * <td>data in FormatF42District table.
						 */
						for (Element element : elee) {
							Date currentDate = new Date();
							switch (a) {
							case 1:
								break;
							case 2:
								formatF42DistrictData.setBlockName(element.text());
								break;
							case 3:
								formatF42DistrictData.setGpTotal(Integer.valueOf(element.text()));
								break;
							case 4:
								formatF42DistrictData.setGpDeclaredOdf(Integer.valueOf(element.text()));
								break;
							case 5:
								formatF42DistrictData.setGpVerifiedOdf(Integer.valueOf(element.text()));
								break;
							case 6:
								formatF42DistrictData.setGpNotDeclaredOdf(Integer.valueOf(element.text()));
								break;
							case 7:
								formatF42DistrictData.setVillageTotal(Integer.valueOf(element.text()));
								break;
							case 8:
								formatF42DistrictData.setVillageNotExist(Integer.valueOf(element.text()));
								break;
							case 9:
								formatF42DistrictData.setVillageDeclaredOdf1516(Integer.valueOf(element.text()));
								break;
							case 10:
								formatF42DistrictData.setVillageDeclaredOdf1617(Integer.valueOf(element.text()));
								break;
							case 11:
								formatF42DistrictData.setVillageDeclaredOdf1718(Integer.valueOf(element.text()));
								break;
							case 12:
								formatF42DistrictData.setVillageDeclaredOdf1819(Integer.valueOf(element.text()));
								break;
							case 13:
								formatF42DistrictData.setVillageDeclaredOdfTotal(Integer.valueOf(element.text()));
								break;
							case 14:
								formatF42DistrictData.setVillageVerifiedOdf1516(Integer.valueOf(element.text()));
								break;
							case 15:
								formatF42DistrictData.setVillageVerifiedOdf1617(Integer.valueOf(element.text()));
								break;
							case 16:
								formatF42DistrictData.setVillageVerifiedOdf1718(Integer.valueOf(element.text()));
								break;
							case 17:
								formatF42DistrictData.setVillageVerifiedOdf1819(Integer.valueOf(element.text()));
								break;
							case 18:
								formatF42DistrictData.setVillageVerifiedOdfTotal(Integer.valueOf(element.text()));
								break;
							case 19:
								formatF42DistrictData.setVillageNotDeclaredOdf(Integer.valueOf(element.text()));
								break;
							case 20:
								formatF42DistrictData.setVillageNotVerifiedOdf(Integer.valueOf(element.text()));
								break;
							case 21:
								formatF42DistrictData.setVerifiedOdfSecondLevel(Integer.valueOf(element.text()));
								break;
							}
							formatF42DistrictData.setDistrictId(Integer.valueOf(districtID));
							formatF42DistrictData.setCreatedDate(currentDate);
							formatF42DistrictData.setBlockId(Integer.valueOf(blockID));
							a++;
						}
						if (formatF42DistrictData.getBlockId() != null) {
							/**
							 * VillageDeclaredOdfPercentage can be calculated as ((VillageDeclaredOdfTotal -
							 * VillageTotal)/100)
							 */
							Double vdodf = getPercentage(
									(double) formatF42DistrictData.getVillageDeclaredOdfTotal().intValue(),
									(double) formatF42DistrictData.getVillageTotal().intValue());

							formatF42DistrictData.setVillageDeclaredOdfPercentage(vdodf);
							/**
							 * VillageVerifiedOdfPercentage can be calculated as ((VillageVerifiedOdfTotal -
							 * VillageDeclaredOdfTotal)/100)
							 */
							Double vvodf = getPercentage(
									(double) formatF42DistrictData.getVillageVerifiedOdfTotal().intValue(),
									(double) formatF42DistrictData.getVillageDeclaredOdfTotal().intValue());

							formatF42DistrictData.setVillageVerifiedOdfPercentage(vvodf);

							FormatF42District formatF42Dist = formatfDistrict42Map
									.get(formatF42DistrictData.getBlockId()) == null ? null
											: formatfDistrict42Map.get(formatF42DistrictData.getBlockId());
							/**
							 * VillageDeclaredOdfDifference can be calculated as (Today
							 * VillageDeclaredOdfTotal - Yesterday[or latest record in DB]
							 * VillageDeclaredOdfTotal)
							 */
							formatF42DistrictData.setVillageDeclaredOdfDifference(formatF42Dist == null ? null
									: formatF42DistrictData.getVillageDeclaredOdfTotal().intValue()
											- formatF42Dist.getVillageDeclaredOdfTotal().intValue());
							/**
							 * VillageVerifiedOdfDifference can be calculated as (Today
							 * VillageVerifiedOdfTotal - Yesterday[or latest record in DB]
							 * VillageVerifiedOdfTotal)
							 */
							formatF42DistrictData.setVillageVerifiedOdfDifference(formatF42Dist == null ? null
									: formatF42DistrictData.getVillageVerifiedOdfTotal().intValue()
											- formatF42Dist.getVillageVerifiedOdfTotal().intValue());

							if (checkSbmAreaIdMap.get(formatF42DistrictData.getBlockId()) == 1)
								formatF42DistrictList.add(formatF42DistrictData);
							/**
							 * If isFriday is true, then setting the values in FormatF42Weekly table
							 */
							if (isFriday) {
								getFtf42WklyDtaDomain(formatF42DistrictData, ftF42WklyDtaLst,
										formatf42WeeklyMap == null ? null
												: formatf42WeeklyMap.get(formatF42DistrictData.getBlockId()));
								// ftF42WklyDtaLst.add(formatF42Weekly);
							}
							b++;
						}
					}
				}
//				formatF42WeeklyReposotory.save(ftF42WklyDtaLst);
//				formatF42DistrictRepository.save(formatF42DistrictList);
				/**
				 * Clicking the Back button link.
				 */
				driver.findElement(By.id("ctl00_ContentPlaceHolder1_lnk_selection")).click();
			}
			/**
			 * Saving the formatF42StateList in database.
			 */
			formatF42StateRepository.save(formatF42StateList);
			log.info(formatF42StateList.size() + " no of records saved(State).");
			/**
			 * Saving the ftF42WklyDtaLst in database.
			 */
			formatF42WeeklyReposotory.save(ftF42WklyDtaLst);
			log.info(ftF42WklyDtaLst.size() + " no of records saved(Weekly).");
			/**
			 * Saving the formatF42DistrictList in database.
			 */
			formatF42DistrictRepository.save(formatF42DistrictList);
			log.info(formatF42DistrictList.size() + " no of records saved(District).");
			statusCode = 0;
		} catch (Exception e) {
			log.error("Action : Error while scraping the data for FormatF42. ", e);
		} finally {
			// Close the resources
			driver.quit();
			log.info("FormatF42 data scrape end time==> " + fullDateFormat.format(new Date()));
			log.info("Quits PhantomJs driver, closing every associated window.");
		}
		return statusCode;
	}

	/**
	 * This method sets Weekly F42 Format Data from FormatF42District Domain and
	 * adds to a list
	 * 
	 * @param formatF42DistrictData refers to currently scrapped block data domain
	 *                              of daily FormatF42 domain
	 * @param ftF42WklyDtaLst       refers to the list which is supposed to
	 *                              populated by weekly FormatF42 domain
	 * @param formatF42PreviousWeek refers to the domain of latest inserted data by
	 *                              date from FormatF42 weekly
	 * 
	 * @author Mitan Kumar Batu
	 */
	private void getFtf42WklyDtaDomain(FormatF42District formatF42DistrictData, List<FormatF42Weekly> ftF42WklyDtaLst,
			FormatF42Weekly formatF42PreviousWeek) {
		FormatF42Weekly formatF42Weekly = new FormatF42Weekly();

		formatF42Weekly.setAreaId(formatF42DistrictData.getBlockId());
		formatF42Weekly.setCreatedDate(formatF42DistrictData.getCreatedDate());
		formatF42Weekly.setAreaName(formatF42DistrictData.getBlockName());
		formatF42Weekly
				.setImprovmentSinceDate(formatF42PreviousWeek == null ? null : formatF42PreviousWeek.getCreatedDate());
		formatF42Weekly.setOdfDeclaredTotalVillages(formatF42DistrictData.getVillageTotal());
		formatF42Weekly.setOdfDeclaredVillagesOnPreviousWeek(
				formatF42PreviousWeek == null ? null : formatF42PreviousWeek.getOdfDeclaredVillagesOnCurrentWeek());
		formatF42Weekly.setOdfDeclaredVillagesOnCurrentWeek(formatF42DistrictData.getVillageDeclaredOdfTotal());
		formatF42Weekly.setOdfDeclaredVillagesPercentage(formatF42DistrictData.getVillageDeclaredOdfPercentage());
		formatF42Weekly.setVerifiedOdfDeclaredTotalVillages(formatF42DistrictData.getVillageDeclaredOdfTotal());
		formatF42Weekly.setVerifiedOdfDeclaredVillagesOnPreviousWeek(formatF42PreviousWeek == null ? null
				: formatF42PreviousWeek.getVerifiedOdfDeclaredVillagesOnCurrentWeek());
		formatF42Weekly.setVerifiedOdfDeclaredVillagesOnCurrentWeek(formatF42DistrictData.getVillageVerifiedOdfTotal());
		formatF42Weekly
				.setVerifiedOdfDeclaredVillagesPercentage(formatF42DistrictData.getVillageVerifiedOdfPercentage());
		formatF42Weekly.setVerifiedOdfDeclaredVillagesimprovment(
				formatF42PreviousWeek != null
						? (formatF42Weekly.getVerifiedOdfDeclaredVillagesOnCurrentWeek()
								- formatF42Weekly.getVerifiedOdfDeclaredVillagesOnPreviousWeek())
						: null);
		formatF42Weekly.setOdfDeclaredVillagesimprovment(
				formatF42PreviousWeek != null
						? (formatF42Weekly.getOdfDeclaredVillagesOnCurrentWeek()
								- formatF42Weekly.getOdfDeclaredVillagesOnPreviousWeek())
						: null);
		formatF42Weekly.setGpDeclaredOdf(formatF42DistrictData.getGpDeclaredOdf());
		/**
		 * Add FormatF42Weekly Domain in a list
		 */
		ftF42WklyDtaLst.add(formatF42Weekly);
	}

	/**
	 * This method sets Weekly F42 Format Data from FormatF42State Domain and adds
	 * to a list
	 * 
	 * @param formatF42StateData    refers to currently scrapped district data
	 *                              domain of daily FormatF42 domain
	 * @param ftF42WklyDtaLst       refers to the list which is supposed to
	 *                              populated by weekly FormatF42 domain
	 * @param formatF42PreviousWeek refers to the domain of latest inserted data by
	 *                              date from FormatF42 weekly
	 * 
	 * @author Mitan Kumar Batu
	 */
	private void getFtf42WklyDtaDomain(FormatF42State formatF42StateData, List<FormatF42Weekly> ftF42WklyDtaLst,
			FormatF42Weekly formatF42PreviousWeek) {
		FormatF42Weekly formatF42Weekly = new FormatF42Weekly();

		formatF42Weekly.setAreaId(formatF42StateData.getAreaId());
		formatF42Weekly.setCreatedDate(formatF42StateData.getCreatedDate());
		formatF42Weekly.setAreaName(formatF42StateData.getAreaName());
		formatF42Weekly
				.setImprovmentSinceDate(formatF42PreviousWeek == null ? null : formatF42PreviousWeek.getCreatedDate());

		formatF42Weekly.setOdfDeclaredTotalVillages(formatF42StateData.getVillageTotal());
		formatF42Weekly.setOdfDeclaredVillagesOnPreviousWeek(
				formatF42PreviousWeek == null ? null : formatF42PreviousWeek.getOdfDeclaredVillagesOnCurrentWeek());
		formatF42Weekly.setOdfDeclaredVillagesOnCurrentWeek(formatF42StateData.getVillageDeclaredOdfTotal());
		formatF42Weekly.setOdfDeclaredVillagesPercentage(formatF42StateData.getVillageDeclaredOdfPercentage());

		formatF42Weekly.setVerifiedOdfDeclaredTotalVillages(formatF42StateData.getVillageDeclaredOdfTotal());
		formatF42Weekly.setVerifiedOdfDeclaredVillagesOnPreviousWeek(formatF42PreviousWeek == null ? null
				: formatF42PreviousWeek.getVerifiedOdfDeclaredVillagesOnCurrentWeek());
		formatF42Weekly.setVerifiedOdfDeclaredVillagesOnCurrentWeek(formatF42StateData.getVillageVerifiedOdfTotal());
		formatF42Weekly.setVerifiedOdfDeclaredVillagesPercentage(formatF42StateData.getVillageVerifiedOdfPercentage());

		formatF42Weekly.setVerifiedOdfDeclaredVillagesimprovment(
				formatF42PreviousWeek != null
						? (formatF42Weekly.getVerifiedOdfDeclaredVillagesOnCurrentWeek()
								- formatF42Weekly.getVerifiedOdfDeclaredVillagesOnPreviousWeek())
						: null);
		formatF42Weekly.setOdfDeclaredVillagesimprovment(
				formatF42PreviousWeek != null
						? (formatF42Weekly.getOdfDeclaredVillagesOnCurrentWeek()
								- formatF42Weekly.getOdfDeclaredVillagesOnPreviousWeek())
						: null);

		formatF42Weekly.setBlockDeclaredOdf(formatF42StateData.getBlockDeclaredOdf());
		formatF42Weekly.setGpDeclaredOdf(formatF42StateData.getGpDeclaredOdf());
		formatF42Weekly.setBlockTotal(formatF42StateData.getBlockTotal());
		/**
		 * Add FormatF42Weekly Domain in a list
		 */
		ftF42WklyDtaLst.add(formatF42Weekly);

	}

	/**
	 * This method will return a double value.
	 * 
	 * @param intValue
	 * @param intValue2
	 * @return percentageValue
	 * 
	 * @author subrata
	 */
	private Double getPercentage(double intValue, double intValue2) {
		double value = intValue2 == 0 ? 0 : ((double) (intValue / (double) intValue2)) * 100;
		return Double.parseDouble(new DecimalFormat("##.##").format(value));
	}

}
