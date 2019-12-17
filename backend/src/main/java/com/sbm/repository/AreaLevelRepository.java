package com.sbm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sbm.domain.AreaLevel;

public interface AreaLevelRepository extends JpaRepository<AreaLevel, Integer> {

	AreaLevel findByAreaLevelId(Integer id);
}
