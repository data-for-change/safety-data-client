import React from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { AdminUserInfo } from '../../types/adminUserInfo';
import { Grant } from '../../types/grant';

interface GrantChecklistProps {
	user: AdminUserInfo;
	grants: Grant[];
	selectedGrantNames: string[];
	hasChanges: boolean;
	saving: boolean;
	onToggle: (grantName: string) => void;
	onReview: () => void;
}

const GrantChecklist: React.FC<GrantChecklistProps> = ({
	user,
	grants,
	selectedGrantNames,
	hasChanges,
	saving,
	onToggle,
	onReview,
}) => (
	<>
		<Alert variant='light' className='border user-info-alert'>
			<strong>{user.email}</strong>
			{(user.first_name || user.last_name) && (
				<div className='text-muted'>
					({[user.first_name, user.last_name].filter(Boolean).join(' ')})
				</div>
			)}
		</Alert>

		<h5 className='mb-3'>Grants</h5>
		{grants.map((grant) => (
			<Form.Check
				key={grant.id}
				type='checkbox'
				id={`user-grant-${grant.id}`}
				className='mb-2'
				label={
					<span className='grant-check-label'>
						<strong className='grant-check-name'>{grant.name}</strong>
						<span className='text-muted grant-check-description'>{grant.description}</span>
					</span>
				}
				checked={selectedGrantNames.includes(grant.name)}
				onChange={() => onToggle(grant.name)}
			/>
		))}

		<div className='mt-4'>
			<Button variant='primary' onClick={onReview} disabled={!hasChanges || saving}>
				{saving ? 'Saving...' : 'Review Changes'}
			</Button>
		</div>
	</>
);

export default GrantChecklist;
