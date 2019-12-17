package com.sbm.service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.sbm.domain.FormatA03;
import com.sbm.domain.FormatF28A;
import com.sbm.domain.FormatF42District;
import com.sbm.domain.FormatF42State;
import com.sbm.domain.MessageTemplate;
import com.sbm.domain.SMS;
import com.sbm.domain.SMSDetails;
import com.sbm.domain.UserDetails;
import com.sbm.domain.WaterIndicator;
import com.sbm.repository.FormatAO3Repository;
import com.sbm.repository.FormatF28ARepository;
import com.sbm.repository.FormatF42DistrictRepository;
import com.sbm.repository.FormatF42StateRepository;
import com.sbm.repository.MessageTemplateRepository;
import com.sbm.repository.SMSRepository;
import com.sbm.repository.SmsDetailsRepository;
import com.sbm.repository.UserDetailsRepository;
import com.sbm.repository.WaterIndicatorRepository;
import com.sbm.util.SmsStatusCode;

import lombok.extern.slf4j.Slf4j;

/**
 * SMSServiceImpl class will handle all the SMS related call i.e. creating and sending SMS  
 * 
 * @author subrata
 *
 */
@Service
@Slf4j
public class SMSServiceImpl implements SMSService {
	
	@Autowired
	private UserDetailsRepository userDetailsRepository;

	@Autowired
	private FormatF42DistrictRepository formatF42DistrictRepository;

	@Autowired
	private FormatF42StateRepository formatF42StateRepository;

	@Autowired
	private FormatAO3Repository formAO3DataReposotory;

	@Autowired
	private WaterIndicatorRepository waterIndicatorRepository;

	@Autowired
	private ConfigurableEnvironment configurableEnvironment;

	@Autowired
	private MessageTemplateRepository messageTemplateRepository;

	@Autowired
	private SmsDetailsRepository smsDetailsRepository;

	@Autowired
	private FormatF28ARepository formatF28ARepository;

	@Autowired
	private SMSRepository smsRepository;
	
	@Autowired
	private RestTemplate restTemplate;
	
	private static SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yy");
	
