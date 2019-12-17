package com.sbm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sbm.domain.FormatF42Weekly;

public interface FormatF42WeeklyRepository extends JpaRepository<FormatF42Weekly, Long> 
{
	@Query(value = "SELECT x.* FROM(" + 
			" SELECT RANK() OVER (PARTITION BY area_id ORDER BY created_date DESC) AS r, t.* FROM format_f42_weekly t) x " + 
			" WHERE x.r <= 1", nativeQuery=true)
	public List<FormatF42Weekly> findLatestAllRecord();
	
	@Query(value = "SELECT x.* FROM( SELECT RANK() OVER (PARTITION BY area_name,area_id ORDER BY " + 
			" created_date DESC) AS r, t.* FROM format_f42_weekly t where t.area_id in " + 
			"(select a1.sbm_area_id from mst_area a1 inner join mst_area a2 on " +
			"a1.parent_area_id=a2.sbm_area_id and a2.sbm_area_id=:parentAreaId) OR t.area_id=:parentAreaId ) "+
			"x WHERE x.r <= 1 ORDER BY length(area_id||'') desc,odf_declared_villages_percentage desc",nativeQuery=true)
	public List<FormatF42Weekly> findLatestOdfDeclared(@Param(value = "parentAreaId") Integer parentAreaId);
	
	@Query(value = "SELECT x.* FROM(SELECT RANK() OVER (PARTITION BY area_id ORDER BY created_date DESC)" + 
			" AS r, t.* FROM format_f42_weekly t where (t.area_id in(select sbm_area_id from mst_area  " + 
			" where area_level_id_fk=:parentAreaId) or area_id=18 )) x WHERE x.r <= 1 ORDER BY length(area_id||'') desc,odf_declared_villages_percentage desc",nativeQuery=true)
	public List<FormatF42Weekly> findLatestOdfDeclaredByAreaLevelId(@Param(value = "parentAreaId") Integer parentAreaId);
	
	@Query(value = "SELECT x.* FROM( SELECT RANK() OVER (PARTITION BY area_name,area_id ORDER BY " + 
			" created_date DESC) AS r, t.* FROM format_f42_weekly t where t.area_id in " + 
			"(select a1.sbm_area_id from mst_area a1 inner join mst_area a2 on " +
			"a1.parent_area_id=a2.sbm_area_id and a2.sbm_area_id=:parentAreaId) OR t.area_id=:parentAreaId ) "+
			"x WHERE x.r <= 1 ORDER BY length(area_id||'') desc,verified_odf_declared_villages_percentage desc",nativeQuery=true)
	public List<FormatF42Weekly> findLatestOdfVerified(@Param(value = "parentAreaId") Integer parentAreaId);
	
	@Query(value = "SELECT x.* FROM(SELECT RANK() OVER (PARTITION BY area_id ORDER BY created_date DESC)" + 
			" AS r, t.* FROM format_f42_weekly t where (t.area_id in(select sbm_area_id from mst_area  " + 
			" where area_level_id_fk=:parentAreaId) or area_id=18 )) x WHERE x.r <= 1 ORDER BY length(area_id||'') desc,verified_odf_declared_villages_percentage desc",nativeQuery=true)
	public List<FormatF42Weekly> findLatestOdfVerifiedByAreaLevelId(@Param(value = "parentAreaId") Integer parentAreaId);
	
	
	@Query(value = "SELECT x.* FROM( SELECT RANK() OVER (PARTITION BY area_name,area_id ORDER BY   " + 
			"  created_date DESC) AS r, t.* FROM format_f42_weekly t where t.area_id in   " + 
			" (select a3.sbm_area_id  from mst_area " + 
			"   a3 inner join(select a1.sbm_area_id from mst_area a1 inner join mst_area a2 on a1.parent_area_id=  " + 
			" a2.sbm_area_id where a1.parent_area_id=:parentAreaId) a4 on a3.parent_area_id=a4.sbm_area_id) OR t.area_id=:parentAreaId ) " + 
			" x WHERE x.r <= 1 ORDER BY length(area_id||'') desc,verified_odf_declared_villages_percentage desc" ,nativeQuery=true)
	public List<FormatF42Weekly> findAllLatestGpsOfF42WeeklyByParentAreaId(@Param(value = "parentAreaId") Integer parentAreaId);
	
	
	@Query(value = "SELECT count(*) FROM( SELECT RANK() OVER (PARTITION BY area_name,area_id ORDER BY   " + 
			"created_date DESC) AS r, t.* FROM format_f42_weekly t where t.area_id in   " + 
			"(select a1.sbm_area_id from mst_area a1 inner join mst_area a2 on  " + 
			" a1.parent_area_id=a2.sbm_area_id and a2.sbm_area_id=18)) " + 
			"x WHERE x.r <= 1 and block_declared_odf=block_total" ,nativeQuery=true)
	public Integer findCountOfNoOfDistDeclOdf();
	
	
	@Query(value = "SELECT x.* FROM(SELECT RANK() OVER (PARTITION BY area_id ORDER BY created_date DESC)  " + 
			"AS r, t.* FROM format_f42_weekly t where (t.area_id in(select sbm_area_id from mst_area  " + 
			" where area_level_id_fk=3))) x WHERE x.r <= 1 order by area_id",nativeQuery=true)
	public List<FormatF42Weekly> findAllDistrictsFromLatestInsertedDataByAreaLevelId();


     
	
	
}
