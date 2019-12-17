package com.sbm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sbm.domain.FormatA03;

public interface FormatAO3Repository extends JpaRepository<FormatA03, Long> {
	@Query(value = "SELECT x.* FROM("
			+ " SELECT RANK() OVER (PARTITION BY state_name ORDER BY created_date DESC) AS r, t.* FROM format_a03 t where t.area_level_id=2) x "
			+ " WHERE x.r <= 1", nativeQuery = true)
	public List<FormatA03> findLatestState();

	@Query(value = "SELECT x.* FROM("
			+ " SELECT RANK() OVER (PARTITION BY district_name ORDER BY created_date DESC) AS r, t.* FROM format_a03 t where t.area_level_id=3) x "
			+ " WHERE x.r <= 1", nativeQuery = true)
	public List<FormatA03> findAllDistricts();

	@Query(value = "SELECT x.* FROM("
			+ " SELECT RANK() OVER (PARTITION BY block_name,district_name ORDER BY created_date DESC) AS r, t.* FROM format_a03 t where t.area_level_id=4) x "
			+ " WHERE x.r <= 1", nativeQuery = true)
	public List<FormatA03> findAllBlocks();

	@Query(value = "SELECT x.* FROM("
			+ " SELECT RANK() OVER (PARTITION BY gp_name,block_name,district_name ORDER BY created_date DESC) AS r, t.* FROM format_a03 t where t.area_level_id=5) x "
			+ " WHERE x.r <= 1", nativeQuery = true)
	public List<FormatA03> findAllGps();

	/**
	 * query to get Balance remaining as on DEC from table format_a03 area_id and
	 * area_level_id wise
	 */
	@Query(value = "SELECT x.area_id,x.area_level_id,x.coveragehhbalance_uncovered,x.created_date "
			+ "FROM format_a03 x WHERE area_level_id in(2,3) and to_char(x.created_date,'yyyy-mm-dd')='2018-12-01' "
			+ "ORDER BY area_level_id desc", nativeQuery = true)
	public List<Object[]> getBalRemainAsOnDEC1();

	/**
	 * getting hhcoveraged_yesterday (Date wise coverage)since dec 1 till today date
	 * wise from table format_a03
	 */
	@Query(value = "SELECT x.area_id,x.area_level_id,x.hhcoveraged_yesterday,to_char(x.created_date,'yyyy-mm-dd') as dat,"
			+ "to_char(NOW(),'yyyy-mm-dd') as nw "
			+ "FROM format_a03 x WHERE area_level_id in(2,3) and to_char(x.created_date,'yyyy-mm-dd') "
			+ "BETWEEN '2018-12-01' AND to_char(NOW(),'yyyy-mm-dd')  "
			+ "ORDER BY area_id desc ,dat asc", nativeQuery = true)
	public List<Object[]> getHHhhCoveredDateWise();

	/**
	 * getting ihhl_coverage_percent area_id wise
	 */
	@Query(value = "SELECT x.area_id,x.area_level_id,x.ihhl_coverage_percent,x.created_date "
			+ "FROM( SELECT ROW_NUMBER() OVER (PARTITION BY area_id,area_level_id ORDER BY created_date DESC) "
			+ "AS r, t.* FROM format_a03 t) x  WHERE x.r <= 1    and area_level_id in(2,3) "
			+ "ORDER BY area_level_id desc ", nativeQuery = true)
	public List<Object[]> getIhhlCoveragePercent();

	@Query(value = "SELECT x.* FROM("
			+ " SELECT RANK() OVER (PARTITION BY state_name ORDER BY created_date DESC) AS r, t.* FROM format_a03 t where t.area_level_id=2) x "
			+ " WHERE to_char(x.created_date,'yyyy-mm-dd')=:date", nativeQuery = true)
	public List<FormatA03> getCurrentDateRecordsForState(@Param("date") String todayDate);

	@Query(value = "SELECT x.* FROM("
			+ " SELECT RANK() OVER (PARTITION BY district_name ORDER BY created_date DESC) AS r, t.* FROM format_a03 t where t.area_level_id=3) x "
			+ " WHERE to_char(x.created_date,'yyyy-mm-dd')=:date", nativeQuery = true)
	public List<FormatA03> getCurrentDateRecordsForDistricts(@Param("date") String todayDate);

