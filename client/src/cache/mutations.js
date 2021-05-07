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
	mutation DeleteRegion($_id:String!, $parentId:String!, $index:Int!){
		deleteRegion(_id:$_id, parentId:$parentId, index:$index){
			_id
			name
			capital
			leader
			flag
			landmarks
			parentRegionId
			subregions{
				_id
				name
				capital
				leader
				flag
				parentRegionId
				landmarks
			}
		}
	}
`;

export const ADD_REGIONS_BACK = gql`
	mutation AddRegionsBack($parentId:String!, $regionsToAdd:[RegionInput]!, $index:Int!){
		addRegionsBack(parentId:$parentId, regionsToAdd:$regionsToAdd, index:$index)
	}
`;