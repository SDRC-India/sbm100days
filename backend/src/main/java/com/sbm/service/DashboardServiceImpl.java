package com.sbm.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sbm.domain.Area;
import com.sbm.domain.IndicatorUnitSubgroup;
import com.sbm.model.DashboardDailyTrendDataModel;
import com.sbm.model.DashboardMapDataModel;
import com.sbm.model.QuickStartModel;
import com.sbm.repository.AreaRepository;
import com.sbm.repository.DashboardMapRepository;
import com.sbm.repository.FormatAO3Repository;
import com.sbm.repository.FormatF28ARepository;
import com.sbm.repository.FormatF42StateRepository;
import com.sbm.repository.SwachhagrahiDetailsRepository;

/**
 * 
 * This class is responsible for rendering Data for Dashboard in JSON format
 * 
 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
 * @author subrata
 * 
 * 
 */
@Service
public class DashboardServiceImpl implements DashboardService {

	@Autowired
	private FormatF28ARepository formatF28ARepository;
	
	@Autowired
	private DashboardMapRepository dashboardMapRepository;
	
	@Autowired
	private FormatAO3Repository formatAO3Repository;
	
	@Autowired
	private FormatF42StateRepository formatF42StateRepository;
	
	@Autowired
	private SwachhagrahiDetailsRepository swachhagrahiDetailsRepository;

	@Autowired
	private AreaRepository areaRepository;

	/**
	 * According to the areaCode, this method will give the latest Coverage, 
	 * GeoTagging, OdfDeclaredVillage and NoOfSwachhagrahi data.
	 * 
	 * @param areaCode is the unique id
	 * 
	 * @return quickStartMap contains the Coverage, GeoTagging, OdfDeclaredVillage and NoOfSwachhagrahi
	 * 
	 * @author subrata
	 */
	@Override
	@Cacheable("quickStartData")
	@Transactional(readOnly = true)
	public Map<String, QuickStartModel> quickStartData(String areaCode) {
		Map<String, QuickStartModel> quickStartMap = new HashMap<String, QuickStartModel>();

		/**
		 * Getting the area by passing the areaCode.
		 */
		Area area = areaRepository.findByAreaCode(areaCode);
		
		QuickStartModel model = new QuickStartModel();
		
		/**
		 * Getting Coverage, GeoTagging, OdfDeclaredVillage and NoOfSwachhagrahi by passing the SbmAreaId.
		 */
		/*List<Object[]> list = formatF28ARepository.getQuickStatsData(area.getSbmAreaId());

		model.setCoverage(((double) list.get(0)[1]));
		model.setGeoTagging(((double) list.get(0)[0]));
		model.setOdfDeclaredVillage(((int) list.get(0)[2]));
		model.setNoOfSwachhagrahi(((int) list.get(0)[3]));*/
		
		/**
		 * Inner join is taking 3 seconds to get the data from all the 4 table. So we are avoiding the inner join and writing different query for all.
		 */
		
		model.setCoverage((formatAO3Repository.findTop1ByAreaIdOrderByCreatedDateDesc(area.getSbmAreaId())).getIhhlCoveragePercent());
		model.setGeoTagging((formatF28ARepository.findTop1BySbmAreaIdOrderByCreatedDateDesc(area.getSbmAreaId())).getUploadedPhotographsPercentage());
		model.setOdfDeclaredVillage((int)(formatF42StateRepository.findTop1ByAreaIdOrderByCreatedDateDesc(area.getSbmAreaId()).getVillageDeclaredOdfTotal()));
		model.setNoOfSwachhagrahi((int)(swachhagrahiDetailsRepository.findTop1BySbmAreaIdOrderByCreatedDateDesc(area.getSbmAreaId()).getNoOfSwachhagrahi()));

		quickStartMap.put("QuickStart", model);

		return quickStartMap;
	}

