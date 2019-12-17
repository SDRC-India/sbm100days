package com.sbm.repository;

import java.util.List;

import org.sdrc.usermgmt.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sbm.domain.UserAreaMapping;

/**
 * @author subham
 *
 */
public interface UserAreaMappingRepository extends JpaRepository<UserAreaMapping, Integer>{

	UserAreaMapping findByUser(Account account);

	@Query("select userarea from UserAreaMapping userarea  JOIN userarea.user.accountDesignationMapping adm "
			+ "WHERE userarea.area.areaId=:areaId AND adm.designation.id=:roleId")
	List<UserAreaMapping> getUserByRoleIdAndAreaId(@Param("roleId") Integer roleId, @Param("areaId")Integer areaId);

}
