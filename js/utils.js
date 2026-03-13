var GameUtils = {
    caesarCipher: function(text, shift, decode) {
        if (decode) shift = 26 - shift;
        var result = '';
        for (var i = 0; i < text.length; i++) {
            var char = text[i];
            if (char.match(/[a-z]/i)) {
                var code = text.charCodeAt(i);
                var base = code < 97 ? 65 : 97;
                result += String.fromCharCode((code - base + shift) % 26 + base);
            } else result += char;
        }
        return result;
    },

    railFenceCipher: function(text, rails, decode) {
        if (decode) {
            var len = text.length, result = new Array(len), index = 0;
            for (var rail = 0; rail < rails; rail++) {
                var i = rail, down = true;
                while (i < len) {
                    result[i] = text[index++];
                    if (rail === 0 || rail === rails - 1) i += 2 * (rails - 1);
                    else if (down) { i += 2 * (rails - 1 - rail); down = false; }
                    else { i += 2 * rail; down = true; }
                }
            }
            return result.join('');
        } else {
            var fence = [];
            for (var i = 0; i < rails; i++) fence.push([]);
            var rail = 0, direction = 1;
            for (var i = 0; i < text.length; i++) {
                fence[rail].push(text[i]);
                rail += direction;
                if (rail === 0 || rail === rails - 1) direction *= -1;
            }
            return fence.flat().join('');
        }
    },

    morseCode: {
        encode: function(text) {
            var morseMap = {
                'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
                'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
                'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
                'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
                'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
                'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
                '4': '....-', '5': '.....', '6': '-....', '7': '--...',
                '8': '---..', '9': '----.', '0': '-----'
            };
            return text.toUpperCase().split('').map(c => morseMap[c] || c).join(' ');
        },
        decode: function(morse) {
            var reverseMap = {
                '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
                '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
                '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
                '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
                '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
                '--..': 'Z', '.----': '1', '..---': '2', '...--': '3',
                '....-': '4', '.....': '5', '-....': '6', '--...': '7',
                '---..': '8', '----.': '9', '-----': '0'
            };
            return morse.split(' ').map(c => reverseMap[c] || c).join('');
        }
    },

    toBinary: function(num, bits) {
        bits = bits || 8;
        return (num >>> 0).toString(2).padStart(bits, '0');
    },

    fromBinary: function(bin) {
        return parseInt(bin, 2);
    }
};

window.GameUtils = GameUtils;
