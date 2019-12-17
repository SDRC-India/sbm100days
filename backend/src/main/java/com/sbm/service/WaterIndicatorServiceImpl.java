package com.sbm.service;

import java.io.File;
import java.io.FileInputStream;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.ServletContext;

import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Service;

import com.sbm.domain.Area;
import com.sbm.domain.WaterIndicator;
import com.sbm.repository.AreaLevelRepository;
import com.sbm.repository.AreaRepository;
import com.sbm.repository.WaterIndicatorRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class WaterIndicatorServiceImpl implements WaterIndicatorService{
	
	@Autowired
	private ServletContext context;
	@Autowired
	private ResourceBundleMessageSource messageSourceNotification;
	@Autowired
	private WaterIndicatorRepository waterIndicatorRepository;
	
	@Value("${waterindicator.template}")
	private String waterindicatorFilepath;
	
	@Autowired
	private AreaLevelRepository areaLevelRepository;
	
	@Autowired
	private AreaRepository areaRepository;
	
	@Override
//	@Transactional
	public void insertDataIntoDB() {
		
		
		
		File file = new File(
				context.getRealPath(waterindicatorFilepath));
		
//		Field field;
		List<WaterIndicator> waterIndicatorList = new ArrayList<>();
		try {
		FileInputStream excelfile = new FileInputStream(file);
		XSSFWorkbook workbook = new XSSFWorkbook(excelfile);
		XSSFSheet sheet = workbook.getSheetAt(0);
		
		List<Area> areaList1=areaRepository.findAll();
		
		Map<String,Integer> districtIdMap=areaList1.stream().filter(v->v.getAreaLevel().getAreaLevelId()==3).collect(Collectors.toMap(v->v.getAreaName().toLowerCase(),Area::getSbmAreaId));
		Map<Integer,String> districtIdNameMap=areaList1.stream().filter(v->v.getAreaLevel().getAreaLevelId()==3).collect(Collectors.toMap( Area::getSbmAreaId,Area::getAreaName));
		
		List<Object[]> areaList=areaRepository.findDistBlockDetails();
		
		Map<String, String> blockMap = new HashMap<>();
		
		for (Object[] objects : areaList) {
			blockMap.put(districtIdNameMap.get((Integer)objects[2]).toLowerCase()+"_"+((String)objects[0]).toLowerCase(), (Integer)objects[1]+"_"+(Integer)objects[3]);
		}
		
		
		//row
			for (int i = 2; i < sheet.getLastRowNum() - 39; i++) {
				WaterIndicator waterIndicator=new WaterIndicator();
				
				int j = 2;
				// column
				for (j = 2; j <= 14; j++) {

					if( sheet.getRow(i).getCell(j).getCellType()!= CellType.BLANK ) {
						String dsitrictName = sheet.getRow(i).getCell(j).getStringCellValue();
			    		waterIndicator.setNameOfTheDistrict(dsitrictName.toLowerCase());
			    		waterIndicator.setDivision(sheet.getRow(i).getCell(++j).getStringCellValue());
			    		String blockName = sheet.getRow(i).getCell(++j).getStringCellValue();
			    		waterIndicator.setBlock(blockName.toLowerCase());
			    		waterIndicator.setNoOfGPHQs((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
			    		waterIndicator.setSourceSanctioned((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
			    		waterIndicator.setSourceNotDone((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
			    		waterIndicator.setDprNotSubmitted((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
			    		waterIndicator.setPwsSanctioned((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
			    		waterIndicator.setTenderingNotDone((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
			    		waterIndicator.setWorkorderNotIssued((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
			    		waterIndicator.setNotCompleted((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
			    		waterIndicator.setSecondndVillageSourceSanctioned((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
			    		waterIndicator.setNotDone((int)sheet.getRow(i).getCell(++j).getNumericCellValue());
			    		waterIndicator.setCreatedDate(new Timestamp(new Date().getTime()));
			    		waterIndicator.setBlockId(Integer.valueOf((blockMap.get(dsitrictName.toLowerCase()+"_"+blockName.toLowerCase()).split("_")[0])));
			    		waterIndicator.setDistrictId(districtIdMap.get(dsitrictName.toLowerCase()));
			    		waterIndicator.setAreaLevelId(Integer.valueOf((blockMap.get(dsitrictName.toLowerCase()+"_"+blockName.toLowerCase())).split("_")[1]));
			    	}
					
					}
					
					waterIndicatorList.add(waterIndicator);
					//System.out.println(field.getName());
				}

			
        waterIndicatorRepository.save(waterIndicatorList);
        
		workbook.close();
		
		
		
		waterIndicatorList = new ArrayList<>();
		waterIndicatorRepository.aggregateDataState();
		
		waterIndicatorRepository.aggregateDataDitrict();
				
		
		} catch (Exception e) {
			log.error("Action : while inserting data in db : ",e);
			throw new RuntimeException(e);
		}
		
//		save aggregate data Odisha
/*		insert into water_indicator(dpr_not_submitted, 
			       no_of_gphqs, not_completed, not_done, pws_sanctioned, second_village_source_sanctioned, 
			       source_not_done, source_sanctioned, tendering_not_done, workorder_not_issued)
			SELECT sum(dpr_not_submitted), sum(no_of_gphqs), sum(not_completed),sum(not_done),sum(pws_sanctioned),
			sum(second_village_source_sanctioned),sum(source_not_done),sum(source_sanctioned),sum(tendering_not_done),sum(workorder_not_issued)
			  FROM public.water_indicator;

		save aggregate data district wise
			insert into water_indicator(name_of_the_district, dpr_not_submitted, 
			       no_of_gphqs, not_completed, not_done, pws_sanctioned, second_village_source_sanctioned, 
			       source_not_done, source_sanctioned, tendering_not_done, workorder_not_issued)
			SELECT name_of_the_district, sum(dpr_not_submitted), sum(no_of_gphqs), sum(not_completed),sum(not_done),sum(pws_sanctioned),
			sum(second_village_source_sanctioned),sum(source_not_done),sum(source_sanctioned),sum(tendering_not_done),sum(workorder_not_issued)
			  FROM public.water_indicator where name_of_the_district<>'' group by name_of_the_district order by name_of_the_district;*/

		
	}

	
}
