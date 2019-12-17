/**
 * 
 */
package com.sbm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sbm.domain.DailyReportFormatA03;

/**
 * @author Ashutosh Dang(ashutosh@sdrc.co.in) Created Date : 30-Nov-2018
 *         11:05:51 AM
 */
public interface DailyReportFormatA03Repository extends JpaRepository<DailyReportFormatA03, Long> {

	@Query(value = "select area_level_id,area_id,district_name,block_name,gp_name,details_with_or_without_toilet,"
			+ "coveragehhincludingbls,coveragehhbalance_uncovered,ihhl_coverage_percent,created_date "
			+ "from (select format_a03.*,row_number() over(partition by area_id,area_level_id order by created_date desc) as rn "
			+ "from format_a03) t where rn <= 1 and area_level_id in (2,3,4,5) order by area_id", nativeQuery = true)
	List<Object[]> dailyDataFormatA03();

	@Query(value = "SELECT x.* FROM( SELECT ROW_NUMBER() OVER (PARTITION BY area_id,area_level_id ORDER BY created_date DESC)   "
			+ "AS r, t.* FROM daily_report_a03 t) x  WHERE x.r <= 1  and (parent_area_id=:pareaId or area_id=:pareaId or area_level_id=:pareaId)"
			+ "ORDER BY area_level_id desc,coverage_percent asc", nativeQuery = true)
	List<DailyReportFormatA03> findLastDateData(@Param(value = "pareaId") int pareaId);

	@Query(value = "SELECT x.* FROM( SELECT ROW_NUMBER() OVER (PARTITION BY area_id,area_level_id ORDER BY created_date DESC)  "
			+ "AS r, t.* FROM daily_report_a03 t) x  WHERE x.r <= 1  and (parent_area_id=:pareaId or area_id=:pareaId or area_level_id=:pareaId or area_Id=18) "
			+ "ORDER BY area_level_id desc,coverage_percent asc", nativeQuery = true)
	List<DailyReportFormatA03> findLastDateAllData(@Param(value = "pareaId") int forAreaId);

	@Query(value = "SELECT x.* FROM( SELECT ROW_NUMBER() OVER (PARTITION BY area_id,area_level_id ORDER BY created_date DESC) "
			+ "AS r, t.* FROM daily_report_a03 t) x  WHERE x.r <= 1  and "
			+ "(parent_area_id in(Select a.sbm_area_id from mst_area a,mst_area b "
			+ "where a.sbm_area_id=b.sbm_area_id and a.sbm_area_id in(select sbm_area_id from mst_area where parent_area_id=:pareaId)) or area_id=:pareaId ) "
			+ "ORDER BY area_level_id desc,coverage_percent asc", nativeQuery = true)
	List<DailyReportFormatA03> findLastDateDataGpWise(@Param(value = "pareaId") Integer forAreaId);
}
