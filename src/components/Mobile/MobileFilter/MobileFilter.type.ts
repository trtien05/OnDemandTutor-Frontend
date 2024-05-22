import { RadioChangeEvent } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Rating } from '../../../utils/enums';

export type CheckboxCategoryProps = {
    checkedCategoryList: CheckboxValueType[];
    handleCategoryCheckbox: (checkedValue: CheckboxValueType[]) => void;
};

export type CheckboxExpirationProps = {
    checkedExpirationList: CheckboxValueType[];
    handleExpirationCheckbox: (checkedValue: CheckboxValueType[]) => void;
};

export type RadioRatingProps = {
    radioValue: Rating;
    handleRatingRadio: (e: RadioChangeEvent) => void;
};
