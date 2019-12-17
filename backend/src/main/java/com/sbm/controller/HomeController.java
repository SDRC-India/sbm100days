package com.sbm.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sbm.domain.Area;
import com.sbm.domain.FormatA03Weekly;
import com.sbm.domain.FormatF28aWeekly;
import com.sbm.domain.FormatF42District;
import com.sbm.domain.FormatF42State;
import com.sbm.domain.FormatF42Weekly;
import com.sbm.repository.AreaRepository;
import com.sbm.repository.FormatA03WeeklyRepository;
import com.sbm.repository.FormatF28aWeeklyRepository;
import com.sbm.repository.FormatF42DistrictRepository;
import com.sbm.repository.FormatF42StateRepository;
import com.sbm.repository.FormatF42WeeklyRepository;
import com.sbm.service.DataScrapFormatD13Service;
import com.sbm.service.DataScrapFormatER52Service;
import com.sbm.service.DataScrapFormatER89Service;
import com.sbm.service.DataScrapFormatF24Service;
import com.sbm.service.DataScrapFormatF28AService;
import com.sbm.service.DataScrapService;
import com.sbm.service.DistrictRankingService;
import com.sbm.service.SMSService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class HomeController {

	@Autowired
	private AreaRepository areaRepository;

	@Autowired
	private FormatA03WeeklyRepository formatA03WeeklyRepository;

	@Autowired
	private DataScrapService dataScrapService;

	@Autowired
	private DataScrapFormatER89Service dataScrapFormatER89Service;

	@Autowired
	private SMSService smsService;

	@Autowired
	private DataScrapFormatF28AService dataScrapFormatF28AService;

	@Autowired
	private DataScrapFormatER52Service dataScrapFormatER52Service;

	@Autowired
	FormatF28aWeeklyRepository formatF28aWeeklyRepository;

	@Autowired
	FormatF42DistrictRepository formatF42DistrictRepository;

	@Autowired
	FormatF42StateRepository formatF42StateRepository;

	@Autowired
	FormatF42WeeklyRepository formatF42WeeklyRepository;
	
	@Autowired
	DistrictRankingService districtRankingService;
	
	
	@Autowired
	private DataScrapFormatF24Service dataScrapFormatF24Service;
	
	@Autowired
	private DataScrapFormatD13Service dataScrapFormatD13Service;


	
	@GetMapping(value="/insertDistrictRankingDetails")
	public String insertDistrictRankingDetails() throws Exception {
		districtRankingService.insertRankingParametersForDistrictRanking();
		return "DistrictRankingDetails";
	}
	
	@GetMapping(value = "/formF42DataScrap")
	public String formF42DataScrap() throws Exception {
		dataScrapService.formF42DataScraping();
		return "formF42 DataScrap";
	}

	@GetMapping(value = "/formA03DataScrap")
	public String formA03DataScrap() throws Exception {
		dataScrapService.formA03DataScraping();
		return "formA03 DataScrap ";
	}

	@GetMapping(value = "/formER52DataScrap")
	public String formER52DataScrap() throws Exception {
		dataScrapFormatER52Service.formER52DataScraping();
		return "formER52 DataScrap";
	}

	@GetMapping(value = "/sms")
	public String sms() {
		smsService.sendSMS();
		return "sms";
	}

	@GetMapping(value = "/saveSMSMessage")
	public String saveSMSMessage() {
		smsService.saveSMSMessage();
		return "saveSMSMessage";
	}

	@GetMapping(value = "/test")
	public String test() throws Exception {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		String date = "2019-03-10 00:00:00";
		LocalDate endDate = LocalDate.parse(date, formatter);
		LocalDate currentDate = LocalDate.now();
		long noOfDaysBetween = ChronoUnit.DAYS.between(currentDate, endDate);

		return "Difference==>" + noOfDaysBetween;
	}

	@GetMapping(value = "/sendWaterLevelSMS")
	public String sendWaterLevelSMS() {
		smsService.sendWaterLevelSMS();
		return "sendWaterLevelSMS";
	}

	@GetMapping(value = "/formF28ADataScrap")
	public String formF28ADataScrap() throws Exception {
		dataScrapFormatF28AService.formF28ADataScraping();
		return "formF28A DataScrap";
	}

	@RequestMapping(value = "/downloadReport", method = RequestMethod.POST)
	public void downLoad(@RequestParam("fileName") String name, HttpServletResponse response) throws IOException {

		InputStream inputStream = null;
		File file =null;
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		try {
			
			String fileName = name.replaceAll("%3A", ":").replaceAll("%2F", "/").replaceAll("%2C", ",")
					.replaceAll("\\+", " ").replaceAll("%20", " ").replaceAll("%26", "&").replaceAll("%5C", "/");
			inputStream = new FileInputStream(fileName);
			String headerKey = "Content-Disposition";
			file = new java.io.File(fileName);
			String headerValue = String.format("attachment; filename=\"%s\"", file.getName());
			response.setHeader(headerKey, headerValue);
			response.setContentType("application/octet-stream"); // for all file type
			ServletOutputStream outputStream = response.getOutputStream();
			FileCopyUtils.copy(inputStream, outputStream);

		} catch (IOException e) {
			log.error("error-while downloading with username {} and  payload : {}", username ,name, e);
			throw new RuntimeException();
		} finally {
			if(file != null){
				file.delete();
			}
		}
	}

	@RequestMapping(value = "/testFormatA03Data", method = RequestMethod.GET)
	public void getFormatA03Data() {
		Map<Integer, Area> areaModelMap = new LinkedHashMap<Integer, Area>();
		List<Area> areaList = areaRepository.findAll();
		Iterator<Area> iterator = areaList.iterator();
		while (iterator.hasNext()) {
			Area areaDomain = iterator.next();
			areaModelMap.put(areaDomain.getSbmAreaId(), areaDomain);
		}
		List<Object[]> format = formatA03WeeklyRepository.findByCreatedDate();

		for (Object[] object : format) {
			FormatA03Weekly ftA03WklyDtaDmn = new FormatA03Weekly();
			ftA03WklyDtaDmn.setAreaId((Integer) object[0]);
			ftA03WklyDtaDmn.setAreaLevelId((Integer) object[1]);
			ftA03WklyDtaDmn.setBlockName((String) object[2]);
			ftA03WklyDtaDmn.setCoverageHHIncludingBLS((Integer) object[3]);
			ftA03WklyDtaDmn.setCreatedDate((Date) object[4]);
			ftA03WklyDtaDmn.setDistrictName((String) object[5]);
			ftA03WklyDtaDmn.setGpName((String) object[6]);
			ftA03WklyDtaDmn.setIhhlCoveragePercent((Double) object[7]);
			ftA03WklyDtaDmn.setStateName((String) object[8]);
			ftA03WklyDtaDmn.setParentAreaId(areaModelMap.get(((Integer) object[0])).getParentAreaId());
			ftA03WklyDtaDmn.setCoverageHHBalanceUncovered((Integer) object[9]);
			formatA03WeeklyRepository.save(ftA03WklyDtaDmn);
		}
	}

	@RequestMapping(value = "/testFormatF28aData", method = RequestMethod.GET)
	public void getFormatF28aData() {

		List<Object[]> format = formatF28aWeeklyRepository.findAllGeoTaggingDetailsOfSeventhDec();

		for (Object[] object : format) {
			FormatF28aWeekly ftF28aWklyDtaDmn = new FormatF28aWeekly();
			ftF28aWklyDtaDmn.setAreaName((String) object[0]);
			ftF28aWklyDtaDmn.setBalanceRemaining((Integer) object[1] - (Integer) object[2]);
			ftF28aWklyDtaDmn.setCreatedDate((Date) object[3]);
			ftF28aWklyDtaDmn.setCurrentWeekCoveragePercent((Double) object[4]);
			ftF28aWklyDtaDmn.setSbmAreaId((Integer) object[5]);
			ftF28aWklyDtaDmn.setParentSbmAreaId((Integer) object[6]);
			formatF28aWeeklyRepository.save(ftF28aWklyDtaDmn);
		}
	}

	@RequestMapping(value = "/testFormatF42Data", method = RequestMethod.GET)
	public void getFormatF42Data() {

		List<FormatF42State> format = formatF42StateRepository.findAllLatestStateFromF42SateOfSeventhDec();

		for (FormatF42State formatF42State : format) {
			FormatF42Weekly formatF42Weekly = new FormatF42Weekly();
			formatF42Weekly.setAreaId(formatF42State.getAreaId());
			formatF42Weekly.setCreatedDate(formatF42State.getCreatedDate());
			formatF42Weekly.setAreaName(formatF42State.getAreaName());

			formatF42Weekly.setOdfDeclaredTotalVillages(formatF42State.getVillageTotal());
			formatF42Weekly.setOdfDeclaredVillagesOnCurrentWeek(formatF42State.getVillageDeclaredOdfTotal());
			formatF42Weekly.setOdfDeclaredVillagesPercentage(formatF42State.getVillageDeclaredOdfPercentage());

			formatF42Weekly.setVerifiedOdfDeclaredTotalVillages(formatF42State.getVillageDeclaredOdfTotal());
			formatF42Weekly.setVerifiedOdfDeclaredVillagesOnCurrentWeek(formatF42State.getVillageVerifiedOdfTotal());
			formatF42Weekly.setVerifiedOdfDeclaredVillagesPercentage(formatF42State.getVillageVerifiedOdfPercentage());

			formatF42WeeklyRepository.save(formatF42Weekly);
		}

		List<FormatF42District> format1 = formatF42DistrictRepository.findAllLatestDistrictFromF42SateOfSeventhDec();
		for (FormatF42District formatF42District : format1) {
			FormatF42Weekly formatF42Weekly = new FormatF42Weekly();
			formatF42Weekly.setAreaId(formatF42District.getBlockId());
			formatF42Weekly.setCreatedDate(formatF42District.getCreatedDate());
			formatF42Weekly.setAreaName(formatF42District.getBlockName());
			formatF42Weekly.setOdfDeclaredTotalVillages(formatF42District.getVillageTotal());
			formatF42Weekly.setOdfDeclaredVillagesOnCurrentWeek(formatF42District.getVillageDeclaredOdfTotal());
			formatF42Weekly.setOdfDeclaredVillagesPercentage(formatF42District.getVillageDeclaredOdfPercentage());
			formatF42Weekly.setVerifiedOdfDeclaredTotalVillages(formatF42District.getVillageDeclaredOdfTotal());
			formatF42Weekly.setVerifiedOdfDeclaredVillagesOnCurrentWeek(formatF42District.getVillageVerifiedOdfTotal());
			formatF42Weekly
					.setVerifiedOdfDeclaredVillagesPercentage(formatF42District.getVillageVerifiedOdfPercentage());

			formatF42WeeklyRepository.save(formatF42Weekly);
		}

	}

	@GetMapping(value = "/formER89DataScrap")
	public String formER89DataScrap() throws Exception {
		dataScrapFormatER89Service.formatER89DataScraping();
		return "formatER89 DataScraped successfully";
	}

	@GetMapping(value = "/formF24DataScrap")
	public String formF24DataScrap() throws Exception {
		dataScrapFormatF24Service.formatF24DataScraping();
		return "formF24 DataScrap";
	}
	
	@GetMapping(value = "/swechagrahiDataScrap")
	public String swechagrahiDataScrap() throws Exception {
		dataScrapFormatD13Service.formD13DataScraping();
		return "swechagrahi DataScrap";
	}
	
}
