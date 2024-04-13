export interface Key {
    notes: string;
}

export function getKeys(): Key[] {
    let keys: Array<{ notes: string }> = [
        {notes : "None"},
        {notes : "F#"},
        {notes : "F# C#"},
        {notes : "F# C# G#"},
        {notes : "F# C# G# D#"},
        {notes : "F# C# G# D# A#"},
        {notes : "F# C# G# D# A# E#"},
        {notes : "F# C# G# D# A# E# B#"},
        {notes : "Bb"},
        {notes : "Bb Eb"},
        {notes : "Bb Eb Ab"},
        {notes : "Bb Eb Ab Db"},
        {notes : "Bb Eb Ab Db Gb"},
        {notes : "Bb Eb Ab Db Gb Cb"},
        {notes : "Bb Eb Ab Db Gb Cb Fb"}
    ];
    return keys;
}