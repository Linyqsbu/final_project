const ObjectId = require('mongoose').Types.ObjectId;
const Map = require('../models/map-model');
const Region = require('../models/region-model');


module.exports = {
    Query:{
        getAllMaps: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) {return([])};
			const maps = await Map.find({owner: _id});
			return (maps);
		},

		/** 
		 	@param 	 {object} args - a todolist id
			@returns {object} a todolist on success and an empty object on failure
		**/
		getMapById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const map = await Map.findOne({_id: objectId});
			if(map) return map;
			else return ({});
		},

		getRegionById: async(_, args) => {
			const{ _id } = args;
			const objectId = new ObjectId(_id);
			const region = await Region.findOne({_id: objectId});
			if(region) return region;
			else
			return ({});
			
		},

		getPath: async(_, args) => {
			
			const {_id} = args;
			
			const objectId = new ObjectId(_id);
			let region = await Region.findOne({_id:objectId});
			if(!region) return [];
			const path = [];
			let parentId;
			while(region.parentRegionId){
				parentId = new ObjectId(region.parentRegionId);
				region = await Region.findOne({_id:parentId});
				if(!region){
					region = await Map.findOne({_id:parentId});
				}
				path.unshift({_id:region._id, name:region.name});
			}
			
			return path;
			
		},

		getChildrenLandmarks:async (_, args) => {
			const{_id} = args;
			const regionId = new ObjectId(_id);
			let found = await Region.findOne({_id:regionId});
			let subregionQueue=found.subregions;
			let currentSubregion;
			let landmarks=[];
			
			while(subregionQueue.length>0){
				currentSubregion=subregionQueue.shift();
				found=await Region.findOne({_id:currentSubregion._id});
				
				for(let i=0;i<found.landmarks.length;i++){
					landmarks.push(found.landmarks[i]+" - "+found.name);
				}
				subregionQueue=[...subregionQueue, ...found.subregions];
			}
			return landmarks;
		},
		
		/*
			This method is to get the previous or next sibling or region with _id
		*/
		getSibling: async (_, args) => {
			const{_id, direction} = args;
			const regionId = new ObjectId(_id);
			const found = await Region.findOne({_id:regionId});
			let parentFound = await Map.findOne({_id:found.parentRegionId});
			if(!parentFound){
				parentFound = await Region.findOne({_id:found.parentRegionId});
			}
			
			let index=0;
			for(let i=0;i<parentFound.subregions.length;i++){
				if(parentFound.subregions[i]._id == _id){
					index=i;
					break;
				}
			}

			index = index+direction;
			if(index>=0 && index<parentFound.subregions.length){
				return parentFound.subregions[index]._id;
			}
			else{
				return ("invalid id");
			}
			
		},

		getAllSiblings: async(_, args) => {
			const {_id} = args;
			const regionId = new ObjectId(_id);
			const found = await Region.findOne({_id:regionId});
			let parentFound = await Map.findOne({_id:found.parentRegionId});
			if(!parentFound){
				parentFound = await Region.findOne({_id:found.parentRegionId});
			}
			let siblings=[]
			siblings=parentFound.subregions;
			console.log(parentFound);
			return siblings;
		}
    },

	Mutation:{
		addMap: async(_, args) => {
			const{map} = args;
			const objectId = new ObjectId();
			const{name, owner, subregions} = map;
			const newMap = new Map({
				_id:objectId,
				name:name,
				owner:owner,
				subregions:subregions
			})

			const updated = newMap.save();
			if(updated) return objectId;
			else return ('Could not add map');
		},

		deleteMap: async(_, args) => {
			const {_id} = args;
			const objectId = new ObjectId(_id);
			let found = await Map.findOne({_id: objectId});
			let subregionQueue = found.subregions;// a queue to delete the subregions
			let currentSubregion;
			let regionDeleted;
			const deleted = await Map.deleteOne({_id: objectId});
			
			while(subregionQueue.length>0){
				currentSubregion=subregionQueue.shift();
				found = await Region.findOne({_id:currentSubregion._id});
				regionDeleted = await Region.deleteOne({_id: currentSubregion._id});
				subregionQueue=[...subregionQueue, ...found.subregions];
			}

			if(deleted) return true;
			else return false;
		},

		editMapName: async(_, args) => {
			const{_id, newName} = args;
			const mapId = new ObjectId(_id);
			const updated = await Map.updateOne({_id:mapId}, {name:newName});
			if(updated) return mapId;
			else return ("Map not updated");
			
		},

		addRegion: async(_, args) => {
			const{region, _id, isMap} = args;
			const parentId = new ObjectId(_id);

			let regionId;
			if(region._id=='')
				regionId = new ObjectId();
			else
				regionId = new ObjectId(_id);

			const newRegion = new Region({
				_id: regionId,
				name: region.name,
				capital: region.capital,
				leader: region.leader,
				flag: region.name+' Flag',
				landmarks: region.landmarks,
				parentRegionId: region.parentRegionId,
				subregions:region.subregions
			});

			let found;
			if(isMap){
				found = await Map.findOne({_id:parentId});
			}
			else{
				found = await Region.findOne({_id:parentId});
			}

			const subregions = found.subregions;
			subregions.push(newRegion);

			let updated;
			
			if(isMap)
				updated = await Map.updateOne({_id:parentId}, {subregions:subregions});
			else
				updated = await Region.updateOne({_id:parentId}, {subregions:subregions});
			newRegion.save();

			if(updated) return regionId;
			else return ("Subregion not added");
		},

		updateRegionField: async(_, args) => {
			const{_id, parentId, field, value} = args;
			const regionId = new ObjectId(_id);
			const parentRegionId = new ObjectId(parentId);

			let parentFound;
			parentFound = await Map.findOne({_id:parentRegionId});
			if(!parentFound){
				parentFound = await Region.findOne({_id:parentRegionId});
			}
			
			const subregions = parentFound.subregions;
			let index=0;
			for(let i=0;i<subregions.length;i++){
				if(subregions[i]._id==_id){
					index=i;
				}
			}
			
			subregions[index][field]=value;

			if(field=="name"){
				subregions[index].flag=value+' Flag';
				await Region.updateOne({id:regionId}, {flag:value+' Flag'});
			}
			
			const isMap = await Map.findOne({_id:parentRegionId});
			if(!isMap){
				await Region.updateOne({_id:parentRegionId}, {subregions:subregions});
			}
			else{
				await Map.updateOne({_id:parentRegionId}, {subregions:subregions});
			}
			const updated = await Region.updateOne({_id:regionId}, {[field]:value});

			
			if(updated) return ('updated successfully');
			else return ('updated unsuccessfully');
		},

		deleteRegion: async(_, args) => {
			const{_id, parentId} = args;
			const regionId = new ObjectId(_id);
			const parentRegionId = new ObjectId(parentId);
			console.log(_id);
			let parentFound;
			parentFound = await Map.findOne({_id:parentRegionId});
			if(!parentFound){
				parentFound = await Region.findOne({_id:parentRegionId});
			}

			const subregions = parentFound.subregions;
			let index=0;
			for(let i=0;i<subregions.length;i++){
				if(subregions[i]._id == _id){
					index=i;
					break;
				}
			}

			subregions.splice(index,1);

			const isMap = await Map.findOne({_id:parentRegionId});
			let updated;
			if(!isMap){
				updated = await Region.updateOne({_id:parentRegionId}, {subregions:subregions});
			}
			else{
				updated = await Map.updateOne({_id:parentRegionId}, {subregions:subregions});
			}
			if(updated) return ("deleted successfully");
			else return ("deleted unsuccessfully");

			/*
			const regionsToReturn=[];
			
			let found = await Region.findOne({_id: regionId});
			regionsToReturn.push(found);
			let subregionQueue=found.subregions;
			let currentSubregion;
			let regionDeleted;
			const deleted = await Region.deleteOne({_id:regionId});
			
			while(subregionQueue.length>0){
				currentSubregion=subregionQueue.shift();
				found=await Region.findOne({_id:currentSubregion._id});
				regionsToReturn.push(found);
				regionDeleted=await Region.deleteOne({_id:currentSubregion._id});
				subregionQueue=[...subregionQueue, ...found.subregions];
			}
			
			return regionsToReturn;
			*/
		},

		addRegionBack: async (_, args) => {
			const{parentId, region, index, isMap} = args;
			const parent = new ObjectId(parentId);
			let found;
			if(isMap){
				found = await Map.findOne({_id:parent});
			}
			else{
				found=await Region.findOne({_id:parent});
			}

			const subregions=found.subregions;
			const regionToAdd = {
				_id: new ObjectId(region._id),
				name:region.name,
				capital:region.capital,
				leader:region.leader,
				parentRegionId:region.parentRegionId,
				flag:region.flag,
				landmarks:region.landmarks,
				subregions:[]
			}
			subregions.splice(index,0,regionToAdd);
			
			let updated;
			if(isMap){
				updated = await Map.updateOne({_id:parent}, {subregions:subregions});
			}
			else{
				updated = await Region.updateOne({_id:parent}, {subregions:subregions});
			}

			if(updated) return ("the region is added back");
			else return ("the region is not added back");
		},

		sortRegions: async (_, args) => {
			const {regionId, field, isMap} = args;
			const region = new ObjectId (regionId);
			let found;
			if(isMap){
				found = await Map.findOne({_id:region});
			}
			else{
				found = await Region.findOne({_id:region});
			}
			
			const subregions = found.subregions;
			let sorted=true;
			for(let i=1; i<subregions.length;i++){
				if(subregions[i][field]<subregions[i-1][field]){
					sorted=false;
					break;
				}
			}

			if(!sorted)
				subregions.sort((a,b) => (a[field] > b[field])? 1: ((b[field]>a[field])? -1:0));
			else
				subregions.sort((a,b) => (a[field] < b[field])? 1: ((b[field]<a[field])? -1:0));
			
			let updated;

			if(isMap){
				updated = await Map.updateOne({_id:region}, {subregions:subregions});
			}
			else{
				updated = await Region.updateOne({_id:region}, {subregions:subregions});
			}
			
			if(updated) return ("the table is sorted");
			else return ("the table is not sorted successfully");
		},

		unsortRegions: async (_, args) => {
			const{regionId, prevSubregions, isMap} = args;
			const region = new ObjectId(regionId);
			console.log(region);
			let updated;
			if(isMap){
				updated = await Map.updateOne({_id:region}, {subregions:prevSubregions});
			}

			else{
				updated = await Region.updateOne({_id:region}, {subregions:prevSubregions});
			}
			if(updated) return ("the table is unsorted");
			else return ("the table is not unsorted");
		},

		addLandmark: async (_, args) => {
			const {landmark, _id, parentId, index} = args;
			const regionId = new ObjectId(_id);
			const parentRegionId = new ObjectId(parentId);
			const found = await Region.findOne({_id:regionId});
			const landmarks = found.landmarks;
			const repeat = landmarks.find(landmarkE => landmarkE==landmark);
			if(repeat) return ("Landmark with this name already exists");
			
			if(index)
				landmarks.splice(index,0,landmark);
			else
				landmarks.push(landmark);
		
			const updated = await Region.updateOne({_id:regionId}, {landmarks:landmarks});
			
			let parentFound = await Map.findOne({_id:parentRegionId});
			if(!parentFound){
				parentFound = await Region.findOne({_id:parentRegionId});
			}
			const subregions = parentFound.subregions;
			const subregion = subregions.find(subregion => subregion._id==_id);
			subregion.landmarks.push(landmark);
			
			let isMap = await Map.findOne({_id:parentRegionId});
			if(isMap){
				await Map.updateOne({_id:parentRegionId},{subregions:subregions});
			}
			else{
				await Region.updateOne({_id:parentRegionId}, {subregions:subregions});
			}
			if(updated) return ("Landmark is added");
			else return ("Landmark is not added");
			
		},

		deleteLandmark: async (_, args) => {
			const{landmark, _id, parentId} = args;
			const regionId = new ObjectId(_id);
			const parentRegionId = new ObjectId(parentId);
			
			const found = await Region.findOne({_id:regionId});
			const landmarks = found.landmarks;
			let index=0;
			for(let i=0;i<landmarks.length;i++){
				if(landmarks[i]==landmark){
					index=i;
				}
			}
			landmarks.splice(index,1);
			const updated = await Region.updateOne({_id:regionId}, {landmarks:landmarks});
			
			let isMap=true;
			let parentFound = await Map.findOne({_id:parentRegionId});
			if(!parentFound){
				isMap=false;
				parentFound = await Region.findOne({_id:parentRegionId});
			}

			const subregions = parentFound.subregions;
			const subregion = subregions.find(subregion => subregion._id == _id);
			for(let i=0;i<subregion.landmarks.length;i++){
				if(subregion.landmarks[i] == landmark){
					subregion.landmarks.splice(i,1);
				}
			}
			
			if(isMap){
				await Map.updateOne({_id:parentRegionId}, {subregions:subregions});
			}
			else{
				await Region.updateOne({_id:parentRegionId}, {subregions:subregions});
			}
			
			if(updated) return index;
			else return -1;
		},

		changeParentRegion: async (_, args) => {
			const {_id, oldParentId, newParentId, isParentMap} = args;

			const regionId = new ObjectId(_id);
			const newParent = new ObjectId(newParentId);
			const oldParent = new ObjectId(oldParentId);

			const updated = await Region.updateOne({_id:regionId}, {parentRegionId:newParent});

			let oldParentFound;
			let newParentFound;
			if(isParentMap){
				oldParentFound = await Map.findOne({_id:oldParent});
				newParentFound = await Map.findOne({_id:newParent});
			}
			else{
				oldParentFound = await Region.findOne({_id:oldParent});
				newParentFound = await Region.findOne({_id:newParent});
			}

			const oldSubregions = oldParentFound.subregions;
			const newSubregions = newParentFound.subregions;
			const index = oldSubregions.findIndex(subregion => subregion._id==_id);
			const region = oldSubregions[index];
			oldSubregions.splice(index,1);
			newSubregions.push(region);
			
			if(isParentMap){
				await Map.updateOne({_id:oldParent}, {subregions:oldSubregions});
				await Map.updateOne({_id:newParent}, {subregions:newSubregions});
			}
			else{
				await Region.updateOne({_id:oldParent}, {subregions:oldSubregions});
				await Region.updateOne({_id:newParent}, {subregions:newSubregions});
			}
			

			if(updated) return ("The region is updated");
			else return ("The region is not updated");
			
		}

		/*
		addRegionsBack:async (_, args) => {
			
			const{parentId, regionsToAdd, index} = args;
			const parentRegionId = new ObjectId(parentId);
			let found = await Map.findOne({_id:parentRegionId});
			if(!found){
				found = await Region.findOne({_id:parentRegionId});
			}
			const subregions = found.subregions;
			let newRegion = new Region({
				_id:new ObjectId(regionsToAdd[0]._id),
				name:regionsToAdd[0].name,
				capital:regionsToAdd[0].capital,
				leader:regionsToAdd[0].leader,
				flag:regionsToAdd[0].flag,
				parentRegionId: regionsToAdd[0].parentRegionId,
				landmarks:regionsToAdd[0].landmarks,
				subregions:[]
			});

			subregions.splice(index,0, newRegion);
			const isMap = await Map.findOne({_id:parentRegionId});
			let updated;
			if(!isMap){
				updated= await Region.updateOne({_id:parentRegionId}, {subregions:subregions});
			}
			else{
				updated = await Map.updateOne({_id:parentRegionId}, {subregions:subregions});
			}
			
			for(let i=0;i<regionsToAdd.length;i++){
				newRegion = new Region({
					_id: new ObjectId(regionsToAdd[i]._id),
					name: regionsToAdd[i].name,
					capital:regionsToAdd[i].capital,
					leader:regionsToAdd[i].leader,
					flag: regionsToAdd[i].flag,
					parentRegionId: regionsToAdd[i].parentRegionId,
					landmarks: regionsToAdd[i].landmarks,
					subregions: regionsToAdd[i].subregions
				})
				newRegion.save();
			}

			if(updated) return ("successful update");
			else return ("unsuccessful update");
			
		}
		*/

	}
}