package com.sbm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sbm.domain.UserDetails;

public interface UserDetailsRepository extends JpaRepository<UserDetails, Integer> {
 
	@Query(value="select usr.user_details_id, usr.name, usr.mobile_number, aa.sbm_area_id, usr.type_detail_id_fk, level.area_level_id_pk, aa.area_name, mad.deadline " + 
			"from mst_user_details usr,account acc, mst_user_area_mapping mapp, mst_area aa, mst_area_level level, mst_area_deadline mad " + 
			"where usr.type_detail_id_fk in(1, 3) " + 
			"and acc.id = usr.acc_id_fk " + 
			"and acc.id = mapp.acc_id_fk " + 
			"and mapp.area_id_fk = aa.area_id_pk " + 
			"and aa.area_level_id_fk = level.area_level_id_pk " + 
			"and mad.area_id_fk = aa.area_id_pk " + 
			"and mad.sendsms = true " + 
			"and acc.enabled=true " + 
			"order by usr.user_details_id", nativeQuery=true)
	List<Object[]> getSanitationUserList();
	
	@Query(value="select usr.user_details_id, usr.name, usr.mobile_number, aa.sbm_area_id, usr.type_detail_id_fk, level.area_level_id_pk, aa.area_name, mad.deadline " + 
			"from mst_user_details usr,account acc, mst_user_area_mapping mapp, mst_area aa, mst_area_level level, mst_area_deadline mad " + 
			"where usr.type_detail_id_fk in(2, 3) " + 
			"and acc.id = usr.acc_id_fk " + 
			"and acc.id = mapp.acc_id_fk " + 
			"and mapp.area_id_fk = aa.area_id_pk " + 
			"and aa.area_level_id_fk = level.area_level_id_pk " + 
			"and mad.area_id_fk = aa.area_id_pk " + 
			"and mad.sendsms = true " + 
			"and acc.enabled=true " +
			"and level.area_level_id_pk in (2,3) " + 
			"order by usr.user_details_id", nativeQuery=true)
	List<Object[]> getWaterUserList();

	UserDetails findByAccountId(Integer id);

	List<UserDetails> findByAccountIdIn(List<Integer> accoutList);

}
