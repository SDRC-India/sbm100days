package com.sbm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sbm.domain.FormatF28aWeekly;

public interface FormatF28aWeeklyRepository extends JpaRepository<FormatF28aWeekly, Long>
{
	@Query(value = "SELECT x.* FROM(" + 
			" SELECT RANK() OVER (PARTITION BY sbm_area_id  ORDER BY created_date DESC) AS r, t.* FROM format_f28a_weekly t) x " + 
			" WHERE x.r <= 1", nativeQuery=true)
	public List<FormatF28aWeekly>  findLatestAllRecord();
	

	@Query(value = "select a.area_name,a.no_of_toilets_approved,a.uploaded_photographs_total,a.created_date,a.uploaded_photographs_percentage,"+
			" a.sbm_area_id,a.parent_sbm_area_id from format_f28a a INNER JOIN" + 
			"(select sbm_area_id,max(created_date) date from format_f28a b where to_char(created_date, 'yyyy-mm-dd') = '2018-12-07' group by b.sbm_area_id ) a2 " + 
			"ON a.created_date=a2.date and a.sbm_area_id =a2.sbm_area_id", nativeQuery=true)
	public List<Object[]> findAllGeoTaggingDetailsOfSeventhDec();
	
	@Query(value = "SELECT x.* FROM(SELECT RANK() OVER (PARTITION BY area_name,sbm_area_id ORDER BY created_date DESC)" + 
			"  AS r, t.* FROM format_f28a_weekly t where (t.parent_sbm_area_id=:parentAreaId or t.sbm_area_id=:parentAreaId)) " + 
			" x WHERE x.r <= 1 order by parent_sbm_area_id desc,current_week_coverage_percent desc",nativeQuery=true)
	public List<FormatF28aWeekly> findLatestGeoTagByParentId(@Param(value = "parentAreaId") Integer parentAreaId);
	
	@Query(value = "SELECT x.* FROM(SELECT RANK() OVER (PARTITION BY area_name,sbm_area_id ORDER BY created_date DESC)  " + 
			" AS r, t.* FROM format_f28a_weekly t where (t.sbm_area_id in (select a3.sbm_area_id  from mst_area " + 
			"  a3 inner join(select a1.sbm_area_id from mst_area a1 inner join mst_area a2 on a1.parent_area_id=" + 
			" a2.sbm_area_id where a1.parent_area_id=:parentAreaId) a4 on a3.parent_area_id=a4.sbm_area_id) or t.sbm_area_id=:parentAreaId)) " + 
			" x WHERE x.r <= 1 order by length(parent_sbm_area_id||'') desc ,current_week_coverage_percent desc  ",nativeQuery=true)
	public List<FormatF28aWeekly> findAllLatestGpsOfF28aWeeklyByParentAreaId(@Param(value = "parentAreaId") Integer parentAreaId);
	
	@Query(value = "SELECT x.* FROM(SELECT RANK() OVER (PARTITION BY sbm_area_id ORDER BY created_date DESC)" + 
			" AS r, t.* FROM format_f28a_weekly t where (t.sbm_area_id in(select sbm_area_id from mst_area " + 
			" where area_level_id_fk=:parentAreaId) or sbm_area_id=18 )) x WHERE x.r <= 1 order by length(parent_sbm_area_id||'') desc ,current_week_coverage_percent desc",nativeQuery=true)
	public List<FormatF28aWeekly> findLatestGeoTagByAreaLevelId(@Param(value = "parentAreaId") Integer parentAreaId);


}
