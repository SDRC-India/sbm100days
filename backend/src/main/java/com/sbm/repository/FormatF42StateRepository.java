package com.sbm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sbm.domain.FormatF42State;

public interface FormatF42StateRepository extends JpaRepository<FormatF42State, Long>{

	@Query(value="SELECT x.* FROM (" + 
			" SELECT ROW_NUMBER() OVER (PARTITION BY area_id ORDER BY created_date DESC) AS r, t.* FROM format_f42_state t) x" + 
			" WHERE x.r <=1;", nativeQuery=true)
	List<FormatF42State> getLastRecord();
	
	@Query(value="SELECT x.* FROM (" + 
			" SELECT ROW_NUMBER() OVER (PARTITION BY area_id ORDER BY created_date DESC) AS r, t.* FROM format_f42_state t) x" + 
			" WHERE to_char(x.created_date,'yyyy-mm-dd')=:date", nativeQuery=true)
	List<FormatF42State> getCurrentDateRecords(@Param("date")String todayDate);

	@Query(value = "SELECT x.* FROM( SELECT RANK() OVER (PARTITION BY area_name ORDER BY created_date DESC) " + 
			"AS r, t.* FROM format_f42_state t) x  " + 
			"WHERE to_char(x.created_date,'yyyy-mm-dd')='2018-12-07' order by form_state_id", nativeQuery=true)
	public List<FormatF42State> findAllLatestStateFromF42SateOfSeventhDec();

	@Query(value = "select *  from (select format_f42_state.*,row_number() over(partition by area_id order by created_date desc) as rn " + 
			"from format_f42_state) t where rn <= 1 and  area_id=18", nativeQuery=true)
	FormatF42State findPg1Tb2F42AllData();

	@Query(value = "select *  from (select format_f42_state.*,row_number() over(partition by area_id order by created_date desc) as rn  " + 
			"from format_f42_state) t where rn <= 1 and  area_id=:forAreaId", nativeQuery=true)
	FormatF42State findPg1Tb2F42Data(@Param(value = "forAreaId")int forAreaId);

	@Query(value = "select count(*) from (select format_f42_state.*,row_number() over(partition by area_id order by created_date desc) as rn " + 
			"from format_f42_state ) t where rn <= 1  and block_total=block_declared_odf", nativeQuery=true)
	int findNoOfDistDeclOdf();
	
	@Query(value="SELECT x.* FROM(SELECT RANK() OVER (PARTITION BY area_id ORDER BY created_date DESC) " + 
			"AS r, t.* FROM format_f42_state t where t.state_id=18 ) x WHERE x.r <= 1 order by area_id", nativeQuery=true)
	List<FormatF42State> getLastestDistrictsRecordOrderByAreaId();

	FormatF42State findTop1ByAreaIdOrderByCreatedDateDesc(Integer sbmAreaId);

}
