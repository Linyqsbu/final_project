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
				subregions{
					...SubregionFields
					...RegionRecursive
				}
			}
		}
	}

	fragment SubregionFields on Region{
		_id
		name
		capital
		leader
		parentRegionId
		flag
		landmarks
	}

	fragment RegionRecursive on Region{
		subregions{
			...SubregionFields
			subregions{
				...SubregionFields
				subregions{
					...SubregionFields
				}
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