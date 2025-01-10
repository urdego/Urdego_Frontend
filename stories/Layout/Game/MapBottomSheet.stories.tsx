import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import MapBottomSheet, {
  MapBottomSheetProps,
} from '@/components/Layout/Game/MapBottomSheet';

export default {
  title: 'Components/MapBottomSheet',
  component: MapBottomSheet,
  argTypes: {
    onClose: { action: 'closed' },
    onCoordinateSelect: { action: 'coordinate selected' },
    handleSubmitAnswer: { action: 'answer submitted' },
  },
} as Meta;

const Template: StoryFn<MapBottomSheetProps> = (args) => (
  <MapBottomSheet {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  onClose: () => {},
  onCoordinateSelect: () => {},
  currentSelectedCoordinate: null,
  hasSubmitted: false,
  handleSubmitAnswer: () => {},
};

export const WithSelectedCoordinate = Template.bind({});
WithSelectedCoordinate.args = {
  isOpen: true,
  onClose: () => {},
  onCoordinateSelect: () => {},
  currentSelectedCoordinate: {
    lat: 37.7749,
    lng: -122.4194,
  } as google.maps.LatLngLiteral,
  hasSubmitted: false,
  handleSubmitAnswer: () => {},
};

export const Submitted = Template.bind({});
Submitted.args = {
  isOpen: true,
  onClose: () => {},
  onCoordinateSelect: () => {},
  currentSelectedCoordinate: {
    lat: 37.7749,
    lng: -122.4194,
  } as google.maps.LatLngLiteral,
  hasSubmitted: true,
  handleSubmitAnswer: () => {},
};
