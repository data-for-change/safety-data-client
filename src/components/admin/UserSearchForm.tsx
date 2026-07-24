import React from 'react';
import { Button, Form } from 'react-bootstrap';

interface UserSearchFormProps {
	email: string;
	loading: boolean;
	showClear: boolean;
	onEmailChange: (email: string) => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	onClear: () => void;
}

const UserSearchForm: React.FC<UserSearchFormProps> = ({
	email,
	loading,
	showClear,
	onEmailChange,
	onSubmit,
	onClear,
}) => (
	<Form onSubmit={onSubmit} className='mb-4'>
		<Form.Group className='mb-3'>
			<Form.Label>User Email</Form.Label>
			<div className='d-flex gap-2'>
				<Form.Control
					type='email'
					className='user-email-input'
					value={email}
					onChange={(event) => onEmailChange(event.target.value)}
					placeholder='user@example.com'
					required
				/>
				<Button type='submit' variant='primary' disabled={loading}>
					{loading ? 'Searching...' : 'Search'}
				</Button>
				{showClear && (
					<Button type='button' variant='outline-secondary' onClick={onClear}>
						Clear
					</Button>
				)}
			</div>
		</Form.Group>
	</Form>
);

export default UserSearchForm;