	private static SimpleDateFormat fullDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	/**
	 * According to the user area, this method will create SMS for every user.
	 * This method will run everyday at 10.30 AM.
	 * 
	 * @author subrata
	 */
	@Override
	@Scheduled(cron = "0 30 10 1/1 * ?")
//	@Transactional
	public void saveSMSMessage() {
		try {
			//Converting current date to string type.
			String todayDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
			
			/**
			 * Getting all the block data for the current date from FormatF42District table.
			 */
			List<FormatF42District> formatfDistrict42List = formatF42DistrictRepository.getCurrentDateRecords(todayDate);
			/**
			 * Iterating the FormatF42District data and storing in a Map.
			 */
			Map<Integer, String> formatfDistrict42MapForBlockLevel = formatfDistrict42List.stream()
					.collect(Collectors.toMap(k -> k.getBlockId(),
							v -> v.getVillageDeclaredOdfTotal() + "_" + v.getVillageDeclaredOdfDifference() + "_"
									+ v.getVillageDeclaredOdfPercentage() + "_" + v.getVillageVerifiedOdfTotal() + "_"
									+ v.getVillageVerifiedOdfDifference() + "_" + v.getVillageVerifiedOdfPercentage()));
			/**
			 * Getting all the district data for the current date from FormatF42State table.
			 */
			List<FormatF42State> formatfState42List = formatF42StateRepository.getCurrentDateRecords(todayDate);
			/**
			 * Iterating the FormatF42State data and storing in a Map.
			 */
			Map<Integer, String> formatfState42Map = new HashMap<Integer, String>();
			for (FormatF42State formatF42State : formatfState42List) {
	
				formatfState42Map.put(formatF42State.getAreaId(),
						formatF42State.getVillageDeclaredOdfTotal() + "_" + formatF42State.getVillageDeclaredOdfDifference()
								+ "_" + formatF42State.getVillageDeclaredOdfPercentage() + "_"
								+ formatF42State.getVillageVerifiedOdfTotal() + "_"
								+ formatF42State.getVillageVerifiedOdfDifference() + "_"
								+ formatF42State.getVillageVerifiedOdfPercentage());
			}
	
			/**
			 * Getting state data for the current date from FormatA03 table and storing in a map .
			 */
			Map<String, FormatA03> stateListMap = new LinkedHashMap<String, FormatA03>();
			List<FormatA03> stateList = formAO3DataReposotory.getCurrentDateRecordsForState(todayDate);
			Iterator<FormatA03> stateIterator = stateList.iterator();
			while (stateIterator.hasNext()) {
				FormatA03 bean = stateIterator.next();
				stateListMap.put(bean.getStateName().toLowerCase() + "_" + bean.getAreaId(), bean);
	
			}
	
			/**
			 * Getting Districts data for the current date from FormatA03 table and storing in a map.
			 */
			Map<String, FormatA03> districtListMap = new LinkedHashMap<String, FormatA03>();
			List<FormatA03> districtList = formAO3DataReposotory.getCurrentDateRecordsForDistricts(todayDate);
			Iterator<FormatA03> iterator3 = districtList.iterator();
			while (iterator3.hasNext()) {
				FormatA03 bean = iterator3.next();
				districtListMap.put(bean.getDistrictName().toLowerCase() + "_" + bean.getAreaId(), bean);
	
			}
	
			/**
			 * Getting Blocks data for the current date from FormatA03 table and storing in a map.
			 */
			Map<String, FormatA03> blockListMap = new LinkedHashMap<String, FormatA03>();
			List<FormatA03> blockList = formAO3DataReposotory.getCurrentDateRecordsForBlocks(todayDate);
			Iterator<FormatA03> iterator4 = blockList.iterator();
			while (iterator4.hasNext()) {
				FormatA03 bean1 = iterator4.next();
				blockListMap.put(bean1.getBlockName().toLowerCase() + "_" + bean1.getAreaId(), bean1);
			}
	
			/**
			 * Getting GPs data for the current date from FormatA03 table and storing in a map.
			 */
			Map<String, FormatA03> gpListMap = new LinkedHashMap<String, FormatA03>();
			List<FormatA03> gpList = formAO3DataReposotory.getCurrentDateRecordsForGps(todayDate);
			Iterator<FormatA03> iterator5 = gpList.iterator();
			while (iterator5.hasNext()) {
				FormatA03 bean2 = iterator5.next();
				gpListMap.put(bean2.getGpName().toLowerCase() + "_" + bean2.getAreaId(), bean2);
			}
	
			/**
			 * get Sanitation user information to send the state, district, block and
			 * gram_panchayat messages
			 */
			List<Object[]> sanitationUserList = userDetailsRepository.getSanitationUserList();
	
			/**
			 * get all message templates from the database
			 */
//			List<MessageTemplate> template = messageTemplateRepository.findAll();
			List<MessageTemplate> template = messageTemplateRepository.findByIsActiveTrue();
	
			Map<Integer, String> templateMap = new HashMap<>();
	
			/**
			 * putting message templates for sanitation user into a map
			 */
			for (MessageTemplate messageTemplate : template) {
				if (messageTemplate.getTypeDetails().getTypeDetailId() == 1) {
					templateMap.put(messageTemplate.getAreaLevel().getAreaLevelId(), messageTemplate.getMsgTemplate());
				}
			}
			
			/**
			 * Getting all the data for the current date from FormatF28A table and storing in a map.
			 */
			List<FormatF28A> format28aList = formatF28ARepository.getCurrentDateRecords(todayDate);
			Map<Integer, String> geoTagMap = format28aList
											.stream().collect(Collectors
													.toMap(FormatF28A::getSbmAreaId, v->v.getUploadedPhotographsPercentage()+"_"+v.getUploadedPhotographsYesterday()));
			/**
			 * Iterating the user list and sending the SMS according to the area and area level.
			 * If there is scraping data found for FormatA03, FormatF42, FormatF28A then sending SMS to all users. 
			 * If no scraping data found then sending a maintenance SMS to all users.
			 */
			List<SMS> smsList = new ArrayList<>();
			for (Object[] obj : sanitationUserList) {
				if((formatfDistrict42List.isEmpty() && formatfState42List.isEmpty() && stateList.isEmpty() 
						&& districtList.isEmpty() && blockList.isEmpty() && gpList.isEmpty() && format28aList.isEmpty())) {
					String msg = configurableEnvironment.getProperty("sbm100.data.unavailable");
					saveSMS(msg, (String)obj[2], new UserDetails((Integer)obj[0]), (int)obj[5], smsList);
				}else {
					/**
					 * Calculating the noOfDays for all users according to the user's area.
					 */
					/*LocalDate deadLineDate = ((Timestamp) obj[7]).toLocalDateTime().toLocalDate();
					LocalDate currentDate = LocalDate.now();
					long noOfDays = ChronoUnit.DAYS.between(currentDate, deadLineDate);*/
	
					String msg = new String();
					switch ((int) obj[5]) {
					case 2: // State
						/**
						 * Getting the State level SMS template from templateMap and setting the all the values.
						 * If no data found then setting "N/A" in the message template.
						 */
						String odfDecDiffString = formatfState42Map.containsKey((int) obj[3]) ? formatfState42Map.get((int) obj[3]) : null;
						
						msg = templateMap.get((int) obj[5]);
						msg = msg.replace("#000", sdf.format(new Date()));
						
						Integer hhCoveredYesterdayStatewise = stateListMap.containsKey(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]) ? 
								stateListMap.get(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]).getHHCoveragedYesterday() : null;
						String coveredYesterdayStatewise = hhCoveredYesterdayStatewise != null ? String.valueOf(hhCoveredYesterdayStatewise): "N/A";
						
						msg = msg.replace("#001", stateListMap.containsKey(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]) ? 
								(stateListMap.get(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]).getIhhlCoveragePercent().toString()): "N/A");
						msg = msg.replace("#002", coveredYesterdayStatewise);
						
						/*Double balanceUncoveredRRStatewise=stateListMap.containsKey(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]) ? 
								stateListMap.get(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]).getBalanceUncoveredRR() : null;
						String finalBalanceUncoveredRRStatewise=balanceUncoveredRRStatewise !=null ? 
								String.valueOf((int)Math.round(balanceUncoveredRRStatewise)): "N/A";*/
						
						msg = msg.replace("#003", stateListMap.containsKey(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]) ? 
								(stateListMap.get(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]).getCoverageHHBalanceUncovered().toString()):"N/A");
						/*msg = msg.replace("#004", finalBalanceUncoveredRRStatewise);
						msg = msg.replace("#005", stateListMap.containsKey(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3])?
								(stateListMap.get(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]).getDeficit()==null?"N/A":
								stateListMap.get(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]).getDeficit().toString()):"N/A");*/
						
						if(odfDecDiffString != null) {
							msg = msg.replace("#006", odfDecDiffString.split("_")[0]);
							msg = msg.replace("#007",odfDecDiffString.split("_")[2]);
							msg = msg.replace("#008",odfDecDiffString.split("_")[1].equals("null")?"N/A":odfDecDiffString.split("_")[1]);
								
							msg = msg.replace("#009", odfDecDiffString.split("_")[3]);
							msg = msg.replace("#010",odfDecDiffString.split("_")[5]);
							msg = msg.replace("#011",odfDecDiffString.split("_")[4].equals("null")?"N/A":odfDecDiffString.split("_")[4]);
						} else {
							msg = msg.replace("#006", "N/A");
							msg = msg.replace("#007%","N/A");
							msg = msg.replace("#008 ystd","N/A");
								
							msg = msg.replace("#009", "N/A");
							msg = msg.replace("#010%","N/A");
							msg = msg.replace("#011 ystd","N/A");
						}
