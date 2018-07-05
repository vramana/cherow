import { unicodeLookup } from './unicode';

/*@internal*/
export const enum CharType {
  Invalid     = 0b0,
  IDContinue  = 0b1,
  IDStart     = 0b10,
  Hex         = 0b100,
  Decimal     = 0b1000,
  Whitespace  = 0b10000,
  LineFeed    = 0b100000,
  WSOrLF      = Whitespace | LineFeed,
  Letters     = IDContinue | IDStart,
}

/*@internal*/
export const LatinLetters = [
    CharType.Invalid,     /* 0x00   */
    CharType.Invalid,     /* 0x01   */
    CharType.Invalid,     /* 0x02   */
    CharType.Invalid,     /* 0x03   */
    CharType.Invalid,     /* 0x04   */
    CharType.Invalid,     /* 0x05   */
    CharType.Invalid,     /* 0x06   */
    CharType.Invalid,     /* 0x07   */
    CharType.Invalid,     /* 0x08   */
    CharType.Whitespace,  /* 0x09   */
    CharType.WSOrLF,      /* 0x0A   */
    CharType.Whitespace,  /* 0x0B   */
    CharType.Whitespace,  /* 0x0C   */
    CharType.WSOrLF,      /* 0x0D   */
    CharType.Invalid,     /* 0x0E   */
    CharType.Invalid,     /* 0x0F   */
    CharType.Invalid,     /* 0x10   */
    CharType.Invalid,     /* 0x11   */
    CharType.Invalid,     /* 0x12   */
    CharType.Invalid,     /* 0x13   */
    CharType.Invalid,     /* 0x14   */
    CharType.Invalid,     /* 0x15   */
    CharType.Invalid,     /* 0x16   */
    CharType.Invalid,     /* 0x17   */
    CharType.Invalid,     /* 0x18   */
    CharType.Invalid,     /* 0x19   */
    CharType.Invalid,     /* 0x1A   */
    CharType.Invalid,     /* 0x1B   */
    CharType.Invalid,     /* 0x1C   */
    CharType.Invalid,     /* 0x1D   */
    CharType.Invalid,     /* 0x1E   */
    CharType.Invalid,     /* 0x1F   */
    CharType.Whitespace,  /* 0x20   */
    CharType.Invalid,     /* 0x21 ! */
    CharType.Invalid,     /* 0x22   */
    CharType.Invalid,     /* 0x23 # */
    CharType.Letters,     /* 0x24 $ */
    CharType.Invalid,     /* 0x25 % */
    CharType.Invalid,     /* 0x26 & */
    CharType.Invalid,     /* 0x27   */
    CharType.Invalid,     /* 0x28   */
    CharType.Invalid,     /* 0x29   */
    CharType.Invalid,     /* 0x2A   */
    CharType.Invalid,     /* 0x2B   */
    CharType.Invalid,     /* 0x2C   */
    CharType.Invalid,     /* 0x2D   */
    CharType.Invalid,     /* 0x2E   */
    CharType.Invalid,     /* 0x2F   */
    CharType.Decimal,     /* 0x30 0 */
    CharType.Decimal,     /* 0x31 1 */
    CharType.Decimal,     /* 0x32 2 */
    CharType.Decimal,     /* 0x33 3 */
    CharType.Decimal,     /* 0x34 4 */
    CharType.Decimal,     /* 0x35 5 */
    CharType.Decimal,     /* 0x36 6 */
    CharType.Decimal,     /* 0x37 7 */
    CharType.Decimal,     /* 0x38 8 */
    CharType.Decimal,     /* 0x39 9 */
    CharType.Invalid,     /* 0x3A   */
    CharType.Invalid,     /* 0x3B   */
    CharType.Invalid,     /* 0x3C < */
    CharType.Invalid,     /* 0x3D = */
    CharType.Invalid,     /* 0x3E > */
    CharType.Invalid,     /* 0x3F   */
    CharType.Invalid,     /* 0x40 @ */
    CharType.Hex,         /* 0x41 A */
    CharType.Hex,         /* 0x42 B */
    CharType.Hex,         /* 0x43 C */
    CharType.Hex,         /* 0x44 D */
    CharType.Hex,         /* 0x45 E */
    CharType.Hex,         /* 0x46 F */
    CharType.Letters,     /* 0x47 G */
    CharType.Letters,     /* 0x48 H */
    CharType.Letters,     /* 0x49 I */
    CharType.Letters,     /* 0x4A J */
    CharType.Letters,     /* 0x4B K */
    CharType.Letters,     /* 0x4C L */
    CharType.Letters,     /* 0x4D M */
    CharType.Letters,     /* 0x4E N */
    CharType.Letters,     /* 0x4F O */
    CharType.Letters,     /* 0x50 P */
    CharType.Letters,     /* 0x51 Q */
    CharType.Letters,     /* 0x52 R */
    CharType.Letters,     /* 0x53 S */
    CharType.Letters,     /* 0x54 T */
    CharType.Letters,     /* 0x55 U */
    CharType.Letters,     /* 0x56 V */
    CharType.Letters,     /* 0x57 W */
    CharType.Letters,     /* 0x58 X */
    CharType.Letters,     /* 0x59 Y */
    CharType.Letters,     /* 0x5A Z */
    CharType.Invalid,     /* 0x5B   */
    CharType.Invalid,     /* 0x5C   */
    CharType.Invalid,     /* 0x5D   */
    CharType.Invalid,     /* 0x5E   */
    CharType.Letters,     /* 0x5F _ */
    CharType.Invalid,     /* 0x60   */
    CharType.Hex,         /* 0x61 a */
    CharType.Hex,         /* 0x62 b */
    CharType.Hex,         /* 0x63 c */
    CharType.Hex,         /* 0x64 d */
    CharType.Hex,         /* 0x65 e */
    CharType.Hex,         /* 0x66 f */
    CharType.Letters,     /* 0x67 g */
    CharType.Letters,     /* 0x68 h */
    CharType.Letters,     /* 0x69 i */
    CharType.Letters,     /* 0x6A j */
    CharType.Letters,     /* 0x6B k */
    CharType.Letters,     /* 0x6C l */
    CharType.Letters,     /* 0x6D m */
    CharType.Letters,     /* 0x6E n */
    CharType.Letters,     /* 0x6F o */
    CharType.Letters,     /* 0x70 p */
    CharType.Letters,     /* 0x71 q */
    CharType.Letters,     /* 0x72 r */
    CharType.Letters,     /* 0x73 s */
    CharType.Letters,     /* 0x74 t */
    CharType.Letters,     /* 0x75 u */
    CharType.Letters,     /* 0x76 v */
    CharType.Letters,     /* 0x77 w */
    CharType.Letters,     /* 0x78 x */
    CharType.Letters,     /* 0x79 y */
    CharType.Letters,     /* 0x7A z */
    CharType.Invalid,     /* 0x7B   */
    CharType.Invalid,     /* 0x7C   */
    CharType.Invalid,     /* 0x7D   */
    CharType.Invalid,     /* 0x7E   */
    CharType.Invalid      /* 0x7F   */
];

