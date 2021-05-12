import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser {
			_id
			name
			email
		}
	}
`;

export const GET_DB_MAPS = gql`
	query GetDBMaps {
		getAllMaps{
			_id
			name
			owner
			subregions{
				_id
				name
				capital
				leader
				parentRegionId
				flag
				landmarks
			}
		}
	}

`;

export const GET_REGION_BY_ID = gql`
	query GetRegionById($_id:String!){
		getRegionById(_id:$_id){
			_id
			name
			capital
			leader
			flag
			parentRegionId
			landmarks
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

export const GET_MAP_BY_ID = gql`
	query GetMapById($_id:String!){
		getMapById(_id:$_id){
			_id
			name
			owner
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

export const GET_PATH = gql`
	query GetPath($_id: String!){
		getPath(_id: $_id){
			_id
			name
		}
	}
`;

export const GET_CHILDREN_LANDMARKS = gql`
	query GetChildrenLandmarks($_id:String!){
		getChildrenLandmarks(_id:$_id)
	}
`;

export const GET_SIBLING = gql`
	query GetSibling($_id:String!, $direction:Int!){
		getSibling(_id:$_id, direction:$direction)
	}
`;

export const GET_ALL_SIBLINGS = gql`
	query GetAllSiblings($_id:String!){
		getAllSiblings(_id:$_id){
			_id
			name
			capital
			leader
			landmarks
		}
	}
`;