import React from 'react'
import { useTranslation } from 'react-i18next';
import Card from 'react-bootstrap/Card';
import { GroupByTable } from '../molecules/GroupByTable'

interface IProps { }

export const AggregatesPanel: React.FC<IProps> = () => {
    const { t } = useTranslation();
    return (
        <div className="row">
            <Card style={{ width: '18rem' }}>
                <GroupByTable type={0} title={t('AllCasualtiesInRegion')} />
            </Card>
            <Card style={{ width: '18rem' }}>
                <GroupByTable type={1} title={t('CasualtiesByFilter')} />
            </Card>
        </div>
    )
}
