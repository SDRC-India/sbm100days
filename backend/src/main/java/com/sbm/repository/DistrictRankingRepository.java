package com.sbm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sbm.domain.DistrictRanking;

public interface DistrictRankingRepository extends JpaRepository<DistrictRanking, Integer>
{
	@Query(value = "SELECT x.* FROM(" + 
			" SELECT ROW_NUMBER() OVER (PARTITION BY sbm_area_id ORDER BY created_date DESC) AS r, t.* FROM district_ranking t) x " + 
			" WHERE x.r <= 1", nativeQuery=true)
	public List<DistrictRanking> findLatestInsertedDistricts(); 
	
	@Query(value = "SELECT x.* FROM( SELECT RANK() OVER (PARTITION BY sbm_area_id ORDER BY created_date DESC)" + 
			"AS r, t.* FROM district_ranking t where t.parent_sbm_area_id=:parentAreaId) x  " + 
			" WHERE x.r <= 1 order by current_week_ranking", nativeQuery=true)
	public List<DistrictRanking> findLatestInsertedDistrictsByParentAreaId(@Param(value = "parentAreaId") Integer parentAreaId); 
}