	@Query(value = "SELECT x.* FROM("
			+ " SELECT RANK() OVER (PARTITION BY block_name,district_name ORDER BY created_date DESC) AS r, t.* FROM format_a03 t where t.area_level_id=4) x "
			+ " WHERE to_char(x.created_date,'yyyy-mm-dd')=:date", nativeQuery = true)
	public List<FormatA03> getCurrentDateRecordsForBlocks(@Param("date") String todayDate);

	@Query(value = "SELECT x.* FROM("
			+ " SELECT RANK() OVER (PARTITION BY gp_name,block_name,district_name ORDER BY created_date DESC) AS r, t.* FROM format_a03 t where t.area_level_id=5) x "
			+ " WHERE to_char(x.created_date,'yyyy-mm-dd')=:date", nativeQuery = true)
	public List<FormatA03> getCurrentDateRecordsForGps(@Param("date") String todayDate);

	/**
	 * getting data for last 2 days
	 */
	@Query(value = "select area_id,area_level_id,hhcoveraged_yesterday,coveragehhbalance_uncovered,balance_uncoveredrr,deficit,to_char(created_date,'dd-mm-yyyy') "
			+ "from (select format_a03.*,row_number() over(partition by area_id,area_level_id order by created_date desc) as rn "
			+ "from format_a03) t where rn <= 2 and  area_id in(select sbm_area_id from mst_area where parent_area_id=:pareaId or sbm_area_id=:pareaId) "
			+ "order by balance_uncoveredrr desc ", nativeQuery = true)
	public List<Object[]> findDailyRptPage2Data(@Param(value = "pareaId") int pareaId);

	/**
	 * getting all data for last 2 days allgps, allblocks, alldistricts
	 */
	@Query(value = "select area_id,area_level_id,hhcoveraged_yesterday,coveragehhbalance_uncovered,balance_uncoveredrr,deficit,to_char(created_date,'dd-mm-yyyy')  "
			+ "from (select format_a03.*,row_number() over(partition by area_id,area_level_id order by created_date desc) as rn "
			+ "from format_a03) t where rn <= 2 and  area_id in(select sbm_area_id from mst_area where parent_area_id=:pareaId or sbm_area_id=:pareaId or area_level_id_fk=:pareaId or sbm_area_id=18) "
			+ "order by balance_uncoveredrr desc", nativeQuery = true)
	public List<Object[]> findDailyAllRptPage2Data(@Param(value = "pareaId") int forAreaId);

	@Query(value = "select * from (select format_a03.*,row_number() over(partition by area_id,area_level_id order by created_date desc) as rn  "
			+ "from format_a03) t where rn <= 1 and  area_id=18 " + "order by area_id desc", nativeQuery = true)
	public FormatA03 findPg1Tb1AllData();

	@Query(value = "select * from (select format_a03.*,row_number() over(partition by area_id,area_level_id order by created_date desc) as rn "
			+ "from format_a03) t where rn <= 1 and  area_id=:pareaId " + "order by area_id desc", nativeQuery = true)
	public FormatA03 findPg1Tb1Data(@Param(value = "pareaId") int forAreaId);

	@Query(value = "select area_id,gp_name,hhcoveraged_yesterday,coveragehhbalance_uncovered,balance_uncoveredrr,deficit,to_char(created_date,'dd-mm-yyyy'),area_level_id  "
			+ "from (select format_a03.*,row_number() over(partition by area_id,area_level_id order by created_date desc) as rn  "
			+ "from format_a03) t where rn <= 2 and  area_id in(select sbm_area_id from mst_area where parent_area_id in( Select a.sbm_area_id from mst_area a,mst_area b "
			+ "where a.sbm_area_id=b.sbm_area_id and a.sbm_area_id in(select sbm_area_id from mst_area where parent_area_id=:pareaId)) or area_id=:pareaId )  "
			+ "ORDER BY area_level_id desc,balance_uncoveredrr desc", nativeQuery = true)
	public List<Object[]> findDailyRptPage2DataGpWise(@Param(value = "pareaId") int forAreaId);
	
	
	@Query(value = "SELECT x.* FROM(SELECT ROW_NUMBER() OVER (PARTITION BY area_id ORDER BY created_date DESC)"
			+ " AS r, t.* FROM format_a03 t) x WHERE x.r <= 1 order by area_id ", nativeQuery = true)
	public List<FormatA03> findAllAreasLatestData();
	
	
	