//						msg = msg.replace("#012",String.valueOf(noOfDays));
						if(geoTagMap.containsKey((int)obj[3])) {
							msg = msg.replace("#013",geoTagMap.get((int)obj[3]).split("_")[0].toString());
							msg = msg.replace("#014",geoTagMap.get((int)obj[3]).split("_")[1].toString());	
						}else {
							msg = msg.replace("#013%","N/A");
							msg = msg.replace("#014 done ystd.","N/A");	
						}
						break;
					case 3: // District 
						/**
						 * Getting the District level SMS template from templateMap and setting the all the values.
						 * If no data found then setting "N/A" in the message template.
						 */
						String odfDiffString  = formatfState42Map.containsKey((int)obj[3])?formatfState42Map.get((int)obj[3]):null;
						msg = templateMap.get((int)obj[5]);
						msg = msg.replace("#012", (String)obj[6]);
						msg = msg.replace("#000", sdf.format(new Date()));
						
						Integer hhCoveredYesterday = districtListMap.containsKey(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3])
								? districtListMap.get(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]).getHHCoveragedYesterday():null;
						String coveredYesterday = hhCoveredYesterday != null ? String.valueOf(hhCoveredYesterday): "N/A";
						msg = msg.replace("#001", districtListMap.containsKey(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]) ? 
								districtListMap.get(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]).getIhhlCoveragePercent().toString():"N/A");
						msg = msg.replace("#002", coveredYesterday);
						
						/*Double balanceUncoveredRRDistrictwise=districtListMap.containsKey(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]) ? 
								districtListMap.get(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]).getBalanceUncoveredRR():null;
						String finalBalanceUncoveredRRDistrictwise=balanceUncoveredRRDistrictwise !=null ? 
								String.valueOf((int)Math.round(balanceUncoveredRRDistrictwise)): "N/A";*/
						msg = msg.replace("#003", districtListMap.containsKey(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]) ? 
								districtListMap.get(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]).getCoverageHHBalanceUncovered().toString() : "N/A");
						
						/*msg = msg.replace("#004", finalBalanceUncoveredRRDistrictwise);
						msg = msg.replace("#005", districtListMap.containsKey(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3])?
								(districtListMap.get(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]).getDeficit()==null?"N/A"
								:districtListMap.get(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]).getDeficit().toString()):"N/A");*/
						
						if(odfDiffString != null) {
							msg = msg.replace("#006", odfDiffString.split("_")[0]);
							msg = msg.replace("#007",odfDiffString.split("_")[2]);
							msg = msg.replace("#008",odfDiffString.split("_")[1].equals("null")?"N/A":odfDiffString.split("_")[1]);
								
							msg = msg.replace("#009", odfDiffString.split("_")[3]);
							msg = msg.replace("#010",odfDiffString.split("_")[5]);
							msg = msg.replace("#011",odfDiffString.split("_")[4].equals("null")?"N/A":odfDiffString.split("_")[4]);
						} else {
							msg = msg.replace("#006", "N/A");
							msg = msg.replace("#007%","N/A");
							msg = msg.replace("#008 ystd","N/A");
								
							msg = msg.replace("#009", "N/A");
							msg = msg.replace("#010%","N/A");
							msg = msg.replace("#011 ystd","N/A");
						}
						
						
