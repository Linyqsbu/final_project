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

    extend type Query{
        getAllMaps:[Map]
        getMapById(_id: String!): Map
    }

    extend type Mutation{
        editMapName(_id: String!, newName: String!): String
        addRegion(region: RegionInput!, _id: String): String
        addMap(map: MapInput!): String
        deleteRegion(regionId: String): [Region]
        deleteMap(_id: String!): Boolean
        updateRegionField(_id: String!, field: String!, value: String!): [Region]
        sortRegions(regionId: String!, field: String!): [Region]
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
        flag: png
        landmarks: [String]
        parentRegion: Region
        subregions: [RegionInput]
    }
`

module.exports = {typeDefs: typeDefs};