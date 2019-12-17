package com.sbm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sbm.domain.TypeDetails;

/**
 * @author subham
 *
 */
public interface TypeDetailsRepository extends JpaRepository<TypeDetails, Integer>{

	TypeDetails findByTypeDetailId(Integer typeDetailsId);

}