//						msg = msg.replace("#013",String.valueOf(noOfDays));
						if(geoTagMap.containsKey((int)obj[3])) {
							msg = msg.replace("#014",geoTagMap.get((int)obj[3]).split("_")[0].toString());
							msg = msg.replace("#015",geoTagMap.get((int)obj[3]).split("_")[1].toString());
						}else {
							msg = msg.replace("#014%","N/A");
							msg = msg.replace("#015 done ystd.","N/A");
						}
						break;
					case 4://Block 
						/**
						 * Getting the Block level SMS template from templateMap and setting the all the values.
						 * If no data found then setting "N/A" in the message template.
						 */
						String odfdecDiff  = formatfDistrict42MapForBlockLevel.containsKey((int)obj[3])? 
								formatfDistrict42MapForBlockLevel.get((int)obj[3]):null;
						msg = templateMap.get((int)obj[5]);
						msg = msg.replace("#008", (String)obj[6]);
						msg = msg.replace("#000", sdf.format(new Date()));
						
						Integer hhCoveredYesterdayBlockwise=blockListMap.containsKey(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]) ? 
								blockListMap.get(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]).getHHCoveragedYesterday() : null;
						String coveredYesterdayBlockwise = hhCoveredYesterdayBlockwise != null ? String.valueOf(hhCoveredYesterdayBlockwise): "N/A";
						msg = msg.replace("#001", blockListMap.containsKey(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]) ? 
								blockListMap.get(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]).getIhhlCoveragePercent().toString() : "N/A");
						msg = msg.replace("#002", coveredYesterdayBlockwise);
						
						/*Double balanceUncoveredRRBlockwise=blockListMap.containsKey(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]) ? 
								blockListMap.get(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]).getBalanceUncoveredRR() : null;
						String finalBalanceUncoveredRRBlockwise=balanceUncoveredRRBlockwise !=null ? 
								String.valueOf((int)Math.round(balanceUncoveredRRBlockwise)): "N/A";*/
						msg = msg.replace("#003", blockListMap.containsKey(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]) ? 
								blockListMap.get(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]).getCoverageHHBalanceUncovered().toString():"N/A");
