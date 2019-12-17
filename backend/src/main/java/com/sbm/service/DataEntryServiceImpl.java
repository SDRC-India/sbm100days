package com.sbm.service;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import javax.persistence.EntityManager;
import javax.persistence.Id;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.sl.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.json.simple.JSONObject;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;

//import com.sbm.util.SubmissionStatus;
import org.sdrc.usermgmt.domain.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.html.WebColors;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.DottedLineSeparator;
import com.itextpdf.text.pdf.draw.LineSeparator;
import com.sbm.domain.Area;
import com.sbm.domain.Attachment;
import com.sbm.domain.Options;
import com.sbm.domain.Question;
import com.sbm.domain.SubmitionData;
import com.sbm.domain.UserDetails;
import com.sbm.model.DataEntryQuestionModel;
import com.sbm.model.LandingPageModel;
import com.sbm.model.OptionModel;
import com.sbm.model.QuestionModel;
//import com.sbm.domain.BuildingDetails;
//import com.sbm.domain.GrantInAidDetails;
//import com.sbm.domain.InmatesData;
//import com.sbm.domain.InmatesPhoto;
//import com.sbm.domain.InstitutionData;
//import com.sbm.domain.ManagementDetails;
//import com.sbm.domain.PoliceCaseReports;
//import com.sbm.domain.SocialAuditReports;
//import com.sbms.domain.StaffDetails;
//import com.sbm.model.PostSubmissionModel;
import com.sbm.model.ResponseModel;
import com.sbm.repository.AreaRepository;
import com.sbm.repository.AttachmentRepository;
import com.sbm.repository.QuestionRepository;
import com.sbm.repository.SubmitionDataRepository;
import com.sbm.util.HeaderFooterA4;
import com.sbm.util.TokenInfoExtracter;



@Service
public class DataEntryServiceImpl implements DataEntryService{
	
	
	
	
	private final SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-YYYY");

	private final SimpleDateFormat sdfDateType = new SimpleDateFormat("yyyy-MM-dd");
	
	
	@Autowired
	private TokenInfoExtracter tokenInfoExtracter;
	
	@Autowired
	private QuestionRepository questionRepository;
	
	@Autowired
	private AttachmentRepository attachmentRepository;
	
	@Autowired
	private TokenInfoExtracter tokenInfoExtractor;
	
	@Autowired
	private SubmitionDataRepository submitionDataRepository;
	
	@Autowired
	private AreaRepository areaRepository;
	
	@Autowired
	private ServletContext context;
	
	
	@PersistenceContext
	private EntityManager entityManager;
	
	public  final double IMAGE_QUALITY = 280.00;
	public  final double MAX_FILE = 1024.00;
	public  final String IMAGE_DEFAULT = "templates/default.png";
	
	
	private final Path instPath = Paths.get("/sbm100days/img");
	
	private final SimpleDateFormat sdfFull = new SimpleDateFormat("dd-MM-YYYY HH-mm-ss");
	
	