	@Query(value = "SELECT x.* FROM( SELECT RANK() OVER (PARTITION BY area_id ORDER BY   " + 
			" created_date DESC) AS r, t.* FROM format_a03 t where t.area_id in   " + 
			"(select a1.sbm_area_id from mst_area a1 inner join mst_area a2 on   " + 
			"a1.parent_area_id=a2.sbm_area_id and a2.sbm_area_id=:parentAreaId) OR t.area_id=:parentAreaId ) " + 
			"x WHERE x.r <= 1 order by area_level_id desc,area_id",nativeQuery=true)
	public List<FormatA03> findLatestDataListOfAllAreasByParentId(@Param(value = "parentAreaId") Integer parentAreaId);
	
	
	@Query(value = "SELECT x.* FROM(SELECT RANK() OVER (PARTITION BY area_id ORDER BY created_date DESC) AS r, t.* FROM format_a03 t   " + 
			" where (t.area_level_id=:areaLevelId or area_id=18 )) x WHERE x.r <= 1 order by area_level_id desc,area_id",nativeQuery=true)
	public List<FormatA03> findLatestDataListOfAllAreasByAreaLevelId(@Param(value = "areaLevelId") Integer areaLevelId);
	
	
	@Query(value = "SELECT x.* FROM( SELECT RANK() OVER (PARTITION BY area_id ORDER BY  " + 
			"created_date DESC) AS r, t.* FROM format_a03 t where t.area_id in   " + 
			"(select a3.sbm_area_id  from mst_area  " +
			"  a3 inner join(select a1.sbm_area_id from mst_area a1 inner join mst_area a2 on a1.parent_area_id=  " +
			" a2.sbm_area_id where a1.parent_area_id=:districtId) a4 on a3.parent_area_id=a4.sbm_area_id) OR t.area_id=:districtId ) " +
			" x WHERE x.r <= 1 order by area_level_id desc,area_id",nativeQuery=true)
	public List<FormatA03> findLatestDataListOfAllGpsByDistrictId(@Param(value = "districtId") Integer districtId);
	
	@Query(value="SELECT x.* FROM(SELECT RANK() OVER (PARTITION BY area_id ORDER BY created_date DESC)" + 
			" AS r, t.* FROM format_a03 t where t.area_level_id=3) x  WHERE x.r <= 1 order by area_id", nativeQuery=true)
	List<FormatA03> getLastestDistrictsRecordOrderByAreaId();
	
	@Query(value = " select t3.parent_area_id,max(t3.ihhl_coverage_percent),min(t3.ihhl_coverage_percent) from" + 
			"(select t2.*,t1.ihhl_coverage_percent from (SELECT x.* FROM(SELECT RANK() OVER" +
			"(PARTITION BY area_id ORDER BY created_date DESC) AS r, t.* FROM format_a03 t " +
			" where t.area_level_id =4) x  WHERE x.r <= 1 ) t1 inner join mst_area t2 on t1.area_id=t2.sbm_area_id" +
			"  order by parent_area_id)t3 group by t3.parent_area_id", nativeQuery=true)
	public List<Object[]> findCoverageOfBestAndWrostPerformingBlock();
	
	@Query(value="select * from format_a03 where to_char(created_date,'yyyy-mm-dd')=:date" + 
			"  and area_level_id=3 order by area_id", nativeQuery=true)
	List<FormatA03> findAllDistrictsByTodaysDate(@Param("date") String todayDate);
	
	@Query(value="select * from format_a03 where to_char(created_date,'yyyy-mm-dd')='2018-12-02'" + 
			"  and area_level_id=3 order by area_id", nativeQuery=true)
	List<FormatA03> findAllDistrictsBySbm100DaysStartingDate();

	public FormatA03 findTop1ByAreaIdOrderByCreatedDateDesc(Integer sbmAreaId);

}