//						msg = msg.replace("#004", finalBalanceUncoveredRRBlockwise);
						
						if(odfdecDiff != null) {
							msg = msg.replace("#005", odfdecDiff.split("_")[0]);
							msg = msg.replace("#006",odfdecDiff.split("_")[2]);
							msg = msg.replace("#007",odfdecDiff.split("_")[1].equals("null")?"N/A":odfdecDiff.split("_")[1]);
						}else {
							msg = msg.replace("#005", "N/A");
							msg = msg.replace("#006%","N/A");
							msg = msg.replace("#007 ystd","N/A");
						}
						
//						msg = msg.replace("#009",noOfDays+"");
						if(geoTagMap.containsKey((int)obj[3])) {
							msg = msg.replace("#010",geoTagMap.get((int)obj[3]).split("_")[0].toString());
							msg = msg.replace("#011",geoTagMap.get((int)obj[3]).split("_")[1].toString());
						}else {
							msg = msg.replace("#010%","N/A");
							msg = msg.replace("#011 done ystd.","N/A");
						}
						break;
					case 5://GP
						/**
						 * Getting the GP level SMS template from templateMap and setting the all the values.
						 * If no data found then setting "N/A" in the message template.
						 */
						msg = templateMap.get((int)obj[5]);
						msg = msg.replace("#000", (String)obj[6]);
						msg = msg.replace("#001", sdf.format(new Date()));
						
						Integer hhCoveredYesterdaygpWise=gpListMap.containsKey(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]) ? 
								gpListMap.get(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]).getHHCoveragedYesterday() : null;
						String coveredYesterdayGpWise = hhCoveredYesterdaygpWise != null ? String.valueOf(hhCoveredYesterdaygpWise): "N/A";
						msg = msg.replace("#002", gpListMap.containsKey(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]) ? 
								gpListMap.get(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]).getIhhlCoveragePercent().toString() : "N/A");
						msg = msg.replace("#003", coveredYesterdayGpWise);
						
						/*Double balanceUncoveredRRGpwise=gpListMap.containsKey(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]) ? 
								gpListMap.get(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]).getBalanceUncoveredRR() : null;
						String finalBalanceUncoveredRRGpwise=balanceUncoveredRRGpwise !=null ? 
								String.valueOf((int)Math.round(balanceUncoveredRRGpwise)): "N/A";*/
						
						msg = msg.replace("#004", gpListMap.containsKey(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]) ? 
								gpListMap.get(String.valueOf(obj[6]).toLowerCase()+"_"+obj[3]).getCoverageHHBalanceUncovered().toString():"N/A");
