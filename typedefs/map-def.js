const{gql} = require('apollo-server');


const typeDefs = gql`
    type Map{
        _id: String!
        name: String!
        owner: String!
        subregions:[Region]
    }

    type Region{
        _id: String!
        name: String!
        capital: String!
        leader: String!
        parentRegionId: String!
        flag: String!
        landmarks:[String]
        subregions:[Region]
    }

    type parentEntry{
        _id:String
        name:String
    }

    extend type Query{
        getAllMaps:[Map]
        getMapById(_id: String!): Map
        getRegionById(_id: String!): Region
        getPath(_id: String!):[parentEntry]
    }

    extend type Mutation{
        editMapName(_id: String!, newName: String!): String
        addRegion(region: RegionInput!, _id: String, isMap:Boolean!):String
        addMap(map: MapInput!): String
        deleteRegion(_id:String!, parentId:String!):String
        addRegionBack(parentId:String!, region:RegionInput!, index:Int!, isMap:Boolean!):String
        deleteMap(_id: String!): Boolean
        updateRegionField(_id: String!, parentId:String!, field: String!, value: String!): String
        sortRegions(regionId: String!, field: String!, isMap:Boolean!): String
        unsortRegions(regionId:String! prevSubregions:[RegionInput]!, isMap:Boolean!): String
        addLandmark(landmark: String!): String
        deleteLandmark(landmark: String!): String
        changeParentRegion(newParentId: String!, oldParentId:String!, regionId:String!): String
    }

    

    input MapInput {
        _id: String!
        name: String!
        owner: String!
        subregions: [RegionInput]
    }
        
    input RegionInput{
        _id: String!
        name: String!
        capital: String!
        leader: String!
        flag: String
        landmarks: [String]
        parentRegionId: String!
        subregions: [RegionInput]
    }
`

module.exports = {typeDefs: typeDefs};