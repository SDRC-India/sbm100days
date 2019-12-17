package com.sbm.repository;


import java.util.List;

import org.sdrc.usermgmt.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.transaction.annotation.Transactional;

import com.sbm.domain.SubmitionData;

//@RepositoryDefinition(domainClass = SubmitionData.class, idClass = Integer.class)
public interface SubmitionDataRepository extends JpaRepository<SubmitionData, Integer>{

	@Transactional
	SubmitionData save(SubmitionData submitionData);
	
//	@Transactional
//	List<SubmitionData> save(List<SubmitionData> submitionDatas);
	
	SubmitionData findByIsLiveTrueAndCreatedBy(Account id);
	
	SubmitionData findByIsLiveTrueAndSubmitionId(Integer id);
	
	List<SubmitionData> findByIsLiveTrueAndQ3AreaId(Integer areaId);
	
	List<SubmitionData> findByIsLiveTrueAndQ2AreaId(Integer districtId);
	
	List<SubmitionData> findByIsLiveTrue();

//	@Transactional
//	List<SubmitionData> save(Iterable<SubmitionData> listOfFormatD13);
}
