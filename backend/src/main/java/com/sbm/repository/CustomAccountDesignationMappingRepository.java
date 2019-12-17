package com.sbm.repository;

import org.sdrc.usermgmt.domain.Account;
import org.sdrc.usermgmt.domain.AccountDesignationMapping;
import org.sdrc.usermgmt.repository.AccountDesignationMappingRepository;
import org.springframework.stereotype.Component;

@Component("customAccountDesignationMappingRepository")
public interface CustomAccountDesignationMappingRepository extends AccountDesignationMappingRepository{

	AccountDesignationMapping findByAccount(Account account);

}
