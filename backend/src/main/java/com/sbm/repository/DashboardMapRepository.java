package com.sbm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sbm.domain.IndicatorUnitSubgroup;

public interface DashboardMapRepository extends JpaRepository<IndicatorUnitSubgroup, Integer> 
{
	IndicatorUnitSubgroup findById(Integer id);
	
/*	@Query(value="SELECT a1.area_name,a1.area_code,a1.sbm_area_id,a2.ihhl_coverage_percent,a1.area_level_id_fk FROM mst_area a1 INNER JOIN"+
			"(SELECT x.* FROM( SELECT RANK() OVER (PARTITION BY gp_name,block_name,district_name" + 
			"  ORDER BY created_date DESC) AS r, t.* FROM format_a03 t )x " + 
			" WHERE x.r <= 1) a2 ON a2.area_id=a1.sbm_area_id   and a1.parent_area_id=:parentId", nativeQuery=true)
	List<Object[]> dailyLatestDataFormatA03ForMap(@Param(value = "parentId") int parentId);*/
	
	@Query(value="SELECT a1.area_name,a1.area_code,a1.sbm_area_id,a2.ihhl_coverage_percent,a1.area_level_id_fk FROM mst_area a1 INNER JOIN"+
			"(select * from format_a03 where to_char(created_date,'yyyy-mm-dd')=" + 
			"(select max(to_char(created_date,'yyyy-mm-dd'))" + 
			" from format_a03))  a2 ON a2.area_id=a1.sbm_area_id   and a1.parent_area_id=:parentId", nativeQuery=true)
	List<Object[]> dailyLatestDataFormatA03ForMap(@Param(value = "parentId") int parentId);
	
	
/*	@Query(value="SELECT a1.area_name,a1.area_code,a1.sbm_area_id,a2.uploaded_photographs_percentage,a1.area_level_id_fk FROM mst_area a1 INNER JOIN"+
			"(SELECT x.* FROM(  SELECT RANK() OVER (PARTITION BY area_name " + 
			"ORDER BY created_date DESC) AS r, t.* FROM format_f28a t where" + 
			"(t.parent_sbm_area_id=:parentId)) x WHERE x.r <= 1) a2 ON a2.sbm_area_id=a1.sbm_area_id  ", nativeQuery=true)
	List<Object[]> dailyLatestGeoTaggingDetailsForMap(@Param(value = "parentId") int parentId);*/
	
	@Query(value="SELECT a1.area_name,a1.area_code,a1.sbm_area_id,a2.uploaded_photographs_percentage,a1.area_level_id_fk FROM mst_area a1 INNER JOIN"+
			"(select * from (select * from format_f28a where to_char(created_date,'yyyy-mm-dd')=" + 
			"(select max(to_char(created_date,'yyyy-mm-dd')) from format_f28a)) y  where " + 
			"y.parent_sbm_area_id=:parentId) a2 ON a2.sbm_area_id=a1.sbm_area_id  ", nativeQuery=true)
	List<Object[]> dailyLatestGeoTaggingDetailsForMap(@Param(value = "parentId") int parentId);
	
	/*@Query(value="SELECT a1.area_name,a1.area_code,a1.sbm_area_id,a2.village_declared_odf_percentage,a2.village_declared_odf_total,a1.area_level_id_fk FROM mst_area a1 INNER JOIN(SELECT x.* FROM( "+
			"SELECT RANK() OVER (PARTITION BY area_name ORDER BY created_date DESC) " + 
			"AS r, t.* FROM format_f42_state t where (t.state_id=:parentId)) x " + 
			"WHERE x.r <= 1) a2 ON a2.area_id=a1.sbm_area_id ", nativeQuery=true)
	List<Object[]> dailyLatestOdfDistrictwiseDetailsForMap(@Param(value = "parentId") int parentId);*/
	
	@Query(value="SELECT a1.area_name,a1.area_code,a1.sbm_area_id,a2.village_declared_odf_percentage,a2.village_declared_odf_total,a1.area_level_id_fk FROM mst_area a1 INNER JOIN(select * from "+
			"(select * from format_f42_state where to_char(created_date,'yyyy-mm-dd')=" + 
			"(select max(to_char(created_date,'yyyy-mm-dd')) from format_f42_state)) y  " + 
			"where y.state_id=:parentId) a2 ON a2.area_id=a1.sbm_area_id ", nativeQuery=true)
	List<Object[]> dailyLatestOdfDistrictwiseDetailsForMap(@Param(value = "parentId") int parentId);
	
	/*@Query(value="SELECT a1.area_name,a1.area_code,a1.sbm_area_id,a2.village_declared_odf_percentage,a2.village_declared_odf_total,a1.area_level_id_fk FROM mst_area a1 INNER JOIN"+
			"(SELECT x.* FROM( SELECT RANK() OVER (PARTITION BY block_name ORDER BY created_date DESC)" + 
			" AS r, t.* FROM format_f42_district t where (t.district_id=:parentId)) x   " + 
			"WHERE x.r <= 1) a2 ON a2.block_id=a1.sbm_area_id", nativeQuery=true)
	List<Object[]> dailyLatestOdfBlockwiseDetailsForMap(@Param(value = "parentId") int parentId);*/
	