	/**
	 * Generating Data as JSON Response of Coverage%,Geo Tagging,Odf declared
	 * villages for State and district maps in dashboard
	 * 
	 * @param queryMap it is referred to map which has areaCode and iusid as keys
	 * 
	 * @return dataCollection is referred as a map of key as area code and value as a model which may have 
	 *         Coverage%,Geo Tagging,Odf declared details according to request
	 * 
	 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
	 */
	@Override
	@Cacheable("dashboardMapData")
	@Transactional(readOnly = true)
	public Map<String, DashboardMapDataModel> getDataForMapsInDashboard(Map<String, String> queryMap) {
		/**
		 * Fetching area details from area table by area code
		 */
		Area area = areaRepository.findByAreaCode((queryMap.get("parentIdCode").toString()));

		Map<String, DashboardMapDataModel> dataCollection = new LinkedHashMap<String, DashboardMapDataModel>();

		/**
		 * Fetching indicator details by iusid
		 */
		IndicatorUnitSubgroup indicatorDetails = dashboardMapRepository
				.findById(Integer.parseInt(queryMap.get("iusid")));

		/**
		 * Initializing switch statement by indicator id
		 */
		switch (indicatorDetails.getId()) {
		case 1:
			/**
			 * Fetching list of latest inserted data from formatA03 table(Physical progress)
			 * by sbm area id to send as JSON response
			 */
			List<Object[]> dailyLatestDataFormatA03ForMap = dashboardMapRepository
					.dailyLatestDataFormatA03ForMap(area.getSbmAreaId());
			/**
			 * Iterate the list and set the required data in model
			 */
			for (Object[] object : dailyLatestDataFormatA03ForMap) {
				DashboardMapDataModel dashboardMapDataModel = new DashboardMapDataModel();
				dashboardMapDataModel.setAreaName((String) object[0]);
				dashboardMapDataModel.setAreaCode((String) object[1]);
				dashboardMapDataModel.setSbmAreaId((Integer) object[2]);
				dashboardMapDataModel.setValue((Double) object[3]);

				/**
				 * set css classes for colors by comparing ihhl coverage percent with there
				 * threshold values
				 */
				int progressPercentZeroToFiftyComp = Double.compare((Double) object[3], new Double(50.00));
				int progressPercentFiftyToEightyComp = Double.compare((Double) object[3], new Double(80.00));
				int progressPercentEightyToHundredComp = Double.compare((Double) object[3], new Double(100.00));
				if (progressPercentZeroToFiftyComp < 0)
					dashboardMapDataModel.setCssClass("firstslices");
				else if (progressPercentZeroToFiftyComp >= 0 && progressPercentFiftyToEightyComp < 0)
					dashboardMapDataModel.setCssClass("secondslices");
				else if (progressPercentFiftyToEightyComp >= 0 && progressPercentEightyToHundredComp < 0)
					dashboardMapDataModel.setCssClass("thirdslices");
				else if (progressPercentEightyToHundredComp >= 0)
					dashboardMapDataModel.setCssClass("fourthslices");
				dashboardMapDataModel.setAreaLevelId((Integer) object[4]);
				/**
				 * populate the map with key as area code and value as model
				 */
				dataCollection.put((String) object[1], dashboardMapDataModel);

			}
			break;
		case 2:
			/**
			 * Fetching list of latest inserted data from formatF28A table(Geotagging) by
			 * sbm area id to send as JSON response
			 */
			List<Object[]> dailyLatestDataFormatGeoTaggingForMap = dashboardMapRepository
					.dailyLatestGeoTaggingDetailsForMap(area.getSbmAreaId());

			/**
			 * Iterate the list and set the required data in model
			 */
			for (Object[] object : dailyLatestDataFormatGeoTaggingForMap) {
				DashboardMapDataModel dashboardMapDataModel = new DashboardMapDataModel();
				dashboardMapDataModel.setAreaName((String) object[0]);
				dashboardMapDataModel.setAreaCode((String) object[1]);
				dashboardMapDataModel.setSbmAreaId((Integer) object[2]);
				dashboardMapDataModel.setValue((Double) object[3]);

				/**
				 * set css classes for colors by comparing uploaded photographs percentage with
				 * there threshold values
				 */
				int progressPercentZeroToFiftyComp = Double.compare((Double) object[3], new Double(50.00));
				int progressPercentFiftyToEightyComp = Double.compare((Double) object[3], new Double(80.00));
				int progressPercentEightyToHundredComp = Double.compare((Double) object[3], new Double(100.00));
				if (progressPercentZeroToFiftyComp < 0)
					dashboardMapDataModel.setCssClass("firstslices");
				else if (progressPercentZeroToFiftyComp >= 0 && progressPercentFiftyToEightyComp < 0)
					dashboardMapDataModel.setCssClass("secondslices");
				else if (progressPercentFiftyToEightyComp >= 0 && progressPercentEightyToHundredComp < 0)
					dashboardMapDataModel.setCssClass("thirdslices");
				else if (progressPercentEightyToHundredComp >= 0)
					dashboardMapDataModel.setCssClass("fourthslices");
				dashboardMapDataModel.setAreaLevelId((Integer) object[4]);

				/**
				 * populate the map with key as area code and value as model
				 */
				dataCollection.put((String) object[1], dashboardMapDataModel);

			}
			break;
		case 3:

			// state Id
			List<Object[]> data = null;
			/**
			 * Initializing switch statement by area level id
			 */
			switch (area.getAreaLevel().getAreaLevelId()) {
			case 2: // district
				/**
				 * Fetching list of latest inserted district data from formatf42state table(ODF)
				 * by sbm area id to send as JSON response
				 */
				data = dashboardMapRepository.dailyLatestOdfDistrictwiseDetailsForMap(area.getSbmAreaId());
				break;
			case 3:
				/**
				 * Fetching list of latest inserted block data from formatf42district table(ODF)
				 * by sbm area id to send as JSON response
				 */
				data = dashboardMapRepository.dailyLatestOdfBlockwiseDetailsForMap(area.getSbmAreaId());

				break;
			}

		{
			if (data != null) {
				/**
				 * Iterate the list and set the required data in model
				 */
				for (Object[] object : data) {
					DashboardMapDataModel dashboardMapDataModel = new DashboardMapDataModel();
					dashboardMapDataModel.setAreaName((String) object[0]);
					dashboardMapDataModel.setAreaCode((String) object[1]);
					dashboardMapDataModel.setSbmAreaId((Integer) object[2]);
					dashboardMapDataModel.setValue((Double) object[3]);
					dashboardMapDataModel.setNumber((Integer) object[4]);
					/**
					 * set css classes for colors by comparing village declared odf percentage with
					 * there threshold values
					 */
					int progressPercentZeroToFiftyComp = Double.compare((Double) object[3], new Double(50.00));
					int progressPercentFiftyToEightyComp = Double.compare((Double) object[3], new Double(80.00));
					int progressPercentEightyToHundredComp = Double.compare((Double) object[3], new Double(100.00));
					if (progressPercentZeroToFiftyComp < 0)
						dashboardMapDataModel.setCssClass("firstslices");
					else if (progressPercentZeroToFiftyComp >= 0 && progressPercentFiftyToEightyComp < 0)
						dashboardMapDataModel.setCssClass("secondslices");
					else if (progressPercentFiftyToEightyComp >= 0 && progressPercentEightyToHundredComp < 0)
						dashboardMapDataModel.setCssClass("thirdslices");
					else if (progressPercentEightyToHundredComp >= 0)
						dashboardMapDataModel.setCssClass("fourthslices");
					dashboardMapDataModel.setAreaLevelId((Integer) object[5]);
					/**
					 * populate the map with key as area code and value as model
					 */
					dataCollection.put((String) object[1], dashboardMapDataModel);
				}
			}

		}

			break;
		}
		return dataCollection;
	}

