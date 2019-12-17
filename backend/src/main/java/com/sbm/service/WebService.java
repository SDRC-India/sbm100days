package com.sbm.service;

import java.util.List;
import java.util.Map;

import com.sbm.model.AreaModel;
import com.sbm.model.UserDetailsModel;
import com.sbm.model.ValueObjectModel;

public interface WebService {

	Map<String, List<AreaModel>> getAllAreaList();

	List<ValueObjectModel> getTypeDetails();

	Map<String, List<AreaModel>> getAllAreaList(Integer areaId);

	List<UserDetailsModel> getAllUsers(Integer roleId, Integer areaId);

	List<ValueObjectModel> getTypes();


}
