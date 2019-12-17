package com.sbm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sbm.service.StateDataUploadService;
import com.sbm.service.WaterIndicatorService;

@RestController
public class WaterIndicatorController {
	
	@Autowired
	private WaterIndicatorService waterIndicatorService;
	@Autowired
	private StateDataUploadService stateDataUploadService;

	@RequestMapping("/insert")
	@ResponseBody
	public String insertWaterIndicator() throws Exception {
		
		waterIndicatorService.insertDataIntoDB();
		
		return "success";
	}
	
	@RequestMapping("/uploadstatedata")
	@ResponseBody
	public String uploaddata() {
		
		stateDataUploadService.pushDataintoDB();
		
		return "success";
	}
	
	
	@RequestMapping("/uploaddistdata")
	@ResponseBody
	public String uploaddistdata() {
		
		stateDataUploadService.pushDistrictDataintoDB();
		
		return "success";
	}

}