export function isIdentifierPart(code: Chars): boolean {
  return (LatinLetters[code] & CharType.IDContinue) != 0 || (unicodeLookup[(code >>> 5) + 0] >>> code & 31 & 1) !== 0;
}

export function isIdentifierStart(code: Chars): boolean {
  return (LatinLetters[code] & CharType.IDStart) != 0 || (unicodeLookup[(code >>> 5) + 34816] >>> code & 31 & 1) !== 0;
}

/**
 * A list of character constants with much more human-readable names.
 */
/*@internal*/
export const enum Chars {

    // Optimized for the  0...127 range
    MaxAsciiCharacter = (1 << 7) - 1, // '0x7F'

    Null           = 0x00,
    Backspace      = 0x08,
    Tab            = 0x09,
    LineFeed       = 0x0A,
    VerticalTab    = 0x0B,
    FormFeed       = 0x0C,
    CarriageReturn = 0x0D,
    Space          = 0x20,
    Exclamation    = 0x21,
    DoubleQuote    = 0x22,
    Hash           = 0x23,
    Dollar         = 0x24,
    Percent        = 0x25,
    Ampersand      = 0x26,
    SingleQuote    = 0x27,
    LeftParen      = 0x28,
    RightParen     = 0x29,
    Asterisk       = 0x2A,
    Plus           = 0x2B,
    Comma          = 0x2C,
    Hyphen         = 0x2D,
    Period         = 0x2E,
    Slash          = 0x2F,
    At             = 0x40,
    Backtick       = 0x60,
    LeftBracket    = 0x5B,
    Backslash      = 0x5C,
    RightBracket   = 0x5D,
    Caret          = 0x5E,
    Underscore     = 0x5F,
    LeftBrace      = 0x7B,
    VerticalBar    = 0x7C,
    RightBrace     = 0x7D,
    Tilde          = 0x7E,
    Colon          = 0x3A,
    Semicolon      = 0x3B,
    LessThan       = 0x3C,
    EqualSign      = 0x3D,
    GreaterThan    = 0x3E,
    QuestionMark   = 0x3F,

    /* Numbers  */

    Zero   = 0x30,
    One    = 0x31,
    Two    = 0x32,
    Three  = 0x33,
    Four   = 0x34,
    Five   = 0x35,
    Six    = 0x36,
    Seven  = 0x37,
    Eight  = 0x38,
    Nine   = 0x39,

    /* 'A' - 'Z' */
    UpperA = 0x41,
    UpperB = 0x42,
    UpperC = 0x43,
    UpperD = 0x44,
    UpperE = 0x45,
    UpperF = 0x46,
    UpperG = 0x47,
    UpperH = 0x48,
    UpperI = 0x49,
    UpperJ = 0x4A,
    UpperK = 0x4B,
    UpperL = 0x4C,
    UpperM = 0x4D,
    UpperN = 0x4E,
    UpperO = 0x4F,
    UpperP = 0x50,
    UpperQ = 0x51,
    UpperR = 0x52,
    UpperS = 0x53,
    UpperT = 0x54,
    UpperU = 0x55,
    UpperV = 0x56,
    UpperW = 0x57,
    UpperX = 0x58,
    UpperY = 0x59,
    UpperZ = 0x5A,

    /* 'a' - 'z' */

    LowerA  = 0x61,
    LowerB  = 0x62,
    LowerC  = 0x63,
    LowerD  = 0x64,
    LowerE  = 0x65,
    LowerF  = 0x66,
    LowerG  = 0x67,
    LowerH  = 0x68,
    LowerI  = 0x69,
    LowerJ  = 0x6A,
    LowerK  = 0x6B,
    LowerL  = 0x6C,
    LowerM  = 0x6D,
    LowerN  = 0x6E,
    LowerO  = 0x6F,
    LowerP  = 0x70,
    LowerQ  = 0x71,
    LowerR  = 0x72,
    LowerS  = 0x73,
    LowerT  = 0x74,
    LowerU  = 0x75,
    LowerV  = 0x76,
    LowerW  = 0x77,
    LowerX  = 0x78,
    LowerY  = 0x79,
    LowerZ  = 0x7A,

    /* Zs space */
    NextLine           = 0x85,
    NonBreakingSpace   = 0xA0,
    Ogham              = 0x1680,
    EnQuad             = 0x2000,
    EmQuad             = 0x2001,
    EnSpace            = 0x2002,
    EmSpace            = 0x2003,
    ThreePerEmSpace    = 0x2004,
    FourPerEmSpace     = 0x2005,
    SixPerEmSpace      = 0x2006,
    FigureSpace        = 0x2007,
    PunctuationSpace   = 0x2008,
    ThinSpace          = 0x2009,
    HairSpace          = 0x200A,
    ZeroWidthSpace     = 0x200B,
    Zwnj               = 0x200C,
    Zwj                = 0x200D,
    Zwnbs              = 0xFEFF,
    LineSeparator      = 0x2028,
    ParagraphSeparator = 0x2029,
    NarrowNoBreakSpace = 0x202F,
    MathematicalSpace  = 0x205F,
    IdeographicSpace   = 0x3000,
    ByteOrderMark = 0xFFEF,

    /* Surrogate pair values */

    LeadSurrogateMin = 0xD800,
    LeadSurrogateMax = 0xDBFF,
    TrailSurrogateMin = 0xDC00,
    TrailSurrogateMax = 0xDFFF,

    NonBMPMin = 0x10000,
    NonBMPMax = 0x10FFFF,
}
