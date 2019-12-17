package com.sbm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sbm.domain.Area;
import com.sbm.domain.AreaLevel;

public interface AreaRepository extends JpaRepository<Area, Integer> 
{

   @Query(value = "select a1.area_name as block_name, a1.sbm_area_id, a1.parent_area_id, a1.area_level_id_fk from mst_area a1 " + 
   					"where a1.area_level_id_fk=4", nativeQuery=true)
	public List<Object[]> findDistBlockDetails();

	List<Area> findByParentAreaId(Integer parentAreaId);
	
	Area findBysbmAreaIdAndAreaLevel(Integer areaId, AreaLevel areaLevel);
	
	
	public List<Area> findAllByAreaLevelAreaLevelIdInOrderByAreaIdAsc(List<Integer> asList);
	
	public Area findByAreaCode(String areaCode);
	
	public List<Area> findAll();
	
	/**
	 * @param forAreaId
	 * @return
	 */
	public List<Area> findBySbmAreaId(int forAreaId);
	
	public Area findBySbmAreaId(Integer sbmAreaId);

	/**
	 * @param areaId
	 * @return
	 */
	public Area findByAreaId(Integer areaId);

	/**
	 * @param pareaId
	 * @return
	 */
	@Query(value = "select sbm_area_id,area_name,area_level_id_fk from mst_area " + 
			"where parent_area_id=:pareaId or sbm_area_id=:pareaId", nativeQuery=true)
	public List<Object[]> getAreaNameIdLevelId(@Param(value = "pareaId")int pareaId);

	/**
	 * @param forAreaId
	 * @return
	 */
	@Query(value = "select sbm_area_id,area_name,area_level_id_fk from mst_area " + 
			"where  parent_area_id=:pareaId or sbm_area_id=:pareaId or area_level_id_fk=:pareaId or sbm_area_id=18 order by sbm_area_id desc", nativeQuery=true)
	public List<Object[]> getAllAreaNameIdLevelId(@Param(value = "pareaId")int forAreaId);

	/**
	 * @param forAreaId
	 * @return
	 */
	public List<Area> findByAreaLevelAreaLevelId(int forAreaId);
	
	public List<Area> findByAreaLevelAreaLevelIdIn(List<Integer> forAreaId);

	@Query(value = "select * from mst_area where parent_area_id=:pareaId or sbm_area_id=:pareaId", nativeQuery=true)
	public List<Area> findAreaGPWise(@Param(value = "pareaId")int forAreaId);

	@Query(value = "select * from mst_area where sbm_area_id=:pareaId or area_level_id_fk=:pareaId or parent_area_id=:pareaId or sbm_area_id=18 " + 
			" or parent_area_id in(select sbm_area_id from mst_area where parent_area_id=:pareaId)", nativeQuery=true)
	public List<Area> findByAreaIdParentAreaId(@Param(value = "pareaId")int forAreaId);

	/**
	 * @return
	 */
	@Query(value = "select * from mst_area where area_level_id_fk in (2,3)", nativeQuery=true)
	public List<Area> getAreasDistState();
	
	
}
