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
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const map = await Map.findOne({_id: objectId});
			if(map) return map;
			else return ({});
		},
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
			const{region, _id} = args;
			const mapId = new ObjectId(_id);
			const found = await Map.findOne({_id:mapId});
			const subregions = found.subregions;
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
			})

			subregions.push(newRegion);
			const updated = await Map.updateOne({_id:mapId}, {subregions:subregions});
			newRegion.save();
			if(updated) return mapId;
			else return ("Subregion not added");
		}
	}
}