import { HERO_OVERLAY_STYLE } from '../theme/theme';

export default function HeroOverlay({ style, className, ...props }) {
  return (
    <div
      aria-hidden="true"
      className={`hero-overlay ${className || ''}`.trim()}
      style={{ ...HERO_OVERLAY_STYLE, ...style }}
      {...props}
    />
  );
}

export { HERO_OVERLAY_STYLE };
