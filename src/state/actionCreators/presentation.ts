import { FeathersError } from '@feathersjs/errors';
import {
  DemoPresentationDto as DeprecatedDemoPresentationDto,
  DemoNoPresentationDto as DeprecatedDemoNoPresentationDto
} from '@unumid/demo-types-deprecated';
import { DemoAcceptedPresentationDto, DemoDeclinedPresentationDto } from '../../types';

import {
  PresentationSharedSuccessAction,
  NoPresentationSharedSuccessAction,
  PresentationSharedErrorAction,
  ResetPresentationStateAction
} from '../actions/presentation';
import { PresentationActionType } from '../actionTypes/presentation';

export const handleAcceptedPresentationShared = (dto: DemoAcceptedPresentationDto): PresentationSharedSuccessAction =>
  ({ type: PresentationActionType.PRESENTATION_SHARED_SUCCESS, payload: dto });

export const handleDeclinedPresentationShared = (dto: DemoDeclinedPresentationDto): NoPresentationSharedSuccessAction =>
  ({ type: PresentationActionType.NOPRESENTATION_SHARED_SUCCESS, payload: dto });

export const handleDeprecatedPresentationShared = (dto: DeprecatedDemoPresentationDto): PresentationSharedSuccessAction =>
  ({ type: PresentationActionType.PRESENTATION_SHARED_SUCCESS, payload: dto });

export const handleDeprecatedNoPresentationShared = (dto: DeprecatedDemoNoPresentationDto): NoPresentationSharedSuccessAction =>
  ({ type: PresentationActionType.NOPRESENTATION_SHARED_SUCCESS, payload: dto });

export const handlePresentationSharedError = (err: FeathersError): PresentationSharedErrorAction =>
  ({ type: PresentationActionType.PRESENTATION_SHARED_ERROR, payload: err });

export const resetPresentationState = (): ResetPresentationStateAction =>
  ({ type: PresentationActionType.RESET_PRESENTATION_STATE });
