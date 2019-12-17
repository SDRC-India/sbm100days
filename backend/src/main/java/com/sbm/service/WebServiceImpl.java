package com.sbm.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sbm.domain.Area;
import com.sbm.domain.Type;
import com.sbm.domain.TypeDetails;
import com.sbm.domain.UserAreaMapping;
import com.sbm.domain.UserDetails;
import com.sbm.model.AreaModel;
import com.sbm.model.UserDetailsModel;
import com.sbm.model.ValueObjectModel;
import com.sbm.repository.AreaRepository;
import com.sbm.repository.TypeDetailsRepository;
import com.sbm.repository.TypeRepository;
import com.sbm.repository.UserAreaMappingRepository;
import com.sbm.repository.UserDetailsRepository;

/**
 * 
 * 
 * @author subrata
 * @author Subham Ashish(subham@sdrc.co.in)
 *
 */
@Service
public class WebServiceImpl implements WebService {

	@Autowired
	private AreaRepository areaRepository;

	@Autowired
	private TypeDetailsRepository typeDetailsRepository;
	
	@Autowired
	private UserAreaMappingRepository userAreaMappingRepository;
	
	@Autowired
	private UserDetailsRepository userDetailsRepository;

	@Autowired
	private TypeRepository typeRepository;

	/**
	 * @return areaMap contains all the area details 
	 * 
	 * @author subrata
	 */
	@Override
	public Map<String, List<AreaModel>> getAllAreaList() {

		List<Area> areas = areaRepository.findAllByAreaLevelAreaLevelIdInOrderByAreaIdAsc(Arrays.asList(2, 3, 4, 5));

		List<AreaModel> areaModelList = new ArrayList<>();
		Map<String, List<AreaModel>> areaMap = new LinkedHashMap<>();

		// setting areas is area-model list
		for (Area area : areas) {

			AreaModel areaModel = new AreaModel();

			areaModel.setAreaCode(area.getAreaCode());
			areaModel.setAreaId(area.getAreaId());
			areaModel.setAreaLevel(area.getAreaLevel().getAreaLevelName());
			areaModel.setAreaName(area.getAreaName());
			areaModel.setLive(area.getLive());
			areaModel.setParentAreaId(area.getParentAreaId());
			areaModel.setSbmAreaId(area.getSbmAreaId());
			areaModelList.add(areaModel);

		}

		// making levelName as a key
		for (AreaModel areaModel : areaModelList) {

			if (areaMap.containsKey(areaModel.getAreaLevel())) {
				areaMap.get(areaModel.getAreaLevel()).add(areaModel);
			} else {
				areaModelList = new ArrayList<>();
				areaModelList.add(areaModel);
				areaMap.put(areaModel.getAreaLevel(), areaModelList);
			}
		}

		return areaMap;
	}
	/**
	 * This method will return all the TypeDetails.
	 * 
	 * @return detailsModel contains all type details
	 * 
	 * @author subrata
	 */
	@Override
	public List<ValueObjectModel> getTypeDetails() {
		/**
		 * Getting all the type details from the TypeDetails table
		 */
		List<TypeDetails> list = typeDetailsRepository.findAll();
		List<ValueObjectModel> detailsModel = new ArrayList<>();
		/**
		 * Iterating all the type details.
		 */
		for (TypeDetails typeDetails : list) {
			ValueObjectModel deTypeDetailsModel = new ValueObjectModel();
			deTypeDetailsModel.setTypeDetailId(typeDetails.getTypeDetailId());
			deTypeDetailsModel.setTypeDetailName(typeDetails.getTypeDetailName());
			deTypeDetailsModel.setTypeId(typeDetails.getType().getTypeId());
			detailsModel.add(deTypeDetailsModel);
		}
		return detailsModel;
	}

