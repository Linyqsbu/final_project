const ObjectId = require('mongoose').Types.ObjectId;
const Map = require('../models/map-model');

module.exports = {
    Query:{
        getAllMaps: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) { return([])};
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
		}
	}
}