//						msg = msg.replace("#005", finalBalanceUncoveredRRGpwise);
						
						break;
					}
					//Save in SMS table
					saveSMS(msg, (String)obj[2], new UserDetails((Integer)obj[0]), (int)obj[5], smsList);
				}
			}
			/**
			 * Saving all the messages in SMS table.
			 */
			smsRepository.save(smsList);
			log.info(smsList.size()+" number of SMS saved successfully.");
		}catch (Exception e) {
			log.error("Action : Error while creating SMS ",e);
		}
	}
	
	/**
	 * Creating SMS object and setting usersDetails, SMS, areaLevelId and status as false and adding in a smsList. 
	 * 
	 * @param msg is the final SMS 
	 * @param string is the mobile number
	 * @param userDetails contains user information
	 * @param areaLevelId users area level
	 * @param smsList contains all the SMS domain.
	 * 
	 * @author subrata
	 */
	private void saveSMS(String msg, String string, UserDetails userDetails, int areaLevelId, List<SMS> smsList) {
		
		SMS sms = new SMS();
		sms.setMessage(msg);
		sms.setUserDetails(userDetails);
		sms.setStatus(false);
		sms.setAreaLevelId(areaLevelId);
		
		smsList.add(sms);
	}
	
	/**
	 * Getting all the SMS from Database and sending message to all the users according to their area and areaLevel.
	 * This method will run everyday at 11.00 AM.
	 * 
	 * @author subrata
	 */
	@Override
	@Scheduled(cron = "0 0 11 1/1 * ?")
	public void sendSMS() {
		log.info("Send SMS start time==> " + fullDateFormat.format(new Date()));
		int noOfMsgDelivered = 0;
		List<SMS> listOfSMS = null;
		try {

			List<SMSDetails> smsDetailsList = new ArrayList<SMSDetails>();
			/**
			 * Converting the current date to String type and getting all SMS for the current date.
			 */
			String todayDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
			listOfSMS = smsRepository.getRecords(todayDate);
			log.info("Total number of messages : "+listOfSMS.size());
			int i = 0;
			/**
			 * Iterating the SMS list.
			 */
			for (SMS sms : listOfSMS) {
				int statusCode = sendMessage(sms, smsDetailsList);
				/**
				 * After 50 records processed, Thread is sleeping for 10 seconds. 
				 */
				if(i==50){
					log.info("Thread is going to sleep for 10 seconds. Last processed username(ID) : "
							+sms.getUserDetails().getName()+"("+sms.getUserDetails().getUserDetailsId()+")");
					TimeUnit.SECONDS.sleep(10);
					i=0;
				}
				i++;
				/**
				 * If statusCode is 0, then setting the statusCode to true, updating the dateTime in the SMS table.
				 */
				if(statusCode == 0) {
					sms.setStatus(true);
					sms.setUpdatedDate(new Date());
					smsRepository.save(sms);
					log.info("SMS status changed for the username(ID) : " 
							+sms.getUserDetails().getName()+"("+sms.getUserDetails().getUserDetailsId()+")");
					noOfMsgDelivered++;
				}else {
					log.info("Unable to send SMS to username(ID) : " 
							+sms.getUserDetails().getName()+"("+sms.getUserDetails().getUserDetailsId()+")");
				}
			}
			log.info(noOfMsgDelivered+" out of "+listOfSMS.size()+" messages delivered successfully.");
			/**
			 * Saving the restTemplate response in the SMSDetails table.
			 */
			smsDetailsRepository.save(smsDetailsList);
			log.info("Send SMS end time==> " + fullDateFormat.format(new Date()));
		} catch (InterruptedException e) {
			log.error("An InterruptedException was caught: " + e.getMessage());
		}catch (Exception e) {
			log.error("Action : Error occured while sending SMS ",e);
		}
	}

	private void sendMessageUsingSandeshlive(SMS sms, List<SMSDetails> smsDetailsList) {
		
		String url = configurableEnvironment.getProperty("msg.url.and.credential");
		String message = configurableEnvironment.getProperty("message");
		String urlformat = configurableEnvironment.getProperty("url.format");
		
		String urlMSG = url+sms.getUserDetails().getMobileNumber()+message+sms.getMessage()+urlformat;
		
		ResponseEntity<String> entity = restTemplate.exchange(urlMSG, HttpMethod.GET, null,String.class,"json|text");
		/**
		 * Save the response in the Database Table : sms_details Create a repository for
		 * sms_details table and save.
		 */
		String requestDetails = entity.getBody().trim();

		String requestID = requestDetails.split(":")[2].split(",")[0].replaceAll("\"", "").trim();
		SMSDetails smsDetails = new SMSDetails();
		smsDetails.setRequestId(requestID);
		smsDetails.setUserDetails(sms.getUserDetails());
		smsDetails.setStatusCode(SmsStatusCode.SUCCESS.getValue());
		smsDetails.setSmsDetails(sms.getMessage());
		smsDetailsList.add(smsDetails);
	}

	/**
	 * This method is the actual method where we are sending SMS to the user.
	 * 
	 * @param sms contains all the necessary information to send SMS for a particular user 
	 * @param smsDetailsList contains all the SMSDetails domain.
	 * 
	 * @return statusCode contains 1 or 0
	 * 
	 * @author subrata
	 */
	private int sendMessage(SMS sms, List<SMSDetails> smsDetailsList) {
		log.info("Preparing to call RestTemplate for the username(ID) : "+sms.getUserDetails().getName()+"("+sms.getUserDetails().getUserDetailsId()+")");
		// Initializing statusCode to 1(If any error encountered). 
		int statusCode = 1;
		// Initializing count to 0
		int count = 0;
		// Initializing maxTries to 3(If any error encountered, then we are trying 3 more times.)
		int maxTries = 3;
		while(true) {
			try {
				/**
				 * Reading the properties value from application.properties file.
				 */
				String url = configurableEnvironment.getProperty("msg.url.and.credential");
				String msgType = configurableEnvironment.getProperty("msg.type");
				String callBackURL = configurableEnvironment.getProperty("callback.url");
				String senderId = configurableEnvironment.getProperty("sender.id");
				String password = configurableEnvironment.getProperty("password");
				String version = configurableEnvironment.getProperty("version");
				/**
				 * Constructing the restTemplate URL.
				 */
				String urlMSG = url+password+version+sms.getUserDetails().getMobileNumber()+msgType+sms.getMessage()+callBackURL+senderId;
				
				log.info("URL composed finished for the username(ID) : "+sms.getUserDetails().getName()+"("+sms.getUserDetails().getUserDetailsId()+")");
				/**
				 * Calling the restTemplate.
				 */
				ResponseEntity<String> entity = restTemplate.exchange(urlMSG, HttpMethod.GET, null,String.class);
				
				log.info("RestTemplate response for the username(ID) "
				+sms.getUserDetails().getName()+"("+sms.getUserDetails().getUserDetailsId()+") is : " + entity.getBody().trim());
				/**
				 * Getting the statusCode from the ResponseEntity  response.
				 */
				JsonObject responseJson = new Gson().fromJson(entity.getBody(), JsonObject.class);
				statusCode = responseJson.getAsJsonObject("result").getAsJsonObject("status").get("statusCode").getAsInt();
				/**
				 * Assigning statusCode value.  
				 */
				if(statusCode==0) {
					log.info("SMS delivered successfully to the username(ID) : " 
									+ sms.getUserDetails().getName()+"("+sms.getUserDetails().getUserDetailsId()+")");
					/**
					 * Save the response in the Database Table : sms_details
					 */
					String requestDetails = entity.getBody().trim();
	
					String requestID = requestDetails.split(":")[2].split(",")[0].replaceAll("\"", "").trim();
					SMSDetails smsDetails = new SMSDetails();
					smsDetails.setRequestId(requestID);
					smsDetails.setUserDetails(sms.getUserDetails());
					smsDetails.setStatusCode(SmsStatusCode.SUCCESS.getValue());
					smsDetails.setSmsDetails(sms.getMessage());
					smsDetailsList.add(smsDetails);
					log.info("Returning Resttemplate respone status code : "+statusCode 
							+" for the username(ID) : "+ sms.getUserDetails().getName()+"("+sms.getUserDetails().getUserDetailsId()+")");
					return statusCode;
				}else {
					log.info("Error while sending messages to user id : "+ sms.getUserDetails().getUserDetailsId());
					log.info("Rest template respone : "+responseJson);
					
					return statusCode;
				}
			} catch (Exception e) {
				/**
				 * If any error occurred, then increasing the count value. If count and maxTries are same then returning the statusCode as 1. 
				 */
				++count;
				log.error("Error while calling rest template API for user id "+sms.getUserDetails().getUserDetailsId()+", Attempt : "+ count);
				if (count == maxTries) {
					log.info("Error while calling rest template API for the user id : "+ sms.getUserDetails().getUserDetailsId());
					log.error("Action : Encountered error while calling rest template API "+ e);
					return statusCode;
				}
			}
		}
	}

	@Override
	public void sendWaterLevelSMS() {
		/**
		 * get Water user information to send the state, district, block and
		 * gram_panchayat messages
		 */
		List<Object[]> waterUserList = userDetailsRepository.getWaterUserList();
		Map<String, UserDetails> userDetailsMap = new HashMap<>();

		/**
		 * fetching all user_details and putting UserDetails against name_mobileNo
		 */
		List<UserDetails> allUserList = userDetailsRepository.findAll();
		for (UserDetails userDetails2 : allUserList) {
			userDetailsMap.put(userDetails2.getName() + "_" + userDetails2.getMobileNumber(), userDetails2);
		}

		/**
		 * get all message templates from the db
		 */
		List<MessageTemplate> template = messageTemplateRepository.findAll();

		Map<String, String> sanitationMsgTempMap = new HashMap<>();
		for (MessageTemplate messageTemplate : template) {
			if (messageTemplate.getTypeDetails().getTypeDetailId() == 2
					|| messageTemplate.getTypeDetails().getTypeDetailId() == 3) {
				sanitationMsgTempMap.put(messageTemplate.getTypeDetails().getTypeDetailId() + "_"
						+ messageTemplate.getAreaLevel().getAreaLevelId(), messageTemplate.getMsgTemplate());
			}
		}

//		RestTemplate restTemplate = new RestTemplate();

		/**
		 * sending message to waterIndicator userList
		 */
		List<WaterIndicator> waterIndicatorList = waterIndicatorRepository.findLastDateData();

		Map<Integer, String> stateAggregatemap = new LinkedHashMap<>();
		Map<Integer, String> distAggregatemap = new LinkedHashMap<>();
		for (WaterIndicator waterIndicator : waterIndicatorList) {
			/**
			 * If area is state
			 */
			if (waterIndicator.getAreaLevelId() == 2) {
				stateAggregatemap.put(waterIndicator.getAreaLevelId(),
						waterIndicator.getSourceNotDone() + "_" + waterIndicator.getTenderingNotDone() + "_"
								+ waterIndicator.getWorkorderNotIssued() + "_" + waterIndicator.getNotCompleted() + "_"
								+ waterIndicator.getNotDone() + "_" + waterIndicator.getSourceSanctioned());
			}
			/**
			 * If area is district
			 */
			if (waterIndicator.getAreaLevelId() == 3) {
				distAggregatemap.put(waterIndicator.getDistrictId(),
						waterIndicator.getSourceNotDone() + "_" + waterIndicator.getTenderingNotDone() + "_"
								+ waterIndicator.getWorkorderNotIssued() + "_" + waterIndicator.getNotCompleted() + "_"
								+ waterIndicator.getNotDone() + "_" + waterIndicator.getSourceSanctioned());
			}
		}

		List<SMSDetails> smsDetailsList = new ArrayList<SMSDetails>();

		/**
		 * For Each User in the waterUserList send the distict and state aggregated data
		 */
		for (Object[] object : waterUserList) {

			String sanitaionMsg = new String();
			switch ((int) object[5]) {
			case 2:
				if (sanitationMsgTempMap.containsKey((int) object[4] + "_" + (int) object[5])) {
					sanitaionMsg = sanitationMsgTempMap.get((int) object[4] + "_" + (int) object[5]);
					sanitaionMsg = sanitaionMsg.replace("#0", stateAggregatemap.get(2).split("_")[0]);
					sanitaionMsg = sanitaionMsg.replace("#1", stateAggregatemap.get(2).split("_")[1]);
					sanitaionMsg = sanitaionMsg.replace("#2", stateAggregatemap.get(2).split("_")[2]);
					sanitaionMsg = sanitaionMsg.replace("#3", stateAggregatemap.get(2).split("_")[3]);
					sanitaionMsg = sanitaionMsg.replace("#4", stateAggregatemap.get(2).split("_")[4]);
					sanitaionMsg = sanitaionMsg.replace("#5", stateAggregatemap.get(2).split("_")[5]);
				}
				break;
			case 3:
				if (distAggregatemap.get((int) object[3]) != null) {
					if (sanitationMsgTempMap.containsKey((int) object[4] + "_" + (int) object[5])) {
						sanitaionMsg = sanitationMsgTempMap.get((int) object[4] + "_" + (int) object[5]);
						sanitaionMsg = sanitaionMsg.replace("#0", distAggregatemap.get((int) object[3]).split("_")[0]);
						sanitaionMsg = sanitaionMsg.replace("#1", distAggregatemap.get((int) object[3]).split("_")[1]);
						sanitaionMsg = sanitaionMsg.replace("#2", distAggregatemap.get((int) object[3]).split("_")[2]);
						sanitaionMsg = sanitaionMsg.replace("#3", distAggregatemap.get((int) object[3]).split("_")[3]);
						sanitaionMsg = sanitaionMsg.replace("#4", distAggregatemap.get((int) object[3]).split("_")[4]);
						sanitaionMsg = sanitaionMsg.replace("#5", distAggregatemap.get((int) object[3]).split("_")[5]);
					}
				}
				break;
			case 4:
				break;
			}
//			sendMessage(sanitaionMsg, (String)object[1], (String)object[2], restTemplate, new UserDetails((Integer)object[0]), smsDetailsList);
		}
		// smsDetailsRepository.save(smsDetailsList);
	}

}
