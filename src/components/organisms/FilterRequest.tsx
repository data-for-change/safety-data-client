import React, { ChangeEvent} from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
// @ts-ignore
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import citisNamesHeb from "../../assets/cities_names_heb.json";
import { useStore } from '../../stores/storeConfig'

interface IProps {
  activeCardKey:number 
}

export const FilterRequest: React.FC<IProps> = observer(({activeCardKey = 0}) => {
  const store = useStore();
  const { t } = useTranslation();
  //const {startYear, EndYear, City} = store;
  return (
    <Form>
      <Accordion defaultActiveKey={activeCardKey.toString()}>
        <CardFilterWhen />
        <CardFilterWhere />
        <CardFilterWho />
      </Accordion>
      <Button variant="primary"
        disabled={store.isLoading}
        onClick={() => { store.submitFilter(); }} >{store.isLoading ? t('Loading…') : t('Submit')} </Button>
      {/* <Button variant="primary"
        onClick={() => {  store.submitGroupByYears(); }} >group by</Button> */}
    </Form>
  );
})
const CardFilterWhen = observer(() => {
  const store = useStore();
  const { t } = useTranslation();
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          {t('When')}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0" className="filterControls">
        <Card.Body>
          <Form.Row>
            <Form.Group as={Col} controlId="exampleForm.ControlSelectStartYear">
              <Form.Label className="filterLable"> {t('FromYear')}:</Form.Label>
              <Form.Control as="select" defaultValue={store.startYear} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.startYear = parseInt(e.target.value); }}>
                <option>2015</option>
                <option>2016</option>
                <option>2017</option>
                <option>2018</option>
                <option>2019</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="exampleForm.ControlSelectEndYear">
              <Form.Label className="filterLable"> {t('ToYear')}:</Form.Label>
              <Form.Control as="select" defaultValue={store.endYear} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.endYear = parseInt(e.target.value); }}>
                <option>2015</option>
                <option>2016</option>
                <option>2017</option>
                <option>2018</option>
                <option>2019</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
})
const CardFilterWhere = observer(() => {
  const store = useStore();
  const { t } = useTranslation();
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="1">
          {t('Where')}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="1" className="filterControls">
        <div>
          <Form.Group controlId="exampleForm.ControlCity">
            <Form.Label className="filterLable">{t('City')}:</Form.Label>
            <Typeahead
              id="typeaheadCity"
              //defaultSelected={[store.city]}
              onChange={(selected: string[]) => {
                if (selected.length >0 )
                  store.updateCity(selected[0]);
                else
                  store.updateCity("");
              }}
              options={citisNamesHeb}
              //multiple
              selected ={[store.city]}
              placeholder={t('ChooseCity')}
            />
            {/* <Form.Control type="input" placeholder="" value={store.city} onChange={(e:ChangeEvent<HTMLInputElement>) => { store.city = e.target.value; }} /> */}
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlRoadeType" >
            <Form.Label className="filterLable">{t('RoadType')}:</Form.Label>
            <Form.Check inline label={t('urban-junction')} type={'checkbox'} id={`checkboxroadt0`} checked={store.roadTypes[0].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateRoadType(0, e.target.checked); }} />
            <Form.Check inline label={t('urban-road')} type={'checkbox'} id={`checkboxroadt1`} checked={store.roadTypes[1].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateRoadType(1, e.target.checked); }} />
            <Form.Check inline label={t('non-urban-junction')} type={'checkbox'} id={`checkboxroadt2`} checked={store.roadTypes[2].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateRoadType(2, e.target.checked); }} />
            <Form.Check inline label={t('non-urban-road')} type={'checkbox'} id={`checkboxroadt3`} checked={store.roadTypes[3].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateRoadType(3, e.target.checked); }} />
          </Form.Group>

        </div>
      </Accordion.Collapse>
    </Card>
  );
})
const CardFilterWho = observer(() => {
  const store = useStore();
  const { t } = useTranslation();
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="2">
          {t('Who')}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="2" className="filterControls">
        <div>
          <Form.Group controlId="exampleForm.ControlInjType">
            <Form.Label className="filterLable">{t('Vehicle')}:</Form.Label>
            <Form.Check inline label={t('all')} type={'checkbox'} id={`checkboxinjerd0`} checked={store.injTypes[0].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateInjuerdType(0, e.target.checked); }} />
            <Form.Check inline label={t('pedestrian')} type={'checkbox'} id={`checkboxinjerd1`} checked={store.injTypes[1].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateInjuerdType(1, e.target.checked); }} />
            <Form.Check inline label={t('cyclist')} type={'checkbox'} id={`checkboxinjerd2`} checked={store.injTypes[2].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateInjuerdType(2, e.target.checked); }} />
            <Form.Check inline label={t('motorcycle')} type={'checkbox'} id={`checkboxinjerd3`} checked={store.injTypes[3].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateInjuerdType(3, e.target.checked); }} />
            <Form.Check inline label={t('car')} type={'checkbox'} id={`checkboxinjerd4`} checked={store.injTypes[4].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateInjuerdType(4, e.target.checked); }} />
            <Form.Check inline label={t('other')} type={'checkbox'} id={`checkboxinjerd5`} checked={store.injTypes[5].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateInjuerdType(5, e.target.checked); }} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlGenderType">
            <Form.Label className="filterLable">{t('Gender')}:</Form.Label>
            <Form.Check inline label={t('female')} type={'checkbox'} id={`checkboxgendert0`} checked={store.genderTypes[0].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateGenderType(0, e.target.checked); }} />
            <Form.Check inline label={t('male')} type={'checkbox'} id={`checkboxgendert1`} checked={store.genderTypes[1].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateGenderType(1, e.target.checked); }} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlAgeType">
            <Form.Label className="filterLable">{t('Age')}:</Form.Label>
            <Form.Check inline label={t('00-04')} type={'checkbox'} id={`checkboxage0`} checked={store.ageTypes[0].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateAgeType(0, e.target.checked); }} />
            <Form.Check inline label={t('05-09')} type={'checkbox'} id={`checkboxage1`} checked={store.ageTypes[1].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateAgeType(1, e.target.checked); }} />
            <Form.Check inline label={t('10-14')} type={'checkbox'} id={`checkboxage2`} checked={store.ageTypes[2].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateAgeType(2, e.target.checked); }} />
            <Form.Check inline label={t('15-19')} type={'checkbox'} id={`checkboxage3`} checked={store.ageTypes[3].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateAgeType(3, e.target.checked); }} />
            <Form.Check inline label={t('20-29')} type={'checkbox'} id={`checkboxage4`} checked={store.ageTypes[4].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateAgeType(4, e.target.checked); }} />
            <Form.Check inline label={t('30-39')} type={'checkbox'} id={`checkboxage5`} checked={store.ageTypes[5].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateAgeType(5, e.target.checked); }} />
            <Form.Check inline label={t('40-49')} type={'checkbox'} id={`checkboxage6`} checked={store.ageTypes[6].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateAgeType(6, e.target.checked); }} />
            <Form.Check inline label={t('50-59')} type={'checkbox'} id={`checkboxage7`} checked={store.ageTypes[7].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateAgeType(7, e.target.checked); }} />
            <Form.Check inline label={t('60-69')} type={'checkbox'} id={`checkboxage8`} checked={store.ageTypes[8].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateAgeType(8, e.target.checked); }} />
            <Form.Check inline label={t('70-79')} type={'checkbox'} id={`checkboxage9`} checked={store.ageTypes[9].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateAgeType(9, e.target.checked); }} />
            <Form.Check inline label={t('80+')} type={'checkbox'} id={`checkboxage10`} checked={store.ageTypes[10].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateAgeType(10, e.target.checked); }} />
            <Form.Check inline label={t('unknown')} type={'checkbox'} id={`checkboxage11`} checked={store.ageTypes[11].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateAgeType(11, e.target.checked); }} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlPopType">
            <Form.Label className="filterLable">{t('Population')}:</Form.Label>
            <Form.Check inline label={t('jews')} type={'checkbox'} id={`checkboxpop0`} checked={store.populationTypes[0].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updatePopulationType(0, e.target.checked); }} />
            <Form.Check inline label={t('arabs')} type={'checkbox'} id={`checkboxpop1`} checked={store.populationTypes[1].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updatePopulationType(1, e.target.checked); }} />
            <Form.Check inline label={t('immigrants')} type={'checkbox'} id={`checkboxpop2`} checked={store.populationTypes[2].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updatePopulationType(2, e.target.checked); }} />
            <Form.Check inline label={t('unknown')} type={'checkbox'} id={`checkboxpop3`} checked={store.populationTypes[3].checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updatePopulationType(3, e.target.checked); }} />
          </Form.Group>
        </div>
      </Accordion.Collapse>
    </Card>
  );
})
