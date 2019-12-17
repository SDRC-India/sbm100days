package com.sbm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sbm.domain.MessageTemplate;


public interface MessageTemplateRepository extends JpaRepository<MessageTemplate, Long>{

	List<MessageTemplate> findAll();

	List<MessageTemplate> findByIsActiveTrue();

}
