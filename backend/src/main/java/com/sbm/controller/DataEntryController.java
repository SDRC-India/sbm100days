/**
 * 
 */
package com.sbm.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.sbm.domain.Attachment;
import com.sbm.model.DataEntryQuestionModel;
import com.sbm.model.LandingPageModel;
import com.sbm.model.QuestionModel;
import com.sbm.model.ResponseModel;
import com.sbm.repository.AttachmentRepository;
import com.sbm.service.DataEntryService;

/**
 * @author RajaniKanta(rajanikanta@sdrc.co.in)
 *
 */
@Controller
public class DataEntryController {
	
	@Autowired
	private DataEntryService dataEntryService;
	
	@Autowired
	private AttachmentRepository attachmentRepository;

	@PreAuthorize("hasAuthority('dataentry_HAVING_write')")
	@GetMapping("getQuestion")
	ResponseEntity<List<DataEntryQuestionModel>> getQuestion(
			int formId,
			OAuth2Authentication auth,
			@RequestParam(name = "submissioId", required = false) Integer submissioId) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(
					dataEntryService.getQuestion(formId, auth, submissioId));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(null);
		}

	}
	
	@PreAuthorize("hasAuthority('dataentry_HAVING_write')")
	@PostMapping("uploadFile")
	public ResponseEntity<Attachment> handleFileUpload(
			@RequestParam("file") MultipartFile file,
			@RequestParam("formId") int formId,
			@RequestParam("columnName") String columnName) {

		try {
			return ResponseEntity.status(HttpStatus.OK).body(
					dataEntryService.uploadFile(file, formId, columnName));

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
					null);
		}
	}
	
	@PreAuthorize("hasAuthority('dataentry_HAVING_write')")
	@PostMapping("submitData")
	ResponseEntity<ResponseModel> saveSubmitData(
			@RequestBody List<QuestionModel> questionModels,
			OAuth2Authentication auth) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(
					dataEntryService.saveSubmitData(questionModels,
							auth));

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(null);
		}
	}
	
	@PreAuthorize("hasAuthority('dataentry_HAVING_write')")
	@GetMapping("getLandingData")
	ResponseEntity<LandingPageModel> getLandingData(OAuth2Authentication auth) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(
					dataEntryService.getLandingPageData(auth));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(null);
		}

	}

	
	@PreAuthorize("hasAuthority('dataentry_HAVING_write')")
	@PostMapping("exportSubmissionToPDF")
	ResponseEntity<InputStreamResource> getViewData(@RequestBody List<DataEntryQuestionModel> dataEntryModels, OAuth2Authentication auth, HttpServletResponse response,
			HttpServletRequest request) {
		String filePath="";
		try {
			 filePath = dataEntryService.generatePDF(dataEntryModels, auth, response, request);
			File file = new File(filePath);

			HttpHeaders respHeaders = new HttpHeaders();
			respHeaders.add("Content-Disposition", "attachment; filename=" + file.getName());
			InputStreamResource isr = new InputStreamResource(new FileInputStream(file));
			
			new File(filePath).delete();
			return new ResponseEntity<InputStreamResource>(isr, respHeaders, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}


	}
	
	
//	@PreAuthorize("hasAuthority('dataentry_HAVING_write')")
	@PostMapping("getSwachhagrahi")
	ResponseEntity<InputStreamResource> getSwachhagrahi(@RequestBody Integer[] args) {
		String filePath="";
		try {
			//System.out.println(blockId);
			int blockId = args[0];
			int districtId = args[1];
			filePath = dataEntryService.getSwachhagrahi(blockId,districtId);
			File file = new File(filePath);
			
			HttpHeaders respHeaders = new HttpHeaders();
			respHeaders.add("Content-Disposition", "attachment; filename=" + file.getName());
			InputStreamResource isr = new InputStreamResource(new FileInputStream(file));
			
			new File(filePath).delete();
			return new ResponseEntity<InputStreamResource>(isr, respHeaders, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(null);
		}

	}
	
	


	@GetMapping(value = "bypass/doc")
	public void downLoad(@RequestParam("fileId") long fileId, HttpServletResponse response) throws IOException {

		InputStream inputStream;
		String fileName = attachmentRepository.findByAttachmentId(fileId).getFilePath();
		try {
			fileName = fileName.trim().replaceAll("%3A", ":").replaceAll("%2F", "/").replaceAll("%5C", "/")
					.replaceAll("%2C", ",").replaceAll("\\\\", "/").replaceAll("\\+", " ").replaceAll("%22", "")
					.replaceAll("%3F", "?").replaceAll("%3D", "=");
			inputStream = new FileInputStream(fileName);
			String headerKey = "Content-Disposition";
			String headerValue = "";
			 String type = new java.io.File(fileName).getName().split("\\.")[new java.io.File(fileName).getName().split("\\.").length-1];
			{
				headerValue = String.format("inline; filename=\"%s\"", new java.io.File(fileName).getName());
				if(type.equalsIgnoreCase("pdf"))
				response.setContentType("application/pdf"); // for all file
				else
					response.setContentType("image/jpeg");
			}
			response.setHeader(headerKey, headerValue);

			ServletOutputStream outputStream = response.getOutputStream();
			FileCopyUtils.copy(inputStream, outputStream);
			inputStream.close();
			outputStream.flush();
			outputStream.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
}
