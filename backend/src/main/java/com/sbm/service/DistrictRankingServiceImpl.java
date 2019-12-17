package com.sbm.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.sbm.domain.Area;
import com.sbm.domain.AreaDeadline;
import com.sbm.domain.DistrictRanking;
import com.sbm.domain.FormatA03;
import com.sbm.domain.FormatER89;
import com.sbm.domain.FormatF28A;
import com.sbm.domain.FormatF42State;
import com.sbm.domain.SwachhagrahiDetails;
import com.sbm.repository.AreaDeadlineRepository;
import com.sbm.repository.AreaRepository;
import com.sbm.repository.DistrictRankingRepository;
import com.sbm.repository.FormatAO3Repository;
import com.sbm.repository.FormatER89Repository;
import com.sbm.repository.FormatF28ARepository;
import com.sbm.repository.FormatF42StateRepository;
import com.sbm.repository.SwachhagrahiDetailsRepository;

import lombok.extern.slf4j.Slf4j;
/**
 * This class will insert district ranking parameters based on some calculations on weekly basis
 * 
 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
 * 
 */
@Service
@Slf4j
public class DistrictRankingServiceImpl implements DistrictRankingService{
	
	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
	
	DecimalFormat df = new DecimalFormat("0.00");
	
	@Autowired
	private AreaRepository areaRepository;

	@Autowired
	private FormatF42StateRepository formatF42StateRepository;
	
	@Autowired
	private FormatAO3Repository formatAO3Reposotory;
	
	@Autowired
	private FormatF28ARepository formatF28ARepository;
	
	@Autowired
	private DistrictRankingRepository districtRankingRepository;
	
	@Autowired
	private FormatER89Repository formatER89Repository;
	
	@Autowired
	private SwachhagrahiDetailsRepository swachhagrahiDetailsRepository;
	
	@Autowired
	private AreaDeadlineRepository areaDeadlineRepository;
	
