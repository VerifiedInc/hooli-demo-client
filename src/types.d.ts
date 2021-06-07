import { FC } from 'react';
import { Presentation, Credential } from '@unumid/types';
import {
  Presentation as DeprecatedPresentation,
  NoPresentation as DeprecatedNoPresentation
} from '@unumid/types-deprecated-v1';
import { DemoPresentationDto } from '@unumid/demo-types';
import {
  DemoPresentationDto as DeprecatedDemoPresentationDto,
  DemoNoPresentationDto as DeprecatedDemoNoPresentationDto
} from '@unumid/demo-types-deprecated-v1';

// eslint-disable-next-line @typescript-eslint/ban-types
export type FCWithClassName<P = {}> = FC<P & { className?: string }>;

// Type shared by a holder using the latest sdk version when a user declines to share credentials
export interface DeclinedPresentation extends Presentation {
  verifiableCredential?: never[];
}

// Type shared by a holder using the latest sdk version when a user shares credentials.
export interface AcceptedPresentation extends Presentation {
  verifiableCredential: Credential[];
}

// Type emitted by the server when an AcceptedPresentation is verified.
export interface DemoAcceptedPresentationDto extends DemoPresentationDto {
  presentation: AcceptedPresentation;
}

// Type emitted by the server when a DeclinedPresentation is verified.
export interface DemoDeclinedPresentationDto extends DemoPresentationDto {
  presentation: DeclinedPresentation;
}

// Encapsulates all of the possible types shared by a holder.
export type PresentationLike = Presentation | DeprecatedPresentation | DeprecatedNoPresentation;

// Encapsulates all of the possible types emitted by the server when a holder shares.
export type DemoPresentationLikeDto = DemoPresentationDto | DeprecatedDemoNoPresentationDto | DeprecatedDemoPresentationDto;
