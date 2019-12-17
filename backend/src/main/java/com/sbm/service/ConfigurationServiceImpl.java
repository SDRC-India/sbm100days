package com.sbm.service;

import java.io.File;
import java.io.FileInputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.sdrc.usermgmt.domain.Account;
import org.sdrc.usermgmt.domain.AccountDesignationMapping;
import org.sdrc.usermgmt.domain.Authority;
import org.sdrc.usermgmt.domain.Designation;
import org.sdrc.usermgmt.domain.DesignationAuthorityMapping;
import org.sdrc.usermgmt.repository.AccountDesignationMappingRepository;
import org.sdrc.usermgmt.repository.AccountRepository;
import org.sdrc.usermgmt.repository.AuthorityRepository;
import org.sdrc.usermgmt.repository.DesignationAuthorityMappingRepository;
import org.sdrc.usermgmt.repository.DesignationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;

import com.sbm.domain.Forms;
import com.sbm.domain.OptionType;
import com.sbm.domain.Options;
import com.sbm.domain.Question;
import com.sbm.domain.QuestionOptionTypeMapping;
import com.sbm.domain.Sections;
import com.sbm.domain.UserAreaMapping;
import com.sbm.domain.UserDetails;
import com.sbm.repository.AreaRepository;
import com.sbm.repository.TypeDetailsRepository;
import com.sbm.repository.UserAreaMappingRepository;
import com.sbm.repository.UserDetailsRepository;
import com.sbm.repository.OptionRepositry;
import com.sbm.repository.OptionTypeRepository;
import com.sbm.repository.QuestionOptionTypeMappingRepository;
import com.sbm.repository.QuestionRepository;
import com.sbm.repository.SectionRepository;

/**
 * Using this service, we will insert all the master records in the Database.
 * 
 * @author subrata
 *
 */
@Service
public class ConfigurationServiceImpl implements ConfigurationService {

	@Autowired
	private DesignationRepository designationRepository;

	@Autowired
	private AuthorityRepository authorityRepository;

	@Autowired
	private DesignationAuthorityMappingRepository designationAuthorityMappingRepository;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private UserDetailsRepository userDetailsRepository;

	@Autowired
	private UserAreaMappingRepository userAreaMappingRepository;

	@Autowired
	private TypeDetailsRepository typeDetailsRepository;

	@Autowired
	private AreaRepository areaRepository;
	
	@Autowired
	private SectionRepository sectionRepository;

	@Autowired
	private QuestionOptionTypeMappingRepository questionOptionTypeMappingRepository;

	@Autowired
	private OptionRepositry optionRepositry;

	@Autowired
	private OptionTypeRepository optionTypeRepository;

	@Autowired
	private QuestionRepository questionRepository;
	
	

	@Autowired
	@Qualifier(value="jpaAccountDesignationMappingRepository")
	private AccountDesignationMappingRepository accountDesignationMappingRepository;

	/**
	 * Inserting master records in Database.
	 * 
	 * @return string will return "successfull" as the response status.
	 *  
	 * @author subrata
	 */
	@Override
	public ResponseEntity<String> createDesgAuthorityMapping() {

		/**
		 * Create designation in Designation table
		 */
		List<Designation> designationList = new ArrayList<>();

		Designation desg = new Designation();
		desg.setCode("001");
		desg.setName("STATE");
		designationList.add(desg);

		desg = new Designation();
		desg.setCode("002");
		desg.setName("DISTRICT");
		designationList.add(desg);

		desg = new Designation();
		desg.setCode("003");
		desg.setName("BLOCK");
		designationList.add(desg);

		desg = new Designation();
		desg.setCode("004");
		desg.setName("ADMIN");
		designationList.add(desg);

		designationRepository.save(designationList);

		/**
		 * Create Authority in Authority table
		 */
		List<Authority> authorityList = new ArrayList<>();

		Authority authority = new Authority();
		authority.setAuthority("usermgmt_HAVING_write");
		authority.setDescription("Allow user to manage usermanagement module");
		authorityList.add(authority);

		authority = new Authority();
		authority.setAuthority("dashboard_HAVING_write");
		authority.setDescription("Allow user to access dashboard");
		authorityList.add(authority);

		authority = new Authority();
		authority.setAuthority("report_HAVING_read");
		authority.setDescription("Allow user to access report");
		authorityList.add(authority);

		authorityRepository.save(authorityList);

		/**
		 * Designation-Authority Mapping
		 */
		List<DesignationAuthorityMapping> damList = new ArrayList<>();

		DesignationAuthorityMapping dam = new DesignationAuthorityMapping();

		/**
		 * admin user to access report,dashboard and user_management module
		 */
		dam.setAuthority(authorityRepository.findByAuthority("usermgmt_HAVING_write"));
		dam.setDesignation(designationRepository.findByCode("004"));
		damList.add(dam);

		dam = new DesignationAuthorityMapping();
		dam.setAuthority(authorityRepository.findByAuthority("dashboard_HAVING_write"));
		dam.setDesignation(designationRepository.findByCode("004"));
		damList.add(dam);

		dam = new DesignationAuthorityMapping();
		dam.setAuthority(authorityRepository.findByAuthority("report_HAVING_read"));
		dam.setDesignation(designationRepository.findByCode("004"));
		damList.add(dam);

		/**
		 * state,district,block designation user to access only report
		 */
		dam = new DesignationAuthorityMapping();
		dam.setAuthority(authorityRepository.findByAuthority("report_HAVING_read"));
		dam.setDesignation(designationRepository.findByCode("001"));
		damList.add(dam);

		dam = new DesignationAuthorityMapping();
		dam.setAuthority(authorityRepository.findByAuthority("report_HAVING_read"));
		dam.setDesignation(designationRepository.findByCode("002"));
		damList.add(dam);

		dam = new DesignationAuthorityMapping();
		dam.setAuthority(authorityRepository.findByAuthority("report_HAVING_read"));
		dam.setDesignation(designationRepository.findByCode("003"));
		damList.add(dam);

		designationAuthorityMappingRepository.save(damList);

		return new ResponseEntity<String>("successfull", HttpStatus.OK);
	}

