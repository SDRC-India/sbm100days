package com.sbm.service;

import java.io.File;
import java.io.FileInputStream;
import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletContext;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.sbm.domain.FormatF42District;
import com.sbm.domain.FormatF42State;
import com.sbm.repository.FormatF42DistrictRepository;
import com.sbm.repository.FormatF42StateRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class StateDataUploadServiceImpl implements StateDataUploadService{

	
	@Autowired
	private ServletContext context;
//	@Autowired
//	private ResourceBundleMessageSource messageSourceNotification;
	@Autowired
	private FormatF42StateRepository formatF42StateRepository;
	@Autowired
	private FormatF42DistrictRepository formatF42DistrictRepository;
	
	
	@Value("${statedata.upload.template}")
	private String statedataTemplateFilepath;
	
	@Value("${districtdata.upload.template}")
	private String districtdataTemplateFilepath;
	
	
	@Override
	public void pushDataintoDB() {
		File file = new File(
				context.getRealPath(statedataTemplateFilepath));
		List<FormatF42State> formatF42StateList = new ArrayList<>();
		try {
		FileInputStream excelfile = new FileInputStream(file);
		HSSFWorkbook workbook = new HSSFWorkbook(excelfile);
		HSSFSheet sheet = workbook.getSheetAt(0);
        for (int i = 7; i < sheet.getLastRowNum()-3; i++) { // row
        	int j=0;// column
        //check for blankspace	
        	if(sheet.getRow(i).getCell(j).getCellType()!= CellType.BLANK) {
        		FormatF42State formatF42State=new FormatF42State();
        	    formatF42State.setAreaName(sheet.getRow(i).getCell(++j).getStringCellValue());
        		formatF42State.setBlockTotal((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setBlockDeclaredOdf((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setBlockVarifiedOdf((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setGpTotal((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setGpDeclaredOdf((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setGpVarifiedOdf((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setVillageTotal((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setVillageNotExist((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setVillageDeclaredOdf1516((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setVillageDeclaredOdf1617((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setVillageDeclaredOdf1718((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setVillageDeclaredOdf1819((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setVillageDeclaredOdfTotal((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setVillageVerifiedOdf1516((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setVillageVerifiedOdf1617((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setVillageVerifiedOdf1718((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setVillageVerifiedOdf1819((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setVillageVerifiedOdfTotal((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setVillageNotDeclaredOdf((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setVillageNotVarifiedOdf((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setVerifiedOdfSecondLevel((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42State.setStateId(18);
        		formatF42State.setCreatedDate(new Timestamp(new Date().getTime()));
//        		formatF42State.setDistrictId
        		Double vdodf = getPercentage((double)formatF42State.getVillageDeclaredOdfTotal().intValue(),
						(double)formatF42State.getVillageTotal().intValue());
        		formatF42State.setVillageDeclaredOdfPercentage(vdodf);
        		Double vvodf = getPercentage((double)formatF42State.getVillageVerifiedOdfTotal().intValue(),
						(double)formatF42State.getVillageDeclaredOdfTotal());
        		formatF42State.setVillageVerifiedOdfPercentage(vvodf);
        		formatF42StateList.add(formatF42State);	
        	}
        	}
    	formatF42StateRepository.save(formatF42StateList);
		workbook.close();
		} catch (Exception e) {
			log.error("Action : while inserting data in db : ",e);
			throw new RuntimeException(e);
		}
		
	}

	
	@Override
	public void pushDistrictDataintoDB() {
		File file = new File(
				context.getRealPath(districtdataTemplateFilepath));
		List<FormatF42District> formatF42distList = new ArrayList<>();
		try {
		FileInputStream excelfile = new FileInputStream(file);
		HSSFWorkbook workbook = new HSSFWorkbook(excelfile);
		HSSFSheet sheet = workbook.getSheetAt(0);
        for (int i = 7; i < sheet.getLastRowNum()-3; i++) { // row
        	int j=0;// column
        //check for blankspace	
        	if(sheet.getRow(i).getCell(j).getCellType()!= CellType.BLANK) {
        		FormatF42District formatF42District=new FormatF42District();
        		formatF42District.setBlockName(sheet.getRow(i).getCell(++j).getStringCellValue());
//        		formatF42District.setBlockTotal((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
//        		formatF42District.setBlockDeclaredOdf((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
//        		formatF42District.setBlockVarifiedOdf((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42District.setGpTotal((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42District.setGpDeclaredOdf((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42District.setGpVerifiedOdf((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42District.setGpNotDeclaredOdf((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42District.setVillageTotal((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42District.setVillageNotExist((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42District.setVillageDeclaredOdf1516((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42District.setVillageDeclaredOdf1617((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42District.setVillageDeclaredOdf1718((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42District.setVillageDeclaredOdf1819((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42District.setVillageDeclaredOdfTotal((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42District.setVillageVerifiedOdf1516((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42District.setVillageVerifiedOdf1617((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42District.setVillageVerifiedOdf1718((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42District.setVillageVerifiedOdf1819((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42District.setVillageVerifiedOdfTotal((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42District.setVillageNotDeclaredOdf((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42District.setVillageNotVerifiedOdf((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
        		formatF42District.setVerifiedOdfSecondLevel((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
//        		formatF42District.setDistrictId();
        		formatF42District.setCreatedDate(new Timestamp(new Date().getTime()));
//        		formatF42DistrictData.setBlockId(Integer.valueOf(blockID));
        		Double vdodf = getPercentage((double)formatF42District.getVillageDeclaredOdfTotal().intValue(),
						(double)formatF42District.getVillageTotal().intValue());
        		formatF42District.setVillageDeclaredOdfPercentage(vdodf);
        		Double vvodf = getPercentage((double)formatF42District.getVillageVerifiedOdfTotal().intValue(),
						(double)formatF42District.getVillageDeclaredOdfTotal().intValue());
        		formatF42District.setVillageVerifiedOdfPercentage(vvodf);
        		formatF42distList.add(formatF42District);	
        	}
        	}
        formatF42DistrictRepository.save(formatF42distList);
		workbook.close();
		} catch (Exception e) {
			log.error("Action : while inserting data in db : ",e);
			throw new RuntimeException(e);
		}
		
	}
	
	
	private Double getPercentage(double intValue, double intValue2) {
		double value = intValue2==0 ? 0 : ((double)(intValue/(double)intValue2))*100;
		return Double.parseDouble(new DecimalFormat("##.##").format(value));
	}
	}


