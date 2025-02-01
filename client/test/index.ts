import { render, screen, fireEvent, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

// dom testing will timeout without this
// see: https://github.com/testing-library/user-event/issues/833
const user = userEvent.setup({ delay: null });

export * from './mocks';
export {
   act,
   render,
   screen,
   user as userEvent,
   fireEvent, // userEvent strongly preferred
   renderHook,
};
