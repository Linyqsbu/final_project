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