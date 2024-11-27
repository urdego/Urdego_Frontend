import { forwardRef, useState, useRef, useEffect } from 'react';
import {
  SelectContainer,
  SelectLabel,
  SelectWrapper,
  StyledButton,
  DropdownList,
  DropdownItem,
  ArrowIcon,
} from '@layout/MakeRoom/DataListForm.styles';
import { minusIcon } from '@styles/Icon/minusIcon.svg';
import { plusIcon } from '@styles/Icon/plusIcon.svg';

interface DataListFormProps {
  type: 'people' | 'round';
  onChange?: (value: string) => void;
}

const DataListForm = forwardRef<HTMLSelectElement, DataListFormProps>(
  ({ type, onChange }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const getLabel = () => {
      return type === 'people' ? '인원수 (최대 6명)' : '라운드 (최대 3라운드)';
    };

    const getPlaceholder = () => {
      return type === 'people'
        ? '인원수를 선택해 주세요'
        : '라운드 수를 선택해 주세요';
    };

    const getOptions = () => {
      if (type === 'people') {
        return Array.from({ length: 6 }, (_, i) => ({
          value: String(i + 1),
          label: String(i + 1),
        }));
      }
      return Array.from({ length: 3 }, (_, i) => ({
        value: String(i + 1),
        label: `${i + 1} 라운드`,
      }));
    };

    const handleSelect = (value: string) => {
      setSelectedValue(value);
      setIsOpen(false);
      onChange?.(value);
    };

    const getDisplayValue = () => {
      if (!selectedValue) return getPlaceholder();
      return type === 'people' ? selectedValue : `${selectedValue}라운드`;
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <SelectContainer>
        <SelectLabel>{getLabel()}</SelectLabel>
        <SelectWrapper ref={wrapperRef}>
          <StyledButton
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            $isOpen={isOpen}
            $isPlaceholder={!selectedValue}
          >
            {getDisplayValue()}
            <ArrowIcon $isOpen={isOpen} />
          </StyledButton>
          {isOpen && (
            <DropdownList>
              {getOptions().map((option) => (
                <DropdownItem
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  $isSelected={selectedValue === option.value}
                >
                  {option.label}
                </DropdownItem>
              ))}
            </DropdownList>
          )}
        </SelectWrapper>
      </SelectContainer>
    );
  }
);

DataListForm.displayName = 'DataListForm';

export default DataListForm;
