package com.sbm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sbm.domain.FormatF42District;

public interface FormatF42DistrictRepository extends JpaRepository<FormatF42District, Long>{

	@Query(value = "SELECT x.* FROM(" + 
			" SELECT RANK() OVER (PARTITION BY block_id ORDER BY created_date DESC) AS r, t.* FROM format_f42_district t) x " + 
			" WHERE x.r <= 1", nativeQuery=true)
	List<FormatF42District> getLastRecord();
	
	@Query(value = "SELECT x.* FROM( " + 
			"SELECT RANK() OVER (PARTITION BY block_id ORDER BY created_date DESC) AS r, t.* FROM format_f42_district t) x " + 
			"WHERE to_char(x.created_date,'yyyy-mm-dd')=:date", nativeQuery=true)
	List<FormatF42District> getCurrentDateRecords(@Param("date")String date);
	
	@Query(value = "SELECT x.* FROM( SELECT RANK() OVER (PARTITION BY block_name ORDER BY created_date DESC) " + 
			"AS r, t.* FROM format_f42_district  t) x  " + 
			"WHERE to_char(x.created_date,'yyyy-mm-dd')='2018-12-07' order by form_district_id", nativeQuery=true)
	public List<FormatF42District> findAllLatestDistrictFromF42SateOfSeventhDec();

	@Query(value = "select *  from (select format_f42_district.*,row_number() over(partition by block_id order by created_date desc) as rn  " + 
			"from format_f42_district) t where rn <= 1 and  block_id=:forAreaId", nativeQuery=true)
	FormatF42District findPg1Tb2F42Data(@Param(value = "forAreaId")int forAreaId);

}