	@Override
	public List<DataEntryQuestionModel> getQuestion(int formId, OAuth2Authentication auth, Integer submissioId) throws Exception{
		


		boolean disabled = false;
		boolean submitDisabled=false;
		QuestionModel questionModel = new QuestionModel();
		List<DataEntryQuestionModel> dataEntryQuestionModels = new ArrayList<DataEntryQuestionModel>();
		questionModel.setControlType("id");
		questionModel.setColumnName("id");
		questionModel.setKey(formId);
		String rejectedReason = "";
		SubmitionData submitionData = submitionDataRepository.findByIsLiveTrueAndSubmitionId(submissioId);
		

		List<Question> questions = questionRepository.findByFormFormIdAndIsLiveTrueOrderByQuestionOrderAsc(formId);

		Map<String, DataEntryQuestionModel> dataEntryQuestionModelMap = new HashMap<String, DataEntryQuestionModel>();

		Object dataFromSession = tokenInfoExtracter.getUserModelInfo(auth);

		Map<String, Object> prefetchedData = new HashMap<String, Object>();

		JSONObject jsonObject = new JSONObject((Map) dataFromSession);
		
		Set<Integer> rejectedSectionIds = new HashSet<Integer>();

		List<Attachment> attachments = new ArrayList<Attachment>();

		if(submitionData != null) {
			questionModel.setValue(submitionData.getSubmitionId());
			attachments = submitionData.getAttachment();
			prefetchedData = inspect(SubmitionData.class, submitionData);
		}


		DataEntryQuestionModel dataEntryQuestionModel = new DataEntryQuestionModel();
		dataEntryQuestionModel.setId(questions.get(0).getSection().getSectionId());
		if (rejectedSectionIds.contains(dataEntryQuestionModel.getId()))
			dataEntryQuestionModel.setRejected(true);
		else
			dataEntryQuestionModel.setRejected(false);

		dataEntryQuestionModel.setRejectedRemark(rejectedReason);

		dataEntryQuestionModel.setName(questions.get(0).getSection().getSectionName());
		dataEntryQuestionModel.setSectionOrder(questions.get(0).getSection().getSectionOrder());
		dataEntryQuestionModel.setSubmitDisabled(submitDisabled);
		List<QuestionModel> questionModels = new ArrayList<QuestionModel>();
		questionModels.add(questionModel);
		dataEntryQuestionModel.setQuestions(questionModels);
		dataEntryQuestionModel.setDisabled(disabled);
		dataEntryQuestionModelMap.put(dataEntryQuestionModel.getName(), dataEntryQuestionModel);

		for (Question question : questions) {

			if (question.isApprovalProcess())
				continue;

			questionModel = new QuestionModel();
			questionModel.setAllChecked(false);
			questionModel.setColumnName(question.getColumnn());
			questionModel.setControlType(question.getControlType());
			questionModel.setType(question.getInputType());
			if (question.getFileExtensions() != null)
				questionModel.setFileExtension(question.getFileExtensions().split(","));
			if (question.getDefaultSetting() != null)
				questionModel.setDisabled(question.getDefaultSetting().contains("disabled"));
			else
				questionModel.setDisabled(question.isApprovalProcess());

			if (!questionModel.isDisabled())
				questionModel.setDisabled(disabled);


			if (question.getDependecy()) {
				questionModel.setDependentCondition(question.getDependentCondition().split(","));
				questionModel.setParentColumns(question.getDependentColumn().split(","));
			}

			if (question.getControlType() != "beginRepeat" && question.getGroupId() == null)
				questionModel.setValue(prefetchedData.get(question.getColumnn()) != null
						? prefetchedData.get(question.getColumnn()).toString()
						: null);

			if (question.getControlType().equals("multiSelect"))
				questionModel.setValue(prefetchedData.get(question.getColumnn()) != null
						&& !prefetchedData.get(question.getColumnn()).toString().equals("")
						? Arrays.asList(prefetchedData.get(question.getColumnn()).toString().split(",")).stream()
								.mapToInt(Integer::parseInt).toArray()
						: null);

			if (question.getControlType().equals("file") && prefetchedData.get(question.getColumnn()) != null) {

				// String[] attachmentsStrings =
				// prefetchedData.get(question.getColumnn()).toString().split(",");
//				List<Attachment> attachmentQuestion = new ArrayList<Attachment>();
//				// for (String attachmentString : attachmentsStrings)
//				{
//					// System.out.println(attachmentString);
//					attachmentQuestion.addAll(attachments.stream()
//							.filter(d -> d.getColumnName().equals(question.getColumnn())).collect(Collectors.toList()));
//				}
//				questionModel.setValue(attachmentQuestion);
//				questionModel.setFileValues(prefetchedData.get(question.getColumnn()).toString().split(","));
			}

			questionModel.setCurrentDate(sdfDateType.format(new Date()));
			questionModel.setPlaceHolder(question.getPlaceHolder() == null ? "" : question.getPlaceHolder());
			questionModel.setFileSize((double) 102400000);
			questionModel.setKey(question.getQuestionId());
			questionModel
					.setSerialNumb(question.getSection().getSectionOrder() + "." + question.getQuestionSerial() + "  ");
			questionModel.setLabel(question.getQuestionName() != null ? question.getQuestionName() : "");
			if (question.getConstraints() != null) {
				for (String s : question.getConstraints().split(",")) {
					if (s.contains("minlength=")) {
						questionModel.setMinLength(Integer.parseInt(s.split("minlength=")[1].trim()));
					}

					if (s.contains("maxlength=")) {
						questionModel.setMaxLength(Integer.parseInt(s.split("maxlength=")[1].trim()));
					}

					if (s.contains("minDate=")) {
						if (s.split("minDate=")[1].trim() == "today")
							questionModel.setMinDate(sdf.format(new Date()));
						else
							questionModel.setMinDate(s.split("minDate=")[1].trim());
					}

					if (s.contains("maxDate=")) {
						if (s.split("maxDate=")[1].trim() == "today")
							questionModel.setMaxDate(sdf.format(new Date()));
						else
							questionModel.setMaxDate(s.split("maxDate=")[1].trim());
					}

					if (s.contains("maxSize")) {
						questionModel.setFileSize(Double.parseDouble(s.split("maxSize=")[1].trim()));
					}
					
					if (s.contains("max=")) {
						questionModel.setMax(Integer.parseInt((s.split("max=")[1].trim())));
					}
					
					if (s.contains("min=")) {
						questionModel.setMin(Integer.parseInt((s.split("min=")[1].trim())));
					}
				}
			}

			if (question.getInputType().contains("multiple"))
				questionModel.setMultiple(true);

			if (question.getQuestionOptionTypeMapping() != null) {
				questionModel.setOptions(formatOption(question));
			}

			if (question.getFeatures() != null && question.getFeatures().contains("fetchsession")) {
				questionModel.setOptions(formatOptionPrefectSession(question, jsonObject));
			}

			if (question.getDefaultSetting() != null && question.getDefaultSetting().contains("fetchTable")) {
				questionModel.setOptions(formatOptionPrefectTable(question));
			}

			if (question.getFeatures() != null && question.getFeatures().contains("parent")) {

				for (String feature : question.getFeatures().split(",")) {
					feature = feature.trim();
					if (feature.contains("parent:")) {
						questionModel.setOptionsParentColumn(feature.split(":")[1]);

					}
				}
			}
			
			
			if (question.getDefaultSetting() != null && question.getDefaultSetting().contains("info")) {

				for (String feature : question.getDefaultSetting().split(",")) {
					feature = feature.trim();
					if (feature.contains("info:")) {
						questionModel.setInfoMessage(feature.split(":")[1]);
						questionModel.setInfoAvailable(true);

					}
				}
			}



			questionModel.setRequired(question.isFinalizeMandatory());
			questionModel.setTriggable(false);

			if (question.getDefaultSetting() != null && question.getDefaultSetting().contains("prefetchfetchDate")
					&& questionModel.getValue() == null) {
				questionModel.setValue(sdfDateType.format(new Date()));
			}

			//set values for the qustion
			if (question.getControlType() != "beginRepeat" && question.getGroupId() == null)
				questionModel.setValue(prefetchedData.get(question.getColumnn()) != null
						? prefetchedData.get(question.getColumnn()).toString()
						: null);

			if (question.getControlType().equals("multiSelect"))
				questionModel.setValue(prefetchedData.get(question.getColumnn()) != null
						&& !prefetchedData.get(question.getColumnn()).toString().equals("")
						? Arrays.asList(prefetchedData.get(question.getColumnn()).toString().split(",")).stream()
								.mapToInt(Integer::parseInt).toArray()
						: null);

			if (question.getControlType().equals("file") && prefetchedData.get(question.getColumnn()) != null) {

				// String[] attachmentsStrings =
				// prefetchedData.get(question.getColumnn()).toString().split(",");
				List<Attachment> attachmentQuestion = new ArrayList<Attachment>();
				// for (String attachmentString : attachmentsStrings)
				{
					// System.out.println(attachmentString);
					attachmentQuestion.addAll(attachments.stream()
							.filter(d -> d.getColumnName().equals(question.getColumnn())).collect(Collectors.toList()));
				}
				questionModel.setValue(attachmentQuestion);
				questionModel.setFileValues(prefetchedData.get(question.getColumnn()).toString().split(","));
			}
			
			//end
			
			if (question.getDefaultSetting() != null && question.getDefaultSetting().contains("prefetch")
					&& questionModel.getValue() == null
					&& !question.getDefaultSetting().contains("prefetchfetchDate")) {
				questionModel.setValue(getValuePrfecthed(question, jsonObject));
			}
			
			if (question.getGroupId() != null) {
				questionModel.setGroupParentId(question.getGroupId());

				int minimumRepeats = 1;
				if (question.getDefaultSetting() != null && question.getDefaultSetting().contains("minimumRepeats")) {
					for (String feature : question.getDefaultSetting().split(",")) {
						feature = feature.trim();
						if (feature.contains("minimumRepeats")) {
							minimumRepeats = Integer.parseInt(feature.split(":")[1]);
						}
					}
				}

				List<?> prefetchedDataForRepeat = (List<?>) prefetchedData.get(question.getGroupId());
				if (prefetchedDataForRepeat != null && prefetchedDataForRepeat.size() > 0) {

					for (int i = 0; i < prefetchedDataForRepeat.size(); i++) {
						Map<String, Object> beginRepeatDataMap = inspect(prefetchedDataForRepeat.get(i).getClass(),
								prefetchedDataForRepeat.get(i));

						QuestionModel clonedQuestionModel = (QuestionModel) questionModel.clone();
						clonedQuestionModel.setValue(beginRepeatDataMap.get(clonedQuestionModel.getColumnName()) != null
								? beginRepeatDataMap.get(clonedQuestionModel.getColumnName()).toString()
								: null);

						if (clonedQuestionModel.getControlType().equals("multiSelect"))
							clonedQuestionModel
									.setValue(beginRepeatDataMap.get(clonedQuestionModel.getColumnName()) != null
											? beginRepeatDataMap.get(clonedQuestionModel.getColumnName()).toString()
													.split(",")
											: null);
						if (clonedQuestionModel.getControlType().equals("file")
								&& beginRepeatDataMap.get(clonedQuestionModel.getColumnName()) != null) {

							// String[] attachmentsStrings =
							// beginRepeatDataMap.get(clonedQuestionModel.getColumnName())
							// .toString().split(",");
							List<Attachment> attachmentQuestion = new ArrayList<Attachment>();
							// for (String attachmentString :
							// attachmentsStrings)
							{
								attachmentQuestion.addAll(attachments.stream()
										.filter(d -> d.getColumnName().equals(
												question.getColumnn() + "_" + beginRepeatDataMap.get("indexTrackNum")))
										.collect(Collectors.toList()));

							}
							clonedQuestionModel.setValue(attachmentQuestion);
							clonedQuestionModel
									.setFileValues(beginRepeatDataMap.get(question.getColumnn()).toString().split(","));
						}

						clonedQuestionModel.setIndexNumberTrack(
								question.getColumnn() + "_" + beginRepeatDataMap.get("indexTrackNum"));
						clonedQuestionModel.setRemovable(beginRepeatDataMap.get("removable") != null
								? Boolean.valueOf(beginRepeatDataMap.get("removable").toString())
								: true);

						if (dataEntryQuestionModelMap.get(question.getSection().getSectionName()).getQuestions()
								.stream().filter(d -> d.getColumnName().trim().equals(question.getGroupId().trim()))
								.findFirst().get().getChildQuestionModels() != null
								&& dataEntryQuestionModelMap.get(question.getSection().getSectionName()).getQuestions()
										.stream()
										.filter(d -> d.getColumnName().trim().equals(question.getGroupId().trim()))
										.findFirst().get().getChildQuestionModels().size() > i) {
							dataEntryQuestionModelMap.get(question.getSection().getSectionName()).getQuestions()
									.stream().filter(d -> d.getColumnName().trim().equals(question.getGroupId().trim()))
									.findFirst().get().getChildQuestionModels().get(i).add(clonedQuestionModel);

						}

						else {

							List<List<QuestionModel>> childQuestionModels = null;
							if (dataEntryQuestionModelMap.get(question.getSection().getSectionName()).getQuestions()
									.stream().filter(d -> d.getColumnName().trim().equals(question.getGroupId().trim()))
									.findFirst().get().getChildQuestionModels() == null) {
								childQuestionModels = new ArrayList<List<QuestionModel>>();
							} else {
								childQuestionModels = dataEntryQuestionModelMap
										.get(question.getSection().getSectionName()).getQuestions().stream()
										.filter(d -> d.getColumnName().trim().equals(question.getGroupId().trim()))
										.findFirst().get().getChildQuestionModels();
							}

							List<QuestionModel> childQuestionModel = new ArrayList<QuestionModel>();
							childQuestionModel.add(clonedQuestionModel);
							childQuestionModels.add(childQuestionModel);
							dataEntryQuestionModelMap.get(question.getSection().getSectionName()).getQuestions()
									.stream().filter(d -> d.getColumnName().trim().equals(question.getGroupId().trim()))
									.findFirst().get().setChildQuestionModels(childQuestionModels);

						}

					}

				}

				else {

					for (int i = 0; i < minimumRepeats; i++) {
						QuestionModel clonedQuestionModel = (QuestionModel) questionModel.clone();
						clonedQuestionModel.setIndexNumberTrack(question.getColumnn() + "_" + i);
						if (dataEntryQuestionModelMap.get(question.getSection().getSectionName()).getQuestions()
								.stream().filter(d -> d.getColumnName().trim().equals(question.getGroupId().trim()))
								.findFirst().get().getChildQuestionModels() != null
								&& dataEntryQuestionModelMap.get(question.getSection().getSectionName()).getQuestions()
										.stream()
										.filter(d -> d.getColumnName().trim().equals(question.getGroupId().trim()))
										.findFirst().get().getChildQuestionModels().size() > i) {
							dataEntryQuestionModelMap.get(question.getSection().getSectionName()).getQuestions()
									.stream().filter(d -> d.getColumnName().trim().equals(question.getGroupId().trim()))
									.findFirst().get().getChildQuestionModels().get(i).add(clonedQuestionModel);

						}

						else {
							List<List<QuestionModel>> childQuestionModels = null;
							if (dataEntryQuestionModelMap.get(question.getSection().getSectionName()).getQuestions()
									.stream().filter(d -> d.getColumnName().trim().equals(question.getGroupId().trim()))
									.findFirst().get().getChildQuestionModels() == null) {
								childQuestionModels = new ArrayList<List<QuestionModel>>();
							} else {
								childQuestionModels = dataEntryQuestionModelMap
										.get(question.getSection().getSectionName()).getQuestions().stream()
										.filter(d -> d.getColumnName().trim().equals(question.getGroupId().trim()))
										.findFirst().get().getChildQuestionModels();
							}

							List<QuestionModel> childQuestionModel = new ArrayList<QuestionModel>();
							childQuestionModel.add(clonedQuestionModel);
							childQuestionModels.add(childQuestionModel);
							dataEntryQuestionModelMap.get(question.getSection().getSectionName()).getQuestions()
									.stream().filter(d -> d.getColumnName().trim().equals(question.getGroupId().trim()))
									.findFirst().get().setChildQuestionModels(childQuestionModels);
						}

					}

				}

			} else {
				if (dataEntryQuestionModelMap.containsKey(question.getSection().getSectionName())) {
					dataEntryQuestionModelMap.get(question.getSection().getSectionName()).getQuestions()
							.add(questionModel);
				} else {
					dataEntryQuestionModel = new DataEntryQuestionModel();
					dataEntryQuestionModel.setId(question.getSection().getSectionId());
					if (rejectedSectionIds.contains(dataEntryQuestionModel.getId()))
						dataEntryQuestionModel.setRejected(true);
					else
						dataEntryQuestionModel.setRejected(false);

					dataEntryQuestionModel.setSubmitDisabled(submitDisabled);
					dataEntryQuestionModel.setRejectedRemark(rejectedReason);
					dataEntryQuestionModel.setDisabled(disabled);

					dataEntryQuestionModel.setName(question.getSection().getSectionName());
					dataEntryQuestionModel.setSectionOrder(question.getSection().getSectionOrder());
					questionModels = new ArrayList<QuestionModel>();
					questionModels.add(questionModel);
					dataEntryQuestionModel.setQuestions(questionModels);
					dataEntryQuestionModelMap.put(dataEntryQuestionModel.getName(), dataEntryQuestionModel);

				}
			}

		}

		dataEntryQuestionModels = new ArrayList<DataEntryQuestionModel>(dataEntryQuestionModelMap.values());

		return dataEntryQuestionModels;
	
	}
	
	
	private Map<String, Object> inspect(Class<?> className, Object institutionData) {
		Field[] fields = className.getDeclaredFields();
		Map<String, Object> responseMap = new HashMap<String, Object>();

		for (Field field : fields) {
			String getter = "";

			if (field.getType().getSimpleName() == "boolean" && field.getName().toLowerCase().contains("removable")) {
				getter = "is" + field.getName().substring(0, 1).toUpperCase() + field.getName().substring(1);
			} else if (field.getType().getSimpleName() != "boolean") {
				getter = "get" + field.getName().substring(0, 1).toUpperCase() + field.getName().substring(1);
			}

			if (getter.equals(""))
				continue;

			try {

				Method method = className.getMethod(getter);
				Object value = "";
				value = method.invoke(institutionData);

				if (value != null) {
					if (value instanceof Area) {
						responseMap.put(field.getName(), ((Area) value).getAreaId());
						responseMap.put(field.getName() + "_Obj", ((Area) value));
					} else if (value instanceof Options) {
						responseMap.put(field.getName(), ((Options) value).getOptionId());
					} else if (value instanceof List<?>) {
						responseMap.put(field.getName(), value);
					} else {
						responseMap.put(field.getName(), value);
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}

		}
		return responseMap;
	}

	private Map<String, Object> inspectForResponse(Class<?> className, Object institutionData) {
		Field[] fields = className.getDeclaredFields();
		Map<String, Object> responseMap = new HashMap<String, Object>();

		for (Field field : fields) {
			if (field.getType().getSimpleName() == "boolean") {
				continue;
			}

			try {
				String getter = "get" + field.getName().substring(0, 1).toUpperCase() + field.getName().substring(1);
				Method method = className.getMethod(getter);
				Object value = "";
				value = method.invoke(institutionData);

				if (value != null) {

					if (value instanceof Area) {
						// System.out.println(value);
						responseMap.put(field.getName(), ((Area) value).getAreaName());
					} else if (value instanceof Options) {
						// System.out.println(value);
						responseMap.put(field.getName(), ((Options) value).getOptionName());
					} else if (value instanceof List<?>) {
						responseMap.put(field.getName(), value);
					} else if (!(value instanceof Account || value instanceof UserDetails)) {
						responseMap.put(field.getName(), value);
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		// System.out.println(responseMap);

		return responseMap;
	}

	private List<OptionModel> formatOptionPrefectTable(Question question) {
		List<OptionModel> optionModels = new ArrayList<OptionModel>();
		for (String feature : question.getDefaultSetting().split(",")) {
			feature = feature.trim();
			if (feature.contains("fetchTable")) {
				String queryString = feature.split(":")[1];

				Query query = entityManager.createNativeQuery(queryString);
				List<Object[]> datas = query.getResultList();
				for (Object[] data : datas) {
					OptionModel optionModel = new OptionModel();
					optionModel.setKey(Integer.parseInt(data[0].toString()));
					optionModel.setSelected(false);
					optionModel.setValue(data[2].toString());
					optionModel.setOrder(Integer.parseInt(data[0].toString()));
					optionModel.setParentKey(Integer.parseInt(data[9].toString()));
					optionModel.setLive(Boolean.parseBoolean(data[5].toString()));

					optionModels.add(optionModel);
				}

			}
		}
		return optionModels;
	}

	private List<OptionModel> areaToOption(Area area) {
		List<OptionModel> optionModels = new ArrayList<OptionModel>();

		OptionModel optionModel = new OptionModel();
		optionModel.setKey(area.getAreaId());
		optionModel.setSelected(false);
		optionModel.setValue(area.getAreaName());
		optionModel.setOrder(area.getAreaId());
		optionModel.setParentKey(area.getParentAreaId());
		optionModels.add(optionModel);
		return optionModels;

	}

	private String getValuePrfecthed(Question question, JSONObject dataFromSession) {
		JSONObject parsedData = new JSONObject();
		for (String feature : question.getDefaultSetting().split(",")) {
			feature = feature.trim();
			if (feature.contains("fetchsession")) {
				String jsonPath = feature.split(":")[1];

				parsedData = dataFromSession;
				for (String path : jsonPath.split("\\.")) {
					if (parsedData.get(path) instanceof Map)

						parsedData = new JSONObject((Map) parsedData.get(path));

					else
						return parsedData.get(path).toString();
				}

			}
		}
		return parsedData.toJSONString();
	}

	private List<OptionModel> formatOptionPrefectSession(Question question, JSONObject dataFromSession) {
		List<OptionModel> optionModels = new ArrayList<OptionModel>();
		for (String feature : question.getFeatures().split(",")) {
			feature = feature.trim();
			if (feature.contains("fetchsession")) {
				String jsonPath = feature.split(":")[1];

				JSONObject parsedData = new JSONObject();
				parsedData = dataFromSession;
				for (String path : jsonPath.split("\\.")) {

					parsedData = new JSONObject((Map) parsedData.get(path));
				}
				String json_string = new Gson().toJson(parsedData);
				Area area = new Gson().fromJson(json_string, Area.class);

				OptionModel optionModel = new OptionModel();
				optionModel.setKey(area.getAreaId());
				optionModel.setSelected(false);
				optionModel.setValue(area.getAreaName());
				optionModel.setOrder(area.getAreaId());
				optionModels.add(optionModel);

			}
		}
		return optionModels;
	}

	private List<OptionModel> formatOption(Question question) {
		List<OptionModel> optionModels = new ArrayList<OptionModel>();
		question.getQuestionOptionTypeMapping().getOptionType().getOptions().forEach(d -> {
			OptionModel optionModel = new OptionModel();
			optionModel.setKey(d.getOptionId());
			optionModel.setOrder(d.getOptionOrder());
			optionModel.setSelected(false);
			optionModel.setValue(d.getOptionName());
			optionModels.add(optionModel);

		});

		return optionModels;
	}


	


	
	
	@Override
	public Attachment uploadFile(MultipartFile file, int formId, String columnName) throws Exception {
		try {

			
			Attachment attachment = new Attachment();

			attachment.setOriginalName(file.getOriginalFilename());

			String fileName;
			if (file.getOriginalFilename().trim().length() <= 5) {
				fileName = file.getOriginalFilename().trim()+ new Date().getTime();
			} else {
				fileName = file.getOriginalFilename().trim()
						.replaceAll("." + file.getOriginalFilename().trim().split("\\.")[1], "") + new Date().getTime()
						+ "." + file.getOriginalFilename().trim().split("\\.")[1];
			}
		

				if (file.getContentType().contains("image") && getFileSizeKiloBytes(file) > MAX_FILE)
					compressImage(new File(this.instPath.resolve(fileName).toAbsolutePath().toString()), file);
				else
					Files.copy(file.getInputStream(), this.instPath.resolve(fileName));
				attachment.setFilePath(this.instPath.resolve(fileName).toAbsolutePath().toString());
			

			attachment.setColumnName(columnName);
			attachment.setIsDeleted(false);
			attachment = attachmentRepository.save(attachment);
			return attachment;// this.rootLocation.resolve(fileName).toAbsolutePath().toString();
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("Failed to upload");

		}
	}
	
	private void compressImage(File file, MultipartFile files) throws Exception {
//		System.out.println(getFileSizeKiloBytes(files));
		float compressionQuality = (float) ((IMAGE_QUALITY) / getFileSizeKiloBytes(files));

		BufferedOutputStream buffStream = new BufferedOutputStream(new FileOutputStream(file));

		BufferedImage bufferedImage = ImageIO.read(files.getInputStream());

		// Get image writers
		Iterator<ImageWriter> imageWriters = ImageIO.getImageWritersByFormatName("jpg");

		ImageWriter imageWriter = (ImageWriter) imageWriters.next();
		ImageOutputStream imageOutputStream = ImageIO.createImageOutputStream(buffStream);
		imageWriter.setOutput(imageOutputStream);

		ImageWriteParam imageWriteParam = imageWriter.getDefaultWriteParam();

		// Set the compress quality metrics
//		System.out.println(compressionQuality);
		imageWriteParam.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
		imageWriteParam.setCompressionQuality(compressionQuality);
		imageWriter.write(null, new IIOImage(bufferedImage, null, null), imageWriteParam);
		buffStream.close();

	}
	
	private static double getFileSizeKiloBytes(MultipartFile file) {
		return (double) file.getSize() / 1024;
	}

	
	@Override
	@Transactional
	public ResponseModel saveSubmitData(List<QuestionModel> questionModels, OAuth2Authentication auth) {
		ResponseModel responseModel = new ResponseModel();
		
//		InstitutionData institutionData = new InstitutionData(); 
//		InmatesData inmatesData = new InmatesData();
		SubmitionData submitionData = new SubmitionData();
		Object dataFromSession = tokenInfoExtractor.getUserModelInfo(auth);
		JSONObject jsonObject = new JSONObject((Map) dataFromSession);
		//Account user = new Account();
		Map<String, Object> beginDataObject = new LinkedHashMap<String, Object>();
		final ObjectMapper mapper = new ObjectMapper();
		List<Attachment> attachements = new ArrayList<Attachment>();
		
		Map<String, Object> datObject = new LinkedHashMap<String, Object>();
		int formId = 0;
		for (QuestionModel questionModel : questionModels) {
			if (questionModel.getValue() != null || questionModel.getControlType().equals("id")
					|| questionModel.getControlType().equals("beginRepeat")
					|| questionModel.getControlType().equals("beginRepeatImageRow")) {
				switch (questionModel.getControlType()) {
				case "id":
					formId = questionModel.getKey();
					if (questionModel.getValue() == null
							|| Integer.parseInt(questionModel.getValue().toString()) == 0) {


						List<QuestionModel> fileModels = questionModels.stream()
								.filter(d -> d.getControlType().equals("file")).collect(Collectors.toList());
						;
						for (QuestionModel fileModel : fileModels) {
							if (fileModel.getValue() != null && !(fileModel.getValue() instanceof String
									&& fileModel.getValue().toString().trim().equals(""))) {
								for (Object attachmentObject : (List<?>) fileModel.getValue()) {
									Attachment attachment = mapper.convertValue(attachmentObject, Attachment.class);
									attachment.setAttachmentId(null);
									attachements.add(attachment);
								}

							}

						}

						continue;
					}

	
						List<QuestionModel> fileModels = questionModels.stream()
								.filter(d -> d.getControlType().equals("file")).collect(Collectors.toList());
						;
						for (QuestionModel fileModel : fileModels) {
							if (fileModel.getValue() != null && !(fileModel.getValue() instanceof String
									&& fileModel.getValue().toString().trim().equals(""))) {
								for (Object attachmentObject : (List<?>) fileModel.getValue()) {
									Attachment attachment = mapper.convertValue(attachmentObject, Attachment.class);
									attachment.setAttachmentId(null);
									attachements.add(attachment);
								}

							}

						}
						
						datObject.put(Stream.of(SubmitionData.class.getDeclaredFields())
								.filter(field -> field.isAnnotationPresent(Id.class)).findFirst().get().getName(),
								Integer.parseInt(questionModel.getValue().toString()));


					break;
				case "dropdown":
				case "radio":
					if (questionModel.getValue().toString().trim().equals("")) {
						continue;
					}
					
					datObject.put(questionModel.getColumnName(), Integer.parseInt(questionModel.getValue().toString()));
					break;

				case "file":
					String fileData = null;
					if (questionModel.getValue() instanceof String) {
						continue;
					}
					List<Object> attachments = (List<Object>) questionModel.getValue();
					for (Object map : attachments) {
						final ObjectMapper mapper1 = new ObjectMapper();
						Attachment d = mapper1.convertValue(map, Attachment.class);
						if (fileData == null) {
							fileData = d.getAttachmentId().toString();
						} else {
							fileData += "," + d.getAttachmentId();
						}
					}
					datObject.put(questionModel.getColumnName(), fileData);
					break;
				case "multiSelect":
					System.out.println("q24 data-->>"+questionModel.getValue());
					if (questionModel.getValue() instanceof String) {
						continue;
					}
					String joined1 = null;
					for (Integer value : (ArrayList<Integer>) questionModel.getValue()) {
						if (joined1 == null) {
							joined1 = value.toString();
						} else {
							joined1 += "," + value;
						}
					}

					datObject.put(questionModel.getColumnName(), joined1);
					break;
				case "beginRepeat":
				case "beginRepeatImageRow":

					List<Map<String, Object>> childDataObjectMapList = new ArrayList<>();
					for (List<QuestionModel> childQuestionModels : questionModel.getChildQuestionModels()) {
						Map<String, Object> childDataObject = new LinkedHashMap<String, Object>();
						for (QuestionModel childQuestionModel : childQuestionModels) {

							if (!childQuestionModel.isRemovable())
								childDataObject.put("removable", childQuestionModel.isRemovable());

							if (childQuestionModel.getValue() != null) {
								switch (childQuestionModel.getControlType()) {

								case "dropdown":
								case "radio":
									if (childQuestionModel.getValue().toString().trim().equals("")) {
										continue;
									}
									childDataObject.put(childQuestionModel.getColumnName(),
											Integer.parseInt(childQuestionModel.getValue().toString()));
									break;

								case "file":
									String fileData1 = null;
									if (childQuestionModel.getValue() instanceof String) {
										continue;
									}
									List<Object> attachments1 = (List<Object>) childQuestionModel.getValue();
									for (Object map : attachments1) {
										final ObjectMapper mapper1 = new ObjectMapper();
										Attachment d = mapper1.convertValue(map, Attachment.class);
										if (fileData1 == null) {
											fileData1 = d.getAttachmentId().toString();
										} else {
											fileData1 += "," + d.getAttachmentId();
										}
										Attachment attachment = mapper.convertValue(map, Attachment.class);
										attachment.setAttachmentId(null);
										attachements.add(attachment);
									}

									childDataObject.put(childQuestionModel.getColumnName(), fileData1);
									break;
								case "multiSelect":
									if (childQuestionModel.getValue() instanceof String) {
										continue;
									}
									String joined = String.join(",", (CharSequence[]) childQuestionModel.getValue());
									childDataObject.put(childQuestionModel.getColumnName(), joined);
									break;
								case "beginRepeat":
									break;
								case "heading":
									break;
								case "beginRepeatImageRow":
									break;

								default:
									childDataObject.put(childQuestionModel.getColumnName(),
											childQuestionModel.getValue());

									childDataObject.put("indexTrackNum", childQuestionModel.getIndexNumberTrack()
											.split(childQuestionModel.getColumnName() + "_")[1]);
								}

							}

						}
						if (!childDataObject.isEmpty()) {
							childDataObjectMapList.add(childDataObject);
						}

					}
					if (childDataObjectMapList.size() > 0)
						beginDataObject.put(questionModel.getColumnName(), childDataObjectMapList);
					break;
				default:
					datObject.put(questionModel.getColumnName(), questionModel.getValue());
				}

			}

		}


			submitionData = mapper.convertValue(datObject, SubmitionData.class);
			submitionData.setLive(true);

			if (submitionData.getSubmitionId() == 0) {
				submitionData.setCreatedBy(
						new Account(Integer.parseInt(tokenInfoExtractor.tokenInfo(auth).get("userId").toString())));
			}

			else {
				submitionData.setUpdatedBy(
						new Account(Integer.parseInt(tokenInfoExtractor.tokenInfo(auth).get("userId").toString())));
			}
			submitionData = submitionDataRepository.save(submitionData);

			List<Attachment> attachments = attachmentRepository.findBysubmitionData(submitionData);
			List<Attachment> oldAttachments = attachmentRepository.findBySubmitionDataIsNull();
			for(Attachment attachment : attachments) {
//				attachment.setSubmitionData(null);
//				attachmentRepository.save(attachment);
				attachmentRepository.delete(attachment);
			}
			
			for(Attachment attachment : oldAttachments) {

				attachmentRepository.delete(attachment);
			}

			for (Attachment attachment : attachements) {
				attachment.setSubmitionData(submitionData);
				attachmentRepository.save(attachment);
			}

		responseModel.setStatusCode(HttpStatus.OK.value());
		responseModel.setMessage("Your Submission is under review");

		return responseModel;
	}
	
	@Override
	public LandingPageModel getLandingPageData(OAuth2Authentication auth) {
		LandingPageModel landingPageModel = new LandingPageModel();
		List<Object[]> headers = questionRepository.findReviewHeader();
		
		Object dataFromSession = tokenInfoExtractor.getUserModelInfo(auth);

		JSONObject jsonObject = new JSONObject((Map) dataFromSession);
	
		Integer areaId = Integer.parseInt(((new JSONObject((Map) jsonObject.get("area"))).get("areaId")).toString());
		
		List<SubmitionData> submitionDatas = submitionDataRepository.findByIsLiveTrueAndQ3AreaId(areaId);
		Map<String, Object> detailsMap = new LinkedHashMap<String, Object>();
		Collections.sort(headers, new Comparator<Object[]>() {

			@Override
			public int compare(Object[] o1, Object[] o2) {
				return o1[1].toString().split("_")[0].compareTo(o2[1].toString().split("_")[0]);
			}
		});
		
		
		
		Map<Integer, Map<String, String>> formColumnName = new LinkedHashMap<Integer, Map<String, String>>();
		
		Map<String, Object> prefetchedData = new LinkedHashMap<String, Object>();

		for (Object[] header : headers) {
			Map<String, String> formColumnMap = null;
			if (formColumnName.containsKey(Integer.parseInt(header[0].toString()))) {
				formColumnMap = formColumnName.get(Integer.parseInt(header[0].toString()));
			} else
				formColumnMap = new LinkedHashMap<String, String>();

			formColumnMap.put(header[2].toString(),
					header[3] == null ? header[1].toString() : header[1].toString() + "@" + header[3].toString());

			formColumnName.put(Integer.parseInt(header[0].toString()), formColumnMap);
		}
//		Map<String, Object> inmatesDetailsMap = new LinkedHashMap<String, Object>();
		List<String> tableHeaders = new ArrayList<String>();
		tableHeaders.add("SL");
		
		for (String tableHeader : formColumnName.get(1).values()) {
			
			tableHeaders.add(tableHeader.split("@")[0].split("_")[1]);
		}
		tableHeaders.add("Action");
		ArrayList<Object> dataArray = new ArrayList<Object>();
		
		int i = 1;
		for(SubmitionData sdata : submitionDatas) {
			
			prefetchedData = inspectForResponse(SubmitionData.class, sdata);
			
			Map<String, String> actionDetailsMap = new LinkedHashMap<String, String>();
			Map<String, Object> childData = new HashMap<String, Object>();
			List<Map<String, String>> actionDetails = new ArrayList<Map<String, String>>();
			
			for (String d : formColumnName.get(1).keySet()) {

				childData.put(formColumnName.get(1).get(d).split("@")[0].split("_")[1].trim(),
						prefetchedData.containsKey(d) ? prefetchedData.get(d).toString() : "N/A");
			}
			childData.put("id",sdata.getSubmitionId() );
			childData.put("SL",i++);
			actionDetailsMap.put("controlType", "button");
			actionDetailsMap.put("value", "");
			actionDetailsMap.put("type", "submit");
			actionDetailsMap.put("class", "btn btn-submit approved-edit");
			actionDetailsMap.put("tooltip", "Edit");
			actionDetailsMap.put("icon", "fa-edit");
			actionDetails.add(actionDetailsMap);
			childData.put("Action", actionDetails);
			
			dataArray.add(childData);
			
		}
		
		detailsMap.put("tableColumn", tableHeaders);
		detailsMap.put("tableData", dataArray);
		landingPageModel.setSubmissionDetailsMap(detailsMap);
		
		return landingPageModel;
	}


	@Override
	public String generatePDF(List<DataEntryQuestionModel> dataEntryModels, OAuth2Authentication auth,
			HttpServletResponse response, HttpServletRequest request) throws Exception {

		String uri = request.getRequestURI();
		String url = request.getRequestURL().toString();
		Font sectionBold = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD);
		Font smallBold = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font smallBoldWhite = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD, BaseColor.WHITE);
		Font dataFont = new Font(Font.FontFamily.HELVETICA, 10);
		BaseColor cellColor = WebColors.getRGBColor("#E8E3E2");
		BaseColor headerColor = WebColors.getRGBColor("#333a3b");
		final ObjectMapper mapper = new ObjectMapper();
//		dataEntryQuestionModels = new ArrayList<DataEntryQuestionModel>(dataEntryQuestionModelMap.values());

//		String ctxPath = request.getContextPath();

		url = url.replaceFirst(uri, "");

		Image formDataMainImage = null;
		int k = 0;


		Document document = new Document(PageSize.A4);
		// to be added
		String outputPath = this.instPath.resolve("Submission Data" + sdfFull.format(new java.util.Date()) + ".pdf")
				.toAbsolutePath().toString();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(outputPath));

		// setting Header Footer.PLS Refer to org.sdrc.scps.util.HeaderFooter
		HeaderFooterA4 headerFooter = new HeaderFooterA4(context,url);
		writer.setPageEvent(headerFooter);

		document.open();
		document.addAuthor(url);
		Paragraph blankSpace = new Paragraph();
		blankSpace.setAlignment(Element.ALIGN_CENTER);
		blankSpace.setSpacingAfter(10);
		Chunk blankSpaceChunk = new Chunk("          ");
		blankSpace.add(blankSpaceChunk);
		document.add(blankSpace);

		document.add(Chunk.NEWLINE);

		for (DataEntryQuestionModel dataEntryQuestionModel : dataEntryModels) {
			Paragraph p = new Paragraph(
					dataEntryQuestionModel.getSectionOrder() + " : " + dataEntryQuestionModel.getName(), sectionBold);

			p.setSpacingAfter(10);
			document.add(p);

			document.add(new LineSeparator());
//			document.add(Chunk.NEWLINE);
			for (QuestionModel questionModel : dataEntryQuestionModel.getQuestions()) {

				if (questionModel.getControlType().equals("id"))
					continue;

				if (!questionModel.getControlType().equals("multiSelect") && questionModel.getOptions() != null
						&& questionModel.getOptions().size() > 0 && questionModel.getValue() != null
						&& !questionModel.getValue().toString().trim().equals("")) {
					questionModel.setValue(questionModel.getOptions().stream()
							.filter(d -> d.getKey() == Integer.parseInt(questionModel.getValue().toString()))
							.findFirst().get().getValue());
				}

				if (questionModel.getControlType().equals("multiSelect") && questionModel.getValue() != null
						&& !questionModel.getValue().toString().trim().equals("")) {
					String valuesFromOptions = "";
					for (Integer id : (ArrayList<Integer>) questionModel.getValue()) {
						String option = questionModel.getOptions().stream().filter(d -> d.getKey() == id).findFirst()
								.get().getValue();
						if (valuesFromOptions == "") {
							valuesFromOptions = option;
						} else {
							valuesFromOptions += "," + option;
						}
					}
					questionModel.setValue(valuesFromOptions);
				}

				if (questionModel.getControlType().equals("file") && questionModel.getValue() != null
						&& !questionModel.getValue().toString().trim().equals("")) {

					String files = "";
					for (Object attachmentObject : (List<?>) questionModel.getValue()) {
						Attachment attachment = mapper.convertValue(attachmentObject, Attachment.class);
						if (files == "") {
							files = attachment.getOriginalName();
						} else {
							files += "," + attachment.getOriginalName();
						}

					}
					questionModel.setValue(files);
				}

				if (questionModel.getChildQuestionModels() != null
						&& questionModel.getControlType().equalsIgnoreCase("beginRepeat")) {

					if (questionModel.getLabel() != "") {
						Paragraph paragraph = new Paragraph(
								questionModel.getDependentCondition() != null ? "\t \t " + questionModel.getLabel()
										: questionModel.getLabel(),
								smallBold);
						paragraph.setSpacingAfter(10);
						document.add(paragraph);

					}
//				document.add(new LineSeparator());

					PdfPTable beginRepeatTable = new PdfPTable(questionModel.getChildQuestionModels().get(0).size());
					beginRepeatTable.setWidthPercentage(100f);
					beginRepeatTable.setHeaderRows(1);
					for (QuestionModel questionModel1 : questionModel.getChildQuestionModels().get(0)) {

						PdfPCell headerCell = new PdfPCell(new Paragraph(questionModel1.getLabel(), smallBoldWhite));
						headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
						headerCell.setBackgroundColor(headerColor);
						headerCell.setBorderColor(BaseColor.WHITE);
						beginRepeatTable.addCell(headerCell);
					}

					int i = 0;
					for (List<QuestionModel> questionModels : questionModel.getChildQuestionModels()) {

						for (QuestionModel questionModel1 : questionModels) {

							if (!questionModel1.getControlType().equals("multiSelect")
									&& questionModel1.getOptions() != null && questionModel1.getValue() != null
									&& !questionModel1.getValue().toString().trim().equals("")) {
								questionModel1.setValue(questionModel1.getOptions().stream().filter(
										d -> d.getKey() == Integer.parseInt(questionModel1.getValue().toString()))
										.findFirst().get().getValue());
							}

							if (questionModel1.getControlType().equals("multiSelect")
									&& questionModel1.getValue() != null
									&& !questionModel1.getValue().toString().trim().equals("")) {
								String valuesFromOptions = "";
								for (Integer id : Arrays.asList(questionModel1.getValue().toString().split(","))
										.stream().mapToInt(Integer::parseInt).toArray()) {
									String option = questionModel1.getOptions().stream().filter(d -> d.getKey() == id)
											.findFirst().get().getValue();
									if (valuesFromOptions == "") {
										valuesFromOptions = option;
									} else {
										valuesFromOptions += "," + option;
									}
								}
								questionModel1.setValue(valuesFromOptions);
							}

							if (questionModel1.getControlType().equals("file") && questionModel1.getValue() != null
									&& !questionModel1.getValue().toString().trim().equals("")) {

								String files = "";
								for (Object attachmentObject : (List<?>) questionModel1.getValue()) {
									Attachment attachment = mapper.convertValue(attachmentObject, Attachment.class);
									if (files == "") {
										files = attachment.getOriginalName();
									} else {
										files += "," + attachment.getOriginalName();
									}

								}

								questionModel1.setValue(files);
							}

							PdfPCell responseCell = new PdfPCell(new Paragraph(
									questionModel1.getValue() == null ? "" : questionModel1.getValue().toString(),
									dataFont));
							responseCell.setBorderColor(BaseColor.WHITE);
							responseCell.setHorizontalAlignment(Element.ALIGN_CENTER);
							if (i % 2 == 0) {
								responseCell.setBackgroundColor(cellColor);

							} else {
								responseCell.setBackgroundColor(BaseColor.LIGHT_GRAY);

							}
							responseCell.setBorderColor(BaseColor.WHITE);
							beginRepeatTable.addCell(responseCell);

						}

						i++;
					}

					document.add(beginRepeatTable);

				} else if (!questionModel.getControlType().equals("heading")
						&& questionModel.getChildQuestionModels() == null) {

					if (questionModel.getLabel() != "") {

//					PdfPTable responseTable = new PdfPTable(idModel.getKey()==Constants.CHILD_FORM && k==0?3:2);
						PdfPTable responseTable = new PdfPTable(2);
						float[] responseTableWidths;

//					if(idModel.getKey()==Constants.CHILD_FORM && k==0)
//						responseTableWidths = new float[] { 40f, 60f,60f };
//					else
						responseTableWidths = new float[] { 40f, 60f };
						responseTable.setWidths(responseTableWidths);

						responseTable.setWidthPercentage(100f);
						PdfPCell questionCell = new PdfPCell(new Paragraph(
								questionModel.getLabel() == null ? "" : questionModel.getLabel(), dataFont));
						questionCell.setBorderColor(BaseColor.WHITE);
						questionCell.setHorizontalAlignment(Element.ALIGN_LEFT);
						if (questionModel.getDependentCondition() != null) {
							questionCell.setIndent(10);
						}
						questionCell.setPaddingTop(10f);
						questionCell.setPaddingBottom(2f);
						responseTable.addCell(questionCell);

						PdfPCell responseCell = new PdfPCell();
						Chunk responeChunk = new Chunk();
						responeChunk
								.append(questionModel.getValue() != null ? "\t" + questionModel.getValue().toString()
										: "");
						responeChunk.setFont(dataFont);
						Paragraph paragraph = new Paragraph();
						paragraph.add(responeChunk);
						paragraph.setSpacingAfter(5f);
//					responseCell.setPhrase(paragraph);
						responseCell.setBorderColor(BaseColor.WHITE);
						responseCell.addElement(paragraph);
						responseCell.addElement(new DottedLineSeparator());

						responseCell.setHorizontalAlignment(Element.ALIGN_JUSTIFIED);
						if (questionModel.getDependentCondition() != null) {
							responseCell.setIndent(10);
						}

						responseCell.setPaddingTop(questionModel.getValue() != null ? 5f : 15f);
						responseCell.setPaddingBottom(2f);

						responseTable.addCell(responseCell);

						if (formDataMainImage != null && k == 0) {
//						responseCell = new PdfPCell();
//						formDataMainImage.scaleToFit(170, 400);
//						formDataMainImage.setIndentationLeft(document.getPageSize().getWidth()-220);
//						formDataMainImage.setAlignment(Image.ALIGN_RIGHT);
//						document.add(formDataMainImage);
//						responseCell.addElement(formDataMainImage);
//						responseCell.setBorderColor(BaseColor.WHITE);
//						responseCell.setRowspan(2);
//						responseTable.addCell(responseCell);
						}

						document.add(responseTable);

					}
				} else if (questionModel.getControlType().equals("heading")) {

					if (questionModel.getLabel() != "") {
						Paragraph paragraph = new Paragraph(
								questionModel.getDependentCondition() != null ? "\t \t " + questionModel.getLabel()
										: questionModel.getLabel(),
								smallBold);
						paragraph.setSpacingAfter(10);
						document.add(paragraph);
						document.add(new LineSeparator());

					}
				}
				k++;
			}
		}

//		document.setPageCount(1);
//		if(formDataMainImage!=null)
//		{
//			formDataMainImage.setAbsolutePosition(420, 600);
//			formDataMainImage.scaleToFit(170, 400);
//			formDataMainImage.setIndentationLeft(document.getPageSize().getWidth()-220);
//			formDataMainImage.
//			document.add(formDataMainImage);
//		}

		document.close();

		return outputPath;
	}


	@Override
	public String getSwachhagrahi(int sbmAreaId,int district) {
	
		List<Question> questions = questionRepository.findAll();
		int blockId = 0;
		int districtId = 0;
		if(sbmAreaId > 0) {
			Area sbmArea= areaRepository.findBySbmAreaId(new Integer(sbmAreaId));
		    blockId = sbmArea.getAreaId();
		}else if(sbmAreaId < 0){
			Area sbmDistrict= areaRepository.findBySbmAreaId(new Integer(district));
			districtId = sbmDistrict.getAreaId();
		}
		
		
		File fileWritten = null;
		String outputPath = "";
		try {
			List<SubmitionData> submissionDatas;
			if(sbmAreaId > 0)
				submissionDatas = submitionDataRepository.findByIsLiveTrueAndQ3AreaId(blockId);
			else if(sbmAreaId < 0)
				submissionDatas = submitionDataRepository.findByIsLiveTrueAndQ2AreaId(districtId);
			else
				submissionDatas = submitionDataRepository.findByIsLiveTrue();
//			String path = "C:\\Users\\SDRC_DEV\\Desktop\\img";
//			File file = new File(path);
//			if (!file.exists()) {
//				file.mkdirs();
//			}
			
			FileOutputStream outputStream;
			XSSFWorkbook workbook = new XSSFWorkbook();

			XSSFFont font = workbook.createFont();
			font.setBold(true);
			CellStyle style = workbook.createCellStyle();
			style.setFont(font);
			// Create a Sheet
				XSSFSheet sheet1 = workbook.createSheet("SwachhagrahiData");
				
				setValueInSheet(sheet1, questions, style,submissionDatas);
				
				// Write the output to a file
				fileWritten = File.createTempFile("report" + "_", ".xlsx");
				outputStream = new FileOutputStream(fileWritten);
				outputPath = fileWritten.getAbsolutePath();
				workbook.write(outputStream);
				workbook.close();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return outputPath;
	}
	
	
	private void setValueInSheet(XSSFSheet sheet, List<Question> questions,
			 CellStyle style,List<SubmitionData> dataRetrived) {
		int rowNum = 0;
		int colNum = 0;
		// Create a Row
		XSSFRow headerRow = sheet.createRow(rowNum++);
		Cell cell = headerRow.createCell(colNum);

		headerRow = sheet.createRow(0);

		int i = 0;
		cell = headerRow.createCell(i);
		cell.setCellValue("Si No.");
		cell.setCellStyle(style);
		//i++;

//		cell = headerRow.createCell(i);
//		cell.setCellValue("CCI Name");
//		cell.setCellStyle(style);
		i++;
		Map<String, Map<String, Object>> headerDataMap = new LinkedHashMap<String, Map<String, Object>>();
		for (Question question : questions) {

			if (!question.getControlType().equals("heading")
					&& !question.getControlType().contains("beginRepeat")
					&& question.getGroupId() == null) {
				cell = headerRow.createCell(i);
				cell.setCellValue(question.getQuestionName());
				cell.setCellStyle(style);
			}
			Map<String, Object> headerData = new LinkedHashMap<String, Object>();
			headerData.put("question", question);
			headerData.put("index", i);
			if (question.getControlType().equals("multiSelect")) {
				headerData.put("options", question
						.getQuestionOptionTypeMapping().getOptionType()
						.getOptions());
			}
			if (!question.getControlType().equals("heading")
					&& !question.getControlType().contains("beginRepeat")
					&& question.getGroupId() == null) {
				headerDataMap.put(question.getColumnn(), headerData);
			}
			if (!question.getControlType().equals("heading")
					&& !question.getControlType().contains("beginRepeat")
					&& question.getGroupId() == null)
				i++;
		}
		XSSFRow row;
		int siNo = 1;
		if (dataRetrived != null) {

			for (SubmitionData inmatesData : dataRetrived) {
				List<Attachment> attachments = inmatesData.getAttachment();
				row = sheet.createRow(rowNum++);
				cell = row.createCell(0);
				cell.setCellValue(siNo++);

				Map<String, Object> response = inspectForResponse(
						SubmitionData.class, inmatesData);

				for (String key : response.keySet()) {
					if (headerDataMap.containsKey(key)) {
						Question question = (Question) headerDataMap.get(key)
								.get("question");

						if (question.getControlType().equals("multiSelect")
								&& response.get(key).toString().trim() != "") {
							String valuesFromOptions = "";
							if(!response.get(key).toString().trim().equals(""))
							{	
							for (Integer id : Arrays
									.asList(response.get(key).toString()
											.split(",")).stream()
									.mapToInt(Integer::parseInt).toArray()) {
								@SuppressWarnings("unchecked")
								List<Options> options = (List<Options>) headerDataMap
										.get(key).get("options");
								String option = options.stream()
										.filter(d -> d.getOptionId() == id)
										.findFirst().get().getOptionName();
								if (valuesFromOptions == "") {
									valuesFromOptions = option;
								} else {
									valuesFromOptions += "," + option;
								}
							}
						}
							response.put(key, valuesFromOptions);
						}

						if (question.getControlType().equals("file")
								&& response.get(key).toString().trim() != "") {

							String files = "";
							for (Attachment attachment : attachments
									.stream()
									.filter(d -> d.getColumnName().equals(
											question.getColumnn()))
									.collect(Collectors.toList())) {
								if (files == "") {
									files = attachment.getOriginalName();
								} else {
									files += "," + attachment.getOriginalName();
								}

							}
							response.put(key, files);
						}

						cell = row.createCell(Integer.parseInt(headerDataMap
								.get(key).get("index").toString()));
						cell.setCellValue(response.get(key).toString());
					}
				}
			}
		}

		sheet.createFreezePane(0, 1);

	}
	
}