	/**
	 * Reading the excel from classpath and inserting all the user informations in the database.
	 * 
	 * @return string will return "successfull" as the response status.
	 * 
	 * @author subrata
	 */
	@Override
	@Transactional
	public ResponseEntity<String> config() {

		ClassLoader loader = Thread.currentThread().getContextClassLoader();
		URL url = loader.getResource("user/");
		String path = url.getPath().replaceAll("%20", " ");
		// Getting all the excel files the classpath.
		File[] files = new File(path).listFiles();

		if (files == null) {
			throw new RuntimeException("No file found in path " + path);
		}

		try {
			/**
			 * Iterating all the excel files.
			 */
			for (int f = 0; f < files.length; f++) {
				/**
				 * Converting the excel in XSSFWorkbook type and reading the first sheet.
				 */
				XSSFWorkbook workbook = new XSSFWorkbook(files[f]);
				XSSFSheet sheet = workbook.getSheetAt(0);

				Row row;
				Cell cell;

				String name = null;
				String userName = null;
				String password = null;
				String areaCode = null;
				String designation = null;
				String number = null;
				Integer typeDetailsId = null;
				Account account;
				UserDetails userDetails;
				UserAreaMapping userAreaMapping = null;
				AccountDesignationMapping accountDesignationMapping = null;

				for (int i = 1; i <= sheet.getLastRowNum(); i++) {

					account = new Account();
					userDetails = new UserDetails();
					userAreaMapping = new UserAreaMapping();
					accountDesignationMapping = new AccountDesignationMapping();

					row = sheet.getRow(i);

					/**
					 * column loop
					 */
					for (int col = 0; col < 7; col++) {

						cell = row.getCell(col);
						switch (col) {

						case 0:
							name = cell.getStringCellValue();
							break;

						case 1:
							userName = cell.getStringCellValue();
							break;

						case 2:
							password = cell.getStringCellValue();
							break;

						case 3:
							areaCode = cell.getStringCellValue();
							break;

						case 4:
							if (cell == null)
								designation = null;
							else if(cell.getCellType() == CellType.BLANK )
								designation = null;
							else
								designation = cell.getStringCellValue();
							break;

						case 5: {
							System.out.println(i + "      " + cell.getCellType());
							if (cell.getCellType() == CellType.STRING)
								number = cell.getStringCellValue();
							else if (cell.getCellType() == CellType.BLANK)
								number = "0000000";
							else
								number = String.valueOf((long)cell.getNumericCellValue());
						}
							break;

						case 6:
							typeDetailsId = (int) cell.getNumericCellValue();
							break;

						}
					}

					// save in db
					account.setUserName(userName);
					account.setPassword(bCryptPasswordEncoder.encode(password));
					Account saveAccount = accountRepository.save(account);

					/**
					 * save details in user details table
					 */
					userDetails.setAccount(saveAccount);
					userDetails.setMobileNumber(String.valueOf(number));
					userDetails.setName(name);
					userDetails.setTypeDetails(typeDetailsRepository.findByTypeDetailId(typeDetailsId));
					userDetailsRepository.save(userDetails);

					/**
					 * save user area mapping
					 */
					userAreaMapping.setArea(areaRepository.findByAreaCode(areaCode));
					userAreaMapping.setUser(saveAccount);
					userAreaMappingRepository.save(userAreaMapping);

					/**
					 * save account designation
					 */
					if(designation != null) {
						accountDesignationMapping.setAccount(saveAccount);
						accountDesignationMapping.setDesignation(designationRepository.findByName(designation));
						accountDesignationMappingRepository.save(accountDesignationMapping);
					}

				}

				workbook.close();
			}
			return new ResponseEntity<String>("successfull", HttpStatus.OK);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	
	@Override
	@Transactional
	public boolean configureQuestionTemplate() {
		
	

		List<Sections> sections = sectionRepository.findAll();
		List<Question> questions = questionRepository.findAll();

		Map<String, Sections> sectionMap = new HashMap<String, Sections>();
		sections.forEach(d -> {
			sectionMap.put(d.getSectionName() + "_" + d.getForm().getFormId(), d);
		});
		List<OptionType> optionTypes = optionTypeRepository.findAll();

		Map<String, OptionType> optionTypeMap = new HashMap<String, OptionType>();
		optionTypes.forEach(d -> {
			optionTypeMap.put(d.getOptionTypeName(), d);
		});
		Map<String, Question> questionMap = new HashMap<String, Question>();

		questions.forEach(d -> {
			questionMap.put(d.getQuestionNameId() + '_' + d.getForm().getFormId(), d);
		});

		try {
			FileInputStream fileInputStream = new FileInputStream(
					ResourceUtils.getFile("classpath:" + "templates/qustionTamps.xlsx"));

			XSSFWorkbook workbook = new XSSFWorkbook(fileInputStream);

			XSSFSheet sheet = workbook.getSheetAt(0);

			for (int i = 1; i <= sheet.getLastRowNum(); i++) {
				Question question = new Question();
				question.setLive(true);
				if (questionMap.containsKey(sheet.getRow(i).getCell(0).getStringCellValue() + "_"
						+ (int) sheet.getRow(i).getCell(8).getNumericCellValue())) {
					continue;
				}
				for (int colId = 0; colId <= 24; colId++) {
					Cell col = sheet.getRow(i).getCell(colId);

					System.out.println(col);
					switch (colId + 1) {
					case 1:// questionNameId
						question.setQuestionNameId(col.getStringCellValue());
						break;
					case 2:// questionName
						question.setQuestionName(
								col.getCellType() == CellType.STRING || col.getCellType() == CellType.BLANK
										? col.getStringCellValue()
										: String.valueOf((int) col.getNumericCellValue()));
						break;
					case 3:// question order
						question.setQuestionOrder((int) col.getNumericCellValue());
						break;
					case 4:// question col
						question.setColumnn(col.getStringCellValue());
						break;
					case 5:// question control
						question.setControlType(col.getStringCellValue());
						break;
					case 6: // question input type
						question.setInputType(col.getStringCellValue());
						break;
					case 7:
						if (sectionMap.containsKey(col.getStringCellValue() + "_"
								+ (int) sheet.getRow(i).getCell(8).getNumericCellValue()))
							question.setSection(sectionMap.get(col.getStringCellValue() + "_"
									+ (int) sheet.getRow(i).getCell(8).getNumericCellValue()));
						else {
							Sections section = new Sections();
							section.setForm(new Forms((int) sheet.getRow(i).getCell(8).getNumericCellValue()));
							section.setSectionName(col.getStringCellValue());
							section.setSectionOrder(1);
							section.setLive(true);
							section = sectionRepository.save(section);
							sectionMap.put(section.getSectionName() + "_" + section.getForm().getFormId(), section);
							question.setSection(section);
						}

						break;
					case 8: // QuestionOption

						break;

					case 9:// from
						question.setForm(new Forms((int) col.getNumericCellValue()));
						break;
					case 10:// reviewHeader
						question.setReviewHeader(col.getBooleanCellValue());
						break;
					case 11: // reviewName
						if (col != null)
							question.setReviewName(col.getStringCellValue());
						break;
					case 12: // dependecy
						if (col != null)
							question.setDependecy(col.getBooleanCellValue());
						break;
					case 13: // dependentColumn
						if (col != null)
							question.setDependentColumn(col.getStringCellValue());
						break;
					case 14: // dependentCondition
						if (col != null) {
							String condition = "";
							int k = 0;
							for (String cell : col.getStringCellValue().split(",")) {
								if (cell.contains("#")) {
									Question qustn = questionRepository.findByColumnnAndFormFormId(
											question.getDependentColumn().split(",")[k],
											(int) sheet.getRow(i).getCell(8).getNumericCellValue());
									String typeCondition = cell.split("#")[0].replaceAll("#", "");
									if (condition == "") {
										condition = typeCondition + "#"
												+ qustn.getQuestionOptionTypeMapping().getOptionType().getOptions()
														.stream()
														.filter(d -> d.getOptionName().trim()
																.equalsIgnoreCase(cell.split("#")[1].trim()))
														.findFirst().get().getOptionId();
									} else {
										condition += "," + typeCondition + "#"
												+ qustn.getQuestionOptionTypeMapping().getOptionType().getOptions()
														.stream()
														.filter(d -> d.getOptionName().trim()
																.equalsIgnoreCase(cell.split("#")[1].trim()))
														.findFirst().get().getOptionId();
									}
								}

								else {
									// successfully
									if (condition == "") {
										condition = cell;
									} else
										condition += "," + cell;

								}
								k++;
							}

							question.setDependentCondition(condition);

						}
						break;
					case 15: // fileExtensions
						if (col != null)
							question.setFileExtensions(col.getStringCellValue());
						break;
					case 16: // constraints
						if (col != null)
							question.setConstraints(col.getStringCellValue());
						break;
					case 17: // saveMandatory
						question.setSaveMandatory(col.getBooleanCellValue());
						break;
					case 18: // finalizeMandatory
						question.setFinalizeMandatory(col.getBooleanCellValue());
						break;
					case 19: // approvalProcess
						question.setApprovalProcess(col.getBooleanCellValue());
						break;
					case 20: // groupId
						if (col != null)
							question.setGroupId(col.getStringCellValue());
						break;
					case 21: // isTriggable
						if (col != null)
							question.setTriggable(col.getBooleanCellValue());
						break;
					case 22: // features
						if (col != null)
							question.setFeatures(col.getStringCellValue());
						break;
					case 23: // defaultSetting
						if (col != null)
							question.setDefaultSetting(col.getStringCellValue());
						break;

					case 24: // serial no
						if (col != null) {
							question.setQuestionSerial(
									col.getCellType() == CellType.STRING || col.getCellType() == CellType.BLANK
											? col.getStringCellValue()
											: String.valueOf(col.getNumericCellValue()));
							question.setQuestionSerial(question.getQuestionSerial().replaceAll("\\.0", ""));
						}
						break;

					case 25: // Placeholder
						if (col != null)
							question.setPlaceHolder(col.getStringCellValue());
						break;
					}

				}
				Cell col = sheet.getRow(i).getCell(7);
				question.setCreatedBy("rajanikanta");
				question = questionRepository.save(question);

				if (col != null) {

					QuestionOptionTypeMapping questionOptionTypeMapping = new QuestionOptionTypeMapping();
					questionOptionTypeMapping.setQuestion(question);
					if (optionTypeMap.containsKey(col.getStringCellValue().trim().split(":")[0].replaceAll(":", ""))) {
						questionOptionTypeMapping.setOptionType(
								optionTypeMap.get(col.getStringCellValue().trim().split(":")[0].replaceAll(":", "")));

					} else {
						String optionTypeDetails = col.getStringCellValue().trim();
						String optionTypeName = optionTypeDetails.split(":")[0].replaceAll(":", "");

						OptionType optionType = new OptionType();
						optionType.setLive(true);
						optionType.setOptionTypeName(optionTypeName);
						optionType = optionTypeRepository.save(optionType);

						String options = optionTypeDetails.split(":")[1].replaceAll(":", "");
						for (String option : options.split(",")) {

							int order = 1;
							if (!option.trim().isEmpty()) {
								System.out.println(option);
								Options optionObject = new Options();
								optionObject.setLive(true);
								optionObject.setOptionName(option.trim());
								optionObject.setOptionOrder(order++);
								optionObject.setOptionType(optionType);
								optionRepositry.save(optionObject);
							}
						}

						questionOptionTypeMapping.setOptionType(optionType);
						optionTypeMap.put(optionType.getOptionTypeName(), optionType);
					}

					questionOptionTypeMappingRepository.save(questionOptionTypeMapping);
					questionMap.put(question.getColumnn(), question);
				}
			}

			workbook.close();
			return true;

		}

		catch (Exception e) {
			e.printStackTrace();
			return false;
		}

	}
}
