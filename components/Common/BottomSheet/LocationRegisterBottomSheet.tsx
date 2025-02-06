import GoogleMap from '@/components/Layout/LocationRegister/GoogleMap';
import BottomSheet from './BottomSheet';
import { useState } from 'react';

interface LocationRegisterBottomSheetProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const LocationRegisterBottomSheet = ({
  setIsOpen,
}: LocationRegisterBottomSheetProps) => {
  const [isLocationSelected, setIsLocationSelected] = useState(false);

  return (
    <BottomSheet setIsOpen={setIsOpen}>
      <div>aa</div>
    </BottomSheet>
  );
};

export default LocationRegisterBottomSheet;