	/**
	 * Generating latest seven days data as JSON Response of Coverage%,Geo
	 * Tagging,Odf declared villages for State and district level line chart in
	 * dashboard
	 * 
	 * @param queryMap it is referred to map which has areaCode and iusid as keys
	 * 
	 * @return dashboardDailyTrendDataModelList is referred as a list of model which
	 *         may have Coverage%,Geo Tagging,Odf declared details according to
	 *         request
	 * 
	 * @author Mitan Kumar Batu(mitan@sdrc.co.in)
	 */
	@Cacheable("dashboardMapTrendData")
	@Transactional(readOnly = true)
	public List<DashboardDailyTrendDataModel> getDataForTrendChartInDashboard(Map<String, String> queryMap) {

		/**
		 * Fetching area details from area table by area code
		 */
		Area area = areaRepository.findByAreaCode((queryMap.get("parentIdCode").toString()));

		/**
		 * Fetching indicator details by iusid
		 */
		IndicatorUnitSubgroup indicatorDetails = dashboardMapRepository
				.findById(Integer.parseInt(queryMap.get("iusid")));
		List<DashboardDailyTrendDataModel> dashboardDailyTrendDataModelList = new ArrayList<DashboardDailyTrendDataModel>();
		/**
		 * Initializing switch statement by indicator id
		 */
		switch (indicatorDetails.getId()) {
		case 1:
			/**
			 * Fetching list of latest seven days inserted data from formatA03
			 * table(Physical progress) by sbm area id to send as JSON response
			 */
			List<Object[]> dailyLatestSevenDaysDataFormatA03ForTrend = dashboardMapRepository
					.dailyLatestSevenDaysDataFormatA03ForTrend(area.getSbmAreaId());

			/**
			 * Iterate the list and set the required data in model
			 */
			for (int i = 1; i < dailyLatestSevenDaysDataFormatA03ForTrend.size(); i++) {
				DashboardDailyTrendDataModel dashboardDailyTrendDataModel = new DashboardDailyTrendDataModel();
				dashboardDailyTrendDataModel.setName((String) dailyLatestSevenDaysDataFormatA03ForTrend.get(i)[0]);
				dashboardDailyTrendDataModel.setDate(new SimpleDateFormat("dd-MM-yyyy")
						.format((Date) dailyLatestSevenDaysDataFormatA03ForTrend.get(i - 1)[1]));
				dashboardDailyTrendDataModel.setValue((Integer) dailyLatestSevenDaysDataFormatA03ForTrend.get(i)[3]);
				dashboardDailyTrendDataModel
						.setAreaLevelId((Integer) dailyLatestSevenDaysDataFormatA03ForTrend.get(i)[4]);
				dashboardDailyTrendDataModel.setKey("cv");
				dashboardDailyTrendDataModelList.add(dashboardDailyTrendDataModel);
			}
			break;
		case 2:
			/**
			 * Fetching list of latest seven days inserted data from formatF28A
			 * table(Geotagging) by sbm area id to send as JSON response
			 */
			List<Object[]> dailyLatestSevenDaysDataGeoTaggingForTrend = dashboardMapRepository
					.dailyLatestSevenDaysGeoTaggingDetailsForTrend(area.getSbmAreaId());

			/**
			 * Iterate the list and set the required data in model
			 */
			for (int i = 1; i < dailyLatestSevenDaysDataGeoTaggingForTrend.size(); i++) {
				DashboardDailyTrendDataModel dashboardDailyTrendDataModel = new DashboardDailyTrendDataModel();
				dashboardDailyTrendDataModel.setName((String) dailyLatestSevenDaysDataGeoTaggingForTrend.get(i)[0]);
				dashboardDailyTrendDataModel.setDate(new SimpleDateFormat("dd-MM-yyyy")
						.format((Date) dailyLatestSevenDaysDataGeoTaggingForTrend.get(i - 1)[1]));
				dashboardDailyTrendDataModel.setValue((Integer) dailyLatestSevenDaysDataGeoTaggingForTrend.get(i)[3]);
				dashboardDailyTrendDataModel
						.setAreaLevelId((Integer) dailyLatestSevenDaysDataGeoTaggingForTrend.get(i)[4]);
				dashboardDailyTrendDataModel.setKey("geo");
				dashboardDailyTrendDataModelList.add(dashboardDailyTrendDataModel);
			}
			break;
		case 3:
			List<Object[]> data = null;
			/**
			 * Initializing switch statement by area level id
			 */
			switch (area.getAreaLevel().getAreaLevelId()) {
			case 3: // district
				/**
				 * Fetching list of latest seven days inserted district data from formatf42state
				 * table(ODF) by sbm area id to send as JSON response
				 */
				data = dashboardMapRepository
						.dailyLatestLatestSevenDaysOdfDistrictwiseDetailsForTrend(area.getSbmAreaId());
				break;
			case 4:
				/**
				 * Fetching list of latest seven days inserted block data from formatf42district
				 * table(ODF) by sbm area id to send as JSON response
				 */
				data = dashboardMapRepository
						.dailyLatestLatestSevenDaysOdfBlockwiseDetailsForTrend(area.getSbmAreaId());

				break;
			}
			if (data != null) {
				/**
				 * Iterate the list and set the required data in model
				 */
				for (int i = 1; i < data.size(); i++) {
					DashboardDailyTrendDataModel dashboardDailyTrendDataModel = new DashboardDailyTrendDataModel();
					dashboardDailyTrendDataModel.setName((String) data.get(i)[0]);
					dashboardDailyTrendDataModel
							.setDate(new SimpleDateFormat("dd-MM-yyyy").format((Date) data.get(i - 1)[1]));
					dashboardDailyTrendDataModel.setValue((Integer) data.get(i)[3]);
					dashboardDailyTrendDataModel.setAreaLevelId((Integer) data.get(i)[4]);
					if (area.getAreaLevel().getAreaLevelId() == 3)
						dashboardDailyTrendDataModel.setKey("odf_dist");
					else if (area.getAreaLevel().getAreaLevelId() == 4)
						dashboardDailyTrendDataModel.setKey("odf_blck");
					dashboardDailyTrendDataModelList.add(dashboardDailyTrendDataModel);
				}
			}

			break;
		}
		return dashboardDailyTrendDataModelList;
	}

}
