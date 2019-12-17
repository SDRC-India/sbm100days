/**
 * 
 */
package com.sbm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sbm.domain.FormatER89;

/**
 * @author Ashutosh Dang(ashutosh@sdrc.co.in)
 * Created Date :  26-Dec-2018 6:28:09 PM
 */
public interface FormatER89Repository  extends JpaRepository<FormatER89, Long>{

	@Query(value="SELECT x.* FROM(SELECT RANK() OVER (PARTITION BY sbm_area_id ORDER BY created_date DESC)" + 
			"AS r, t.* FROM format_er89 t where t.area_level_id=3 and financial_year=:financialYear) x  WHERE x.r <= 1 order by sbm_area_id", nativeQuery=true)
	List<FormatER89> getLastestInsertedDistrictsOrderBySbmAreaId(@Param("financialYear")String financialYear);
	
	@Query(value = "select distinct(financial_year) from format_er89 where to_char(created_date,'yyyy-mm-dd')="
			+"(select max(to_char(created_date,'yyyy-mm-dd')) from format_er89)", nativeQuery = true)
	public List<String> getListOfFinancialYears();
}
