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