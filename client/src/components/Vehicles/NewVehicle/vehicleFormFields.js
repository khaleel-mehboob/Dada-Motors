import conditions from '../../../data/conditions';
import makers from '../../../data/makers';
import years from '../../../data/years';
import bodyTypes from '../../../data/bodyTypes';
import fuelTypes from '../../../data/fuelTypes';
import models from '../../../data/models';

const FIELDS = [
  { label: 'Name', type: 'text', name: 'name', controlType: 'input'},
  { label: 'Model', name: 'model', controlType: 'select', values: models},
  { label: 'Make', name: 'make', controlType: 'select', values: makers},
  { label: 'Year', name: 'year', controlType: 'select', values: years},
  { label: 'Mileage (Km)', type: 'number', name: 'mileage', controlType: 'input'},
  { label: 'Fuel Type', name: 'fuel', controlType: 'select', values: fuelTypes},
  { label: 'Condition', name: 'condition', controlType: 'select', values: conditions},
  { label: 'Body Type', name: 'body', controlType: 'select', values: bodyTypes},
  { label: 'Color', type: 'text', name: 'color', controlType: 'input'},
  { label: 'Transmission', name: 'transmission', controlType: 'select', values: ['Auto', 'Manual']},
  { label: 'L/R Drive', name: 'drive', controlType: 'select', values: ['Left Hand', 'Right Hand']},
  { label: 'Description', type: 'text', name: 'description', controlType: 'input'},
  { label: 'Price (R)', type: 'number', name: 'price', controlType: 'input'}
];

export default FIELDS;