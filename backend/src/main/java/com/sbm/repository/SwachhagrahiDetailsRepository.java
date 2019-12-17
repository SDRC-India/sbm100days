package com.sbm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sbm.domain.SwachhagrahiDetails;

public interface SwachhagrahiDetailsRepository extends JpaRepository<SwachhagrahiDetails, Integer> {

	@Query(value = "SELECT x.* FROM(SELECT RANK() OVER (PARTITION BY sbm_area_id ORDER BY created_date DESC)" + 
			"AS r, t.* FROM swachhagrahi_details t where (t.sbm_area_id in(select sbm_area_id from mst_area" + 
			" where area_level_id_fk=3) )) x WHERE x.r <= 1",nativeQuery=true)
	public List<SwachhagrahiDetails> findLatestInsertedDistrictsByAreaLevelId();

	public SwachhagrahiDetails findTop1BySbmAreaIdOrderByCreatedDateDesc(Integer sbmAreaId);
}