	/**
	 * This method will return the area details according to the area id.
	 * 
	 * @see com.sbm.service.WebService#getAllAreaList(int)
	 */
	@Override
	public Map<String, List<AreaModel>> getAllAreaList(Integer areaId) {
		Area a = areaRepository.findBySbmAreaId(areaId);
		
		Map<String, List<AreaModel>> areaMap = new HashMap<>();
		switch (a.getAreaLevel().getAreaLevelId()) {

		case 4:// block
		{
			Area block = areaRepository.findBySbmAreaId(areaId);

			Area district = areaRepository.findBySbmAreaId(block.getParentAreaId());

			Area state = areaRepository.findBySbmAreaId(district.getParentAreaId());

			{
				List<AreaModel> blockModelList = new ArrayList<>();
				AreaModel areaModel = new AreaModel();
				areaModel.setAreaCode(block.getAreaCode());
				areaModel.setAreaId(block.getAreaId());
				areaModel.setAreaLevel(block.getAreaLevel().getAreaLevelName());
				areaModel.setAreaName(block.getAreaName());
				areaModel.setLive(block.getLive());
				areaModel.setParentAreaId(block.getParentAreaId());
				areaModel.setSbmAreaId(block.getSbmAreaId());
				blockModelList.add(areaModel);
				areaMap.put(areaModel.getAreaLevel(), blockModelList);
			}

			{
				List<AreaModel> districtModelList = new ArrayList<>();
				AreaModel areaModel = new AreaModel();
				areaModel.setAreaCode(district.getAreaCode());
				areaModel.setAreaId(district.getAreaId());
				areaModel.setAreaLevel(district.getAreaLevel().getAreaLevelName());
				areaModel.setAreaName(district.getAreaName());
				areaModel.setLive(district.getLive());
				areaModel.setParentAreaId(district.getParentAreaId());
				areaModel.setSbmAreaId(district.getSbmAreaId());
				districtModelList.add(areaModel);
				areaMap.put(areaModel.getAreaLevel(), districtModelList);
			}

			{
				List<AreaModel> stateModelList = new ArrayList<>();
				AreaModel areaModel = new AreaModel();
				areaModel.setAreaCode(state.getAreaCode());
				areaModel.setAreaId(state.getAreaId());
				areaModel.setAreaLevel(state.getAreaLevel().getAreaLevelName());
				areaModel.setAreaName(state.getAreaName());
				areaModel.setLive(state.getLive());
				areaModel.setParentAreaId(state.getParentAreaId());
				areaModel.setSbmAreaId(state.getSbmAreaId());
				stateModelList.add(areaModel);
				areaMap.put(areaModel.getAreaLevel(), stateModelList);
			}
		}

			break;
		case 1:
		case 2: {// national, state
			List<AreaModel> areaModelList = new ArrayList<>();
		
			List<Area> areas = areaRepository.findAllByAreaLevelAreaLevelIdInOrderByAreaIdAsc(Arrays.asList(2, 3, 4));

			// setting areas is area-model list
			for (Area area : areas) {

				AreaModel areaModel = new AreaModel();

				areaModel.setAreaCode(area.getAreaCode());
				areaModel.setAreaId(area.getAreaId());
				areaModel.setAreaLevel(area.getAreaLevel().getAreaLevelName());
				areaModel.setAreaName(area.getAreaName());
				areaModel.setLive(area.getLive());
				areaModel.setParentAreaId(area.getParentAreaId());
				areaModel.setSbmAreaId(area.getSbmAreaId());
				areaModelList.add(areaModel);

			}

			// making levelName as a key
			for (AreaModel areaModel : areaModelList) {

				if (areaMap.containsKey(areaModel.getAreaLevel())) {
					areaMap.get(areaModel.getAreaLevel()).add(areaModel);
				} else {
					areaModelList = new ArrayList<>();
					areaModelList.add(areaModel);
					areaMap.put(areaModel.getAreaLevel(), areaModelList);
				}
			}
		}
			break;

		case 3:// district
		{
			Area district = areaRepository.findBySbmAreaId(areaId);

			List<Area> blocks = areaRepository.findByParentAreaId(district.getSbmAreaId());

			Area state = areaRepository.findBySbmAreaId(district.getParentAreaId());

			{
				List<AreaModel> blockModelList = new ArrayList<>();
				for (Area area : blocks) {

					AreaModel areaModel = new AreaModel();

					areaModel.setAreaCode(area.getAreaCode());
					areaModel.setAreaId(area.getAreaId());
					areaModel.setAreaLevel(area.getAreaLevel().getAreaLevelName());
					areaModel.setAreaName(area.getAreaName());
					areaModel.setLive(area.getLive());
					areaModel.setParentAreaId(area.getParentAreaId());
					areaModel.setSbmAreaId(area.getSbmAreaId());
					blockModelList.add(areaModel);
					areaMap.put(areaModel.getAreaLevel(), blockModelList);
				}

			}

			{
				List<AreaModel> distirctModelList = new ArrayList<>();

				AreaModel areaModel = new AreaModel();

				areaModel.setAreaCode(district.getAreaCode());
				areaModel.setAreaId(district.getAreaId());
				areaModel.setAreaLevel(district.getAreaLevel().getAreaLevelName());
				areaModel.setAreaName(district.getAreaName());
				areaModel.setLive(district.getLive());
				areaModel.setParentAreaId(district.getParentAreaId());
				areaModel.setSbmAreaId(district.getSbmAreaId());
				distirctModelList.add(areaModel);
				areaMap.put(areaModel.getAreaLevel(), distirctModelList);

			}

			{
				List<AreaModel> stateModelList = new ArrayList<>();

				AreaModel areaModel = new AreaModel();

				areaModel.setAreaCode(state.getAreaCode());
				areaModel.setAreaId(state.getAreaId());
				areaModel.setAreaLevel(state.getAreaLevel().getAreaLevelName());
				areaModel.setAreaName(state.getAreaName());
				areaModel.setLive(state.getLive());
				areaModel.setParentAreaId(state.getParentAreaId());
				areaModel.setSbmAreaId(state.getSbmAreaId());
				stateModelList.add(areaModel);
				areaMap.put(areaModel.getAreaLevel(), stateModelList);

			}
		}
			break;
		}

		return areaMap;
	}

