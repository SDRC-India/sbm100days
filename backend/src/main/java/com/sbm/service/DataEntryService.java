package com.sbm.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sbm.model.DataEntryQuestionModel;
import com.sbm.model.LandingPageModel;
import com.sbm.domain.Attachment;
import com.sbm.model.QuestionModel;
import com.sbm.model.ResponseModel;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.multipart.MultipartFile;

public interface DataEntryService {

	public List<DataEntryQuestionModel> getQuestion(int formId, OAuth2Authentication auth, Integer submissioId)throws Exception;
	
	/**
	 * 
	 * @param questionModel
	 * @param auth
	 * @return
	 */
	
	public ResponseModel saveSubmitData(List<QuestionModel> questionModel,OAuth2Authentication auth);
	
	/**
	 * This method will upload the file
	 * @param file
	 * @param columnName 
	 * @return
	 * @throws Exception
	 */
	public Attachment uploadFile(MultipartFile file,int formId, String columnName) throws Exception;

	
	public LandingPageModel getLandingPageData(OAuth2Authentication auth);
	
	
	public String generatePDF(List<DataEntryQuestionModel> dataEntryModels, OAuth2Authentication auth,
			HttpServletResponse response, HttpServletRequest request)  throws Exception;
	
	public String getSwachhagrahi(int blockId,int districtId);
}
