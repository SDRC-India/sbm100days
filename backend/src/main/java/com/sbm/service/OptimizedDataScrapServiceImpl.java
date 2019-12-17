package com.sbm.service;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
import org.springframework.stereotype.Service;

import com.sbm.domain.Area;
import com.sbm.domain.AreaDeadline;
import com.sbm.domain.AreaLevel;
import com.sbm.domain.FormatA03;
import com.sbm.repository.AreaDeadlineRepository;
import com.sbm.repository.AreaLevelRepository;
import com.sbm.repository.AreaRepository;
import com.sbm.repository.FormatAO3Repository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class OptimizedDataScrapServiceImpl implements OptimizedDataScrapServive {

	private static SimpleDateFormat fullDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

	DecimalFormat df = new DecimalFormat("0.00");

	@Autowired
	private ConfigurableEnvironment configurableEnvironment;

	@Autowired
	private FormatAO3Repository formatAO3Reposotory;

	@Autowired
	private AreaLevelRepository areaLevelRepository;

	@Autowired
	private AreaRepository areaRepository;

	@Autowired
	private AreaDeadlineRepository areaDeadlineRepository;

	@Override
	public void formA03DataScraping() {

		System.out.println("TIME==>" + fullDateFormat.format(new Date()));
		WebDriver driver = null;

		try {

			// -----CovUncoveredRr logic--------
			List<AreaDeadline> areaDeadlineList = areaDeadlineRepository.findByIsDeadLineActiveTrue();
//			System.out.println(areaDeadlineList.size());
			Map<Integer, Date> areaDeadlineMap = new LinkedHashMap<>();

			for (AreaDeadline areaDeadline : areaDeadlineList) {
				areaDeadlineMap.put(areaDeadline.getAreaId().getSbmAreaId(), areaDeadline.getDeadline());
			}
			Map<String, Integer> stateListMap = new LinkedHashMap<String, Integer>();
			List<FormatA03> stateList = formatAO3Reposotory.findLatestState();
			Iterator<FormatA03> stateIterator = stateList.iterator();
			while (stateIterator.hasNext()) {
				FormatA03 bean = stateIterator.next();
				stateListMap.put(bean.getStateName().toLowerCase() + "_" + "india", bean.getCoverageHHIncludingBLS());
			}

			Map<String, Integer> districtListMap = new LinkedHashMap<String, Integer>();
			List<FormatA03> districtList = formatAO3Reposotory.findAllDistricts();
			Iterator<FormatA03> iterator3 = districtList.iterator();
			while (iterator3.hasNext()) {
				FormatA03 bean = iterator3.next();
				districtListMap.put(bean.getDistrictName().toLowerCase() + "_" + bean.getStateName().toLowerCase(),
						bean.getCoverageHHIncludingBLS());
			}

			Map<String, Integer> blockListMap = new LinkedHashMap<String, Integer>();
			List<FormatA03> blockList = formatAO3Reposotory.findAllBlocks();
			Iterator<FormatA03> iterator4 = blockList.iterator();
			while (iterator4.hasNext()) {
				FormatA03 bean1 = iterator4.next();
				blockListMap.put(bean1.getBlockName().toLowerCase() + "_" + bean1.getDistrictName().toLowerCase() + "_"
						+ bean1.getStateName().toLowerCase(), bean1.getCoverageHHIncludingBLS());
			}

			Map<String, Integer> gpListMap = new LinkedHashMap<String, Integer>();
			List<FormatA03> gpList = formatAO3Reposotory.findAllGps();
			Iterator<FormatA03> iterator5 = gpList.iterator();
			while (iterator5.hasNext()) {
				FormatA03 bean2 = iterator5.next();
				gpListMap.put(
						bean2.getGpName().toLowerCase() + "_" + bean2.getBlockName().toLowerCase() + "_"
								+ bean2.getDistrictName().toLowerCase() + "_" + bean2.getStateName().toLowerCase(),
						bean2.getCoverageHHIncludingBLS());
			}

			// -----areadId logic--------
			Map<Integer, Area> areaModelMap = new LinkedHashMap<Integer, Area>();
			List<Area> areaList = areaRepository.findAll();
			// System.out.println(areaList.size());
			Iterator<Area> iterator = areaList.iterator();
			while (iterator.hasNext()) {
				Area areaDomain = iterator.next();
				areaModelMap.put(areaDomain.getSbmAreaId(), areaDomain);
			}

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

			// -----Area Level Logic--------
			List<AreaLevel> areaLevelList = areaLevelRepository.findAll();
			Map<String, Integer> areaLevelMap = areaLevelList.stream()
					.collect(Collectors.toMap(AreaLevel::getAreaLevelName, AreaLevel::getAreaLevelId));

			driver = getWebDriver();

			driver.get(configurableEnvironment.getProperty("sbm.form.a03.url"));

			driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlState")).click();

			new Select(driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlState")))
					.selectByValue(configurableEnvironment.getProperty("state.odisha.id"));
			driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlState")).click();

			WebElement selectElementDistrict = driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlDistrict"));
			Select select = new Select(selectElementDistrict);
			List<WebElement> allOptionsDistrict = select.getOptions();
			String area = null;
			String stateName = null;
			String districtName = null;
			String blockName = null;
			List<FormatA03> dataDomains = new ArrayList<FormatA03>();

			for (int j = 0; j < allOptionsDistrict.size(); j++) {

				driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlDistrict")).click();
				new Select(driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlDistrict"))).selectByIndex(j);
				driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlDistrict")).click();

				WebElement selectElementBlocks = driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlBlock"));
				Select selectBlocks = new Select(selectElementBlocks);
				List<WebElement> allOptionsBlocks = selectBlocks.getOptions();

				for (int i = 0; i < allOptionsBlocks.size(); i++) {
					driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlBlock")).click();
					new Select(driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlBlock"))).selectByIndex(i);
					driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlBlock")).click();

					driver.findElement(By.id("ctl00_ContentPlaceHolder1_btnSubmit")).click();

					String pageSource = driver.getPageSource();
					Document doc = Jsoup.parse(pageSource);
//					==============for header========

					int count = 0;
					Elements rows = doc.select("tr");
					for (Element header : rows) {
						// System.out.println("*********"+header.text());

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
						int a = !header.text().startsWith("Total") ? 0 : 1;
						if (("blocks".equalsIgnoreCase(area) && !header.text().startsWith("Total"))
								|| ("gps".equalsIgnoreCase(area) && !header.text().startsWith("Total"))
								|| ("districts".equalsIgnoreCase(area) && (i == 0 && j == 0))) {

							for (Element element : elee) {

								switch (a) {
								case 0:

									break;
								case 1:
									dataDomain.setAreaLevelId(!header.text().startsWith("Total")
											? ("districts".equalsIgnoreCase(area) ? areaLevelMap.get("District")
													: "blocks".equalsIgnoreCase(area) ? areaLevelMap.get("Block")
															: "gps".equalsIgnoreCase(area)
																	? areaLevelMap.get("Gram Panchayat")
																	: null)
											: ("districts".equalsIgnoreCase(area) ? areaLevelMap.get("State") : null));
									dataDomain.setDistrictName(!header.text().startsWith("Total")
											? ("districts".equalsIgnoreCase(area) ? element.text() : districtName)
											: null);
									dataDomain.setBlockName(!header.text().startsWith("Total")
											? ("blocks".equalsIgnoreCase(area) ? element.text() : blockName)
											: null);
									dataDomain.setGpName(!header.text().startsWith("Total")
											? ("gps".equalsIgnoreCase(area) ? element.text() : null)
											: null);
									dataDomain.setStateName(stateName);
									dataDomain.setCreatedDate(new Date());
									String mapKey = null;
									if (dataDomain.getAreaLevelId() == 2) {
										mapKey = dataDomain.getStateName() + "_" + "INDIA";
										dataDomain.setAreaId(
												map.get(dataDomain.getAreaLevelId()).get(mapKey.toUpperCase()));
									} else if (dataDomain.getAreaLevelId() == 3) {
										mapKey = dataDomain.getDistrictName() + "_" + dataDomain.getStateName();
										dataDomain.setAreaId(map.get(dataDomain.getAreaLevelId()).get(mapKey));
									} else if (dataDomain.getAreaLevelId() == 4) {
										mapKey = dataDomain.getBlockName() + "_" + dataDomain.getDistrictName() + "_"
												+ dataDomain.getStateName();
										dataDomain.setAreaId(map.get(dataDomain.getAreaLevelId()).get(mapKey));
									} else if (dataDomain.getAreaLevelId() == 5) {
										mapKey = dataDomain.getGpName() + "_" + dataDomain.getBlockName() + "_"
												+ dataDomain.getDistrictName() + "_" + dataDomain.getStateName();
										dataDomain.setAreaId(map.get(dataDomain.getAreaLevelId()).get(mapKey));
									}

									break;
								case 2:
									dataDomain.setDetailsWithOrWithoutToilet(Integer.valueOf(element.text()));
									break;
								case 3:
									dataDomain.setHhDetailsWithToilet(Integer.valueOf(element.text()));
									break;
								case 4:
									dataDomain.setBplNotHavingToilet(Integer.valueOf(element.text()));
									break;
								case 5:
									dataDomain.setIdentifiedAplNotHavingToilet(Integer.valueOf(element.text()));
									break;
								case 6:
									dataDomain.setUnidentifiedAplNotHavingToilet(Integer.valueOf(element.text()));
									break;
								case 7:
									dataDomain.setTotalAplNotHavingToilet(Integer.valueOf(element.text()));
									break;
								case 8:
									dataDomain.setTotalBplAplNotHavingToilet(Integer.valueOf(element.text()));
									break;
								case 9:
									dataDomain.setTotalHHIdentifiedNotHavingToilet(Integer.valueOf(element.text()));
									break;

								case 10:
									if ("districts".equalsIgnoreCase(area))
										dataDomain.setCoverageHH1314Reported(Integer.valueOf(element.text()));
									else if ("blocks".equalsIgnoreCase(area) || "gps".equalsIgnoreCase(area)) {
										dataDomain.setCoverage1314HHEntered(Integer.valueOf(element.text()));
										a = a + 2;
									}
									break;

								case 11:
									dataDomain.setCoverage1314OutOfHHEntered(Integer.valueOf(element.text()));
									break;

								case 12:
									dataDomain.setCoverageHHDistrictWise1314(Integer.valueOf(element.text()));
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
									dataDomain.setCoverageHHCommunityOtherToilet(Integer.valueOf(element.text()));
									break;
								case 19:
									dataDomain.setCoverageHHAfterBLS(Integer.valueOf(element.text()));
									break;
								case 20:
									dataDomain.setCoverageHHIncludingBLS(Integer.valueOf(element.text()));

									Integer hhCoverageyesterday = !header.text().startsWith("Total")
											? ("districts".equalsIgnoreCase(area)
													? districtListMap.get(dataDomain.getDistrictName().toLowerCase()
															+ "_" + dataDomain.getStateName().toLowerCase())
													: "blocks".equalsIgnoreCase(area)
															? blockListMap.get(dataDomain.getBlockName().toLowerCase()
																	+ "_" + dataDomain.getDistrictName().toLowerCase()
																	+ "_" + dataDomain.getStateName().toLowerCase())
															: "gps".equalsIgnoreCase(area)
																	? gpListMap.get(dataDomain.getGpName().toLowerCase()
																			+ "_"
																			+ dataDomain.getBlockName().toLowerCase()
																			+ "_"
																			+ dataDomain.getDistrictName().toLowerCase()
																			+ "_"
																			+ dataDomain.getStateName().toLowerCase())
																	: null)
											: ("districts".equalsIgnoreCase(area)
													? stateListMap.get(
															dataDomain.getStateName().toLowerCase() + "_" + "india")
													: null);

									Integer coverageHHIncludingBLSLeft = (hhCoverageyesterday != null)
											? (dataDomain.getCoverageHHIncludingBLS() - hhCoverageyesterday)
											: null;
									dataDomain.setHHCoveragedYesterday(coverageHHIncludingBLSLeft);

									break;
								case 21:
									dataDomain.setCoverageHHBalanceUncovered(Integer.valueOf(element.text()));

									LocalDate startDate = LocalDate.now();
									// System.out.println(startDate);
									Date deadLinedate = !"gps".equalsIgnoreCase(area)
											? areaDeadlineMap.get(dataDomain.getAreaId())
											: areaDeadlineMap
													.get(areaModelMap.get(dataDomain.getAreaId()).getParentAreaId());
									LocalDate currentDate = deadLinedate.toInstant().atZone(ZoneId.systemDefault())
											.toLocalDate();
									// System.out.println(currentDate);
									long noOfDaysBetween = ChronoUnit.DAYS.between(startDate, currentDate);
									Double value = noOfDaysBetween < 0 ? null
											: Double.parseDouble(
													df.format(((double) dataDomain.getCoverageHHBalanceUncovered()
															/ (double) noOfDaysBetween)));
									dataDomain.setBalanceUncoveredRR(value);

									break;
								case 22:
									dataDomain.setIhhlCoveragePercent(Double.valueOf(element.text()));
									break;

								}
								a++;
							}
						}
						// if(count>5)
						if (dataDomain.getIhhlCoveragePercent() != null) {
							double balanceUncoveredPercent = dataDomain.getDetailsWithOrWithoutToilet().intValue() == 0
									? 0
									: (double) (dataDomain.getCoverageHHBalanceUncovered() * 100)
											/ dataDomain.getDetailsWithOrWithoutToilet();

							df.format(balanceUncoveredPercent);
							dataDomain.setCreatedDate(new Date());
							dataDomain.setCoverageHHBalanceUncoveredPercent(
									Double.parseDouble(df.format(balanceUncoveredPercent)));
							dataDomains.add(dataDomain);
						}
						count++;
					}
					formatAO3Reposotory.save(dataDomains);
					driver.findElement(By.id("ctl00_ContentPlaceHolder1_lnk_selection")).click();

					selectElementBlocks = driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlBlock"));
					selectBlocks = new Select(selectElementBlocks);
					allOptionsBlocks = selectBlocks.getOptions();
				}
				selectElementDistrict = driver.findElement(By.id("ctl00_ContentPlaceHolder1_ddlDistrict"));
				select = new Select(selectElementDistrict);
				allOptionsDistrict = select.getOptions();

			}
			System.out.println("TIME==>" + fullDateFormat.format(new Date()));
		} catch (Exception e) {
			e.printStackTrace();
			log.error("File not found.", e);
		} finally {
			driver.close();
		}

	}

//	================================================================================
	public WebDriver getWebDriver() {
		WebDriver driver = null;
		System.setProperty("phantomjs.binary.path", configurableEnvironment.getProperty("phantomjs.path"));

		DesiredCapabilities caps = new DesiredCapabilities();
		caps.setCapability(PhantomJSDriverService.PHANTOMJS_CLI_ARGS, new String[] { "--webdriver-loglevel=NONE" });
		driver = new PhantomJSDriver(caps);

		return driver;
	}

}
