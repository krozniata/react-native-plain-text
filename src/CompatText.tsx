import { use } from 'react';
import { Text as RnText, unstable_TextAncestorContext, type TextProps } from 'react-native';
import { PlainText, type PlainTextProps } from './PlainText';

export type CompatTextProps = TextProps;

// Drop-in swap for RN <Text>: renders PlainText where it's safe to (a plain
// string child, not nested inside another <Text>), falls back to RnText
// otherwise. Nested text needs RN's own layout/measurement for inline runs,
// which PlainText doesn't implement.
export function CompatText({ children, ...rest }: CompatTextProps) {
  const isNestedText = use(unstable_TextAncestorContext);
  if (typeof children === 'string' && !isNestedText) {
    return <PlainText {...(rest as PlainTextProps)}>{children}</PlainText>;
  }
  return <RnText {...rest}>{children}</RnText>;
}
