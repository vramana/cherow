export const enum Context {
  Empty                 = 0,
  OptionsRaw            = 1 << 0,
  OptionsNext           = 1 << 1,
  OptionsLoc            = 1 << 2,
  OptionsRanges         = 1 << 3,
  OptionsJSX            = 1 << 4,
  OptionsRawidentifiers = 1 << 5,
  OptionsGlobalReturn   = 1 << 6,
  OptionsShebang        = 1 << 7,
  OptionsComments       = 1 << 8,
  OptionsExperimental   = 1 << 9,
  ExpressionStart       = 1 << 10,
  Strict                = 1 << 14,
  Module                = 1 << 15,
  TaggedTemplate        = 1 << 16,
  Tokenize              = 1 << 17,
  InClass               = 1 << 18,

}

export const enum Flags {
  Empty           = 0,
  LineTerminator  = 1 << 0,
  HasOctal        = 1 << 1,
  EdgeCase        = 1 << 2,
}
