package com.sbm.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.sbm.domain.WaterIndicator;

public interface WaterIndicatorRepository extends JpaRepository<WaterIndicator,Integer>{

	/**
	 * 
	 * 
	 */
	@Transactional
    @Modifying
	@Query(value="insert into water_indicator( created_date,area_level_id, dpr_not_submitted, " + 
			"no_of_gphqs, not_completed, not_done, pws_sanctioned, second_village_source_sanctioned, " + 
			"source_not_done, source_sanctioned, tendering_not_done, workorder_not_issued)" + 
			"SELECT now(), 2,sum(dpr_not_submitted), sum(no_of_gphqs), sum(not_completed),sum(not_done),sum(pws_sanctioned)," + 
			"sum(second_village_source_sanctioned),sum(source_not_done),sum(source_sanctioned),sum(tendering_not_done),sum(workorder_not_issued)" + 
			"FROM public.water_indicator",nativeQuery=true)
	void aggregateDataState();

	/**
	 * 
	 */
	@Transactional
    @Modifying
    @Query(value="insert into water_indicator(name_of_the_district,area_level_id, created_date, district_id, dpr_not_submitted, " + 
    		"no_of_gphqs, not_completed, not_done, pws_sanctioned, second_village_source_sanctioned, " + 
    		"source_not_done, source_sanctioned, tendering_not_done, workorder_not_issued)" + 
    		"SELECT name_of_the_district, 3,now(),district_id, sum(dpr_not_submitted)as dpr_not_submitted, sum(no_of_gphqs), sum(not_completed),sum(not_done),sum(pws_sanctioned)," + 
    		"sum(second_village_source_sanctioned),sum(source_not_done),sum(source_sanctioned),sum(tendering_not_done),sum(workorder_not_issued)" + 
    		"FROM public.water_indicator where name_of_the_district<>'' group by name_of_the_district,district_id order by name_of_the_district;",nativeQuery=true)
	void aggregateDataDitrict();
	
	
	@Transactional
    @Modifying
    @Query(value="SELECT x.* FROM( SELECT ROW_NUMBER() OVER (PARTITION BY block_id,district_id ORDER BY created_date DESC) AS r, t.* FROM water_indicator t) x  WHERE x.r <= 1;",nativeQuery=true)
	List<WaterIndicator> findLastDateData();
	

//	@Transactional
//	Iterable<NGOSoEUploadsStatus> save(Iterable<NGOSoEUploadsStatus> ngoSoEUploadsStatus);
}
