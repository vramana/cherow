export const enum CharFlags {
  Unknown                    = 0,
  IdentifierStart            = 1 << 0,
  IdentifierPart             = 1 << 1,
  WhiteSpace                 = 1 << 2,
  WhiteSpaceOrLineTerminator = 1 << 3,
  TerminatesLiteral          = 1 << 4,
  NoKeywordCandidate         = 1 << 5,
  NoKeywordCandidateStart    = 1 << 6,
  StringTerminator           = 1 << 7,
  StringQuote                = 1 << 8,
  LineTerminator             = 1 << 9,
  Decimal                    = 1 << 10,
  Octal                      = 1 << 11,
  Hex                        = 1 << 12,
  Binary                     = 1 << 13,
  NonOctalDecimalDigit       = 1 << 14,
  Exponent                   = 1 << 15,
  MultiChar                  = 1 << 16,
};

/**
 * Lookup table for mapping a codepoint to a set of flags
 */
export const CharTypes = [
  CharFlags.Unknown, /* 0x00   */
  CharFlags.Unknown, /* 0x01   */
  CharFlags.Unknown, /* 0x02   */
  CharFlags.Unknown, /* 0x03   */
  CharFlags.Unknown, /* 0x04   */
  CharFlags.Unknown, /* 0x05   */
  CharFlags.Unknown, /* 0x06   */
  CharFlags.Unknown, /* 0x07   */
  CharFlags.Unknown, /* 0x08   */
  CharFlags.WhiteSpace | CharFlags.WhiteSpaceOrLineTerminator, /* 0x09   */
  CharFlags.WhiteSpaceOrLineTerminator | CharFlags.StringTerminator | CharFlags.LineTerminator, /* 0x0A   */
  CharFlags.WhiteSpace | CharFlags.WhiteSpaceOrLineTerminator, /* 0x0B   */
  CharFlags.WhiteSpace | CharFlags.WhiteSpaceOrLineTerminator, /* 0x0C   */
  CharFlags.WhiteSpaceOrLineTerminator | CharFlags.StringTerminator | CharFlags.LineTerminator, /* 0x0D   */
  CharFlags.Unknown, /* 0x0E   */
  CharFlags.Unknown, /* 0x0F   */
  CharFlags.Unknown, /* 0x10   */
  CharFlags.Unknown, /* 0x11   */
  CharFlags.Unknown, /* 0x12   */
  CharFlags.Unknown, /* 0x13   */
  CharFlags.Unknown, /* 0x14   */
  CharFlags.Unknown, /* 0x15   */
  CharFlags.Unknown, /* 0x16   */
  CharFlags.Unknown, /* 0x17   */
  CharFlags.Unknown, /* 0x18   */
  CharFlags.Unknown, /* 0x19   */
  CharFlags.Unknown, /* 0x1A   */
  CharFlags.Unknown, /* 0x1B   */
  CharFlags.Unknown, /* 0x1C   */
  CharFlags.Unknown, /* 0x1D   */
  CharFlags.Unknown, /* 0x1E   */
  CharFlags.Unknown, /* 0x1F   */
  CharFlags.WhiteSpace | CharFlags.WhiteSpaceOrLineTerminator, /* 0x20   */
  CharFlags.StringQuote, /* 0x21 ! */
  CharFlags.Unknown, /* 0x22   */
  CharFlags.Unknown, /* 0x23 # */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x24 $ */
  CharFlags.Unknown, /* 0x25 % */
  CharFlags.Unknown, /* 0x26 & */
  CharFlags.StringQuote, /* 0x27   */
  CharFlags.Unknown, /* 0x28   */
  CharFlags.Unknown, /* 0x29   */
  CharFlags.Unknown, /* 0x2A   */
  CharFlags.Unknown, /* 0x2B   */
  CharFlags.Unknown, /* 0x2C   */
  CharFlags.Exponent, /* 0x2D   */
  CharFlags.Unknown, /* 0x2E   */
  CharFlags.Unknown, /* 0x2F   */
  CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate | CharFlags.Decimal | CharFlags.Binary | CharFlags.Octal, /* 0x30 0 */
  CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate | CharFlags.Decimal | CharFlags.Binary | CharFlags.Octal, /* 0x31 1 */
  CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate | CharFlags.Decimal | CharFlags.Octal, /* 0x32 2 */
  CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate | CharFlags.Decimal | CharFlags.Octal, /* 0x33 3 */
  CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate | CharFlags.Decimal | CharFlags.Octal, /* 0x34 4 */
  CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate | CharFlags.Decimal | CharFlags.Octal, /* 0x35 5 */
  CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate | CharFlags.Decimal | CharFlags.Octal, /* 0x36 6 */
  CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate | CharFlags.Decimal | CharFlags.Octal, /* 0x37 7 */
  CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate | CharFlags.Decimal | CharFlags.NonOctalDecimalDigit, /* 0x38 8 */
  CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate | CharFlags.Decimal | CharFlags.NonOctalDecimalDigit, /* 0x39 9 */
  CharFlags.Unknown, /* 0x3A   */
  CharFlags.Unknown, /* 0x3B   */
  CharFlags.Unknown, /* 0x3C < */
  CharFlags.Unknown, /* 0x3D = */
  CharFlags.Unknown, /* 0x3E > */
  CharFlags.Unknown, /* 0x3F   */
  CharFlags.Unknown, /* 0x40 @ */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate | CharFlags.Hex, /* 0x41 A */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate | CharFlags.Hex, /* 0x42 B */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate | CharFlags.Hex, /* 0x43 C */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate | CharFlags.Hex, /* 0x44 D */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate | CharFlags.Hex, /* 0x45 E */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate | CharFlags.Hex, /* 0x46 F */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x47 G */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x48 H */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x49 I */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x4A J */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x4B K */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x4C L */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x4D M */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x4E N */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x4F O */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x50 P */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x51 Q */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x52 R */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x53 S */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x54 T */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x55 U */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x56 V */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x57 W */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x58 X */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x59 Y */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x5A Z */
  CharFlags.Unknown, /* 0x5B   */
  CharFlags.StringTerminator | CharFlags.MultiChar, /* 0x5C   */
  CharFlags.Unknown, /* 0x5D   */
  CharFlags.Unknown, /* 0x5E   */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x5F _ */
  CharFlags.Unknown, /* 0x60   */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.Hex, /* 0x61 a */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.Hex, /* 0x62 b */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.Hex, /* 0x63 c */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.Hex, /* 0x64 d */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.Hex, /* 0x65 e */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.Hex, /* 0x66 f */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart, /* 0x67 g */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidateStart, /* 0x68 h */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidateStart, /* 0x69 i */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidateStart, /* 0x6A j */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidateStart, /* 0x6B k */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart, /* 0x6C l */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidateStart, /* 0x6D m */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart, /* 0x6E n */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidateStart, /* 0x6F o */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart, /* 0x70 p */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidateStart, /* 0x71 q */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidateStart, /* 0x72 r */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart, /* 0x73 s */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart, /* 0x74 t */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidateStart, /* 0x75 u */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart, /* 0x76 v */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart, /* 0x77 w */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, /* 0x78 x */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart, /* 0x79 y */
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidateStart, /* 0x7A z */
  CharFlags.Unknown, /* 0x7B   */
  CharFlags.Unknown, /* 0x7C   */
  CharFlags.Unknown, /* 0x7D   */
  CharFlags.Unknown, /* 0x7E   */
  CharFlags.Unknown, /* 0x7F   */
]
