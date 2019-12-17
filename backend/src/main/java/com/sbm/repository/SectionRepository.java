/**
 * 
 */
package com.sbm.repository;

import java.util.List;

import com.sbm.domain.Sections;
import org.springframework.data.repository.RepositoryDefinition;

/**
 * @author Harsh Pratyush(harsh@sdrc.co.in)
 *
 */

@RepositoryDefinition(domainClass=Sections.class,idClass=Integer.class)
public interface SectionRepository {

	List<Sections> findAll();

	Sections save(Sections section);

}
