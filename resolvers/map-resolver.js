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
			const regionId = new ObjectId();

			const newRegion = new Region({
				_id: regionId,
				name: region.name,
				capital: region.capital,
				leader: region.leader,
				flag: region.name+' Flag',
				landmarks: region.landmarks,
				parentRegionId: region.parentRegionId,
				subregions:[]
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
			const{_id, parentId, index} = args;
			const regionId = new ObjectId(_id);
			const parentRegionId = new ObjectId(parentId);
			
			let parentFound;
			parentFound = await Map.findOne({_id:parentRegionId});
			if(!parentFound){
				parentFound = await Region.findOne({_id:parentRegionId});
			}

			const subregions = parentFound.subregions;
			subregions.splice(index,1);

			const isMap = await Map.findOne({_id:parentRegionId});

			if(!isMap){
				await Region.updateOne({_id:parentRegionId}, {subregions:subregions});
			}
			else{
				await Map.updateOne({_id:parentRegionId}, {subregions:subregions});
			}

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
			
			console.log(regionsToReturn);
			return regionsToReturn;
		},

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

	}
}