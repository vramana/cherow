export function keywordTypeFromName(value: string): string | undefined {
  switch (value) {
      case 'any':
          return 'TSAnyKeyword';
      case 'boolean':
          return 'TSBooleanKeyword';
      case 'never':
          return 'TSNeverKeyword';
      case 'number':
          return 'TSNumberKeyword';
      case 'object':
          return 'TSObjectKeyword';
      case 'string':
          return 'TSStringKeyword';
      case 'symbol':
          return 'TSSymbolKeyword';
      case 'undefined':
          return 'TSUndefinedKeyword';
      default:
          return undefined;
  }
}
