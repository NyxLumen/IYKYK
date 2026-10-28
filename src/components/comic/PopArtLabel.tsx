import React from 'react';
import { ComicAction, ComicActionProps } from './ComicAction';

export type PopArtLabelProps = ComicActionProps;

/**
 * PopArtLabel: Reusable comic-book pop art label component.
 * Maps directly to the existing ComicAction component, preserving:
 * - Label text (Finger Paint typography)
 * - Label face (tinted paper surface with Ben-Day halftone dots)
 * - Upper ink outline & ink border (hand-inked solid frame)
 * - Hard offset shadow (bottom-left offset)
 */
export const PopArtLabel: React.FC<PopArtLabelProps> = ({
  className = '',
  ...props
}) => {
  return (
    <ComicAction
      className={`pop-art-label ${className}`.trim()}
      data-component="pop-art-label"
      {...props}
    />
  );
};
