import React, { PropsWithChildren } from 'react';

interface DataWithLabelProps extends PropsWithChildren {
	label: string;
	className?: string;
}

export const DataWithLabel: React.FC<DataWithLabelProps> = ({ label, className, children }) => {
	return (
		<div className={className ?? 'd-flex flex-column  mb-0'}>
			<span className='fw-bold mb-0' style={{ fontSize: 12 }}>{label}</span>
			{children}
		</div>
	);
};

export default DataWithLabel;
