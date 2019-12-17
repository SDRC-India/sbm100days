package com.sbm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sbm.domain.FormatF28A;

public interface FormatF28ARepository extends JpaRepository<FormatF28A, Integer> {

	@Query(value="SELECT x.*  FROM( " + 
			"SELECT RANK() OVER (PARTITION BY sbm_area_id ORDER BY created_date DESC) AS r, t.* FROM format_f28a t) x " + 
			"WHERE x.r <= 1",nativeQuery=true)
	List<FormatF28A> getLatestRecords();

	@Query(value="select f28a.uploaded_photographs_percentage,a03.ihhl_coverage_percent,f42.village_declared_odf_total,sd.no_of_swachhagrahi " + 
			"from format_f28a f28a " + 
			"inner join format_a03 a03 on f28a.sbm_area_id= a03.area_id and sbm_area_id = :areaId " + 
			"inner join format_f42_state f42 on a03.area_id= f42.area_id and f42.area_id = :areaId " + 
			"inner join swachhagrahi_details sd on f42.area_id= sd.sbm_area_id and sd.sbm_area_id = :areaId " + 
			"ORDER BY f28a.created_date DESC,f42.created_date DESC,a03.created_date DESC,sd.created_date DESC LIMIT 1",nativeQuery=true)
	List<Object[]> getQuickStatsData(@Param("areaId") int areaId);

	@Query(value="SELECT x.*  FROM( " + 
			"SELECT RANK() OVER (PARTITION BY sbm_area_id ORDER BY created_date DESC) AS r, t.* FROM format_f28a t) x " + 
			"WHERE to_char(x.created_date,'yyyy-mm-dd')=:date",nativeQuery=true)
	List<FormatF28A> getCurrentDateRecords(@Param("date")String date);

	@Query(value="select *  from (select format_f28a.*,row_number() over(partition by sbm_area_id order by created_date desc) as rn " + 
			"from format_f28a) t where rn <= 1 and  sbm_area_id=18 ",nativeQuery=true)
	FormatF28A findPg1Tb2AllData();

	@Query(value="select *  from (select format_f28a.*,row_number() over(partition by sbm_area_id order by created_date desc) as rn " + 
			"from format_f28a) t where rn <= 1 and  sbm_area_id=:forAreaId",nativeQuery=true)
	FormatF28A findPg1Tb2Data(@Param(value = "forAreaId")int forAreaId);
	
	@Query(value="SELECT x.* FROM(SELECT RANK() OVER (PARTITION BY sbm_area_id ORDER BY created_date DESC) " + 
			"AS r, t.* FROM format_f28a t where t.parent_sbm_area_id=18 ) x WHERE x.r <= 1 order by sbm_area_id", nativeQuery=true)
	List<FormatF28A> getLastestDistrictsRecordOrderByAreaId();

	FormatF28A findTop1BySbmAreaIdOrderByCreatedDateDesc(Integer sbmAreaId);
	
	
	

}
