package com.sbm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sbm.domain.FormatA03Weekly;


public interface FormatA03WeeklyRepository extends JpaRepository<FormatA03Weekly, Long> {
       
	
	@Query(value = "SELECT x.* FROM(" + 
			" SELECT RANK() OVER (PARTITION BY district_name ORDER BY created_date DESC) AS r, t.* FROM format_a03_weekly t where t.area_level_id in (2,3)) x " + 
			" WHERE x.r <= 1", nativeQuery=true)
	public List<FormatA03Weekly> findAllLatestDistricts(); 
	
	@Query(value = "SELECT x.* FROM(" + 
			" SELECT RANK() OVER (PARTITION BY block_name,district_name ORDER BY created_date DESC) AS r, t.* FROM format_a03_weekly t where t.area_level_id=4) x " + 
			" WHERE x.r <= 1", nativeQuery=true)
	 public List<FormatA03Weekly> findAllLatestBlocks();
	
	@Query(value = "SELECT x.* FROM(" + 
			" SELECT RANK() OVER (PARTITION BY district_name ORDER BY created_date DESC) AS r, t.* FROM format_a03_weekly t where t.area_level_id in (2,3)) x " + 
			" WHERE x.r <= 1 ORDER BY ihhl_coverage_percent DESC", nativeQuery=true)
	public List<FormatA03Weekly> findAllLatestDistrictsOrderByCoveragePercent();

	@Query(value = "SELECT x.* FROM(" + 
			" SELECT RANK() OVER (PARTITION BY gp_name,block_name,district_name ORDER BY created_date DESC) AS r, t.* FROM format_a03_weekly t where (t.parent_area_id=:parentAreaId or t.area_id=:parentAreaId)) x " + 
			" WHERE x.r <= 1 ORDER BY area_level_id DESC ,progress_percent", nativeQuery=true)
	public List<FormatA03Weekly> findByParentAreaIdOrderByCreatedDateDescOfAllAreas(@Param(value = "parentAreaId") Integer parentAreaId); 
	
	@Query(value = "SELECT x.* FROM(" + 
			" SELECT RANK() OVER (PARTITION BY gp_name,block_name,district_name ORDER BY created_date DESC) AS r, t.* FROM format_a03_weekly t where (t.area_level_id=:parentAreaId or t.area_id=18 )) x " + 
			" WHERE x.r <= 1 ORDER BY area_level_id DESC ,progress_percent ", nativeQuery=true)
	public List<FormatA03Weekly> findByAreaLevelIdOrderByCreatedDateDescOfAllAreas(@Param(value = "parentAreaId") Integer parentAreaId); 
	
	@Query(value = "SELECT x.* FROM(SELECT RANK() OVER (PARTITION BY gp_name,block_name,district_name ORDER BY created_date DESC) " + 
			"AS r, t.* FROM format_a03_weekly t where (t.area_id in " + 
			"( select a3.sbm_area_id  from mst_area a3 inner join(select a1.sbm_area_id from mst_area a1 inner join " + 
			"mst_area a2 on a1.parent_area_id=a2.sbm_area_id where a1.parent_area_id=:parentAreaId) a4 on a3.parent_area_id=a4.sbm_area_id)" + 
			" or t.area_id=:parentAreaId)) x WHERE x.r <= 1 ORDER BY area_level_id DESC ,progress_percent", nativeQuery=true)
	public List<FormatA03Weekly> findAllLatestGpsOfA03WeeklyByParentAreaId(@Param(value = "parentAreaId") Integer parentAreaId); 
	
	@Query(value = "SELECT x.* FROM(" + 
			" SELECT ROW_NUMBER() OVER (PARTITION BY area_id,area_level_id ORDER BY created_date DESC) AS r, t.* FROM format_a03_weekly t) x " + 
			" WHERE x.r <= 1", nativeQuery=true)
	public List<FormatA03Weekly> findAllLatestAreas(); 
	

	@Query(value = "SELECT x.area_id,x.area_level_id,x.block_name,x.coveragehhincludingbls,x.created_date,x.district_name,x.gp_name,x.ihhl_coverage_percent,x.state_name,x.coveragehhbalance_uncovered FROM( " + 
			"SELECT RANK() OVER (PARTITION BY district_name ORDER BY created_date DESC) AS r, t.* FROM format_a03 t) x " + 
			"WHERE to_char(x.created_date,'yyyy-mm-dd')='2018-12-07' order by id", nativeQuery=true)
	public List<Object[]> findByCreatedDate();
}
