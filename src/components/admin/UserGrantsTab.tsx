import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Alert, Spinner } from 'react-bootstrap';
import { useStore } from '../../stores/storeConfig';
import GrantChangesModal from './GrantChangesModal';
import GrantChecklist from './GrantChecklist';
import UserSearchForm from './UserSearchForm';

const UserGrantsTab: React.FC = observer(() => {
	const { grantStore } = useStore();
	const {
		grants,
		loading,
		selectedUser,
		userSearchLoading,
		userSearchError,
		savingUserGrants,
		searchUserByEmail,
		setUserGrants,
		clearSelectedUser,
	} = grantStore;

	const [emailInput, setEmailInput] = useState('');
	const [draftGrantNames, setDraftGrantNames] = useState<string[]>([]);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	useEffect(() => {
		if (selectedUser) {
			setDraftGrantNames([...selectedUser.grants]);
		} else {
			setDraftGrantNames([]);
		}
	}, [selectedUser]);

	const savedGrantNames = selectedUser?.grants ?? [];
	const hasChanges = useMemo(() => {
		if (draftGrantNames.length !== savedGrantNames.length) return true;
		const saved = new Set(savedGrantNames);
		return draftGrantNames.some((name) => !saved.has(name));
	}, [draftGrantNames, savedGrantNames]);

	const addedGrants = draftGrantNames.filter((name) => !savedGrantNames.includes(name));
	const removedGrants = savedGrantNames.filter((name) => !draftGrantNames.includes(name));

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		await searchUserByEmail(emailInput);
	};

	const handleClear = () => {
		setEmailInput('');
		clearSelectedUser();
	};

	const toggleGrant = (grantName: string) => {
		setDraftGrantNames((current) =>
			current.includes(grantName)
				? current.filter((name) => name !== grantName)
				: [...current, grantName],
		);
	};

	const handleSave = () => {
		if (!selectedUser || !hasChanges) return;
		setShowConfirmModal(true);
	};

	const handleConfirmSave = async () => {
		if (!selectedUser) return;
		const success = await setUserGrants(selectedUser.email, draftGrantNames);
		if (success) {
			setShowConfirmModal(false);
		}
	};

	if (loading) {
		return <Spinner animation='border' className='mt-3' />;
	}

	if (grants.length === 0) {
		return (
			<Alert variant='info' className='mt-3'>
				No grants available. Create a grant in the Grants tab first.
			</Alert>
		);
	}

	return (
		<div className='mt-3'>
			<h4 className='mb-3'>Manage grants for a user</h4>

			<UserSearchForm
				email={emailInput}
				loading={userSearchLoading}
				showClear={Boolean(selectedUser)}
				onEmailChange={setEmailInput}
				onSubmit={handleSearch}
				onClear={handleClear}
			/>

			{userSearchError && <Alert variant='danger'>{userSearchError}</Alert>}

			{selectedUser && (
				<GrantChecklist
					user={selectedUser}
					grants={grants}
					selectedGrantNames={draftGrantNames}
					hasChanges={hasChanges}
					saving={savingUserGrants}
					onToggle={toggleGrant}
					onReview={handleSave}
				/>
			)}

			<GrantChangesModal
				show={showConfirmModal}
				userEmail={selectedUser?.email}
				addedGrants={addedGrants}
				removedGrants={removedGrants}
				saving={savingUserGrants}
				onHide={() => setShowConfirmModal(false)}
				onConfirm={handleConfirmSave}
			/>
		</div>
	);
});

export default UserGrantsTab;