	@Query(value="SELECT a1.area_name,a1.area_code,a1.sbm_area_id,a2.village_declared_odf_percentage,a2.village_declared_odf_total,a1.area_level_id_fk FROM mst_area a1 INNER JOIN"+
			"(select * from (select * from format_f42_district where to_char(created_date,'yyyy-mm-dd')=" + 
			" (select max(to_char(created_date,'yyyy-mm-dd')) from format_f42_district)) y " + 
			"where y.district_id=:parentId) a2 ON a2.block_id=a1.sbm_area_id", nativeQuery=true)
	List<Object[]> dailyLatestOdfBlockwiseDetailsForMap(@Param(value = "parentId") int parentId);
	
	
	
	
	
	
	@Query(value="select a1.area_name,a2.created_date,a2.ihhl_coverage_percent,a2.hhcoveraged_yesterday,a1.area_level_id_fk from  mst_area a1 INNER JOIN"+
	        "(SELECT x.* FROM(SELECT RANK() OVER (PARTITION BY gp_name,district_name,block_name,state_name ORDER BY created_date DESC)"+
			"AS r, t.* FROM format_a03 t where (t.area_id=:areaId)) x WHERE x.r <= 8 ) a2 on a2.area_id=a1.sbm_area_id ORDER BY created_date", nativeQuery=true)
	List<Object[]> dailyLatestSevenDaysDataFormatA03ForTrend(@Param(value = "areaId") int areaId);
	
	/*@Query(value="SELECT x.area_name, x.created_date,x.uploaded_photographs_percentage,x.uploaded_photographs_yesterday FROM(SELECT RANK() OVER (PARTITION BY area_name ORDER BY created_date DESC)"+
			"AS r, t.* FROM format_f28a t where (t.sbm_area_id=:areaId)) x WHERE x.r <= 8 ORDER BY created_date", nativeQuery=true)
	List<Object[]> dailyLatestSevenDaysGeoTaggingDetailsForTrend(@Param(value = "areaId") int areaId);*/
	@Query(value="SELECT a2.area_name, a2.created_date,a2.uploaded_photographs_percentage,a2.uploaded_photographs_yesterday,a1.area_level_id_fk from  mst_area a1 INNER JOIN"+
			"(SELECT x.*  FROM(SELECT RANK() OVER (PARTITION BY area_name ORDER BY created_date DESC)"+
			"AS r, t.* FROM format_f28a t where (t.sbm_area_id=:areaId)) x WHERE x.r <= 8) a2 on a2.sbm_area_id= a1.sbm_area_id ORDER BY created_date", nativeQuery=true)
	List<Object[]> dailyLatestSevenDaysGeoTaggingDetailsForTrend(@Param(value = "areaId") int areaId);
	
	/*@Query(value="SELECT x.area_name,x.created_date,x.village_declared_odf_total,x.village_declared_odf_difference FROM(SELECT RANK() "+
			"OVER (PARTITION BY area_name ORDER BY created_date DESC)" + 
			"AS r, t.* FROM format_f42_state t where (t.area_id=:areaId)) x WHERE x.r <= 8 ORDER BY created_date;", nativeQuery=true)
	List<Object[]> dailyLatestLatestSevenDaysOdfDistrictwiseDetailsForTrend(@Param(value = "areaId") int areaId);*/
	
	@Query(value="SELECT a2.area_name,a2.created_date,a2.village_declared_odf_total,a2.village_declared_odf_difference,a1.area_level_id_fk from  mst_area a1 INNER JOIN"+
			"  (SELECT x.* FROM(SELECT RANK() OVER (PARTITION BY area_name ORDER BY created_date DESC)" + 
			"AS r, t.* FROM format_f42_state t where (t.area_id=:areaId)) x WHERE x.r <= 8) a2 on a2.area_id=a1.sbm_area_id ORDER BY created_date;", nativeQuery=true)
	List<Object[]> dailyLatestLatestSevenDaysOdfDistrictwiseDetailsForTrend(@Param(value = "areaId") int areaId);
	
	/*@Query(value="SELECT x.block_name,x.created_date,x.village_declared_odf_total,x.village_declared_odf_difference FROM(SELECT RANK() "+
			"OVER (PARTITION BY block_name ORDER BY created_date DESC)" + 
			"AS r, t.* FROM format_f42_district t where (t.block_id=:areaId)) x WHERE x.r <= 8 ORDER BY created_date", nativeQuery=true)
	List<Object[]> dailyLatestLatestSevenDaysOdfBlockwiseDetailsForTrend(@Param(value = "areaId") int areaId);*/
	
	@Query(value="SELECT a2.block_name,a2.created_date,a2.village_declared_odf_total,a2.village_declared_odf_difference,a1.area_level_id_fk from  mst_area a1 INNER JOIN" + 
			"(SELECT x.* FROM(SELECT RANK() OVER (PARTITION BY block_name ORDER BY created_date DESC)  " + 
			"AS r, t.* FROM format_f42_district t where (t.block_id=:areaId)) x WHERE x.r <= 8 ) a2 on a2.block_id=a1.sbm_area_id ORDER BY created_date", nativeQuery=true)
	List<Object[]> dailyLatestLatestSevenDaysOdfBlockwiseDetailsForTrend(@Param(value = "areaId") int areaId);
	
	
	
	@Query(value="SELECT a1.area_name,a1.area_code,a1.sbm_area_id,a2.ihhl_coverage_percent FROM mst_area a1 INNER JOIN"+
			"(SELECT x.* FROM( SELECT RANK() OVER (PARTITION BY gp_name,block_name,district_name " + 
			"ORDER BY created_date DESC) AS r, t.* FROM format_a03 t )x " + 
			"WHERE x.r <= 1) a2 ON a2.area_id=a1.sbm_area_id   and a1.area_code=:areaCode", nativeQuery=true)
	List<Object[]> getLatestIndicatorValue(@Param(value = "areaCode") String areaCode);
	
	
}