	/**
	 * @param roleId 
	 * @param areaId
	 * 
	 * @return modelList
	 * 
	 * @author subrata
	 */
	@Override
	public List<UserDetailsModel> getAllUsers(Integer roleId, Integer areaId) {
		List<UserAreaMapping> userArea = userAreaMappingRepository.getUserByRoleIdAndAreaId(roleId, areaId);

		List<UserDetailsModel> modelList = new ArrayList<>();
		List<Integer> accoutList = new ArrayList<>();
		for (UserAreaMapping userAreaMapping : userArea) {
			accoutList.add(userAreaMapping.getUser().getId());
		}
		List<UserDetails> userdetails = userDetailsRepository.findByAccountIdIn(accoutList); 
		Map<Integer, UserDetails> userDetailsMap = userdetails.stream().collect(Collectors.toMap(k->k.getAccount().getId(), v->v));

		userArea.forEach(v->{

		UserDetailsModel model = new UserDetailsModel();
		model.setAreaId(v.getArea().getAreaId());
		model.setAreaName(v.getArea().getAreaName());
		model.setSbmAreaId(v.getArea().getSbmAreaId());
		model.setUserName(v.getUser().getUserName());
		model.setUserId(v.getUser().getId());
		model.setEnable(v.getUser().isEnabled());
		model.setName(userDetailsMap.get(v.getUser().getId()).getName());
		model.setMobileNumber(userDetailsMap.get(v.getUser().getId()).getMobileNumber());
		model.setTypeDetailsId(userDetailsMap.get(v.getUser().getId()).getTypeDetails().getTypeDetailId());
		model.setRoleId(roleId);
		modelList.add(model);
		});

		return modelList;
	}
	
	/**
	 * This method will return all the Types.
	 * 
	 * @return typeModels contains all types
	 * 
	 * @author subrata
	 */
	@Override
	public List<ValueObjectModel> getTypes() {
		/**
		 * Getting all the types from the Type table
		 */
		List<Type> list = typeRepository.findByTypeIdIn(Arrays.asList(2,3,4));
		List<ValueObjectModel> typeModels = new ArrayList<>();
		/**
		 * Iterating all the type list.
		 */
		for (Type type : list) {
			ValueObjectModel typeModel = new ValueObjectModel();
			typeModel.setTypeDetailId(type.getTypeId());
			typeModel.setTypeDetailName(type.getTypeName());
			typeModels.add(typeModel);
		}
		return typeModels;
	}
}
