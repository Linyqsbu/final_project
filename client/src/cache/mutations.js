import {gql} from '@apollo/client';

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!){
		login(email:$email, password:$password){
			email
			_id
			name
			password
		}
	}
`;

export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $name:String!) {
		register(email: $email, password: $password, name: $name) {
            name
            email
            password
		}
	}
`;

export const UPDATE = gql`
	mutation Update($_id: String!, $email: String!, $password: String!, $name:String!){
		update(_id:$_id, email:$email, password:$password, name:$name)
	}
`

export const LOGOUT = gql`
	mutation Logout {
		logout
	}
`;

export const ADDMAP = gql`
	mutation AddMap($map: MapInput!){
		addMap(map:$map)
	}
`;

export const DELETEMAP = gql`
	mutation DeleteMap($_id: String!){
		deleteMap(_id:$_id)
	}
`;

export const EDITMAPNAME = gql`
	mutation EditMapName($_id:String!, $newName:String!){
		editMapName(_id:$_id, newName:$newName)
	}
`;

export const ADDREGION = gql`
	mutation AddRegion($region: RegionInput!, $_id:String!, $isMap:Boolean!){
		addRegion(region:$region, _id:$_id, isMap:$isMap)
	}
`;

export const UPDATE_REGION_FIELD = gql`
	mutation UpdateRegionField($_id:String!, $parentId:String!, $field:String!, $value:String!){
		updateRegionField(_id:$_id, parentId:$parentId, field:$field, value:$value)
	}
`;

export const DELETE_REGION = gql`
	mutation DeleteRegion($_id:String!, $parentId:String!){
		deleteRegion(_id:$_id, parentId:$parentId)
	}
`;

export const ADD_REGION_BACK = gql`
	mutation AddRegionBack($parentId:String!, $region:RegionInput!, $index:Int!, $isMap:Boolean!){
		addRegionBack(parentId:$parentId, region:$region, index:$index, isMap:$isMap)
	}
`;

export const SORT_REGIONS = gql`
	mutation SortRegions($regionId:String!, $field:String!, $isMap:Boolean!){
		sortRegions(regionId:$regionId, field:$field, isMap:$isMap)
	}
`;

export const UNSORT_REGIONS = gql`
	mutation UnsortRegions($regionId:String!, $prevSubregions:[RegionInput]!, $isMap:Boolean!){
		unsortRegions(regionId:$regionId, prevSubregions:$prevSubregions, isMap:$isMap)
	}
`;

export const ADD_LANDMARK = gql`
	mutation AddLandmark($_id:String!, $landmark:String!, $parentId:String!, $index:Int){
		addLandmark(_id:$_id, landmark:$landmark, parentId:$parentId, index:$index)
	}
`;

export const DELETE_LANDMARK = gql`
	mutation DeleteLandmark($_id:String!, $landmark:String!, $parentId:String!){
		deleteLandmark(_id:$_id, landmark:$landmark, parentId:$parentId)
	}
`;

export const CHANGE_PARENT_REGION = gql`
	mutation ChangeParentRegion($_id:String!, $oldParentId:String!, $newParentId:String!, $isParentMap:Boolean!, $index:Int){
		changeParentRegion(_id:$_id, oldParentId:$oldParentId, newParentId:$newParentId, isParentMap:$isParentMap, index:$index)
	}
`;

export const EDIT_LANDMARK = gql`
	mutation EditLandmark($_id:String!, $oldLandmark:String!, $newLandmark:String!, $parentId:String!){
		editLandmark(_id:$_id, oldLandmark:$oldLandmark, newLandmark:$newLandmark, parentId:$parentId)
	}
`;