	/**
	 * This method will run every Friday at 12pm.
	 * This method collects daily scrapped district data of friday from different tables and does
	 * some calculations which finally are inserted to analysis Ranking of different Districts.
	 * 
	 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
	 */
	@Override
	@Scheduled(cron="0 0 12 ? * FRI")
	@Transactional
	public void insertRankingParametersForDistrictRanking() 
	{
		try
		{
	   /**
		* Fetching deadline date for every area and storing in a map.
	    */
		List<AreaDeadline> areaDeadlineList=areaDeadlineRepository.findByIsDeadLineActiveTrue();
		Map<Integer,Date> areaDeadlineMap=new LinkedHashMap<>();
		
		for (AreaDeadline areaDeadline : areaDeadlineList) {
			areaDeadlineMap.put(areaDeadline.getAreaId().getSbmAreaId(), areaDeadline.getDeadline());
		}
		
	   /**
		* Fetching all districts details from area table
	    */
		List<Area> listOfDistricts=areaRepository.findByAreaLevelAreaLevelId(3);
		
		
		
		/**
		 * Fetching latest district records data from FormatA03 table and putting in a map.
		 */
		List<FormatA03> listOfLatestFormatAO3Districts=
				formatAO3Reposotory.getLastestDistrictsRecordOrderByAreaId();
		Map<Integer,FormatA03> sbmAreaIdFormatA03DataDomainMap=new LinkedHashMap<Integer,FormatA03>();
		for(FormatA03 formatA03:listOfLatestFormatAO3Districts)
		{
			sbmAreaIdFormatA03DataDomainMap.put(formatA03.getAreaId(), formatA03);
		}
		
		/**
		 * Fetching latest district records data from FormatF42State table and putting in a map.
		 */
		List<FormatF42State> listOfLatestFormatF42Districts=
				formatF42StateRepository.getLastestDistrictsRecordOrderByAreaId();
		Map<Integer,FormatF42State> sbmAreaIdFormatF42StateDataDomainMap=new LinkedHashMap<Integer,FormatF42State>();
		for(FormatF42State formatF42State:listOfLatestFormatF42Districts)
		{
			sbmAreaIdFormatF42StateDataDomainMap.put(formatF42State.getAreaId(), formatF42State);
		}
		
		/**
		 * Fetching latest district records data from FormatF28A table and putting in a map.
		 */
		List<FormatF28A> listOfLatestFormatF28ADistricts=
				formatF28ARepository.getLastestDistrictsRecordOrderByAreaId();
		Map<Integer,Double> sbmAreaIdFormatF28ADataMap=new LinkedHashMap<Integer,Double>();
		for(FormatF28A formatF28A:listOfLatestFormatF28ADistricts)
		{
			sbmAreaIdFormatF28ADataMap.put(formatF28A.getSbmAreaId()
					,formatF28A.getUploadedPhotographsPercentage());
		}
		
		/**
		 * Getting the current financial year
		 */
		/*Calendar cal = Calendar.getInstance();
    	int month = cal.get(Calendar.MONTH);
    	int preYear =0, nextYear =0;
    	Calendar calYear = Calendar.getInstance();

    	if(month > 2){
    	preYear = calYear.get(Calendar.YEAR);
    	calYear.add(Calendar.YEAR, 1);
    	nextYear = calYear.get(Calendar.YEAR);
    	} else {
    	calYear.add(Calendar.YEAR, -1);
    	preYear = calYear.get(Calendar.YEAR);
    	calYear.add(Calendar.YEAR, 1);
    	nextYear = calYear.get(Calendar.YEAR);
    	}
    	String financialYear=preYear+"-"+nextYear;*/
    	
    	
		/**
		 * Getting the current financial year from SBM website
		 */
    	List<String> listOfFinancialYears=formatER89Repository.getListOfFinancialYears();
    	Map<Integer,String> listOfFinancialYearsMap=new HashMap<Integer,String>();
    	for(int i=0;i<=listOfFinancialYears.size()-1;i++)
    	{
    		listOfFinancialYearsMap.put(Integer.parseInt(listOfFinancialYears.get(i).split("-")[1])
    				,listOfFinancialYears.get(i));
    			
    	}
    	Integer currentYear=0;
    	for (Map.Entry<Integer, String> entry : listOfFinancialYearsMap.entrySet()) {
    	    if(entry.getKey()>currentYear)
    	    	currentYear=entry.getKey();
    	}
    	String financialYear=listOfFinancialYearsMap.get(currentYear);
		
    	
    	/**
		 * Fetching latest district records data from FormatER89 table and putting in a map.
		 */
		List<FormatER89> listOfLatestFormatER89Districts=
		formatER89Repository.getLastestInsertedDistrictsOrderBySbmAreaId(financialYear);
	    Map<Integer,FormatER89> sbmAreaIdFormatER89DataDomainMap=new LinkedHashMap<Integer,FormatER89>();
		for(FormatER89 formatER89:listOfLatestFormatER89Districts)
		{
			sbmAreaIdFormatER89DataDomainMap.put(formatER89.getSbmAreaId(),formatER89);
		}
		
		
		/**
		 * Fetching latest district records data from SwachhagrahiDetails table and putting in a map.
		 */
		List<SwachhagrahiDetails> listOfLatestSwachhagrahiDetailsDistricts=
		swachhagrahiDetailsRepository.findLatestInsertedDistrictsByAreaLevelId();
		Map<Integer,SwachhagrahiDetails> sbmAreaIdSwachhagrahiDetailsDomainMap=
				new LinkedHashMap<Integer,SwachhagrahiDetails>();
		for(SwachhagrahiDetails swachhagrahiDetails:listOfLatestSwachhagrahiDetailsDistricts)
		{
			sbmAreaIdSwachhagrahiDetailsDomainMap.put(swachhagrahiDetails.getSbmAreaId(),swachhagrahiDetails);
		}
		
		
		/**
		 * Fetching latest records data from DistrictRanking table and putting in a map.
		 */
		List<DistrictRanking> listOfLatestInsertedDistrictsFromDistrictRanking=
				districtRankingRepository.findLatestInsertedDistricts();
		Map<Integer,DistrictRanking> sbmAreaIdDistrictRankingDomainMap=
				new LinkedHashMap<Integer,DistrictRanking>();
		for(DistrictRanking districtRanking:listOfLatestInsertedDistrictsFromDistrictRanking)
		{
			sbmAreaIdDistrictRankingDomainMap.put(districtRanking.getSbmAreaId(),districtRanking);
		}
		
		/**
		 * Fetching district details whose blocks are best and worst performing
		 * by coverage percent from latest records in FormatA03 table
		 */
		List<Object[]> listOfBestAndWrostPerformingBlock=
		formatAO3Reposotory.findCoverageOfBestAndWrostPerformingBlock();
		
		
		/**
		 * Getting latest inserted date from FormatA03 data list fetched above.
		 */
		String latestInsertedDateInA03Format = listOfLatestFormatAO3Districts.get(0).getCreatedDate()
				.toInstant().atZone(ZoneId.systemDefault()).toLocalDate()
				.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		
		/**
		 * Fetching  FormatA03 table district data by current date 
		 */
		List<FormatA03> listOfAllDistrictsByTodaysDate=
		formatAO3Reposotory.findAllDistrictsByTodaysDate(latestInsertedDateInA03Format);
		
		Map<Integer,Integer> areaIdTotalIHHLsConstructedTillTodayMap
		=new LinkedHashMap<Integer,Integer>();
		
		/**
		 * Fetching all district data of sbm100 starting date i.e 2018-12-02 from FormatA03 
		 */
		List<FormatA03> listOfDistrictsOnSbm100DaysStartingDate=
				formatAO3Reposotory.findAllDistrictsBySbm100DaysStartingDate();
		
		Map<Integer,Integer> areaIdTotalIHHLsConstructedOnSbm100StartDateMap
		=new LinkedHashMap<Integer,Integer>();
		
		Map<Integer,String> parentAreaIdCoverageOfBestAndWrostPerformingBlockMap
		=new LinkedHashMap<Integer,String>();
		
		/**
		 * Iterating district details whose blocks are best and worst performing  and setting in a map
		 */
		for(Object[] bestAndWrostPerformingBlock:listOfBestAndWrostPerformingBlock)
		{
			parentAreaIdCoverageOfBestAndWrostPerformingBlockMap.put
			((Integer)bestAndWrostPerformingBlock[0],(Double)bestAndWrostPerformingBlock[1]+"_"+
					(Double)bestAndWrostPerformingBlock[2]);
		}
		
		/**
		 * Iterating FormatA03 table district data by current date and setting in the map
		 */
		for(FormatA03 formatA03:listOfAllDistrictsByTodaysDate)
		{
			areaIdTotalIHHLsConstructedTillTodayMap.put(formatA03.getAreaId(),
					formatA03.getCoverageHHIncludingBLS());
		}
		
		/**
		 * Iterating FormatA03  district data of sbm100 starting date i.e 2018-12-02 and setting in the map 
		 */
		for(FormatA03 formatA03:listOfDistrictsOnSbm100DaysStartingDate)
		{
			areaIdTotalIHHLsConstructedOnSbm100StartDateMap.put(formatA03.getAreaId(),
					formatA03.getCoverageHHIncludingBLS());
		}
		
		
		List<DistrictRanking> listOfDistrictRankingDomain=
				new ArrayList<DistrictRanking>();
		
	   /**
		* Iterating all district details list which has been fetched above
	    */
		for(int i=0;i<=listOfDistricts.size()-1;i++)
		{
			DistrictRanking districtRanking=new DistrictRanking();
		   /**
			* Getting the sbmAreaId of current index of loop
		    */
			Integer sbmAreaId=listOfDistricts.get(i).getSbmAreaId();
		   /**
			* Getting the district details from FormatA03 map,FormatF42State map,FormatF28A map
			* FormatER89 map,SwachhagrahiDetails map by sbmAreaId
		    */
			FormatA03 formatA03DataDomain=sbmAreaIdFormatA03DataDomainMap.get(sbmAreaId);
			FormatF42State formatF42StateDataDomain=sbmAreaIdFormatF42StateDataDomainMap.get(sbmAreaId);
			Double geoTaggingPercentage=sbmAreaIdFormatF28ADataMap.get(sbmAreaId);
			FormatER89 formatER89DataDomain=sbmAreaIdFormatER89DataDomainMap.get(sbmAreaId);
			SwachhagrahiDetails swachhagrahiDetailsDomain=sbmAreaIdSwachhagrahiDetailsDomainMap.get(sbmAreaId);
			
		   /**
			* Calculation for indicators to find performance score starts from here
			* Calculating the ihhl coverage and setting in the domain
		    */
			districtRanking.setIhhlCoverage(Double.parseDouble(df.format(
					formatA03DataDomain.getIhhlCoveragePercent()*0.35)));
			
			
		   /**
			* Finding the coverage of best and worst performing block of the district
			* Calculating the spread of coverage and setting in the domain
		    */
			String coverageOfBestAndWrostPerformingBlock=parentAreaIdCoverageOfBestAndWrostPerformingBlockMap.
					get(sbmAreaId);
			Double coverageOfBestPerformingBlock=Double.parseDouble(coverageOfBestAndWrostPerformingBlock
					.split("_")[0]);
			Double coverageOfWrostPerformingBlock=Double.parseDouble(coverageOfBestAndWrostPerformingBlock
					.split("_")[1]);
			Double spreadOfCoverage=coverageOfBestPerformingBlock != 0.0 ? (((new BigDecimal(coverageOfBestPerformingBlock)
			.subtract(new BigDecimal(coverageOfWrostPerformingBlock)))
					.multiply(new BigDecimal(100)))
					.divide(new BigDecimal(coverageOfBestPerformingBlock),2, RoundingMode.HALF_UP)
					.doubleValue()) : 0.0;
			int zeroToTenComp = Double.compare(spreadOfCoverage, new Double(10.00));
			int tenToTwentyComp = Double.compare(spreadOfCoverage, new Double(20.00));
			int twentyToThirtyComp = Double.compare(spreadOfCoverage, new Double(30.00));
			int thirtyToFourtyComp = Double.compare(spreadOfCoverage, new Double(40.00));
			int tourtyFiftyComp = Double.compare(spreadOfCoverage, new Double(50.00));
		    if(zeroToTenComp<0)//if spreadOfCoverage is <10
			districtRanking.setSpreadOfCoverage(5);
		    else if(zeroToTenComp>=0&&tenToTwentyComp<0)// >=10 and <20
		    districtRanking.setSpreadOfCoverage(4);
		    else if(tenToTwentyComp>=0&&twentyToThirtyComp<0)//>=20 and <=30
		    districtRanking.setSpreadOfCoverage(3);
		    else if(twentyToThirtyComp>=0&&thirtyToFourtyComp<0)//>=30 and <=40
		    districtRanking.setSpreadOfCoverage(2);
		    else if(thirtyToFourtyComp>=0&&tourtyFiftyComp<0)//>=40 and <=50
		    districtRanking.setSpreadOfCoverage(1);
		    else if(tourtyFiftyComp>=0)
		    districtRanking.setSpreadOfCoverage(0);//>=50
		    
		    
		   /**
			* Finding todays's date and sbm100 start date and days in between them
			* Finding Current rate of construction 
			* Finding deadline date and days in between todays's date and deadline date
			* Calculating the rate of construction and setting in the domain
		    */
		    LocalDate todaysDate = LocalDate.now();
		    String date = "2018-12-01 00:00:00";
			LocalDate sbm100startDate =LocalDate.parse(date, formatter);
			long noOfDaysBetween = ChronoUnit.DAYS.between(sbm100startDate, todaysDate);
			Double currentRateOfConstruction=(double)(areaIdTotalIHHLsConstructedTillTodayMap
					.get(sbmAreaId)
					-areaIdTotalIHHLsConstructedOnSbm100StartDateMap
					.get(sbmAreaId))/noOfDaysBetween;
			LocalDate deadlineDate =(areaDeadlineMap.get(sbmAreaId))
					.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
			long daysBetweenForDeadlineToComplete = ChronoUnit.DAYS.between(todaysDate, deadlineDate);
			Double rateOfConstruction=daysBetweenForDeadlineToComplete<=0&&formatA03DataDomain
					.getIhhlCoveragePercent()!=100?
					new Double(0):formatA03DataDomain.getIhhlCoveragePercent()==100?new Double(5):
						new BigDecimal(currentRateOfConstruction*5).divide(new BigDecimal
					(formatA03DataDomain.getBalanceUncoveredRR()), 2, RoundingMode.HALF_UP).doubleValue();
			districtRanking.setRateOfConstruction(rateOfConstruction);
			
			
		   /**
			* Calculation for indicators to find transparency score starts from here
			* Calculating the declaration of odf villages and setting in the domain
		    */
			Integer noOfOdfDeclaredVillages=formatF42StateDataDomain.getVillageDeclaredOdfTotal();
			Integer totalNoVillages=formatF42StateDataDomain.getVillageTotal();
			Double declrationOfOdfVillages=new BigDecimal(noOfOdfDeclaredVillages*10)
			.divide(new BigDecimal(totalNoVillages), 2, RoundingMode.HALF_UP).doubleValue();
			districtRanking.setDeclarationOfOdfVillages(declrationOfOdfVillages);
			
		   /**
			* Calculating the verification of odf villages and setting in the domain
		    */
			Integer noOfOdfVerifiedVillages=formatF42StateDataDomain.getVillageVerifiedOdfTotal();
			Double verificationOfOdfVillages = (noOfOdfDeclaredVillages != 0) ? (new BigDecimal(noOfOdfVerifiedVillages*10)
					.divide(new BigDecimal(noOfOdfDeclaredVillages), 2, RoundingMode.HALF_UP).doubleValue()) : 0.0;
			districtRanking.setVerificationOfOdfVillages(verificationOfOdfVillages);
			
		   /**
			* Calculating the geotagging of ihhls and setting in the domain
		    */
			Double geotaggingOfIhhls=new BigDecimal(geoTaggingPercentage)
					.multiply(new BigDecimal(0.15)).setScale(2, RoundingMode.HALF_UP).doubleValue();
			districtRanking.setGeotaggingsOfIhhls(geotaggingOfIhhls);
			
		   /**
			* Calculation for indicators to find sustainability score starts from here
			* Calculating the iecExpenditure and setting in the domain
		    */
			Double iecExpenditure=formatER89DataDomain.getFinTotalExpAll() != 0.0 ? (new BigDecimal(formatER89DataDomain.getFinTotalIecHrd()*10)
					.divide(new BigDecimal
					(formatER89DataDomain.getFinTotalExpAll()*0.05), 2, RoundingMode.HALF_UP)
					.doubleValue()) : 0.0;
			int moreThanTen = Double.compare(iecExpenditure, new Double(10.00));
			districtRanking.setIecExpenditure(moreThanTen>=0?10:iecExpenditure);
			
		   /**
			* Calculating the swachhagrahis and setting in the domain
		    */
			Double swachhagrahis=Double.parseDouble(df.format(swachhagrahiDetailsDomain.getNoOfSwachhagrahi()
					/swachhagrahiDetailsDomain.getTotalNoOfGps()));
			int lessThanOneComp = Double.compare(swachhagrahis, new Double(1.00));
			int oneToTwoComp = Double.compare(swachhagrahis, new Double(2.00));
			int twoToThreeComp = Double.compare(swachhagrahis, new Double(3.00));
			int threeToFourComp = Double.compare(swachhagrahis, new Double(4.00));
		    if(lessThanOneComp<0)//swachhagrahis<1
			districtRanking.setSwachhagrahis(0);
		    else if(lessThanOneComp>=0&&oneToTwoComp<0)//swachhagrahis>=1&&swachhagrahis<2
		    districtRanking.setSwachhagrahis(2);
		    else if(oneToTwoComp>=0&&twoToThreeComp<0)//swachhagrahis>=2&&swachhagrahis<3
		    districtRanking.setSwachhagrahis(5);
		    else if(twoToThreeComp>=0&&threeToFourComp<0)//swachhagrahis>=3&&swachhagrahis<4
		    districtRanking.setSwachhagrahis(8);
		    else if(threeToFourComp>=0)//swachhagrahis>=4
		    districtRanking.setSwachhagrahis(10);
            
		   /**
			* Setting other required parameters in the domain
		    */
		    districtRanking.setCreatedDate(new Date());
		    districtRanking.setPreviousWeekCreatedDate(!sbmAreaIdDistrictRankingDomainMap.isEmpty()?
		    		sbmAreaIdDistrictRankingDomainMap.get(sbmAreaId).getCreatedDate():null);
		    districtRanking.setDistrictName(listOfDistricts.get(i).getAreaName());
		    districtRanking.setAreaLevelId(listOfDistricts.get(i).getAreaLevel().getAreaLevelId());
		    districtRanking.setSbmAreaId(sbmAreaId);
		    districtRanking.setParentSbmAreaId(listOfDistricts.get(i).getParentAreaId());
		    
		   /**
			* Calculating performance score,transparency score and sustainability score
			* and setting it on the domain
		    */
		    Double performanceScore=new BigDecimal(districtRanking.getIhhlCoverage())
		    		.add(new BigDecimal(districtRanking.getSpreadOfCoverage()))
		    		.add(new BigDecimal(districtRanking.getRateOfConstruction()))
		    		.setScale(2, RoundingMode.HALF_UP).doubleValue();
		    districtRanking.setPerformanceScore(performanceScore);
		    Double transparencyScore=new BigDecimal(districtRanking.getDeclarationOfOdfVillages())
		    		.add(new BigDecimal(districtRanking.getVerificationOfOdfVillages()))
		    		.add(new BigDecimal(districtRanking.getGeotaggingsOfIhhls()))
		    		.setScale(2, RoundingMode.HALF_UP).doubleValue();
		    districtRanking.setTransparencyScore(transparencyScore);
		    Double sustainabilityScore=new BigDecimal(districtRanking.getIecExpenditure())
		    		.add(new BigDecimal(districtRanking.getSwachhagrahis()))
		    		.setScale(2, RoundingMode.HALF_UP).doubleValue();
		    districtRanking.setSustainabilityScore(sustainabilityScore);
		    
		   /**
			* Calculating total score and setting it on the domain
		    */
		    Double totalScore=new BigDecimal(districtRanking.getPerformanceScore())
		    		.add(new BigDecimal(districtRanking.getTransparencyScore()))
		    		.add(new BigDecimal(districtRanking.getSustainabilityScore()))
		    		.setScale(2, RoundingMode.HALF_UP).doubleValue();
		    districtRanking.setTotalScore(totalScore);
		    
		   /**
			* Setting previous week ranking and setting it in domain
		    */
		    districtRanking.setPreviousWeekRanking(!sbmAreaIdDistrictRankingDomainMap.isEmpty()?
		    		sbmAreaIdDistrictRankingDomainMap.get(sbmAreaId).getCurrentWeekRanking():null);
		    
		   /**
			* adding the domain in a list
		    */
		    listOfDistrictRankingDomain.add(districtRanking);
		    	
			
			
		}
	   /**
		* sorting the list of domain in reversed order by the parameter total score
		* after control comes out of the loop
	    */
		listOfDistrictRankingDomain.sort(Comparator.comparing(DistrictRanking::getTotalScore).reversed());
		
	   /**
		* Iterating the reversed list of domain 
	    */
		for(int i=0;i<=listOfDistrictRankingDomain.size()-1;i++)
		{
		   /**
			* Setting current week ranking and change in ranking in the domain
		    */
			listOfDistrictRankingDomain.get(i).setCurrentWeekRanking(i+1);
			listOfDistrictRankingDomain.get(i).setChangeInRanking(!sbmAreaIdDistrictRankingDomainMap.isEmpty()
					?listOfDistrictRankingDomain.get(i).getPreviousWeekRanking()-
							listOfDistrictRankingDomain.get(i).getCurrentWeekRanking()	:null	);
		}
		
			/**
			 * Saving the list of domain in the db
			 */
		districtRankingRepository.save(listOfDistrictRankingDomain);
		}
		catch (Exception e)
		{
			log.error("Action : Error While Inserting Weekly District Ranking Details",e);
			e.printStackTrace();
		}
	}


	

}
