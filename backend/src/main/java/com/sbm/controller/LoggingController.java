/**
 * 
 */
package com.sbm.controller;

/**
 * @author Ashutosh Dang(ashutosh@sdrc.co.in)
 * Created Date :  04-Jan-2019 4:20:37 PM
 */
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@PreAuthorize("hasRole('logview_HAVING_read')")
public class LoggingController {
	
	@Autowired
	ServletContext servletContext;
	
	@Value("${loggingDirectory}")
	public String directory;
	
	@GetMapping(path = "/logs/{serviceName}/{date}")
	@PreAuthorize("hasAuthority('usermgmt_HAVING_write')")
	public ResponseEntity<String> downloadLogfile(HttpServletResponse resonse, @PathVariable String serviceName,
			@PathVariable String date) throws IOException {

		// read directory from the properties file
		String fileN = directory + serviceName + "." + date + ".log";
		// "E:/kspmislogs/"
		String mineType = servletContext.getMimeType(fileN);
		MediaType mediaType;
		try {
			mediaType = MediaType.parseMediaType(mineType);
		} catch (Exception e) {
			mediaType = MediaType.ALL;
		}
		File file = new File("/" + fileN);

		/*
		 * Content-Type
		 * application/pdf
		 */
		if (file.exists()) {
			//resonse.setContentType(mediaType.getType());
			resonse.setContentType(mediaType.getType()+"/"+mediaType.getSubtype());
			/*
			 * Content-Disposition if not provided the logs will be rendered on
			 * the browser
			 */
			resonse.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName());

			// Content-Length
			resonse.setContentLength((int) file.length());

			BufferedInputStream inStream = new BufferedInputStream(new FileInputStream(file));
			BufferedOutputStream outStream = new BufferedOutputStream(resonse.getOutputStream());

			byte[] buffer = new byte[1024];
			int bytesRead = 0;
			while ((bytesRead = inStream.read(buffer)) != -1) {
				outStream.write(buffer, 0, bytesRead);
			}
			outStream.flush();
			inStream.close();
			return new ResponseEntity<String>("Log File found", HttpStatus.OK);

		} else {
			return new ResponseEntity<String>("No Log File found for this date", HttpStatus.OK);
		}
	}
	
}