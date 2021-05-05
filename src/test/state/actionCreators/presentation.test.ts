import { GeneralError } from '@feathersjs/errors';

import {
  handleDeprecatedPresentationShared,
  handleDeprecatedNoPresentationShared,
  handlePresentationSharedError,
  resetPresentationState
} from '../../../state/actionCreators/presentation';
import { PresentationActionType } from '../../../state/actionTypes/presentation';
import { dummyDeprecatedDemoPresentationDto, dummyDeprecatedDemoNoPresentationDto } from '../../mocks';

describe('presentation action creators', () => {
  describe('handlePresentationShared', () => {
    it('returns a PresentationSharedSuccessAction', () => {
      const action = handleDeprecatedPresentationShared(dummyDeprecatedDemoPresentationDto);
      const expected = {
        type: PresentationActionType.PRESENTATION_SHARED_SUCCESS,
        payload: dummyDeprecatedDemoPresentationDto
      };
      expect(action).toEqual(expected);
    });
  });

  describe('handleNoPresentationShared', () => {
    it('returns a NoPresentationSharedSuccessAction', () => {
      const action = handleDeprecatedNoPresentationShared(dummyDeprecatedDemoNoPresentationDto);
      const expected = {
        type: PresentationActionType.NOPRESENTATION_SHARED_SUCCESS,
        payload: dummyDeprecatedDemoNoPresentationDto
      };
      expect(action).toEqual(expected);
    });
  });

  describe('handlePresentationSharedError', () => {
    it('returns a PresentationSharedErrorAction', () => {
      const err = new GeneralError('error sharing presentation');
      const action = handlePresentationSharedError(err);
      const expected = {
        type: PresentationActionType.PRESENTATION_SHARED_ERROR,
        payload: err
      };
      expect(action).toEqual(expected);
    });
  });

  describe('resetPresentationState', () => {
    it('returns a ResetPresentationStateAction', () => {
      const action = resetPresentationState();
      expect(action).toEqual({ type: PresentationActionType.RESET_PRESENTATION_STATE });
    });
  });
});
