package com.sbm.service;

import java.io.File;
import java.io.FileInputStream;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.sbm.domain.AreaLevel;
import com.sbm.domain.FormatA03;
import com.sbm.repository.AreaLevelRepository;
import com.sbm.repository.FormatAO3Repository;

@Service
public class ReadingExcelServiceImpl implements ReadingExcelService {

	@Value("${formA03.template}")
	private String formA03Filepath;
	
	@Value("${formA03block.template}")
	private String formA03BlockFilePath;
	
	@Value("${formA03gp.template}")
	private String formA03GpFilePath;
	
	@Autowired
	private ServletContext context;
	
	@Autowired
	private FormatAO3Repository formAO3DataReposotory;
	
	@Autowired
	private AreaLevelRepository areaLevelRepository;
	
	@Override
	public void readAndSaveExcelOfFormF03() 
	{
		List<AreaLevel> areaLevelList=areaLevelRepository.findAll();
        Map<String, Integer> areaLevelMap=new HashMap<String, Integer>();
        Iterator<AreaLevel> iterator=areaLevelList.iterator();
        while(iterator.hasNext())
        {
        	AreaLevel areaLevel=iterator.next();
        	areaLevelMap.put(areaLevel.getAreaLevelName(),areaLevel.getAreaLevelId());
        }
		File file = new File(
				context.getRealPath(formA03GpFilePath));
		XSSFWorkbook workbook=null;
		XSSFSheet sheet=null;
      	workbook=getWorkBook(file.getAbsolutePath());
      	sheet = workbook.getSheetAt(0);
      	List<FormatA03> dataDomains = new ArrayList<FormatA03>();
      	DataFormatter formatter = new DataFormatter();
      	String area = null;
      	String areaCell="";
      	String stateName=null;
		String districtName=null;
		String blockName=null;
      	for(int rowNumber =6;rowNumber <sheet.getLastRowNum()-1;rowNumber ++)
      	{
      		XSSFRow row = sheet.getRow(rowNumber);
      		FormatA03 dataDomain = new FormatA03();
      		if (rowNumber == 6) 
      		{
      			for(int i =0;i <=row.getLastCellNum();i++)
          		{
      				if(sheet.getRow(rowNumber).getCell(i)!=null)
      				areaCell=areaCell+sheet.getRow(rowNumber).getCell(i);
          		}
				if (!areaCell.contains("District") && !areaCell.contains("Block"))
				{
					area = "districts";
					stateName=areaCell.split(":-")[0];
				}
				else if (areaCell.contains("State") && areaCell.contains("District")
						&& !areaCell.contains("Block"))
				{
					area = "blocks";
					stateName=areaCell.split(":-")[0];
					districtName=areaCell.split(":-")[1];
				}
				else if (areaCell.contains("State") && areaCell.contains("District")
						&& areaCell.contains("Block"))
				{
					area = "gps";
					stateName=areaCell.split(":-")[0];
					districtName=areaCell.split(":-")[1];
					blockName=areaCell.split(":-")[2];
				}
			}
      		
      		for(int columnNumber =1;columnNumber <=row.getLastCellNum();columnNumber ++)
      		{
      			
      			  XSSFCell cell = row.getCell(columnNumber);
      			
      			   if(rowNumber>6&&"districts".equalsIgnoreCase(area))
      			   {
      	             // System.out.println("*******"+columnNumber+"******** "+cell);
      	           // System.out.println("area is " + area);
      	             switch (columnNumber) {
					case 1:
						dataDomain.setAreaLevelId(areaLevelMap.get("District"));
						dataDomain.setDistrictName(formatter.formatCellValue(cell));
						dataDomain.setStateName(stateName);
						break;
					case 2:
						dataDomain.setDetailsWithOrWithoutToilet(Integer.valueOf(formatter.formatCellValue(cell)));
						break;
					case 3:
						dataDomain.setHhDetailsWithToilet(Integer.valueOf(formatter.formatCellValue(cell)));
						break;
					case 4:
						dataDomain.setBplNotHavingToilet(Integer.valueOf(formatter.formatCellValue(cell)));
						break;
					case 5:
						dataDomain.setIdentifiedAplNotHavingToilet(Integer.valueOf(formatter.formatCellValue(cell)));
						break;
					case 6:
						dataDomain.setUnidentifiedAplNotHavingToilet(Integer.valueOf(formatter.formatCellValue(cell)));
						break;
					case 7:
						dataDomain.setTotalAplNotHavingToilet(Integer.valueOf(formatter.formatCellValue(cell)));
						break;
					case 8:
						dataDomain.setTotalBplAplNotHavingToilet(Integer.valueOf(formatter.formatCellValue(cell)));
						break;
					case 9:
						dataDomain.setTotalHHIdentifiedNotHavingToilet(Integer.valueOf(formatter.formatCellValue(cell)));
						break;

					case 10:
						dataDomain.setCoverageHH1314Reported(Integer.valueOf(formatter.formatCellValue(cell)));
						break;

					case 11:
						dataDomain.setCoverage1314OutOfHHEntered(Integer.valueOf(formatter.formatCellValue(cell)));
						break;

					case 12:
						dataDomain.setCoverageHHDistrictWise1314(Integer.valueOf(formatter.formatCellValue(cell)));
						break;

					case 13:
						dataDomain.setCoverageHH1415(Integer.valueOf(formatter.formatCellValue(cell)));
						break;
					case 14:
						dataDomain.setCoverageHH1516(Integer.valueOf(formatter.formatCellValue(cell)));
						break;
					case 15:
						dataDomain.setCoverageHH1617(Integer.valueOf(formatter.formatCellValue(cell)));
						break;
					case 16:
						dataDomain.setCoverageHH1718(Integer.valueOf(formatter.formatCellValue(cell)));
						break;
					case 17:
						dataDomain.setCoverageHH1819(Integer.valueOf(formatter.formatCellValue(cell)));
						break;
					case 18:
						dataDomain.setCoverageHHCommunityOtherToilet(Integer.valueOf(formatter.formatCellValue(cell)));
						break;
					case 19:
						dataDomain.setCoverageHHAfterBLS(Integer.valueOf(formatter.formatCellValue(cell)));
						break;
					case 20:
						dataDomain.setCoverageHHIncludingBLS(Integer.valueOf(formatter.formatCellValue(cell)));
						break;
					case 21:
						dataDomain.setCoverageHHBalanceUncovered(Integer.valueOf(formatter.formatCellValue(cell)));
						break;
					case 22:
						dataDomain.setIhhlCoveragePercent(Double.valueOf(formatter.formatCellValue(cell)));
						break;

					}
      			   }
      			   else if(rowNumber>6&&("blocks".equalsIgnoreCase(area) || "gps".equalsIgnoreCase(area)))
      			   {
      				 switch (columnNumber) {
						
						case 1:
							if (area.equalsIgnoreCase("blocks"))
							{
								dataDomain.setAreaLevelId(areaLevelMap.get("Block"));
								dataDomain.setBlockName(formatter.formatCellValue(cell));
								dataDomain.setDistrictName(districtName);
								dataDomain.setStateName(stateName);
							}
							else if (area.equalsIgnoreCase("gps"))
							{
								dataDomain.setAreaLevelId(areaLevelMap.get("Gram Panchyat"));
								dataDomain.setGpName(formatter.formatCellValue(cell));
								dataDomain.setBlockName(blockName);
								dataDomain.setDistrictName(districtName);
								dataDomain.setStateName(stateName);
							}
							break;
						case 2:
							dataDomain.setDetailsWithOrWithoutToilet(Integer.valueOf(formatter.formatCellValue(cell)));
							break;
						case 3:
							dataDomain.setHhDetailsWithToilet(Integer.valueOf(formatter.formatCellValue(cell)));
							break;
						case 4:
							dataDomain.setBplNotHavingToilet(Integer.valueOf(formatter.formatCellValue(cell)));
							break;
						case 5:
							dataDomain.setIdentifiedAplNotHavingToilet(Integer.valueOf(formatter.formatCellValue(cell)));
							break;
						case 6:
							dataDomain.setUnidentifiedAplNotHavingToilet(Integer.valueOf(formatter.formatCellValue(cell)));
							break;
						case 7:
							dataDomain.setTotalAplNotHavingToilet(Integer.valueOf(formatter.formatCellValue(cell)));
							break;
						case 8:
							dataDomain.setTotalBplAplNotHavingToilet(Integer.valueOf(formatter.formatCellValue(cell)));
							break;
						case 9:
							dataDomain.setTotalHHIdentifiedNotHavingToilet(Integer.valueOf(formatter.formatCellValue(cell)));
							break;

						case 10:
							dataDomain.setCoverage1314HHEntered(Integer.valueOf(formatter.formatCellValue(cell)));
							break;

						case 11:
							dataDomain.setCoverageHH1415(Integer.valueOf(formatter.formatCellValue(cell)));
							break;
						case 12:
							dataDomain.setCoverageHH1516(Integer.valueOf(formatter.formatCellValue(cell)));
							break;
						case 13:
							dataDomain.setCoverageHH1617(Integer.valueOf(formatter.formatCellValue(cell)));
							break;
						case 14:
							dataDomain.setCoverageHH1718(Integer.valueOf(formatter.formatCellValue(cell)));
							break;
						case 15:
							dataDomain.setCoverageHH1819(Integer.valueOf(formatter.formatCellValue(cell)));
							break;
						case 16:
							dataDomain.setCoverageHHCommunityOtherToilet(Integer.valueOf(formatter.formatCellValue(cell)));
							break;
						case 17:
							dataDomain.setCoverageHHAfterBLS(Integer.valueOf(formatter.formatCellValue(cell)));
							break;
						case 18:
							dataDomain.setCoverageHHIncludingBLS(Integer.valueOf(formatter.formatCellValue(cell)));
							break;
						case 19:
							dataDomain.setCoverageHHBalanceUncovered(Integer.valueOf(formatter.formatCellValue(cell)));
							break;
						case 20:
							dataDomain.setIhhlCoveragePercent(Double.valueOf(formatter.formatCellValue(cell)));
							break;

						}
      			   }
      			   
      		}
      		if(rowNumber>6)
  			{
  				double balanceUncoveredPercent = dataDomain.getDetailsWithOrWithoutToilet().intValue()==0?0:(double) (dataDomain.getCoverageHHBalanceUncovered() * 100)
						/ dataDomain.getDetailsWithOrWithoutToilet();
				DecimalFormat df = new DecimalFormat("0.00");
				df.format(balanceUncoveredPercent);
				dataDomain.setCoverageHHBalanceUncoveredPercent(Double.parseDouble(df.format(balanceUncoveredPercent)));
  			  dataDomains.add(dataDomain);
  			}
      	}
      	formAO3DataReposotory.save(dataDomains);

	}
	
	public static XSSFWorkbook getWorkBook(String myFileName)
    {
		XSSFWorkbook workbook = null;
        try {
            String extension = myFileName.substring(myFileName.lastIndexOf("."));
            if(extension.equalsIgnoreCase(".xlsx")){
                workbook = new XSSFWorkbook(new FileInputStream(myFileName));
            }
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
        }
        return workbook;
    }

}
