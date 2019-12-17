package com.sbm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sbm.domain.Type;

public interface TypeRepository extends JpaRepository<Type, Integer>{

	List<Type> findByTypeIdIn(List<Integer> asList);

}
