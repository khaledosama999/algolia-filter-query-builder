import { NumericEqual } from './index';
import NonNumericEqual from './no-numeric-equal';

const EqualFactory = (fieldName:string, value: string| number) => {
  if (typeof value === 'number') return new NumericEqual(fieldName, value);
  return new NonNumericEqual(fieldName, value);
};

export default EqualFactory;
