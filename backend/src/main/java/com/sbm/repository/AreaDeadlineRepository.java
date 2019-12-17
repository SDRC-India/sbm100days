package com.sbm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sbm.domain.AreaDeadline;

public interface AreaDeadlineRepository extends JpaRepository<AreaDeadline, Integer> 
{

   List<AreaDeadline> findByIsDeadLineActiveTrue();
	/**
	 * query for getting deadline date areawise from mst_area_deadline and mst_area table
	 */
	@Query(value = "select a.area_name,a.sbm_area_id,a.area_level_id_fk,d.deadline,d.is_dead_line_active from mst_area a,mst_area_deadline d " 
	 + "where a.area_id_pk=d.area_id_fk and a.area_level_id_fk in (2,3) and is_dead_line_active=true order by a.area_level_id_fk desc,a.area_name asc", nativeQuery = true)
	List<Object[]> findAreaDeadlineList();
}
