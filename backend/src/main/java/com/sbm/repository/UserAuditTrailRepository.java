package com.sbm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sbm.domain.UserAuditTrail;

public interface UserAuditTrailRepository extends JpaRepository<UserAuditTrail, Integer>{

}
