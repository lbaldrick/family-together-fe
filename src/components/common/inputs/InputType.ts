export interface InputProps {
    id: string;
    initialValue: string | number;
    type: string;
    label?: string;
    onChange: (id: string, value: string | number) => void;
    validationFn?: (value: string | number) => boolean;
    isRequired: boolean;
}
