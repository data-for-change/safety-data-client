import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface GrantChangesModalProps {
	show: boolean;
	userEmail?: string;
	addedGrants: string[];
	removedGrants: string[];
	saving: boolean;
	onHide: () => void;
	onConfirm: () => void;
}

const GrantChangesModal: React.FC<GrantChangesModalProps> = ({
	show,
	userEmail,
	addedGrants,
	removedGrants,
	saving,
	onHide,
	onConfirm,
}) => (
	<Modal show={show} onHide={onHide} centered dir='ltr' dialogClassName='admin-modal'>
		<Modal.Header>
			<Modal.Title>Confirm grant changes</Modal.Title>
			<button
				type='button'
				className='btn-close'
				aria-label='Close'
				onClick={onHide}
				style={{ marginLeft: 'auto', marginRight: 0 }}
			/>
		</Modal.Header>
		<Modal.Body>
			<p>
				Update grants for <strong>{userEmail}</strong>?
			</p>
			{addedGrants.length > 0 && (
				<>
					<p className='mb-1 fw-semibold'>Add:</p>
					<ul>
						{addedGrants.map((name) => (
							<li key={`add-${name}`}>{name}</li>
						))}
					</ul>
				</>
			)}
			{removedGrants.length > 0 && (
				<>
					<p className='mb-1 fw-semibold'>Remove:</p>
					<ul>
						{removedGrants.map((name) => (
							<li key={`remove-${name}`}>{name}</li>
						))}
					</ul>
				</>
			)}
			{addedGrants.length === 0 && removedGrants.length === 0 && (
				<p className='text-muted mb-0'>No changes detected.</p>
			)}
		</Modal.Body>
		<Modal.Footer>
			<Button variant='secondary' onClick={onHide}>
				Cancel
			</Button>
			<Button variant='primary' onClick={onConfirm} disabled={saving}>
				{saving ? 'Saving...' : 'Apply Changes'}
			</Button>
		</Modal.Footer>
	</Modal>
);

export default GrantChangesModal;
