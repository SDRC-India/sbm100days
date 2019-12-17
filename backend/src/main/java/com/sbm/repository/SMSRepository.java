package com.sbm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sbm.domain.SMS;

public interface SMSRepository extends JpaRepository<SMS, Integer> {

	@Query(value="SELECT s.* FROM sms s WHERE s.status = false and to_char(s.created_date,'yyyy-mm-dd')=:todayDate "
			+ "order by sms_id_pk", nativeQuery=true)
	List<SMS> getRecords(@Param("todayDate") String todayDate);

}
