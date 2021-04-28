const ObjectId = require('mongoose').Types.ObjectId;
const Map = require('../models/map-model');
const Region = require('../models/region-model');


module.exports = {
    Query:{
        getAllMaps: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) {console.log("something"); return([])};
			const maps = await Map.find({owner: _id});
			return (maps);
		},

		/** 
		 	@param 	 {object} args - a todolist id
			@returns {object} a todolist on success and an empty object on failure
		**/
		getMapById: async (_, args) => {
			console.log("getmapbyid");
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const map = await Map.findOne({_id: objectId});
			if(map) return map;
			else return ({});
		},

		getRegionById: async(_, args) => {
			const{_id} = args;
			const objectId = new Object(_id);
			const region = await Region.findOne({_id: objectId});
			if(region){
				return region;
			}
			
			return ({});
			
		}
    },

	Mutation:{
		addMap: async(_, args) => {
			console.log("add map");
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
			const deleted = await Map.deleteOne({_id: objectId});
			
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
			console.log("addregion");
			console.log("args", args);
			const{region, _id, isMap} = args;
			const parentId = new ObjectId(_id);
			const regionId = new ObjectId();

			const newRegion = new Region({
				_id: regionId,
				name: region.name,
				capital: region.capital,
				leader: region.leader,
				flag: region.flag,
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
		}
	}
}